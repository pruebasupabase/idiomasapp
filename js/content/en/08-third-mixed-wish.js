export default {
  id: 'en-08',
  title: 'Third and mixed conditionals, wish and regrets',
  level: 'B2',
  minutes: 35,
  goal: 'Hablar de situaciones pasadas que no ocurrieron, expresar arrepentimientos con wish / if only y combinar pasado y presente en condicionales mixtos.',
  theory: `
<h3>Third conditional: el pasado que no fue</h3>
<p><b>If + past perfect, would have + participio.</b> Imaginás cómo habría sido el pasado si algo hubiera sido distinto. Ya no se puede cambiar: es pura reflexión.</p>
<p><span class="say" lang="en">If I had studied, I would have passed the exam.</span> (No estudié, no aprobé.) · <span class="say" lang="en">If she hadn't missed the bus, she wouldn't have been late.</span></p>
<p>También con <span lang="en">could have</span> y <span lang="en">might have</span> en el resultado: <span lang="en">If we had left earlier, we could have caught the train.</span></p>
<aside class="note"><p>En español decimos «si hubiera estudiado, habría aprobado». En inglés, ni «would» en la parte del <span lang="en">if</span> ni «had» en el resultado: «If I would have studied» es incorrecto, aunque lo escuches mucho en el habla coloquial.</p></aside>

<h3>Mixed conditionals: pasado y presente mezclados</h3>
<p>Cuando la condición es del pasado pero el resultado afecta el presente: <b>If + past perfect, would + infinitivo</b>.</p>
<p><span class="say" lang="en">If I had taken that job, I would be rich now.</span> (No lo tomé; ahora no soy rico.) · <span class="say" lang="en">If she had listened to me, she wouldn't be in trouble now.</span></p>
<p>Y a la inversa, condición presente (un hecho permanente) y resultado pasado: <b>If + past simple, would have + participio</b>. <span class="say" lang="en">If I were braver, I would have asked her out.</span></p>

<h3>Wish e if only</h3>
<div class="table-wrap"><table>
<thead><tr><th>Sobre qué</th><th>Estructura</th><th>Ejemplo</th></tr></thead>
<tbody>
<tr><td>Presente (irreal)</td><td>wish + pasado simple</td><td><span class="say" lang="en">I wish I lived by the sea.</span></td></tr>
<tr><td>Pasado (arrepentimiento)</td><td>wish + past perfect</td><td><span class="say" lang="en">I wish I had studied more.</span></td></tr>
<tr><td>Futuro / quejas</td><td>wish + would</td><td><span class="say" lang="en">I wish you would stop shouting.</span></td></tr>
</tbody></table></div>
<p><span class="say" lang="en">If only</span> dice lo mismo, pero con más emoción: <span lang="en">If only I had listened!</span> Con <span lang="en">wish… would</span> expresás molestia por algo que otra persona hace o no hace. No se usa para hablar de uno mismo: «I wish I would…» no es natural.</p>

<h3>Otros arrepentimientos</h3>
<p><span class="say" lang="en">should have</span> + participio también marca el arrepentimiento: <span lang="en">I should have called.</span> <span class="say" lang="en">regret + -ing</span> es lamentar algo ya hecho: <span lang="en">I regret telling her.</span></p>

<h3>Omitir if: inversión formal</h3>
<p>En inglés formal se puede omitir <span lang="en">if</span> invirtiendo el orden: <span class="say" lang="en">Had I known, I would have helped.</span> (If I had known…) · <span class="say" lang="en">Were I you, I'd accept.</span></p>
`,
  vocab: [
    { t: 'regret', es: 'arrepentirse', ex: 'I regret not studying more.', exEs: 'Me arrepiento de no haber estudiado más.' },
    { t: 'miss the bus', es: 'perder el colectivo', ex: 'She missed the bus and was late.', exEs: 'Perdió el colectivo y llegó tarde.' },
    { t: 'catch the train', es: 'alcanzar el tren', ex: 'We managed to catch the train.', exEs: 'Logramos alcanzar el tren.' },
    { t: 'turn down', es: 'rechazar', ex: 'He turned down the offer.', exEs: 'Rechazó la oferta.' },
    { t: 'in trouble', es: 'en problemas', ex: 'He is in trouble now.', exEs: 'Ahora está en problemas.' },
    { t: 'take a chance', es: 'arriesgarse', ex: 'I should have taken the chance.', exEs: 'Debería haberme arriesgado.' },
    { t: 'ask someone out', es: 'invitar a salir', ex: 'He asked her out.', exEs: 'La invitó a salir.' },
    { t: 'fail', es: 'reprobar, fallar', ex: 'I failed the exam.', exEs: 'Reprobé el examen.' },
    { t: 'pass', es: 'aprobar; pasar', ex: 'She passed the test.', exEs: 'Aprobó la prueba.' },
    { t: 'deserve', es: 'merecer', ex: 'You deserve a holiday.', exEs: 'Merecés unas vacaciones.' },
    { t: 'otherwise', es: 'de lo contrario', ex: 'Hurry up, otherwise we will be late.', exEs: 'Apurate, si no vamos a llegar tarde.' },
    { t: 'by mistake', es: 'por error', ex: 'I took your bag by mistake.', exEs: 'Agarré tu bolso por error.' },
  ],
  exercises: [
    { type: 'fill', q: 'If I had studied, I ___ have passed. (would)', answer: ['would', "'d"] },
    { type: 'fill', q: 'If she ___ missed the bus, she wouldn\'t have been late. (had/hadn\'t)', answer: ["hadn't", 'had not'] },
    { type: 'fill', q: 'If we ___ left earlier, we could have caught the train. (had)', answer: ['had'] },
    { type: 'mc', q: 'If I ___ that job last year, I would be rich now.', options: ['took', 'had taken', 'would take', 'have taken'], answer: 1, explain: 'Condicional mixto: condición pasada, resultado presente.' },
    { type: 'mc', q: 'I wish I ___ more last year.', options: ['studied', 'have studied', 'had studied', 'would study'], answer: 2, explain: 'Arrepentimiento sobre el pasado: wish + past perfect.' },
    { type: 'mc', q: 'I wish I ___ by the sea.', options: ['live', 'lived', 'had lived', 'would live'], answer: 1 },
    { type: 'mc', q: 'I wish you ___ stop shouting.', options: ['will', 'would', 'did', 'had'], answer: 1, explain: 'Queja sobre alguien más: wish + would.' },
    { type: 'mc', q: 'Which is NOT correct?', options: ['If I had known, I would have helped.', 'If I would have known, I would have helped.', 'Had I known, I would have helped.', 'If I\'d known, I\'d have helped.'], answer: 1 },
    { type: 'tr', q: 'Si hubiera estudiado, habría aprobado.', answer: ['If I had studied, I would have passed.', "If I'd studied, I'd have passed.", 'If I had studied, I would have passed the exam.'] },
    { type: 'tr', q: 'Ojalá hubiera escuchado.', answer: ['I wish I had listened.', 'If only I had listened.', "I wish I'd listened.", "If only I'd listened."] },
    { type: 'tr', q: 'Me arrepiento de no haberlo llamado.', answer: ['I regret not calling him.', 'I wish I had called him.', 'I should have called him.', "I wish I'd called him."] },
    { type: 'tr', dir: 't>es', q: 'If she had listened to me, she wouldn\'t be in trouble now.', answer: ['Si me hubiera escuchado, ahora no estaría en problemas.', 'Si me hubiese escuchado, ahora no estaría en problemas.', 'Si ella me hubiera escuchado, no estaría en problemas ahora.', 'Si me hubiera escuchado, no estaría en problemas ahora.'] },
    { type: 'order', q: 'Si lo hubiera sabido, habría ayudado.', answer: 'If I had known, I would have helped.', extra: ['will'] },
    { type: 'listen', audio: 'If only I had listened', answer: ['If only I had listened', "If only I'd listened"], instruction: 'Escuchá y escribí la frase.' },
    { type: 'speak', text: 'I wish I had studied more, but I can still improve.', es: 'Ojalá hubiera estudiado más, pero todavía puedo mejorar.' },
  ],
};
