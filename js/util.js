// Utilidades chicas que usa toda la app.

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

// append/prepend/replaceChildren nativos escriben "null" en pantalla si reciben null o false.
// Las vistas usan condicionales (cond ? nodo : null), así que se los hacemos ignorar una sola vez acá.
if (typeof Element !== 'undefined') {
  for (const name of ['append', 'prepend', 'replaceChildren']) {
    const native = Element.prototype[name];
    Element.prototype[name] = function (...nodes) {
      return native.apply(this, nodes.flat().filter((n) => n !== null && n !== undefined && n !== false));
    };
  }
}

// Crea un elemento: h('div', { class: 'x', onclick: fn }, 'texto', otroNodo)
export function h(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs || {})) {
    if (value === null || value === undefined || value === false) continue;
    if (key === 'class') node.className = value;
    else if (key === 'html') node.innerHTML = value;
    else if (key === 'dataset') Object.assign(node.dataset, value);
    else if (key.startsWith('on') && typeof value === 'function') {
      node.addEventListener(key.slice(2).toLowerCase(), value);
    } else node.setAttribute(key, value === true ? '' : value);
  }
  for (const child of children.flat()) {
    if (child === null || child === undefined || child === false) continue;
    node.append(child.nodeType ? child : document.createTextNode(String(child)));
  }
  return node;
}

export function esc(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Formato mínimo para enunciados: **negrita**, ___ (hueco) y saltos de línea.
export function fmt(text) {
  return esc(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/___/g, '<span class="blank"></span>')
    .replace(/\n/g, '<br>');
}

export function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ---------- fechas ----------

export function startOfDay(ts = Date.now()) {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

export function dayKey(ts = Date.now()) {
  const d = new Date(ts);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}

export function addDays(ts, n) {
  const d = new Date(ts);
  d.setDate(d.getDate() + n);
  return d.getTime();
}

// ---------- texto ----------

const ACUTE = /́/g;

// Saca las marcas de acento tónico del ruso (мо́ре -> море).
export function stripStress(text) {
  return String(text).replace(ACUTE, '');
}

function looseLatin(text) {
  return text.normalize('NFD').replace(/([a-z])[̀́̈]/g, '$1').normalize('NFC');
}

// Normaliza para comparar respuestas: ignora mayúsculas, puntuación, acento tónico y ё/е.
// Con { loose: true } también ignora tildes del español (para respuestas en español).
export function normalize(text, { loose = false } = {}) {
  let t = stripStress(String(text).normalize('NFC'))
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[’‘`´]/g, "'")
    .replace(/[.,!?;:¿¡"“”«»()…–—\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (loose) t = looseLatin(t);
  return t;
}

export function levenshtein(a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
    }
    prev = cur;
  }
  return prev[b.length];
}

export function similarity(a, b) {
  const max = Math.max(a.length, b.length);
  return max === 0 ? 1 : 1 - levenshtein(a, b) / max;
}

// Id estable para una palabra de vocabulario.
export function slug(text) {
  return normalize(text).replace(/\s+/g, '_');
}

// ---------- avisos ----------

let toastTimer;
export function toast(message, ms = 2600) {
  let box = document.getElementById('toast');
  if (!box) {
    box = h('div', { id: 'toast', role: 'status', 'aria-live': 'polite' });
    document.body.append(box);
  }
  box.textContent = message;
  box.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => box.classList.remove('show'), ms);
}

export function plural(n, one, many) {
  return n === 1 ? one : many;
}
