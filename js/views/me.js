// Perfil: cuenta, cursos, ajustes de estudio y de voz, sincronización y copia de seguridad.

import { h, toast } from '../util.js';
import { courseList, cardIndex } from '../content/index.js';
import {
  getUser,
  getSettings,
  updateSettings,
  allCards,
  accuracy,
  sync,
  getSyncInfo,
  onChange,
  exportData,
  importData,
  unloadUser,
} from '../store.js';
import { isLocalMode, signOut } from '../auth.js';
import { courseProgress } from '../progress.js';
import { isMature } from '../srs.js';
import { speak, hasVoiceFor, canSpeak, setVoiceConfig } from '../speech.js';

function section(title, ...children) {
  return h('section', { class: 'settings-block' }, h('h2', {}, title), ...children);
}

function row(label, control, help) {
  return h('label', { class: 'setting' }, h('span', { class: 'setting-label' }, label), control, help ? h('span', { class: 'muted small setting-help' }, help) : null);
}

function syncText(info) {
  if (isLocalMode) return 'Modo local: el progreso se guarda solo en este dispositivo.';
  if (info.status === 'syncing') return 'Sincronizando…';
  if (info.status === 'offline') return info.message;
  if (info.status === 'error') return `No se pudo sincronizar: ${info.message}`;
  if (info.lastSync) return `Última sincronización: ${new Date(info.lastSync).toLocaleString('es-AR')}.`;
  return 'Todavía no se sincronizó.';
}

