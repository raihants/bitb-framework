<?php 
error_reporting(0);
$ip = $_SERVER['REMOTE_ADDR'];

// Eksekusi skrip whitelist di background untuk memberikan akses internet kepada IP ini.
// Kita gunakan exec dengan error suppression agar tidak mengganggu output HTTP jika ada warning.
@exec("sudo " . escapeshellarg($_SERVER["DOCUMENT_ROOT"] . "/whitelist.sh") . " " . escapeshellarg($ip));

// Karena request ini dipanggil via AJAX, kita cukup mengembalikan respon sukses sederhana (HTTP 200).
echo "ok";
?>
