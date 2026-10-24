<?php
// ============================================
// GET Site Settings API
// ============================================
require_once 'config.php';

handlePreflight();
setCorsHeaders();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    jsonError('Method not allowed', 405);
}

$pdo = getDbConnection();
if (!$pdo) {
    jsonError('Database connection failed', 500);
}

try {
    $key = isset($_GET['key']) ? sanitizeString($_GET['key']) : null;
    
    if ($key) {
        $sql = "SELECT setting_key, setting_value FROM site_settings WHERE setting_key = :key";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':key', $key, PDO::PARAM_STR);
        $stmt->execute();
        $setting = $stmt->fetch();
        
        if ($setting) {
            jsonResponse(['data' => $setting]);
        } else {
            jsonError('Setting not found', 404);
        }
    } else {
        $sql = "SELECT setting_key, setting_value FROM site_settings";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $settings = $stmt->fetchAll();
        
        // Convert to key-value object
        $settingsMap = [];
        foreach ($settings as $setting) {
            $settingsMap[$setting['setting_key']] = $setting['setting_value'];
        }
        
        jsonResponse(['data' => $settingsMap]);
    }
} catch (PDOException $e) {
    error_log("Settings API error: " . $e->getMessage());
    jsonError('Failed to fetch settings', 500);
}
?>
