<?php
$uri      = $_SERVER["REQUEST_URI"];
$path     = parse_url($uri, PHP_URL_PATH);
$filePath = __DIR__ . $path;
$clientIp = $_SERVER['REMOTE_ADDR'];
$apIp     = $_ENV['AP_IP'] ?? $_SERVER['AP_IP'] ?? '10.99.0.1';

if (file_exists($filePath) && !is_dir($filePath)) {
    return false;
}

if (file_exists("/tmp/bitb_allowed_{$clientIp}")) {
    if (strpos($path, 'generate_204') !== false ||
        strpos($path, 'success.txt')  !== false ||
        strpos($path, 'connecttest')  !== false) {
        header("HTTP/1.1 204 No Content");
        header("Content-Length: 0");
        exit();
    }
    
    header("HTTP/1.1 302 Found");
    header("Location: http://{$apIp}/success.html");
    exit();
}

require __DIR__ . '/index.html';
?>
