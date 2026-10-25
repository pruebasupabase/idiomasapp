// Piezas de interfaz que se repiten en varias pantallas.

import { h } from './util.js';
import { speak } from './speech.js';

const PATHS = {
  home: '<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  book: '<path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4z"/><path d="M20 4h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7z"/>',
  cards: '<rect x="3" y="7" width="14" height="13" rx="1.5"/><path d="M7 4h13a1 1 0 0 1 1 1v12"/>',
  chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  speaker: '<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 9a4 4 0 0 1 0 6"/><path d="M19 6.5a8 8 0 0 1 0 11"/>',
  mic: '<rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
  back: '<path d="M15 5l-7 7 7 7"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
  lock: '<rect x="5" y="11" width="14" height="9" rx="1.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  send: '<path d="M4 12l16-8-6 16-3-7z"/>',
  keyboard: '<rect x="2" y="6" width="20" height="12" rx="1.5"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
};

export function icon(name, extra = '') {
  const span = document.createElement('span');
  span.className = `icon ${extra}`.trim();
  span.setAttribute('aria-hidden', 'true');
  span.innerHTML = `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${PATHS[name] || ''}</svg>`;
  return span;
}

// Botón para escuchar un texto en el idioma del curso.
export function speakButton(text, lang, { slow = false, label = '' } = {}) {
  return h(
    'button',
    {
      class: `say-btn${slow ? ' slow' : ''}`,
      type: 'button',
      'aria-label': slow ? 'Escuchar más lento' : 'Escuchar',
      onclick: () => speak(text, lang, slow ? { rate: 0.6 } : {}),
    },
    icon('speaker'),
    label ? h('span', {}, label) : null,
  );
}

export function listenButtons(text, lang) {
  return h(
    'div',
    { class: 'listen-row' },
    speakButton(text, lang, { label: 'Escuchar' }),
    speakButton(text, lang, { slow: true, label: 'Más lento' }),
  );
}

export function backLink(href, label = 'Volver') {
  return h('a', { class: 'back', href }, icon('back'), h('span', {}, label));
}

export function progressBar(pct, label) {
  return h(
    'div',
    { class: 'meter', role: 'progressbar', 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-valuenow': pct, 'aria-label': label || 'Progreso' },
    h('span', { style: `width:${Math.max(0, Math.min(100, pct))}%` }),
  );
}

export function emptyState(title, body, action) {
  return h('div', { class: 'empty' }, h('h2', {}, title), h('p', {}, body), action || null);
}
