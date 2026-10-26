// Tema 9 de inglés: mails y llamadas de trabajo. Las sesiones se arman solas con js/builder.js.
export default {
  id: 'en-t09',
  title: 'Emails and calls',
  emoji: '📧',
  level: 'B1',
  goal: 'Escribir un mail profesional, coordinar una llamada y hacer seguimiento sin sonar brusco.',
  words: [
    { t: 'email', es: 'correo electrónico', e: '📧', ex: 'I sent you an email.', exEs: 'Te mandé un mail.' },
    { t: 'attachment', es: 'archivo adjunto', e: '📎', ex: 'See the attachment.', exEs: 'Mirá el archivo adjunto.' },
    { t: 'subject', es: 'asunto', e: '📌', pic: false, ex: 'Write a clear subject.', exEs: 'Escribí un asunto claro.' },
    { t: 'reply', es: 'responder', e: '↩️', pic: false, ex: 'I will reply tomorrow.', exEs: 'Voy a responder mañana.' },

    { t: 'forward', es: 'reenviar', e: '➡️', pic: false, ex: 'Please forward the email to me.', exEs: 'Por favor, reenviame el mail.' },
    { t: 'schedule', es: 'agendar', e: '🗓️', pic: false, ex: 'Let us schedule a call.', exEs: 'Agendemos una llamada.' },
    { t: 'voicemail', es: 'mensaje de voz', e: '📼', pic: false, ex: 'I left a voicemail.', exEs: 'Dejé un mensaje de voz.' },
    { t: 'invoice', es: 'factura', e: '🧾', ex: 'I will send the invoice today.', exEs: 'Hoy mando la factura.' },

    { t: 'reminder', es: 'recordatorio', e: '🔔', ex: 'This is a friendly reminder.', exEs: 'Este es un recordatorio amistoso.' },
    { t: 'available', es: 'disponible', e: '✅', pic: false, ex: 'Are you available on Monday?', exEs: '¿Estás disponible el lunes?' },
    { t: 'urgent', es: 'urgente', e: '🚨', ex: 'This is urgent.', exEs: 'Esto es urgente.' },
    { t: 'follow up', es: 'dar seguimiento', e: '🔁', pic: false, ex: 'I am writing to follow up.', exEs: 'Escribo para dar seguimiento.' },
  ],
  phrases: [
    { t: 'Please find the attachment.', es: 'Adjunto el archivo.' },
    { t: "I'm writing to follow up on my last email.", es: 'Te escribo para dar seguimiento a mi último mail.' },
    { t: 'Could we schedule a call for Monday?', es: '¿Podemos agendar una llamada para el lunes?' },
    { t: 'Thanks for getting back to me.', es: 'Gracias por responderme.' },
    { t: 'I look forward to hearing from you.', es: 'Quedo a la espera de tu respuesta.' },
  ],
  tips: [
    {
      after: 0,
      e: '✉️',
      title: 'Cómo empezar y cerrar un mail',
      html: `<p>Para abrir: <span class="say" lang="en">Hi Anna,</span> (informal) o <span class="say" lang="en">Dear Mr. Smith,</span> (formal).</p>
<p>Para cerrar: <span class="say" lang="en">Best regards,</span> o <span class="say" lang="en">Kind regards,</span> y tu nombre.</p>`,
    },
    {
      after: 1,
      e: '📨',
      title: 'Una frase hecha que se usa todo el tiempo',
      html: `<p><span class="say" lang="en">Please find attached…</span> es la forma estándar de decir «te adjunto». Se escribe tal cual.</p>
<p><span class="say" lang="en">Please find attached the invoice for March.</span></p>`,
    },
    {
      after: 2,
      e: '☎️',
      title: 'Suavizar un pedido urgente',
      html: `<p>Cuando necesitás algo rápido, suavizalo con <span class="say" lang="en">as soon as possible</span> o <span class="say" lang="en">when you get a chance</span>, en lugar de pedirlo a secas.</p>
<p><span class="say" lang="en">Could you send it over as soon as possible?</span></p>`,
    },
  ],
  scenes: [
    {
      ctx: 'A coworker follows up on a message.',
      lines: [
        ['Colleague', 'Did you get my email?', '¿Te llegó mi mail?'],
      ],
      ask: 'Decile que sí y que respondés mañana.',
      options: ['Yes, I\'ll reply tomorrow.', 'Yes, I\'ll response to you tomorrow.', 'Yes, I reply to it tomorrow I will.'],
      answer: 0,
      alt: ['Yes, I will reply tomorrow.'],
      why: 'Reply es el verbo (responder). Response es el sustantivo.',
    },
    {
      ctx: 'A client asks for a document.',
      lines: [
        ['Client', 'Could you send me the invoice?', '¿Podés mandarme la factura?'],
      ],
      ask: 'Respondé que la factura está adjunta.',
      options: ['Please find the invoice attached.', 'Please find attached the invoice you.', 'Please find the invoice attach.'],
      answer: 0,
      alt: ['Please find attached the invoice.'],
      why: 'Please find attached es la frase estándar de los mails de trabajo.',
    },
    {
      ctx: 'A colleague calls to arrange a meeting.',
      lines: [
        ['Colleague', 'Are you available on Monday?', '¿Estás disponible el lunes?'],
      ],
      ask: 'Decile que sí, a las diez.',
      options: ['Yes, I\'m available at ten.', 'Yes, I\'m available in the ten.', 'Yes, I\'m free to ten hours.'],
      answer: 0,
      alt: ['Yes, I am available at ten.'],
      why: 'Con horas se usa at. Available at ten = disponible a las diez.',
    },
    {
      ctx: 'Your boss wants an update.',
      lines: [
        ['Boss', 'Did the client answer?', '¿Respondió el cliente?'],
      ],
      ask: 'Decile que todavía no y que vas a hacer seguimiento hoy.',
      options: ['Not yet. I\'ll follow up today.', 'No yet. I\'ll follow up it today.', 'Not yet. I\'ll follow today up him.'],
      answer: 0,
      alt: ['Not yet, I\'ll follow up today.', 'Not yet. I will follow up today.'],
      why: 'Follow up es un phrasal verb que significa dar seguimiento.',
    },
    {
      ctx: 'You reach a voicemail.',
      lines: [
        ['Voicemail', 'Please leave a message after the tone.', 'Deje un mensaje después de la señal.'],
      ],
      ask: 'Decí que llamás por la reunión y pedí que te devuelvan la llamada.',
      options: ['Hi, I\'m calling about the meeting. Please call me back.', 'Hi, I call for the meeting. Please call me again back.', 'Hi, I\'m calling for about the meeting. Please you call me.'],
      answer: 0,
      alt: ['Hello, I\'m calling about the meeting. Please call me back.'],
      why: 'Call back significa devolver una llamada.',
    },
  ],
};
