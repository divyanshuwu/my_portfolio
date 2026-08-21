/**
 * NEXUS-OS Web Audio Procedural Synthesizer
 * Generates futuristic sci-fi sound effects in real-time without external audio files.
 */

class SoundSynthesizer {
  constructor() {
    this.ctx = null;
    this.enabled = localStorage.getItem('nexus_audio_enabled') === 'true';
    this.initListeners();
  }

  getAudioContext() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('nexus_audio_enabled', this.enabled);
    if (this.enabled) {
      this.playBoot();
    }
    this.updateUI();
    return this.enabled;
  }

  updateUI() {
    const btn = document.getElementById('hud-audio-toggle');
    if (!btn) return;
    if (this.enabled) {
      btn.innerHTML = `<i data-lucide="volume-2"></i>`;
      btn.style.color = "var(--neon-cyan)";
      btn.setAttribute('title', "Audio FX: ON (Click to Mute)");
    } else {
      btn.innerHTML = `<i data-lucide="volume-x"></i>`;
      btn.style.color = "var(--text-dim)";
      btn.setAttribute('title', "Audio FX: MUTED (Click to Enable)");
    }
    if (window.lucide) window.lucide.createIcons();
  }

  playHover() {
    if (!this.enabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {}
  }

  playClick() {
    if (!this.enabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {}
  }

  playTerminal() {
    if (!this.enabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(600 + Math.random() * 200, ctx.currentTime);

      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } catch (e) {}
  }

  playSuccess() {
    if (!this.enabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.06);

        gain.gain.setValueAtTime(0.03, ctx.currentTime + i * 0.06);
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + i * 0.06 + 0.12);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.06);
        osc.stop(ctx.currentTime + i * 0.06 + 0.12);
      });
    } catch (e) {}
  }

  playBoot() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch (e) {}
  }

  initListeners() {
    document.addEventListener('DOMContentLoaded', () => {
      this.updateUI();
      const btn = document.getElementById('hud-audio-toggle');
      if (btn) {
        btn.addEventListener('click', () => this.toggle());
      }

      // Add audio hooks to interactive buttons and links
      document.querySelectorAll('.btn, .endpoint-btn, .term-chip, .code-tab-btn, .hud-nav-item a').forEach(el => {
        el.addEventListener('mouseenter', () => this.playHover());
        el.addEventListener('click', () => this.playClick());
      });
    });
  }
}

const nexusAudio = new SoundSynthesizer();
