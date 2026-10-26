// Arma las lecciones cortas de un tema a partir de sus palabras y frases.
// El contenido se escribe una sola vez (palabras, frases, datos de gramática) y acá se generan
// las sesiones: palabras nuevas → ejercicios con audio y dibujos → frases → repaso final.

import { shuffle } from './util.js';

const GROUP = 4;

const hasPic = (w) => !!w.e && w.pic !== false;
const pick = (list, n) => shuffle(list).slice(0, n);
const others = (pool, word, n) => pick(pool.filter((w) => w.t !== word.t), n);

function chunk(list, size) {
  const out = [];
  for (let i = 0; i < list.length; i += size) out.push(list.slice(i, i + size));
  return out;
}

// ---------- de un tema a sus lecciones ----------

export function expandTopic(topic, lang) {
  const groups = chunk(topic.words, GROUP);
  const lessons = groups.map((words, n) => ({
    id: `${topic.id}-${n + 1}`,
    kind: 'topic',
    session: 'words',
    group: n,
    topic,
    lang,
    title: topic.title,
    stage: groups.length > 1 ? `Palabras ${n + 1}` : 'Palabras',
    emoji: topic.emoji,
    level: topic.level,
    minutes: 4,
    goal: topic.goal,
    vocab: words.map(({ t, es, e, ex, exEs }) => ({ t, es, e, ex, exEs })),
  }));

  if (topic.phrases?.length) {
    lessons.push({
      id: `${topic.id}-f`,
      kind: 'topic',
      session: 'phrases',
      topic,
      lang,
      title: topic.title,
      stage: 'Frases',
      emoji: '💬',
      level: topic.level,
      minutes: 5,
      goal: topic.goal,
      vocab: topic.phrases.map(({ t, es, ex, exEs }) => ({ t, es, ex, exEs })),
    });
  }

  if (topic.scenes?.length) {
    lessons.push({
      id: `${topic.id}-s`,
      kind: 'topic',
      session: 'scenes',
      topic,
      lang,
      title: topic.title,
      stage: 'Situaciones',
      emoji: '🗣️',
      level: topic.level,
      minutes: 6,
      goal: topic.goal,
      vocab: [],
    });
  }

  lessons.push({
    id: `${topic.id}-r`,
    kind: 'topic',
    session: 'review',
    topic,
    lang,
    title: topic.title,
    stage: 'Repaso del tema',
    emoji: '🏁',
    level: topic.level,
    minutes: 5,
    goal: topic.goal,
    vocab: [],
  });
  return lessons;
}

// ---------- piezas de ejercicio ----------

const introWords = (words) => words.map((w) => ({ t: w.t, es: w.es, e: hasPic(w) ? w.e : '' }));

// Escuchás la palabra y elegís el dibujo.
function hearPicture(w, topic) {
  const pool = topic.words.filter(hasPic);
  const options = [w, ...others(pool, w, 3)];
  return {
    type: 'mc',
    visual: true,
    instruction: 'Escuchá y elegí el dibujo.',
    audio: w.t,
    autoplay: true,
    options: options.map((o) => o.e),
    labels: options.map((o) => o.es),
    answer: 0,
    say: w.t,
  };
}

// Escuchás la palabra y elegís qué significa.
function hearMeaning(w, topic) {
  const options = [w, ...others(topic.words, w, 3)];
  return {
    type: 'mc',
    instruction: '¿Qué significa?',
    q: w.t,
    audio: w.t,
    autoplay: true,
    options: options.map((o) => o.es),
    answer: 0,
    say: w.t,
  };
}

// Ves el dibujo (o el significado) y elegís la palabra en el idioma.
function pickWord(w, topic, lang) {
  // Con dibujo, las opciones salen solo de las palabras con dibujo (así nunca hay dos que encajen).
  const pool = hasPic(w) ? topic.words.filter(hasPic) : topic.words;
  const options = [w, ...others(pool, w, 3)];
  const base = {
    type: 'mc',
    instruction: '¿Cómo se dice?',
    options: options.map((o) => o.t),
    optLang: lang,
    answer: 0,
    say: w.t,
  };
  return hasPic(w) ? { ...base, big: w.e } : { ...base, q: `**${w.es}**` };
}

function heard(w, topic) {
  return topic.words.filter(hasPic).length >= 4 && hasPic(w) ? hearPicture(w, topic) : hearMeaning(w, topic);
}

function matchGroup(words, instruction = 'Uní cada palabra con su significado.') {
  return { type: 'match', instruction, pairs: words.map((w) => [w.t, w.es, hasPic(w) ? w.e : '']) };
}

function dictate(text, instruction = 'Escuchá y escribí lo que oís.') {
  return { type: 'listen', audio: text, answer: [text], instruction };
}

function writeWord(w, lang) {
  return { type: 'tr', q: `**${w.es}**`, answer: [w.t], instruction: `Escribilo en ${lang === 'ru' ? 'ruso' : 'inglés'}.` };
}

// Ordenar la frase: se suma una palabra de otra frase como distractor.
function orderPhrase(p, topic) {
  const inside = new Set(p.t.split(/\s+/).map((w) => w.replace(/[?!.,¿¡]/g, '')));
  const spare = topic.phrases
    .filter((o) => o.t !== p.t)
    .flatMap((o) => o.t.split(/\s+/))
    .map((w) => w.replace(/[?!.,¿¡]/g, ''))
    .filter((w) => w && !inside.has(w) && /[\p{L}]/u.test(w));
  const extra = spare.length && p.t.split(/\s+/).length >= 3 ? [pick(spare, 1)[0]] : [];
  return { type: 'order', q: p.es, answer: p.t, extra, instruction: 'Armá la frase.' };
}

