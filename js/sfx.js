// Sonidos cortos hechos con Web Audio (nada que descargar). Se pueden apagar desde Perfil.

import { getSettings } from './store.js';

let ctx = null;

function audio() {
  if (!ctx) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    try {
      ctx = new Ctx();
    } catch {
      return null;
    }
  }
  // En iPhone el contexto arranca suspendido hasta que hay un toque del usuario.
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  return ctx;
}

// Una nota: frecuencia, cuándo empieza (segundos desde ahora), cuánto dura, forma de onda y volumen.
function note(c, freq, start, length, { type = 'sine', gain = 0.16, slideTo = null } = {}) {
  const osc = c.createOscillator();
  const amp = c.createGain();
  const t0 = c.currentTime + start;
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + length);
  amp.gain.setValueAtTime(0.0001, t0);
  amp.gain.exponentialRampToValueAtTime(gain, t0 + 0.015);
  amp.gain.exponentialRampToValueAtTime(0.0001, t0 + length);
  osc.connect(amp).connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + length + 0.02);
}

const SOUNDS = {
  tap: (c) => note(c, 660, 0, 0.06, { type: 'triangle', gain: 0.08 }),
  right: (c) => {
    note(c, 659, 0, 0.14, { type: 'triangle' });
    note(c, 880, 0.1, 0.22, { type: 'triangle' });
  },
  wrong: (c) => {
    note(c, 220, 0, 0.22, { type: 'sawtooth', gain: 0.09, slideTo: 150 });
    note(c, 196, 0.12, 0.26, { type: 'sawtooth', gain: 0.08, slideTo: 130 });
  },
  done: (c) => {
    [523, 659, 784, 1047].forEach((f, i) => note(c, f, i * 0.11, 0.3, { type: 'triangle', gain: 0.14 }));
    note(c, 1319, 0.5, 0.5, { type: 'sine', gain: 0.1 });
  },
  fail: (c) => {
    [392, 330, 262].forEach((f, i) => note(c, f, i * 0.16, 0.3, { type: 'sine', gain: 0.12 }));
  },
  combo: (c) => {
    note(c, 784, 0, 0.1, { type: 'triangle', gain: 0.12 });
    note(c, 1047, 0.08, 0.1, { type: 'triangle', gain: 0.12 });
    note(c, 1319, 0.16, 0.2, { type: 'triangle', gain: 0.12 });
  },
};

export function play(name) {
  if (getSettings().sound === false) return;
  const c = audio();
  if (c && SOUNDS[name]) SOUNDS[name](c);
}

// Hay que llamarla dentro de un toque para destrabar el audio en iOS.
export function unlock() {
  audio();
}
