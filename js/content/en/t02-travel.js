// Tema 2 de inglés: viajes y aeropuertos. Las sesiones se arman solas con js/builder.js.
export default {
  id: 'en-t02',
  title: 'Travel and airports',
  emoji: '✈️',
  level: 'B1',
  goal: 'Moverte por un aeropuerto, reservar un hotel y resolver imprevistos al viajar.',
  words: [
    { t: 'flight', es: 'vuelo', e: '✈️', ex: 'My flight leaves at six.', exEs: 'Mi vuelo sale a las seis.' },
    { t: 'ticket', es: 'pasaje, entrada', e: '🎫', ex: 'I bought the ticket online.', exEs: 'Compré el pasaje por internet.' },
    { t: 'passport', es: 'pasaporte', e: '🛂', ex: 'Please show your passport.', exEs: 'Por favor, muestre su pasaporte.' },
    { t: 'luggage', es: 'equipaje', e: '🧳', ex: 'My luggage is heavy.', exEs: 'Mi equipaje pesa mucho.' },

    { t: 'boarding pass', es: 'tarjeta de embarque', e: '🪪', pic: false, ex: 'I lost my boarding pass.', exEs: 'Perdí mi tarjeta de embarque.' },
    { t: 'gate', es: 'puerta de embarque', e: '🚪', pic: false, ex: 'Go to gate twelve.', exEs: 'Andá a la puerta doce.' },
    { t: 'delay', es: 'demora', e: '⏳', pic: false, ex: 'There is a two-hour delay.', exEs: 'Hay una demora de dos horas.' },
    { t: 'customs', es: 'aduana', e: '🛃', pic: false, ex: 'We waited at customs.', exEs: 'Esperamos en la aduana.' },

    { t: 'hotel', es: 'hotel', e: '🏨', ex: 'The hotel is near the beach.', exEs: 'El hotel está cerca de la playa.' },
    { t: 'booking', es: 'reserva', e: '📖', pic: false, ex: 'I have a booking for tonight.', exEs: 'Tengo una reserva para esta noche.' },
    { t: 'map', es: 'mapa', e: '🗺️', ex: 'Can I see the map?', exEs: '¿Puedo ver el mapa?' },
    { t: 'tourist', es: 'turista', e: '📷', pic: false, ex: 'Many tourists visit in summer.', exEs: 'Muchos turistas visitan en verano.' },
  ],
  phrases: [
    { t: 'Where is the check-in desk?', es: '¿Dónde está el mostrador de check-in?' },
    { t: 'My flight has been delayed.', es: 'Mi vuelo se retrasó.' },
    { t: "I'd like to book a room for two nights.", es: 'Quisiera reservar una habitación por dos noches.' },
    { t: 'Is breakfast included?', es: '¿El desayuno está incluido?' },
    { t: 'Could you tell me how to get to the station?', es: '¿Podría decirme cómo llegar a la estación?' },
  ],
  tips: [
    {
      after: 0,
      e: '🧳',
      title: 'Luggage no tiene plural',
      html: `<p><span class="say" lang="en">luggage</span> es incontable, igual que <span lang="en">baggage</span>: no se dice «luggages». Para contar, usás <span class="say" lang="en">a piece of luggage</span> o <span class="say" lang="en">two bags</span>.</p>
<p><span class="say" lang="en">My luggage is lost.</span> ✔</p>`,
    },
    {
      after: 1,
      e: '🙋',
      title: 'Preguntar con educación: «Could you tell me…?»',
      html: `<p>Cuando pedís información, la pregunta indirecta suena más amable y <b>no lleva inversión</b>: el verbo queda en orden normal.</p>
<p><span class="say" lang="en">Could you tell me where the gate is?</span> ✔</p>
<p><span lang="en">Could you tell me where is the gate?</span> ✘</p>`,
    },
    {
      after: 2,
      e: '🏨',
      title: 'Book y reserve',
      html: `<p>En un hotel o restaurante se usa <span class="say" lang="en">book</span> (reservar): <span class="say" lang="en">I booked a room.</span> El sustantivo es <span class="say" lang="en">a booking</span> o <span class="say" lang="en">a reservation</span>.</p>
<p>«Pasaje» de avión se dice <span class="say" lang="en">a flight ticket</span>; <span lang="en">pasaje</span> como trayecto sería <span lang="en">a trip</span>.</p>`,
    },
  ],
  scenes: [
    {
      ctx: 'You arrive at the check-in desk.',
      lines: [
        ['Agent', 'Good morning. Can I see your passport?', 'Buen día. ¿Puedo ver su pasaporte?'],
      ],
      ask: 'Dáselo con educación.',
      options: ['Sure, here you are.', 'No, I don\'t have it.', 'Yes, it is a flight.'],
      answer: 0,
      alt: ['Sure, here it is.', 'Of course, here you are.'],
      why: 'Here you are es lo que se dice al entregar algo.',
    },
    {
      ctx: 'Your flight is not leaving on time.',
      lines: [
        ['Announcement', 'Flight 204 has been delayed by two hours.', 'El vuelo 204 se retrasó dos horas.'],
      ],
      ask: 'Preguntale al empleado a qué hora sale ahora.',
      options: ['What time does it leave now?', 'What time is leaving now?', 'When it is the delay?'],
      answer: 0,
      alt: ['What time will it leave now?'],
      why: 'En una pregunta con what time se usa does + sujeto + verbo base.',
    },
    {
      ctx: 'You arrive at your hotel.',
      lines: [
        ['Receptionist', 'Welcome! Do you have a reservation?', '¡Bienvenido! ¿Tiene una reserva?'],
      ],
      ask: 'Decile que tenés una reserva a nombre de Moran.',
      options: ['Yes, I have a booking under Moran.', 'Yes, I have a booking by Moran\'s name.', 'Yes, I booked a reservation to Moran.'],
      answer: 0,
      alt: ['Yes, I have a reservation under Moran.'],
      why: 'Under + apellido es la forma natural de decir «a nombre de».',
    },
    {
      ctx: 'You are at the baggage claim and nothing arrives.',
      lines: [
        ['Agent', 'How can I help you?', '¿En qué puedo ayudarlo?'],
      ],
      ask: 'Decile que tu equipaje no llegó.',
      options: ['My luggage hasn\'t arrived.', 'My luggage didn\'t arrive me.', 'My luggages haven\'t arrived.'],
      answer: 0,
      alt: ['My luggage has not arrived.', 'My luggage didn\'t arrive.'],
      why: 'Luggage es incontable: no lleva plural.',
    },
    {
      ctx: 'A tourist stops you on the street.',
      lines: [
        ['Tourist', 'Excuse me, how do I get to the station?', 'Disculpe, ¿cómo llego a la estación?'],
      ],
      ask: 'Decile que no sos de acá.',
      options: ['Sorry, I\'m not from here.', 'Sorry, I\'m not of here.', 'Sorry, I don\'t from here.'],
      answer: 0,
      alt: ['Sorry, I am not from here.'],
      why: 'Be from + lugar se usa para decir de dónde sos.',
    },
  ],
};