function hearPhrase(p, topic) {
  const options = [p, ...pick(topic.phrases.filter((o) => o.t !== p.t), 3)];
  return {
    type: 'mc',
    instruction: 'Escuchá y elegí qué dice.',
    audio: p.t,
    autoplay: true,
    options: options.map((o) => o.es),
    answer: 0,
    say: p.t,
  };
}

function speakPhrase(p) {
  return { type: 'speak', text: p.t, es: p.es, instruction: 'Escuchala y decila en voz alta.' };
}

// ---------- sesiones ----------

function wordsSession(lesson) {
  const { topic, group, lang } = lesson;
  const all = topic.words;
  const mine = chunk(all, GROUP)[group];
  const before = all.slice(0, group * GROUP);
  const order = shuffle(mine);
  const tip = (topic.tips || []).find((t) => t.after === group);

  const items = [{ type: 'intro', title: group === 0 ? 'Palabras nuevas' : 'Más palabras', words: introWords(mine) }];
  if (tip) items.push({ type: 'tip', e: tip.e, title: tip.title, html: tip.html });

  items.push(
    heard(order[0], topic),
    heard(order[1], topic),
    pickWord(order[0], topic, lang),
    heard(order[2], topic),
    heard(order[3] || order[0], topic),
    matchGroup(mine),
    pickWord(order[1], topic, lang),
    pickWord(order[2], topic, lang),
  );
  if (order[3]) items.push(pickWord(order[3], topic, lang));
  items.push(dictate(order[3] ? order[3].t : order[1].t, 'Escuchá y escribí la palabra.'));

  if (before.length) {
    for (const w of pick(before, 2)) items.push(Math.random() < 0.5 ? heard(w, topic) : pickWord(w, topic, lang));
  }
  items.push(writeWord(order[0], lang));
  return items;
}

function phrasesSession(lesson) {
  const { topic } = lesson;
  const phrases = topic.phrases;
  const order = shuffle(phrases);
  const items = [{ type: 'intro', title: 'Frases útiles', phrases: true, words: phrases.map(({ t, es }) => ({ t, es })) }];
  items.push(hearPhrase(order[0], topic), orderPhrase(order[0], topic));
  for (const p of order.slice(1)) items.push(orderPhrase(p, topic));
  items.push(hearPhrase(order[1], topic));
  items.push(dictate(order[2 % order.length].t, 'Escuchá y escribí la frase.'));
  items.push(dictate(order[3 % order.length].t, 'Escuchá y escribí la frase.'));
  items.push(speakPhrase(order[0]), speakPhrase(order[1]));
  return items;
}

// ---------- situaciones: te hablan o te pasa algo y tenés que responder ----------

// Elegir qué responder. Las opciones son frases completas en el idioma que estudiás.
function sceneChoice(scene, lang) {
  return {
    type: 'mc',
    instruction: 'Escuchá la situación y elegí qué respondés.',
    scene: { ctx: scene.ctx, lines: scene.lines },
    q: scene.ask,
    options: scene.options,
    optLang: lang,
    answer: scene.answer,
    say: scene.options[scene.answer],
    explain: scene.why,
  };
}

// Escribir la respuesta. Vale la opción correcta o cualquiera de las variantes de `alt`.
function sceneWrite(scene) {
  return {
    type: 'tr',
    instruction: 'Respondé escribiendo.',
    scene: { ctx: scene.ctx, lines: scene.lines, noAuto: true },
    q: scene.ask,
    answer: [scene.options[scene.answer], ...(scene.alt || [])],
    hint: scene.hint,
    explain: scene.why,
  };
}

function scenesSession(lesson) {
  const { topic, lang } = lesson;
  const scenes = shuffle(topic.scenes);
  const items = scenes.map((s) => sceneChoice(s, lang));
  // En la segunda vuelta, las mismas situaciones, pero escribiendo.
  for (const s of shuffle(topic.scenes)) items.push(sceneWrite(s));
  return items;
}

function unitSession(lesson) {
  const pool = lesson.pool.filter((ex) => ['mc', 'fill', 'tr', 'order'].includes(ex.type));
  return shuffle(pool).slice(0, 16);
}

function reviewSession(lesson) {
  const { topic, lang } = lesson;
  const words = shuffle(topic.words);
  const items = [matchGroup(words.slice(0, 5), 'Uní cada palabra del tema con su significado.')];
  for (const w of words.slice(0, 4)) items.push(heard(w, topic));
  for (const w of words.slice(4, 7)) items.push(pickWord(w, topic, lang));
  items.push(matchGroup(words.slice(5, 10)));
  if (topic.phrases?.length) {
    const phrases = shuffle(topic.phrases);
    items.push(hearPhrase(phrases[0], topic));
    for (const p of phrases.slice(0, 3)) items.push(orderPhrase(p, topic));
    items.push(dictate(phrases[0].t, 'Escuchá y escribí la frase.'));
    items.push(speakPhrase(phrases[phrases.length - 1]));
  }
  items.push(writeWord(words[7 % words.length], lang), writeWord(words[8 % words.length], lang));
  // Cierre con situaciones reales del tema.
  if (topic.scenes?.length) {
    const scenes = shuffle(topic.scenes);
    for (const sc of scenes.slice(0, 3)) items.push(sceneChoice(sc, lang));
    for (const sc of scenes.slice(3, 5)) items.push(sceneWrite(sc));
  }
  return items;
}

// Devuelve los ejercicios de una sesión. Se arma de nuevo en cada intento (cambian los distractores y el orden).
export function buildSession(lesson) {
  if (lesson.session === 'phrases') return phrasesSession(lesson);
  if (lesson.session === 'review') return reviewSession(lesson);
  if (lesson.session === 'scenes') return scenesSession(lesson);
  if (lesson.session === 'unit') return unitSession(lesson);
  return wordsSession(lesson);
}
