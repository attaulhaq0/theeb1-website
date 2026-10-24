<?php
// ============================================
// GET Pricing Plans API
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
    $sql = "SELECT id, name, price, currency, billing_period, description, features, is_popular, cta_text, cta_link 
            FROM pricing_plans 
            WHERE is_active = 1 
            ORDER BY display_order ASC";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $plans = $stmt->fetchAll();
    
    // Parse JSON features field
    foreach ($plans as &$plan) {
        if ($plan['features']) {
            $plan['features'] = json_decode($plan['features'], true);
        } else {
            $plan['features'] = [];
        }
    }
    
    jsonResponse(['data' => $plans]);
} catch (PDOException $e) {
    error_log("Pricing API error: " . $e->getMessage());
    jsonError('Failed to fetch pricing plans', 500);
}
?>
