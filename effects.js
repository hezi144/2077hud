function setupMouseGlow() {
  const glow = document.getElementById("mouseGlow");
  if (!glow) return;

  window.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });
}

function runBootScreen() {
  const boot = document.getElementById("bootScreen");
  const log = document.getElementById("bootLog");
  const bar = document.getElementById("progressBar");

  if (!boot || !log || !bar) return;

  const lines = [
    "[SYSTEM] Initializing Cyber UI...",
    "[NET] Connecting to profile node...",
    "[DATA] Loading biography module...",
    "[DATA] Loading history module...",
    "[DATA] Loading social network module...",
    "[SECURITY] Firewall status: OK",
    "[UI] Rendering HUD overlay...",
    "[DONE] Boot complete."
  ];

  let i = 0;
  let progress = 0;

  const timer = setInterval(() => {
    if (i < lines.length) {
      log.innerText += lines[i] + "\n";
      i++;
      progress += Math.floor(100 / lines.length);
      bar.style.width = progress + "%";
    } else {
      bar.style.width = "100%";
      clearInterval(timer);

      setTimeout(() => {
        boot.classList.add("hidden");
      }, 500);
    }
  }, 260);
}

function setupCyberNavigation() {
  const cards = document.querySelectorAll("[data-link]");
  const flash = document.getElementById("flashTransition");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const link = card.getAttribute("data-link");
      if (!link) return;

      if (flash) flash.classList.add("active");

      setTimeout(() => {
        window.location.href = link;
      }, 250);
    });
  });
}