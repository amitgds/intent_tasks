<?php

require_once __DIR__ . '/../vendor/autoload.php';

use Admin\NewCracker\Core\Config;
use Admin\NewCracker\Core\Logger;
use Admin\NewCracker\Core\Database;
use Admin\NewCracker\Api\PasswordCrackerApi;

try {
    $config = new Config();
    $logger = new Logger($config->get('LOG_FILE', 'D:/wamp64/logs/password_cracker.log'));
    $database = new Database($config, $logger);
    $api = new PasswordCrackerApi($database, $logger, $config);

    if (isset($_GET['action'])) {
        $api->handleRequest();
        exit;
    }
} catch (Exception $e) {
    $logger = new Logger('D:/wamp64/logs/password_cracker.log');
    $logger->log("Initialization error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Initialization failed: ' . $e->getMessage()]);
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Cracker</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/styles.css">
</head>
<body class="bg-gray-100">
    <div class="container mx-auto p-4">
        <h1 class="text-3xl font-bold mb-4">Password Cracker</h1>
        <div class="mb-4">
            <button onclick="crack('easy')" class="bg-blue-500 text-white px-4 py-2 rounded mr-2">Crack Easy</button>
            <button onclick="crack('medium')" class="bg-blue-500 text-white px-4 py-2 rounded mr-2">Crack Medium</button>
            <button onclick="crack('hard')" class="bg-blue-500 text-white px-4 py-2 rounded">Crack Hard</button>
        </div>
        <div id="results" class="bg-white p-4 rounded shadow"></div>
    </div>
    <script src="js/app.js"></script>
</body>
</html>