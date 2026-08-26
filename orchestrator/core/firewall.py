import subprocess


def get_iptables_rules():
    rules = {}
    for table in ["filter", "nat", "mangle"]:
        try:
            result = subprocess.run(
                ["iptables", "-t", table, "-L", "-n", "--line-numbers"],
                capture_output=True, text=True, timeout=5
            )
            rules[table] = result.stdout
        except (subprocess.TimeoutExpired, FileNotFoundError):
            rules[table] = "unavailable"
    return rules


def get_custom_chains():
    chains = {"bitb": [], "captive": []}
    try:
        result = subprocess.run(
            ["iptables", "-t", "nat", "-L", "-n"],
            capture_output=True, text=True, timeout=5
        )
        output = result.stdout
        if "BITB_NAT" in output:
            chains["bitb"].append("BITB_NAT")
        if "BITB_FWD" in output:
            chains["bitb"].append("BITB_FWD")
        if "BITB_INPUT" in output:
            chains["bitb"].append("BITB_INPUT")
    except (subprocess.TimeoutExpired, FileNotFoundError):
        pass
    return chains
