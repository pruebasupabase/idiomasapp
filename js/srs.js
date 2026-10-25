// Repetición espaciada (variante de SM-2 con cuatro notas).
//
// Una tarjeta guarda: ease (facilidad), interval (días), reps (aciertos seguidos),
// lapses (olvidos), due (cuándo vence, en ms), seen (si ya se repasó alguna vez).

import { shuffle, addDays, startOfDay } from './util.js';

export const GRADE = { AGAIN: 0, HARD: 1, GOOD: 2, EASY: 3 };
export const GRADE_LABEL = ['Otra vez', 'Difícil', 'Bien', 'Fácil'];

const TEN_MIN = 10 * 60 * 1000;

export function newCard(id, now = Date.now()) {
  return { id, ease: 2.5, interval: 0, reps: 0, lapses: 0, due: now, seen: false, last: 0, u: now };
}

// Devuelve la tarjeta actualizada después de calificarla. No modifica la original.
export function schedule(card, grade, now = Date.now()) {
  let { ease, interval, reps, lapses } = card;
  let due;

  if (grade === GRADE.AGAIN) {
    lapses += 1;
    reps = 0;
    interval = 0;
    ease = Math.max(1.3, ease - 0.2);
    due = now + TEN_MIN;
  } else {
    if (reps === 0) interval = [0, 1, 1, 3][grade];
    else if (reps === 1) interval = [0, 3, 6, 8][grade];
    else {
      const factor = grade === GRADE.HARD ? 1.2 : grade === GRADE.GOOD ? ease : ease * 1.3;
      interval = Math.max(interval + 1, Math.round(interval * factor));
    }
    ease = Math.max(1.3, ease + [0, -0.15, 0, 0.15][grade]);
    reps += 1;
    due = addDays(startOfDay(now), interval);
  }

  return { ...card, ease, interval, reps, lapses, due, seen: true, last: now, u: now };
}

// Texto corto para los botones: "10 min", "1 día", "6 días", "2 meses".
export function previewLabel(card, grade, now = Date.now()) {
  const next = schedule(card, grade, now);
  if (grade === GRADE.AGAIN) return '10 min';
  const d = next.interval;
  if (d < 30) return d === 1 ? '1 día' : `${d} días`;
  const months = Math.round(d / 30);
  return months === 1 ? '1 mes' : `${months} meses`;
}

export const isDue = (card, now = Date.now()) => card.seen && card.due <= now;

// Arma la cola de una sesión: primero los repasos vencidos (mezclados) y después las nuevas.
export function buildQueue(cards, { newLimit = 10, now = Date.now() } = {}) {
  const due = shuffle(cards.filter((c) => isDue(c, now)));
  const fresh = cards.filter((c) => !c.seen).slice(0, Math.max(0, newLimit));
  return { due, fresh, queue: [...due, ...fresh] };
}

// "Madura" = ya la sabés bien (intervalo de 21 días o más).
export const isMature = (card) => card.seen && card.interval >= 21;
