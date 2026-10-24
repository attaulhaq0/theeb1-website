<?php
// ============================================
// GET Team Members API
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
    $sql = "SELECT id, name, title, bio, expertise, image_url, linkedin_url, email 
            FROM team_members 
            WHERE is_active = 1 
            ORDER BY display_order ASC";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $members = $stmt->fetchAll();
    
    // Parse JSON expertise field
    foreach ($members as &$member) {
        if ($member['expertise']) {
            $member['expertise'] = json_decode($member['expertise'], true);
        } else {
            $member['expertise'] = [];
        }
    }
    
    jsonResponse(['data' => $members]);
} catch (PDOException $e) {
    error_log("Team API error: " . $e->getMessage());
    jsonError('Failed to fetch team members', 500);
}
?>
