<?php
// Offline regression tests: fresh PHP workers, fake PDO boundary, disabled native mail().
$source = dirname(__DIR__);
$temporaryRoot = rtrim(sys_get_temp_dir(), '/\\') . DIRECTORY_SEPARATOR . 'theeb1-form-tests-' . bin2hex(random_bytes(8));
mkdir($temporaryRoot, 0700);
$baseEnvironment = array_merge(getenv(), [
    'THEEB1_FORM_HMAC_KEY' => bin2hex(random_bytes(32)),
    'THEEB1_SEND_VISITOR_CONFIRMATIONS' => '0',
    'THEEB1_FORM_IP_LIMIT' => '5',
    'THEEB1_FORM_RECIPIENT_LIMIT' => '3',
    'THEEB1_FORM_GLOBAL_LIMIT' => '50',
    'THEEB1_FORM_WINDOW_SECONDS' => '3600'
]);
$checks = 0;
$sequence = 0;
function check($condition, string $message): void {
    global $checks;
    if (!$condition) { throw new RuntimeException($message); }
    $checks++;
}
function environment(array $overrides = []): array {
    global $temporaryRoot, $baseEnvironment, $sequence;
    $runtime = $temporaryRoot . '/runtime-' . ++$sequence;
    mkdir($runtime, 0700);
    return array_merge($baseEnvironment, ['THEEB1_FORM_RUNTIME_DIR' => $runtime], $overrides);
}
function startWorker(array $case, array $environment): array {
    global $source, $temporaryRoot, $sequence;
    $case = array_merge(['source' => $source, 'documentRoot' => $source . '/public', 'mode' => 'reserve',
        'email' => 'visitor@example.test', 'fixture' => $temporaryRoot . '/fixture-' . ++$sequence . '/public/api'], $case);
    $command = [PHP_BINARY, '-d', 'disable_functions=mail', '-d', 'display_errors=stderr', '-d', 'log_errors=0',
        __DIR__ . '/form-worker.php', base64_encode(json_encode($case))];
    $process = proc_open($command, [['pipe', 'r'], ['pipe', 'w'], ['pipe', 'w']], $pipes, $source, $environment);
    if (!is_resource($process)) { throw new RuntimeException('Worker launch failed'); }
    fclose($pipes[0]);
    return [$process, $pipes];
}
function finishWorker(array $worker): array {
    [$process, $pipes] = $worker;
    $output = stream_get_contents($pipes[1]);
    $error = stream_get_contents($pipes[2]);
    fclose($pipes[1]); fclose($pipes[2]);
    $exit = proc_close($process);
    check($exit === 0, 'Worker failed: ' . $error . ' ' . $output);
    $parts = explode("\n__RESULT__", $output);
    check(count($parts) === 2, 'Worker result missing: ' . $output . $error);
    $result = json_decode($parts[1], true, 16, JSON_THROW_ON_ERROR);
    $result['output'] = $parts[0];
    return $result;
}
function runWorker(array $case, array $environment): array { return finishWorker(startWorker($case, $environment)); }
function mails(array $result): array { return array_values(array_filter($result['events'], fn($event) => $event['type'] === 'mail')); }
function endpoint(string $name, mixed $email, string $ip = '192.0.2.1', array $extra = []): array {
    return array_merge(['mode' => 'endpoint', 'endpoint' => $name, 'ip' => $ip,
        'data' => ['name' => 'Injected subject http://attacker.invalid', 'email' => $email,
            'phone' => '+1 555 0100', 'message' => 'ATTACKER-TEXT http://attacker.invalid', 'preferred_date' => '2030-01-01']], $extra);
}
function removeTemporaryTree(string $path): void {
    global $temporaryRoot;
    if (!str_starts_with($path, $temporaryRoot) || is_link($path)) { throw new RuntimeException('Unsafe temporary cleanup'); }
    foreach (new DirectoryIterator($path) as $entry) {
        if ($entry->isDot()) { continue; }
        if ($entry->isDir() && !$entry->isLink()) { removeTemporaryTree($entry->getPathname()); }
        else { unlink($entry->getPathname()); }
    }
    rmdir($path);
}
try {
    // Legitimate endpoint behavior and all original visitor-mail sinks, with recording DB/mail fixtures.
    foreach (['contact', 'consultation', 'newsletter'] as $name) {
        $defaultEnvironment = environment();
        unset($defaultEnvironment['THEEB1_SEND_VISITOR_CONFIRMATIONS']);
        $result = runWorker(endpoint($name, 'visitor@example.test'), $defaultEnvironment);
        check($result['status'] === 200 && (json_decode($result['output'], true)['success'] ?? false), $name . ' legitimate response');
        check(count(mails($result)) === 1 && mails($result)[0]['to'] === 'admin@theeb1.com', $name . ' default sends only fixed admin mail');
        check(count(array_filter($result['events'], fn($event) => $event['type'] === 'execute' && str_contains($event['sql'], 'INSERT'))) === 1,
            $name . ' preserves insertion');
        $result = runWorker(endpoint($name, 'visitor@example.test'), environment(['THEEB1_SEND_VISITOR_CONFIRMATIONS' => '1']));
        $mail = mails($result);
        check(count($mail) === 2 && $mail[0]['to'] === 'visitor@example.test' && $mail[1]['to'] === 'admin@theeb1.com', $name . ' explicit confirmation');
        check(!str_contains($mail[0]['body'], 'ATTACKER-TEXT') && !str_contains($mail[0]['body'], 'attacker.invalid')
            && !str_contains($mail[0]['body'], '+1 555') && !str_contains($mail[0]['body'], '2030'), $name . ' visitor template contains no submitted content');
    }
    $env = environment(['THEEB1_FORM_IP_LIMIT' => '2']);
    runWorker(endpoint('contact', 'first@example.test', '192.0.2.10', ['cookie' => 'PHPSESSID=first']), $env);
    runWorker(endpoint('consultation', 'second@example.test', '192.0.2.10', ['cookie' => 'PHPSESSID=second']), $env);
    $result = runWorker(endpoint('newsletter', 'third@example.test', '192.0.2.10', ['cookie' => 'PHPSESSID=third', 'forwarded' => '192.0.2.200']), $env);
    check($result['status'] === 429 && $result['events'] === [], 'Shared IP quota survives new processes/cookies/forwarded headers before DB');
    $env = environment(['THEEB1_FORM_RECIPIENT_LIMIT' => '2']);
    runWorker(endpoint('contact', 'Victim@Example.test', '192.0.2.11'), $env);
    runWorker(endpoint('consultation', 'victim@example.TEST', '192.0.2.12'), $env);
    $result = runWorker(endpoint('newsletter', 'VICTIM@example.test', '192.0.2.13'), $env);
    check($result['status'] === 429 && $result['events'] === [], 'Shared normalized recipient quota before DB');
    $env = environment(['THEEB1_FORM_GLOBAL_LIMIT' => '2']);
    runWorker(endpoint('contact', 'first@example.test', '192.0.2.21'), $env);
    runWorker(endpoint('consultation', 'second@example.test', '192.0.2.22'), $env);
    $result = runWorker(endpoint('newsletter', 'third@example.test', '192.0.2.23'), $env);
    check($result['status'] === 429 && $result['events'] === [], 'Global quota across endpoints before DB');
    $env = environment(['THEEB1_SEND_VISITOR_CONFIRMATIONS' => '1', 'THEEB1_FORM_GLOBAL_LIMIT' => '2']);
    runWorker(endpoint('contact', 'first@example.test', '192.0.2.31'), $env);
    $result = runWorker(endpoint('newsletter', 'second@example.test', '192.0.2.32'), $env);
    check($result['status'] === 429 && $result['events'] === [], 'Global capacity counts both actual recipients');
    // Quota storage contains only opaque keyed identities, never plaintext IPs or email addresses.
    $env = environment();
    runWorker(['email' => 'private@example.test', 'ip' => '2001:db8::1'], $env);
    $statePath = $env['THEEB1_FORM_RUNTIME_DIR'] . '/form-limits.json';
    $stateText = file_get_contents($statePath);
    check(!str_contains($stateText, 'private@example') && !str_contains($stateText, '2001:db8')
        && !str_contains($stateText, $env['THEEB1_FORM_HMAC_KEY']), 'No plaintext private identifiers/key in state');
    $env['THEEB1_FORM_IP_LIMIT'] = '1';
    $result = runWorker(['email' => 'other@example.test', 'ip' => '2001:0db8:0000:0000:0000:0000:0000:0001'], $env);
    check($result['output'] === 'limited', 'Equivalent IPv6 representations share quota');
    $mappedEnvironment = environment(['THEEB1_FORM_IP_LIMIT' => '1']);
    runWorker(['email' => 'first@example.test', 'ip' => '192.0.2.1'], $mappedEnvironment);
    check(runWorker(['email' => 'second@example.test', 'ip' => '::ffff:192.0.2.1'], $mappedEnvironment)['output'] === 'limited',
        'IPv4 and mapped IPv6 representations share quota');
    // Expired windows are pruned; failed database work does not refund reservations.
    $state = json_decode(file_get_contents($statePath), true);
    $state['period']--;
    file_put_contents($statePath, json_encode($state));
    check(runWorker(['email' => 'private@example.test', 'ip' => '2001:db8::1'], $env)['output'] === 'accepted', 'Expired window permits legitimate request');
    $env = environment(['THEEB1_FORM_IP_LIMIT' => '1']);
    check(runWorker(endpoint('contact', 'visitor@example.test', '192.0.2.40', ['dbFailure' => true]), $env)['status'] === 500, 'Existing database-failure response');
    $result = runWorker(endpoint('consultation', 'second@example.test', '192.0.2.40'), $env);
    check($result['status'] === 429 && $result['events'] === [], 'Database failure cannot refund abuse capacity');
    // All state/configuration failure cases deny before DB/mail, including deployment path mistakes.
    foreach ([['THEEB1_FORM_RUNTIME_DIR' => ''], ['THEEB1_FORM_RUNTIME_DIR' => $source . '/public'],
        ['THEEB1_FORM_HMAC_KEY' => 'short'], ['THEEB1_SEND_VISITOR_CONFIRMATIONS' => 'true'],
        ['THEEB1_FORM_GLOBAL_LIMIT' => '0'], ['THEEB1_FORM_WINDOW_SECONDS' => '1']] as $override) {
        $result = runWorker(endpoint('contact', 'visitor@example.test'), environment($override));
        check($result['status'] === 503 && $result['events'] === [], 'Invalid deployment configuration fails closed');
    }
    $result = runWorker(endpoint('newsletter', 'visitor@example.test', 'not-an-ip'), environment());
    check($result['status'] === 503 && $result['events'] === [], 'Missing reliable server address fails closed');
    $env = environment();
    $result = runWorker(endpoint('contact', 'visitor@example.test', '192.0.2.1', ['documentRoot' => dirname($env['THEEB1_FORM_RUNTIME_DIR'])]), $env);
    check($result['status'] === 503 && $result['events'] === [], 'Runtime inside deployed root fails closed');
    $result = runWorker(endpoint('contact', 'visitor@example.test', '192.0.2.1', ['documentRoot' => '']), environment());
    check($result['status'] === 503 && $result['events'] === [], 'Missing document root fails closed');
    foreach ([['not', 'an', 'email'], "victim@example.test\r\nBcc:other@example.test"] as $invalidEmail) {
        $result = runWorker(endpoint('newsletter', $invalidEmail), environment());
        check($result['status'] === 400 && $result['events'] === [], 'Malformed or header-injection recipient is rejected before DB');
    }
    $result = runWorker(endpoint('contact', "o'connor+tag@example.test"), environment());
    check($result['status'] === 200 && str_contains(mails($result)[0]['body'], 'o&#039;connor+tag@example.test'),
        'Legitimate mailbox syntax is preserved and escaped only for admin HTML');
    foreach (['', '{broken', '{"version":1,"counters":{"global":-1}}'] as $invalidState) {
        $env = environment();
        file_put_contents($env['THEEB1_FORM_RUNTIME_DIR'] . '/form-limits.json', $invalidState);
        $result = runWorker(endpoint('newsletter', 'visitor@example.test'), $env);
        check($result['status'] === 503 && $result['events'] === [], 'Corrupt existing storage fails closed');
    }
    // High-contention workers launch together, using one shared atomic check/reservation.
    $env = environment(['THEEB1_FORM_GLOBAL_LIMIT' => '5']);
    $barrier = $temporaryRoot . '/concurrency-start';
    $workers = [];
    for ($i = 0; $i < 20; $i++) {
        $workers[] = startWorker(['email' => 'concurrent' . $i . '@example.test', 'ip' => '192.0.2.' . ($i + 50), 'barrier' => $barrier], $env);
    }
    file_put_contents($barrier, 'start');
    $accepted = 0;
    foreach ($workers as $worker) {
        $result = finishWorker($worker);
        check(in_array($result['output'], ['accepted', 'limited', 'unavailable'], true), 'Concurrency worker result');
        $accepted += $result['output'] === 'accepted' ? 1 : 0;
    }
    check($accepted === 5, 'Concurrent reservations cannot exceed global capacity');
    $state = json_decode(file_get_contents($env['THEEB1_FORM_RUNTIME_DIR'] . '/form-limits.json'), true);
    check($state['counters']['global'] === 5, 'Concurrency persists exact reserved count');
    $env = environment(['THEEB1_SEND_VISITOR_CONFIRMATIONS' => '1']);
    $result = runWorker(['send' => true], $env);
    check(count(mails($result)) === 2, 'Each reservation sends each permitted mail at most once');
    echo 'PASS: ' . $checks . " assertions; no native mail or database connections.\n";
} finally {
    removeTemporaryTree($temporaryRoot);
}
