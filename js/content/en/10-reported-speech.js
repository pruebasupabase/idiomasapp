export default {
  id: 'en-10',
  title: 'Reported speech',
  level: 'B2',
  minutes: 35,
  goal: 'Contar lo que alguien dijo, preguntó u ordenó, ajustando los tiempos, los pronombres y las expresiones de tiempo, y elegir bien el verbo de reporte.',
  theory: `
<p>Hay dos formas de contar lo que dijo otra persona: citar sus palabras exactas (<span lang="en">"I'm tired," she said</span>) o reportarlas (<span lang="en">She said she was tired</span>). En el estilo indirecto, el tiempo verbal suele dar un paso hacia atrás.</p>

<h3>El paso atrás en los tiempos</h3>
<div class="table-wrap"><table>
<thead><tr><th>Lo que dijo</th><th>Lo que reportás</th></tr></thead>
<tbody>
<tr><td>"I <b>work</b> here." (present simple)</td><td><span class="say" lang="en">She said she worked there.</span> (past simple)</td></tr>
<tr><td>"I <b>am working</b>." (present continuous)</td><td><span class="say" lang="en">She said she was working.</span></td></tr>
<tr><td>"I <b>have finished</b>." (present perfect)</td><td><span class="say" lang="en">She said she had finished.</span> (past perfect)</td></tr>
<tr><td>"I <b>finished</b>." (past simple)</td><td><span class="say" lang="en">She said she had finished.</span></td></tr>
<tr><td>"I <b>will call</b>."</td><td><span class="say" lang="en">She said she would call.</span></td></tr>
<tr><td>"I <b>can</b> help."</td><td><span class="say" lang="en">She said she could help.</span></td></tr>
</tbody></table></div>
<aside class="note"><p>Si lo que dijeron sigue siendo verdad o el verbo de reporte está en presente (<span lang="en">She says…</span>), no hace falta retroceder: <span lang="en">He said the earth is round.</span> El paso atrás es obligatorio solo cuando querés marcar que son palabras del pasado.</p></aside>

<h3>Pronombres y expresiones de tiempo</h3>
<p>También cambian los pronombres (<span lang="en">I → he/she</span>) y las palabras de lugar y tiempo, porque la situación ya no es la misma:</p>
<div class="table-wrap"><table>
<tbody>
<tr><td>now → <span class="say" lang="en">then</span></td><td>here → <span class="say" lang="en">there</span></td></tr>
<tr><td>today → <span class="say" lang="en">that day</span></td><td>tomorrow → <span class="say" lang="en">the next day</span></td></tr>
<tr><td>yesterday → <span class="say" lang="en">the day before</span></td><td>last week → <span class="say" lang="en">the week before</span></td></tr>
<tr><td>this → <span class="say" lang="en">that</span></td><td>ago → <span class="say" lang="en">before</span></td></tr>
</tbody></table></div>
<p>"I'll see you here tomorrow," he said. → <span class="say" lang="en">He said he would see me there the next day.</span></p>

<h3>Preguntas reportadas</h3>
<p>Se pierde la inversión y el signo de pregunta; se usa el orden de una oración afirmativa. Con preguntas de sí/no, se agrega <span lang="en">if</span> o <span lang="en">whether</span>:</p>
<p>"Where do you live?" → <span class="say" lang="en">She asked me where I lived.</span> · "Are you tired?" → <span class="say" lang="en">He asked if I was tired.</span> (No «He asked was I tired».)</p>

<h3>Órdenes, pedidos y consejos</h3>
<p><span class="say" lang="en">tell / ask / order + persona + to + infinitivo</span>: "Close the door." → <span lang="en">She told me to close the door.</span> En negativa: <span lang="en">He asked me not to be late.</span></p>

<h3>Verbos de reporte</h3>
<p>Más precisos que <span lang="en">say</span> y <span lang="en">tell</span>. Cada uno tiene su patrón:</p>
<ul>
<li><b>+ that</b>: <span class="say" lang="en">admit, explain, claim, promise</span> — <span lang="en">He admitted that he had made a mistake.</span></li>
<li><b>+ to + infinitivo</b>: <span class="say" lang="en">promise, refuse, offer, agree</span> — <span lang="en">She refused to answer.</span></li>
<li><b>+ -ing</b>: <span class="say" lang="en">suggest, deny, apologise for</span> — <span lang="en">He suggested going to the cinema.</span></li>
<li><b>+ persona + to</b>: <span class="say" lang="en">advise, warn, remind, invite</span> — <span lang="en">She warned me not to go.</span></li>
</ul>
<p>Diferencia clave: <span class="say" lang="en">say</span> no lleva persona (<span lang="en">He said that…</span>) y <span class="say" lang="en">tell</span> sí (<span lang="en">He told me that…</span>).</p>
`,
  vocab: [
    { t: 'admit', es: 'admitir', ex: 'He admitted his mistake.', exEs: 'Admitió su error.' },
    { t: 'explain', es: 'explicar', ex: 'She explained the problem.', exEs: 'Explicó el problema.' },
    { t: 'claim', es: 'afirmar, sostener', ex: 'He claims he was at home.', exEs: 'Afirma que estaba en casa.' },
    { t: 'refuse', es: 'negarse', ex: 'She refused to answer.', exEs: 'Se negó a contestar.' },
    { t: 'suggest', es: 'sugerir', ex: 'I suggest waiting.', exEs: 'Sugiero esperar.' },
    { t: 'deny', es: 'negar', ex: 'He denied taking it.', exEs: 'Negó haberlo tomado.' },
    { t: 'warn', es: 'advertir', ex: 'She warned me about the dog.', exEs: 'Me advirtió sobre el perro.' },
    { t: 'remind', es: 'recordar a alguien', ex: 'Remind me to call him.', exEs: 'Recordame llamarlo.' },
    { t: 'advise', es: 'aconsejar', ex: 'The doctor advised me to rest.', exEs: 'El médico me aconsejó descansar.' },
    { t: 'apologise', es: 'pedir disculpas', ex: 'He apologised for being late.', exEs: 'Se disculpó por llegar tarde.' },
    { t: 'insist', es: 'insistir', ex: 'She insisted on paying.', exEs: 'Insistió en pagar.' },
    { t: 'promise', es: 'prometer', ex: 'I promise to be on time.', exEs: 'Prometo llegar a tiempo.' },
  ],
  exercises: [
    { type: 'fill', q: '"I work here." → She said she ___ there. (work)', answer: ['worked'] },
    { type: 'fill', q: '"I am tired." → He said he ___ tired. (be)', answer: ['was'] },
    { type: 'fill', q: '"I have finished." → She said she ___ finished. (have)', answer: ['had'] },
    { type: 'fill', q: '"I will call." → He said he ___ call. (will)', answer: ['would'] },
    { type: 'fill', q: '"I can help." → She said she ___ help. (can)', answer: ['could'] },
    { type: 'fill', q: '"I\'ll see you tomorrow." → He said he\'d see me the ___ day.', answer: ['next'] },
    { type: 'fill', q: '"Where do you live?" → She asked me where I ___. (live)', answer: ['lived'] },
    { type: 'fill', q: '"Close the door." → She told me ___ close the door.', answer: ['to'] },
    { type: 'mc', q: '"Are you tired?" →', options: ['He asked was I tired.', 'He asked if I was tired.', 'He asked if was I tired.', 'He asked that I was tired.'], answer: 1 },
    { type: 'mc', q: 'Which is correct?', options: ['He said me that he was late.', 'He told that he was late.', 'He told me that he was late.', 'He said to me he were late.'], answer: 2 },
    { type: 'mc', q: '"I\'m sorry I\'m late." → He ___ for being late.', options: ['admitted', 'apologised', 'refused', 'suggested'], answer: 1 },
    { type: 'tr', q: 'Me dijo que estaba cansada.', answer: ['She told me she was tired.', 'She told me that she was tired.', 'She said she was tired.', 'She said that she was tired.'] },
    { type: 'tr', q: 'Me pidió que no llegara tarde.', answer: ['He asked me not to be late.', 'She asked me not to be late.'] },
    { type: 'tr', dir: 't>es', q: 'She refused to answer.', answer: ['Se negó a contestar.', 'Se negó a responder.', 'Ella se negó a contestar.', 'Ella se negó a responder.'] },
    { type: 'order', q: 'Me preguntó dónde vivía.', answer: 'She asked me where I lived.', extra: ['did'] },
    { type: 'listen', audio: 'He said he would call me the next day', answer: ['He said he would call me the next day', "He said he'd call me the next day"], instruction: 'Escuchá y escribí la frase.' },
    { type: 'speak', text: 'She told me that she had finished the report.', es: 'Me dijo que había terminado el informe.' },
  ],
};
