<?php
// ============================================
// GET Testimonials API
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
    $featured = isset($_GET['featured']) ? (bool)$_GET['featured'] : null;
    
    $sql = "SELECT id, name, role, company, quote, rating, image_url 
            FROM testimonials 
            WHERE is_active = 1";
    
    if ($featured !== null) {
        $sql .= " AND is_featured = :featured";
    }
    
    $sql .= " ORDER BY display_order ASC, created_at DESC";
    
    $stmt = $pdo->prepare($sql);
    
    if ($featured !== null) {
        $stmt->bindValue(':featured', $featured ? 1 : 0, PDO::PARAM_INT);
    }
    
    $stmt->execute();
    $testimonials = $stmt->fetchAll();
    
    jsonResponse(['data' => $testimonials]);
} catch (PDOException $e) {
    error_log("Testimonials API error: " . $e->getMessage());
    jsonError('Failed to fetch testimonials', 500);
}
?>
