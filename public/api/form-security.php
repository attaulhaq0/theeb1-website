<?php
// All public form endpoints reserve the same persistent quota before database work.
// The operator must provision a private writable directory outside every document root.
final class FormQuotaExceeded extends RuntimeException {}

function formLimitSetting(string $name, int $default, int $maximum): int {
    $value = getenv($name);
    if ($value === false || $value === '') {
        return $default;
    }
    if (!preg_match('/^[1-9][0-9]{0,5}$/D', $value) || (int) $value > $maximum) {
        throw new RuntimeException('Invalid form quota configuration');
    }
    return (int) $value;
}

function formPathContains(string $parent, string $child): bool {
    $parent = rtrim(str_replace('\\', '/', $parent), '/');
    $child = rtrim(str_replace('\\', '/', $child), '/');
    if (PHP_OS_FAMILY === 'Windows') {
        $parent = strtolower($parent);
        $child = strtolower($child);
    }
    return $child === $parent || str_starts_with($child, $parent . '/');
}

function formRuntimeDirectory(): string {
    $configured = getenv('THEEB1_FORM_RUNTIME_DIR');
    if (!is_string($configured) || $configured === ''
        || !preg_match('~^(?:/|[A-Za-z]:[\\\\/])~', $configured)) {
        throw new RuntimeException('Private form runtime is not configured');
    }
    $runtime = realpath($configured);
    $public = realpath(__DIR__ . '/..');
    $rootSetting = $_SERVER['DOCUMENT_ROOT'] ?? '';
    $documentRoot = is_string($rootSetting) && $rootSetting !== '' ? realpath($rootSetting) : false;
    if ($runtime === false || $public === false || $documentRoot === false
        || !is_dir($runtime) || !is_writable($runtime)
        || formPathContains($public, $runtime)
        || formPathContains($documentRoot, $runtime)) {
        throw new RuntimeException('Form runtime must be outside the document root');
    }
    return $runtime;
}

final class FormMailReservation {
    private bool $adminUsed = false;
    private bool $visitorUsed = false;

    public function __construct(private string $recipient, private bool $visitorEnabled) {}

    private function deliver(string $to, string $subject, string $body): bool {
        $headers = [
            'MIME-Version: 1.0',
            'Content-type: text/html; charset=UTF-8',
            'From: ' . FROM_NAME . ' <' . FROM_EMAIL . '>',
            'Reply-To: ' . FROM_EMAIL
        ];
        return mail($to, $subject, $body, implode("\r\n", $headers));
    }

    public function notifyAdmin(string $subject, string $body): bool {
        if ($this->adminUsed) {
            return false;
        }
        $this->adminUsed = true;
        return $this->deliver(ADMIN_EMAIL, $subject, $body);
    }

    public function confirmVisitor(string $kind): bool {
        // Caller-provided names, messages, links and other submitted fields never enter this mail.
        $templates = [
            'contact' => ['theEb1 contact request received', 'We received a contact request. Our team will review it.'],
            'consultation' => ['theEb1 consultation request received', 'We received a consultation request. Our team will review it.'],
            'newsletter' => ['theEb1 newsletter request received', 'We received a newsletter subscription request.']
        ];
        if (!$this->visitorEnabled || $this->visitorUsed || !isset($templates[$kind])) {
            return false;
        }
        $this->visitorUsed = true;
        [$subject, $text] = $templates[$kind];
        return $this->deliver($this->recipient, $subject, '<p>' . $text . '</p><p>If you did not make this request, ignore this message.</p>');
    }
}

