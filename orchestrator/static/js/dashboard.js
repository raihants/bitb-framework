document.addEventListener("DOMContentLoaded", function() {
    updateGlobalStatus();
    setInterval(updateGlobalStatus, 5000);
});

function updateGlobalStatus() {
    var statusEl = document.getElementById("global-status");
    if (!statusEl) return;

    fetch("/api/status")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            var active = data.active_module;
            var dot = statusEl.querySelector(".status-dot");
            var text = statusEl.querySelector(".status-text");
            
            if (active) {
                dot.className = "status-dot dot-active";
                text.textContent = "Running: " + active;
            } else {
                dot.className = "status-dot";
                dot.style.backgroundColor = "var(--text-muted)";
                dot.style.boxShadow = "none";
                text.textContent = "System Idle";
            }
        })
        .catch(function() {
            var dot = statusEl.querySelector(".status-dot");
            var text = statusEl.querySelector(".status-text");
            dot.className = "status-dot dot-inactive";
            text.textContent = "Backend Offline";
        });
}
