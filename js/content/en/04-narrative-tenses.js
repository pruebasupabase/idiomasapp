export default {
  id: 'en-04',
  title: 'Narrative tenses and used to / would',
  level: 'B1',
  minutes: 35,
  goal: 'Contar una historia combinando past simple, past continuous y past perfect, y hablar de hábitos pasados con used to y would.',
  theory: `
<p>Para contar una historia en inglés se combinan tres tiempos, cada uno con su función. Pensalo como una película: el <b>fondo</b>, la <b>acción</b> y el <b>flashback</b>.</p>

<h3>Los tres tiempos de la narración</h3>
<div class="table-wrap"><table>
<thead><tr><th>Tiempo</th><th>Función</th><th>Ejemplo</th></tr></thead>
<tbody>
<tr><td><b>Past continuous</b><br>was / were + -ing</td><td>El escenario: lo que estaba pasando, en proceso</td><td><span class="say" lang="en">It was raining and people were running.</span></td></tr>
<tr><td><b>Past simple</b></td><td>Las acciones principales de la historia, en orden</td><td><span class="say" lang="en">Suddenly, a car stopped.</span></td></tr>
<tr><td><b>Past perfect</b><br>had + participio</td><td>Lo que ocurrió antes de la historia (flashback)</td><td><span class="say" lang="en">The driver had lost his way.</span></td></tr>
</tbody></table></div>
<p>Una historia completa: <span class="say" lang="en">I was walking home when I saw a man who looked lost. He had been standing there for an hour, so I asked if he needed help.</span></p>

<h3>While y when</h3>
<p>Con <span class="say" lang="en">while</span> va la acción larga (continuous): <span lang="en">While I was cooking, the phone rang.</span> Con <span class="say" lang="en">when</span> va una acción corta que interrumpe: <span lang="en">I was cooking when the phone rang.</span> Si dos acciones cortas se suceden, past simple en ambas: <span lang="en">When the phone rang, I answered it.</span></p>
<aside class="note"><p>Los verbos de estado (<span lang="en">know, believe, want, like</span>) casi nunca van en continuous, tampoco en el pasado: <span lang="en">I didn't know</span>, no «I wasn't knowing».</p></aside>

<h3>Used to y would: hábitos pasados</h3>
<p><span class="say" lang="en">used to</span> + infinitivo describe costumbres o estados que ya no existen. Sirve tanto para acciones como para estados:</p>
<p><span class="say" lang="en">I used to play football every weekend.</span> · <span class="say" lang="en">She used to live in Rosario.</span> · <span class="say" lang="en">Did you use to smoke?</span> · <span class="say" lang="en">I didn't use to like coffee.</span></p>
<p><span class="say" lang="en">would</span> + infinitivo también habla de hábitos pasados, pero <mark>solo de acciones repetidas</mark>, nunca de estados: <span lang="en">When I was a child, we would visit my grandmother every Sunday.</span> Con estados hay que usar used to: <span lang="en">I used to be shy</span> (no «I would be shy»).</p>

<h3>Be used to / get used to</h3>
<p>No confundir: <span class="say" lang="en">be used to + -ing</span> significa «estar acostumbrado»: <span lang="en">I'm used to waking up early.</span> <span class="say" lang="en">get used to + -ing</span> es «acostumbrarse»: <span lang="en">I'm getting used to the cold.</span></p>
`,
  vocab: [
    { t: 'suddenly', es: 'de repente', ex: 'Suddenly, the lights went out.', exEs: 'De repente, se cortó la luz.' },
    { t: 'meanwhile', es: 'mientras tanto', ex: 'Meanwhile, I was waiting outside.', exEs: 'Mientras tanto, yo esperaba afuera.' },
    { t: 'at that moment', es: 'en ese momento', ex: 'At that moment, the phone rang.', exEs: 'En ese momento sonó el teléfono.' },
    { t: 'finally', es: 'finalmente', ex: 'Finally, we arrived.', exEs: 'Finalmente llegamos.' },
    { t: 'eventually', es: 'al final, con el tiempo', ex: 'Eventually, he found a job.', exEs: 'Con el tiempo, consiguió trabajo.' },
    { t: 'used to', es: 'solía', ex: 'I used to live near the sea.', exEs: 'Yo vivía cerca del mar.' },
    { t: 'get used to', es: 'acostumbrarse a', ex: 'I am getting used to the weather.', exEs: 'Me estoy acostumbrando al clima.' },
    { t: 'as a child', es: 'de chico/a', ex: 'As a child, I loved cartoons.', exEs: 'De chico, me encantaban los dibujitos.' },
    { t: 'knock', es: 'golpear, llamar a la puerta', ex: 'Someone knocked on the door.', exEs: 'Alguien golpeó la puerta.' },
    { t: 'realise', es: 'darse cuenta', ex: 'I realised I was lost.', exEs: 'Me di cuenta de que estaba perdido.' },
    { t: 'lost', es: 'perdido', ex: 'We got lost in the city.', exEs: 'Nos perdimos en la ciudad.' },
  ],
  exercises: [
    { type: 'fill', q: 'While I ___ cooking, the phone rang. (be, past)', answer: ['was'] },
    { type: 'fill', q: 'I was cooking when the phone ___. (ring)', answer: ['rang'] },
    { type: 'mc', q: 'Elegí la forma correcta: "It ___ and people were running."', options: ['rained', 'was raining', 'had rained', 'rains'], answer: 1 },
    { type: 'mc', q: 'When I got home, my brother ___ dinner.', options: ['already cooked', 'had already cooked', 'was already cook', 'has already cooked'], answer: 1 },
    { type: 'mc', q: 'Which sentence is wrong?', options: ['I used to be shy.', 'I would be shy.', 'We would visit her every Sunday.', 'She used to live in Rosario.'], answer: 1, explain: '«Would» para hábitos no vale con estados como be shy.' },
    { type: 'fill', q: 'I didn\'t ___ to like coffee. (use)', answer: ['use'], explain: 'En negativa y preguntas, la forma es «use to» (sin -d).' },
    { type: 'fill', q: 'Did you ___ to smoke? (use)', answer: ['use'] },
    { type: 'mc', q: '«Estoy acostumbrado a levantarme temprano»', options: ['I used to wake up early.', 'I\'m used to waking up early.', 'I\'m used to wake up early.', 'I use to waking up early.'], answer: 1, explain: 'Be used to va seguido de -ing.' },
    { type: 'tr', q: 'Mientras caminaba a casa, vi a un hombre.', answer: ['While I was walking home, I saw a man.', 'While I was walking home I saw a man.'] },
    { type: 'tr', q: 'De chico, yo jugaba al fútbol todos los fines de semana.', answer: ['As a child, I used to play football every weekend.', 'When I was a child, I used to play football every weekend.', 'As a child, I would play football every weekend.', 'When I was a child, I would play football every weekend.'] },
    { type: 'tr', dir: 't>es', q: 'Suddenly, the lights went out.', answer: ['De repente, se cortó la luz.', 'De repente se apagaron las luces.', 'De repente, se apagaron las luces.', 'De repente se cortó la luz.'] },
    { type: 'order', q: 'Me estoy acostumbrando al clima.', answer: "I'm getting used to the weather.", extra: ['use'] },
    { type: 'listen', audio: 'I used to live near the sea', answer: ['I used to live near the sea'], instruction: 'Escuchá y escribí la frase.' },
    { type: 'speak', text: 'I was walking home when I saw a man who looked lost.', es: 'Caminaba a casa cuando vi a un hombre que parecía perdido.' },
  ],
};
