<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Keep your existing validation and sanitization code
    
    // Your sanitized data
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $username = $_POST['username'];
    $email = $_POST['email'];
    $number = $_POST['number'];
    $tournament = $_POST['tournament'];
    $new = $_POST['new'] ?? 'No';
    $refer = $_POST['refer'] ?? '';

    // Google Sheets API Configuration
    $spreadsheetId = 'YOUR_SHEET_ID';  // From sheet URL
    $range = 'A1:H';  // Columns to use
    $apiKey = 'YOUR_API_KEY';  // Get from Google Cloud Console

    // Prepare data
    $values = [[
        $firstName,
        $lastName,
        $username,
        $email,
        $number,
        $tournament,
        $new,
        $refer
    ]];

    // Build request
    $url = "https://sheets.googleapis.com/v4/spreadsheets/$spreadsheetId/values/$range:append?valueInputOption=RAW&key=$apiKey";
    
    $data = [
        'values' => $values
    ];

    // Send to Google Sheets
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    $response = curl_exec($ch);
    curl_close($ch);

    // Check response
    if ($response !== false) {
        header("Location: success.html");
        exit();
    } else {
        die("Error: Failed to save to Google Sheet");
    }
}
?>
