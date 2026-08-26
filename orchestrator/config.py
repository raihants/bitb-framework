import os
import json
import subprocess
import re
from dotenv import load_dotenv

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, ".env"))
MODULES_DIR = os.path.join(os.path.dirname(BASE_DIR), "modules")
CONFIG_FILE = os.path.join(BASE_DIR, "settings.json")

DEFAULT_SETTINGS = {
    "deploy_mode": "dev",  # 'dev' for standalone local preview, 'wifi' for AP captive portal testing
    "ap_interface": "",
    "internet_interface": "",
    "ssid": "Free WiFi",
    "ap_ip": "10.99.0.1",
    "ap_netmask": "255.255.255.0",
    "dhcp_range_start": "10.99.0.50",
    "dhcp_range_end": "10.99.0.150",
    "channel": 6,
    "enable_nat": True,
    "dns_servers": "8.8.8.8,1.1.1.1",
    "auto_shutdown": False,
    "enable_upload": False,
}

BITB_DIR = os.path.join(MODULES_DIR, "bitb")


def load_settings():
    settings = DEFAULT_SETTINGS.copy()
    if os.path.exists(CONFIG_FILE):
        with open(CONFIG_FILE, "r") as f:
            saved = json.load(f)
            settings.update(saved)
    return settings


def save_settings(settings):
    with open(CONFIG_FILE, "w") as f:
        json.dump(settings, f, indent=2)


def get_wifi_interfaces():
    interfaces = []
    try:
        result = subprocess.run(
            ["iw", "dev"],
            capture_output=True, text=True, timeout=5
        )
        current_iface = None
        for line in result.stdout.splitlines():
            line = line.strip()
            if line.startswith("Interface "):
                current_iface = line.split()[1]
            if current_iface and line.startswith("type "):
                iface_type = line.split()[1]
                interfaces.append({
                    "name": current_iface,
                    "type": iface_type,
                })
                current_iface = None
    except (subprocess.TimeoutExpired, FileNotFoundError):
        pass

    for iface in interfaces:
        iface["supports_ap"] = check_ap_support(iface["name"])

    return interfaces


def check_ap_support(iface_name):
    try:
        phy = None
        result = subprocess.run(
            ["iw", "dev", iface_name, "info"],
            capture_output=True, text=True, timeout=5
        )
        for line in result.stdout.splitlines():
            if "wiphy" in line:
                phy = "phy" + line.strip().split()[-1]
                break
        if not phy:
            return False

        result = subprocess.run(
            ["iw", "phy", phy, "info"],
            capture_output=True, text=True, timeout=5
        )
        return "* AP" in result.stdout
    except (subprocess.TimeoutExpired, FileNotFoundError):
        return False


def get_network_interfaces():
    interfaces = []
    try:
        result = subprocess.run(
            ["ip", "-o", "link", "show"],
            capture_output=True, text=True, timeout=5
        )
        for line in result.stdout.splitlines():
            parts = line.split(": ")
            if len(parts) >= 2:
                name = parts[1].split("@")[0]
                if name == "lo":
                    continue
                state = "UP" if "state UP" in line else "DOWN"
                interfaces.append({"name": name, "state": state})
    except (subprocess.TimeoutExpired, FileNotFoundError):
        pass
    return interfaces


def get_bitb_sites():
    sites_dir = os.path.join(BITB_DIR, "sites")
    sites = []
    if not os.path.isdir(sites_dir):
        return sites
    for name in sorted(os.listdir(sites_dir)):
        site_path = os.path.join(sites_dir, name)
        if os.path.isdir(site_path) and name != "userpass":
            has_index = os.path.exists(os.path.join(site_path, "index.php"))
            if has_index:
                sites.append(name)
    return sites
