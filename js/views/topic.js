// Una sesión corta de un tema: palabras con audio y dibujos, ejercicios, puntos y vidas.

import { h, plural } from '../util.js';
import { cardsOfLesson } from '../content/index.js';
import { buildSession } from '../builder.js';
import { runExercises, cancelExercises } from '../exercises.js';
import { ensureCards, saveLessonResult, logActivity, getSettings } from '../store.js';
import { reviewCounts } from '../progress.js';
import { stopSpeaking } from '../speech.js';
import * as sfx from '../sfx.js';
import { confetti, floatText } from '../fx.js';

const MAX_HEARTS = 5;
const XP_RIGHT = 10;
const XP_STREAK_BONUS = 5; // desde la tercera seguida

export default function topicView(root, course, found) {
  const { lesson, next } = found;
  const courseId = course.id;
  const lang = course.lang;
  const duo = getSettings().mode === 'duo';

  root.dataset.lang = lang;
  root.dataset.course = courseId;

  let hearts = MAX_HEARTS;
  let xp = 0;
  let combo = 0;
  let alive = true;
  let startedAt = Date.now();

  const heartsBox = duo ? h('div', { class: 'hearts' }) : null;
  const xpNum = h('span', { class: 'xp-num' }, '0');
  const comboBox = h('span', { class: 'combo', hidden: true });
  const bar = h(
    'header',
    { class: 'topic-bar' },
    h('a', { class: 'topic-x', href: `#/course/${courseId}`, 'aria-label': 'Salir de la lección' }, '✕'),
    h('p', { class: 'topic-title' }, h('span', { 'aria-hidden': 'true' }, `${lesson.emoji} `), lesson.stage),
    h('div', { class: 'topic-stats' }, heartsBox, comboBox, h('span', { class: 'xp-chip', title: 'Puntos de esta lección' }, h('span', { 'aria-hidden': 'true' }, '⭐ '), xpNum)),
  );
  const stage = h('div', { class: 'topic-stage' });
  root.append(h('div', { class: 'topic' }, bar, stage));

  function drawStats(lostHeart = false) {
    xpNum.textContent = String(xp);
    if (combo >= 3) {
      comboBox.hidden = false;
      comboBox.textContent = `🔥 ${combo}`;
    } else {
      comboBox.hidden = true;
    }
    if (heartsBox) {
      heartsBox.setAttribute('aria-label', `${hearts} ${plural(hearts, 'vida', 'vidas')}`);
      heartsBox.replaceChildren(
        ...Array.from({ length: MAX_HEARTS }, (_, i) =>
          h('span', { class: `heart${i >= hearts ? ' lost' : ''}${lostHeart && i === hearts ? ' just-lost' : ''}`, 'aria-hidden': 'true' }, i < hearts ? '❤️' : '🖤'),
        ),
      );
    }
  }

  function onAnswer(res, { sheet }) {
    if (res.ok) {
      combo++;
      const gain = XP_RIGHT + (combo >= 3 ? XP_STREAK_BONUS : 0);
      xp += gain;
      floatText(`+${gain}`, sheet, 'gain');
      if (combo === 3 || combo === 6 || combo === 10) setTimeout(() => sfx.play('combo'), 260);
      drawStats();
    } else {
      combo = 0;
      if (duo) hearts = Math.max(0, hearts - 1);
      drawStats(true);
    }
  }

  async function start() {
    hearts = MAX_HEARTS;
    xp = 0;
    combo = 0;
    startedAt = Date.now();
    drawStats();
    const result = await runExercises(stage, buildSession(lesson), {
      lang,
      onItem: (ok) => logActivity(courseId, { exercises: 1, correct: ok ? 1 : 0 }),
      onAnswer,
      shouldStop: () => duo && hearts <= 0,
    });
    if (!alive) return;
    logActivity(courseId, { secs: Math.min(result.secs, 40 * 60) });
    if (result.stopped) return drawNoHearts();
    ensureCards(courseId, cardsOfLesson(lesson).map((c) => c.id));
    saveLessonResult(courseId, lesson.id, result.score);
    drawResult(result);
  }

  // ---------- pantallas finales ----------

  const button = (label, onclick, cls = 'btn') => h('button', { class: cls, type: 'button', onclick }, label);

  function drawNoHearts() {
    sfx.play('fail');
    stage.replaceChildren(
      h(
        'div',
        { class: 'finish sad' },
        h('div', { class: 'finish-e', 'aria-hidden': 'true' }, '💔'),
        h('h2', {}, 'Te quedaste sin vidas'),
        h('p', {}, 'No pasa nada: repetir es parte de aprender. Probá de nuevo con calma.'),
        h('div', { class: 'lesson-controls' }, button('Intentar de nuevo', start, 'btn primary'), h('a', { class: 'btn ghost', href: `#/course/${courseId}` }, 'Volver al mapa')),
      ),
    );
  }

  function drawResult(result) {
    const passed = result.score >= 70;
    const mistakes = result.results.filter((r) => !r.ok);
    const due = reviewCounts(courseId).total;
    const mins = Math.max(1, Math.round((Date.now() - startedAt) / 60000));
    const bonus = mistakes.length === 0 ? 20 : 0;
    xp += bonus;
    drawStats();

    if (passed) {
      sfx.play('done');
      confetti();
    } else {
      sfx.play('fail');
    }

    const learned = lesson.vocab.filter((v) => v.e).length || lesson.vocab.length;
    stage.replaceChildren(
      h(
        'div',
        { class: `finish${passed ? ' passed' : ''}` },
        h('div', { class: 'finish-e', 'aria-hidden': 'true' }, passed ? (mistakes.length ? '🎉' : '🏆') : '💪'),
        h('h2', {}, passed ? (mistakes.length ? '¡Lección completa!' : '¡Perfecto!') : 'Casi. Necesitás 70 %'),
        h(
          'ul',
          { class: 'finish-stats' },
          h('li', { class: 'stat xp' }, h('strong', {}, `+${xp}`), h('span', {}, 'puntos')),
          h('li', { class: 'stat acc' }, h('strong', {}, `${result.score} %`), h('span', {}, 'aciertos')),
          h('li', { class: 'stat time' }, h('strong', {}, `${mins} min`), h('span', {}, 'de práctica')),
        ),
        bonus ? h('p', { class: 'finish-note' }, '+20 de bonus por no equivocarte en nada.') : null,
        lesson.vocab.length
          ? h(
              'section',
              { class: 'learned' },
              h('h3', {}, `${learned} ${plural(learned, 'palabra nueva', 'palabras nuevas')} para tu repaso`),
              h(
                'ul',
                { class: 'learned-list' },
                lesson.vocab.map((v) => h('li', { lang }, v.e ? `${v.e} ` : '', v.t)),
              ),
            )
          : null,
        mistakes.length
          ? h(
              'section',
              { class: 'mistakes' },
              h('h3', {}, 'Para repasar'),
              h(
                'ul',
                {},
                mistakes.map((m) => h('li', {}, h('span', { class: 'm-q' }, m.item.q || m.item.text || m.item.audio || 'Emparejar'), m.expected ? h('span', { class: 'm-a' }, h('span', { class: 'pen' }, m.expected)) : null)),
              ),
            )
          : null,
        h(
          'div',
          { class: 'lesson-controls' },
          passed && next
            ? h('a', { class: 'btn primary', href: `#/lesson/${courseId}/${next.id}` }, 'Seguir')
            : passed
              ? h('a', { class: 'btn primary', href: `#/course/${courseId}` }, 'Volver al mapa')
              : button('Repetir', start, 'btn primary'),
          passed ? button('Practicar de nuevo', start) : h('a', { class: 'btn', href: `#/course/${courseId}` }, 'Volver al mapa'),
          due > 0 ? h('a', { class: 'btn ghost', href: `#/review/${courseId}` }, `Repasar ${due} ${plural(due, 'tarjeta', 'tarjetas')}`) : null,
        ),
      ),
    );
    window.scrollTo(0, 0);
  }

  start();

  return () => {
    alive = false;
    cancelExercises();
    stopSpeaking();
    delete root.dataset.lang;
    delete root.dataset.course;
  };
}
