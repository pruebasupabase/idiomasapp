// Tema 4 de ruso: números del 1 al 10 y precios. Las sesiones se arman solas con js/builder.js.
export default {
  id: 'ru-t04',
  title: 'Números y precios',
  emoji: '🔢',
  level: 'A1',
  goal: 'Contar hasta diez, preguntar cuánto cuesta algo y decir tu edad.',
  words: [
    { t: 'оди́н', es: 'uno', e: '1️⃣', ex: 'У меня́ оди́н брат.', exEs: 'Tengo un hermano.' },
    { t: 'два', es: 'dos', e: '2️⃣', ex: 'Два ко́фе, пожа́луйста.', exEs: 'Dos cafés, por favor.' },
    { t: 'три', es: 'tres', e: '3️⃣', ex: 'Три я́блока.', exEs: 'Tres manzanas.' },
    { t: 'четы́ре', es: 'cuatro', e: '4️⃣', ex: 'У меня́ четы́ре кни́ги.', exEs: 'Tengo cuatro libros.' },

    { t: 'пять', es: 'cinco', e: '5️⃣', ex: 'Пять мину́т.', exEs: 'Cinco minutos.' },
    { t: 'шесть', es: 'seis', e: '6️⃣', ex: 'Шесть часо́в.', exEs: 'Seis horas.' },
    { t: 'семь', es: 'siete', e: '7️⃣', ex: 'Семь дней.', exEs: 'Siete días.' },
    { t: 'во́семь', es: 'ocho', e: '8️⃣', ex: 'Во́семь рубле́й.', exEs: 'Ocho rublos.' },

    { t: 'де́вять', es: 'nueve', e: '9️⃣', ex: 'Де́вять студе́нтов.', exEs: 'Nueve estudiantes.' },
    { t: 'де́сять', es: 'diez', e: '🔟', ex: 'Де́сять рубле́й.', exEs: 'Diez rublos.' },
    { t: 'ско́лько', es: 'cuánto', e: '❓', pic: false, ex: 'Ско́лько э́то сто́ит?', exEs: '¿Cuánto cuesta esto?' },
    { t: 'рубль', es: 'rublo', e: '💵', pic: false, ex: 'Э́то оди́н рубль.', exEs: 'Esto es un rublo.' },
  ],
  phrases: [
    { t: 'Ско́лько э́то сто́ит?', es: '¿Cuánto cuesta esto?' },
    { t: 'Ско́лько тебе́ лет?', es: '¿Cuántos años tenés?' },
    { t: 'Мне два́дцать два го́да.', es: 'Tengo veintidós años.' },
    { t: 'Э́то сли́шком до́рого.', es: 'Es demasiado caro.' },
    { t: 'Како́й твой но́мер телефо́на?', es: '¿Cuál es tu número de teléfono?' },
  ],
  tips: [
    {
      after: 0,
      e: '⚧️',
      title: 'Оди́н y два cambian según el género',
      html: `<p>El uno y el dos tienen forma femenina: <span class="say" lang="ru">оди́н</span> / <span class="say" lang="ru">одна́</span> y <span class="say" lang="ru">два</span> / <span class="say" lang="ru">две</span>.</p>
<p><span class="say" lang="ru">оди́н брат</span>, <span class="say" lang="ru">одна́ сестра́</span>; <span class="say" lang="ru">два бра́та</span>, <span class="say" lang="ru">две сестры́</span>.</p>`,
    },
    {
      after: 1,
      e: '🧮',
      title: 'Después de un número, la palabra cambia',
      html: `<p>Con 2, 3 y 4 la palabra va en una forma corta: <span class="say" lang="ru">два рубля́</span>, <span class="say" lang="ru">три рубля́</span>.</p>
<p>Desde el 5 pasa a otra forma: <span class="say" lang="ru">пять рубле́й</span>, <span class="say" lang="ru">де́сять рубле́й</span>. Por ahora memorizalo como «se oye así».</p>`,
    },
    {
      after: 2,
      e: '🎂',
      title: 'La edad: «a mí 22 años»',
      html: `<p>Para decir tu edad no hay «tener años»: se usa <span class="say" lang="ru">мне</span> (a mí) y el número.</p>
<p><span class="say" lang="ru">Мне два́дцать два го́да.</span> → Tengo 22 años.</p>
<p>Para preguntar: <span class="say" lang="ru">Ско́лько тебе́ лет?</span></p>`,
    },
  ],
};
