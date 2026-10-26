// Tema 5 de ruso: la ciudad y el transporte. Las sesiones se arman solas con js/builder.js.
export default {
  id: 'ru-t05',
  title: 'La ciudad y el transporte',
  emoji: '🏙️',
  level: 'A1',
  goal: 'Preguntar dónde queda algo y entender indicaciones simples.',
  words: [
    { t: 'го́род', es: 'ciudad', e: '🏙️', ex: 'Э́то большо́й го́род.', exEs: 'Es una ciudad grande.' },
    { t: 'у́лица', es: 'calle', e: '🛣️', ex: 'Э́то моя́ у́лица.', exEs: 'Esta es mi calle.' },
    { t: 'метро́', es: 'metro', e: '🚇', ex: 'Где метро́?', exEs: '¿Dónde está el metro?' },
    { t: 'авто́бус', es: 'colectivo', e: '🚌', ex: 'Я е́ду на авто́бусе.', exEs: 'Voy en colectivo.' },

    { t: 'такси́', es: 'taxi', e: '🚕', ex: 'Такси́ здесь.', exEs: 'El taxi está acá.' },
    { t: 'магази́н', es: 'tienda', e: '🏪', ex: 'Магази́н закры́т.', exEs: 'La tienda está cerrada.' },
    { t: 'апте́ка', es: 'farmacia', e: '💊', ex: 'Апте́ка о́чень бли́зко.', exEs: 'La farmacia está muy cerca.' },
    { t: 'банк', es: 'banco', e: '🏦', ex: 'Банк там.', exEs: 'El banco está allá.' },

    { t: 'парк', es: 'parque', e: '🌳', ex: 'Парк большо́й.', exEs: 'El parque es grande.' },
    { t: 'шко́ла', es: 'escuela', e: '🏫', ex: 'Шко́ла но́вая.', exEs: 'La escuela es nueva.' },
    { t: 'больни́ца', es: 'hospital', e: '🏥', ex: 'Больни́ца далеко́.', exEs: 'El hospital queda lejos.' },
    { t: 'вокза́л', es: 'estación de tren', e: '🚉', ex: 'Вокза́л спра́ва.', exEs: 'La estación queda a la derecha.' },
  ],
  phrases: [
    { t: 'Где здесь апте́ка?', es: '¿Dónde hay una farmacia por acá?' },
    { t: 'Как дойти́ до вокза́ла?', es: '¿Cómo llego a la estación?' },
    { t: 'Э́то далеко́?', es: '¿Queda lejos?' },
    { t: 'Пря́мо, пото́м напра́во.', es: 'Derecho, y después a la derecha.' },
    { t: 'Мне на́до на вокза́л.', es: 'Tengo que ir a la estación.' },
  ],
  tips: [
    {
      after: 0,
      e: '📍',
      title: 'Где y куда́: dónde y adónde',
      html: `<p>En ruso se distingue entre estar en un lugar y moverse hacia él.</p>
<p><span class="say" lang="ru">Где?</span> → ¿Dónde? (estás). <span class="say" lang="ru">Куда́?</span> → ¿Adónde? (vas).</p>
<p><span class="say" lang="ru">Где банк?</span> — ¿Dónde está el banco?</p>`,
    },
    {
      after: 1,
      e: '🧭',
      title: 'Direcciones básicas',
      html: `<p>Tres palabras que te sacan de un apuro: <span class="say" lang="ru">пря́мо</span> (derecho), <span class="say" lang="ru">напра́во</span> (a la derecha) y <span class="say" lang="ru">нале́во</span> (a la izquierda).</p>
<p><span class="say" lang="ru">Пря́мо, пото́м нале́во.</span></p>`,
    },
    {
      after: 2,
      e: '🚏',
      title: 'Е́хать: ir en un vehículo',
      html: `<p>Cuando vas en transporte se usa <span class="say" lang="ru">е́хать</span>: <span class="say" lang="ru">я е́ду</span>, <span class="say" lang="ru">ты е́дешь</span>.</p>
<p><span class="say" lang="ru">Я е́ду на авто́бусе.</span> → Voy en colectivo. Para ir caminando se usa otro verbo, que vemos más adelante.</p>`,
    },
  ],
};
