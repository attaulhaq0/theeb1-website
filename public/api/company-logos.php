<?php
// ============================================
// GET Company Logos API
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
    $sql = "SELECT id, company_name, logo_url, website_url 
            FROM company_logos 
            WHERE is_active = 1 
            ORDER BY display_order ASC";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $logos = $stmt->fetchAll();
    
    jsonResponse(['data' => $logos]);
} catch (PDOException $e) {
    error_log("Company Logos API error: " . $e->getMessage());
    jsonError('Failed to fetch company logos', 500);
}
?>
