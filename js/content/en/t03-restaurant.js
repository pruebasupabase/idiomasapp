// Tema 3 de inglés: restaurante. Las sesiones se arman solas con js/builder.js.
export default {
  id: 'en-t03',
  title: 'At the restaurant',
  emoji: '🍽️',
  level: 'B1',
  goal: 'Pedir, preguntar por ingredientes y pagar la cuenta en un restaurante.',
  words: [
    { t: 'menu', es: 'carta, menú', e: '📜', pic: false, ex: 'Could I see the menu?', exEs: '¿Podría ver la carta?' },
    { t: 'waiter', es: 'mozo', e: '🤵', pic: false, ex: 'The waiter was very kind.', exEs: 'El mozo fue muy amable.' },
    { t: 'bill', es: 'cuenta', e: '🧾', ex: 'Could we have the bill?', exEs: '¿Nos trae la cuenta?' },
    { t: 'tip', es: 'propina', e: '💵', pic: false, ex: 'We left a good tip.', exEs: 'Dejamos una buena propina.' },

    { t: 'starter', es: 'entrada', e: '🥗', pic: false, ex: 'I will have a salad as a starter.', exEs: 'Voy a pedir una ensalada de entrada.' },
    { t: 'main course', es: 'plato principal', e: '🍝', pic: false, ex: 'The main course was delicious.', exEs: 'El plato principal estaba delicioso.' },
    { t: 'dessert', es: 'postre', e: '🍰', ex: 'Do you want dessert?', exEs: '¿Querés postre?' },
    { t: 'order', es: 'pedir, pedido', e: '📝', pic: false, ex: 'Are you ready to order?', exEs: '¿Están listos para pedir?' },

    { t: 'vegetarian', es: 'vegetariano', e: '🥦', pic: false, ex: 'Do you have vegetarian options?', exEs: '¿Tienen opciones vegetarianas?' },
    { t: 'spicy', es: 'picante', e: '🌶️', ex: 'This sauce is too spicy.', exEs: 'Esta salsa es demasiado picante.' },
    { t: 'allergic', es: 'alérgico', e: '🤧', pic: false, ex: 'I am allergic to nuts.', exEs: 'Soy alérgico a las nueces.' },
    { t: 'steak', es: 'bife', e: '🥩', ex: 'I like my steak medium.', exEs: 'Me gusta el bife a punto.' },
  ],
  phrases: [
    { t: 'Could we have the menu, please?', es: '¿Nos puede traer la carta, por favor?' },
    { t: "I'll have the chicken, please.", es: 'Voy a pedir el pollo, por favor.' },
    { t: 'Could we get the bill, please?', es: '¿Nos trae la cuenta, por favor?' },
    { t: "I'm allergic to nuts.", es: 'Soy alérgico a las nueces.' },
    { t: 'Is service included?', es: '¿Está incluido el servicio?' },
  ],
  tips: [
    {
      after: 0,
      e: '🧾',
      title: 'Bill o check, según el país',
      html: `<p>En Reino Unido se pide <span class="say" lang="en">the bill</span>; en Estados Unidos, <span class="say" lang="en">the check</span>. Las dos se entienden en todos lados.</p>
<p><span class="say" lang="en">Could we have the check, please?</span></p>`,
    },
    {
      after: 1,
      e: '🍴',
      title: "I'll have: la forma natural de pedir",
      html: `<p>Para pedir en el momento se usa <span class="say" lang="en">I'll have…</span> (voy a pedir…). Suena mucho más natural que <span lang="en">I want…</span>, que puede sonar brusco.</p>
<p><span class="say" lang="en">I'll have the soup, please.</span></p>`,
    },
    {
      after: 2,
      e: '🙏',
      title: 'Could y can para sonar amable',
      html: `<p><span class="say" lang="en">Could</span> es más educado que <span class="say" lang="en">can</span> al pedir algo.</p>
<p><span class="say" lang="en">Could I have some water, please?</span></p>
<p>Además de <span lang="en">please</span>, el tono de voz hace la mitad del trabajo.</p>`,
    },
  ],
  scenes: [
    {
      ctx: 'You sit down at a restaurant.',
      lines: [
        ['Waiter', 'Are you ready to order?', '¿Están listos para pedir?'],
      ],
      ask: 'Pedí el pollo.',
      options: ['Yes, I\'ll have the chicken, please.', 'Yes, I want chicken now.', 'Yes, give me the chicken.'],
      answer: 0,
      alt: ['Yes, I will have the chicken, please.'],
      why: 'I\'ll have… es la forma más natural y amable de pedir.',
    },
    {
      ctx: 'The waiter wants to be sure about your order.',
      lines: [
        ['Waiter', 'Do you have any allergies?', '¿Tiene alguna alergia?'],
      ],
      ask: 'Decile que sos alérgico a las nueces.',
      options: ['Yes, I\'m allergic to nuts.', 'Yes, I have allergic to nuts.', 'Yes, I am allergy of nuts.'],
      answer: 0,
      alt: ['Yes, I am allergic to nuts.'],
      why: 'Allergic es el adjetivo (alérgico); allergy es el sustantivo.',
    },
    {
      ctx: 'Your dish arrives and it is very hot.',
      lines: [
        ['Waiter', 'How is everything?', '¿Cómo está todo?'],
      ],
      ask: 'Decile que está un poco picante para vos.',
      options: ['It\'s a bit too spicy for me.', 'It\'s too much spicy for me.', 'It is spicy very.'],
      answer: 0,
      alt: ['It is a bit too spicy for me.'],
      why: 'A bit too + adjetivo suaviza una queja.',
    },
    {
      ctx: 'You finished your main course.',
      lines: [
        ['Waiter', 'Would you like dessert?', '¿Quieren postre?'],
      ],
      ask: 'Decile que no y pedí la cuenta.',
      options: ['No, thank you. Could we have the bill, please?', 'No, thanks. Give me the bill.', 'No, thank you. I want pay.'],
      answer: 0,
      alt: ['No, thanks. Could we get the bill, please?', 'No, thank you. Could we get the bill, please?'],
      why: 'Could we have…? suena amable y se usa para pedir la cuenta.',
    },
    {
      ctx: 'The waiter brings the wrong dish.',
      lines: [
        ['Waiter', 'Here is your fish.', 'Acá está su pescado.'],
      ],
      ask: 'Decile con educación que pediste pollo.',
      options: ['Excuse me, I ordered the chicken.', 'Excuse me, I have ordered chicken it.', 'Excuse me, this is not what I want it.'],
      answer: 0,
      alt: ['Excuse me, I ordered chicken.'],
      why: 'Excuse me suaviza el reclamo. Ordered va en pasado porque ya lo pediste.',
    },
  ],
};
