/**
 * NEXUS-CLI — Futuristic Interactive Terminal Engine
 */

class NexusTerminal {
  constructor() {
    this.output = document.getElementById('terminal-output');
    this.input = document.getElementById('terminal-input');
    this.body = document.getElementById('terminal-body');
    this.history = [];
    this.historyIndex = -1;

    this.commands = {
      help: () => this.cmdHelp(),
      about: () => this.cmdAbout(),
      skills: () => this.cmdSkills(),
      projects: () => this.cmdProjects(),
      fastapi: () => this.cmdFastAPI(),
      java: () => this.cmdJava(),
      sql: () => this.cmdSQL(),
      security: () => this.cmdSecurity(),
      cyber: () => this.cmdSecurity(),
      contact: () => this.cmdContact(),
      status: () => this.cmdStatus(),
      matrix: () => this.cmdMatrix(),
      'download-cv': () => this.cmdDownloadCV(),
      sudo: (args) => this.cmdSudo(args),
      clear: () => this.cmdClear()
    };

    this.init();
  }

  init() {
    if (!this.input || !this.output) return;

    this.input.addEventListener('keydown', (e) => this.handleKeyDown(e));

    // Support quick chips
    document.querySelectorAll('.term-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        const cmd = chip.getAttribute('data-cmd') || chip.innerText.trim();
        this.runCommand(cmd);
      });
    });

    // Boot greeting line
    this.printLine(`[SYSTEM] NEXUS-CLI Kernel v4.2.0 initialized for <span class="cyan">Divyansh (@divyanshuwu)</span>. Type <span class="cyan">help</span> or click suggestions below.`, 'green');
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      const val = this.input.value.trim();
      if (val) {
        this.history.push(val);
        this.historyIndex = this.history.length;
        this.runCommand(val);
        this.input.value = '';
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (this.history.length > 0 && this.historyIndex > 0) {
        this.historyIndex--;
        this.input.value = this.history[this.historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (this.historyIndex < this.history.length - 1) {
        this.historyIndex++;
        this.input.value = this.history[this.historyIndex];
      } else {
        this.historyIndex = this.history.length;
        this.input.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      this.autocomplete();
    }
  }

  autocomplete() {
    const val = this.input.value.trim().toLowerCase();
    if (!val) return;
    const match = Object.keys(this.commands).find(c => c.startsWith(val));
    if (match) {
      this.input.value = match;
    }
  }

  runCommand(rawCmd) {
    if (window.nexusAudio) window.nexusAudio.playTerminal();

    // Print command entered
    this.printLine(`<span class="green">divyansh@nexus:~$</span> <span class="bright">${this.escapeHtml(rawCmd)}</span>`);

    const parts = rawCmd.trim().split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (this.commands[cmd]) {
      this.commands[cmd](args);
    } else {
      this.printLine(`nexus-sh: command not found: <span class="amber">${this.escapeHtml(cmd)}</span>. Type <span class="cyan">help</span> for available commands.`, 'muted');
    }

    this.scrollToBottom();
  }

  printLine(htmlContent, colorClass = '') {
    const div = document.createElement('div');
    div.className = `term-line ${colorClass}`;
    div.innerHTML = htmlContent;
    this.output.appendChild(div);
  }

  scrollToBottom() {
    if (this.body) {
      this.body.scrollTop = this.body.scrollHeight;
    }
  }

  cmdHelp() {
    this.printLine(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`, 'muted');
    this.printLine(`AVAILABLE NEXUS-CLI COMMANDS:`, 'cyan');
    this.printLine(`  <span class="cyan">about</span>       - Developer background, academics & status`, 'bright');
    this.printLine(`  <span class="cyan">skills</span>      - Categorized technical stack & proficiency`, 'bright');
    this.printLine(`  <span class="cyan">projects</span>    - Featured software repositories & system architectures`, 'bright');
    this.printLine(`  <span class="cyan">fastapi</span>     - FastAPI microservices & async backend stack`, 'bright');
    this.printLine(`  <span class="cyan">java</span>        - Java concurrency & multi-threaded systems`, 'bright');
    this.printLine(`  <span class="cyan">sql</span>         - Relational database & query design`, 'bright');
    this.printLine(`  <span class="cyan">security</span>    - Cybersecurity tools & vulnerability analyzer`, 'bright');
    this.printLine(`  <span class="cyan">status</span>      - Live system telemetry & cluster metrics`, 'bright');
    this.printLine(`  <span class="cyan">contact</span>     - Direct uplink coordinates & social nodes`, 'bright');
    this.printLine(`  <span class="cyan">download-cv</span> - Trigger formatted resume download/view`, 'bright');
    this.printLine(`  <span class="cyan">matrix</span>      - Stream synthetic cyber matrix data`, 'bright');
    this.printLine(`  <span class="cyan">clear</span>       - Clear the terminal screen`, 'bright');
    this.printLine(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`, 'muted');
  }

  cmdAbout() {
    const p = PORTFOLIO_CONFIG.profile;
    this.printLine(`[PROFILE] <span class="cyan">${p.name}</span> (${p.handle})`, 'cyan');
    this.printLine(`[ROLE] ${p.title}`);
    this.printLine(`[ACADEMICS] ${p.education.degree} (${p.education.year}) | CGPA: <span class="green">${p.education.cgpa}</span>`);
    this.printLine(`[STATUS] <span class="green">${p.education.status}</span>`);
    this.printLine(`[BIO] ${p.extendedBio}`);
  }

  cmdSkills() {
    this.printLine(`[TECHNICAL MATRIX]`, 'cyan');
    PORTFOLIO_CONFIG.skills.categories.forEach(cat => {
      const names = cat.items.map(i => `${i.name} (${i.level || 85}%)`).join(', ');
      this.printLine(`  <span class="purple">${cat.name}:</span> ${names}`);
    });
  }

  cmdProjects() {
    this.printLine(`[FEATURED SYSTEM ARCHITECTURES & REPOSITORIES]`, 'cyan');
    if (PORTFOLIO_CONFIG.projects && PORTFOLIO_CONFIG.projects.length > 0) {
      PORTFOLIO_CONFIG.projects.forEach(p => {
        this.printLine(`  • <span class="green">${p.title}</span>`);
        this.printLine(`    <span class="bright">${p.tagline}</span>`);
        this.printLine(`    <span class="muted">Stack:</span> ${p.tags.join(', ')} | <a href="${p.github}" target="_blank" class="cyan">Code Repository</a>`);
      });
    } else {
      this.printLine(`  • Active repositories are currently hosted on GitHub: <a href="https://github.com/divyanshuwu" target="_blank" class="cyan">github.com/divyanshuwu</a>`);
    }
  }

  cmdFastAPI() {
    this.printLine(`[FASTAPI ARCHITECTURE EXPERTISE]`, 'green');
    this.printLine(`• High-throughput async non-blocking routing with Starlette core`);
    this.printLine(`• Strict schema validation & serialization using Pydantic V2`);
    this.printLine(`• Connection pooling with async SQLAlchemy & PostgreSQL/MySQL`);
    this.printLine(`• REST API OpenAPI & Swagger UI interactive documentation`);
  }

  cmdJava() {
    this.printLine(`[JAVA SYSTEMS EXPERTISE]`, 'purple');
    this.printLine(`• Core OOP Architecture & SOLID Design Principles`);
    this.printLine(`• Concurrency & Multithreading (ExecutorService, CompletableFuture)`);
    this.printLine(`• Collections framework, stream processing, and clean software architecture`);
  }

  cmdSQL() {
    this.printLine(`[DATABASE & SQL DESIGN]`, 'amber');
    this.printLine(`• PostgreSQL / MySQL relational database design & 3NF schema modeling`);
    this.printLine(`• Complex JOINs, Aggregations, Grouping, and Filter queries`);
    this.printLine(`• ACID transaction principles and database normalization`);
  }

  cmdSecurity() {
    this.printLine(`[CYBERSECURITY & AUDITING]`, 'cyan');
    this.printLine(`• Network socket scanning and TCP/UDP port reconnaissance`);
    this.printLine(`• HTTP security response headers audit (HSTS, CSP, X-Frame-Options)`);
    this.printLine(`• TLS certificate validation and security misconfiguration analysis`);
  }

  cmdStatus() {
    this.printLine(`[TELEMETRY SCAN]`, 'green');
    this.printLine(`  • Node Status: <span class="green">ONLINE // OPTIMAL</span>`);
    this.printLine(`  • Cluster Load: 14.8%`);
    this.printLine(`  • Memory Allocation: 42.6 MB / 512 MB`);
    this.printLine(`  • Active Protocol: HTTP/2.0 + WebSockets`);
    this.printLine(`  • Latency: 19ms`);
  }

  cmdContact() {
    const s = PORTFOLIO_CONFIG.profile.social;
    this.printLine(`[COMMUNICATION UPLINK]`, 'cyan');
    this.printLine(`  • Email: <span class="cyan">${s.email}</span>`);
    this.printLine(`  • LinkedIn: <a href="${s.linkedin}" target="_blank" class="cyan">${s.linkedin}</a>`);
    this.printLine(`  • GitHub: <a href="${s.github}" target="_blank" class="cyan">${s.github}</a>`);
  }

  cmdDownloadCV() {
    this.printLine(`[RESUME EXPORTER] Generating standardized candidate profile for Divyansh...`, 'green');
    setTimeout(() => {
      this.printLine(`[SUCCESS] Candidate profile ready. Opening print/view dialog...`, 'cyan');
      window.print();
    }, 600);
  }

  cmdMatrix() {
    this.printLine(`01000100 01001001 01010110 01011001 01000001 01001110 01010011 01001000`, 'green');
    this.printLine(`FASTAPI // PYTHON // JAVA // SQL // REST-API // JS // CYBERSECURITY`, 'green');
    this.printLine(`DIVYANSH // NEURAL LINK SYNCHRONIZED`, 'green');
  }

  cmdSudo(args) {
    this.printLine(`[ACCESS RESTRICTED] Operative clearance level 0x3A required. Nice try, agent!`, 'amber');
  }

  cmdClear() {
    this.output.innerHTML = '';
  }

  escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, m => map[m]);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.nexusTerminal = new NexusTerminal();
});
