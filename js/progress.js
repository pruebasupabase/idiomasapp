// Preguntas sobre el avance: qué lección sigue, qué está bloqueado, cuántas tarjetas vencen.

import { lessonsOf, cardIndex } from './content/index.js';
import { getLessonProgress, getSettings, allCards, todayActivity } from './store.js';
import { buildQueue } from './srs.js';

export const isDone = (courseId, lessonId) => !!getLessonProgress(courseId, lessonId)?.done;

export function isUnlocked(courseId, lessonId) {
  if (getSettings().freeMode) return true;
  const all = lessonsOf(courseId);
  const i = all.findIndex((x) => x.lesson.id === lessonId);
  if (i <= 0) return true;
  return isDone(courseId, all[i - 1].lesson.id);
}

export function courseProgress(courseId) {
  const all = lessonsOf(courseId);
  const done = all.filter((x) => isDone(courseId, x.lesson.id)).length;
  return { done, total: all.length, pct: all.length ? Math.round((done / all.length) * 100) : 0 };
}

// La primera lección que todavía no está aprobada (o null si terminó el curso).
export function nextLesson(courseId) {
  const all = lessonsOf(courseId);
  return all.find((x) => !isDone(courseId, x.lesson.id))?.lesson || null;
}

// Tarjetas de repaso de hoy: vencidas + nuevas que entran en el cupo diario.
export function reviewCounts(courseId) {
  const index = cardIndex(courseId);
  const cards = allCards(courseId).filter((c) => index.has(c.id));
  const introducedToday = todayActivity(courseId).newCards;
  const newLimit = Math.max(0, getSettings().newPerDay - introducedToday);
  const { due, fresh } = buildQueue(cards, { newLimit });
  return { due: due.length, fresh: fresh.length, total: due.length + fresh.length };
}
