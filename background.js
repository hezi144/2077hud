// ==========================
// CYBER BACKGROUND SYSTEM v2
// 使用 index.html 中已有的 <canvas id="cyberBg">
// 颜色：2077 黄
// 速度：中等
// 不抢鼠标事件，不挡按钮
// ==========================

// 直接使用已有 canvas
const bgCanvas = document.getElementById("cyberBg");

if (!bgCanvas) {
  console.error("[CYBER BG] 找不到 canvas #cyberBg");
} else {
  bgCanvas.style.pointerEvents = "none";
  bgCanvas.style.zIndex = "0";

  const bgCtx = bgCanvas.getContext("2d");

  function resizeBg() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
  }

  resizeBg();
  window.addEventListener("resize", resizeBg);

  // 2077 黄
  const colors = ["#fcee09", "#ffe95a", "#ffdd00"];

  const particles = [];

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = random(0, bgCanvas.width);
      this.y = random(0, bgCanvas.height);
      this.r = random(0.8, 2.8);

      // ⭐ 中等速度（比你原来快一点）
      this.vx = random(-0.25, 0.25);
      this.vy = random(-0.18, 0.18);

      this.color = colors[Math.floor(random(0, colors.length))];
      this.alpha = random(0.25, 0.7);
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (
        this.x < -20 ||
        this.x > bgCanvas.width + 20 ||
        this.y < -20 ||
        this.y > bgCanvas.height + 20
      ) {
        this.reset();
      }
    }

    draw() {
      bgCtx.beginPath();
      bgCtx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      bgCtx.fillStyle = this.color;
      bgCtx.globalAlpha = this.alpha;
      bgCtx.fill();
    }
  }

  // 初始化粒子数量（适中）
  for (let i = 0; i < 170; i++) {
    particles.push(new Particle());
  }

  function animateBg() {
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);

    // 背景渐变（暗色）
    const grad = bgCtx.createLinearGradient(0, 0, bgCanvas.width, bgCanvas.height);
    grad.addColorStop(0, "rgba(5,5,10,0.65)");
    grad.addColorStop(1, "rgba(0,0,0,0.55)");

    bgCtx.globalAlpha = 1;
    bgCtx.fillStyle = grad;
    bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);

    // 粒子绘制
    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    bgCtx.globalAlpha = 1;

    requestAnimationFrame(animateBg);
  }

  animateBg();
}