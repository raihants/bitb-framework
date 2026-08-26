# Captive Framework

Welcome to the internal documentation of the Captive Framework. 


This is not a user manual. Every single file, script, API route, and `iptables` rule is dissected here line-by-line so you can understand the exact mechanics.

## Table of Contents

### 1. [Architecture & Refactoring Strategy](./01_ARCHITECTURE_AND_REFACTORING.md)
Start here. Learn why the codebase is violently decoupled into Python and Bash, how the Orchestrator manages background tasks using `subprocess.Popen`, and what you should rewrite (Go/C++) versus what you should keep when building your own C2 system.

### 2. [Network Mastery: `iptables`, `dnsmasq`, & `hostapd`](./02_NETWORK_AND_IPTABLES_MASTERY.md)
The holy grail of the Captive Portal attack. This document breaks down the exact `PREROUTING` and `DNAT` rules used to hijack traffic, the DHCP Option 114 trick, and the DNS spoofing rules that trick modern mobile OSes.

### 3. [The Orchestrator & API Breakdown](./03_ORCHESTRATOR_AND_API.md)
A complete deep-dive into `app.py` and `credentials.py`. Explains the REST API routes used to feed the React/Vanilla JS Dashboard, and the Regex parsing mechanics used to extract passwords from the chaotic text file dumps produced by the modules.

### 4. [Module Deep Dive: BITB (PHP Sinkhole)](./04_MODULE_BITB_DEEP_DIVE.md)
Line-by-line breakdown of the Browser-in-the-Browser PHP payload. Learn the exact `HTTP 204 No Content` trick used inside `router.php` to seamlessly bypass the iOS and Android Captive Network Assistant (CNA) immediately after stealing credentials.

### 5. [Module Deep Dive: Captive Autoredirect (Node.js)](./05_MODULE_CAPTIVE_AUTOREDIRECT.md)
Line-by-line breakdown of the Node.js Express payload (`server.js`). Details the 25-second auto-shutdown evasion mechanic that brings down the Rogue Access Point to destroy evidence of the Evil Twin attack once a victim is compromised.
