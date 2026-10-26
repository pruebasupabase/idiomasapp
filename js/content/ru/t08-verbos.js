// Tema 8 de ruso: verbos de todos los días. Las sesiones se arman solas con js/builder.js.
export default {
  id: 'ru-t08',
  title: 'Verbos de todos los días',
  emoji: '🏃',
  level: 'A1',
  goal: 'Usar los doce verbos más comunes para contar qué hacés y qué te gusta.',
  words: [
    { t: 'де́лать', es: 'hacer', e: '🛠️', pic: false, ex: 'Что ты де́лаешь?', exEs: '¿Qué estás haciendo?' },
    { t: 'ду́мать', es: 'pensar', e: '🤔', ex: 'Я ду́маю.', exEs: 'Estoy pensando.' },
    { t: 'говори́ть', es: 'hablar', e: '🗣️', ex: 'Он хорошо́ говори́т.', exEs: 'Habla bien.' },
    { t: 'понима́ть', es: 'entender', e: '💡', pic: false, ex: 'Я понима́ю.', exEs: 'Entiendo.' },

    { t: 'слу́шать', es: 'escuchar', e: '👂', ex: 'Мы слу́шаем му́зыку.', exEs: 'Escuchamos música.' },
    { t: 'чита́ть', es: 'leer', e: '📖', ex: 'Она́ чита́ет кни́гу.', exEs: 'Ella lee un libro.' },
    { t: 'писа́ть', es: 'escribir', e: '✍️', ex: 'Я пишу́ письмо́.', exEs: 'Escribo una carta.' },
    { t: 'рабо́тать', es: 'trabajar', e: '💼', ex: 'Он рабо́тает в ба́нке.', exEs: 'Trabaja en un banco.' },

    { t: 'жить', es: 'vivir', e: '🏘️', pic: false, ex: 'Мы живём в Аргенти́не.', exEs: 'Vivimos en Argentina.' },
    { t: 'люби́ть', es: 'amar, gustar', e: '❤️', ex: 'Я люблю́ му́зыку.', exEs: 'Me gusta la música.' },
    { t: 'знать', es: 'saber', e: '🧠', pic: false, ex: 'Я зна́ю.', exEs: 'Lo sé.' },
    { t: 'хоте́ть', es: 'querer', e: '✨', pic: false, ex: 'Я хочу́ спать.', exEs: 'Quiero dormir.' },
  ],
  phrases: [
    { t: 'Я не понима́ю.', es: 'No entiendo.' },
    { t: 'Повтори́те, пожа́луйста.', es: 'Repita, por favor.' },
    { t: 'Говори́те ме́дленнее.', es: 'Hable más despacio.' },
    { t: 'Я изуча́ю ру́сский язы́к.', es: 'Estudio ruso.' },
    { t: 'Что э́то зна́чит?', es: '¿Qué significa esto?' },
  ],
  tips: [
    {
      after: 0,
      e: '🔧',
      title: 'Así se conjuga el presente',
      html: `<p>La mayoría de los verbos terminan en <span class="say" lang="ru">-ть</span>. Quitás esa terminación y agregás una nueva según quién hace la acción.</p>
<p><span class="say" lang="ru">я чита́ю</span>, <span class="say" lang="ru">ты чита́ешь</span>, <span class="say" lang="ru">он чита́ет</span>, <span class="say" lang="ru">мы чита́ем</span>.</p>`,
    },
    {
      after: 1,
      e: '🚫',
      title: 'No hay «ser» ni «estar» en presente',
      html: `<p>En presente no hace falta el verbo «ser/estar»: simplemente ponés las dos palabras juntas.</p>
<p><span class="say" lang="ru">Я студе́нт.</span> → Soy estudiante.</p>
<p><span class="say" lang="ru">Мы до́ма.</span> → Estamos en casa.</p>`,
    },
    {
      after: 2,
      e: '🗣️',
      title: 'Cómo pedir ayuda cuando no entendés',
      html: `<p>Tres frases salvavidas: <span class="say" lang="ru">Я не понима́ю.</span>, <span class="say" lang="ru">Повтори́те, пожа́луйста.</span> y <span class="say" lang="ru">Говори́те ме́дленнее.</span></p>
<p>Usalas sin miedo, los rusos lo toman con naturalidad.</p>`,
    },
  ],
  scenes: [
    {
      ctx: 'Una persona rusa te habla muy rápido.',
      lines: [
        ['Ру́сский', 'Вы понима́ете?', '¿Entiende?'],
      ],
      ask: 'Decile que no entendés.',
      options: ['Нет, я не понима́ю.', 'Да, я понима́ю.', 'Я зна́ю.'],
      answer: 0,
      why: 'Я не понима́ю es la frase más útil cuando recién empezás.',
    },
    {
      ctx: 'Querés que hable más despacio.',
      lines: [
        ['Ру́сский', 'Я говорю́ о́чень бы́стро!', '¡Hablo muy rápido!'],
      ],
      ask: 'Pedile que hable más despacio.',
      options: ['Говори́те ме́дленнее, пожа́луйста.', 'Я хочу́ спать.', 'Я зна́ю.'],
      answer: 0,
      why: 'Ме́дленнее significa «más despacio».',
    },
    {
      ctx: 'Un compañero te pregunta qué hacés.',
      lines: [
        ['Друг', 'Что ты де́лаешь?', '¿Qué estás haciendo?'],
      ],
      ask: 'Decile que estás leyendo un libro.',
      options: ['Я чита́ю кни́гу.', 'Я пишу́ письмо́.', 'Я слу́шаю му́зыку.'],
      answer: 0,
      why: 'Чита́ть es leer: я чита́ю, ты чита́ешь.',
    },
    {
      ctx: 'Conocés a alguien y te pregunta por el idioma.',
      lines: [
        ['А́нна', 'Ты изуча́ешь ру́сский?', '¿Estudiás ruso?'],
      ],
      ask: 'Decile que sí, que estudiás ruso.',
      options: ['Да, я изуча́ю ру́сский язы́к.', 'Нет, я говорю́ по-англи́йски.', 'Да, я зна́ю.'],
      answer: 0,
      why: 'Изуча́ть significa «estudiar a fondo / aprender».',
    },
    {
      ctx: 'Te preguntan dónde vivís.',
      lines: [
        ['А́нна', 'Где ты живёшь?', '¿Dónde vivís?'],
      ],
      ask: 'Decile que vivís en Argentina.',
      options: ['Я живу́ в Аргенти́не.', 'Я рабо́таю в ба́нке.', 'Мы живём до́ма.'],
      answer: 0,
      why: 'Жить es «vivir»: я живу́, ты живёшь.',
    },
  ],
};
