#!/usr/bin/env bash

set -u

WORKDIR="$(cd "$(dirname "$0")" && pwd)"
WIFI_IFACE="${WIFI_IFACE:-}"
AP_IP="${AP_IP:-10.99.0.1}"

if [[ $EUID -ne 0 ]]; then echo "must be root: sudo $0"; exit 1; fi

if [[ -z "$WIFI_IFACE" ]]; then
  for f in "$WORKDIR"/.run/hostapd.conf; do
    [[ -f "$f" ]] || continue
    WIFI_IFACE="$(awk -F= '/^interface=/{print $2; exit}' "$f")"
  done
fi
[[ -z "$WIFI_IFACE" ]] && WIFI_IFACE="(unknown)"

H()  { echo; echo "============ $* ============"; }
sub(){ echo "-- $* --"; }

H "1. WiFi interface: $WIFI_IFACE"
ip addr show dev "$WIFI_IFACE" 2>&1 | head -15
echo
sub "has IP $AP_IP ?"
if ip addr show dev "$WIFI_IFACE" 2>/dev/null | grep -q "$AP_IP/"; then
  echo "  + YES"
else
  echo "  - NO  <- interface does not have AP_IP, clients cannot connect"
fi

H "2. iw dev (AP mode active?)"
iw dev "$WIFI_IFACE" info 2>&1 | head -10

H "3. hostapd / dnsmasq running?"
sub "hostapd processes"
pgrep -af 'hostapd' || echo "  - no hostapd process running"
echo
sub "dnsmasq processes"
pgrep -af 'dnsmasq' || echo "  - no dnsmasq process running"

H "4. Port binding and BITB server"
sub "listening sockets on 80/443/53"
ss -tlnpu 2>/dev/null | grep -E ':80 |:443 |:53 ' | head -10
echo
sub "test BITB locally (loopback)"
curl -sS -o /dev/null -w "  127.0.0.1:80 /_health -> code=%{http_code} time=%{time_total}s\n" --max-time 3 http://127.0.0.1/_health || echo "  - /_health not responding"
curl -sS -o /dev/null -w "  127.0.0.1:80 /__test  -> code=%{http_code}\n" --max-time 3 http://127.0.0.1/__test || true
echo
sub "test BITB via AP_IP ($AP_IP)"
curl -sS -o /dev/null -w "  $AP_IP:80 /__test -> code=%{http_code} time=%{time_total}s\n" --max-time 3 "http://$AP_IP/__test" || echo "  - AP_IP not responding"

H "5. iptables INPUT (BITB_INPUT installed and counting?)"
sub "INPUT chain (line numbers + verbose)"
iptables -L INPUT -n -v --line-numbers | head -20
echo
sub "BITB_INPUT chain"
iptables -L BITB_INPUT -n -v --line-numbers 2>&1 | head -15
echo
sub "counter incrementing? (if clients are connected, packets should increase)"
iptables -L BITB_INPUT -n -v 2>/dev/null | awk '/dpt:80/ {print "  HTTP packets:", $1}'

H "6. iptables PREROUTING (NAT) - DNAT 80/443 in chain BITB_NAT"
iptables -t nat -L PREROUTING -n -v --line-numbers | head -10
echo
sub "BITB_NAT chain"
iptables -t nat -L BITB_NAT -n -v --line-numbers 2>&1 | head -15

H "7. DHCP leases (who is connected to the AP?)"
LEASES="$WORKDIR/.run/dnsmasq.leases"
if [[ -f "$LEASES" ]]; then
  sub "contents of $LEASES"
  cat "$LEASES" || true
  echo
  if [[ -s "$LEASES" ]]; then
    echo "  + clients have obtained IP addresses"
  else
    echo "  - EMPTY: no clients have obtained a DHCP lease"
    echo "    -> device has not connected to the AP, or DHCP failed"
  fi
else
  echo "  - lease file not found -- dnsmasq has never run or has been stopped"
fi

H "8. NetworkManager / wpa_supplicant (interface conflict?)"
sub "NetworkManager status for interface"
nmcli -t -f DEVICE,STATE,TYPE device status 2>/dev/null | grep "$WIFI_IFACE" || echo "  (nmcli not available or interface not managed)"
echo
sub "wpa_supplicant"
pgrep -af "wpa_supplicant.*$WIFI_IFACE" || echo "  (no wpa_supplicant on $WIFI_IFACE -- good)"

H "9. recent dnsmasq logs (DNS queries from clients)"
journalctl -t dnsmasq -n 15 --no-pager 2>/dev/null || tail -15 /var/log/dnsmasq.log 2>/dev/null || echo "  (cannot read dnsmasq logs)"

H "10. BITB PHP server logs"
sub "checking PHP server on port 8080"
curl -sS -o /dev/null -w "  127.0.0.1:8080 -> code=%{http_code} time=%{time_total}s\n" --max-time 3 http://127.0.0.1:8080/ || echo "  - PHP server not responding on port 8080"

echo
echo "========================================================"
echo "done. Copy this entire output for troubleshooting."
echo "========================================================"
