// Revisa que todas las lecciones tengan la forma que espera la app.
// Uso: node scripts/validate-content.mjs   (sale con código 1 si hay errores)

import { COURSES, lessonsOf, cardsOfLesson, isTopicLesson } from '../js/content/index.js';
import { buildSession } from '../js/builder.js';

const errors = [];
const warnings = [];
const fail = (where, msg) => errors.push(`${where}: ${msg}`);
const warn = (where, msg) => {
  const line = `${where}: ${msg}`;
  if (!warnings.includes(line)) warnings.push(line);
};

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
  const types = ['mc', 'fill', 'tr', 'order', 'listen', 'match', 'speak', 'intro', 'tip'];
  if (!types.includes(ex.type)) return fail(where, `tipo desconocido "${ex.type}"`);

  switch (ex.type) {
    case 'mc': {
      if (!isText(ex.q) && !isText(ex.audio) && !isText(ex.big)) fail(where, 'mc sin q, audio ni dibujo');
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
        if (words.length < 3 && !/^[a-z]+-t\d/.test(where)) warn(where, 'order con menos de 3 palabras');
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
      if (!ex.pairs.every((p) => Array.isArray(p) && (p.length === 2 || p.length === 3) && isText(p[0]) && isText(p[1]))) fail(where, 'match con pares mal formados');
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
    case 'intro': {
      if (!Array.isArray(ex.words) || ex.words.length < 2 || ex.words.length > 6) return fail(where, 'intro necesita entre 2 y 6 palabras');
      ex.words.forEach((w, i) => {
        if (!isText(w.t) || !isText(w.es)) fail(where, `intro[${i}] sin t o es`);
      });
      break;
    }
    case 'tip': {
      if (!isText(ex.title) || !isText(ex.html)) fail(where, 'tip necesita title y html');
      break;
    }
  }

  if (lang === 'ru') {
    const texts = [ex.q, ex.text, ex.audio, ...(ex.options || []), ...(ex.words || []).map((w) => w.t), ...[].concat(ex.answer ?? []).filter((a) => typeof a === 'string')];
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

function checkTopic(courseId, lang, lesson) {
  const topic = lesson.topic;
  const where = topic.id;
  for (const key of ['title', 'emoji', 'level', 'goal']) if (!isText(topic[key])) fail(where, `falta ${key}`);
  const expectedId = `${courseId}-t`;
  if (!topic.id.startsWith(expectedId)) fail(where, `el id debería empezar con "${expectedId}"`);

  const words = topic.words || [];
  if (words.length < 8 || words.length > 16) fail(where, `un tema lleva entre 8 y 16 palabras (tiene ${words.length})`);
  const seen = { t: new Set(), es: new Set(), e: new Set() };
  words.forEach((w, i) => {
    const at = `${where} words[${i}]`;
    for (const key of ['t', 'es', 'ex', 'exEs']) if (!isText(w[key])) fail(at, `falta ${key}`);
    if (seen.t.has(w.t)) fail(at, `palabra repetida "${w.t}"`);
    if (seen.es.has(w.es)) fail(at, `significado repetido "${w.es}" (las opciones se confunden)`);
    seen.t.add(w.t);
    seen.es.add(w.es);
    if (w.e && w.pic !== false) {
      if (seen.e.has(w.e)) fail(at, `dibujo repetido ${w.e}: en el ejercicio de elegir dibujo habría dos respuestas posibles`);
      seen.e.add(w.e);
    }
    if (lang === 'ru') {
      for (const word of missingStress(w.t || '')) fail(at, `"${word}" sin marca de acento`);
      for (const word of mixedScript(`${w.t} ${w.ex}`)) fail(at, `mezcla de alfabetos en "${word}"`);
      for (const word of missingStress(w.ex || '').filter((x) => !/[A-Za-z]/.test(x))) fail(at, `ejemplo: "${word}" sin marca de acento`);
    }
  });
  if (seen.e.size < 4) fail(where, 'hacen falta al menos 4 palabras con dibujo distinto para el ejercicio de elegir dibujo');

  const phrases = topic.phrases || [];
  if (phrases.length < 4) fail(where, `hacen falta al menos 4 frases (tiene ${phrases.length})`);
  phrases.forEach((p, i) => {
    const at = `${where} phrases[${i}]`;
    if (!isText(p.t) || !isText(p.es)) fail(at, 'falta t o es');
    if (lang === 'ru') {
      for (const word of missingStress(p.t || '')) fail(at, `"${word}" sin marca de acento`);
      for (const word of mixedScript(p.t || '')) fail(at, `mezcla de alfabetos en "${word}"`);
    }
  });
  if (new Set(phrases.map((p) => p.es)).size !== phrases.length) fail(where, 'frases con el mismo significado');

  const groups = Math.ceil(words.length / 4);
  for (const [i, tip] of (topic.tips || []).entries()) {
    const at = `${where} tips[${i}]`;
    if (!isText(tip.title) || !isText(tip.html)) fail(at, 'falta title o html');
    if (!Number.isInteger(tip.after) || tip.after < 0 || tip.after >= groups) fail(at, `after fuera de rango (hay ${groups} grupos de palabras)`);
    const open = (tip.html.match(/<p[\s>]/g) || []).length;
    const close = (tip.html.match(/<\/p>/g) || []).length;
    if (open !== close) fail(at, 'etiquetas <p> desparejas');
    const wrong = [...tip.html.matchAll(/class="say" lang="([a-z]+)"/g)].filter((m) => m[1] !== lang);
    if (wrong.length) fail(at, `hay un .say con lang distinto de ${lang}`);
    if (lang === 'ru') for (const w of mixedScript(tip.html.replace(/<[^>]+>/g, ' '))) fail(at, `mezcla de alfabetos: "${w}"`);
  }
}

// Arma cada sesión varias veces (los distractores son al azar) y revisa que todo ejercicio sea válido.
function checkSession(lesson, lang) {
  const where = lesson.id;
  for (let run = 0; run < 25; run++) {
    let items;
    try {
      items = buildSession(lesson);
    } catch (err) {
      return fail(where, `buildSession falló: ${err.message}`);
    }
    if (items.length < 10) fail(where, `la sesión tiene solo ${items.length} ejercicios`);
    if (items.length > 24) warn(where, `la sesión tiene ${items.length} ejercicios (larga)`);
    items.forEach((ex, i) => {
      if (run === 0 || ex.type === 'mc' || ex.type === 'order') checkExercise(`${where} ejercicio ${i + 1}`, ex, lang);
    });
    // En las opciones de un mc no puede haber la respuesta dos veces.
    for (const ex of items.filter((x) => x.type === 'mc')) {
      const correct = ex.options[ex.answer];
      if (ex.options.filter((o) => o === correct).length !== 1) fail(where, `mc con la respuesta repetida: ${correct}`);
    }
    // Un order no puede llevar como distractor una palabra que ya está en la frase.
    for (const ex of items.filter((x) => x.type === 'order')) {
      const inside = ex.answer.split(/\s+/).map((w) => w.replace(/[?!.,¿¡]/g, ''));
      for (const extra of ex.extra || []) if (inside.includes(extra)) fail(where, `order con distractor repetido: ${extra}`);
    }
  }
}

// ---------- recorrido ----------

const seenLessons = new Set();
const seenCards = new Set();
const checkedTopics = new Set();

for (const course of Object.values(COURSES)) {
  const all = lessonsOf(course.id);
  if (all.length === 0) fail(course.id, 'curso sin lecciones');
  let grammarIndex = 0;
  all.forEach(({ lesson }) => {
    if (seenLessons.has(lesson.id)) fail(lesson.id, 'id de lección repetido');
    seenLessons.add(lesson.id);
    if (isTopicLesson(lesson)) {
      if (!checkedTopics.has(lesson.topic.id)) {
        checkedTopics.add(lesson.topic.id);
        checkTopic(course.id, course.lang, lesson);
      }
      checkSession(lesson, course.lang);
    } else {
      checkLesson(course.id, course.lang, lesson, grammarIndex++);
    }
    for (const card of cardsOfLesson(lesson)) {
      if (seenCards.has(card.id)) fail(lesson.id, `id de tarjeta repetido: ${card.id}`);
      seenCards.add(card.id);
    }
  });
  const grammar = all.filter((x) => !isTopicLesson(x.lesson));
  const topics = all.filter((x) => isTopicLesson(x.lesson));
  console.log(
    `${course.name}: ${topics.length} sesiones de temas (${topics.reduce((n, x) => n + x.lesson.vocab.length, 0)} tarjetas) + ${grammar.length} lecciones de gramática (${grammar.reduce((n, x) => n + x.lesson.vocab.length, 0)} palabras, ${grammar.reduce((n, x) => n + x.lesson.exercises.length, 0)} ejercicios)`,
  );
}

for (const w of warnings) console.warn(`aviso  ${w}`);
for (const e of errors) console.error(`error  ${e}`);

if (errors.length) {
  console.error(`\n${errors.length} error(es) en el contenido.`);
  process.exit(1);
}
console.log(`\nContenido válido${warnings.length ? ` (${warnings.length} aviso/s)` : ''}.`);
