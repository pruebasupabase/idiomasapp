// Teclado cirílico en pantalla, para cuando el dispositivo no tiene el teclado ruso instalado.

import { h } from './util.js';
import { icon } from './ui.js';

const ROWS = ['йцукенгшщзхъ', 'фывапролджэ', 'ячсмитьбюё'];

function insertAtCursor(input, text) {
  const start = input.selectionStart ?? input.value.length;
  const end = input.selectionEnd ?? input.value.length;
  input.value = input.value.slice(0, start) + text + input.value.slice(end);
  const pos = start + text.length;
  input.setSelectionRange(pos, pos);
  input.dispatchEvent(new Event('input', { bubbles: true }));
}

function backspace(input) {
  const start = input.selectionStart ?? input.value.length;
  const end = input.selectionEnd ?? input.value.length;
  if (start !== end) return insertAtCursor(input, '');
  if (start === 0) return;
  input.value = input.value.slice(0, start - 1) + input.value.slice(end);
  input.setSelectionRange(start - 1, start - 1);
  input.dispatchEvent(new Event('input', { bubbles: true }));
}

export function russianKeyboard(input) {
  const keep = (e) => e.preventDefault(); // no le saca el foco al campo de texto
  const key = (label, action, cls = '') =>
    h('button', { class: `kb-key ${cls}`.trim(), type: 'button', onmousedown: keep, onclick: action }, label);

  const panel = h('div', { class: 'kb', hidden: true });
  for (const row of ROWS) {
    panel.append(h('div', { class: 'kb-row' }, [...row].map((ch) => key(ch, () => insertAtCursor(input, ch)))));
  }
  panel.append(
    h(
      'div',
      { class: 'kb-row' },
      key('espacio', () => insertAtCursor(input, ' '), 'wide'),
      key('borrar', () => backspace(input), 'wide'),
    ),
  );

  const toggle = h(
    'button',
    {
      class: 'link-btn',
      type: 'button',
      'aria-expanded': 'false',
      onclick: () => {
        panel.hidden = !panel.hidden;
        toggle.setAttribute('aria-expanded', String(!panel.hidden));
      },
    },
    icon('keyboard'),
    h('span', {}, 'Teclado ruso'),
  );
  return h('div', { class: 'kb-wrap' }, toggle, panel);
}
