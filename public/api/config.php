<?php
// ============================================
// HOSTINGER DATABASE CONFIGURATION
// theEb1 Website - API Configuration
// ============================================
// IMPORTANT: Update these values with your Hostinger credentials!
// ============================================

// Database Configuration
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_NAME', getenv('DB_NAME') ?: '');
define('DB_USER', getenv('DB_USER') ?: '');
define('DB_PASS', getenv('DB_PASS') ?: '');

// Admin Email Configuration
define('ADMIN_EMAIL', 'admin@theeb1.com');
define('FROM_EMAIL', 'noreply@theeb1.com');
define('FROM_NAME', 'theEb1');

// Site Configuration
define('SITE_NAME', 'theEb1');
define('SITE_URL', 'https://theeb1.com');

// CORS Configuration
$allowed_origins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://theeb1.com',
    'https://www.theeb1.com'
];

// Set CORS headers
function setCorsHeaders() {
    global $allowed_origins;
    
    $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
    
    if (in_array($origin, $allowed_origins)) {
        header("Access-Control-Allow-Origin: $origin");
    } else {
        header("Access-Control-Allow-Origin: *");
    }
    
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    header("Access-Control-Max-Age: 86400");
    header("Content-Type: application/json; charset=UTF-8");
}

// Handle preflight OPTIONS request
function handlePreflight() {
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        setCorsHeaders();
        http_response_code(200);
        exit();
    }
}

// Database connection function
function getDbConnection() {
    try {
        $pdo = new PDO(
            "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
            DB_USER,
            DB_PASS,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false
            ]
        );
        return $pdo;
    } catch (PDOException $e) {
        error_log("Database connection failed");
        return null;
    }
}

// JSON response helper
function jsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data);
    exit();
}

// JSON error response helper
function jsonError($message, $statusCode = 400) {
    jsonResponse(['error' => $message], $statusCode);
}

// Get JSON body from request
function getJsonBody() {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        jsonError('Invalid JSON data', 400);
    }
    
    return $data;
}

// Simple email validation
function isValidEmail($email) {
    return is_string($email) && strlen($email) <= 254
        && filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

// Sanitize string input
function sanitizeString($str, $maxLength = 255) {
    $str = trim($str);
    $str = strip_tags($str);
    $str = htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
    return substr($str, 0, $maxLength);
}

require_once __DIR__ . '/form-security.php';
?>
