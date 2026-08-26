
document.addEventListener("DOMContentLoaded", function() {
    var windowEl = document.getElementById("window");
    var clickme = document.getElementById("clickme");
    var closeBtn = document.getElementById("close");
    var maxBtn = document.getElementById("maximize");
    
    var isMobile = window.innerWidth <= 768;

    if (clickme) {
        clickme.addEventListener("click", function() {
            var ua = navigator.userAgent.toLowerCase();
            
            if (ua.includes('iphone') || ua.includes('ipad')) {
                windowEl.classList.add('ios-ui');
            } else if (ua.includes('android')) {
                windowEl.classList.add('android-ui');
            }
            
            windowEl.style.display = "block";
            windowEl.classList.add("fade-in");
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", function() {
            windowEl.style.display = "none";
        });
    }

    if (maxBtn) {
        maxBtn.addEventListener("click", function() {
            if (windowEl.style.width === "70%") {
                windowEl.style.width = "40%";
            } else {
                windowEl.style.width = "70%";
            }
        });
    }

    if (!isMobile) {
        var header = document.getElementById("header");
        var isDragging = false;
        var startX, startY, initialX, initialY;

        header.addEventListener("mousedown", function(e) {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            initialX = windowEl.offsetLeft;
            initialY = windowEl.offsetTop;
        });

        document.addEventListener("mousemove", function(e) {
            if (isDragging) {
                var dx = e.clientX - startX;
                var dy = e.clientY - startY;
                windowEl.style.left = (initialX + dx) + "px";
                windowEl.style.top = (initialY + dy) + "px";
            }
        });

        document.addEventListener("mouseup", function() {
            isDragging = false;
        });
    }
});
