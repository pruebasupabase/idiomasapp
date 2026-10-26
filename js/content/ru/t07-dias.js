// Tema 7 de ruso: días y momentos del día. Las sesiones se arman solas con js/builder.js.
export default {
  id: 'ru-t07',
  title: 'Días y momentos del día',
  emoji: '📅',
  level: 'A1',
  goal: 'Decir qué día es, hablar de hoy, mañana y ayer, y saludar según la hora.',
  words: [
    { t: 'понеде́льник', es: 'lunes', e: '😩', pic: false, ex: 'В понеде́льник я рабо́таю.', exEs: 'El lunes trabajo.' },
    { t: 'пя́тница', es: 'viernes', e: '🎉', pic: false, ex: 'Сего́дня пя́тница.', exEs: 'Hoy es viernes.' },
    { t: 'суббо́та', es: 'sábado', e: '🎈', pic: false, ex: 'За́втра суббо́та.', exEs: 'Mañana es sábado.' },
    { t: 'воскресе́нье', es: 'domingo', e: '😴', pic: false, ex: 'Воскресе́нье — мой люби́мый день.', exEs: 'El domingo es mi día favorito.' },

    { t: 'сего́дня', es: 'hoy', e: '📆', pic: false, ex: 'Сего́дня хорошо́.', exEs: 'Hoy está lindo.' },
    { t: 'за́втра', es: 'mañana (el día siguiente)', e: '➡️', pic: false, ex: 'До за́втра!', exEs: '¡Hasta mañana!' },
    { t: 'вчера́', es: 'ayer', e: '⬅️', pic: false, ex: 'Вчера́ был понеде́льник.', exEs: 'Ayer fue lunes.' },
    { t: 'у́тро', es: 'mañana (parte del día)', e: '🌅', ex: 'До́брое у́тро!', exEs: '¡Buen día!' },

    { t: 'день', es: 'día', e: '☀️', ex: 'До́брый день!', exEs: '¡Buenas tardes!' },
    { t: 'ве́чер', es: 'noche (al atardecer)', e: '🌆', ex: 'До́брый ве́чер!', exEs: '¡Buenas noches! (al saludar)' },
    { t: 'ночь', es: 'noche (para dormir)', e: '🌙', ex: 'Я сплю но́чью.', exEs: 'Duermo de noche.' },
    { t: 'неде́ля', es: 'semana', e: '🗓️', pic: false, ex: 'Хоро́шая неде́ля!', exEs: '¡Buena semana!' },
  ],
  phrases: [
    { t: 'Како́й сего́дня день?', es: '¿Qué día es hoy?' },
    { t: 'Сего́дня пя́тница.', es: 'Hoy es viernes.' },
    { t: 'До за́втра!', es: '¡Hasta mañana!' },
    { t: 'До́брое у́тро!', es: '¡Buen día!' },
    { t: 'Споко́йной но́чи!', es: '¡Que descanses! (buenas noches al despedirte)' },
  ],
  tips: [
    {
      after: 0,
      e: '🔤',
      title: 'Los días van con minúscula',
      html: `<p>En ruso los días de la semana y los meses se escriben con minúscula, salvo al principio de una oración.</p>
<p><span class="say" lang="ru">в понеде́льник</span> = el lunes. Con <span class="say" lang="ru">в</span> decís «el» + día.</p>`,
    },
    {
      after: 1,
      e: '👋',
      title: 'Tres saludos según la hora',
      html: `<p><span class="say" lang="ru">До́брое у́тро!</span> a la mañana, <span class="say" lang="ru">До́брый день!</span> durante el día y <span class="say" lang="ru">До́брый ве́чер!</span> a la tarde-noche.</p>
<p>Al despedirte para dormir: <span class="say" lang="ru">Споко́йной но́чи!</span></p>`,
    },
    {
      after: 2,
      e: '⏪',
      title: 'Ayer, hoy, mañana',
      html: `<p>Tres palabras que no cambian nunca: <span class="say" lang="ru">вчера́</span> (ayer), <span class="say" lang="ru">сего́дня</span> (hoy) y <span class="say" lang="ru">за́втра</span> (mañana).</p>
<p>La «г» de <span class="say" lang="ru">сего́дня</span> suena como «в»: «севóдня».</p>`,
    },
  ],
};
