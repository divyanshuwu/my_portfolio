/**
 * NEXUS-OS Project Showcase & Modal Engine
 */

class ProjectManager {
  constructor() {
    this.projectsGrid = document.getElementById('projects-grid');
    this.modal = document.getElementById('project-modal');
    this.modalContent = document.getElementById('modal-dynamic-content');
    this.modalClose = document.getElementById('modal-close-btn');

    this.init();
  }

  init() {
    if (!this.projectsGrid) return;

    this.renderProjects();

    if (this.modalClose) {
      this.modalClose.addEventListener('click', () => this.closeModal());
    }

    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.closeModal();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal && this.modal.classList.contains('active')) {
        this.closeModal();
      }
    });
  }

  renderProjects() {
    this.projectsGrid.innerHTML = '';

    if (!PORTFOLIO_CONFIG.projects || PORTFOLIO_CONFIG.projects.length === 0) {
      const placeholder = document.createElement('div');
      placeholder.className = 'cyber-panel';
      placeholder.style.gridColumn = '1 / -1';
      placeholder.style.padding = '48px 32px';
      placeholder.style.textAlign = 'center';
      placeholder.innerHTML = `
        <div style="display: inline-flex; width: 64px; height: 64px; background: var(--neon-cyan-dim); border: 1px solid var(--neon-cyan); border-radius: var(--radius-md); align-items: center; justify-content: center; color: var(--neon-cyan); margin-bottom: 20px; box-shadow: 0 0 20px rgba(0, 240, 255, 0.3);">
          <i data-lucide="git-branch" style="width: 32px; height: 32px;"></i>
        </div>
        <h3 style="font-family: var(--font-display); font-size: 1.5rem; color: var(--text-bright); margin-bottom: 12px;">SYSTEM PIPELINE // CODE IN DEVELOPMENT</h3>
        <p style="color: var(--text-muted); max-width: 600px; margin: 0 auto 24px; font-size: 0.95rem; line-height: 1.6;">
          New backend microservices, Java architectures, and database tools are currently being staged. Explore active commits, experiments, and source code directly on GitHub.
        </p>
        <a href="${PORTFOLIO_CONFIG.profile.social.github}" target="_blank" class="btn btn-primary" style="display: inline-flex;">
          <i data-lucide="github"></i> View GitHub Repositories (@divyanshuwu)
        </a>
      `;
      this.projectsGrid.appendChild(placeholder);
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    PORTFOLIO_CONFIG.projects.forEach(proj => {
      const card = document.createElement('div');
      card.className = 'project-card cyber-panel';

      const metricKeys = Object.keys(proj.metrics);
      const metricCols = metricKeys.map(k => `
        <div>
          <div class="p-metric-val">${proj.metrics[k]}</div>
          <div class="p-metric-lbl">${k}</div>
        </div>
      `).join('');

      card.innerHTML = `
        <div class="project-image-box">
          <img src="${proj.image}" alt="${proj.title}" class="project-cover-img" loading="lazy" />
          <div class="project-badge-overlay">
            <span class="badge badge-cyan">${proj.tags[0]}</span>
            <span class="badge badge-purple">${proj.tags[1]}</span>
          </div>
        </div>
        <div class="project-info-body">
          <h3 class="project-heading">${proj.title}</h3>
          <p class="project-tagline">${proj.tagline}</p>
          <p class="project-summary">${proj.summary}</p>
          
          <div class="project-metric-row">
            ${metricCols}
          </div>

          <div class="project-tech-tags">
            ${proj.tags.map(t => `<span class="badge">${t}</span>`).join('')}
          </div>

          <div class="project-card-footer">
            <button class="btn btn-secondary btn-inspect" style="flex: 1; font-size: 0.78rem; padding: 10px 14px;">
              <i data-lucide="layers"></i> Architecture
            </button>
            <a href="${proj.github}" target="_blank" class="btn btn-outline" style="font-size: 0.78rem; padding: 10px 14px;">
              <i data-lucide="github"></i> Code
            </a>
          </div>
        </div>
      `;

      this.attachTiltPhysics(card);

      const inspectBtn = card.querySelector('.btn-inspect');
      inspectBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.openModal(proj);
      });

      this.projectsGrid.appendChild(card);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  attachTiltPhysics(card) {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
  }

  openModal(proj) {
    if (!this.modal || !this.modalContent) return;
    if (window.nexusAudio) window.nexusAudio.playBoot();

    this.modalContent.innerHTML = `
      <div style="padding: 32px;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
          <span class="badge badge-cyan">SYSTEM ARCHITECTURE // DEEP-DIVE</span>
          <span class="badge badge-green">VERIFIED 2026</span>
        </div>
        <h2 style="font-family: var(--font-display); font-size: 1.8rem; color: var(--text-bright); margin-bottom: 8px;">${proj.title}</h2>
        <p style="color: var(--neon-cyan); font-family: var(--font-mono); font-size: 0.95rem; margin-bottom: 24px;">${proj.tagline}</p>
        
        <div style="border-radius: var(--radius-md); overflow: hidden; margin-bottom: 24px; border: 1px solid var(--border-cyan);">
          <img src="${proj.image}" alt="${proj.title}" style="width: 100%; height: auto; display: block;" />
        </div>

        <h3 style="font-family: var(--font-display); font-size: 1.1rem; color: var(--text-bright); margin-bottom: 12px;">Engineering Overview</h3>
        <p style="color: var(--text-muted); line-height: 1.7; margin-bottom: 24px; font-size: 0.95rem;">${proj.summary}</p>

        <h3 style="font-family: var(--font-display); font-size: 1.1rem; color: var(--text-bright); margin-bottom: 12px;">Core Architecture Capabilities</h3>
        <ul style="list-style: none; margin-bottom: 24px; display: flex; flex-direction: column; gap: 10px;">
          ${proj.features.map(f => `
            <li style="display: flex; align-items: flex-start; gap: 10px; color: var(--text-main); font-size: 0.92rem;">
              <span style="color: var(--neon-green); font-weight: bold;">▶</span>
              <span>${f}</span>
            </li>
          `).join('')}
        </ul>

        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          <a href="${proj.github}" target="_blank" class="btn btn-primary" style="flex: 1;">
            <i data-lucide="github"></i> View Source Repository
          </a>
        </div>
      </div>
    `;

    this.modal.classList.add('active');
    if (window.lucide) window.lucide.createIcons();
  }

  closeModal() {
    if (this.modal) {
      this.modal.classList.remove('active');
      if (window.nexusAudio) window.nexusAudio.playClick();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.nexusProjects = new ProjectManager();
});
