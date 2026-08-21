/**
 * NEXUS-OS Interactive FastAPI REST API Sandbox Engine
 * Simulates live REST API execution, latency metrics, and JSON response formatting.
 */

class ApiSandbox {
  constructor() {
    this.endpointsNav = document.getElementById('sandbox-endpoints');
    this.urlDisplay = document.getElementById('sandbox-url-display');
    this.methodTag = document.getElementById('sandbox-method-tag');
    this.descDisplay = document.getElementById('sandbox-desc');
    this.sendBtn = document.getElementById('sandbox-send-btn');
    this.jsonViewer = document.getElementById('sandbox-json-viewer');
    this.statusBadge = document.getElementById('sandbox-status-badge');
    this.latencyDisplay = document.getElementById('sandbox-latency');
    this.copyBtn = document.getElementById('sandbox-copy-btn');
    this.requestBodyBox = document.getElementById('sandbox-request-body');

    this.currentEndpoint = PORTFOLIO_CONFIG.apiSandbox.endpoints[0];
    this.init();
  }

  init() {
    if (!this.endpointsNav || !this.sendBtn) return;

    this.renderNav();
    this.loadEndpoint(this.currentEndpoint);

    this.sendBtn.addEventListener('click', () => this.executeRequest());
    if (this.copyBtn) {
      this.copyBtn.addEventListener('click', () => this.copyResponse());
    }
  }

  renderNav() {
    this.endpointsNav.innerHTML = '';
    PORTFOLIO_CONFIG.apiSandbox.endpoints.forEach((ep, idx) => {
      const btn = document.createElement('button');
      btn.className = `endpoint-btn ${idx === 0 ? 'active' : ''}`;
      btn.innerHTML = `
        <span class="method-tag method-${ep.method.toLowerCase()}">${ep.method}</span>
        <span>${ep.path}</span>
      `;
      btn.addEventListener('click', () => {
        document.querySelectorAll('.endpoint-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.loadEndpoint(ep);
        if (window.nexusAudio) window.nexusAudio.playClick();
      });
      this.endpointsNav.appendChild(btn);
    });
  }

  loadEndpoint(ep) {
    this.currentEndpoint = ep;
    if (this.urlDisplay) {
      this.urlDisplay.innerText = `${PORTFOLIO_CONFIG.apiSandbox.baseUrl}${ep.path}`;
    }
    if (this.methodTag) {
      this.methodTag.innerText = ep.method;
      this.methodTag.className = `method-tag method-${ep.method.toLowerCase()}`;
    }
    if (this.descDisplay) {
      this.descDisplay.innerText = ep.description;
    }

    if (this.requestBodyBox) {
      if (ep.requestBody) {
        this.requestBodyBox.style.display = 'block';
        this.requestBodyBox.querySelector('pre').innerText = JSON.stringify(ep.requestBody, null, 2);
      } else {
        this.requestBodyBox.style.display = 'none';
      }
    }

    // Auto-execute the selected endpoint
    this.executeRequest();
  }

  executeRequest() {
    if (!this.currentEndpoint) return;
    if (window.nexusAudio) window.nexusAudio.playClick();

    // Show simulated loading state
    this.sendBtn.disabled = true;
    this.sendBtn.innerHTML = `<i data-lucide="loader-2" class="spin-icon"></i> Executing...`;
    this.jsonViewer.innerHTML = `<span style="color: var(--neon-cyan)">// Dispatching async coroutine via ASGI event loop...\n// Querying simulated PostgreSQL connection pool...</span>`;
    
    if (window.lucide) window.lucide.createIcons();

    const latency = this.currentEndpoint.latency + Math.floor(Math.random() * 8);

    setTimeout(() => {
      this.sendBtn.disabled = false;
      this.sendBtn.innerHTML = `<i data-lucide="play"></i> Send Request`;
      
      // Update status badge
      if (this.statusBadge) {
        this.statusBadge.innerText = `${this.currentEndpoint.status} ${this.currentEndpoint.status === 201 ? 'CREATED' : 'OK'}`;
        this.statusBadge.className = `response-status-badge status-${this.currentEndpoint.status}`;
      }

      if (this.latencyDisplay) {
        this.latencyDisplay.innerText = `${latency} ms`;
      }

      // Syntax highlight JSON
      const formattedJson = JSON.stringify(this.currentEndpoint.response, null, 2);
      this.jsonViewer.innerHTML = this.syntaxHighlight(formattedJson);

      if (window.nexusAudio) window.nexusAudio.playSuccess();
      if (window.lucide) window.lucide.createIcons();
    }, 280);
  }

  syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      let cls = 'style="color: #93c5fd;"'; // number
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'style="color: var(--neon-cyan); font-weight: 600;"'; // key
        } else {
          cls = 'style="color: var(--neon-green);"'; // string
        }
      } else if (/true|false/.test(match)) {
        cls = 'style="color: var(--neon-purple);"'; // boolean
      } else if (/null/.test(match)) {
        cls = 'style="color: var(--neon-rose);"'; // null
      }
      return `<span ${cls}>${match}</span>`;
    });
  }

  copyResponse() {
    if (!this.currentEndpoint) return;
    const jsonStr = JSON.stringify(this.currentEndpoint.response, null, 2);
    navigator.clipboard.writeText(jsonStr).then(() => {
      if (this.copyBtn) {
        const orig = this.copyBtn.innerHTML;
        this.copyBtn.innerHTML = `<i data-lucide="check"></i> Copied!`;
        if (window.lucide) window.lucide.createIcons();
        setTimeout(() => {
          this.copyBtn.innerHTML = orig;
          if (window.lucide) window.lucide.createIcons();
        }, 1500);
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.nexusSandbox = new ApiSandbox();
});
