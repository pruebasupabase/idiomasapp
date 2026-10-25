// Alfabeto ruso: las 33 letras con audio y un juego para reconocerlas.

import { h, shuffle, stripStress } from '../util.js';
import { speakButton, backLink } from '../ui.js';
import { runExercises, cancelExercises } from '../exercises.js';
import { stopSpeaking } from '../speech.js';
import { logActivity } from '../store.js';

// kind: v = vocal, c = consonante, s = signo. "word" es una palabra ejemplo con su acento.
export const LETTERS = [
  { ch: 'а', latin: 'a', kind: 'v', sound: 'Como la «a» de «casa».', word: 'а́втобус', es: 'colectivo' },
  { ch: 'б', latin: 'b', kind: 'c', sound: 'Como la «b» de «barco».', word: 'бана́н', es: 'banana' },
  { ch: 'в', latin: 'v', kind: 'c', sound: 'Entre «v» y «b» suave: el labio de abajo toca los dientes de arriba.', word: 'вода́', es: 'agua' },
  { ch: 'г', latin: 'g', kind: 'c', sound: 'Como la «g» de «gato», siempre.', word: 'гора́', es: 'montaña' },
  { ch: 'д', latin: 'd', kind: 'c', sound: 'Como la «d» de «dedo», con la lengua contra los dientes.', word: 'дом', es: 'casa' },
  { ch: 'е', latin: 'ye', kind: 'v', sound: 'Como «ye» de «yeso». Después de una consonante la ablanda.', word: 'е́сли', es: 'si' },
  { ch: 'ё', latin: 'yo', kind: 'v', sound: 'Como «yo» de «yogur». Siempre lleva el acento.', word: 'ёж', es: 'erizo' },
  { ch: 'ж', latin: 'zh', kind: 'c', sound: 'Como la «ll» o «y» rioplatense de «calle» (sonora), pero siempre dura.', word: 'жена́', es: 'esposa' },
  { ch: 'з', latin: 'z', kind: 'c', sound: 'La «s» sonora de «mismo». No es la «z» del español de España.', word: 'зима́', es: 'invierno' },
  { ch: 'и', latin: 'i', kind: 'v', sound: 'Como la «i» de «isla».', word: 'игра́', es: 'juego' },
  { ch: 'й', latin: 'y', kind: 'c', sound: '«i» corta, como en «rey» o «hoy».', word: 'йо́гурт', es: 'yogur' },
  { ch: 'к', latin: 'k', kind: 'c', sound: 'Como la «c» de «casa», sin soplido.', word: 'кот', es: 'gato' },
  { ch: 'л', latin: 'l', kind: 'c', sound: '«l» firme: la lengua toca detrás de los dientes y el cuerpo de la lengua va hacia atrás.', word: 'ла́мпа', es: 'lámpara' },
  { ch: 'м', latin: 'm', kind: 'c', sound: 'Como la «m» de «mamá».', word: 'ма́ма', es: 'mamá' },
  { ch: 'н', latin: 'n', kind: 'c', sound: 'Como la «n» de «nada».', word: 'нос', es: 'nariz' },
  { ch: 'о', latin: 'o', kind: 'v', sound: 'Como la «o» de «solo» si lleva acento. Sin acento suena parecida a «a».', word: 'окно́', es: 'ventana' },
  { ch: 'п', latin: 'p', kind: 'c', sound: 'Como la «p» de «papá», sin soplido.', word: 'парк', es: 'parque' },
  { ch: 'р', latin: 'r', kind: 'c', sound: 'Vibrante, como la «rr» de «perro» pero más corta. Siempre se pronuncia.', word: 'ры́ба', es: 'pescado' },
  { ch: 'с', latin: 's', kind: 'c', sound: 'Como la «s» de «sol».', word: 'сок', es: 'jugo' },
  { ch: 'т', latin: 't', kind: 'c', sound: 'Como la «t» de «tela», con la lengua en los dientes.', word: 'торт', es: 'torta' },
  { ch: 'у', latin: 'u', kind: 'v', sound: 'Como la «u» de «luna».', word: 'уро́к', es: 'clase' },
  { ch: 'ф', latin: 'f', kind: 'c', sound: 'Como la «f» de «foto».', word: 'футбо́л', es: 'fútbol' },
  { ch: 'х', latin: 'kh', kind: 'c', sound: 'Como la «j» de «jamón», pero más suave.', word: 'хлеб', es: 'pan' },
  { ch: 'ц', latin: 'ts', kind: 'c', sound: 'Como la «ts» de «pizza» dicha a la italiana. Siempre dura.', word: 'цирк', es: 'circo' },
  { ch: 'ч', latin: 'ch', kind: 'c', sound: 'Como la «ch» de «chico», pero más suave. Siempre blanda.', word: 'час', es: 'hora' },
  { ch: 'ш', latin: 'sh', kind: 'c', sound: 'Como la «sh» de «shhh». Siempre dura.', word: 'шко́ла', es: 'escuela' },
  { ch: 'щ', latin: 'shch', kind: 'c', sound: '«sh» larga y blanda, algo así como «shch». Siempre blanda.', word: 'щека́', es: 'mejilla' },
  { ch: 'ъ', latin: '', kind: 's', sound: 'Signo duro: no suena. Separa la consonante de la vocal que sigue.', word: 'объе́кт', es: 'objeto' },
  { ch: 'ы', latin: 'y (ы)', kind: 'v', sound: 'No existe en español: una «i» dicha con la lengua retraída hacia atrás.', word: 'сын', es: 'hijo' },
  { ch: 'ь', latin: '', kind: 's', sound: 'Signo blando: no suena. Ablanda la consonante anterior.', word: 'день', es: 'día' },
  { ch: 'э', latin: 'e', kind: 'v', sound: 'Como la «e» de «mesa» (abierta).', word: 'э́то', es: 'esto' },
  { ch: 'ю', latin: 'yu', kind: 'v', sound: 'Como «yu» de «yuyo».', word: 'юг', es: 'sur' },
  { ch: 'я', latin: 'ya', kind: 'v', sound: 'Como «ya» de «yate».', word: 'я́блоко', es: 'manzana' },
];

