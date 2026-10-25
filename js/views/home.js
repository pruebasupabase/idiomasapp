// Inicio: qué toca hoy en cada curso.

import { h, plural } from '../util.js';
import { getUser, getSettings, streak, lastDays, todayActivity, totalXp } from '../store.js';
import { courseList, findLesson } from '../content/index.js';
import { courseProgress, nextLesson, reviewCounts } from '../progress.js';
import { progressBar, emptyState } from '../ui.js';

const WEEKDAY = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

function courseBlock(course) {
  const progress = courseProgress(course.id);
  const next = nextLesson(course.id);
  const counts = reviewCounts(course.id);
  const found = next ? findLesson(course.id, next.id) : null;

  const actions = [];
  if (next) {
    actions.push(
      h(
        'a',
        { class: 'btn primary', href: `#/lesson/${course.id}/${next.id}` },
        progress.done === 0 ? 'Empezar el curso' : 'Seguir con la lección',
      ),
    );
  } else {
    actions.push(h('a', { class: 'btn', href: `#/course/${course.id}` }, 'Ver el curso'));
  }
  if (counts.total > 0) {
    actions.push(
      h('a', { class: 'btn', href: `#/review/${course.id}` }, `Repasar ${counts.total} ${plural(counts.total, 'tarjeta', 'tarjetas')}`),
    );
  }

  return h(
    'section',
    { class: 'course-block', dataset: { course: course.id } },
    h(
      'div',
      { class: 'course-block-head' },
      h('h2', {}, h('a', { href: `#/course/${course.id}` }, course.name)),
      h('span', { class: 'level' }, course.level),
    ),
    progressBar(progress.pct, `Avance en ${course.name}`),
    h('p', { class: 'muted small' }, `${progress.done} de ${progress.total} lecciones aprobadas`),
    next
      ? h('p', { class: 'next-lesson' }, h('span', { class: 'muted' }, 'Sigue: '), found.lesson.title)
      : h('p', { class: 'next-lesson' }, 'Aprobaste todas las lecciones. Seguí repasando para que no se te olvide.'),
    counts.total === 0 && progress.done > 0
      ? h('p', { class: 'muted small' }, 'No hay tarjetas para repasar ahora.')
      : null,
    h('div', { class: 'actions' }, actions),
  );
}

export default function homeView(root) {
  const user = getUser();
  const settings = getSettings();
  const courses = courseList().filter((c) => settings.courses.includes(c.id));
  const now = new Date();
  const dateText = new Intl.DateTimeFormat('es-AR', { weekday: 'long', day: 'numeric', month: 'long' }).format(now);
  const days = streak();
  const week = lastDays(7);
  const maxTotal = Math.max(1, ...week.map((d) => d.total));

  const today = courses.reduce(
    (sum, c) => {
      const a = todayActivity(c.id);
      return { reviews: sum.reviews + a.reviews, exercises: sum.exercises + a.exercises };
    },
    { reviews: 0, exercises: 0 },
  );

  const chart = h(
    'div',
    { class: 'week', role: 'img', 'aria-label': `Actividad de los últimos 7 días: ${week.map((d) => d.total).join(', ')}` },
    week.map((d, i) =>
      h(
        'div',
        { class: `week-day${i === week.length - 1 ? ' today' : ''}` },
        h('div', { class: 'week-bar' }, h('span', { style: `height:${Math.round((d.total / maxTotal) * 100)}%` })),
        h('span', { class: 'week-label' }, WEEKDAY[d.date.getDay()]),
      ),
    ),
  );

  root.append(
    h(
      'header',
      { class: 'page-head' },
      h('p', { class: 'muted small date' }, dateText),
      h('h1', {}, `Hola, ${user.name}`),
      h(
        'p',
        { class: 'streak' },
        days > 0 ? h('span', { class: 'flame', 'aria-hidden': 'true' }, '🔥 ') : null,
        days > 0
          ? `${days} ${plural(days, 'día seguido', 'días seguidos')} estudiando.`
          : 'Hoy es un buen día para empezar la racha.',
        totalXp() > 0 ? h('span', { class: 'xp-total' }, ` ⭐ ${totalXp()} puntos`) : null,
      ),
    ),
    courses.length
      ? h('div', { class: 'stack' }, courses.map(courseBlock))
      : emptyState('Todavía no elegiste ningún curso', 'Elegí qué querés estudiar desde Perfil.', h('a', { class: 'btn primary', href: '#/me' }, 'Ir a Perfil')),
    courses.length
      ? h(
          'section',
          { class: 'week-section' },
          h('h2', { class: 'section-title' }, 'Esta semana'),
          chart,
          h('p', { class: 'muted small' }, `Hoy: ${today.reviews} ${plural(today.reviews, 'tarjeta repasada', 'tarjetas repasadas')} y ${today.exercises} ${plural(today.exercises, 'ejercicio', 'ejercicios')}.`),
        )
      : null,
  );
}
