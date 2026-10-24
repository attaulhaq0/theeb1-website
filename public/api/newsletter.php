<?php
// ============================================
// NEWSLETTER SUBSCRIPTION API ENDPOINT
// POST /api/newsletter.php
// ============================================

require_once __DIR__ . '/config.php';

// Handle CORS and preflight
handlePreflight();
setCorsHeaders();

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonError('Method not allowed', 405);
}

// Get and validate request data
$data = getJsonBody();

// Required fields validation
if (empty($data['email'])) {
    jsonError('Email is required');
}
if (!isValidEmail($data['email'])) {
    jsonError('Invalid email address');
}

// Sanitize email
$email = $data['email'];
$emailHtml = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');

// Reserve shared IP, recipient and global quotas before any database operation.
$mailReservation = enforceFormAbuseLimits($email);

// Get database connection
$pdo = getDbConnection();
if (!$pdo) {
    jsonError('Database connection failed', 500);
}

try {
    // Check if email already exists
    $checkStmt = $pdo->prepare("SELECT id, status FROM newsletter_subscriptions WHERE email = :email");
    $checkStmt->execute([':email' => $email]);
    $existing = $checkStmt->fetch();
    
    if ($existing) {
        if ($existing['status'] === 'active') {
            jsonError('This email is already subscribed to our newsletter');
        } else {
            // Reactivate subscription
            $updateStmt = $pdo->prepare("UPDATE newsletter_subscriptions SET status = 'active', subscribed_at = NOW() WHERE id = :id");
            $updateStmt->execute([':id' => $existing['id']]);
            $insertId = $existing['id'];
        }
    } else {
        // Insert new subscription
        $stmt = $pdo->prepare("
            INSERT INTO newsletter_subscriptions (email, status, subscribed_at)
            VALUES (:email, 'active', NOW())
        ");
        
        $stmt->execute([':email' => $email]);
        $insertId = $pdo->lastInsertId();
    }
    
    // Visitor confirmations are off by default and use only fixed templates.
    $mailReservation->confirmVisitor('newsletter');
    
    // Send notification to admin
    $adminSubject = "New Newsletter Subscription - theEb1";
    $adminBody = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
    </head>
    <body>
        <h2>New Newsletter Subscription</h2>
        <p><strong>Email:</strong> {$emailHtml}</p>
        <p><strong>Subscribed:</strong> " . date('Y-m-d H:i:s') . "</p>
        <p><strong>Reference ID:</strong> #{$insertId}</p>
    </body>
    </html>
    ";
    
    $mailReservation->notifyAdmin($adminSubject, $adminBody);
    
    // Return success response
    jsonResponse([
        'success' => true,
        'message' => 'Successfully subscribed to newsletter'
    ]);
    
} catch (PDOException $e) {
    error_log("Newsletter database operation failed");
    jsonError('Failed to subscribe. Please try again.', 500);
}
?>
