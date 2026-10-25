// Repaso diario con repetición espaciada.

import { h, plural, normalize, startOfDay, addDays } from '../util.js';
import { courseList, getCourse, cardIndex } from '../content/index.js';
import { getSettings, allCards, putCard, logActivity, todayActivity } from '../store.js';
import { buildQueue, schedule, previewLabel, GRADE, GRADE_LABEL } from '../srs.js';
import { speak, stopSpeaking } from '../speech.js';
import { speakButton, backLink, emptyState } from '../ui.js';
import { russianKeyboard } from '../keyboard.js';
import { reviewCounts } from '../progress.js';

const LANG_NAME = { ru: 'ruso', en: 'inglés' };

let currentStop = null;

function sessionCards(courseId, extraNew = 0) {
  const index = cardIndex(courseId);
  const cards = allCards(courseId).filter((c) => index.has(c.id));
  const limit = Math.max(0, getSettings().newPerDay - todayActivity(courseId).newCards) + extraNew;
  const { queue } = buildQueue(cards, { newLimit: limit });
  const unseenLeft = cards.filter((c) => !c.seen).length;
  return { queue, unseenLeft, cards };
}

function dueTomorrow(cards) {
  const from = Date.now();
  const to = addDays(startOfDay(), 2);
  return cards.filter((c) => c.seen && c.due > from && c.due < to).length;
}

// ---------- elegir curso ----------

function chooser(root) {
  const courses = courseList().filter((c) => getSettings().courses.includes(c.id));
  const counts = courses.map((c) => ({ course: c, ...reviewCounts(c.id) }));
  const withWork = counts.filter((c) => c.total > 0);

  if (withWork.length === 1) {
    location.replace(`#/review/${withWork[0].course.id}`);
    return;
  }

  root.append(
    h('header', { class: 'page-head' }, h('h1', {}, 'Repaso')),
    withWork.length === 0
      ? emptyState(
          'No hay nada para repasar ahora',
          courses.length
            ? 'Las tarjetas aparecen cuando terminás la parte de vocabulario de una lección y cuando les toca volver.'
            : 'Primero elegí un curso desde Perfil.',
          h('a', { class: 'btn', href: courses.length ? '#/courses' : '#/me' }, courses.length ? 'Ir a los cursos' : 'Ir a Perfil'),
        )
      : h(
          'div',
          { class: 'stack' },
          withWork.map(({ course, total, due, fresh }) =>
            h(
              'a',
              { class: 'course-block link', href: `#/review/${course.id}`, dataset: { course: course.id } },
              h('h2', {}, course.name),
              h('p', {}, `${total} ${plural(total, 'tarjeta', 'tarjetas')}: ${due} para repasar y ${fresh} ${plural(fresh, 'nueva', 'nuevas')}.`),
            ),
          ),
        ),
  );
}

// ---------- sesión ----------

