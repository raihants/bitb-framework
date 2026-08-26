#!/bin/bash
if [ "$EUID" -ne 0 ]; then
  echo "Please run as root"
  exit 1
fi
echo "[*] Checking system dependencies..."
if ! dpkg -s hostapd dnsmasq iptables iw curl net-tools rfkill iproute2 conntrack php-cli >/dev/null 2>&1; then
    apt-get update
    apt-get install -y hostapd dnsmasq iptables iw curl net-tools rfkill iproute2 conntrack php-cli
else
    echo "System dependencies already installed."
fi
systemctl disable hostapd dnsmasq
systemctl stop hostapd dnsmasq

# Install hostapd-mana
if ! command -v hostapd-mana &> /dev/null; then
    echo "[*] Installing hostapd-mana from source..."
    apt-get install -y build-essential pkg-config libnl-3-dev libnl-genl-3-dev libssl-dev
    git clone https://github.com/sensepost/hostapd-mana.git .build/hostapd-mana
    cd .build/hostapd-mana/hostapd
    make
    cp hostapd-mana /usr/local/bin/
    cd ../../../
fi
echo "[+] Installation complete!"
