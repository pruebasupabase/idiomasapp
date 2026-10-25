// Pruebas de la lógica pura (texto y repetición espaciada). Sin dependencias.
// Uso: node scripts/test-logic.mjs

import assert from 'node:assert/strict';
import { normalize, stripStress, levenshtein, similarity, slug, plural, shuffle, dayKey, addDays, startOfDay } from '../js/util.js';
import { GRADE, newCard, schedule, isDue, buildQueue, isMature, previewLabel } from '../js/srs.js';

let passed = 0;
const failures = [];

function test(name, fn) {
  try {
    fn();
    passed += 1;
  } catch (err) {
    failures.push(`${name}\n    ${err.message.split('\n').join('\n    ')}`);
  }
}

const DAY = 24 * 60 * 60 * 1000;

// ---------- texto ----------

test('stripStress saca los acentos tónicos', () => {
  assert.equal(stripStress('мо́ре'), 'море');
  assert.equal(stripStress('Здра́вствуйте'), 'Здравствуйте');
});

test('normalize ignora mayúsculas, puntuación y acento tónico', () => {
  assert.equal(normalize('Как дела́?'), 'как дела');
  assert.equal(normalize('  Hello,   World! '), 'hello world');
  assert.equal(normalize('¿Cómo estás?'), 'cómo estás');
});

test('normalize trata ё como е', () => {
  assert.equal(normalize('живёт'), normalize('живет'));
  assert.equal(normalize('Всё хорошо́'), normalize('все хорошо'));
});

test('normalize unifica apóstrofos tipográficos', () => {
  assert.equal(normalize('I’m tired'), normalize("I'm tired"));
});

test('normalize no confunde palabras distintas', () => {
  assert.notEqual(normalize('книга'), normalize('книги'));
  assert.notEqual(normalize('I am'), normalize("I'm"));
});

test('normalize loose ignora tildes del español pero no la ñ', () => {
  assert.equal(normalize('¿Dónde está?', { loose: true }), 'donde esta');
  assert.equal(normalize('canción', { loose: true }), 'cancion');
  assert.notEqual(normalize('año', { loose: true }), normalize('ano', { loose: true }));
});

test('levenshtein y similarity', () => {
  assert.equal(levenshtein('casa', 'casa'), 0);
  assert.equal(levenshtein('casa', 'cosa'), 1);
  assert.equal(levenshtein('', 'abc'), 3);
  assert.equal(similarity('abc', 'abc'), 1);
  assert.equal(similarity('', ''), 1);
  assert.ok(similarity('hello', 'helo') >= 0.8);
});

test('slug es estable y usa guiones bajos', () => {
  assert.equal(slug('Как дела́?'), 'как_дела');
  assert.equal(slug('give up'), 'give_up');
  assert.equal(slug('be used to'), 'be_used_to');
});

test('plural elige la forma según la cantidad', () => {
  assert.equal(plural(1, 'día', 'días'), 'día');
  assert.equal(plural(0, 'día', 'días'), 'días');
  assert.equal(plural(5, 'día', 'días'), 'días');
});

test('shuffle conserva los elementos y no modifica el original', () => {
  const original = [1, 2, 3, 4, 5, 6, 7, 8];
  const copy = [...original];
  const out = shuffle(original);
  assert.deepEqual(original, copy);
  assert.deepEqual([...out].sort(), [...copy].sort());
});

test('dayKey, startOfDay y addDays', () => {
  const t = new Date(2026, 0, 15, 18, 30).getTime();
  assert.equal(dayKey(t), '2026-01-15');
  const start = startOfDay(t);
  assert.equal(new Date(start).getHours(), 0);
  assert.equal(dayKey(addDays(start, 1)), '2026-01-16');
  assert.equal(dayKey(addDays(start, -15)), '2025-12-31');
});

// ---------- repetición espaciada ----------

const NOW = new Date(2026, 5, 1, 10, 0).getTime();

