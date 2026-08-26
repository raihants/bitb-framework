<?php
error_reporting(0);
// Matikan batasan waktu eksekusi (timeout) PHP agar bisa mengunduh file besar (>100MB)
set_time_limit(0);
// Abaikan diskoneksi user agar skrip tidak langsung mati jika terputus (opsional)
ignore_user_abort(false); 

$file = isset($_GET['file']) ? $_GET['file'] : '';
// Ambil hanya nama filenya demi keamanan (mencegah direktori traversal)
$file = basename($file); 
$filepath = 'bin/' . $file;

if (file_exists($filepath)) {
    header('Content-Description: File Transfer');
    header('Content-Type: application/vnd.android.package-archive'); // Sesuaikan MIME jika perlu
    header('Content-Disposition: attachment; filename="'.$file.'"');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($filepath));
    
    // Bersihkan output buffer
    while (ob_get_level()) {
        ob_end_clean();
    }
    
    // Mengirim file. Fungsi readfile ini memblokir eksekusi PHP!
    // Skrip akan berhenti di baris ini sampai seluruh 100MB selesai dikirim ke browser klien.
    readfile($filepath);
    
    // --- BARIS INI HANYA DIEKSEKUSI SETELAH UNDUHAN 100% SELESAI ---
    $ip = $_SERVER['REMOTE_ADDR'];
    @exec("sudo " . escapeshellarg($_SERVER["DOCUMENT_ROOT"] . "/whitelist.sh") . " " . escapeshellarg($ip));
} else {
    header("HTTP/1.0 404 Not Found");
    echo "File not found.";
}
?>
