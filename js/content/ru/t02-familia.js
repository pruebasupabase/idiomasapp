// Tema 2 de ruso: la familia. Las sesiones se arman solas con js/builder.js.
export default {
  id: 'ru-t02',
  title: 'La familia',
  emoji: '👪',
  level: 'A1',
  goal: 'Nombrar a los miembros de tu familia y decir quién es quién.',
  words: [
    { t: 'ма́ма', es: 'mamá', e: '👩', ex: 'Ма́ма до́ма.', exEs: 'Mamá está en casa.' },
    { t: 'па́па', es: 'papá', e: '👨', ex: 'Мой па́па врач.', exEs: 'Mi papá es médico.' },
    { t: 'брат', es: 'hermano', e: '👦', ex: 'У меня́ есть брат.', exEs: 'Tengo un hermano.' },
    { t: 'сестра́', es: 'hermana', e: '👧', ex: 'Моя́ сестра́ студе́нтка.', exEs: 'Mi hermana es estudiante.' },

    { t: 'ба́бушка', es: 'abuela', e: '👵', ex: 'Моя́ ба́бушка лю́бит чай.', exEs: 'A mi abuela le gusta el té.' },
    { t: 'де́душка', es: 'abuelo', e: '👴', ex: 'Мой де́душка живёт здесь.', exEs: 'Mi abuelo vive acá.' },
    { t: 'сын', es: 'hijo', e: '🧒', ex: 'Мой сын спит.', exEs: 'Mi hijo está durmiendo.' },
    { t: 'дочь', es: 'hija', e: '👶', ex: 'Моя́ дочь чита́ет.', exEs: 'Mi hija está leyendo.' },

    { t: 'муж', es: 'marido', e: '🤵', ex: 'Мой муж рабо́тает.', exEs: 'Mi marido trabaja.' },
    { t: 'жена́', es: 'esposa', e: '👰', ex: 'Моя́ жена́ до́ма.', exEs: 'Mi esposa está en casa.' },
    { t: 'друг', es: 'amigo', e: '🧑‍🤝‍🧑', ex: 'Э́то мой друг.', exEs: 'Este es mi amigo.' },
    { t: 'семья́', es: 'familia', e: '🏡', ex: 'Моя́ семья́ больша́я.', exEs: 'Mi familia es grande.' },
  ],
  phrases: [
    { t: 'У меня́ есть сестра́.', es: 'Tengo una hermana.' },
    { t: 'Э́то моя́ семья́.', es: 'Esta es mi familia.' },
    { t: 'У тебя́ есть брат?', es: '¿Tenés un hermano?' },
    { t: 'Как зову́т твою́ ма́му?', es: '¿Cómo se llama tu mamá?' },
    { t: 'Мой друг живёт в Москве́.', es: 'Mi amigo vive en Moscú.' },
  ],
  tips: [
    {
      after: 0,
      e: '🔁',
      title: 'Мой, моя́, моё: «mi» cambia',
      html: `<p>«Mi» se adapta al género de lo que nombrás: <span class="say" lang="ru">мой</span> con masculinos (<span class="say" lang="ru">мой брат</span>), <span class="say" lang="ru">моя́</span> con femeninos (<span class="say" lang="ru">моя́ сестра́</span>) y <span class="say" lang="ru">моё</span> con neutros.</p>
<p>Fijate que no depende de quién habla, sino de la palabra que viene después.</p>`,
    },
    {
      after: 1,
      e: '🤲',
      title: 'No existe «tener»: se dice «en mí hay»',
      html: `<p>Para decir que tenés algo, el ruso usa <span class="say" lang="ru">у меня́ есть</span>, que literalmente es «en mí hay».</p>
<p><span class="say" lang="ru">У меня́ есть брат.</span> → Tengo un hermano.</p>
<p>Para preguntar: <span class="say" lang="ru">У тебя́ есть сестра́?</span></p>`,
    },
    {
      after: 2,
      e: '👆',
      title: 'Э́то = «esto es»',
      html: `<p>Para presentar a alguien o algo se usa <span class="say" lang="ru">э́то</span>, y no hace falta ningún verbo «ser».</p>
<p><span class="say" lang="ru">Э́то мой друг.</span> → Este es mi amigo.</p>
<p><span class="say" lang="ru">Э́то моя́ семья́.</span> → Esta es mi familia.</p>`,
    },
  ],
};