function reserveFormQuota(string $recipient): FormMailReservation {
    if (!isValidEmail($recipient)) {
        throw new RuntimeException('Invalid form recipient');
    }
    $visitorSetting = getenv('THEEB1_SEND_VISITOR_CONFIRMATIONS');
    if ($visitorSetting !== false && $visitorSetting !== '' && $visitorSetting !== '0' && $visitorSetting !== '1') {
        throw new RuntimeException('Invalid confirmation configuration');
    }
    $visitorEnabled = $visitorSetting === '1';
    $key = getenv('THEEB1_FORM_HMAC_KEY');
    if (!is_string($key) || strlen($key) < 32) {
        throw new RuntimeException('Form quota key is not configured');
    }
    $ip = $_SERVER['REMOTE_ADDR'] ?? '';
    $packedIp = is_string($ip) ? @inet_pton($ip) : false;
    if ($packedIp === false) {
        throw new RuntimeException('Form client address is unavailable');
    }
    // Normalize IPv4-mapped IPv6 addresses to the same identity as their IPv4 form.
    if (strlen($packedIp) === 16 && substr($packedIp, 0, 12) === str_repeat("\0", 10) . "\xff\xff") {
        $packedIp = substr($packedIp, 12);
    }
    // Headers and browser cookies cannot select a different quota identity.
    $ipLimit = formLimitSetting('THEEB1_FORM_IP_LIMIT', 5, 1000);
    $recipientLimit = formLimitSetting('THEEB1_FORM_RECIPIENT_LIMIT', 3, 1000);
    $globalLimit = formLimitSetting('THEEB1_FORM_GLOBAL_LIMIT', 50, 1000);
    $window = formLimitSetting('THEEB1_FORM_WINDOW_SECONDS', 3600, 86400);
    if ($window < 60) {
        throw new RuntimeException('Form quota window is too short');
    }
    $now = time();
    $period = intdiv($now, $window);
    $tag = hash_hmac('sha256', 'theeb1-form-state-v1', $key);
    // Reserve actual outbound message capacity, including the fixed admin notification.
    $cost = $visitorEnabled ? 2 : 1;
    $buckets = [
        'global' => [$globalLimit, $cost],
        hash_hmac('sha256', 'ip:' . $packedIp, $key) => [$ipLimit, 1],
        hash_hmac('sha256', 'recipient:' . strtolower($recipient), $key) => [$recipientLimit, 1]
    ];
    $path = formRuntimeDirectory() . DIRECTORY_SEPARATOR . 'form-limits.json';
    if (is_link($path)) {
        throw new RuntimeException('Invalid quota storage');
    }
    $created = false;
    $file = @fopen($path, 'x+b');
    if ($file !== false) {
        $created = true;
        @chmod($path, 0600);
    } else {
        $file = @fopen($path, 'r+b');
    }
    if ($file === false) {
        throw new RuntimeException('Quota storage is unavailable');
    }
    try {
        if (!flock($file, LOCK_EX)) {
            throw new RuntimeException('Quota lock failed');
        }
        $stat = fstat($file);
        if ($stat === false || ($stat['mode'] & 0170000) !== 0100000 || $stat['size'] > 1048576) {
            throw new RuntimeException('Invalid quota storage');
        }
        $contents = stream_get_contents($file);
        if ($contents === false) {
            throw new RuntimeException('Quota read failed');
        }
        if ($created && $contents === '') {
            $state = ['version' => 1, 'window' => $window, 'period' => $period, 'tag' => $tag, 'counters' => []];
        } else {
            $state = json_decode($contents, true, 16, JSON_THROW_ON_ERROR);
            if (!is_array($state) || ($state['version'] ?? null) !== 1
                || ($state['window'] ?? null) !== $window || ($state['tag'] ?? null) !== $tag
                || !is_int($state['period'] ?? null) || $state['period'] > $period
                || !is_array($state['counters'] ?? null) || count($state['counters']) > 2001) {
                throw new RuntimeException('Invalid quota state');
            }
            foreach ($state['counters'] as $bucket => $count) {
                if (($bucket !== 'global' && !preg_match('/^[a-f0-9]{64}$/D', (string) $bucket))
                    || !is_int($count) || $count < 0 || $count > 1000) {
                    throw new RuntimeException('Invalid quota counter');
                }
            }
            if ($state['period'] < $period) {
                $state['period'] = $period;
                $state['counters'] = [];
            }
        }
        foreach ($buckets as $bucket => [$limit, $increment]) {
            if (($state['counters'][$bucket] ?? 0) + $increment > $limit) {
                throw new FormQuotaExceeded('Form quota exceeded');
            }
        }
        foreach ($buckets as $bucket => [$limit, $increment]) {
            $state['counters'][$bucket] = ($state['counters'][$bucket] ?? 0) + $increment;
        }
        $encoded = json_encode($state, JSON_THROW_ON_ERROR);
        if (!rewind($file) || !ftruncate($file, 0) || fwrite($file, $encoded) !== strlen($encoded)
            || !fflush($file) || !fsync($file)) {
            throw new RuntimeException('Quota write failed');
        }
        return new FormMailReservation($recipient, $visitorEnabled);
    } finally {
        flock($file, LOCK_UN);
        fclose($file);
    }
}

function enforceFormAbuseLimits(string $recipient): FormMailReservation {
    try {
        return reserveFormQuota($recipient);
    } catch (FormQuotaExceeded $error) {
        header('Retry-After: 60');
        jsonError('Too many requests. Please try again later.', 429);
    } catch (Throwable $error) {
        // Never log the recipient, private path, configuration value or exception text.
        error_log('theEb1 form quota unavailable');
        jsonError('Form submissions are temporarily unavailable.', 503);
    }
}