export default function meView(root) {
  const user = getUser();
  const settings = getSettings();

  // ---------- cuenta ----------
  const account = section(
    'Cuenta',
    h('p', {}, h('strong', {}, user.name), user.email ? h('span', { class: 'muted' }, ` · ${user.email}`) : null),
    isLocalMode
      ? h('p', { class: 'muted small' }, 'Estás en modo local. Para tener cuenta y sincronizar entre dispositivos, configurá Supabase (README).')
      : h(
          'button',
          {
            class: 'btn',
            type: 'button',
            onclick: async () => {
              await signOut();
              unloadUser();
              location.hash = '#/login';
            },
          },
          'Cerrar sesión',
        ),
  );

  // ---------- cursos ----------
  const courses = section(
    'Qué estudio',
    h(
      'div',
      { class: 'checks' },
      courseList().map((course) => {
        const box = h('input', { type: 'checkbox', checked: settings.courses.includes(course.id) });
        box.addEventListener('change', () => {
          const current = getSettings().courses;
          const next = box.checked ? [...new Set([...current, course.id])] : current.filter((id) => id !== course.id);
          updateSettings({ courses: next });
        });
        return h('label', { class: 'check' }, box, h('span', {}, `${course.name} (${course.level})`));
      }),
    ),
  );

  // ---------- estudio ----------
  const perDay = h(
    'select',
    { class: 'field', onchange: (e) => updateSettings({ newPerDay: Number(e.target.value) }) },
    [5, 10, 15, 20, 30].map((n) => h('option', { value: n, selected: n === settings.newPerDay }, `${n} palabras nuevas por día`)),
  );
  const freeBox = h('input', { type: 'checkbox', checked: settings.freeMode });
  freeBox.addEventListener('change', () => updateSettings({ freeMode: freeBox.checked }));
  const study = section(
    'Estudio',
    row('Cupo diario', perDay, 'Las tarjetas nuevas que se suman cada día al repaso.'),
    h('label', { class: 'check' }, freeBox, h('span', {}, 'Abrir todas las lecciones, sin orden obligatorio')),
  );

  // ---------- voz ----------
  const rate = h('input', { type: 'range', min: '0.6', max: '1.1', step: '0.05', value: String(settings.rate) });
  rate.addEventListener('input', () => setVoiceConfig({ rate: Number(rate.value) }));
  rate.addEventListener('change', () => updateSettings({ rate: Number(rate.value) }));
  const accent = h(
    'select',
    { class: 'field', onchange: (e) => updateSettings({ enAccent: e.target.value }) },
    [['en-US', 'Estadounidense'], ['en-GB', 'Británico']].map(([v, l]) => h('option', { value: v, selected: v === settings.enAccent }, l)),
  );
  const voiceNote = h('p', { class: 'muted small' });
  function checkVoices() {
    if (!canSpeak()) {
      voiceNote.textContent = 'Este navegador no puede leer en voz alta.';
      return;
    }
    const missing = [hasVoiceFor('ru') ? '' : 'ruso', hasVoiceFor('en') ? '' : 'inglés'].filter(Boolean);
    voiceNote.textContent = missing.length
      ? `Tu dispositivo no tiene voz en ${missing.join(' ni ')}. Se instala desde los ajustes de voz del sistema (en Android: Texto a voz de Google).`
      : 'Tu dispositivo tiene voces para los dos idiomas.';
  }
  checkVoices();
  if (canSpeak()) window.speechSynthesis.addEventListener?.('voiceschanged', checkVoices);

  const voice = section(
    'Voz',
    row('Velocidad', rate, 'Más lento ayuda a distinguir los sonidos.'),
    row('Acento del inglés', accent),
    h(
      'div',
      { class: 'actions' },
      h('button', { class: 'btn', type: 'button', onclick: () => speak('Здравствуйте! Как дела?', 'ru') }, 'Probar ruso'),
      h('button', { class: 'btn', type: 'button', onclick: () => speak('Hello! How are you doing today?', 'en') }, 'Probar inglés'),
    ),
    voiceNote,
  );

  // ---------- apariencia ----------
  const theme = h(
    'select',
    { class: 'field', onchange: (e) => updateSettings({ theme: e.target.value }) },
    [['auto', 'Según el dispositivo'], ['light', 'Claro'], ['dark', 'Oscuro']].map(([v, l]) => h('option', { value: v, selected: v === settings.theme }, l)),
  );
  const look = section('Apariencia', row('Tema', theme));

  // ---------- sincronización y copia ----------
  const syncLine = h('p', { class: 'muted small', 'aria-live': 'polite' }, syncText(getSyncInfo()));
  const fileInput = h('input', { type: 'file', accept: 'application/json,.json', hidden: true });
  fileInput.addEventListener('change', async () => {
    const file = fileInput.files?.[0];
    if (!file) return;
    try {
      importData(await file.text());
      toast('Copia restaurada.');
    } catch (err) {
      toast(err.message || 'No se pudo leer el archivo.');
    }
    fileInput.value = '';
  });

  const data = section(
    'Tus datos',
    syncLine,
    h(
      'div',
      { class: 'actions' },
      isLocalMode
        ? null
        : h(
            'button',
            {
              class: 'btn',
              type: 'button',
              onclick: async () => {
                const ok = await sync();
                toast(ok ? 'Todo sincronizado.' : 'No se pudo sincronizar.');
              },
            },
            'Sincronizar ahora',
          ),
      h(
        'button',
        {
          class: 'btn',
          type: 'button',
          onclick: () => {
            const blob = new Blob([exportData()], { type: 'application/json' });
            const link = h('a', { href: URL.createObjectURL(blob), download: `cuaderno-${new Date().toISOString().slice(0, 10)}.json` });
            document.body.append(link);
            link.click();
            link.remove();
            setTimeout(() => URL.revokeObjectURL(link.href), 2000);
          },
        },
        'Guardar copia',
      ),
      h('button', { class: 'btn ghost', type: 'button', onclick: () => fileInput.click() }, 'Restaurar copia'),
      fileInput,
    ),
  );
  const offChange = onChange(() => {
    syncLine.textContent = syncText(getSyncInfo());
  });

  // ---------- números ----------
  const stats = section(
    'Tu avance',
    h(
      'div',
      { class: 'stats' },
      settings.courses.length === 0 ? h('p', { class: 'muted' }, 'Elegí un curso para ver tus números.') : null,
      courseList()
        .filter((c) => settings.courses.includes(c.id))
        .map((course) => {
          const index = cardIndex(course.id);
          const cards = allCards(course.id).filter((c) => index.has(c.id));
          const learning = cards.filter((c) => c.seen).length;
          const mature = cards.filter(isMature).length;
          const progress = courseProgress(course.id);
          const acc = accuracy(course.id);
          return h(
            'dl',
            { class: 'stat-list' },
            h('dt', {}, course.name),
            h('dd', {}, `${progress.done} de ${progress.total} lecciones`),
            h('dd', {}, `${learning} palabras en repaso, ${mature} ya bien aprendidas`),
            h('dd', {}, acc === null ? 'Sin ejercicios todavía' : `${acc} % de aciertos en ejercicios`),
          );
        }),
    ),
  );

  root.append(h('header', { class: 'page-head' }, h('h1', {}, 'Perfil')), h('div', { class: 'stack' }, account, courses, study, voice, look, data, stats));
  return offChange;
}
