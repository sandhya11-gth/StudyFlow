let ctx = null;
let master = null;
let enabled = true;
let hum = null;

function ac() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = enabled ? 0.6 : 0;
    master.connect(ctx.destination);
    window.addEventListener('pointerdown', resume, { passive: true });
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function resume() { if (ctx && ctx.state === 'suspended') ctx.resume(); }

export function gesture() { ac(); }

export function setSound(on) {
  enabled = on;
  if (!ctx || !master) return;
  master.gain.cancelScheduledValues(ctx.currentTime);
  master.gain.setTargetAtTime(on ? 0.6 : 0, ctx.currentTime, 0.02);
}

function tone({ type = 'square', freq, to, dur = 0.12, vol = 0.25, delay = 0 }) {
  const c = ac(); if (!c || !master || !enabled) return;
  const t0 = c.currentTime + delay;
  const o = c.createOscillator(), g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t0);
  if (to) o.frequency.exponentialRampToValueAtTime(to, t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(vol, t0 + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g); g.connect(master);
  o.start(t0); o.stop(t0 + dur + 0.03);
}

function startHum() {
  const c = ac(); if (!c || !master || hum) return;
  const len = c.sampleRate * 2;
  const buf = c.createBuffer(1, len, c.sampleRate);
  const d = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < len; i++) { const w = Math.random() * 2 - 1; last = (last + 0.02 * w) / 1.02; d[i] = last * 3.2; }
  const src = c.createBufferSource(); src.buffer = buf; src.loop = true;
  const filter = c.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 480; filter.Q.value = 0.6;
  const g = c.createGain(); g.gain.value = 0.026;
  const lfo = c.createOscillator(); lfo.frequency.value = 0.07;
  const lg = c.createGain(); lg.gain.value = 160;
  lfo.connect(lg); lg.connect(filter.frequency);
  src.connect(filter); filter.connect(g); g.connect(master);
  src.start(); lfo.start();
  hum = { src, lfo };
}

function stopHum() {
  if (!hum) return;
  try { hum.src.stop(); hum.lfo.stop(); } catch { /* noop */ }
  hum = null;
}

export function setAmbient(on) { on ? startHum() : stopHum(); }

export const sfx = {
  click() { tone({ freq: 620, dur: 0.05, vol: 0.14 }); },
  start() { tone({ freq: 440, to: 620, dur: 0.16, vol: 0.2 }); tone({ type: 'triangle', freq: 660, to: 880, dur: 0.18, vol: 0.16, delay: 0.05 }); },
  pause() { tone({ freq: 620, to: 440, dur: 0.16, vol: 0.2 }); },
  reset() { tone({ freq: 300, to: 260, dur: 0.09, vol: 0.12 }); },
  complete() { tone({ type: 'triangle', freq: 660, dur: 0.14, vol: 0.24 }); tone({ type: 'triangle', freq: 990, dur: 0.26, vol: 0.22, delay: 0.1 }); },
  levelup() { [523, 659, 784, 1047].forEach((f, i) => tone({ type: 'square', freq: f, dur: 0.16, vol: 0.16, delay: i * 0.09 })); },
  unlock() { tone({ type: 'triangle', freq: 988, dur: 0.09, vol: 0.2 }); tone({ type: 'triangle', freq: 1319, dur: 0.2, vol: 0.22, delay: 0.08 }); },
  lamp(on) { tone({ freq: on ? 700 : 520, to: on ? 820 : 460, dur: 0.1, vol: 0.14 }); },
  tick() { tone({ type: 'sine', freq: 850, dur: 0.04, vol: 0.08 }); },
};