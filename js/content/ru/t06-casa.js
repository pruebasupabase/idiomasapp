// Tema 6 de ruso: la casa. Las sesiones se arman solas con js/builder.js.
export default {
  id: 'ru-t06',
  title: 'La casa',
  emoji: '🏠',
  level: 'A1',
  goal: 'Nombrar las partes de tu casa y los objetos de todos los días.',
  words: [
    { t: 'дом', es: 'casa, edificio', e: '🏠', ex: 'Мой дом большо́й.', exEs: 'Mi casa es grande.' },
    { t: 'кварти́ра', es: 'departamento', e: '🏢', pic: false, ex: 'Моя́ кварти́ра ма́ленькая.', exEs: 'Mi departamento es chico.' },
    { t: 'ко́мната', es: 'habitación', e: '🛋️', pic: false, ex: 'Э́то моя́ ко́мната.', exEs: 'Esta es mi habitación.' },
    { t: 'ку́хня', es: 'cocina', e: '🍳', ex: 'Ку́хня но́вая.', exEs: 'La cocina es nueva.' },

    { t: 'окно́', es: 'ventana', e: '🪟', ex: 'Окно́ откры́то.', exEs: 'La ventana está abierta.' },
    { t: 'дверь', es: 'puerta', e: '🚪', ex: 'Дверь закры́та.', exEs: 'La puerta está cerrada.' },
    { t: 'стол', es: 'mesa', e: '🍽️', pic: false, ex: 'Стол здесь.', exEs: 'La mesa está acá.' },
    { t: 'стул', es: 'silla', e: '🪑', ex: 'Стул ря́дом.', exEs: 'La silla está al lado.' },

    { t: 'крова́ть', es: 'cama', e: '🛏️', ex: 'Крова́ть мя́гкая.', exEs: 'La cama es blanda.' },
    { t: 'ла́мпа', es: 'lámpara', e: '💡', ex: 'Ла́мпа на столе́.', exEs: 'La lámpara está sobre la mesa.' },
    { t: 'ключ', es: 'llave', e: '🔑', ex: 'Где мой ключ?', exEs: '¿Dónde está mi llave?' },
    { t: 'телеви́зор', es: 'televisor', e: '📺', ex: 'Телеви́зор рабо́тает.', exEs: 'El televisor funciona.' },
  ],
  phrases: [
    { t: 'Я живу́ в кварти́ре.', es: 'Vivo en un departamento.' },
    { t: 'У нас большо́й дом.', es: 'Tenemos una casa grande.' },
    { t: 'Где мой ключ?', es: '¿Dónde está mi llave?' },
    { t: 'Э́то моя́ ко́мната.', es: 'Esta es mi habitación.' },
    { t: 'До́ма хорошо́.', es: 'En casa se está bien.' },
  ],
  tips: [
    {
      after: 0,
      e: '🔎',
      title: 'Дом y до́ма no son lo mismo',
      html: `<p><span class="say" lang="ru">дом</span> es la casa como objeto. <span class="say" lang="ru">до́ма</span> quiere decir «en casa» y no cambia nunca.</p>
<p><span class="say" lang="ru">Ма́ма до́ма.</span> → Mamá está en casa.</p>`,
    },
    {
      after: 1,
      e: '⚧️',
      title: 'El género se adivina por la terminación',
      html: `<p>Casi siempre alcanza con mirar la última letra: consonante → masculino (<span class="say" lang="ru">стол</span>, <span class="say" lang="ru">дом</span>), <span class="say" lang="ru">-а</span> / <span class="say" lang="ru">-я</span> → femenino (<span class="say" lang="ru">ла́мпа</span>, <span class="say" lang="ru">ку́хня</span>) y <span class="say" lang="ru">-о</span> / <span class="say" lang="ru">-е</span> → neutro (<span class="say" lang="ru">окно́</span>).</p>
<p>Ojo con <span class="say" lang="ru">дверь</span> y <span class="say" lang="ru">крова́ть</span>: terminan en «ь» pero son femeninas.</p>`,
    },
    {
      after: 2,
      e: '🛋️',
      title: 'Estar en un lugar: «в» y «на»',
      html: `<p>Para decir dónde está algo se usa <span class="say" lang="ru">в</span> (dentro) o <span class="say" lang="ru">на</span> (encima o en una superficie), y la palabra cambia un poquito al final.</p>
<p><span class="say" lang="ru">Я в кварти́ре.</span> — <span class="say" lang="ru">Ла́мпа на столе́.</span></p>`,
    },
  ],
  scenes: [
    {
      ctx: 'Un amigo viene a tu casa por primera vez.',
      lines: [
        ['Друг', 'У тебя́ больша́я кварти́ра?', '¿Tenés un departamento grande?'],
      ],
      ask: 'Decile que no, que es chico.',
      options: ['Нет, она́ ма́ленькая.', 'Да, она́ но́вая.', 'Где мой ключ?'],
      answer: 0,
      alt: ['Нет, ма́ленькая.'],
      why: 'Ма́ленький significa «chico». Concuerda con кварти́ра, por eso termina en -ая.',
    },
    {
      ctx: 'No encontrás tus llaves.',
      lines: [
        ['Ма́ма', 'Что ты и́щешь?', '¿Qué estás buscando?'],
      ],
      ask: 'Decile que buscás tu llave.',
      options: ['Я ищу́ ключ.', 'Я ем хлеб.', 'Ключ до́ма.'],
      answer: 0,
      why: 'Я ищу́ significa «yo busco». Ключ no cambia después del verbo.',
    },
    {
      ctx: 'Hace frío en tu habitación.',
      lines: [
        ['Друг', 'Окно́ откры́то?', '¿La ventana está abierta?'],
      ],
      ask: 'Decile que no, que está cerrada.',
      options: ['Нет, окно́ закры́то.', 'Да, окно́ откры́то.', 'Нет, дверь откры́та.'],
      answer: 0,
      why: 'Закры́то es «cerrado» y concuerda con окно́ (neutro).',
    },
    {
      ctx: 'Te muestran un departamento para alquilar.',
      lines: [
        ['Хозя́йка', 'Э́то ку́хня.', 'Esta es la cocina.'],
      ],
      ask: 'Preguntá dónde está la habitación.',
      options: ['Где ко́мната?', 'Где ключ?', 'Э́то мой стул.'],
      answer: 0,
      why: 'Где…? es la pregunta para «¿dónde está…?».',
    },
    {
      ctx: 'Querés ver un partido de fútbol.',
      lines: [
        ['Друг', 'Телеви́зор рабо́тает?', '¿El televisor funciona?'],
      ],
      ask: 'Decile que sí, que funciona.',
      options: ['Да, телеви́зор рабо́тает.', 'Нет, ла́мпа рабо́тает.', 'Да, э́то стол.'],
      answer: 0,
      why: 'Рабо́тает significa «funciona» o «trabaja», según el sujeto.',
    },
  ],
};
