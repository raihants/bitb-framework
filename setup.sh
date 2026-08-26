#!/bin/bash
if [ "$EUID" -ne 0 ]; then
  echo "Please run as root"
  exit 1
fi

echo "[*] Setting up BITB Framework..."
SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)

echo "[*] Phase 1: Checking Python dependencies for Orchestrator..."
if ! dpkg -s python3-flask python3-psutil >/dev/null 2>&1; then
    apt-get update
    apt-get install -y python3-flask python3-psutil python3-dotenv
else
    echo "Python orchestrator dependencies already installed via apt."
fi

echo "[*] Phase 2: Setting up BITB Module..."
cd "$SCRIPT_DIR/modules/bitb"
chmod +x *.sh
./install.sh

echo "[*] Phase 3: Configuring Wireless System & Services..."
rfkill unblock all 2>/dev/null || true
systemctl unmask hostapd 2>/dev/null || true
systemctl stop hostapd 2>/dev/null || true
systemctl stop dnsmasq 2>/dev/null || true
sysctl -w net.ipv4.ip_forward=1 >/dev/null 2>&1

echo "[+] Setup Complete!"
echo "To start the orchestrator dashboard:"
echo "cd $SCRIPT_DIR/orchestrator && sudo python3 app.py"
