// Tema 8 de inglés: emociones y personalidad. Las sesiones se arman solas con js/builder.js.
export default {
  id: 'en-t08',
  title: 'Feelings and personality',
  emoji: '😊',
  level: 'B1',
  goal: 'Decir cómo te sentís y describir cómo es una persona sin quedarte corto de palabras.',
  words: [
    { t: 'happy', es: 'feliz', e: '😊', ex: 'I am really happy today.', exEs: 'Hoy estoy muy feliz.' },
    { t: 'sad', es: 'triste', e: '😢', ex: 'She looks sad.', exEs: 'Ella se ve triste.' },
    { t: 'angry', es: 'enojado', e: '😠', ex: 'He was angry about the delay.', exEs: 'Estaba enojado por la demora.' },
    { t: 'nervous', es: 'nervioso, ansioso', e: '😬', ex: 'I am nervous about the interview.', exEs: 'Estoy nervioso por la entrevista.' },

    { t: 'proud', es: 'orgulloso', e: '🏅', ex: 'I am proud of you.', exEs: 'Estoy orgulloso de vos.' },
    { t: 'excited', es: 'entusiasmado', e: '🤩', ex: 'We are excited about the trip.', exEs: 'Estamos entusiasmados con el viaje.' },
    { t: 'tired', es: 'cansado', e: '😴', ex: 'I am too tired to cook.', exEs: 'Estoy demasiado cansado para cocinar.' },
    { t: 'stressed', es: 'estresado', e: '😰', ex: 'He feels stressed at work.', exEs: 'Se siente estresado en el trabajo.' },

    { t: 'shy', es: 'tímido', e: '🙈', ex: 'She is a bit shy.', exEs: 'Ella es un poco tímida.' },
    { t: 'friendly', es: 'simpático, amigable', e: '🤗', ex: 'The staff were very friendly.', exEs: 'El personal fue muy amable.' },
    { t: 'funny', es: 'gracioso', e: '😂', ex: 'He is the funniest person I know.', exEs: 'Es la persona más graciosa que conozco.' },
    { t: 'reliable', es: 'confiable', e: '🤝', ex: 'She is a reliable colleague.', exEs: 'Es una compañera confiable.' },
  ],
  phrases: [
    { t: "I'm a bit nervous about tomorrow.", es: 'Estoy un poco nervioso por mañana.' },
    { t: "She's really easy to talk to.", es: 'Es muy fácil hablar con ella.' },
    { t: "I'm proud of you.", es: 'Estoy orgulloso de vos.' },
    { t: "Don't worry, it'll be fine.", es: 'No te preocupes, va a estar todo bien.' },
    { t: "I'm looking forward to it.", es: 'Tengo muchas ganas de que llegue.' },
  ],
  tips: [
    {
      after: 0,
      e: '🎢',
      title: '-ed o -ing: cómo te sentís y qué lo causa',
      html: `<p>La terminación <span class="say" lang="en">-ed</span> describe cómo te sentís vos: <span class="say" lang="en">I'm bored.</span> La terminación <span class="say" lang="en">-ing</span> describe lo que causa esa sensación: <span class="say" lang="en">The film is boring.</span></p>
<p><span class="say" lang="en">I'm excited.</span> / <span class="say" lang="en">The trip is exciting.</span></p>`,
    },
    {
      after: 1,
      e: '😬',
      title: 'Nervous no es «nervioso» de enojo',
      html: `<p>En español «nervioso» puede significar irritado. En inglés <span class="say" lang="en">nervous</span> es sentirse inquieto o con miedo, por ejemplo antes de un examen.</p>
<p>Para el enojo usá <span class="say" lang="en">angry</span> o <span class="say" lang="en">upset</span>.</p>`,
    },
    {
      after: 2,
      e: '🔜',
      title: 'Looking forward to + verbo en -ing',
      html: `<p>Después de <span class="say" lang="en">look forward to</span> va un sustantivo o un verbo con <span lang="en">-ing</span>, porque <span lang="en">to</span> es una preposición.</p>
<p><span class="say" lang="en">I'm looking forward to seeing you.</span> ✔</p>
<p><span lang="en">I'm looking forward to see you.</span> ✘</p>`,
    },
  ],
};
