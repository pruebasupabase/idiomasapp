// Arranque de la app: sesión, navegación por hash y barra de pestañas.

import { isLocalMode, currentUser, getClient, LOCAL_USER } from './auth.js';
import { loadUser, unloadUser, getUser, getSettings, onChange } from './store.js';
import { setVoiceConfig, speak, stopSpeaking } from './speech.js';
import { h, $, toast } from './util.js';
import { icon } from './ui.js';
import { courseList } from './content/index.js';
import { reviewCounts } from './progress.js';

import loginView from './views/login.js';
import homeView from './views/home.js';
import coursesView from './views/courses.js';
import courseView from './views/course.js';
import lessonView from './views/lesson.js';
import reviewView from './views/review.js';
import tutorView from './views/tutor.js';
import alphabetView from './views/alphabet.js';
import meView from './views/me.js';

// Safari de iPhone ignora user-scalable=no: se frena el pellizco a mano.
for (const name of ['gesturestart', 'gesturechange', 'gestureend']) {
  document.addEventListener(name, (e) => e.preventDefault());
}

// [patrón, vista, pestaña activa, ¿modo concentración? (sin barra de pestañas)]
const ROUTES = [
  [/^\/?$/, homeView, 'home', false],
  [/^\/login$/, loginView, null, true],
  [/^\/courses$/, coursesView, 'courses', false],
  [/^\/course\/(\w+)$/, courseView, 'courses', false],
  [/^\/lesson\/(\w+)\/([\w-]+)$/, lessonView, 'courses', true],
  [/^\/review(?:\/(\w+))?$/, reviewView, 'review', true],
  [/^\/tutor(?:\/(\w+))?$/, tutorView, 'tutor', false],
  [/^\/alphabet$/, alphabetView, 'courses', false],
  [/^\/me$/, meView, 'me', false],
];

const TABS = [
  { id: 'home', href: '#/', label: 'Inicio', icon: 'home' },
  { id: 'courses', href: '#/courses', label: 'Cursos', icon: 'book' },
  { id: 'review', href: '#/review', label: 'Repaso', icon: 'cards' },
  { id: 'tutor', href: '#/tutor', label: 'Tutor', icon: 'chat' },
  { id: 'me', href: '#/me', label: 'Perfil', icon: 'user' },
];

const main = $('#view');
const nav = $('#tabs');
let cleanup = null;
let renderToken = 0;

// ---------- aplicar ajustes ----------

function applySettings() {
  const s = getSettings();
  setVoiceConfig({ rate: s.rate, enAccent: s.enAccent });
  if (s.theme === 'light' || s.theme === 'dark') document.documentElement.dataset.theme = s.theme;
  else delete document.documentElement.dataset.theme;
}

function dueTotal() {
  if (!getUser()) return 0;
  return courseList()
    .filter((c) => getSettings().courses.includes(c.id))
    .reduce((sum, c) => sum + reviewCounts(c.id).total, 0);
}

// ---------- barra de pestañas ----------

function buildNav() {
  nav.replaceChildren(
    ...TABS.map((tab) =>
      h(
        'a',
        { class: 'tab', href: tab.href, dataset: { tab: tab.id } },
        icon(tab.icon),
        h('span', { class: 'tab-label' }, tab.label),
        tab.id === 'review' ? h('span', { class: 'badge', hidden: true, id: 'review-badge' }) : null,
      ),
    ),
  );
}

function updateNav(active) {
  for (const tab of nav.querySelectorAll('.tab')) {
    const on = tab.dataset.tab === active;
    tab.classList.toggle('active', on);
    if (on) tab.setAttribute('aria-current', 'page');
    else tab.removeAttribute('aria-current');
  }
  updateBadge();
}

function updateBadge() {
  const badge = $('#review-badge');
  if (!badge) return;
  const n = dueTotal();
  badge.hidden = n === 0;
  badge.textContent = n > 99 ? '99+' : String(n);
  badge.setAttribute('aria-label', `${n} tarjetas para repasar`);
}

// ---------- navegación ----------

async function render() {
  const token = ++renderToken;
  const path = location.hash.replace(/^#/, '') || '/';

  if (cleanup) {
    try {
      cleanup();
    } catch (err) {
      console.warn(err);
    }
    cleanup = null;
  }
  stopSpeaking();

  const user = getUser();
  if (!user && path !== '/login') {
    location.replace('#/login');
    return;
  }
  if (user && path === '/login') {
    location.replace('#/');
    return;
  }

  for (const [pattern, view, tab, focus] of ROUTES) {
    const match = path.match(pattern);
    if (!match) continue;
    document.body.dataset.mode = focus ? 'focus' : 'browse';
    main.replaceChildren();
    main.scrollTop = 0;
    window.scrollTo(0, 0);
    updateNav(tab);
    const result = await view(main, ...match.slice(1));
    if (token !== renderToken) {
      // Mientras cargaba el usuario ya se fue a otra pantalla.
      if (typeof result === 'function') result();
      return;
    }
    cleanup = typeof result === 'function' ? result : null;
    main.focus({ preventScroll: true });
    return;
  }
  location.replace('#/');
}

// ---------- audio al tocar ejemplos de la teoría ----------

function speakFromElement(el) {
  const lang = el.closest('[data-lang]')?.dataset.lang;
  if (lang) speak(el.dataset.say || el.textContent, lang);
}

document.addEventListener('click', (e) => {
  const el = e.target.closest?.('.say');
  if (el) speakFromElement(el);
});

document.addEventListener('keydown', (e) => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.classList?.contains('say')) {
    e.preventDefault();
    speakFromElement(e.target);
  }
});

// ---------- arranque ----------

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((err) => console.warn('Service worker', err));
  });
}

export async function boot() {
  buildNav();
  registerServiceWorker();

  const user = isLocalMode ? LOCAL_USER : await currentUser();
  if (user) loadUser(user);
  applySettings();

  onChange(() => {
    applySettings();
    updateBadge();
  });

  if (!isLocalMode) {
    getClient().auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT' && getUser()) {
        unloadUser();
        location.hash = '#/login';
        toast('La sesión se cerró. Volvé a entrar.');
      }
    });
  }

  window.addEventListener('hashchange', render);
  window.addEventListener('online', () => toast('Volvió internet.'));
  render();
}

boot();
