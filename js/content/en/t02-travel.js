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

    { t: 'boarding pass', es: 'tarjeta de embarque', e: '🪪', ex: 'I lost my boarding pass.', exEs: 'Perdí mi tarjeta de embarque.' },
    { t: 'gate', es: 'puerta de embarque', e: '🚪', ex: 'Go to gate twelve.', exEs: 'Andá a la puerta doce.' },
    { t: 'delay', es: 'demora', e: '⏳', ex: 'There is a two-hour delay.', exEs: 'Hay una demora de dos horas.' },
    { t: 'customs', es: 'aduana', e: '🛃', ex: 'We waited at customs.', exEs: 'Esperamos en la aduana.' },

    { t: 'hotel', es: 'hotel', e: '🏨', ex: 'The hotel is near the beach.', exEs: 'El hotel está cerca de la playa.' },
    { t: 'booking', es: 'reserva', e: '📖', ex: 'I have a booking for tonight.', exEs: 'Tengo una reserva para esta noche.' },
    { t: 'map', es: 'mapa', e: '🗺️', ex: 'Can I see the map?', exEs: '¿Puedo ver el mapa?' },
    { t: 'tourist', es: 'turista', e: '📷', ex: 'Many tourists visit in summer.', exEs: 'Muchos turistas visitan en verano.' },
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
};
