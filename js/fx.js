// Efectos visuales: confeti y textos que flotan. Son decorativos: si el sistema pide menos movimiento, no se hacen.

import { h } from './util.js';

const calm = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

const COLORS = ['#e8939a', '#ffe36e', '#7bd3a4', '#8fb4ff', '#c78bff', '#ff9d5c'];

export function confetti(count = 70) {
  if (calm()) return;
  const layer = h('div', { class: 'confetti', 'aria-hidden': 'true' });
  for (let i = 0; i < count; i++) {
    const piece = h('i', {});
    const size = 6 + Math.random() * 7;
    piece.style.cssText = [
      `left:${Math.random() * 100}%`,
      `width:${size}px`,
      `height:${size * (0.5 + Math.random())}px`,
      `background:${COLORS[i % COLORS.length]}`,
      `animation-delay:${Math.random() * 0.5}s`,
      `animation-duration:${1.6 + Math.random() * 1.4}s`,
      `--drift:${(Math.random() - 0.5) * 220}px`,
      `--spin:${(Math.random() - 0.5) * 900}deg`,
    ].join(';');
    layer.append(piece);
  }
  document.body.append(layer);
  setTimeout(() => layer.remove(), 3600);
}

// Un texto corto que sube y se desvanece cerca de un elemento (por ejemplo "+10").
export function floatText(text, near, className = '') {
  if (calm() || !near?.isConnected) return;
  const rect = near.getBoundingClientRect();
  const bubble = h('span', { class: `float-text ${className}`.trim(), 'aria-hidden': 'true' }, text);
  bubble.style.left = `${rect.left + rect.width / 2}px`;
  bubble.style.top = `${rect.top}px`;
  document.body.append(bubble);
  setTimeout(() => bubble.remove(), 1100);
}
