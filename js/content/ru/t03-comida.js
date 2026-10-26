// Tema 3 de ruso: comida y bebida. Las sesiones se arman solas con js/builder.js.
export default {
  id: 'ru-t03',
  title: 'Comida y bebida',
  emoji: '🍽️',
  level: 'A1',
  goal: 'Pedir algo para comer o tomar y decir qué te gusta.',
  words: [
    { t: 'хлеб', es: 'pan', e: '🍞', ex: 'Я ем хлеб.', exEs: 'Como pan.' },
    { t: 'вода́', es: 'agua', e: '💧', ex: 'Мне вода́, пожа́луйста.', exEs: 'Para mí agua, por favor.' },
    { t: 'чай', es: 'té', e: '🍵', ex: 'Я пью чай.', exEs: 'Tomo té.' },
    { t: 'ко́фе', es: 'café', e: '☕', ex: 'Я люблю́ ко́фе.', exEs: 'Me gusta el café.' },

    { t: 'молоко́', es: 'leche', e: '🥛', ex: 'Я пью молоко́.', exEs: 'Tomo leche.' },
    { t: 'сыр', es: 'queso', e: '🧀', ex: 'Мне ну́жен сыр.', exEs: 'Necesito queso.' },
    { t: 'мя́со', es: 'carne', e: '🥩', ex: 'Я не ем мя́со.', exEs: 'No como carne.' },
    { t: 'ры́ба', es: 'pescado', e: '🐟', ex: 'Э́то све́жая ры́ба.', exEs: 'Es pescado fresco.' },

    { t: 'я́блоко', es: 'manzana', e: '🍎', ex: 'Я ем я́блоко.', exEs: 'Como una manzana.' },
    { t: 'суп', es: 'sopa', e: '🍲', ex: 'Суп горя́чий.', exEs: 'La sopa está caliente.' },
    { t: 'сок', es: 'jugo', e: '🧃', ex: 'Я хочу́ сок.', exEs: 'Quiero jugo.' },
    { t: 'яйцо́', es: 'huevo', e: '🥚', ex: 'На за́втрак яйцо́.', exEs: 'Para el desayuno, un huevo.' },
  ],
  phrases: [
    { t: 'Что ты хо́чешь?', es: '¿Qué querés?' },
    { t: 'Я хочу́ пить.', es: 'Tengo sed.' },
    { t: 'Я хочу́ есть.', es: 'Tengo hambre.' },
    { t: 'Прия́тного аппети́та!', es: '¡Buen provecho!' },
    { t: 'Мне, пожа́луйста, чай.', es: 'Para mí un té, por favor.' },
  ],
  tips: [
    {
      after: 0,
      e: '🍴',
      title: 'Есть y пить: comer y beber',
      html: `<p>Los dos verbos más útiles de la mesa: <span class="say" lang="ru">есть</span> (comer) y <span class="say" lang="ru">пить</span> (beber).</p>
<p><span class="say" lang="ru">Я ем хлеб.</span> — Como pan.</p>
<p><span class="say" lang="ru">Я пью чай.</span> — Tomo té.</p>`,
    },
    {
      after: 1,
      e: '🚫',
      title: 'Para decir «no», poné не antes del verbo',
      html: `<p>La negación es fácil: <span class="say" lang="ru">не</span> va justo antes del verbo y no cambia nada más.</p>
<p><span class="say" lang="ru">Я ем мя́со.</span> → Como carne.</p>
<p><span class="say" lang="ru">Я не ем мя́со.</span> → No como carne.</p>`,
    },
    {
      after: 2,
      e: '💬',
      title: 'Хочу́: «quiero»',
      html: `<p><span class="say" lang="ru">Я хочу́</span> significa «yo quiero». Con <span class="say" lang="ru">ты</span> cambia a <span class="say" lang="ru">ты хо́чешь</span>.</p>
<p>Podés usarlo con un verbo: <span class="say" lang="ru">Я хочу́ пить.</span> (Tengo sed, literalmente «quiero beber»).</p>`,
    },
  ],
};
