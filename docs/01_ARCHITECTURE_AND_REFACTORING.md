# 01. Architecture & Refactoring Strategy

This document explores the overarching design patterns of the Captive Framework PoC and provides concrete advice for developers looking to extract this code into their own projects.

## The Decoupled Paradigm
If you look at the source code, you'll notice a massive chasm between the **Orchestrator** (Python/Flask) and the **Modules** (Bash/PHP/Node.js). They do not communicate via HTTP sockets, IPC, or gRPC. They communicate via **Flat Files and Subprocesses**.

### Why build it this way?
1. **Fault Tolerance:** Evil Twin attacks rely on brittle OS-level networking (`hostapd`, `dnsmasq`, kernel routing tables). If the Node.js payload crashes because of an unhandled promise, the Wi-Fi AP must stay up. If the Python Dashboard crashes, the credentials already written to disk by the module must not be lost.
2. **Language Agnosticism:** You can write an attack module in pure Bash, drop it in a folder, and the Python Orchestrator can run it. 

---

## Process Management: The `subprocess.Popen` Approach

In `app.py` (the Orchestrator), modules are launched like this:
```python
process = subprocess.Popen(
    ["sudo", "bash", "start.sh"], 
    cwd=module_dir, 
    stdout=subprocess.DEVNULL, 
    stderr=subprocess.DEVNULL
)
```
### How it works:
- It spawns a completely independent child process to run the `start.sh` script.
- By piping stdout/stderr to `DEVNULL`, the Python thread does not block and returns immediately, allowing the REST API to respond with a `200 OK`.

### Refactoring Advice (For Production C2s):
**Do not use this approach in production.** `subprocess.Popen` is notorious for leaving "zombie processes" if the parent script dies unexpectedly. 
If you are rewriting the Orchestrator in Go or C++, you should:
1. **Use Process Groups:** Call `setpgid` so that when you kill the attack, the signal cascades to all child bash scripts.
2. **Use Systemd:** For absolute stability, have your Orchestrator generate a transient systemd service (`systemd-run --unit=eviltwin ...`). This lets the Linux init system manage the lifecycle, ensuring `hostapd` is completely killed upon termination.

---

## The Data Interface Contract

Because the Orchestrator and Modules are decoupled, data is passed via a strict "Text Contract".

In `modules/bitb/sites/google/login.php`, you will see:
```php
file_put_contents(
    $_SERVER['DOCUMENT_ROOT'] . '/sites/userpass/usernames.txt', 
    "Username: " . $_POST['email'] . " Pass: " . $_POST['password'] . " [IP: $ip] [Time: " . date("Y-m-d H:i:s") . "]\n", 
    FILE_APPEND
);
```
The Python Orchestrator (`core/credentials.py`) constantly reads this file using Regular Expressions to build the API JSON.

### Refactoring Advice:
While dumping to `.txt` files is incredibly robust against database corruption, it is terrible for scalability and introduces parsing bugs if the victim's password contains the string `[IP:`. 
**If you are extracting this code:**
- Modify the PHP/Node.js payloads to output **NDJSON (Newline Delimited JSON)**. 
- Example: `{"username": "victim", "password": "123", "ip": "10.0.0.1", "time": "..."}`.
- NDJSON retains the crash-resistance of flat files but removes the need for brittle regex parsing in your backend. Alternatively, push directly to a SQLite/Redis socket if your architecture permits.
