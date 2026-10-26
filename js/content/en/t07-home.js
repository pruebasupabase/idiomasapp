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
};
