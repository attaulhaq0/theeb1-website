<?php
// ============================================
// GET Hero Slides API
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
    $sql = "SELECT id, title, subtitle, background_image, cta_text, cta_link 
            FROM hero_slides 
            WHERE is_active = 1 
            ORDER BY display_order ASC";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $slides = $stmt->fetchAll();
    
    jsonResponse(['data' => $slides]);
} catch (PDOException $e) {
    error_log("Hero Slides API error: " . $e->getMessage());
    jsonError('Failed to fetch hero slides', 500);
}
?>
