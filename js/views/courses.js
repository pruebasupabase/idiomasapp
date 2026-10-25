// Lista de cursos: los que estás cursando y los que podrías sumar.

import { h } from '../util.js';
import { getSettings, updateSettings } from '../store.js';
import { courseList } from '../content/index.js';
import { courseProgress } from '../progress.js';
import { progressBar, icon } from '../ui.js';

export default function coursesView(root) {
  function draw() {
    const enabled = getSettings().courses;
    root.replaceChildren(
      h('header', { class: 'page-head' }, h('h1', {}, 'Cursos')),
      h(
        'div',
        { class: 'stack' },
        courseList().map((course) => {
          const on = enabled.includes(course.id);
          const progress = courseProgress(course.id);
          return h(
            'section',
            { class: `course-block${on ? '' : ' off'}`, dataset: { course: course.id } },
            h(
              'div',
              { class: 'course-block-head' },
              h('h2', {}, on ? h('a', { href: `#/course/${course.id}` }, course.name) : course.name),
              h('span', { class: 'level' }, course.level),
            ),
            h('p', { class: 'native', lang: course.lang }, course.native),
            h('p', {}, course.blurb),
            on ? [progressBar(progress.pct), h('p', { class: 'muted small' }, `${progress.done} de ${progress.total} lecciones aprobadas`)] : null,
            h(
              'div',
              { class: 'actions' },
              on
                ? h('a', { class: 'btn primary', href: `#/course/${course.id}` }, 'Abrir el curso')
                : h(
                    'button',
                    {
                      class: 'btn',
                      type: 'button',
                      onclick: () => {
                        updateSettings({ courses: [...enabled, course.id] });
                        draw();
                      },
                    },
                    icon('plus'),
                    h('span', {}, 'Sumar este curso'),
                  ),
            ),
          );
        }),
      ),
    );
  }
  draw();
}
