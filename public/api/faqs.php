<?php
// ============================================
// GET FAQs API
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
    $category = isset($_GET['category']) ? sanitizeString($_GET['category']) : null;
    
    $sql = "SELECT id, question, answer, category 
            FROM faqs 
            WHERE is_active = 1";
    
    if ($category) {
        $sql .= " AND category = :category";
    }
    
    $sql .= " ORDER BY display_order ASC";
    
    $stmt = $pdo->prepare($sql);
    
    if ($category) {
        $stmt->bindValue(':category', $category, PDO::PARAM_STR);
    }
    
    $stmt->execute();
    $faqs = $stmt->fetchAll();
    
    jsonResponse(['data' => $faqs]);
} catch (PDOException $e) {
    error_log("FAQs API error: " . $e->getMessage());
    jsonError('Failed to fetch FAQs', 500);
}
?>
