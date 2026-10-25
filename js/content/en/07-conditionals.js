export default {
  id: 'en-07',
  title: 'Conditionals: zero, first and second',
  level: 'B1',
  minutes: 30,
  goal: 'Formar y distinguir los condicionales cero, primero y segundo, y usar unless, as long as, provided that y wish en situaciones reales e hipotéticas.',
  theory: `
<p>Un condicional tiene dos partes: la condición (<span lang="en">if</span>…) y el resultado. Lo que cambia entre tipos es cuánta probabilidad tiene la condición.</p>

<h3>Zero conditional: hechos y reglas</h3>
<p><b>If + presente, presente.</b> Algo que siempre es verdad. <span class="say" lang="en">If you heat ice, it melts.</span> · <span class="say" lang="en">If I drink coffee at night, I can't sleep.</span> Acá <span lang="en">if</span> casi equivale a <span lang="en">when</span>.</p>

<h3>First conditional: situación real o posible en el futuro</h3>
<p><b>If + presente, will + infinitivo.</b> Hay una probabilidad real. <span class="say" lang="en">If it rains tomorrow, we'll stay at home.</span> · <span class="say" lang="en">If you study, you'll pass the exam.</span></p>
<aside class="note"><p><mark>Nunca will después de if</mark> en la condición: «if it will rain» es un error clásico del hispanohablante. Se dice <span lang="en">if it rains</span>. En el resultado también podés usar modales: <span lang="en">If you hurry, you can catch the bus.</span></p></aside>

<h3>Second conditional: situación irreal o improbable</h3>
<p><b>If + pasado simple, would + infinitivo.</b> Imaginás algo que no es verdad ahora o que es poco probable. El pasado acá no indica tiempo pasado, sino irrealidad. <span class="say" lang="en">If I had more time, I would learn Russian faster.</span> · <span class="say" lang="en">If I were you, I would talk to her.</span></p>
<p>Fijate en <span class="say" lang="en">If I were you</span>: con el verbo to be se acepta <span lang="en">were</span> para todas las personas (<span lang="en">If he were here…</span>), y es lo que se espera en inglés formal. En el habla cotidiana también se oye <span lang="en">was</span>.</p>

<h3>Cuál elegir</h3>
<div class="table-wrap"><table>
<thead><tr><th>Idea</th><th>Condicional</th><th>Ejemplo</th></tr></thead>
<tbody>
<tr><td>Siempre pasa</td><td>Cero</td><td><span lang="en">If you mix red and blue, you get purple.</span></td></tr>
<tr><td>Puede pasar mañana</td><td>Primero</td><td><span lang="en">If I win, I'll buy a car.</span></td></tr>
<tr><td>Es fantasía o poco probable</td><td>Segundo</td><td><span lang="en">If I won, I'd buy a house.</span></td></tr>
</tbody></table></div>
<p>A veces los dos tipos son posibles para la misma situación: la diferencia es cuán probable la considera quien habla («If I win…» vs. «If I won…»).</p>

<h3>Otros conectores condicionales</h3>
<ul>
<li><span class="say" lang="en">unless</span> = if… not: <span lang="en">I won't go unless you come with me.</span></li>
<li><span class="say" lang="en">as long as / provided (that)</span> = siempre que: <span lang="en">You can borrow it as long as you return it.</span></li>
<li><span class="say" lang="en">in case</span> = por si acaso: <span lang="en">Take an umbrella in case it rains.</span></li>
<li><span class="say" lang="en">suppose / what if</span>: <span lang="en">What if he says no?</span></li>
</ul>

<h3>I wish + pasado</h3>
<p>Para un deseo sobre el presente, se usa el mismo pasado de irrealidad: <span class="say" lang="en">I wish I had more free time.</span> · <span class="say" lang="en">I wish I spoke Russian fluently.</span> (ojalá lo hablara; ahora no)</p>
`,
  vocab: [
    { t: 'unless', es: 'a menos que', ex: 'I will go unless it rains.', exEs: 'Voy a ir a menos que llueva.' },
    { t: 'as long as', es: 'siempre que', ex: 'You can stay as long as you want.', exEs: 'Podés quedarte todo lo que quieras.' },
    { t: 'provided that', es: 'siempre y cuando', ex: 'I will help, provided that you try.', exEs: 'Voy a ayudar, siempre y cuando lo intentes.' },
    { t: 'in case', es: 'por si acaso', ex: 'Take a coat in case it gets cold.', exEs: 'Llevá un abrigo por si hace frío.' },
    { t: 'what if', es: 'y si', ex: 'What if I fail?', exEs: '¿Y si fallo?' },
    { t: 'if only', es: 'ojalá (más intenso que wish)', ex: 'If only I had more time!', exEs: '¡Ojalá tuviera más tiempo!' },
    { t: 'probable', es: 'probable', ex: 'It is probable that he will win.', exEs: 'Es probable que gane.' },
    { t: 'unlikely', es: 'improbable', ex: 'That is unlikely.', exEs: 'Eso es improbable.' },
    { t: 'imagine', es: 'imaginar', ex: 'Imagine you could fly.', exEs: 'Imaginá que pudieras volar.' },
    { t: 'fluently', es: 'con fluidez', ex: 'She speaks English fluently.', exEs: 'Habla inglés con fluidez.' },
    { t: 'afford', es: 'permitirse (económicamente)', ex: 'I can\'t afford a new car.', exEs: 'No me puedo pagar un auto nuevo.' },
  ],
  exercises: [
    { type: 'mc', q: 'If it ___ tomorrow, we\'ll stay home.', options: ['will rain', 'rains', 'rained', 'would rain'], answer: 1 },
    { type: 'mc', q: 'If I ___ more time, I would learn Russian faster.', options: ['have', 'had', 'will have', 'would have'], answer: 1 },
    { type: 'fill', q: 'If you heat ice, it ___. (melt)', answer: ['melts'] },
    { type: 'fill', q: 'If I were you, I ___ talk to her. (would)', answer: ['would', "'d"] },
    { type: 'fill', q: 'I won\'t go ___ you come with me. (unless / if)', answer: ['unless'] },
    { type: 'fill', q: 'Take an umbrella ___ case it rains.', answer: ['in'] },
    { type: 'fill', q: 'I wish I ___ more free time. (have)', answer: ['had'] },
    { type: 'mc', q: 'Which sentence is wrong?', options: ['If I win, I\'ll buy a car.', 'If I will win, I\'ll buy a car.', 'If I won, I\'d buy a car.', 'If I win, I can buy a car.'], answer: 1 },
    { type: 'mc', q: '«Si fuera vos, hablaría con ella» →', options: ['If I am you, I will talk to her.', 'If I were you, I would talk to her.', 'If I would be you, I talk to her.', 'If I was you, I will talk to her.'], answer: 1 },
    { type: 'match', instruction: 'Uní cada situación con su tipo de condicional.', pairs: [['Verdad general', 'Cero'], ['Posible mañana', 'Primero'], ['Poco probable', 'Segundo']] },
    { type: 'tr', q: 'Si estudiás, vas a aprobar.', answer: ["If you study, you'll pass.", 'If you study, you will pass.', "If you study, you'll pass the exam.", 'If you study, you will pass the exam.'] },
    { type: 'tr', q: 'Si tuviera dinero, viajaría por el mundo.', answer: ["If I had money, I'd travel around the world.", 'If I had money, I would travel around the world.', "If I had money, I'd travel the world.", 'If I had money, I would travel the world.'] },
    { type: 'tr', dir: 't>es', q: 'I wish I spoke Russian fluently.', answer: ['Ojalá hablara ruso con fluidez.', 'Ojalá hablara ruso fluidamente.', 'Ojalá pudiera hablar ruso con fluidez.', 'Ojalá hablase ruso con fluidez.'] },
    { type: 'order', q: 'Podés pedirlo prestado siempre que lo devuelvas.', answer: 'You can borrow it as long as you return it.', extra: ['unless'] },
    { type: 'listen', audio: 'If I had more time, I would learn Russian faster', answer: ['If I had more time, I would learn Russian faster', "If I had more time I'd learn Russian faster"], instruction: 'Escuchá y escribí la frase.' },
    { type: 'speak', text: 'If I were you, I would practise every day.', es: 'Si yo fuera vos, practicaría todos los días.' },
  ],
};
