export default {
  id: 'en-13',
  title: 'Linking words and connectors',
  level: 'B2',
  minutes: 30,
  goal: 'Conectar ideas con precisión usando conectores de contraste, causa, consecuencia, finalidad y secuencia, sin los errores típicos de puntuación y construcción.',
  theory: `
<p>Los conectores son lo que separa un texto de B1 («and», «but», «because») de uno de B2. Cada uno exige una construcción distinta: algunos van seguidos de una oración, otros de un sustantivo o un -ing.</p>

<h3>Contraste</h3>
<div class="table-wrap"><table>
<thead><tr><th>Conector</th><th>Qué sigue</th><th>Ejemplo</th></tr></thead>
<tbody>
<tr><td><span class="say" lang="en">although / even though / though</span></td><td>oración</td><td><span lang="en">Although it was raining, we went out.</span></td></tr>
<tr><td><span class="say" lang="en">despite / in spite of</span></td><td>sustantivo o -ing</td><td><span lang="en">Despite the rain, we went out.</span></td></tr>
<tr><td><span class="say" lang="en">however / nevertheless</span></td><td>oración nueva (con coma)</td><td><span lang="en">It was raining. However, we went out.</span></td></tr>
<tr><td><span class="say" lang="en">whereas / while</span></td><td>oración (contraste entre dos cosas)</td><td><span lang="en">I like tea, whereas she prefers coffee.</span></td></tr>
</tbody></table></div>
<aside class="note"><p>Error típico: «Despite of the rain» y «Although the rain». Despite nunca lleva «of» (in spite <em>of</em> sí), y although necesita una oración completa con sujeto y verbo.</p></aside>
<p>También <span class="say" lang="en">but</span> se pone en medio sin coma obligatoria, mientras que <span lang="en">however</span> lleva punto o punto y coma antes y coma después: <span lang="en">He studied hard; however, he failed.</span></p>

<h3>Causa y consecuencia</h3>
<ul>
<li><span class="say" lang="en">because + oración</span> · <span class="say" lang="en">because of + sustantivo</span>: <span lang="en">We stayed home because it rained / because of the rain.</span></li>
<li><span class="say" lang="en">since / as</span> (causa conocida): <span lang="en">As it was late, we left.</span></li>
<li><span class="say" lang="en">so</span> (resultado): <span lang="en">It was late, so we left.</span></li>
<li><span class="say" lang="en">therefore / as a result / consequently</span> (formales): <span lang="en">Sales fell. Therefore, prices were cut.</span></li>
<li><span class="say" lang="en">so… that / such… that</span>: <span lang="en">It was so cold that we stayed in. It was such a cold day that we stayed in.</span></li>
</ul>

<h3>Finalidad</h3>
<p><span class="say" lang="en">to / in order to / so as to + infinitivo</span>: <span lang="en">I study in order to improve.</span> En negativa: <span class="say" lang="en">so as not to</span>. Con otro sujeto: <span class="say" lang="en">so that + oración</span>: <span lang="en">I speak slowly so that you can understand.</span></p>

<h3>Secuencia y orden</h3>
<p><span class="say" lang="en">first(ly), then, after that, next, finally</span>. Para marcar tiempo: <span class="say" lang="en">while, as soon as, once, by the time, until</span>.</p>

<h3>Agregar y resumir</h3>
<p><span class="say" lang="en">in addition, moreover, furthermore, besides, what's more</span> agregan información. <span class="say" lang="en">on the one hand… on the other hand</span> presentan dos caras. <span class="say" lang="en">in conclusion, to sum up</span> cierran.</p>
`,
  vocab: [
    { t: 'although', es: 'aunque', ex: 'Although I was tired, I kept working.', exEs: 'Aunque estaba cansado, seguí trabajando.' },
    { t: 'despite', es: 'a pesar de', ex: 'Despite the rain, we went out.', exEs: 'A pesar de la lluvia, salimos.' },
    { t: 'however', es: 'sin embargo', ex: 'He tried. However, he failed.', exEs: 'Lo intentó. Sin embargo, falló.' },
    { t: 'whereas', es: 'mientras que', ex: 'I like tea, whereas she likes coffee.', exEs: 'A mí me gusta el té, mientras que a ella el café.' },
    { t: 'therefore', es: 'por lo tanto', ex: 'Sales fell; therefore, prices went down.', exEs: 'Las ventas cayeron; por lo tanto, bajaron los precios.' },
    { t: 'moreover', es: 'además', ex: 'It is cheap; moreover, it is fast.', exEs: 'Es barato; además, es rápido.' },
    { t: 'in order to', es: 'para (finalidad)', ex: 'I study in order to improve.', exEs: 'Estudio para mejorar.' },
    { t: 'so that', es: 'para que', ex: 'I speak slowly so that you can understand.', exEs: 'Hablo despacio para que entiendas.' },
    { t: 'as a result', es: 'como resultado', ex: 'As a result, we lost.', exEs: 'Como resultado, perdimos.' },
    { t: 'on the other hand', es: 'por otro lado', ex: 'On the other hand, it is expensive.', exEs: 'Por otro lado, es caro.' },
    { t: 'in conclusion', es: 'en conclusión', ex: 'In conclusion, it was a success.', exEs: 'En conclusión, fue un éxito.' },
    { t: 'besides', es: 'además, aparte', ex: 'Besides, I don\'t have time.', exEs: 'Además, no tengo tiempo.' },
  ],
  exercises: [
    { type: 'mc', q: '___ it was raining, we went out.', options: ['Despite', 'Although', 'However', 'Because of'], answer: 1, explain: 'Después de although va una oración completa.' },
    { type: 'mc', q: '___ the rain, we went out.', options: ['Although', 'Despite', 'However', 'Even though'], answer: 1, explain: 'Despite va seguido de sustantivo.' },
    { type: 'mc', q: 'Which one is wrong?', options: ['Despite the rain, we went out.', 'In spite of the rain, we went out.', 'Despite of the rain, we went out.', 'Despite raining, we went out.'], answer: 2 },
    { type: 'fill', q: 'We stayed home ___ the rain. (because / because of)', answer: ['because of'], explain: 'Antes de un sustantivo (the rain) va because of; antes de una oración, because.' },
    { type: 'fill', q: 'It was ___ cold that we stayed in. (so / such)', answer: ['so'] },
    { type: 'fill', q: 'It was ___ a cold day that we stayed in. (so / such)', answer: ['such'] },
    { type: 'fill', q: 'I speak slowly ___ that you can understand. (so)', answer: ['so'] },
    { type: 'fill', q: 'He studied hard; ___, he failed. (however)', answer: ['however', 'nevertheless'] },
    { type: 'match', instruction: 'Uní cada conector con su función.', pairs: [['however', 'contraste'], ['therefore', 'consecuencia'], ['moreover', 'agregar'], ['in order to', 'finalidad'], ['in conclusion', 'cierre']] },
    { type: 'tr', q: 'Aunque estaba cansado, seguí trabajando.', answer: ['Although I was tired, I kept working.', 'Though I was tired, I kept working.', 'Even though I was tired, I kept working.', 'Although I was tired, I continued working.', 'Although I was tired, I carried on working.'] },
    { type: 'tr', q: 'Estudio para mejorar mi inglés.', answer: ['I study in order to improve my English.', 'I study to improve my English.', 'I study so as to improve my English.'] },
    { type: 'tr', q: 'A pesar de la lluvia, salimos.', answer: ['Despite the rain, we went out.', 'In spite of the rain, we went out.', 'We went out despite the rain.', 'We went out in spite of the rain.'] },
    { type: 'tr', dir: 't>es', q: 'It is cheap; moreover, it is fast.', answer: ['Es barato; además, es rápido.', 'Es barato; es más, es rápido.', 'Es barato y, además, es rápido.', 'Es barato; encima, es rápido.'] },
    { type: 'order', q: 'Hablo despacio para que me entiendas.', answer: 'I speak slowly so that you can understand me.', extra: ['because'] },
    { type: 'listen', audio: 'Although I was tired, I kept working', answer: ['Although I was tired, I kept working', 'Although I was tired I kept working'], instruction: 'Escuchá y escribí la frase.' },
    { type: 'speak', text: 'Despite the rain, we went out; however, we did not stay long.', es: 'A pesar de la lluvia salimos; sin embargo, no nos quedamos mucho.' },
  ],
};
