// Tutor de IA: conversación, corrección de textos y explicaciones.
// Llama a la edge function "tutor" de Supabase, que tiene las claves de Groq/Gemini (nunca van en el navegador).

import { h } from '../util.js';
import { courseList, getCourse, lessonsOf } from '../content/index.js';
import { getSettings } from '../store.js';
import { isLocalMode, getClient } from '../auth.js';
import { TUTOR_FUNCTION } from '../config.js';
import { speakButton, icon, emptyState } from '../ui.js';
import { canListen, listen, stopSpeaking } from '../speech.js';
import { isDone, nextLesson } from '../progress.js';

const MODES = [
  { id: 'chat', label: 'Conversar', hint: 'Charla en el idioma. Te corrige lo importante sin cortar la conversación.' },
  { id: 'correct', label: 'Corregir un texto', hint: 'Escribí algo en el idioma y te lo devuelve corregido, con la explicación en español.' },
  { id: 'explain', label: 'Preguntar', hint: 'Preguntale lo que no entiendas de gramática o vocabulario. Te responde en español.' },
];

const SCENARIOS = {
  ru: [
    { id: 'free', label: 'Charla libre' },
    { id: 'meeting', label: 'Conocer a alguien' },
    { id: 'cafe', label: 'En un café' },
    { id: 'directions', label: 'Pedir indicaciones' },
    { id: 'market', label: 'En el mercado' },
  ],
  en: [
    { id: 'free', label: 'Charla libre' },
    { id: 'interview', label: 'Entrevista de trabajo' },
    { id: 'airport', label: 'En el aeropuerto' },
    { id: 'restaurant', label: 'En un restaurante' },
    { id: 'opinion', label: 'Dar tu opinión sobre un tema' },
  ],
};

function levelFor(courseId) {
  const all = lessonsOf(courseId);
  const upcoming = nextLesson(courseId);
  return (upcoming || all[all.length - 1]?.lesson)?.level || 'A1';
}

function studiedTopics(courseId) {
  return lessonsOf(courseId)
    .filter((x) => isDone(courseId, x.lesson.id))
    .map((x) => x.lesson.title)
    .slice(-10);
}

async function errorMessage(error) {
  try {
    const body = await error.context?.json?.();
    if (body?.error) return body.error;
  } catch {
    /* sin cuerpo */
  }
  if (/not found|404/i.test(error.message || '')) {
    return 'La función "tutor" todavía no está publicada en Supabase. Mirá el README.';
  }
  return error.message || 'No se pudo hablar con el tutor.';
}

