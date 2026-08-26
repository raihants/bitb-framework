#!/usr/bin/env bash

set -u

WIFI_IFACE="${WIFI_IFACE:-wlan0}"
AP_IP="${AP_IP:-10.99.0.1}"
AP_NET="${AP_NET:-10.99.0.0/24}"
NAT_CHAIN="BITB_NAT"
FWD_CHAIN="BITB_FWD"
INP_CHAIN="BITB_INPUT"

WORKDIR="$(cd "$(dirname "$0")" && pwd)"
RUN_DIR="${WORKDIR}/.run"

log()  { echo -e "\033[1;36m[*]\033[0m $*"; }
ok()   { echo -e "\033[1;32m[+]\033[0m $*"; }
warn() { echo -e "\033[1;33m[!]\033[0m $*"; }

if [[ $EUID -ne 0 ]]; then echo "must be root"; exit 1; fi

find "${RUN_DIR}" -name '*.bak' -mtime +1 -delete 2>/dev/null || true

log "stopping daemons (if running)"
for f in "${RUN_DIR}"/hostapd.pid "${RUN_DIR}"/dnsmasq.pid; do
  [[ -f "$f" ]] || continue
  pid="$(cat "$f" 2>/dev/null || true)"
  [[ -n "${pid}" ]] && kill "${pid}" 2>/dev/null && sleep 0.3 && kill -9 "${pid}" 2>/dev/null
  rm -f "$f"
done
pkill -f 'hostapd-mana' 2>/dev/null || true
pkill -f "hostapd .*${RUN_DIR}" 2>/dev/null || true
pkill -f "dnsmasq .*${RUN_DIR}" 2>/dev/null || true

log "removing IP from ${WIFI_IFACE}"
ip addr show dev "${WIFI_IFACE}" 2>/dev/null | grep -q "${AP_IP}/" && \
  ip addr del "${AP_IP}/24" dev "${WIFI_IFACE}" 2>/dev/null || true

log "detaching and removing custom chains ${NAT_CHAIN}/${FWD_CHAIN}/${INP_CHAIN}"
iptables -t nat -D PREROUTING  -i "${WIFI_IFACE}" -j "${NAT_CHAIN}" 2>/dev/null || true
iptables -t nat -D POSTROUTING -s "${AP_NET}" ! -o "${WIFI_IFACE}" -j MASQUERADE 2>/dev/null || true
iptables -t nat -D POSTROUTING -j "${NAT_CHAIN}" 2>/dev/null || true
iptables -t nat -F "${NAT_CHAIN}" 2>/dev/null || true
iptables -t nat -X "${NAT_CHAIN}" 2>/dev/null || true

iptables -D FORWARD -j "${FWD_CHAIN}" 2>/dev/null || true
iptables -F "${FWD_CHAIN}" 2>/dev/null || true
iptables -X "${FWD_CHAIN}" 2>/dev/null || true

iptables -D INPUT -j "${INP_CHAIN}" 2>/dev/null || true
iptables -F "${INP_CHAIN}" 2>/dev/null || true
iptables -X "${INP_CHAIN}" 2>/dev/null || true

last_orig="$(ls -1t "${RUN_DIR}"/orig-forward.* 2>/dev/null | head -1 || true)"
if [[ -n "${last_orig}" && -f "${last_orig}" ]]; then
  sysctl -w net.ipv4.ip_forward="$(cat "${last_orig}")" >/dev/null 2>&1 || true
  rm -f "${last_orig}"
fi

ok "cleanup complete. Other project rules were not modified."
warn "To fully restore from the initial backup:"
ls -1t "${RUN_DIR}"/iptables-v4.*.bak 2>/dev/null | head -1 | sed 's|^|  iptables-restore < |' || true
