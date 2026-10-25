// Revisa que todas las lecciones tengan la forma que espera la app.
// Uso: node scripts/validate-content.mjs   (sale con código 1 si hay errores)

import { COURSES, lessonsOf, cardsOfLesson } from '../js/content/index.js';

const errors = [];
const warnings = [];
const fail = (where, msg) => errors.push(`${where}: ${msg}`);
const warn = (where, msg) => warnings.push(`${where}: ${msg}`);

const VOWELS_RU = /[аеёиоуыэюя]/gi;
const ACUTE = '́';
const CYRILLIC = /[Ѐ-ӿ]/;
const LATIN = /[A-Za-z]/;

const isText = (x) => typeof x === 'string' && x.trim().length > 0;
const isTextList = (x) => Array.isArray(x) && x.length > 0 && x.every(isText);

// Palabras del ruso con 2 o más vocales que no tienen marca de acento (ni ё).
function missingStress(phrase) {
  return phrase
    .split(/[\s,.!?«»"—-]+/)
    .filter(Boolean)
    .filter((w) => {
      const vowels = (w.match(VOWELS_RU) || []).length;
      return vowels >= 2 && !w.includes(ACUTE) && !/ё/i.test(w);
    });
}

// Una palabra con letras latinas y cirílicas mezcladas casi seguro es un error de tipeo.
function mixedScript(text) {
  return String(text)
    .split(/[\s,.!?;:()«»"'—-]+/)
    .filter((w) => CYRILLIC.test(w) && LATIN.test(w));
}

function checkExercise(where, ex, lang) {
  if (!ex || typeof ex !== 'object') return fail(where, 'no es un objeto');
  const types = ['mc', 'fill', 'tr', 'order', 'listen', 'match', 'speak'];
  if (!types.includes(ex.type)) return fail(where, `tipo desconocido "${ex.type}"`);

  switch (ex.type) {
    case 'mc': {
      if (!isText(ex.q)) fail(where, 'mc sin q');
      if (!Array.isArray(ex.options) || ex.options.length < 2) return fail(where, 'mc necesita al menos 2 opciones');
      if (!ex.options.every(isText)) fail(where, 'mc con opciones vacías');
      if (new Set(ex.options).size !== ex.options.length) fail(where, 'mc con opciones repetidas');
      if (!Number.isInteger(ex.answer) || ex.answer < 0 || ex.answer >= ex.options.length) fail(where, `mc con answer fuera de rango (${ex.answer})`);
      break;
    }
    case 'fill': {
      if (!isText(ex.q) || !ex.q.includes('___')) fail(where, 'fill necesita q con "___"');
      if (!isTextList(ex.answer)) fail(where, 'fill necesita answer: [..]');
      break;
    }
    case 'tr': {
      if (!isText(ex.q)) fail(where, 'tr sin q');
      if (!isTextList(ex.answer)) fail(where, 'tr necesita answer: [..]');
      if (ex.dir !== undefined && ex.dir !== 't>es') fail(where, `dir inválido "${ex.dir}"`);
      break;
    }
    case 'order': {
      if (!isText(ex.q)) fail(where, 'order sin q');
      if (!isText(ex.answer) && !isTextList(ex.answer)) fail(where, 'order necesita answer (texto)');
      const first = [].concat(ex.answer)[0];
      if (isText(first)) {
        const words = first.split(/\s+/);
        if (words.length < 3) warn(where, 'order con menos de 3 palabras');
        for (const extra of ex.extra || []) {
          if (words.includes(extra)) fail(where, `el distractor "${extra}" ya está en la respuesta`);
        }
      }
      break;
    }
    case 'listen': {
      if (!isText(ex.audio)) fail(where, 'listen sin audio');
      if (!isTextList(ex.answer)) fail(where, 'listen necesita answer: [..]');
      break;
    }
    case 'match': {
      if (!Array.isArray(ex.pairs) || ex.pairs.length < 2) return fail(where, 'match necesita al menos 2 pares');
      if (!ex.pairs.every((p) => Array.isArray(p) && p.length === 2 && p.every(isText))) fail(where, 'match con pares mal formados');
      const left = ex.pairs.map((p) => p[0]);
      const right = ex.pairs.map((p) => p[1]);
      if (new Set(left).size !== left.length) fail(where, 'match con elementos repetidos a la izquierda');
      if (new Set(right).size !== right.length) fail(where, 'match con elementos repetidos a la derecha');
      break;
    }
    case 'speak': {
      if (!isText(ex.text)) fail(where, 'speak sin text');
      break;
    }
  }

  if (lang === 'ru') {
    const texts = [ex.q, ex.text, ex.audio, ...(ex.options || []), ...[].concat(ex.answer ?? []).filter((a) => typeof a === 'string')];
    for (const t of texts.filter(isText)) {
      for (const w of mixedScript(t)) fail(where, `mezcla de alfabetos en "${w}"`);
    }
  }
}

function checkLesson(courseId, lang, lesson, index) {
  const where = lesson?.id || `${courseId}[${index}]`;

  const expected = `${courseId}-${String(index + 1).padStart(2, '0')}`;
  if (lesson.id !== expected) fail(where, `id esperado "${expected}" según el orden`);

  for (const key of ['title', 'level', 'goal', 'theory']) {
    if (!isText(lesson[key])) fail(where, `falta ${key}`);
  }
  if (!Number.isInteger(lesson.minutes) || lesson.minutes <= 0) fail(where, 'minutes inválido');

  // teoría
  if (isText(lesson.theory)) {
    for (const tag of ['table', 'aside', 'ul', 'p', 'div']) {
      const open = (lesson.theory.match(new RegExp(`<${tag}[\\s>]`, 'g')) || []).length;
      const close = (lesson.theory.match(new RegExp(`</${tag}>`, 'g')) || []).length;
      if (open !== close) fail(where, `etiquetas <${tag}> desparejas en la teoría (${open} abiertas, ${close} cerradas)`);
    }
    if (lesson.theory.length < 1500) warn(where, 'teoría muy corta');
    if (lang === 'ru') {
      const bare = [...lesson.theory.matchAll(/class="say" lang="([a-z]+)"/g)].filter((m) => m[1] !== 'ru');
      if (bare.length) fail(where, 'hay un .say con lang distinto de ru');
      for (const w of mixedScript(lesson.theory.replace(/<[^>]+>/g, ' '))) fail(where, `mezcla de alfabetos en teoría: "${w}"`);
    }
    if (lang === 'en') {
      const bad = [...lesson.theory.matchAll(/class="say" lang="([a-z]+)"/g)].filter((m) => m[1] !== 'en');
      if (bad.length) fail(where, 'hay un .say con lang distinto de en');
    }
  }

  // diálogo
  if (lesson.dialogue !== undefined) {
    if (!Array.isArray(lesson.dialogue) || lesson.dialogue.length < 2) fail(where, 'dialogue inválido');
    else lesson.dialogue.forEach((line, i) => {
      if (!isText(line.who) || !isText(line.t) || !isText(line.es)) fail(where, `dialogue[${i}] incompleto`);
    });
  }

  // vocabulario
  if (!Array.isArray(lesson.vocab) || lesson.vocab.length < 10 || lesson.vocab.length > 16) {
    fail(where, `vocab debe tener entre 10 y 16 palabras (tiene ${lesson.vocab?.length ?? 0})`);
  } else {
    lesson.vocab.forEach((v, i) => {
      const w = `${where} vocab[${i}]`;
      for (const key of ['t', 'es', 'ex', 'exEs']) if (!isText(v[key])) fail(w, `falta ${key}`);
      if (lang === 'ru') {
        for (const word of missingStress(v.t || '')) fail(w, `"${word}" sin marca de acento`);
        for (const word of mixedScript(`${v.t} ${v.ex}`)) fail(w, `mezcla de alfabetos en "${word}"`);
      }
    });
    const cards = cardsOfLesson(lesson);
    const ids = new Set(cards.map((c) => c.id));
    if (ids.size !== cards.length) fail(where, 'hay palabras que generan el mismo id de tarjeta');
  }

  // ejercicios
  if (!Array.isArray(lesson.exercises) || lesson.exercises.length < 10) {
    fail(where, `necesita al menos 10 ejercicios (tiene ${lesson.exercises?.length ?? 0})`);
  } else {
    lesson.exercises.forEach((ex, i) => checkExercise(`${where} ejercicio ${i + 1}`, ex, lang));
    const kinds = new Set(lesson.exercises.map((e) => e.type));
    if (kinds.size < 4) warn(where, `poca variedad de ejercicios (${[...kinds].join(', ')})`);
  }
}

// ---------- recorrido ----------

const seenLessons = new Set();
const seenCards = new Set();

for (const course of Object.values(COURSES)) {
  const all = lessonsOf(course.id);
  if (all.length === 0) fail(course.id, 'curso sin lecciones');
  all.forEach(({ lesson }, index) => {
    if (seenLessons.has(lesson.id)) fail(lesson.id, 'id de lección repetido');
    seenLessons.add(lesson.id);
    checkLesson(course.id, course.lang, lesson, index);
    for (const card of cardsOfLesson(lesson)) {
      if (seenCards.has(card.id)) fail(lesson.id, `id de tarjeta repetido: ${card.id}`);
      seenCards.add(card.id);
    }
  });
  console.log(`${course.name}: ${all.length} lecciones, ${all.reduce((n, x) => n + x.lesson.vocab.length, 0)} palabras, ${all.reduce((n, x) => n + x.lesson.exercises.length, 0)} ejercicios`);
}

for (const w of warnings) console.warn(`aviso  ${w}`);
for (const e of errors) console.error(`error  ${e}`);

if (errors.length) {
  console.error(`\n${errors.length} error(es) en el contenido.`);
  process.exit(1);
}
console.log(`\nContenido válido${warnings.length ? ` (${warnings.length} aviso/s)` : ''}.`);
