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

// (function () {
//   const canvas = document.createElement('canvas');
//   canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99999;';
//   document.body.appendChild(canvas);
//   const ctx = canvas.getContext('2d');

//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
//   window.addEventListener('resize', () => {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//   });

//   let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
//   let lastX = mouseX, lastY = mouseY;
//   let speed = 0, time = 0;
//   const particles = [];

//   class FireParticle {
//     constructor(x, y, vx, vy, isIdle) {
//       this.x = x; this.y = y;
//       this.vx = vx + (Math.random() - 0.5) * (isIdle ? 1.2 : 2);
//       this.vy = vy + (Math.random() - 0.5) * (isIdle ? 1.2 : 2);
//       this.life = 1.0;
//       this.decay = isIdle ? 0.018 + Math.random() * 0.022 : 0.03 + Math.random() * 0.04;
//       this.size = isIdle ? 3 + Math.random() * 8 : 4 + Math.random() * 10;
//       this.type = Math.random() < 0.3 ? 'ember' : 'flame';
//       this.isIdle = isIdle;
//     }
//     update() {
//       this.x += this.vx; this.y += this.vy;
//       this.vx *= 0.95; this.vy *= 0.95;
//       if (this.type === 'flame') {
//         this.vy -= this.isIdle ? 0.22 : 0.15;
//         this.vx += (Math.random() - 0.5) * (this.isIdle ? 0.5 : 0.3);
//       } else {
//         this.vy -= this.isIdle ? 0.1 : 0.05;
//       }
//       this.life -= this.decay;
//       this.size *= 0.97;
//     }
//     draw(ctx) {
//       const a = Math.max(0, this.life);
//       if (this.type === 'flame') {
//         const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
//         if (a > 0.6) {
//           g.addColorStop(0, `rgba(255,255,255,${a})`);
//           g.addColorStop(0.2, `rgba(200,240,255,${a * 0.95})`);
//           g.addColorStop(0.5, `rgba(50,180,255,${a * 0.8})`);
//           g.addColorStop(0.8, `rgba(0,100,220,${a * 0.6})`);
//           g.addColorStop(1, `rgba(0,40,120,0)`);
//         } else if (a > 0.3) {
//           g.addColorStop(0, `rgba(100,200,255,${a})`);
//           g.addColorStop(0.5, `rgba(0,120,220,${a * 0.8})`);
//           g.addColorStop(1, `rgba(0,40,120,0)`);
//         } else {
//           g.addColorStop(0, `rgba(0,80,180,${a})`);
//           g.addColorStop(1, `rgba(0,20,80,0)`);
//         }
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//         ctx.fillStyle = g; ctx.fill();
//       } else {
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.size * 0.4, 0, Math.PI * 2);
//         ctx.fillStyle = `rgba(${150 + Math.random() * 105},${220 + Math.random() * 35},255,${a})`;
//         ctx.fill();
//       }
//     }
//   }

//   document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

//   function spawnIdleFlame() {
//     time += 0.05;
//     const tongues = 5;
//     for (let t = 0; t < tongues; t++) {
//       const angle = (t / tongues) * Math.PI * 2 + Math.sin(time * 0.7 + t) * 0.6;
//       const r = 4 + Math.sin(time + t * 1.3) * 3;
//       const px = mouseX + Math.cos(angle) * r;
//       const py = mouseY + Math.sin(angle) * r * 0.4;
//       const p = new FireParticle(px, py, Math.cos(angle) * 0.3, -1.5 - Math.random() * 1.5, true);
//       p.type = 'flame';
//       particles.push(p);
//     }
//     for (let i = 0; i < 2; i++) {
//       const angle = Math.random() * Math.PI * 2;
//       const r = Math.random() * 8;
//       const p = new FireParticle(
//         mouseX + Math.cos(angle) * r,
//         mouseY + Math.sin(angle) * r * 0.5,
//         (Math.random() - 0.5) * 1.5,
//         -0.5 - Math.random(),
//         true
//       );
//       p.type = 'ember';
//       particles.push(p);
//     }
//   }

//   function spawnTrailParticles() {
//     const dx = mouseX - lastX, dy = mouseY - lastY;
//     const count = Math.min(2 + Math.floor(speed * 0.5), 12);
//     for (let i = 0; i < count; i++) {
//       const t = i / count;
//       particles.push(new FireParticle(
//         lastX + dx * t, lastY + dy * t,
//         -dx * 0.1 * (Math.random() * 0.5 + 0.5),
//         -dy * 0.1 * (Math.random() * 0.5 + 0.5),
//         false
//       ));
//     }
//     lastX += dx * 0.4; lastY += dy * 0.4;
//   }

//   function drawCursor() {
//     const g = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 18);
//     g.addColorStop(0, 'rgba(255,255,255,1)');
//     g.addColorStop(0.25, 'rgba(200,240,255,0.9)');
//     g.addColorStop(0.6, 'rgba(50,180,255,0.5)');
//     g.addColorStop(1, 'rgba(0,80,200,0)');
//     ctx.beginPath(); ctx.arc(mouseX, mouseY, 18, 0, Math.PI * 2);
//     ctx.fillStyle = g; ctx.fill();
//     ctx.beginPath(); ctx.arc(mouseX, mouseY, 3.5, 0, Math.PI * 2);
//     ctx.fillStyle = 'rgba(255,255,255,1)'; ctx.fill();
//   }