export default function tutorView(root, courseParam) {
  const enabled = courseList().filter((c) => getSettings().courses.includes(c.id));

  if (isLocalMode) {
    root.append(
      h('header', { class: 'page-head' }, h('h1', {}, 'Tutor')),
      emptyState('El tutor necesita la cuenta en la nube', 'Configurá Supabase en js/config.js y publicá la función del tutor. Los pasos están en el README.'),
    );
    return;
  }
  if (!enabled.length) {
    root.append(
      h('header', { class: 'page-head' }, h('h1', {}, 'Tutor')),
      emptyState('Elegí un curso primero', 'El tutor se adapta al curso que estés haciendo.', h('a', { class: 'btn primary', href: '#/me' }, 'Ir a Perfil')),
    );
    return;
  }

  let courseId = enabled.find((c) => c.id === courseParam)?.id || enabled[0].id;
  let mode = 'chat';
  let scenario = 'free';
  let messages = [];
  let busy = false;

  const head = h('div', { class: 'tutor-head' });
  const thread = h('ol', { class: 'thread', 'aria-live': 'polite' });
  const input = h('textarea', { class: 'field', rows: 2, 'aria-label': 'Tu mensaje', autocapitalize: 'sentences', spellcheck: 'false' });
  const sendBtn = h('button', { class: 'btn primary', type: 'submit' }, icon('send'), h('span', {}, 'Enviar'));
  const micBtn = canListen()
    ? h('button', { class: 'btn ghost', type: 'button', 'aria-label': 'Dictar con la voz' }, icon('mic'))
    : null;
  const composer = h('form', { class: 'composer' }, input, h('div', { class: 'composer-actions' }, micBtn, sendBtn));
  const page = h('div', { class: 'tutor' }, head, thread, composer);
  root.append(h('header', { class: 'page-head' }, h('h1', {}, 'Tutor')), page);

  const course = () => getCourse(courseId);

  function drawHead() {
    root.dataset.lang = course().lang;
    root.dataset.course = courseId;
    const modeInfo = MODES.find((m) => m.id === mode);
    head.replaceChildren(
      enabled.length > 1
        ? h(
            'div',
            { class: 'chips', role: 'tablist', 'aria-label': 'Curso' },
            enabled.map((c) =>
              h('button', { class: `chip-tab${c.id === courseId ? ' on' : ''}`, type: 'button', role: 'tab', 'aria-selected': String(c.id === courseId), onclick: () => switchCourse(c.id) }, c.name),
            ),
          )
        : null,
      h(
        'div',
        { class: 'chips', role: 'tablist', 'aria-label': 'Modo' },
        MODES.map((m) =>
          h('button', { class: `chip-tab${m.id === mode ? ' on' : ''}`, type: 'button', role: 'tab', 'aria-selected': String(m.id === mode), onclick: () => switchMode(m.id) }, m.label),
        ),
      ),
      h('p', { class: 'muted small' }, modeInfo.hint),
      mode === 'chat'
        ? h(
            'label',
            { class: 'inline-field' },
            h('span', {}, 'Situación'),
            h(
              'select',
              { class: 'field', onchange: (e) => { scenario = e.target.value; reset(); } },
              SCENARIOS[courseId].map((s) => h('option', { value: s.id, selected: s.id === scenario }, s.label)),
            ),
          )
        : null,
    );
  }

  function drawThread() {
    const items = messages.map((m) =>
      m.role === 'user'
        ? h('li', { class: 'msg user' }, h('p', { lang: mode === 'explain' ? 'es' : course().lang }, m.content))
        : h(
            'li',
            { class: `msg bot${m.error ? ' error' : ''}` },
            m.reply
              ? h('div', { class: 'msg-main' }, h('p', { lang: mode === 'explain' ? 'es' : course().lang }, m.reply), mode === 'explain' ? null : speakButton(m.reply, course().lang))
              : null,
            m.notes ? h('p', { class: 'msg-notes' }, m.notes) : null,
            m.error ? h('p', {}, m.error) : null,
          ),
    );
    if (busy) items.push(h('li', { class: 'msg bot typing' }, h('p', {}, 'Escribiendo…')));
    if (!messages.length && !busy) {
      items.push(
        h(
          'li',
          { class: 'msg hint' },
          mode === 'chat'
            ? h('div', {}, h('p', {}, 'Escribí tu primer mensaje o dejá que el tutor arranque.'), h('button', { class: 'btn', type: 'button', onclick: () => ask(null) }, 'Que arranque el tutor'))
            : h('p', {}, mode === 'correct' ? `Escribí un texto en ${course().name.toLowerCase()} para que lo corrija.` : 'Escribí tu pregunta.'),
        ),
      );
    }
    thread.replaceChildren(...items);
    thread.lastElementChild?.scrollIntoView({ block: 'nearest' });
  }

  function reset() {
    messages = [];
    busy = false;
    drawHead();
    drawThread();
  }

  function switchCourse(id) {
    courseId = id;
    scenario = 'free';
    reset();
  }

  function switchMode(id) {
    mode = id;
    reset();
  }

  async function ask(text) {
    if (busy) return;
    if (text) messages.push({ role: 'user', content: text });
    busy = true;
    sendBtn.disabled = true;
    drawThread();

    const body = {
      course: courseId,
      level: levelFor(courseId),
      mode,
      scenario: SCENARIOS[courseId].find((s) => s.id === scenario)?.label || '',
      studied: studiedTopics(courseId),
      start: !text && messages.length === 0,
      messages: messages.slice(-12).map((m) => ({ role: m.role, content: m.content || m.reply || '' })),
    };

    try {
      const { data, error } = await getClient().functions.invoke(TUTOR_FUNCTION, { body });
      if (error) throw Object.assign(new Error(await errorMessage(error)), { handled: true });
      messages.push({ role: 'assistant', content: data.reply, reply: data.reply, notes: data.notes || '' });
    } catch (err) {
      const msg = err.handled ? err.message : await errorMessage(err);
      messages.push({ role: 'assistant', error: msg, content: '' });
    } finally {
      busy = false;
      sendBtn.disabled = false;
      drawThread();
    }
  }

  composer.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    ask(text);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
      e.preventDefault();
      composer.requestSubmit();
    }
  });

  micBtn?.addEventListener('click', async () => {
    micBtn.disabled = true;
    try {
      const { best } = await listen(mode === 'explain' ? 'es' : course().lang);
      if (best) input.value = (input.value ? `${input.value} ` : '') + best;
    } catch {
      /* sin permiso de micrófono: no pasa nada */
    } finally {
      micBtn.disabled = false;
      input.focus();
    }
  });

  drawHead();
  drawThread();

  return () => {
    stopSpeaking();
    delete root.dataset.lang;
    delete root.dataset.course;
  };
}
