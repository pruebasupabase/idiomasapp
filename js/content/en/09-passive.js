export default {
  id: 'en-09',
  title: 'The passive voice',
  level: 'B2',
  minutes: 35,
  goal: 'Formar la voz pasiva en todos los tiempos, decidir cuándo conviene usarla y usar have something done y la pasiva con verbos de opinión.',
  theory: `
<p>En la voz activa, el sujeto hace la acción (<span lang="en">Thieves stole my car</span>). En la pasiva, el foco pasa a lo que recibe la acción (<span lang="en">My car was stolen</span>). Se usa cuando <mark>quien hace la acción no importa, no se sabe o es obvio</mark>, y en textos formales y científicos.</p>

<h3>Cómo se forma</h3>
<p><b>be (en el tiempo que corresponda) + participio pasado.</b> El objeto de la activa pasa a ser sujeto, y el agente (si se menciona) va con <span lang="en">by</span>.</p>
<div class="table-wrap"><table>
<thead><tr><th>Tiempo</th><th>Activa</th><th>Pasiva</th></tr></thead>
<tbody>
<tr><td>Present simple</td><td>They make cars here.</td><td><span class="say" lang="en">Cars are made here.</span></td></tr>
<tr><td>Past simple</td><td>Someone stole my phone.</td><td><span class="say" lang="en">My phone was stolen.</span></td></tr>
<tr><td>Present continuous</td><td>They are building a bridge.</td><td><span class="say" lang="en">A bridge is being built.</span></td></tr>
<tr><td>Present perfect</td><td>They have cancelled the flight.</td><td><span class="say" lang="en">The flight has been cancelled.</span></td></tr>
<tr><td>Past perfect</td><td>They had closed the shop.</td><td><span class="say" lang="en">The shop had been closed.</span></td></tr>
<tr><td>Future (will)</td><td>They will announce the results.</td><td><span class="say" lang="en">The results will be announced.</span></td></tr>
<tr><td>Modals</td><td>You must finish this.</td><td><span class="say" lang="en">This must be finished.</span></td></tr>
</tbody></table></div>

<h3>Cuándo usar by</h3>
<p>Solo si el agente aporta información: <span class="say" lang="en">The novel was written by Borges.</span> Si no importa o es obvio, se omite: <span class="say" lang="en">The window was broken.</span></p>
<aside class="note"><p>No todos los verbos admiten pasiva: los intransitivos no tienen objeto, así que no pueden pasar (<span lang="en">The accident happened</span>; no existe «was happened»). Tampoco <span lang="en">have</span> (poseer) ni <span lang="en">fit</span>.</p></aside>

<h3>Dos objetos</h3>
<p>Verbos como <span lang="en">give, send, show, offer</span> tienen dos pasivas posibles: <span class="say" lang="en">I was given a book.</span> (más natural) y <span class="say" lang="en">A book was given to me.</span></p>

<h3>Have something done</h3>
<p>Cuando otra persona hace un servicio por vos: <b>have + objeto + participio</b>. <span class="say" lang="en">I had my hair cut yesterday.</span> · <span class="say" lang="en">She is having her house painted.</span> · <span class="say" lang="en">We need to have the car repaired.</span> Diferencia con la activa: <span lang="en">I cut my hair</span> (yo mismo) frente a <span lang="en">I had my hair cut</span> (otro lo hizo).</p>

<h3>Pasiva impersonal con verbos de opinión</h3>
<p>Muy usada en noticias: <span class="say" lang="en">It is said that…</span> / <span class="say" lang="en">He is said to be rich.</span> · <span class="say" lang="en">It is believed that the fire started at night.</span> · <span class="say" lang="en">The company is expected to grow.</span></p>
`,
  vocab: [
    { t: 'steal', es: 'robar', ex: 'My bike was stolen.', exEs: 'Me robaron la bici.' },
    { t: 'build', es: 'construir', ex: 'The bridge was built in 1950.', exEs: 'El puente se construyó en 1950.' },
    { t: 'cancel', es: 'cancelar', ex: 'The flight was cancelled.', exEs: 'Cancelaron el vuelo.' },
    { t: 'announce', es: 'anunciar', ex: 'The results will be announced.', exEs: 'Se anunciarán los resultados.' },
    { t: 'repair', es: 'reparar', ex: 'I had my phone repaired.', exEs: 'Hice reparar mi celular.' },
    { t: 'invent', es: 'inventar', ex: 'The telephone was invented in 1876.', exEs: 'El teléfono se inventó en 1876.' },
    { t: 'publish', es: 'publicar', ex: 'The book was published last year.', exEs: 'El libro se publicó el año pasado.' },
    { t: 'damage', es: 'dañar; daño', ex: 'The car was badly damaged.', exEs: 'El auto quedó muy dañado.' },
    { t: 'responsible', es: 'responsable', ex: 'Who is responsible?', exEs: '¿Quién es el responsable?' },
    { t: 'according to', es: 'según', ex: 'According to the news, it is true.', exEs: 'Según las noticias, es verdad.' },
    { t: 'be said to', es: 'se dice que', ex: 'He is said to be rich.', exEs: 'Se dice que es rico.' },
    { t: 'haircut', es: 'corte de pelo', ex: 'I need a haircut.', exEs: 'Necesito un corte de pelo.' },
  ],
  exercises: [
    { type: 'fill', q: 'My phone ___ stolen yesterday. (be, past)', answer: ['was'] },
    { type: 'fill', q: 'Cars ___ made here. (be, present)', answer: ['are'] },
    { type: 'fill', q: 'A bridge is being ___. (build)', answer: ['built'] },
    { type: 'fill', q: 'The flight has been ___. (cancel)', answer: ['cancelled', 'canceled'] },
    { type: 'fill', q: 'The results will ___ announced tomorrow. (be)', answer: ['be'] },
    { type: 'fill', q: 'I had my hair ___ yesterday. (cut)', answer: ['cut'] },
    { type: 'mc', q: '"The accident ___ last night."', options: ['was happened', 'happened', 'has been happened', 'was happening by'], answer: 1, explain: 'Happen es intransitivo: no tiene pasiva.' },
    { type: 'mc', q: 'La pasiva de «They are building a bridge» es…', options: ['A bridge is built.', 'A bridge is being built.', 'A bridge was building.', 'A bridge has built.'], answer: 1 },
    { type: 'mc', q: '¿Cuál significa que otra persona arregló tu auto?', options: ['I repaired my car.', 'I had my car repaired.', 'I was repaired my car.', 'My car repaired.'], answer: 1 },
    { type: 'tr', q: 'El libro fue escrito por Borges.', answer: ['The book was written by Borges.', 'The novel was written by Borges.'] },
    { type: 'tr', q: 'Me robaron la billetera.', answer: ['My wallet was stolen.', 'My wallet has been stolen.', 'I had my wallet stolen.'] },
    { type: 'tr', q: 'Se dice que es muy rico.', answer: ['He is said to be very rich.', 'It is said that he is very rich.'] },
    { type: 'tr', dir: 't>es', q: 'The results will be announced next week.', answer: ['Los resultados se anunciarán la semana próxima.', 'Los resultados serán anunciados la semana próxima.', 'Los resultados se anunciarán la semana que viene.', 'Los resultados serán anunciados la semana que viene.', 'Los resultados se anunciarán la semana próxima.'] },
    { type: 'order', q: 'Hay que terminar esto hoy.', answer: 'This must be finished today.', extra: ['been'] },
    { type: 'listen', audio: 'The telephone was invented in eighteen seventy six', answer: ['The telephone was invented in 1876', 'The telephone was invented in eighteen seventy six'], instruction: 'Escuchá y escribí la frase (podés usar cifras).' },
    { type: 'speak', text: 'The bridge was built in 1950 and is still used today.', es: 'El puente se construyó en 1950 y todavía se usa hoy.' },
  ],
};