//   function animate() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     const dx = mouseX - lastX, dy = mouseY - lastY;
//     speed = Math.sqrt(dx * dx + dy * dy);

//     if (speed < 1.5) {
//       spawnIdleFlame();
//     } else {
//       spawnTrailParticles();
//     }

//     for (let i = particles.length - 1; i >= 0; i--) {
//       particles[i].update(); particles[i].draw(ctx);
//       if (particles[i].life <= 0) particles.splice(i, 1);
//     }

//     drawCursor();
//     requestAnimationFrame(animate);
//   }
//   animate();
// })();


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


//SKILL SECTIONS 
  const skills = [
    { name: "PHP",           pct: 80, color: "#8892be", icon: '<i class="devicon-php-plain colored" style="font-size:30px"></i>' },
    { name: "HTML",          pct: 90, color: "#e34f26", icon: '<i class="devicon-html5-plain colored" style="font-size:30px"></i>' },
    { name: "CSS",           pct: 90, color: "#1572b6", icon: '<i class="devicon-css3-plain colored" style="font-size:30px"></i>' },
    { name: "JavaScript",    pct: 40, color: "#f7df1e", icon: '<i class="devicon-javascript-plain colored" style="font-size:30px"></i>' },
    { name: "React",         pct: 80, color: "#61dafb", icon: '<i class="devicon-react-original colored" style="font-size:30px"></i>' },
    { name: "MS Office",     pct: 95, color: "#d83b01", icon: '<i class="fa-brands fa-microsoft" style="font-size:26px; color:#d83b01"></i>' },
    { name: "MySQL",         pct: 85, color: "#4479a1", icon: '<i class="devicon-mysql-plain colored" style="font-size:30px"></i>' },
    { name: "Communication", pct: 95, color: "#22c55e", icon: '<i class="fa-solid fa-comments" style="font-size:26px; color:#22c55e"></i>' },
    { name: "Firebase",      pct: 90, color: "#ffca28", icon: '<i class="devicon-firebase-plain colored" style="font-size:30px"></i>' },
  ];
 
  const grid = document.getElementById('skills-grid');
 
  skills.forEach(s => {
    const card = document.createElement('div');
    card.className = 'skill-card';
    card.innerHTML = `
      <div class="skill-top">
        <div class="skill-info">
          <div class="skill-icon">${s.icon}</div>
          <span class="skill-name">${s.name}</span>
        </div>
        <span class="skill-pct">${s.pct}%</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill" style="background:${s.color}" data-pct="${s.pct}"></div>
      </div>
    `;
    grid.appendChild(card);
  });
 
  // Animate bars after paint
  requestAnimationFrame(() => {
    setTimeout(() => {
      document.querySelectorAll('.bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.pct + '%';
      });
    }, 100);
  });

