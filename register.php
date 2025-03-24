<?php
// Enable CORS
header("Access-Control-Allow-Origin: https://x4-esports-official.vercel.app"); // Replace with your Vercel app URL
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Only handle POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Validate required fields
$errors = [];
$requiredFields = ['firstName', 'lastName', 'username', 'email', 'number', 'tournament', 'new'];

foreach ($requiredFields as $field) {
    if (empty($_POST[$field])) {
        $errors[] = "$field is required";
    }
}

// Validate email
if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Invalid email format";
}

// Validate phone number (basic Indian number validation)
if (!preg_match('/^[6-9]\d{9}$/', $_POST['number'])) {
    $errors[] = "Invalid Indian phone number";
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['errors' => $errors]);
    exit;
}

// Sanitize inputs
$firstName = htmlspecialchars(trim($_POST['firstName']));
$lastName = htmlspecialchars(trim($_POST['lastName']));
$username = htmlspecialchars(trim($_POST['username']));
$email = htmlspecialchars(trim($_POST['email']));
$number = htmlspecialchars(trim($_POST['number']));
$tournament = htmlspecialchars(trim($_POST['tournament']));
$new = htmlspecialchars(trim($_POST['new']));
$refer = isset($_POST['refer']) ? htmlspecialchars(trim($_POST['refer'])) : null;

// Database connection
$servername = "sql313.byetcluster.com";
$dbUsername = "if0_38226882";
$password = "vPwSH5XcSms";
$dbname = "if0_38226882_register";

try {
    $conn = new mysqli($servername, $dbUsername, $password, $dbname);
    
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }

    $stmt = $conn->prepare("INSERT INTO registrations (first_name, last_name, username, email, number, tournament, new, refer) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssss", $firstName, $lastName, $username, $email, $number, $tournament, $new, $refer);

    if (!$stmt->execute()) {
        throw new Exception("Database error: " . $stmt->error);
    }

    echo json_encode([
        'success' => true,
        'message' => 'Registration successful!'
    ]);

    $stmt->close();
    $conn->close();

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
