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
    { t: 'subject', es: 'asunto', e: '📌', ex: 'Write a clear subject.', exEs: 'Escribí un asunto claro.' },
    { t: 'reply', es: 'responder', e: '↩️', ex: 'I will reply tomorrow.', exEs: 'Voy a responder mañana.' },

    { t: 'forward', es: 'reenviar', e: '➡️', ex: 'Please forward the email to me.', exEs: 'Por favor, reenviame el mail.' },
    { t: 'schedule', es: 'agendar', e: '🗓️', ex: 'Let us schedule a call.', exEs: 'Agendemos una llamada.' },
    { t: 'voicemail', es: 'mensaje de voz', e: '📼', ex: 'I left a voicemail.', exEs: 'Dejé un mensaje de voz.' },
    { t: 'invoice', es: 'factura', e: '🧾', ex: 'I will send the invoice today.', exEs: 'Hoy mando la factura.' },

    { t: 'reminder', es: 'recordatorio', e: '🔔', ex: 'This is a friendly reminder.', exEs: 'Este es un recordatorio amistoso.' },
    { t: 'available', es: 'disponible', e: '✅', ex: 'Are you available on Monday?', exEs: '¿Estás disponible el lunes?' },
    { t: 'urgent', es: 'urgente', e: '🚨', ex: 'This is urgent.', exEs: 'Esto es urgente.' },
    { t: 'follow up', es: 'dar seguimiento', e: '🔁', ex: 'I am writing to follow up.', exEs: 'Escribo para dar seguimiento.' },
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
};