// PROJECTS SECTION
const projectsData = [

  {
  name: "Mark Anthony Dalope Dental Clinic",
  desc: "Full-stack dental clinic management system featuring patient records management and Inventory management.",
  image: "./images/mddc.png",
  tags: [{ label: "React", cls: "tag-react" }, { label: "Firebase", cls: "tag-firebase" }],
  year: "2024",
  category: "system",
  icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5eead4" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <!-- Tooth shape -->
    <path d="M12 2C9.5 2 7 4 7 6.5c0 1.5.5 2.8.5 4.5 0 2.5-.5 5-.5 7 0 1.7 1 3 2.5 3 1 0 1.8-.8 2.5-2 .7 1.2 1.5 2 2.5 2 1.5 0 2.5-1.3 2.5-3 0-2-.5-4.5-.5-7 0-1.7.5-3 .5-4.5C17 4 14.5 2 12 2z"/>
    <!-- Center divot line -->
    <path d="M12 2v5"/>
  </svg>`
},
 {
  name: "PCSD Document Tracking System",
  desc: "Web-based system for tracking document routing and status across departments. Digitizes request workflows, reduces paper trail, and provides real-time visibility into document progress.",
  image: "./images/dts.png",
  tags: [{ label: "React", cls: "tag-react" }, { label: "Firebase", cls: "tag-firebase" }, { label: "AngularJs", cls: "tag-angular" }],
  year: "2024",
  category: "system",
  icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <!-- Document body -->
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <!-- Tracking pin -->
    <circle cx="12" cy="13" r="1.5" fill="#93c5fd" stroke="none"/>
    <path d="M12 11c-1.7 0-3 1.2-3 2.7 0 2 3 5.3 3 5.3s3-3.3 3-5.3C15 12.2 13.7 11 12 11z"/>
  </svg>`
 },
  {
    name: "Library Procurement System",
    desc: "Digital acquisition system for journals and books. Streamlines library procurement workflows.",
    image: "./images/procurement.png",
    tags: [{ label: "PHP", cls: "tag-php" }, { label: "Laravel", cls: "tag-laravel" }, { label: "MySQL", cls: "tag-mysql" }],
    year: "2024",
    category: "system",
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" stroke-width="1.8"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M4 4.5A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15z"/></svg>`
  },
  {
    name: "PalSU Library Attendance & Statistics",
    desc: "Generates library reports for accreditation. Tracks attendance and usage analytics.",
    image: "./images/Stat.png",
    tags: [{ label: "PHP", cls: "tag-php" }, { label: "Laravel", cls: "tag-laravel" }, { label: "MySQL", cls: "tag-mysql" }],
    year: "2024",
    category: "system",
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fca5a5" stroke-width="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 8h10M7 11h6"/></svg>`
  },
  {
    name: "ThesesVault",
    desc: "Digital repository for Palawan State University theses and dissertations.",
    image: "./images/tv.png",
    tags: [{ label: "PHP", cls: "tag-php" }, { label: "Laravel", cls: "tag-laravel" }, { label: "MySQL", cls: "tag-mysql" }],
    year: "2023–24",
    category: "fullstack",
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5eead4" stroke-width="1.8"><path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/><path d="M16 3l-4 4-4-4"/></svg>`
  },
  {
    name: "Asiano Art Crafts POS",
    desc: "Point-of-sale system with integrated online shopping for art and craft products.",
    image: "./images/asiano.png",
    tags: [{ label: "PHP", cls: "tag-php" }, { label: "Laravel", cls: "tag-laravel" }, { label: "MySQL", cls: "tag-mysql" }],
    year: "2023",
    category: "fullstack",
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#86efac" stroke-width="1.8"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M2 9h20M8 3v6"/></svg>`
  },
  {
    name: "Brgy San Manuel Health Monitor",
    desc: "Tracks children and youth nutrition status for barangay health workers.",
    image: "./images/sanManuel.png",
    tags: [{ label: "PHP", cls: "tag-php" }, { label: "Laravel", cls: "tag-laravel" }, { label: "MySQL", cls: "tag-mysql" }],
    year: "2023",
    category: "system",
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" stroke-width="1.8"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`
  },
  {
    name: "SkiniqueSys",
    desc: "Payroll system with product formulation module for Skinique Manufacturing Corporation.",
    image: "./images/skinique.png",
    tags: [{ label: "PHP", cls: "tag-php" }, { label: "Laravel", cls: "tag-laravel" }, { label: "MySQL", cls: "tag-mysql" }],
    year: "2025",
    category: "fullstack",
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fca5a5" stroke-width="1.8"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M9 7h6M9 11h6M9 15h4"/></svg>`
  }
];
 
function renderProjects(filter) {
  const grid = document.getElementById('proj-grid');
  if (!grid) return;
  const list = filter === 'all' ? projectsData : projectsData.filter(p => p.category === filter);
  grid.innerHTML = list.map(p => `
    <div class="proj-card">
      <div class="proj-thumb" style="background-image: url('${p.image}')">
        <div class="proj-thumb-overlay"></div>
        <div class="proj-thumb-icon">${p.icon}</div>
      </div>
      <div class="proj-body">
        <p class="proj-name">${p.name}</p>
        <p class="proj-desc">${p.desc}</p>
      </div>
      <div class="proj-footer">
        <div style="display:flex;gap:5px;flex-wrap:wrap">
          ${p.tags.map(t => `<span class="proj-tag ${t.cls}">${t.label}</span>`).join('')}
        </div>
        <span class="proj-year">${p.year}</span>
      </div>
    </div>
  `).join('');
}

 function renderProjects(filter) {
  const grid = document.getElementById('proj-grid');
  if (!grid) return;
  const list = filter === 'all' ? projectsData : projectsData.filter(p => p.category === filter);
  grid.innerHTML = list.map(p => `
    <div class="proj-card" onclick="openLightbox('${p.image}', '${p.name}')">
      <div class="proj-thumb" style="background-image: url('${p.image}')">
        <div class="proj-thumb-overlay"></div>
        <div class="proj-thumb-icon">${p.icon}</div>
      </div>
      <div class="proj-body">
        <p class="proj-name">${p.name}</p>
        <p class="proj-desc">${p.desc}</p>
      </div>
      <div class="proj-footer">
        <div style="display:flex;gap:5px;flex-wrap:wrap">
          ${p.tags.map(t => `<span class="proj-tag ${t.cls}">${t.label}</span>`).join('')}
        </div>
        <span class="proj-year">${p.year}</span>
      </div>
    </div>
  `).join('');
}

function filterProjects(type, btn) {
  document.querySelectorAll('.proj-filter-btn').forEach(b => b.classList.remove('active-filter'));
  btn.classList.add('active-filter');
  renderProjects(type); // ✅ just call renderProjects, don't duplicate the HTML
}

renderProjects('all');

// Lightbox
function openLightbox(src, title) {
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox-title').textContent = title;
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

document.getElementById('lightbox').addEventListener('click', function(e) {
  if (e.target === this) closeLightbox();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});