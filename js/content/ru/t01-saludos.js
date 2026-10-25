// Tema 1 de ruso: saludar, agradecer y presentarse. Las sesiones se arman solas con js/builder.js.
export default {
  id: 'ru-t01',
  title: 'Saludos y primeras frases',
  emoji: '👋',
  level: 'A1',
  goal: 'Saludar, despedirte, agradecer, pedir disculpas y presentarte en ruso.',
  words: [
    { t: 'приве́т', es: 'hola (con amigos)', e: '👋', ex: 'Приве́т, А́нна!', exEs: '¡Hola, Anna!' },
    { t: 'пока́', es: 'chau', e: '🚶', ex: 'Пока́, до за́втра!', exEs: '¡Chau, hasta mañana!' },
    { t: 'здра́вствуйте', es: 'buen día (formal)', e: '🤝', pic: false, ex: 'Здра́вствуйте, Ири́на Ива́новна!', exEs: '¡Buen día, Irina Ivánovna!' },
    { t: 'до свида́ния', es: 'adiós (formal)', e: '🌇', pic: false, ex: 'До свида́ния, спаси́бо!', exEs: '¡Adiós, gracias!' },

    { t: 'спаси́бо', es: 'gracias', e: '🙏', ex: 'Большо́е спаси́бо!', exEs: '¡Muchas gracias!' },
    { t: 'пожа́луйста', es: 'por favor / de nada', e: '🤲', ex: 'Вода́, пожа́луйста.', exEs: 'Agua, por favor.' },
    { t: 'извини́те', es: 'disculpe', e: '🙇', ex: 'Извини́те, где метро́?', exEs: 'Disculpe, ¿dónde está el metro?' },
    { t: 'да', es: 'sí', e: '✅', ex: 'Да, э́то мой друг.', exEs: 'Sí, es mi amigo.' },

    { t: 'нет', es: 'no', e: '❌', ex: 'Нет, спаси́бо.', exEs: 'No, gracias.' },
    { t: 'хорошо́', es: 'bien', e: '👍', ex: 'Всё хорошо́!', exEs: '¡Todo bien!' },
    { t: 'пло́хо', es: 'mal', e: '👎', ex: 'Мне пло́хо.', exEs: 'Me siento mal.' },
    { t: 'прия́тно', es: 'un gusto (al conocer a alguien)', e: '😊', ex: 'О́чень прия́тно!', exEs: '¡Mucho gusto!' },
  ],
  phrases: [
    { t: 'Как тебя́ зову́т?', es: '¿Cómo te llamás?' },
    { t: 'Меня́ зову́т Са́нти.', es: 'Me llamo Santi.' },
    { t: 'Как дела́?', es: '¿Cómo andás?' },
    { t: 'Хорошо́, спаси́бо!', es: '¡Bien, gracias!' },
    { t: 'О́чень прия́тно!', es: '¡Mucho gusto!' },
  ],
  tips: [
    {
      after: 0,
      e: '🧑‍🤝‍🧑',
      title: 'Ты y вы: dos formas de decir «vos»',
      html: `<p>En ruso hay dos «vos»: <span class="say" lang="ru">ты</span> para amigos, familia y chicos, y <span class="say" lang="ru">вы</span> para desconocidos, gente mayor o cuando querés mostrar respeto.</p>
<p>Por eso hay dos saludos: <span class="say" lang="ru">приве́т</span> con amigos y <span class="say" lang="ru">здра́вствуйте</span> con el resto. Si dudás, usá el formal.</p>`,
    },
    {
      after: 1,
      e: '🤲',
      title: 'Пожа́луйста sirve para dos cosas',
      html: `<p><span class="say" lang="ru">пожа́луйста</span> significa <b>por favor</b> y también <b>de nada</b>.</p>
<p><span class="say" lang="ru">Спаси́бо!</span> — <span class="say" lang="ru">Пожа́луйста!</span> (¡Gracias! — ¡De nada!)</p>`,
    },
    {
      after: 2,
      e: '🔊',
      title: 'La «о» sin acento suena como «а»',
      html: `<p>En ruso, la «о» que no lleva acento se oye casi como una «а». Mirá <span class="say" lang="ru">хорошо́</span>: solo la última «о», la acentuada, suena a «о». Se pronuncia más o menos «harashó».</p>
<p>Escuchala y repetila. Esto pasa en casi todas las palabras.</p>`,
    },
  ],
};