test('una tarjeta nueva no está vencida hasta que se repasa', () => {
  const c = newCard('x', NOW);
  assert.equal(c.seen, false);
  assert.equal(isDue(c, NOW), false);
});

test('Otra vez: vuelve en 10 minutos y cuenta un olvido', () => {
  const c = schedule(newCard('x', NOW), GRADE.AGAIN, NOW);
  assert.equal(c.seen, true);
  assert.equal(c.lapses, 1);
  assert.equal(c.reps, 0);
  assert.equal(c.due, NOW + 10 * 60 * 1000);
  assert.equal(isDue(c, NOW + 11 * 60 * 1000), true);
});

test('Bien en una tarjeta nueva: vence mañana', () => {
  const c = schedule(newCard('x', NOW), GRADE.GOOD, NOW);
  assert.equal(c.interval, 1);
  assert.equal(c.reps, 1);
  assert.equal(isDue(c, NOW), false);
  assert.equal(isDue(c, NOW + 2 * DAY), true);
});

test('los intervalos crecen con aciertos seguidos', () => {
  let c = newCard('x', NOW);
  const seen = [];
  let now = NOW;
  for (let i = 0; i < 6; i++) {
    c = schedule(c, GRADE.GOOD, now);
    seen.push(c.interval);
    now = c.due;
  }
  for (let i = 1; i < seen.length; i++) assert.ok(seen[i] > seen[i - 1], `intervalos: ${seen.join(', ')}`);
});

test('Fácil espacia más que Bien, y Difícil menos', () => {
  const base = { ...schedule(schedule(newCard('x', NOW), GRADE.GOOD, NOW), GRADE.GOOD, NOW) };
  const hard = schedule(base, GRADE.HARD, NOW).interval;
  const good = schedule(base, GRADE.GOOD, NOW).interval;
  const easy = schedule(base, GRADE.EASY, NOW).interval;
  assert.ok(hard <= good && good < easy, `${hard} ${good} ${easy}`);
});

test('la facilidad nunca baja de 1.3', () => {
  let c = newCard('x', NOW);
  for (let i = 0; i < 20; i++) c = schedule(c, GRADE.AGAIN, NOW);
  assert.ok(c.ease >= 1.3);
});

test('schedule no modifica la tarjeta original', () => {
  const c = newCard('x', NOW);
  const frozen = JSON.stringify(c);
  schedule(c, GRADE.EASY, NOW);
  assert.equal(JSON.stringify(c), frozen);
});

test('previewLabel da etiquetas legibles', () => {
  const c = newCard('x', NOW);
  assert.equal(previewLabel(c, GRADE.AGAIN, NOW), '10 min');
  assert.equal(previewLabel(c, GRADE.GOOD, NOW), '1 día');
});

test('buildQueue: primero vencidas, después nuevas, con límite', () => {
  const due = { ...schedule(newCard('a', NOW - 5 * DAY), GRADE.GOOD, NOW - 5 * DAY) };
  const fresh = ['b', 'c', 'd', 'e'].map((id) => newCard(id, NOW));
  const { queue, due: d, fresh: f } = buildQueue([due, ...fresh], { newLimit: 2, now: NOW });
  assert.equal(d.length, 1);
  assert.equal(f.length, 2);
  assert.equal(queue[0].id, 'a');
  assert.equal(queue.length, 3);
});

test('isMature a partir de 21 días', () => {
  assert.equal(isMature({ seen: true, interval: 20 }), false);
  assert.equal(isMature({ seen: true, interval: 21 }), true);
  assert.equal(isMature({ seen: false, interval: 30 }), false);
});

// ---------- resultado ----------

if (failures.length) {
  console.error(`\n${failures.length} prueba(s) fallaron:\n`);
  for (const f of failures) console.error(`  ✗ ${f}`);
  console.error(`\n${passed} pasaron.`);
  process.exit(1);
}
console.log(`${passed} pruebas pasaron.`);
