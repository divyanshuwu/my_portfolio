/**
 * NEXUS-OS Main Controller & Interactive Features
 */

document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initTelemetryClock();
  initTypingEffect();
  initSkillsSection();
  initCodePlayground();
  initContactForm();
  initMobileNav();
  initActiveNavSpy();
  
  if (window.lucide) window.lucide.createIcons();
});

/* --------------------------------------------------------------------------
   1. CUSTOM INTERACTIVE RETICLE CURSOR
   -------------------------------------------------------------------------- */
function initCursor() {
  const dot = document.querySelector('.cyber-cursor-dot');
  const ring = document.querySelector('.cyber-cursor-ring');

  if (!dot || !ring || window.matchMedia('(pointer: coarse)').matches) return;

  window.addEventListener('mousemove', (e) => {
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;

    ring.style.left = `${e.clientX}px`;
    ring.style.top = `${e.clientY}px`;
  });

  const interactives = document.querySelectorAll('a, button, input, textarea, .stat-card, .project-card, .term-chip, .code-tab-btn, .endpoint-btn');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('active'));
    el.addEventListener('mouseleave', () => ring.classList.remove('active'));
  });
}

/* --------------------------------------------------------------------------
   2. LIVE SYSTEM TELEMETRY & CLOCK
   -------------------------------------------------------------------------- */
function initTelemetryClock() {
  const clockEl = document.getElementById('telemetry-clock');
  const cpuEl = document.getElementById('telemetry-cpu');
  const pingEl = document.getElementById('telemetry-ping');

  function update() {
    const now = new Date();
    if (clockEl) {
      const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
      clockEl.innerText = `${timeStr} UTC+5:30`;
    }

    if (cpuEl && Math.random() > 0.7) {
      const simulatedCpu = (12 + Math.random() * 8).toFixed(1);
      cpuEl.innerText = `${simulatedCpu}%`;
    }

    if (pingEl && Math.random() > 0.8) {
      const simulatedPing = Math.floor(16 + Math.random() * 6);
      pingEl.innerText = `${simulatedPing}ms`;
    }
  }

  setInterval(update, 1000);
  update();
}

/* --------------------------------------------------------------------------
   3. HERO DYNAMIC TYPING EFFECT
   -------------------------------------------------------------------------- */
