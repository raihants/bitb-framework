# 03. Orchestrator & API Deep Dive

The Python Orchestrator (`app.py`, `config.py`, `core/credentials.py`) acts as the command and control plane. It is a Flask-based REST API server that wraps the underlying Bash scripts.

---

## 1. Flask Application Initialization (`app.py`)

The entry point of the Orchestrator. It serves both the REST API and the static React/Vanilla JS Dashboard.

### Static File Serving
```python
app = Flask(__name__, static_folder='static', template_folder='templates')

@app.route('/')
def index():
    return render_template('index.html')
```
**Explanation:** The Orchestrator does not just serve JSON; it serves the frontend Dashboard. This makes the PoC a standalone executable. 
*Refactoring Advice:* In a production C2, you should decouple this completely. Compile your React frontend into static assets and serve them via Nginx or an S3 bucket, leaving the Python/Go backend strictly as an API server.

### State Management (The Global Variable Problem)
```python
current_process = None
active_module = None
```
**Explanation:** The Orchestrator uses global Python variables to track if an attack is currently running.
*Refactoring Advice:* This global state prevents running multiple Rogue APs on multiple wireless interfaces simultaneously. If you refactor this, use an in-memory datastore like Redis or a SQL database to track `jobs`, their `PIDs`, and their bound `interfaces`.

---

## 2. Configuration Management (`config.py`)

```python
CONFIG_FILE = os.path.join(os.path.dirname(__file__), 'settings.json')

def load_settings():
    if os.path.exists(CONFIG_FILE):
        with open(CONFIG_FILE, 'r') as f:
            return json.load(f)
    return {}
```
**Explanation:** When a user clicks "Start" on the Dashboard, the frontend sends a JSON payload. The Orchestrator saves this to `settings.json` on disk.
*Why write to disk?* Because the `start.sh` bash scripts are entirely separate processes. They cannot read Python's memory. Instead, they `source` or read environment variables/files to know which interface to bind to.

---

## 3. Decoupled Data Ingestion (`credentials.py`)

This file bridges the gap between the isolated modules and the Orchestrator's unified API response.

### The BITB Parser (`get_bitb_credentials`)
```python
pattern = r"Username:\s*(.*?)\s*Pass:\s*(.*?)\s*\[IP:\s*(.*?)\]\s*\[Time:\s*(.*?)\]"
match = re.search(pattern, line)
```
**Explanation:** The Orchestrator opens the module's log file (`usernames.txt`) and iterates line-by-line. It uses a Regular Expression capture group to extract the Username (Group 1), Password (Group 2), IP (Group 3), and Timestamp (Group 4).

### The SQLite Parser (`get_captive_credentials`)
```python
conn = sqlite3.connect(db_path)
cursor = conn.cursor()
cursor.execute("SELECT site, username, password, ip_address, timestamp FROM credentials")
```
**Explanation:** The Autoredirect module uses SQLite. The Orchestrator directly queries this database file.

### Unified Sorting Logic
```python
all_creds.sort(key=lambda x: parse_timestamp(x['timestamp']), reverse=True)
```
**Explanation:** We normalize string timestamps from both PHP `date()` and Node.js SQLite timestamps into Python `datetime` objects. We then sort the merged array so the UI always shows the newest hit at the top.

---

## 4. API Route Specifications

If you are building your own Dashboard (React, Vue, CLI), you will interact exclusively with these JSON endpoints.

#### `GET /api/credentials`
Fetches a unified array of all captured credentials.
**Response:**
```json
[
  {
    "module": "captive-autoredirect",
    "site": "Instagram",
    "username": "victim",
    "password": "password",
    "ip": "10.0.0.5",
    "timestamp": "2026-06-08 12:00:00"
  }
]
```

#### `GET /api/status`
Returns the current runtime state. Polled by the Dashboard every 5 seconds.
**Response:**
```json
{
  "active_module": "bitb",
  "is_running": true,
  "config": {
    "interface": "wlan1",
    "internet_interface": "eth0",
    "ssid": "Public_WiFi"
  }
}
```

#### `POST /api/bitb/start`
Starts the BITB module. The Flask backend takes the JSON payload, writes it to `settings.json`, and triggers `subprocess.Popen(["sudo", "bash", "run.sh"])`.
**Request:**
```json
{
  "interface": "wlan1",
  "internet_interface": "eth0",
  "ssid": "Free WiFi",
  "target": "google"
}
```

#### `POST /api/stop`
Kills the currently running module.
**The Mechanic:** 
It executes `sudo pkill -f hostapd` and runs the respective module's `cleanup.sh` or `stop-server.sh`. This flushes the NAT iptables and un-hijacks the port 80/443 traffic.

---

## 5. Developer FAQ: Orchestrator Edition

**Q: Why does `app.py` throw a Permission Denied error when saving `settings.json`?**
**A:** Because the bash scripts run as `root` (via `sudo`), they may create or modify files with root ownership. If you run `python3 app.py` as a standard user, Flask cannot overwrite `settings.json`. **Always run the Orchestrator via `sudo python3 app.py`.**

**Q: If the Orchestrator dies, do the attack modules stop?**
**A:** No. Because we use `subprocess.Popen` without attaching the child processes to the parent's process group, the Bash scripts (`hostapd`, `dnsmasq`, Node.js) become orphaned and continue running in the background. This is a double-edged sword: it provides fault tolerance, but requires manual cleanup (`sudo killall hostapd`) if the Orchestrator crashes.

**Q: How do I scale this to handle 10,000 credentials?**
**A:** The current `credentials.py` reads the entire text file into memory and sorts it on every API call. This is fine for a PoC. For production, refactor the payloads to push credentials to a message broker (RabbitMQ/Redis) or insert directly into a centralized PostgreSQL database with an indexed timestamp column.

**Q: Can I run both BITB and Captive-Autoredirect at the same time?**
**A:** Not in this PoC. The global variables `current_process` and `active_module` only track one state. Furthermore, both modules attempt to bind to port 53 for `dnsmasq` and manipulate the same `iptables` PREROUTING chains, which will cause port conflicts. To run simultaneously, you must refactor the network scripts to use separate network namespaces (`ip netns`) or distinct IP subnets (e.g., `10.99.0.1` and `10.99.1.1`).
