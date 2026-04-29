lucide.createIcons();

gsap.from("nav", { y: -80, opacity: 0, duration: 1, ease: "power4.out" });
gsap.from("section", { opacity: 0, duration: 1.2, stagger: 0.4, ease: "power2.out" });

const flipCard = document.getElementById("flip-card");
let flipped = false;

setInterval(() => {
  flipped = !flipped;
  flipCard.style.transform = flipped ? "rotateY(180deg)" : "rotateY(0deg)";
}, 4000);

const texts = ["Hi, I'm Mau :)", "I love coding", "Welcome to my portfolio"];
let currentText = '';
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 120;
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
    timeout = 1000;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    timeout = 500;
  }

  setTimeout(type, timeout);
}

type();

// ── Theme toggle ──
(function () {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  document.body.classList.remove('light-mode');
  toggle.classList.remove('is-light');

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


// ── SKILL SECTION ──
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

requestAnimationFrame(() => {
  setTimeout(() => {
    document.querySelectorAll('.bar-fill').forEach(bar => {
      bar.style.width = bar.dataset.pct + '%';
    });
  }, 100);
});


// ── PROJECTS SECTION ──
const projectsData = [
  {
    name: "Mark Anthony Dalope Dental Clinic",
    desc: "Full-stack dental clinic management system featuring patient records management and Inventory management.",
    image: "./images/mddc.png",
    tags: [{ label: "React", cls: "tag-react" }, { label: "Firebase", cls: "tag-firebase" }],
    year: "2024",
    category: "system",
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5eead4" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2C9.5 2 7 4 7 6.5c0 1.5.5 2.8.5 4.5 0 2.5-.5 5-.5 7 0 1.7 1 3 2.5 3 1 0 1.8-.8 2.5-2 .7 1.2 1.5 2 2.5 2 1.5 0 2.5-1.3 2.5-3 0-2-.5-4.5-.5-7 0-1.7.5-3 .5-4.5C17 4 14.5 2 12 2z"/>
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
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
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
  renderProjects(type);
}

renderProjects('all');


// ── Lightbox ──
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

const lb = document.getElementById('lightbox');
if (lb) lb.addEventListener('click', function(e) {
  if (e.target === this) closeLightbox();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});


// ── ADMIN PANEL ──
document.addEventListener('DOMContentLoaded', function () {
(function () {
  const PASS        = 'maupogi@1217';
  const API         = '/.netlify/functions/admin-messages';
  const SECRET      = 'maupogi@1217'; // sent as header — API validates this server-side
  let allRows       = [];
  let unlocked      = false;

  const overlay     = document.getElementById('admin-overlay');
  const lockEl      = document.getElementById('adm-lock');
  const pwInput     = document.getElementById('adm-pw-input');
  const pwBtn       = document.getElementById('adm-pw-btn');
  const closeBtn    = document.getElementById('adm-close');
  const tbody       = document.getElementById('adm-tbody');
  const countEl     = document.getElementById('adm-count');
  const snapHint    = document.getElementById('adm-snap-hint');
  const crudOverlay = document.getElementById('adm-crud-overlay');

  // ── Open / close ──
  function openAdmin() {
    overlay.classList.add('adm-open');
    if (unlocked) admRefresh();
  }
  function closeAdmin() {
    overlay.classList.remove('adm-open');
  }
  closeBtn.addEventListener('click', closeAdmin);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeAdmin(); });

  // ── Password ──
  function tryUnlock() {
    if (pwInput.value === PASS) {
      unlocked = true;
      lockEl.classList.add('adm-unlocked');
      setTimeout(() => { lockEl.style.display = 'none'; }, 420);
      admRefresh();
    } else {
      pwInput.classList.add('adm-wrong');
      setTimeout(() => pwInput.classList.remove('adm-wrong'), 600);
      pwInput.value = '';
    }
  }
  pwBtn.addEventListener('click', tryUnlock);
  pwInput.addEventListener('keydown', e => { if (e.key === 'Enter') tryUnlock(); });

  // ── Keyboard fallback: triple Shift ──
  let shiftCount = 0, shiftTimer = null;
  document.addEventListener('keydown', e => {
    if (e.key !== 'Shift') return;
    shiftCount++;
    clearTimeout(shiftTimer);
    shiftTimer = setTimeout(() => { shiftCount = 0; }, 800);
    if (shiftCount >= 3) { shiftCount = 0; openAdmin(); }
  });

  // ── Snap detection (FIXED) ──
  let snapCooldown = false;

  function initSnap() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.warn('[snap] getUserMedia not available');
      return;
    }

    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then(stream => {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const source   = audioCtx.createMediaStreamSource(stream);
        const analyser = audioCtx.createAnalyser();

        // Key settings: no smoothing so we catch raw transient spikes
        analyser.fftSize               = 512;
        analyser.smoothingTimeConstant = 0;

        source.connect(analyser);

        const buf      = new Uint8Array(analyser.frequencyBinCount);
        let noiseFloor = 5;
        let frameCount = 0;

        function rms(data) {
          let sum = 0;
          for (let i = 0; i < data.length; i++) sum += data[i] * data[i];
          return Math.sqrt(sum / data.length);
        }

        function detect() {
          analyser.getByteFrequencyData(buf);
          const level = rms(buf);
          frameCount++;

          // Update noise floor slowly every 30 frames
          if (frameCount % 30 === 0) {
            noiseFloor = noiseFloor * 0.85 + level * 0.15;
          }

          // Snap threshold: must be at least 4× background noise, min 12
          const threshold = Math.max(noiseFloor * 4, 12);

          if (level > threshold && !snapCooldown) {
            const peakLevel = level;

            // Check ~50ms later — snap decays very fast
            setTimeout(() => {
              analyser.getByteFrequencyData(buf);
              const after = rms(buf);

              // If sound dropped to <60% of peak → it was a snap (sharp transient)
              if (after < peakLevel * 0.6) {
                triggerSnap();
              }
            }, 50);
          }

          requestAnimationFrame(detect);
        }

        detect();
        console.log('[snap] 🎤 Mic active — snap your fingers near the mic!');
      })
      .catch(err => {
        console.warn('[snap] Mic denied:', err.message, '— use Shift×3 instead');
      });
  }

  function triggerSnap() {
    if (snapCooldown) return;
    snapCooldown = true;

    snapHint.classList.add('adm-visible');
    setTimeout(() => snapHint.classList.remove('adm-visible'), 1800);

    openAdmin();

    setTimeout(() => { snapCooldown = false; }, 3000);
  }

  // ── Fetch all ──
  window.admRefresh = async function () {
    tbody.innerHTML = '<tr><td colspan="6" class="adm-loading">Loading</td></tr>';
    try {
      const res  = await fetch(API, {
        headers: { 'x-admin-token': SECRET }
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      allRows = json.data;
      admRender(allRows);
    } catch (err) {
      tbody.innerHTML = `<tr><td colspan="6" class="adm-empty">⚠ ${err.message}</td></tr>`;
    }
  };

  function admRender(rows) {
    countEl.textContent = rows.length;
    if (!rows.length) {
      tbody.innerHTML = '<tr><td colspan="6" class="adm-empty">No messages yet</td></tr>';
      return;
    }
    tbody.innerHTML = rows.map(r => `
      <tr>
        <td class="td-id">${r.id}</td>
        <td>${esc(r.name)}</td>
        <td>${esc(r.email)}</td>
        <td class="td-msg">${esc(r.message)}</td>
        <td class="td-date">${new Date(r.created_at).toLocaleString('en-PH', {dateStyle:'short',timeStyle:'short'})}</td>
        <td class="td-actions">
          <button class="adm-icon-btn adm-edit-btn" title="Edit" onclick='admOpenEdit(${JSON.stringify(r)})'>✏️</button>
          <button class="adm-icon-btn adm-del-btn"  title="Delete" onclick="admDelete(${r.id})">🗑️</button>
        </td>
      </tr>
    `).join('');
  }

  // ── Search ──
  window.admSearch = function (q) {
    const lq = q.toLowerCase();
    admRender(allRows.filter(r =>
      r.name.toLowerCase().includes(lq) ||
      r.email.toLowerCase().includes(lq) ||
      r.message.toLowerCase().includes(lq)
    ));
  };

  // ── CRUD helpers ──
  window.admOpenAdd = function () {
    document.getElementById('adm-crud-title').textContent  = 'ADD MESSAGE';
    document.getElementById('adm-crud-id').value           = '';
    document.getElementById('adm-crud-name').value         = '';
    document.getElementById('adm-crud-email').value        = '';
    document.getElementById('adm-crud-message').value      = '';
    crudOverlay.classList.add('adm-crud-open');
  };

  window.admOpenEdit = function (row) {
    document.getElementById('adm-crud-title').textContent  = 'EDIT MESSAGE';
    document.getElementById('adm-crud-id').value           = row.id;
    document.getElementById('adm-crud-name').value         = row.name;
    document.getElementById('adm-crud-email').value        = row.email;
    document.getElementById('adm-crud-message').value      = row.message;
    crudOverlay.classList.add('adm-crud-open');
  };

  window.admCloseCrud = function () {
    crudOverlay.classList.remove('adm-crud-open');
  };
  crudOverlay.addEventListener('click', e => { if (e.target === crudOverlay) admCloseCrud(); });

  window.admSave = async function () {
    const id      = document.getElementById('adm-crud-id').value;
    const name    = document.getElementById('adm-crud-name').value.trim();
    const email   = document.getElementById('adm-crud-email').value.trim();
    const message = document.getElementById('adm-crud-message').value.trim();
    if (!name || !email || !message) {
      Swal.fire({ icon:'warning', title:'Fill all fields', background:'#0d1117', color:'#e2e8f0', confirmButtonColor:'#22d3ee' });
      return;
    }
    const isEdit = !!id;
    const body   = isEdit ? { id, name, email, message } : { name, email, message };
    try {
      const res  = await fetch(API, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': SECRET },
        body: JSON.stringify(body)
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      admCloseCrud();
      admRefresh();
      Swal.fire({ icon:'success', title: isEdit ? 'Updated!' : 'Added!', background:'#0d1117', color:'#e2e8f0', showConfirmButton:false, timer:1500 });
    } catch (err) {
      Swal.fire({ icon:'error', title:'Error', text: err.message, background:'#0d1117', color:'#e2e8f0', confirmButtonColor:'#22d3ee' });
    }
  };

  window.admDelete = async function (id) {
    const confirm = await Swal.fire({
      icon: 'warning', title: 'Delete this message?',
      showCancelButton: true, confirmButtonText: 'Yes, delete',
      confirmButtonColor: '#ef4444', cancelButtonColor: '#334155',
      background: '#0d1117', color: '#e2e8f0'
    });
    if (!confirm.isConfirmed) return;
    try {
      const res  = await fetch(API, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': SECRET },
        body: JSON.stringify({ id })
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      admRefresh();
      Swal.fire({ icon:'success', title:'Deleted!', background:'#0d1117', color:'#e2e8f0', showConfirmButton:false, timer:1200 });
    } catch (err) {
      Swal.fire({ icon:'error', title:'Error', text: err.message, background:'#0d1117', color:'#e2e8f0' });
    }
  };

  // ── Helper ──
  function esc(str) {
    return String(str ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  // ── Boot ──
  initSnap();

})();
}); // end DOMContentLoaded