<?php
// ============================================
// GET Visa Pages API
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
    $type = isset($_GET['type']) ? strtoupper(sanitizeString($_GET['type'])) : null;
    
    if ($type) {
        $sql = "SELECT visa_type, page_title, hero_title, hero_subtitle, overview, 
                       eligibility_criteria, benefits, process_steps, requirements,
                       meta_title, meta_description 
                FROM visa_pages 
                WHERE visa_type = :type AND is_active = 1";
        
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':type', $type, PDO::PARAM_STR);
        $stmt->execute();
        $page = $stmt->fetch();
        
        if ($page) {
            // Parse JSON fields
            $jsonFields = ['eligibility_criteria', 'benefits', 'process_steps', 'requirements'];
            foreach ($jsonFields as $field) {
                if ($page[$field]) {
                    $page[$field] = json_decode($page[$field], true);
                } else {
                    $page[$field] = [];
                }
            }
            jsonResponse(['data' => $page]);
        } else {
            jsonError('Visa page not found', 404);
        }
    } else {
        // Return all visa types (basic info only)
        $sql = "SELECT visa_type, page_title, hero_title, meta_title, meta_description 
                FROM visa_pages 
                WHERE is_active = 1";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $pages = $stmt->fetchAll();
        
        jsonResponse(['data' => $pages]);
    }
} catch (PDOException $e) {
    error_log("Visa Pages API error: " . $e->getMessage());
    jsonError('Failed to fetch visa page', 500);
}
?>
