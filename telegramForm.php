<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$botToken = getenv('BOT_TOKEN');
$chatId = getenv('CHAT_ID');

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['name']) || !isset($data['email']) || 
    !isset($data['phone']) || !isset($data['service']) || 
    !isset($data['message'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Missing required fields']);
    exit;
}

$name = htmlspecialchars($data['name']);
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars($data['phone']);
$service = htmlspecialchars($data['service']);
$message = htmlspecialchars($data['message']);

$telegramMessage = "🌿 Nouă cerere de la Gazon A-Z! 🌿\n\n" .
                   "👤 Nume: $name\n" .
                   "✉️ Email: $email\n" .
                   "📱 Telefon: $phone\n" .
                   "🌱 Serviciu dorit: $service\n\n" .
                   "💬 Mesaj:\n$message";

$website = "https://api.telegram.org/bot$botToken/sendMessage";
$payload = [
    'chat_id' => $chatId,
    'text' => $telegramMessage
];

$ch = curl_init($website);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);

$result = curl_exec($ch);

if ($result === false) {
    $error = curl_error($ch);
    curl_close($ch);
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Curl error: ' . $error]);
    exit;
}

curl_close($ch);

$response = json_decode($result, true);

if ($response['ok']) {
    http_response_code(200);
    echo json_encode(['status' => 'success', 'message' => 'Mesaj trimis cu success!']);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $response['description']]);
}
?>