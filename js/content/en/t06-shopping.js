// Tema 6 de inglés: dinero y compras. Las sesiones se arman solas con js/builder.js.
export default {
  id: 'en-t06',
  title: 'Money and shopping',
  emoji: '💰',
  level: 'B1',
  goal: 'Preguntar precios, pagar, devolver algo y hablar de lo que podés o no podés comprar.',
  words: [
    { t: 'price', es: 'precio', e: '🏷️', ex: 'What is the price?', exEs: '¿Cuál es el precio?' },
    { t: 'discount', es: 'descuento', e: '🔖', pic: false, ex: 'Is there a discount?', exEs: '¿Hay descuento?' },
    { t: 'receipt', es: 'ticket, comprobante', e: '🧾', ex: 'Keep the receipt.', exEs: 'Guardá el ticket.' },
    { t: 'cash', es: 'efectivo', e: '💵', ex: 'I only have cash.', exEs: 'Solo tengo efectivo.' },

    { t: 'credit card', es: 'tarjeta de crédito', e: '💳', ex: 'Do you take credit cards?', exEs: '¿Aceptan tarjeta de crédito?' },
    { t: 'refund', es: 'reembolso', e: '↩️', pic: false, ex: 'I want a refund.', exEs: 'Quiero un reembolso.' },
    { t: 'cheap', es: 'barato', e: '🪙', pic: false, ex: 'This shirt is cheap.', exEs: 'Esta camisa es barata.' },
    { t: 'expensive', es: 'caro', e: '💎', pic: false, ex: 'That watch is expensive.', exEs: 'Ese reloj es caro.' },

    { t: 'afford', es: 'poder pagar', e: '⚖️', pic: false, ex: 'I cannot afford a new car.', exEs: 'No puedo pagar un auto nuevo.' },
    { t: 'size', es: 'talle', e: '📏', ex: 'What size are you?', exEs: '¿Qué talle sos?' },
    { t: 'bargain', es: 'ganga', e: '🤑', pic: false, ex: 'This jacket is a real bargain.', exEs: 'Esta campera es una verdadera ganga.' },
    { t: 'wallet', es: 'billetera', e: '👛', ex: 'I left my wallet at home.', exEs: 'Me olvidé la billetera en casa.' },
  ],
  phrases: [
    { t: 'How much does it cost?', es: '¿Cuánto cuesta?' },
    { t: 'Do you take credit cards?', es: '¿Aceptan tarjeta de crédito?' },
    { t: "I'd like a refund, please.", es: 'Quisiera un reembolso, por favor.' },
    { t: 'Can I try it on?', es: '¿Me lo puedo probar?' },
    { t: "It's out of my budget.", es: 'Está fuera de mi presupuesto.' },
  ],
  tips: [
    {
      after: 0,
      e: '💲',
      title: 'Cheap suena un poco despectivo',
      html: `<p><span class="say" lang="en">cheap</span> puede sugerir mala calidad. Para decir que algo es barato sin ofender, usá <span class="say" lang="en">inexpensive</span> o <span class="say" lang="en">affordable</span>.</p>
<p><span class="say" lang="en">It's a very affordable hotel.</span></p>`,
    },
    {
      after: 1,
      e: '⚖️',
      title: "Can't afford + to",
      html: `<p>Después de <span class="say" lang="en">afford</span> va <span lang="en">to</span> + verbo, o un sustantivo:</p>
<p><span class="say" lang="en">I can't afford to travel this year.</span></p>
<p><span class="say" lang="en">I can't afford a new phone.</span></p>`,
    },
    {
      after: 2,
      e: '🔢',
      title: 'How much y how many',
      html: `<p><span class="say" lang="en">How much</span> va con incontables y precios: <span class="say" lang="en">How much is it?</span> <span class="say" lang="en">How much money?</span></p>
<p><span class="say" lang="en">How many</span> va con cosas que se cuentan: <span class="say" lang="en">How many shirts do you need?</span></p>`,
    },
  ],
  scenes: [
    {
      ctx: 'You are paying at the register.',
      lines: [
        ['Cashier', 'Cash or card?', '¿Efectivo o tarjeta?'],
      ],
      ask: 'Decile que pagás con tarjeta.',
      options: ['Card, please.', 'With card, please I pay.', 'Card pay, please.'],
      answer: 0,
      alt: ['I\'ll pay by card.', 'I will pay by card.', 'I\'ll pay with a card.'],
      why: 'En el mostrador alcanza con decir la opción y please.',
    },
    {
      ctx: 'You walk into a shop.',
      lines: [
        ['Assistant', 'Can I help you?', '¿Puedo ayudarlo?'],
      ],
      ask: 'Decile que solo estás mirando.',
      options: ['I\'m just looking, thanks.', 'I\'m only seeing, thanks.', 'I just look it, thanks.'],
      answer: 0,
      alt: ['I am just looking, thank you.', 'I\'m just looking, thank you.'],
      why: 'I\'m just looking es la frase hecha para decir «solo estoy mirando».',
    },
    {
      ctx: 'You are trying on a jacket.',
      lines: [
        ['Assistant', 'How does it fit?', '¿Cómo te queda?'],
      ],
      ask: 'Decile que te queda chico y pedí un talle más grande.',
      options: ['It\'s too small. Do you have a bigger size?', 'It\'s too little. Do you have a more big size?', 'It\'s small too. Have you a big size?'],
      answer: 0,
      alt: ['It is too small. Do you have a bigger size?'],
      why: 'Bigger es el comparativo de big. Too small = demasiado chico.',
    },
    {
      ctx: 'The product has a defect.',
      lines: [
        ['Assistant', 'Is there a problem with it?', '¿Hay algún problema con eso?'],
      ],
      ask: 'Decile que querés un reembolso.',
      options: ['Yes, I\'d like a refund, please.', 'Yes, I want that you give me a refund.', 'Yes, I\'d like refund me, please.'],
      answer: 0,
      alt: ['Yes, I would like a refund, please.'],
      why: 'I\'d like a refund es la forma cortés de pedir.',
    },
    {
      ctx: 'You see an expensive watch.',
      lines: [
        ['Assistant', 'It\'s two hundred dollars.', 'Cuesta doscientos dólares.'],
      ],
      ask: 'Decile que está fuera de tu presupuesto.',
      options: ['That\'s out of my budget.', 'That\'s out of my pocket.', 'That\'s too much cheap.'],
      answer: 0,
      alt: ['That is out of my budget.'],
      why: 'Out of my budget es la frase natural para decir que no podés pagarlo.',
    },
  ],
};
