/**
 * NEXUS-AI — Interactive Conversational Portfolio Assistant
 */

class NexusAIAssistant {
  constructor() {
    this.launcher = document.getElementById('ai-launcher');
    this.drawer = document.getElementById('ai-drawer');
    this.closeBtn = document.getElementById('ai-drawer-close');
    this.messagesContainer = document.getElementById('ai-messages');
    this.form = document.getElementById('ai-form');
    this.input = document.getElementById('ai-input');
    this.chipsContainer = document.getElementById('ai-quick-chips');

    this.isOpen = false;
    this.init();
  }

  init() {
    if (!this.launcher || !this.drawer) return;

    this.launcher.addEventListener('click', () => this.toggle());
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.toggle(false));
    }

    if (this.form) {
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = this.input.value.trim();
        if (text) {
          this.handleUserMessage(text);
          this.input.value = '';
        }
      });
    }

    this.renderQuickChips();

    // Initial greeting message
    this.addMessage(PORTFOLIO_CONFIG.aiKnowledge.greeting, 'ai');
  }

  toggle(forceState) {
    this.isOpen = forceState !== undefined ? forceState : !this.isOpen;
    if (this.isOpen) {
      this.drawer.classList.add('active');
      if (this.input) this.input.focus();
      if (window.nexusAudio) window.nexusAudio.playBoot();
    } else {
      this.drawer.classList.remove('active');
      if (window.nexusAudio) window.nexusAudio.playClick();
    }
  }

  renderQuickChips() {
    if (!this.chipsContainer) return;
    this.chipsContainer.innerHTML = '';
    PORTFOLIO_CONFIG.aiKnowledge.quickPrompts.forEach(promptText => {
      const chip = document.createElement('div');
      chip.className = 'ai-quick-chip';
      chip.innerText = promptText;
      chip.addEventListener('click', () => {
        this.handleUserMessage(promptText);
      });
      this.chipsContainer.appendChild(chip);
    });
  }

  handleUserMessage(text) {
    this.addMessage(text, 'user');
    if (window.nexusAudio) window.nexusAudio.playTerminal();

    // Show simulated typing state
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'chat-bubble chat-bubble-ai';
    typingIndicator.innerHTML = `<em>NEXUS-AI synthesizing response...</em>`;
    this.messagesContainer.appendChild(typingIndicator);
    this.scrollToBottom();

    setTimeout(() => {
      typingIndicator.remove();
      const response = this.generateResponse(text);
      this.addMessage(response, 'ai');
      if (window.nexusAudio) window.nexusAudio.playSuccess();
    }, 450);
  }

  generateResponse(query) {
    const q = query.toLowerCase();
    const resp = PORTFOLIO_CONFIG.aiKnowledge.responses;

    if (q.includes('skill') || q.includes('stack') || q.includes('technology') || q.includes('know')) {
      return resp.skills;
    }
    if (q.includes('fastapi') || q.includes('rest') || q.includes('api') || q.includes('backend')) {
      return resp.fastapi;
    }
    if (q.includes('project') || q.includes('work') || q.includes('portfolio') || q.includes('build')) {
      return resp.projects;
    }
    if (q.includes('intern') || q.includes('hire') || q.includes('job') || q.includes('availab')) {
      return resp.internship;
    }
    if (q.includes('academic') || q.includes('college') || q.includes('degree') || q.includes('gpa') || q.includes('cgpa') || q.includes('year') || q.includes('b.tech')) {
      return resp.academics;
    }
    if (q.includes('java') || q.includes('thread') || q.includes('concurrency')) {
      return resp.java;
    }
    if (q.includes('sql') || q.includes('database') || q.includes('postgres') || q.includes('query')) {
      return resp.sql;
    }
    if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('linkedin') || q.includes('github')) {
      return resp.contact;
    }

    return `I can definitely help with that! Divyansh is a 3rd-year B.Tech IT student proficient in **Java, Python, JavaScript, SQL, FastAPI, REST APIs, HTML5, CSS3, and Git & GitHub**. Feel free to ask about Divyansh's skills, coursework, GitHub, or internship availability!`;
  }

  addMessage(content, sender) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble chat-bubble-${sender}`;
    // Support markdown bold and line breaks
    let formatted = content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br/>');
    bubble.innerHTML = formatted;
    this.messagesContainer.appendChild(bubble);
    this.scrollToBottom();
  }

  scrollToBottom() {
    if (this.messagesContainer) {
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.nexusAI = new NexusAIAssistant();
});
