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
};
