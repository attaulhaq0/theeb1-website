<?php
// ============================================
// GET Statistics API
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
    $sql = "SELECT id, stat_key, stat_value, stat_suffix, stat_label, icon 
            FROM statistics 
            WHERE is_active = 1 
            ORDER BY display_order ASC";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $statistics = $stmt->fetchAll();
    
    jsonResponse(['data' => $statistics]);
} catch (PDOException $e) {
    error_log("Statistics API error: " . $e->getMessage());
    jsonError('Failed to fetch statistics', 500);
}
?>
