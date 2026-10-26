// Tema 9 de ruso: colores y adjetivos. Las sesiones se arman solas con js/builder.js.
export default {
  id: 'ru-t09',
  title: 'Colores y descripciones',
  emoji: '🎨',
  level: 'A1',
  goal: 'Describir cosas con colores, tamaños y opiniones simples.',
  words: [
    { t: 'кра́сный', es: 'rojo', e: '🔴', ex: 'Э́то кра́сный стол.', exEs: 'Es una mesa roja.' },
    { t: 'си́ний', es: 'azul oscuro', e: '🔵', ex: 'Си́нее мо́ре.', exEs: 'El mar azul.' },
    { t: 'зелёный', es: 'verde', e: '🟢', ex: 'Зелёный чай.', exEs: 'Té verde.' },
    { t: 'жёлтый', es: 'amarillo', e: '🟡', ex: 'Жёлтое со́лнце.', exEs: 'El sol amarillo.' },

    { t: 'бе́лый', es: 'blanco', e: '⚪', ex: 'Бе́лый хлеб.', exEs: 'Pan blanco.' },
    { t: 'чёрный', es: 'negro', e: '⚫', ex: 'Чёрный кот.', exEs: 'Gato negro.' },
    { t: 'большо́й', es: 'grande', e: '🐘', ex: 'Большо́й дом.', exEs: 'Una casa grande.' },
    { t: 'ма́ленький', es: 'chico', e: '🐜', ex: 'Ма́ленький го́род.', exEs: 'Una ciudad chica.' },

    { t: 'но́вый', es: 'nuevo', e: '🆕', ex: 'Но́вый телефо́н.', exEs: 'Un teléfono nuevo.' },
    { t: 'ста́рый', es: 'viejo', e: '🕰️', pic: false, ex: 'Ста́рый дом.', exEs: 'Una casa vieja.' },
    { t: 'краси́вый', es: 'lindo', e: '😍', pic: false, ex: 'Краси́вый парк.', exEs: 'Un parque lindo.' },
    { t: 'дорого́й', es: 'caro', e: '💎', pic: false, ex: 'Э́то дорого́й пода́рок.', exEs: 'Es un regalo caro.' },
  ],
  phrases: [
    { t: 'Како́й э́то цвет?', es: '¿De qué color es?' },
    { t: 'Э́то кра́сная маши́на.', es: 'Es un auto rojo.' },
    { t: 'У меня́ но́вый телефо́н.', es: 'Tengo un teléfono nuevo.' },
    { t: 'Э́то о́чень краси́во!', es: '¡Es muy lindo!' },
    { t: 'Мой дом большо́й и но́вый.', es: 'Mi casa es grande y nueva.' },
  ],
  tips: [
    {
      after: 0,
      e: '🔗',
      title: 'El adjetivo concuerda con el sustantivo',
      html: `<p>Los adjetivos cambian de terminación según el género: <span class="say" lang="ru">-ый</span> (masculino), <span class="say" lang="ru">-ая</span> (femenino), <span class="say" lang="ru">-ое</span> (neutro).</p>
<p><span class="say" lang="ru">кра́сный стол</span>, <span class="say" lang="ru">кра́сная маши́на</span>, <span class="say" lang="ru">кра́сное я́блоко</span>.</p>`,
    },
    {
      after: 1,
      e: '🔊',
      title: 'Ё siempre lleva el acento',
      html: `<p>La letra <span class="say" lang="ru">ё</span> siempre está acentuada, así que no necesita marca extra: <span class="say" lang="ru">зелёный</span>, <span class="say" lang="ru">жёлтый</span>, <span class="say" lang="ru">чёрный</span>.</p>
<p>En los libros a veces se escribe «е» sin puntitos, pero se pronuncia «ё».</p>`,
    },
    {
      after: 2,
      e: '👍',
      title: 'Adjetivos que terminan en -ой',
      html: `<p>Algunos adjetivos masculinos terminan en <span class="say" lang="ru">-ой</span> en vez de <span class="say" lang="ru">-ый</span> y el acento cae justo ahí: <span class="say" lang="ru">большо́й</span>, <span class="say" lang="ru">дорого́й</span>.</p>
<p>Los femeninos siguen igual: <span class="say" lang="ru">больша́я</span>, <span class="say" lang="ru">дорога́я</span>.</p>`,
    },
  ],
};
