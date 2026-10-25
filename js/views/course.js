// Un curso: unidades y lecciones, con el estado de cada una.

import { h } from '../util.js';
import { getCourse } from '../content/index.js';
import { getLessonProgress } from '../store.js';
import { courseProgress, isDone, isUnlocked } from '../progress.js';
import { progressBar, icon, backLink, emptyState } from '../ui.js';

function lessonRow(course, lesson, number) {
  const unlocked = isUnlocked(course.id, lesson.id);
  const done = isDone(course.id, lesson.id);
  const progress = getLessonProgress(course.id, lesson.id);

  const status = done
    ? h('span', { class: 'status done' }, icon('check'), h('span', {}, `${progress.best} %`))
    : !unlocked
      ? h('span', { class: 'status locked' }, icon('lock'), h('span', { class: 'sr' }, 'Bloqueada'))
      : progress
        ? h('span', { class: 'status tried' }, `${progress.best} %`)
        : null;

  const body = [
    h('span', { class: 'lesson-num', 'aria-hidden': 'true' }, String(number)),
    h(
      'span',
      { class: 'lesson-info' },
      h('span', { class: 'lesson-title' }, lesson.title),
      h('span', { class: 'lesson-meta' }, `${lesson.level} · ${lesson.minutes} min`),
    ),
    status,
  ];

  return unlocked
    ? h('a', { class: `lesson-row${done ? ' done' : ''}`, href: `#/lesson/${course.id}/${lesson.id}` }, body)
    : h('div', { class: 'lesson-row locked', 'aria-disabled': 'true' }, body);
}

export default function courseView(root, courseId) {
  const course = getCourse(courseId);
  if (!course) {
    root.append(emptyState('No encontramos ese curso', 'Volvé a la lista de cursos.', h('a', { class: 'btn', href: '#/courses' }, 'Ver cursos')));
    return;
  }
  const progress = courseProgress(course.id);
  let number = 0;

  root.dataset.course = course.id;
  root.append(
    backLink('#/courses', 'Cursos'),
    h(
      'header',
      { class: 'page-head' },
      h('h1', {}, course.name),
      h('p', { class: 'muted' }, `${course.level} · ${progress.done} de ${progress.total} lecciones aprobadas`),
      progressBar(progress.pct, `Avance en ${course.name}`),
      h('p', { class: 'muted small' }, 'Cada lección se aprueba con 70 % o más. La siguiente se abre al aprobar la anterior.'),
    ),
    course.tools.length
      ? h(
          'section',
          { class: 'tools' },
          course.tools.map((tool) =>
            h('a', { class: 'tool', href: tool.href }, h('strong', {}, tool.title), h('span', {}, tool.text)),
          ),
        )
      : null,
    course.units.map((unit) =>
      h(
        'section',
        { class: 'unit' },
        h('h2', {}, unit.title),
        h('p', { class: 'muted small' }, unit.blurb),
        h('div', { class: 'lesson-list' }, unit.lessons.map((lesson) => lessonRow(course, lesson, ++number))),
      ),
    ),
  );

  return () => delete root.dataset.course;
}
