export default {
  id: 'en-03',
  title: 'Present perfect continuous and past perfect',
  level: 'B1',
  minutes: 35,
  goal: 'Usar el present perfect continuous para acciones que duran o que dejan un resultado visible, y el past perfect para ordenar dos hechos del pasado.',
  theory: `
<h3>Present perfect continuous</h3>
<p>Se forma con <b>have / has + been + verbo-ing</b>. Pone el foco en la <mark>duración</mark> o en la actividad misma, no en el resultado.</p>
<p><span class="say" lang="en">I have been studying English for two hours.</span> · <span class="say" lang="en">She has been working here since March.</span> · <span class="say" lang="en">It has been raining all day.</span></p>

<h3>Perfect simple o continuous</h3>
<div class="table-wrap"><table>
<thead><tr><th>Present perfect simple</th><th>Present perfect continuous</th></tr></thead>
<tbody>
<tr><td>Resultado, cantidad: <span class="say" lang="en">I have written three emails.</span></td><td>Actividad, duración: <span class="say" lang="en">I have been writing emails all morning.</span></td></tr>
<tr><td>Acción terminada: <span class="say" lang="en">I have painted the room.</span></td><td>Todavía puede seguir, o deja huellas: <span class="say" lang="en">I have been painting the room.</span> (tengo pintura en la ropa)</td></tr>
</tbody></table></div>
<aside class="note"><p>Los verbos de estado (<span lang="en">know, like, love, want, have</span> = poseer) casi no se usan en continuous: <span lang="en">I have known him for years</span>, no «I have been knowing».</p></aside>
<p>Para preguntar «¿cuánto tiempo?»: <span class="say" lang="en">How long have you been learning Russian?</span> (duración) frente a <span class="say" lang="en">How many lessons have you done?</span> (cantidad).</p>

<h3>Past perfect: lo que pasó antes de otro hecho pasado</h3>
<p>Se forma con <b>had + participio pasado</b> y sirve para ordenar dos acciones pasadas. La anterior va en past perfect:</p>
<p><span class="say" lang="en">When I arrived, the film had already started.</span> (primero empezó, después llegué)</p>
<p><span class="say" lang="en">She was tired because she hadn't slept.</span> · <span class="say" lang="en">He told me he had lost his wallet.</span></p>
<p>Conectores que lo acompañan: <span lang="en">by the time</span>, <span lang="en">before</span>, <span lang="en">after</span>, <span lang="en">already</span>, <span lang="en">just</span>, <span lang="en">never… before</span>. <span class="say" lang="en">By the time we got there, they had left.</span></p>
<p>Si el orden es obvio por el conector (<span lang="en">after</span>, <span lang="en">before</span>), el past simple alcanza: <span lang="en">After he left, I called her.</span></p>

<h3>Past perfect continuous</h3>
<p>Es <b>had been + verbo-ing</b>: una actividad que duraba hasta otro momento del pasado. <span class="say" lang="en">I was exhausted because I had been working all day.</span></p>
`,
  vocab: [
    { t: 'all day', es: 'todo el día', ex: 'It has been raining all day.', exEs: 'Estuvo lloviendo todo el día.' },
    { t: 'how long', es: 'cuánto tiempo', ex: 'How long have you been waiting?', exEs: '¿Cuánto hace que esperás?' },
    { t: 'by the time', es: 'para cuando', ex: 'By the time I arrived, he had left.', exEs: 'Para cuando llegué, se había ido.' },
    { t: 'exhausted', es: 'agotado', ex: 'I was exhausted after the trip.', exEs: 'Estaba agotado después del viaje.' },
    { t: 'wallet', es: 'billetera', ex: 'I lost my wallet.', exEs: 'Perdí mi billetera.' },
    { t: 'wait', es: 'esperar', ex: 'I have been waiting for an hour.', exEs: 'Hace una hora que espero.' },
    { t: 'improve', es: 'mejorar', ex: 'Her English has improved a lot.', exEs: 'Su inglés mejoró mucho.' },
    { t: 'practise', es: 'practicar', ex: 'I practise every day.', exEs: 'Practico todos los días.' },
    { t: 'tired', es: 'cansado', ex: 'I am tired because I haven\'t slept.', exEs: 'Estoy cansado porque no dormí.' },
    { t: 'leave', es: 'irse, dejar', ex: 'They had already left.', exEs: 'Ya se habían ido.' },
    { t: 'realise', es: 'darse cuenta', ex: 'I realised I had forgotten my keys.', exEs: 'Me di cuenta de que había olvidado las llaves.' },
  ],
  exercises: [
    { type: 'fill', q: 'I have ___ studying for two hours. (be)', answer: ['been'] },
    { type: 'fill', q: 'She ___ been working here since March. (have/has)', answer: ['has'] },
    { type: 'mc', q: 'Mirá: tenés pintura en las manos. ¿Qué decís?', options: ['I have painted the room.', 'I have been painting the room.', 'I painted the room.', 'I had painted the room.'], answer: 1, explain: 'Hay una evidencia de la actividad reciente.' },
    { type: 'mc', q: 'I have ___ three emails this morning.', options: ['written', 'been writing', 'wrote', 'writing'], answer: 0, explain: 'Cantidad (three): present perfect simple.' },
    { type: 'mc', q: 'When I arrived, the film ___.', options: ['has started', 'had already started', 'was started', 'starts'], answer: 1 },
    { type: 'fill', q: 'By the time we got there, they ___ left. (had / have)', answer: ['had'] },
    { type: 'fill', q: 'She was tired because she hadn\'t ___. (sleep)', answer: ['slept'] },
    { type: 'fill', q: 'He told me he ___ lost his wallet. (had / has)', answer: ['had'] },
    { type: 'mc', q: '¿Cuál es incorrecta?', options: ['I have known him for years.', 'I have been knowing him for years.', 'I have been living here for years.', 'I have lived here for years.'], answer: 1, explain: 'Know es verbo de estado y no se usa en continuous.' },
    { type: 'tr', q: 'Hace dos horas que espero.', answer: ['I have been waiting for two hours.', "I've been waiting for two hours."] },
    { type: 'tr', q: 'Para cuando llegué, ya se habían ido.', answer: ['By the time I arrived, they had already left.', 'By the time I got there, they had already left.', 'When I arrived, they had already left.'] },
    { type: 'tr', dir: 't>es', q: 'How long have you been learning Russian?', answer: ['¿Cuánto hace que aprendés ruso?', '¿Hace cuánto que aprendés ruso?', '¿Cuánto tiempo hace que estás aprendiendo ruso?', '¿Hace cuánto estás aprendiendo ruso?'] },
    { type: 'order', q: 'Estaba agotado porque había trabajado todo el día.', answer: 'I was exhausted because I had been working all day.', extra: ['have'] },
    { type: 'listen', audio: 'It has been raining all day', answer: ['It has been raining all day', "It's been raining all day"], instruction: 'Escuchá y escribí la frase.' },
    { type: 'speak', text: 'I have been learning Russian for a few months.', es: 'Hace unos meses que aprendo ruso.' },
  ],
};