function session(root, courseId, extraNew = 0) {
  const course = getCourse(courseId);
  if (!course) {
    location.replace('#/review');
    return;
  }
  const lang = course.lang;
  const index = cardIndex(courseId);
  const { queue, unseenLeft, cards } = sessionCards(courseId, extraNew);
  let keyHandler = null;
  let shownAt = Date.now();

  root.dataset.lang = lang;
  root.dataset.course = courseId;

  currentStop = cleanupRoot;

  if (queue.length === 0) {
    root.append(backLink('#/', 'Inicio'), finished({ done: 0 }, cards, unseenLeft));
    return cleanupRoot;
  }

  const pending = [...queue];
  const stats = { done: 0, right: 0, again: 0 };

  function cleanupRoot() {
    if (keyHandler) document.removeEventListener('keydown', keyHandler);
    keyHandler = null;
    stopSpeaking();
    delete root.dataset.lang;
    delete root.dataset.course;
  }

  function setKeys(fn) {
    if (keyHandler) document.removeEventListener('keydown', keyHandler);
    keyHandler = fn;
    if (fn) document.addEventListener('keydown', fn);
  }

  function top() {
    const pct = Math.round((stats.done / (stats.done + pending.length)) * 100) || 0;
    return h(
      'div',
      { class: 'review-top' },
      backLink('#/', 'Salir'),
      h('p', { class: 'muted small' }, `Quedan ${pending.length}`),
      h('div', { class: 'ex-progress' }, h('span', { style: `width:${pct}%` })),
    );
  }

  function grade(card, g) {
    const wasNew = !card.seen;
    const updated = schedule(card, g);
    putCard(courseId, updated);
    const secs = Math.min(30, Math.round((Date.now() - shownAt) / 1000));
    logActivity(courseId, { reviews: 1, newCards: wasNew ? 1 : 0, secs });
    pending.shift();
    stats.done++;
    if (g === GRADE.AGAIN) {
      stats.again++;
      pending.push(updated);
    } else {
      stats.right++;
    }
    next();
  }

  function gradeButtons(card, allowed) {
    return h(
      'div',
      { class: 'grades' },
      allowed.map((g) =>
        h(
          'button',
          { class: `grade g${g}`, type: 'button', onclick: () => grade(card, g) },
          h('span', { class: 'grade-label' }, GRADE_LABEL[g]),
          h('span', { class: 'grade-next' }, previewLabel(card, g)),
          h('span', { class: 'sr' }, `(tecla ${g + 1})`),
        ),
      ),
    );
  }

  function answerBlock(info, ok = null) {
    return h(
      'div',
      { class: 'card-answer' },
      info.e ? h('p', { class: 'card-e', 'aria-hidden': 'true' }, info.e) : null,
      ok === false ? h('p', { class: 'pen big', lang }, info.t) : h('p', { class: 'card-term', lang }, info.t),
      h('p', { class: 'card-es' }, info.es),
      info.ex ? h('p', { class: 'card-ex' }, h('span', { lang }, info.ex), info.exEs ? h('span', { class: 'v-exes' }, ` ${info.exEs}`) : null) : null,
      speakButton(info.t, lang, { label: 'Escuchar' }),
    );
  }

  // Tarjeta de reconocimiento: ves la palabra y recordás qué significa.
  function recognition(card, info) {
    const frame = h('div', { class: 'card' });
    const reveal = h('button', { class: 'btn primary wide', type: 'button' }, 'Mostrar respuesta');
    frame.append(
      h('p', { class: 'card-hint muted small' }, 'Ya la viste. ¿Qué significa?'),
      info.e ? h('p', { class: 'card-e', 'aria-hidden': 'true' }, info.e) : null,
      h('p', { class: 'card-term', lang }, info.t),
      speakButton(info.t, lang, { label: 'Escuchar' }),
      reveal,
    );

    function show() {
      frame.replaceChildren(
        h('p', { class: 'card-term', lang }, info.t),
        h('p', { class: 'card-es' }, info.es),
        info.ex ? h('p', { class: 'card-ex' }, h('span', { lang }, info.ex), info.exEs ? h('span', { class: 'v-exes' }, ` ${info.exEs}`) : null) : null,
        speakButton(info.ex || info.t, lang, { label: info.ex ? 'Escuchar el ejemplo' : 'Escuchar' }),
        gradeButtons(card, [0, 1, 2, 3]),
      );
      setKeys((e) => {
        const n = Number(e.key) - 1;
        if (n >= 0 && n <= 3) grade(card, n);
      });
    }
    reveal.addEventListener('click', show);
    setKeys((e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        show();
      }
    });
    setTimeout(() => {
      if (frame.isConnected) speak(info.t, lang);
    }, 250);
    return frame;
  }

  // Tarjeta de producción: ves el significado y escribís la palabra.
  function production(card, info) {
    const frame = h('div', { class: 'card' });
    const input = h('input', {
      class: 'field',
      type: 'text',
      lang,
      autocomplete: 'off',
      autocapitalize: 'off',
      autocorrect: 'off',
      spellcheck: 'false',
      'aria-label': `Escribilo en ${LANG_NAME[lang]}`,
    });
    const check = h('button', { class: 'btn primary wide', type: 'button' }, 'Comprobar');

    function evaluate() {
      if (!input.value.trim()) return;
      const answers = [info.t, ...(info.alt || [])].map((a) => normalize(a));
      const ok = answers.includes(normalize(input.value));
      input.disabled = true;
      frame.replaceChildren(
        h('p', { class: 'card-hint muted small' }, ok ? 'Correcto.' : 'Para corregir'),
        answerBlock(info, ok),
        ok ? null : h('p', { class: 'muted small' }, `Pusiste: ${input.value}`),
        gradeButtons(card, ok ? [1, 2, 3] : [0]),
      );
      speak(info.t, lang);
      setKeys((e) => {
        if (ok) {
          const n = Number(e.key);
          if (n >= 1 && n <= 3) grade(card, n);
        } else if (e.key === 'Enter' || e.key === '1') {
          e.preventDefault();
          grade(card, GRADE.AGAIN);
        }
      });
    }

    check.addEventListener('click', evaluate);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.isComposing) {
        e.preventDefault();
        evaluate();
      }
    });
    frame.append(
      h('p', { class: 'card-hint muted small' }, `Escribilo en ${LANG_NAME[lang]}`),
      h('p', { class: 'card-es big' }, info.es),
      input,
      lang === 'ru' ? russianKeyboard(input) : null,
      check,
      h('button', { class: 'link-btn', type: 'button', onclick: giveUp }, 'No me acuerdo'),
    );

    function giveUp() {
      input.disabled = true;
      frame.replaceChildren(h('p', { class: 'card-hint muted small' }, 'Para corregir'), answerBlock(info, false), gradeButtons(card, [0]));
      speak(info.t, lang);
      setKeys((e) => {
        if (e.key === 'Enter' || e.key === '1') {
          e.preventDefault();
          grade(card, GRADE.AGAIN);
        }
      });
    }

    setKeys(null);
    setTimeout(() => input.focus(), 0);
    return frame;
  }

  function next() {
    setKeys(null);
    if (pending.length === 0) {
      const after = sessionCards(courseId);
      root.replaceChildren(finished(stats, after.cards, after.unseenLeft));
      return;
    }
    const card = pending[0];
    const info = index.get(card.id);
    shownAt = Date.now();
    const typeIt = card.seen && card.reps % 2 === 1;
    root.replaceChildren(top(), h('div', { class: 'review' }, typeIt ? production(card, info) : recognition(card, info)));
  }

  function finished(s, allCardsNow, left) {
    const pct = s.done ? Math.round((s.right / s.done) * 100) : 0;
    const tomorrow = dueTomorrow(allCardsNow);
    return h(
      'div',
      { class: 'review-done' },
      h('h1', {}, s.done ? 'Repaso terminado' : 'Nada para repasar ahora'),
      s.done
        ? h('p', {}, `Repasaste ${s.done} ${plural(s.done, 'tarjeta', 'tarjetas')} y ${pct} % salió bien al primer intento.`)
        : h('p', {}, 'Volvé más tarde: las tarjetas reaparecen justo antes de que se te olviden.'),
      tomorrow > 0 ? h('p', { class: 'muted' }, `Para mañana ya hay ${tomorrow} ${plural(tomorrow, 'tarjeta', 'tarjetas')}.`) : null,
      h(
        'div',
        { class: 'lesson-controls' },
        h('a', { class: 'btn primary', href: '#/' }, 'Volver al inicio'),
        left > 0
          ? h('button', { class: 'btn', type: 'button', onclick: () => { cleanupRoot(); root.replaceChildren(); session(root, courseId, 5); } }, `Sumar ${Math.min(5, left)} ${plural(Math.min(5, left), 'tarjeta nueva', 'tarjetas nuevas')}`)
          : null,
      ),
    );
  }

  next();
  return cleanupRoot;
}

export default function reviewView(root, courseId) {
  if (!courseId) return chooser(root);
  session(root, courseId);
  // La sesión puede reiniciarse sola ("sumar tarjetas nuevas"), así que siempre se limpia la última.
  return () => {
    currentStop?.();
    currentStop = null;
  };
}
