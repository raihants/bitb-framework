#!/usr/bin/env bash

IP=$1
AP_IP="${AP_IP:-10.99.0.1}"

if [[ -z "$IP" ]]; then
    echo "Usage: $0 <IP_ADDRESS>"
    exit 1
fi

if ! [[ "$IP" =~ ^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$ ]]; then
    echo "[x] Invalid IP address: $IP"
    exit 1
fi

NAT_CHAIN="BITB_NAT"
FWD_CHAIN="BITB_FWD"

if iptables -t nat -C "$NAT_CHAIN" -s "$IP" ! -d "$AP_IP" -j RETURN 2>/dev/null; then
    echo "[*] IP $IP is already whitelisted."
    exit 0
fi

echo "[*] Whitelisting IP: $IP"

iptables -t nat -I "$NAT_CHAIN" 1 -s "$IP" ! -d "$AP_IP" -j RETURN

iptables -I "$FWD_CHAIN" 1 -s "$IP" -j ACCEPT

conntrack -D -s "$IP" 2>/dev/null || true

touch "/tmp/bitb_allowed_${IP}"

echo "[+] IP $IP now has full internet access."
