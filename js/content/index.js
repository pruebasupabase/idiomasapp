// Catálogo de cursos. Cada lección vive en su propio archivo (ver LESSON-FORMAT en el README).
// Para sumar una lección: crear el archivo, importarlo acá y agregarlo a su unidad.

import { slug } from '../util.js';
import { expandTopic } from '../builder.js';

import ruT01 from './ru/t01-saludos.js';
import enT01 from './en/t01-trabajo.js';

import ru01 from './ru/01-sonidos.js';
import ru02 from './ru/02-saludos.js';
import ru03 from './ru/03-genero-plural.js';
import ru04 from './ru/04-presente.js';
import ru05 from './ru/05-adjetivos-posesivos.js';
import ru06 from './ru/06-numeros-tiempo.js';
import ru07 from './ru/07-acusativo.js';
import ru08 from './ru/08-preposicional.js';
import ru09 from './ru/09-genitivo.js';
import ru10 from './ru/10-dativo.js';
import ru11 from './ru/11-instrumental.js';
import ru12 from './ru/12-pasado-futuro.js';
import ru13 from './ru/13-movimiento.js';
import ru14 from './ru/14-aspecto.js';

import en01 from './en/01-pronunciacion.js';
import en02 from './en/02-past-vs-perfect.js';
import en03 from './en/03-perfect-continuous.js';
import en04 from './en/04-narrative-tenses.js';
import en05 from './en/05-future.js';
import en06 from './en/06-modals.js';
import en07 from './en/07-conditionals.js';
import en08 from './en/08-third-mixed-wish.js';
import en09 from './en/09-passive.js';
import en10 from './en/10-reported-speech.js';
import en11 from './en/11-relative-clauses.js';
import en12 from './en/12-gerund-infinitive.js';
import en13 from './en/13-linking-words.js';
import en14 from './en/14-phrasal-verbs.js';
import en15 from './en/15-collocations.js';

// Un tema se convierte en una unidad con varias lecciones cortas (palabras, frases y repaso).
function topicUnit(topic, lang) {
  return {
    id: `${topic.id}-unit`,
    title: topic.title,
    blurb: topic.goal,
    emoji: topic.emoji,
    isTopic: true,
    lessons: expandTopic(topic, lang),
  };
}

export const COURSES = {
  ru: {
    id: 'ru',
    name: 'Ruso',
    native: 'Русский',
    lang: 'ru',
    level: 'A1 → A2',
    blurb: 'De la pronunciación a los seis casos, el pasado, los verbos de movimiento y el aspecto.',
    tools: [
      {
        href: '#/alphabet',
        title: 'Alfabeto y sonidos',
        text: 'Las 33 letras con audio y un juego para reconocerlas de oído.',
      },
    ],
    units: [
      topicUnit(ruT01, 'ru'),
      {
        id: 'ru-u1',
        title: 'Gramática: primeros pasos',
        blurb: 'Sonidos, saludos y la estructura básica de la oración, con la teoría completa.',
        lessons: [ru01, ru02, ru03, ru04, ru05, ru06],
      },
      {
        id: 'ru-u2',
        title: 'Los casos',
        blurb: 'Qué hace cada caso y cómo se forma, con muchos ejemplos de uso real.',
        lessons: [ru07, ru08, ru09, ru10, ru11],
      },
      {
        id: 'ru-u3',
        title: 'Acción y tiempo',
        blurb: 'Pasado, futuro, moverse de un lado a otro y el aspecto verbal.',
        lessons: [ru12, ru13, ru14],
      },
    ],
  },
  en: {
    id: 'en',
    name: 'Inglés',
    native: 'English',
    lang: 'en',
    level: 'B1 → B2',
    blurb: 'Tiempos, condicionales, pasiva, estilo indirecto y vocabulario para sonar natural.',
    tools: [],
    units: [
      topicUnit(enT01, 'en'),
      {
        id: 'en-u1',
        title: 'Pronunciación y tiempos verbales',
        blurb: 'Los sonidos que más cuestan y cómo elegir el tiempo correcto.',
        lessons: [en01, en02, en03, en04, en05],
      },
      {
        id: 'en-u2',
        title: 'Modales y condicionales',
        blurb: 'Obligación, deducción, hipótesis y arrepentimientos.',
        lessons: [en06, en07, en08],
      },
      {
        id: 'en-u3',
        title: 'Estructuras de nivel B2',
        blurb: 'Pasiva, estilo indirecto, relativas, gerundio/infinitivo y conectores.',
        lessons: [en09, en10, en11, en12, en13],
      },
      {
        id: 'en-u4',
        title: 'Vocabulario',
        blurb: 'Phrasal verbs y collocations, que es lo que más se nota al hablar.',
        lessons: [en14, en15],
      },
    ],
  },
};

export const courseList = () => Object.values(COURSES);
export const getCourse = (id) => COURSES[id] || null;

// Todas las lecciones de un curso en orden, con su unidad y posición.
export function lessonsOf(courseId) {
  const course = getCourse(courseId);
  if (!course) return [];
  const out = [];
  for (const unit of course.units) {
    for (const lesson of unit.lessons) out.push({ lesson, unit, index: out.length });
  }
  return out;
}

export function findLesson(courseId, lessonId) {
  const all = lessonsOf(courseId);
  const found = all.find((x) => x.lesson.id === lessonId);
  if (!found) return null;
  return { ...found, prev: all[found.index - 1]?.lesson || null, next: all[found.index + 1]?.lesson || null };
}

// Las palabras de una lección que pasan al repaso espaciado.
export function cardsOfLesson(lesson) {
  return (lesson.vocab || []).map((v) => ({ ...v, id: `${lesson.id}/${slug(v.t)}`, lessonId: lesson.id }));
}

// Las lecciones de teoría completa (las del formato viejo) y las sesiones de los temas se tratan distinto.
export function isTopicLesson(lesson) {
  return lesson?.kind === 'topic';
}

const indexCache = new Map();

// Mapa id de tarjeta -> datos de la palabra, para armar las sesiones de repaso.
export function cardIndex(courseId) {
  if (!indexCache.has(courseId)) {
    const map = new Map();
    for (const { lesson } of lessonsOf(courseId)) {
      for (const card of cardsOfLesson(lesson)) map.set(card.id, card);
    }
    indexCache.set(courseId, map);
  }
  return indexCache.get(courseId);
}
