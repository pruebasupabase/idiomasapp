// Tema 7 de inglés: casa y vecindario. Las sesiones se arman solas con js/builder.js.
export default {
  id: 'en-t07',
  title: 'Home and neighborhood',
  emoji: '🏡',
  level: 'B1',
  goal: 'Describir donde vivís, hablar del alquiler y contar cómo es tu barrio.',
  words: [
    { t: 'apartment', es: 'departamento', e: '🏢', ex: 'I live in a small apartment.', exEs: 'Vivo en un departamento chico.' },
    { t: 'rent', es: 'alquiler', e: '💸', pic: false, ex: 'The rent is very high.', exEs: 'El alquiler es muy alto.' },
    { t: 'landlord', es: 'propietario', e: '🧑‍💼', pic: false, ex: 'My landlord lives downstairs.', exEs: 'Mi propietario vive abajo.' },
    { t: 'neighbor', es: 'vecino', e: '🏘️', pic: false, ex: 'My neighbors are friendly.', exEs: 'Mis vecinos son simpáticos.' },

    { t: 'furniture', es: 'muebles', e: '🛋️', ex: 'We need new furniture.', exEs: 'Necesitamos muebles nuevos.' },
    { t: 'kitchen', es: 'cocina', e: '🍳', ex: 'The kitchen is spacious.', exEs: 'La cocina es amplia.' },
    { t: 'bedroom', es: 'dormitorio', e: '🛏️', ex: 'I painted my bedroom blue.', exEs: 'Pinté mi dormitorio de azul.' },
    { t: 'bathroom', es: 'baño', e: '🚿', ex: 'The bathroom is upstairs.', exEs: 'El baño está arriba.' },

    { t: 'garden', es: 'jardín', e: '🌷', ex: 'We have a small garden.', exEs: 'Tenemos un jardín chico.' },
    { t: 'elevator', es: 'ascensor', e: '🛗', ex: 'The elevator is broken.', exEs: 'El ascensor está roto.' },
    { t: 'key', es: 'llave', e: '🔑', ex: 'I lost my key.', exEs: 'Perdí mi llave.' },
    { t: 'street', es: 'calle', e: '🛣️', ex: 'The street is very quiet.', exEs: 'La calle es muy tranquila.' },
  ],
  phrases: [
    { t: 'I live in a small apartment.', es: 'Vivo en un departamento chico.' },
    { t: 'How much is the rent?', es: '¿Cuánto es el alquiler?' },
    { t: "I'm moving next month.", es: 'Me mudo el mes que viene.' },
    { t: 'My neighbors are very friendly.', es: 'Mis vecinos son muy simpáticos.' },
    { t: 'Is it close to public transport?', es: '¿Queda cerca del transporte público?' },
  ],
  tips: [
    {
      after: 0,
      e: '🇬🇧',
      title: 'Apartment o flat',
      html: `<p>En Estados Unidos se dice <span class="say" lang="en">apartment</span> y en Reino Unido <span class="say" lang="en">flat</span>. Las dos son correctas.</p>
<p><span class="say" lang="en">I'm looking for a flat in London.</span></p>`,
    },
    {
      after: 1,
      e: '🛋️',
      title: 'Furniture es incontable',
      html: `<p>Igual que <span lang="en">luggage</span>, <span class="say" lang="en">furniture</span> no tiene plural. Para contar se usa <span class="say" lang="en">a piece of furniture</span>.</p>
<p><span class="say" lang="en">We bought some new furniture.</span> ✔</p>`,
    },
    {
      after: 2,
      e: '📦',
      title: 'Mudarse: move in, move out y move to',
      html: `<p><span class="say" lang="en">move in</span> = mudarse a un lugar, <span class="say" lang="en">move out</span> = irse de un lugar, <span class="say" lang="en">move to</span> + ciudad.</p>
<p><span class="say" lang="en">I'm moving out next week.</span> / <span class="say" lang="en">I moved to Córdoba in 2024.</span></p>`,
    },
  ],
  scenes: [
    {
      ctx: 'You visit an apartment for rent.',
      lines: [
        ['Landlord', 'Do you have any questions?', '¿Tiene alguna pregunta?'],
      ],
      ask: 'Preguntá cuánto es el alquiler.',
      options: ['How much is the rent?', 'How much costs the rent?', 'How many is the rent?'],
      answer: 0,
      alt: ['How much is the rent per month?'],
      why: 'How much + is se usa para precios y cantidades incontables.',
    },
    {
      ctx: 'The landlord describes the building.',
      lines: [
        ['Landlord', 'It\'s on the fifth floor.', 'Está en el quinto piso.'],
      ],
      ask: 'Preguntá si el edificio tiene ascensor.',
      options: ['Does the building have an elevator?', 'Do the building have an elevator?', 'Is the building have an elevator?'],
      answer: 0,
      alt: ['Is there an elevator in the building?', 'Does the building have a lift?'],
      why: 'Con building (tercera persona) se usa does + have.',
    },
    {
      ctx: 'A neighbor says hello in the hallway.',
      lines: [
        ['Neighbor', 'Hi! Are you the new neighbor?', '¡Hola! ¿Sos el nuevo vecino?'],
      ],
      ask: 'Decile que te mudaste ayer.',
      options: ['Yes, I moved in yesterday.', 'Yes, I moved yesterday in.', 'Yes, I move in yesterday.'],
      answer: 0,
      why: 'Move in es «mudarse a». Con yesterday va en pasado.',
    },
    {
      ctx: 'You are locked out.',
      lines: [
        ['Landlord', 'Hello? What\'s wrong?', '¿Hola? ¿Qué pasó?'],
      ],
      ask: 'Decile que perdiste la llave.',
      options: ['I lost my key.', 'I lose my key.', 'I have lost me key.'],
      answer: 0,
      alt: ['I\'ve lost my key.', 'I have lost my key.'],
      why: 'Lost es el pasado de lose, y my es «mi».',
    },
    {
      ctx: 'A neighbor asks about noise.',
      lines: [
        ['Neighbor', 'Is it noisy at night?', '¿Hay ruido de noche?'],
      ],
      ask: 'Decile que no, que la calle es muy tranquila.',
      options: ['No, the street is very quiet.', 'No, the street are very quiet.', 'No, the street is very quietly.'],
      answer: 0,
      alt: ['No, it\'s a very quiet street.'],
      why: 'Después de be va un adjetivo (quiet), no un adverbio.',
    },
  ],
};
