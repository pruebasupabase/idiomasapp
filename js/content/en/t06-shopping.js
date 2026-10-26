// Tema 6 de inglés: dinero y compras. Las sesiones se arman solas con js/builder.js.
export default {
  id: 'en-t06',
  title: 'Money and shopping',
  emoji: '💰',
  level: 'B1',
  goal: 'Preguntar precios, pagar, devolver algo y hablar de lo que podés o no podés comprar.',
  words: [
    { t: 'price', es: 'precio', e: '🏷️', ex: 'What is the price?', exEs: '¿Cuál es el precio?' },
    { t: 'discount', es: 'descuento', e: '🔖', ex: 'Is there a discount?', exEs: '¿Hay descuento?' },
    { t: 'receipt', es: 'ticket, comprobante', e: '🧾', ex: 'Keep the receipt.', exEs: 'Guardá el ticket.' },
    { t: 'cash', es: 'efectivo', e: '💵', ex: 'I only have cash.', exEs: 'Solo tengo efectivo.' },

    { t: 'credit card', es: 'tarjeta de crédito', e: '💳', ex: 'Do you take credit cards?', exEs: '¿Aceptan tarjeta de crédito?' },
    { t: 'refund', es: 'reembolso', e: '↩️', ex: 'I want a refund.', exEs: 'Quiero un reembolso.' },
    { t: 'cheap', es: 'barato', e: '🪙', ex: 'This shirt is cheap.', exEs: 'Esta camisa es barata.' },
    { t: 'expensive', es: 'caro', e: '💎', ex: 'That watch is expensive.', exEs: 'Ese reloj es caro.' },

    { t: 'afford', es: 'poder pagar', e: '⚖️', ex: 'I cannot afford a new car.', exEs: 'No puedo pagar un auto nuevo.' },
    { t: 'size', es: 'talle', e: '📏', ex: 'What size are you?', exEs: '¿Qué talle sos?' },
    { t: 'bargain', es: 'ganga', e: '🤑', ex: 'This jacket is a real bargain.', exEs: 'Esta campera es una verdadera ganga.' },
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
};
