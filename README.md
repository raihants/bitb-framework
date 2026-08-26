# BITB Framework (Browser-in-the-Browser)

An orchestration framework for testing Browser-in-the-Browser (BITB) phishing templates and captive portal deployments.

## Architecture

This project features a modern Flask-based dashboard to manage and test 33+ BITB target templates:

- **Browser-in-the-Browser (BITB)**: Simulates a fake popup browser window inside a captive portal. Victims see a realistic login interface with custom URL bars, SSL indicators, and User-Agent detection.

---

## Deployment Modes

The framework supports two distinct operational modes:

### 1. Dev Mode (Local Preview)
- **No WiFi Adapter Required**: Runs a standalone PHP web server on `http://localhost:8080`.
- **Instant Preview**: Selecting a target site and clicking **Deploy BITB** will automatically open the generated BITB template in a new browser tab.
- Ideal for template testing, UI adjustments, and local demonstrations.

### 2. WiFi AP Mode (Live Hotspot)
- **Evil Twin Captive Portal**: Deploys a rogue Access Point (using `hostapd` & `dnsmasq`) and redirects all client traffic to the BITB portal via iptables rules.
- Requires a WiFi adapter capable of AP/Master mode.

---

## Installation

Run the automated setup script as root:

```bash
sudo ./setup.sh
```

The script automatically installs Python dependencies, configures the BITB module, unblocks wireless interfaces (`rfkill`), unmasks `hostapd`, and enables IPv4 forwarding.

---

## Usage

Start the orchestrator dashboard:

```bash
cd orchestrator
sudo python3 app.py
```

Open your browser to: **`http://127.0.0.1:8888`**

### Running in Dev Mode:
1. Navigate to **BITB Module**.
2. Select **Dev Mode**.
3. Choose your **Target Site Template** (e.g., `instagram`, `facebook`, `google`).
4. Click **Deploy BITB**. A new tab will automatically open at `http://localhost:8080`.

### Running in WiFi AP Mode:
1. Navigate to **BITB Module**.
2. Select **WiFi AP Mode**.
3. Select your **AP Interface** (e.g., `wlan0`) and **Internet Uplink Interface** (e.g., `eth0`).
4. Set your target SSID and click **Deploy BITB**.

---

## Requirements

- Linux OS (Kali Linux / Debian / Ubuntu)
- Python 3.8+ (`flask`, `psutil`, `python-dotenv`)
- PHP CLI (`php-cli` for running local preview servers)
- WiFi Adapter supporting AP mode (only required for WiFi AP Mode)