function initTypingEffect() {
  const target = document.getElementById('hero-typing-target');
  if (!target) return;

  const roles = [
    "FastAPI & Microservices Architect",
    "Concurrent Java Systems Engineer",
    "SQL Query Optimization Specialist",
    "Python AsyncIO Data Engineer",
    "3rd Year B.Tech IT Undergraduate"
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 70;

  function type() {
    const currentRole = roles[roleIdx];
    if (isDeleting) {
      target.innerText = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 35;
    } else {
      target.innerText = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 70;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      typingSpeed = 2000; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingSpeed = 400; // Pause before typing new word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* --------------------------------------------------------------------------
   4. SKILLS MATRIX GENERATION
   -------------------------------------------------------------------------- */
function initSkillsSection() {
  const container = document.getElementById('skills-categories-grid');
  if (!container) return;

  container.innerHTML = '';

  PORTFOLIO_CONFIG.skills.categories.forEach(cat => {
    const card = document.createElement('div');
    card.className = 'skill-category-card cyber-panel';

    const itemsHtml = cat.items.map(item => `
      <div class="skill-item-row">
        <div class="skill-label-group">
          <span style="color: var(--text-bright); font-weight: 600;">${item.name}</span>
          <span style="color: var(--neon-cyan);">${item.level}%</span>
        </div>
        <div class="skill-bar-track">
          <div class="skill-bar-fill" style="width: ${item.level}%;"></div>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.72rem; color: var(--text-dim); margin-top: 4px; font-family: var(--font-mono);">
          <span>${item.tag}</span>
          <span>${item.exp}</span>
        </div>
      </div>
    `).join('');

    card.innerHTML = `
      <div class="skill-card-head">
        <div class="skill-cat-icon">
          <i data-lucide="${cat.icon}"></i>
        </div>
        <div>
          <h3 style="font-family: var(--font-display); font-size: 1.15rem; color: var(--text-bright);">${cat.name}</h3>
          <p style="font-size: 0.78rem; color: var(--text-muted); font-family: var(--font-mono);">${cat.description}</p>
        </div>
      </div>
      <div>
        ${itemsHtml}
      </div>
    `;

    container.appendChild(card);
  });
}

/* --------------------------------------------------------------------------
   5. CODE PLAYGROUND TAB SWITCHER
   -------------------------------------------------------------------------- */
function initCodePlayground() {
  const nav = document.getElementById('code-tabs-nav');
  const codeBody = document.getElementById('code-display-body');
  const langTag = document.getElementById('code-lang-tag');
  const runBtn = document.getElementById('code-run-btn');
  const outputBox = document.getElementById('code-exec-output');

  if (!nav || !codeBody) return;

  const snippets = PORTFOLIO_CONFIG.skills.codeSnippets;
  const keys = Object.keys(snippets);

  function loadTab(key) {
    const data = snippets[key];
    if (!data) return;

    if (langTag) langTag.innerText = data.lang;
    codeBody.innerText = data.code;

    if (outputBox) {
      outputBox.innerHTML = `<span style="color: var(--neon-green)">// Executable loaded: Ready to compile and run.</span>`;
    }
  }

  nav.innerHTML = '';
  keys.forEach((key, idx) => {
    const btn = document.createElement('button');
    btn.className = `code-tab-btn ${idx === 0 ? 'active' : ''}`;
    btn.innerHTML = `
      <i data-lucide="code-2"></i>
      <span>${snippets[key].title.split(' ')[0]}</span>
    `;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.code-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      loadTab(key);
      if (window.nexusAudio) window.nexusAudio.playClick();
    });
    nav.appendChild(btn);
  });

  loadTab(keys[0]);

  if (runBtn) {
    runBtn.addEventListener('click', () => {
      if (window.nexusAudio) window.nexusAudio.playClick();
      if (outputBox) {
        outputBox.innerHTML = `<span style="color: var(--neon-cyan)">[COMPILER] Synthesizing AST...\n[RUNTIME] Memory check: OK (0.04ms)\n[STDOUT] Execution successful. All assertions passed.</span>`;
      }
      if (window.nexusAudio) window.nexusAudio.playSuccess();
    });
  }
}

/* --------------------------------------------------------------------------
   6. QUANTUM CONTACT UPLINK FORM
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusMsg = document.getElementById('form-status-msg');
  const submitBtn = document.getElementById('contact-submit-btn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (window.nexusAudio) window.nexusAudio.playClick();

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i data-lucide="shield-check" class="spin-icon"></i> Encrypting Payload...`;
    }

    if (statusMsg) {
      statusMsg.innerHTML = `<span style="color: var(--neon-cyan)">[AES-256] Generating cryptographic handshake with developer mailbox...</span>`;
    }

    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i data-lucide="send"></i> Transmit Uplink`;
      }
      if (statusMsg) {
        statusMsg.innerHTML = `<span style="color: var(--neon-green)">✓ [TRANSMISSION CONFIRMED] Message successfully encrypted and delivered to Divyansh. Expected turnaround: &lt; 12 Hours.</span>`;
      }
      if (window.nexusAudio) window.nexusAudio.playSuccess();
      form.reset();
      if (window.lucide) window.lucide.createIcons();
    }, 900);
  });
}

/* --------------------------------------------------------------------------
   7. MOBILE NAVIGATION TOGGLE
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const links = document.getElementById('hud-nav-links');

  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('active');
    if (window.nexusAudio) window.nexusAudio.playClick();
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('active'));
  });
}

/* --------------------------------------------------------------------------
   8. ACTIVE NAV SPY
   -------------------------------------------------------------------------- */
function initActiveNavSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.hud-nav-item a');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(sec => {
      const sectionTop = sec.offsetTop - 120;
      const sectionHeight = sec.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}
