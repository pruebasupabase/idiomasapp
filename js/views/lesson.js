// Una lección: teoría, diálogo, vocabulario, práctica y resultado.

import { h, $$, toast, plural } from '../util.js';
import { findLesson, getCourse, cardsOfLesson } from '../content/index.js';
import { isUnlocked, reviewCounts } from '../progress.js';
import { ensureCards, saveLessonResult, logActivity } from '../store.js';
import { runExercises, cancelExercises } from '../exercises.js';
import { speak, stopSpeaking } from '../speech.js';
import { speakButton, icon, backLink } from '../ui.js';

function describeItem(item) {
  if (item.type === 'match') return 'Emparejar palabras';
  if (item.type === 'speak') return item.text;
  if (item.type === 'listen') return 'Dictado';
  return item.q || '';
}

function makeSayButtons(container) {
  for (const el of $$('.say', container)) {
    el.tabIndex = 0;
    el.setAttribute('role', 'button');
    el.setAttribute('title', 'Tocá para escuchar');
  }
}

export default function lessonView(root, courseId, lessonId) {
  const course = getCourse(courseId);
  const found = findLesson(courseId, lessonId);
  if (!course || !found) {
    location.replace('#/courses');
    return;
  }
  if (!isUnlocked(courseId, lessonId)) {
    toast('Primero aprobá la lección anterior.');
    location.replace(`#/course/${courseId}`);
    return;
  }

  const { lesson, next } = found;
  const lang = course.lang;
  root.dataset.lang = lang;
  root.dataset.course = courseId;

  const steps = [
    { id: 'theory', label: 'Teoría' },
    lesson.dialogue?.length ? { id: 'dialogue', label: 'Diálogo' } : null,
    lesson.vocab?.length ? { id: 'vocab', label: 'Vocabulario' } : null,
    { id: 'practice', label: 'Práctica' },
    { id: 'result', label: 'Resultado' },
  ].filter(Boolean);

  let current = 0;
  let outcome = null;
  let dialogueToken = 0;
  const openedAt = Date.now();

  const headerBox = h('div', { class: 'lesson-head' });
  const bodyBox = h('div', { class: 'lesson-body' });
  root.append(headerBox, bodyBox);

  const stepId = () => steps[current].id;
  const indexOf = (id) => steps.findIndex((s) => s.id === id);

  function go(i) {
    dialogueToken++;
    stopSpeaking();
    cancelExercises();
    current = i;
    drawHeader();
    drawBody();
    window.scrollTo(0, 0);
  }

  // ---------- encabezado ----------

  function drawHeader() {
    const canJump = (i) => i < current && !['practice', 'result'].includes(stepId()) && !['practice', 'result'].includes(steps[i].id);
    headerBox.replaceChildren(
      backLink(`#/course/${courseId}`, course.name),
      h('h1', {}, lesson.title),
      h('p', { class: 'muted small' }, `${lesson.level} · unos ${lesson.minutes} minutos`),
      h(
        'ol',
        { class: 'stepper' },
        steps.map((s, i) =>
          h(
            'li',
            { class: i === current ? 'current' : i < current ? 'past' : '', 'aria-current': i === current ? 'step' : null },
            canJump(i) ? h('button', { type: 'button', onclick: () => go(i) }, s.label) : h('span', {}, s.label),
          ),
        ),
      ),
    );
  }

  const controls = (...nodes) => h('div', { class: 'lesson-controls' }, nodes);
  const nextButton = (label, onclick) => h('button', { class: 'btn primary', type: 'button', onclick }, label);
  const prevButton = () =>
    current > 0 ? h('button', { class: 'btn ghost', type: 'button', onclick: () => go(current - 1) }, 'Atrás') : null;

  // ---------- pasos ----------

  function drawTheory() {
    const article = h('article', { class: 'prose', html: lesson.theory });
    makeSayButtons(article);
    bodyBox.replaceChildren(
      lesson.goal ? h('p', { class: 'goal' }, h('strong', {}, 'Objetivo: '), lesson.goal) : null,
      article,
      controls(prevButton(), nextButton('Continuar', () => go(current + 1))),
    );
  }

  function drawDialogue() {
    let showTranslation = false;
    const rows = lesson.dialogue.map((line) =>
      h(
        'li',
        { class: 'dlg-line' },
        h('span', { class: 'dlg-who' }, line.who),
        h('div', { class: 'dlg-text' }, h('p', { class: 'dlg-t', lang }, line.t), h('p', { class: 'dlg-es', hidden: true }, line.es)),
        speakButton(line.t, lang),
      ),
    );

    const toggle = h('button', {
      class: 'btn ghost',
      type: 'button',
      'aria-pressed': 'false',
      onclick: () => {
        showTranslation = !showTranslation;
        toggle.setAttribute('aria-pressed', String(showTranslation));
        toggle.textContent = showTranslation ? 'Ocultar traducción' : 'Mostrar traducción';
        $$('.dlg-es', bodyBox).forEach((p) => (p.hidden = !showTranslation));
      },
    }, 'Mostrar traducción');

    const playAll = h('button', { class: 'btn', type: 'button' }, icon('speaker'), h('span', {}, 'Escuchar todo'));
    playAll.addEventListener('click', async () => {
      const token = ++dialogueToken;
      for (let i = 0; i < lesson.dialogue.length; i++) {
        if (token !== dialogueToken) return;
        rows[i].classList.add('playing');
        await speak(lesson.dialogue[i].t, lang);
        rows[i].classList.remove('playing');
      }
    });

    bodyBox.replaceChildren(
      h('p', { class: 'muted' }, 'Escuchá el diálogo primero sin mirar la traducción. Después leelo en voz alta.'),
      h('div', { class: 'dlg-tools' }, playAll, toggle),
      h('ul', { class: 'dlg' }, rows),
      controls(prevButton(), nextButton('Continuar', () => go(current + 1))),
    );
  }

  function drawVocab() {
    let veiled = false;
    const rows = lesson.vocab.map((v) => {
      const es = h('span', { class: 'v-es' }, v.es);
      es.addEventListener('click', () => es.classList.toggle('shown'));
      return h(
        'li',
        { class: 'v-row' },
        speakButton(v.t, lang),
        h(
          'div',
          { class: 'v-main' },
          h('span', { class: 'v-t', lang }, v.t),
          es,
          v.ex
            ? h('p', { class: 'v-ex' }, h('span', { lang }, v.ex), v.exEs ? h('span', { class: 'v-exes' }, ` ${v.exEs}`) : null)
            : null,
        ),
      );
    });

    const list = h('ul', { class: 'vocab' }, rows);
    const toggle = h('button', {
      class: 'btn ghost',
      type: 'button',
      'aria-pressed': 'false',
      onclick: () => {
        veiled = !veiled;
        toggle.setAttribute('aria-pressed', String(veiled));
        toggle.textContent = veiled ? 'Mostrar traducciones' : 'Taparlas para autoevaluarme';
        list.classList.toggle('veiled', veiled);
        $$('.v-es', list).forEach((el) => el.classList.remove('shown'));
      },
    }, 'Taparlas para autoevaluarme');

    bodyBox.replaceChildren(
      h('p', { class: 'muted' }, `${lesson.vocab.length} palabras y frases. Al seguir, pasan a tus tarjetas de repaso.`),
      h('div', { class: 'dlg-tools' }, toggle),
      list,
      controls(
        prevButton(),
        nextButton('Ir a la práctica', () => {
          ensureCards(courseId, cardsOfLesson(lesson).map((c) => c.id));
          go(current + 1);
        }),
      ),
    );
  }

  async function drawPractice() {
    // Si salteó el vocabulario (lecciones sin lista), igual no hay tarjetas que crear.
    const stage = h('div', { class: 'practice' });
    bodyBox.replaceChildren(stage);
    const result = await runExercises(stage, lesson.exercises, {
      lang,
      onItem: (ok) => logActivity(courseId, { exercises: 1, correct: ok ? 1 : 0 }),
    });
    outcome = result;
    saveLessonResult(courseId, lessonId, result.score);
    logActivity(courseId, { secs: Math.min(result.secs, 40 * 60) });
    go(indexOf('result'));
  }

  function drawResult() {
    const { score, correct, total, results } = outcome;
    const passed = score >= 70;
    const mistakes = results.filter((r) => !r.ok);
    const due = reviewCounts(courseId).total;

    const headline = score >= 90 ? 'Excelente.' : passed ? 'Lección aprobada.' : 'Todavía no alcanza.';
    const detail = passed
      ? mistakes.length
        ? 'Mirá los errores de abajo antes de seguir: es lo que más te va a servir.'
        : 'No te equivocaste en nada.'
      : 'Necesitás 70 % para pasar. Releé la teoría y probá de nuevo; no hay límite de intentos.';

    bodyBox.replaceChildren(
      h(
        'div',
        { class: `result${passed ? ' passed' : ''}` },
        h('div', { class: 'stamp', role: 'img', 'aria-label': `${correct} de ${total}, ${score} por ciento` }, h('span', { class: 'stamp-num' }, `${correct}/${total}`), h('span', { class: 'stamp-pct' }, `${score} %`)),
        h('div', { class: 'result-text' }, h('h2', {}, headline), h('p', {}, detail)),
      ),
      mistakes.length
        ? h(
            'section',
            { class: 'mistakes' },
            h('h3', {}, 'Para repasar'),
            h(
              'ul',
              {},
              mistakes.map((m) =>
                h(
                  'li',
                  {},
                  h('span', { class: 'm-q' }, describeItem(m.item)),
                  m.expected ? h('span', { class: 'm-a' }, h('span', { class: 'pen' }, m.expected)) : null,
                ),
              ),
            ),
          )
        : null,
      due > 0
        ? h('p', { class: 'muted' }, `Tenés ${due} ${plural(due, 'tarjeta', 'tarjetas')} para repasar hoy.`)
        : null,
      controls(
        passed && next
          ? h('a', { class: 'btn primary', href: `#/lesson/${courseId}/${next.id}` }, 'Siguiente lección')
          : passed
            ? h('a', { class: 'btn primary', href: `#/course/${courseId}` }, 'Volver al curso')
            : nextButton('Repetir la práctica', () => go(indexOf('practice'))),
        passed ? h('button', { class: 'btn', type: 'button', onclick: () => go(indexOf('practice')) }, 'Practicar de nuevo') : h('button', { class: 'btn', type: 'button', onclick: () => go(0) }, 'Releer la teoría'),
        due > 0 ? h('a', { class: 'btn ghost', href: `#/review/${courseId}` }, 'Repasar tarjetas') : null,
        passed && next ? h('a', { class: 'btn ghost', href: `#/course/${courseId}` }, 'Volver al curso') : null,
      ),
    );
  }

  function drawBody() {
    switch (stepId()) {
      case 'theory':
        return drawTheory();
      case 'dialogue':
        return drawDialogue();
      case 'vocab':
        return drawVocab();
      case 'practice':
        return drawPractice();
      case 'result':
        return drawResult();
      default:
        return undefined;
    }
  }

  drawHeader();
  drawBody();

  return () => {
    dialogueToken++;
    cancelExercises();
    stopSpeaking();
    // Si estudió teoría pero no llegó a la práctica, igual cuenta el tiempo.
    if (!outcome) logActivity(courseId, { secs: Math.min(Math.round((Date.now() - openedAt) / 1000), 40 * 60) });
    delete root.dataset.lang;
    delete root.dataset.course;
  };
}
