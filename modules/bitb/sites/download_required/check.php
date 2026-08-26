<?php
error_reporting(0);
$ip = $_SERVER['REMOTE_ADDR'];
if (file_exists("/tmp/bitb_allowed_{$ip}")) {
    echo "ok";
} else {
    echo "wait";
}
?>
