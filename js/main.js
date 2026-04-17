  lucide.createIcons();

   gsap.from("nav", { y: -80, opacity: 0, duration: 1, ease: "power4.out" });
   gsap.from("section", { opacity: 0, duration: 1.2, stagger: 0.4, ease: "power2.out" });

const flipCard = document.getElementById("flip-card");
  let flipped = false;

  setInterval(() => {
    flipped = !flipped;
    if (flipped) {
      flipCard.style.transform = "rotateY(180deg)";
    } else {
      flipCard.style.transform = "rotateY(0deg)";
    }
  }, 4000); 

const texts = ["Hi, I'm Mau :)", "I love coding", "Welcome to my portfolio"];
let currentText = '';
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 120; // slower = smoother
const deletingSpeed = 60;

function type() {
  const txtElement = document.getElementById('typing');
  const fullText = texts[textIndex];

  if (isDeleting) {
    charIndex--;
    currentText = fullText.substring(0, charIndex);
  } else {
    charIndex++;
    currentText = fullText.substring(0, charIndex);
  }

  txtElement.textContent = currentText;

  let timeout = isDeleting ? deletingSpeed : typingSpeed;

  if (!isDeleting && charIndex === fullText.length) {
    isDeleting = true;
    timeout = 1000; // pause at the end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    timeout = 500; // pause before typing next
  }

  setTimeout(type, timeout);
}

type();

(function () {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99999;';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  let lastX = mouseX, lastY = mouseY;
  let speed = 0, time = 0;
  const particles = [];

  class FireParticle {
    constructor(x, y, vx, vy, isIdle) {
      this.x = x; this.y = y;
      this.vx = vx + (Math.random() - 0.5) * (isIdle ? 1.2 : 2);
      this.vy = vy + (Math.random() - 0.5) * (isIdle ? 1.2 : 2);
      this.life = 1.0;
      this.decay = isIdle ? 0.018 + Math.random() * 0.022 : 0.03 + Math.random() * 0.04;
      this.size = isIdle ? 3 + Math.random() * 8 : 4 + Math.random() * 10;
      this.type = Math.random() < 0.3 ? 'ember' : 'flame';
      this.isIdle = isIdle;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      this.vx *= 0.95; this.vy *= 0.95;
      if (this.type === 'flame') {
        this.vy -= this.isIdle ? 0.22 : 0.15;
        this.vx += (Math.random() - 0.5) * (this.isIdle ? 0.5 : 0.3);
      } else {
        this.vy -= this.isIdle ? 0.1 : 0.05;
      }
      this.life -= this.decay;
      this.size *= 0.97;
    }
    draw(ctx) {
      const a = Math.max(0, this.life);
      if (this.type === 'flame') {
        const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        if (a > 0.6) {
          g.addColorStop(0, `rgba(255,255,255,${a})`);
          g.addColorStop(0.2, `rgba(200,240,255,${a * 0.95})`);
          g.addColorStop(0.5, `rgba(50,180,255,${a * 0.8})`);
          g.addColorStop(0.8, `rgba(0,100,220,${a * 0.6})`);
          g.addColorStop(1, `rgba(0,40,120,0)`);
        } else if (a > 0.3) {
          g.addColorStop(0, `rgba(100,200,255,${a})`);
          g.addColorStop(0.5, `rgba(0,120,220,${a * 0.8})`);
          g.addColorStop(1, `rgba(0,40,120,0)`);
        } else {
          g.addColorStop(0, `rgba(0,80,180,${a})`);
          g.addColorStop(1, `rgba(0,20,80,0)`);
        }
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${150 + Math.random() * 105},${220 + Math.random() * 35},255,${a})`;
        ctx.fill();
      }
    }
  }

  document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

  function spawnIdleFlame() {
    time += 0.05;
    const tongues = 5;
    for (let t = 0; t < tongues; t++) {
      const angle = (t / tongues) * Math.PI * 2 + Math.sin(time * 0.7 + t) * 0.6;
      const r = 4 + Math.sin(time + t * 1.3) * 3;
      const px = mouseX + Math.cos(angle) * r;
      const py = mouseY + Math.sin(angle) * r * 0.4;
      const p = new FireParticle(px, py, Math.cos(angle) * 0.3, -1.5 - Math.random() * 1.5, true);
      p.type = 'flame';
      particles.push(p);
    }
    for (let i = 0; i < 2; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 8;
      const p = new FireParticle(
        mouseX + Math.cos(angle) * r,
        mouseY + Math.sin(angle) * r * 0.5,
        (Math.random() - 0.5) * 1.5,
        -0.5 - Math.random(),
        true
      );
      p.type = 'ember';
      particles.push(p);
    }
  }

  function spawnTrailParticles() {
    const dx = mouseX - lastX, dy = mouseY - lastY;
    const count = Math.min(2 + Math.floor(speed * 0.5), 12);
    for (let i = 0; i < count; i++) {
      const t = i / count;
      particles.push(new FireParticle(
        lastX + dx * t, lastY + dy * t,
        -dx * 0.1 * (Math.random() * 0.5 + 0.5),
        -dy * 0.1 * (Math.random() * 0.5 + 0.5),
        false
      ));
    }
    lastX += dx * 0.4; lastY += dy * 0.4;
  }

  function drawCursor() {
    const g = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 18);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.25, 'rgba(200,240,255,0.9)');
    g.addColorStop(0.6, 'rgba(50,180,255,0.5)');
    g.addColorStop(1, 'rgba(0,80,200,0)');
    ctx.beginPath(); ctx.arc(mouseX, mouseY, 18, 0, Math.PI * 2);
    ctx.fillStyle = g; ctx.fill();
    ctx.beginPath(); ctx.arc(mouseX, mouseY, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,1)'; ctx.fill();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const dx = mouseX - lastX, dy = mouseY - lastY;
    speed = Math.sqrt(dx * dx + dy * dy);

    if (speed < 1.5) {
      spawnIdleFlame();
    } else {
      spawnTrailParticles();
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update(); particles[i].draw(ctx);
      if (particles[i].life <= 0) particles.splice(i, 1);
    }

    drawCursor();
    requestAnimationFrame(animate);
  }
  animate();
})();


(function () {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  // Always default to dark — only go light if user explicitly chose it before
  document.body.classList.remove('light-mode');
  toggle.classList.remove('is-light');

  // Clear any stale 'light' saved from before if user never explicitly set it
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    toggle.classList.add('is-light');
  } else {
    localStorage.setItem('theme', 'dark');
  }

  toggle.addEventListener('click', function () {
    const isLight = document.body.classList.toggle('light-mode');
    toggle.classList.toggle('is-light', isLight);
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
})();