const FILTERS = [
  { id: 'all', label: 'Todas' },
  { id: 'v', label: 'Vocales' },
  { id: 'c', label: 'Consonantes' },
  { id: 's', label: 'Signos' },
];

const upper = (ch) => ch.toUpperCase();

// Arma 10 preguntas: reconocer la letra, reconocer la letra inicial de lo que oís y un par de dictados.
export function buildQuiz() {
  // La «ы» se transcribe como «y», igual que la «й»: la dejamos afuera de esta pregunta.
  const sounds = LETTERS.filter((l) => l.latin && l.ch !== 'ы');
  const items = [];

  for (const l of shuffle(sounds).slice(0, 4)) {
    const wrong = shuffle(sounds.filter((o) => o.latin !== l.latin)).slice(0, 3);
    const options = [l, ...wrong].map((o) => o.latin);
    items.push({ type: 'mc', instruction: 'Elegí cómo se transcribe esta letra.', q: `**${upper(l.ch)} ${l.ch}**`, options, answer: 0, explain: `${upper(l.ch)} ${l.ch}: ${l.sound}` });
  }

  const starters = LETTERS.filter((l) => stripStress(l.word)[0] === l.ch);
  for (const l of shuffle(starters).slice(0, 4)) {
    const wrong = shuffle(starters.filter((o) => o.ch !== l.ch)).slice(0, 3);
    items.push({
      type: 'mc',
      instruction: 'Escuchá la palabra.',
      q: '¿Con qué letra empieza?',
      audio: stripStress(l.word),
      options: [l, ...wrong].map((o) => upper(o.ch)),
      answer: 0,
      explain: `«${l.word}» (${l.es}) empieza con ${upper(l.ch)}.`,
    });
  }

  for (const l of shuffle(starters).slice(0, 2)) {
    items.push({ type: 'listen', audio: stripStress(l.word), answer: [l.word], instruction: 'Escuchá y escribí la palabra.' });
  }
  return shuffle(items);
}

export default function alphabetView(root) {
  let filter = 'all';
  root.dataset.lang = 'ru';
  root.dataset.course = 'ru';

  const chips = h('div', { class: 'chips', role: 'tablist', 'aria-label': 'Filtro' });
  const grid = h('ul', { class: 'letters' });
  const stage = h('div', { class: 'practice', hidden: true });
  const listView = h('div', {}, chips, grid);

  function drawList() {
    chips.replaceChildren(
      ...FILTERS.map((f) =>
        h('button', { class: `chip-tab${f.id === filter ? ' on' : ''}`, type: 'button', role: 'tab', 'aria-selected': String(f.id === filter), onclick: () => { filter = f.id; drawList(); } }, f.label),
      ),
    );
    grid.replaceChildren(
      ...LETTERS.filter((l) => filter === 'all' || l.kind === filter).map((l) =>
        h(
          'li',
          { class: 'letter' },
          h('div', { class: 'letter-glyph', lang: 'ru', 'aria-hidden': 'true' }, `${upper(l.ch)}${l.ch}`),
          h(
            'div',
            { class: 'letter-info' },
            h('p', { class: 'letter-sound' }, l.latin ? h('strong', {}, l.latin) : null, l.latin ? ' · ' : null, l.sound),
            h('p', { class: 'letter-word' }, h('span', { lang: 'ru' }, l.word), h('span', { class: 'muted' }, ` ${l.es}`)),
          ),
          speakButton(stripStress(l.word), 'ru'),
        ),
      ),
    );
  }

  async function startQuiz() {
    listView.hidden = true;
    startBtn.hidden = true;
    stage.hidden = false;
    const result = await runExercises(stage, buildQuiz(), {
      lang: 'ru',
      onItem: (ok) => logActivity('ru', { exercises: 1, correct: ok ? 1 : 0 }),
    });
    stage.replaceChildren(
      h(
        'div',
        { class: 'review-done' },
        h('h2', {}, `${result.correct} de ${result.total}`),
        h('p', {}, result.score >= 80 ? 'Muy bien. Las letras ya las tenés.' : 'Volvé a la lista, escuchá las palabras ejemplo y probá otra vez.'),
        h('div', { class: 'lesson-controls' }, h('button', { class: 'btn primary', type: 'button', onclick: () => { stage.hidden = true; listView.hidden = false; startBtn.hidden = false; } }, 'Volver a la lista'), h('button', { class: 'btn', type: 'button', onclick: startQuiz }, 'Jugar otra vez')),
      ),
    );
  }

  const startBtn = h('button', { class: 'btn primary', type: 'button', onclick: startQuiz }, 'Practicar con un juego');

  root.append(
    backLink('#/course/ru', 'Curso de ruso'),
    h('header', { class: 'page-head' }, h('h1', {}, 'Alfabeto y sonidos'), h('p', { class: 'muted' }, 'Tocá el parlante para escuchar una palabra con cada letra. El acento de cada palabra está marcado con ´.'), startBtn),
    listView,
    stage,
  );
  drawList();

  return () => {
    cancelExercises();
    stopSpeaking();
    delete root.dataset.lang;
    delete root.dataset.course;
  };
}
