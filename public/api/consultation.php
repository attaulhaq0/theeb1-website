<?php
// ============================================
// CONSULTATION BOOKING API ENDPOINT
// POST /api/consultation.php
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
if (empty($data['name'])) {
    jsonError('Name is required');
}
if (empty($data['email'])) {
    jsonError('Email is required');
}
if (!isValidEmail($data['email'])) {
    jsonError('Invalid email address');
}

// Sanitize inputs
$name = sanitizeString($data['name'], 100);
$email = $data['email'];
$emailHtml = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$phone = isset($data['phone']) ? sanitizeString($data['phone'], 20) : null;
$message = isset($data['message']) ? sanitizeString($data['message'], 2000) : null;
$preferredDate = isset($data['preferred_date']) && !empty($data['preferred_date']) ? $data['preferred_date'] : null;

// Format preferred date for MySQL if provided
if ($preferredDate) {
    $dateTime = strtotime($preferredDate);
    if ($dateTime) {
        $preferredDate = date('Y-m-d H:i:s', $dateTime);
    } else {
        $preferredDate = null;
    }
}

// Reserve shared IP, recipient and global quotas before any database operation.
$mailReservation = enforceFormAbuseLimits($email);

// Get database connection
$pdo = getDbConnection();
if (!$pdo) {
    jsonError('Database connection failed', 500);
}

try {
    // Insert into database
    $stmt = $pdo->prepare("
        INSERT INTO consultation_bookings (name, email, phone, message, preferred_date, status, created_at)
        VALUES (:name, :email, :phone, :message, :preferred_date, 'pending', NOW())
    ");
    
    $stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':phone' => $phone,
        ':message' => $message,
        ':preferred_date' => $preferredDate
    ]);
    
    $insertId = $pdo->lastInsertId();
    
    // Format date for emails
    $displayDate = $preferredDate ? date('F j, Y \a\t g:i A', strtotime($preferredDate)) : 'To be confirmed';
    
    // Visitor confirmations are off by default and use only fixed templates.
    $mailReservation->confirmVisitor('consultation');
    
    // Send notification email to admin
    $adminSubject = "New Consultation Booking - theEb1";
    $adminBody = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1a1a2e; color: white; padding: 20px; }
            .content { padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #6366f1; }
            .priority { background: #fef3c7; border: 1px solid #f59e0b; padding: 10px; border-radius: 5px; margin-bottom: 20px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>🗓️ New Consultation Booking</h2>
            </div>
            <div class='content'>
                <div class='priority'>
                    <strong>⏰ Preferred Date:</strong> {$displayDate}
                </div>
                
                <div class='field'>
                    <span class='label'>Name:</span> {$name}
                </div>
                <div class='field'>
                    <span class='label'>Email:</span> <a href='mailto:{$emailHtml}'>{$emailHtml}</a>
                </div>
                <div class='field'>
                    <span class='label'>Phone:</span> " . ($phone ?: 'Not provided') . "
                </div>
                <div class='field'>
                    <span class='label'>Message:</span>
                    <p style='background: #f5f5f5; padding: 15px; border-radius: 5px;'>" . ($message ?: 'No message provided') . "</p>
                </div>
                <div class='field'>
                    <span class='label'>Submitted:</span> " . date('Y-m-d H:i:s') . "
                </div>
                <div class='field'>
                    <span class='label'>Reference ID:</span> #CB-{$insertId}
                </div>
            </div>
        </div>
    </body>
    </html>
    ";
    
    $mailReservation->notifyAdmin($adminSubject, $adminBody);
    
    // Return success response
    jsonResponse([
        'success' => true,
        'message' => 'Consultation booking submitted successfully',
        'id' => $insertId,
        'reference' => "CB-{$insertId}"
    ]);
    
} catch (PDOException $e) {
    error_log("Consultation database operation failed");
    jsonError('Failed to book consultation. Please try again.', 500);
}
?>
