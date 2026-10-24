<?php
// Test-only worker. Native mail() MUST be disabled, so no test can reach a mail server.
if (!in_array('mail', array_map('trim', explode(',', ini_get('disable_functions'))), true)) {
    fwrite(STDERR, "Run with -d disable_functions=mail\n");
    exit(2);
}
$case = json_decode(base64_decode($argv[1]), true, 16, JSON_THROW_ON_ERROR);
$events = [];
if (!function_exists('mail')) {
    function mail($to, $subject, $message, $headers) {
        global $events;
        $events[] = ['type' => 'mail', 'to' => $to, 'subject' => $subject, 'body' => $message];
        return true;
    }
}
final class FixtureStatement {
    public function __construct(private string $sql) {}
    public function execute($params) {
        global $events;
        $events[] = ['type' => 'execute', 'sql' => $this->sql, 'params' => $params];
        return true;
    }
    public function fetch() {
        global $case;
        return $case['existing'] ?? false;
    }
}
final class FixtureDatabase {
    public function prepare($sql) { return new FixtureStatement($sql); }
    public function lastInsertId() { return '42'; }
}
function fixtureDatabase() {
    global $events, $case;
    $events[] = ['type' => 'db'];
    return empty($case['dbFailure']) ? new FixtureDatabase() : null;
}
register_shutdown_function(function () use (&$events) {
    echo "\n__RESULT__" . json_encode(['status' => http_response_code() ?: 200, 'events' => $events]);
});
$_SERVER['DOCUMENT_ROOT'] = $case['documentRoot'];
$_SERVER['REMOTE_ADDR'] = $case['ip'] ?? '192.0.2.1';
$_SERVER['HTTP_COOKIE'] = $case['cookie'] ?? '';
$_SERVER['HTTP_X_FORWARDED_FOR'] = $case['forwarded'] ?? '';
$_SERVER['REQUEST_METHOD'] = 'POST';
if (isset($case['barrier'])) {
    $deadline = microtime(true) + 10;
    while (!file_exists($case['barrier'])) {
        if (microtime(true) > $deadline) { throw new RuntimeException('Barrier timeout'); }
        usleep(1000);
    }
}
if ($case['mode'] === 'endpoint') {
    // Only fixture copies have these substitutions. Production has no test hooks.
    $config = file_get_contents($case['source'] . '/public/api/config.php');
    $config = preg_replace('~function getDbConnection\(\) \{.*?\n\}\R\R// JSON response helper~s',
        "function getDbConnection() { return fixtureDatabase(); }\n\n// JSON response helper", $config, 1, $dbReplacements);
    $config = preg_replace('~function getJsonBody\(\) \{.*?\n\}\R\R// Simple email validation~s',
        "function getJsonBody() { global \$case; return \$case['data']; }\n\n// Simple email validation", $config, 1, $inputReplacements);
    if ($dbReplacements !== 1 || $inputReplacements !== 1) { throw new RuntimeException('Fixture substitution failed'); }
    $directory = $case['fixture'];
    mkdir($directory, 0700, true);
    file_put_contents($directory . '/config.php', $config);
    copy($case['source'] . '/public/api/form-security.php', $directory . '/form-security.php');
    copy($case['source'] . '/public/api/' . $case['endpoint'] . '.php', $directory . '/endpoint.php');
    require $directory . '/endpoint.php';
} else {
    require $case['source'] . '/public/api/config.php';
    try {
        $reservation = reserveFormQuota($case['email']);
        if (!empty($case['send'])) {
            $reservation->notifyAdmin('Fixed admin subject', '<p>Submitted content goes only to admin</p>');
            $reservation->notifyAdmin('Duplicate', 'Duplicate');
            $reservation->confirmVisitor($case['kind'] ?? 'contact');
            $reservation->confirmVisitor('contact');
        }
        echo 'accepted';
    } catch (FormQuotaExceeded $error) {
        echo 'limited';
    } catch (Throwable $error) {
        echo 'unavailable';
    }
}
