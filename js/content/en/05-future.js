export default {
  id: 'en-05',
  title: 'Talking about the future',
  level: 'B1',
  minutes: 30,
  goal: 'Elegir entre will, going to, present continuous y present simple para el futuro, y usar el future continuous y el future perfect.',
  theory: `
<p>El inglés no tiene un solo futuro: tiene varias formas y cada una comunica una cosa distinta. Elegir bien suena natural; elegir mal suena raro, aunque la gramática esté bien.</p>

<h3>Will</h3>
<p><span class="say" lang="en">will</span> + infinitivo se usa para: decisiones espontáneas en el momento (<span lang="en">The phone is ringing. I'll get it.</span>), predicciones basadas en opinión (<span lang="en">I think it will rain tomorrow.</span>), promesas y ofertas (<span lang="en">I'll help you.</span>) y hechos futuros (<span lang="en">The sun will rise at six.</span>).</p>

<h3>Going to</h3>
<p><span class="say" lang="en">be going to</span> + infinitivo se usa para: planes e intenciones ya decididos (<span lang="en">I'm going to study medicine.</span>) y predicciones con evidencia presente (<span lang="en">Look at those clouds. It's going to rain.</span>).</p>
<aside class="note"><p>Diferencia clave: <span lang="en">I'll call him</span> (lo decido ahora) frente a <span lang="en">I'm going to call him</span> (ya lo tenía pensado). En la práctica, la diferencia es sutil y a veces se pueden usar ambas.</p></aside>

<h3>Present continuous para planes fijos</h3>
<p>Cuando hay un arreglo concreto (hora, lugar, otra persona), se usa el presente continuo: <span class="say" lang="en">I'm meeting Ana at six.</span> · <span class="say" lang="en">We're flying to Madrid on Friday.</span></p>

<h3>Present simple para horarios</h3>
<p>Los eventos programados por una institución usan el presente simple: <span class="say" lang="en">The train leaves at 7:30.</span> · <span class="say" lang="en">The class starts tomorrow.</span></p>

<h3>Future continuous y future perfect</h3>
<div class="table-wrap"><table>
<thead><tr><th>Forma</th><th>Uso</th><th>Ejemplo</th></tr></thead>
<tbody>
<tr><td><b>will be + -ing</b></td><td>Algo que va a estar ocurriendo en un momento futuro</td><td><span class="say" lang="en">This time tomorrow, I'll be flying to Moscow.</span></td></tr>
<tr><td><b>will have + participio</b></td><td>Algo que ya va a haber terminado para cierto momento</td><td><span class="say" lang="en">By 2030, I will have learned Russian.</span></td></tr>
</tbody></table></div>

<h3>Después de when, as soon as, if, until</h3>
<p>Después de estos conectores <mark>no se usa will</mark>: se usa presente simple, aunque el sentido sea futuro.</p>
<p><span class="say" lang="en">I'll call you when I arrive.</span> (no «when I will arrive») · <span class="say" lang="en">As soon as she finishes, we'll leave.</span> · <span class="say" lang="en">Wait here until I come back.</span></p>
`,
  vocab: [
    { t: 'plan', es: 'plan; planear', ex: 'We plan to travel in July.', exEs: 'Planeamos viajar en julio.' },
    { t: 'promise', es: 'prometer', ex: 'I promise I\'ll call you.', exEs: 'Prometo que te llamo.' },
    { t: 'prediction', es: 'predicción', ex: 'That is just a prediction.', exEs: 'Eso es solo una predicción.' },
    { t: 'as soon as', es: 'apenas, en cuanto', ex: 'Call me as soon as you arrive.', exEs: 'Llamame apenas llegues.' },
    { t: 'by the end of', es: 'para fines de', ex: 'By the end of the year, I will have finished.', exEs: 'Para fin de año habré terminado.' },
    { t: 'this time tomorrow', es: 'mañana a esta hora', ex: 'This time tomorrow I\'ll be on a plane.', exEs: 'Mañana a esta hora estaré en un avión.' },
    { t: 'schedule', es: 'horario, cronograma', ex: 'What is the schedule for tomorrow?', exEs: '¿Cuál es el cronograma de mañana?' },
    { t: 'appointment', es: 'cita, turno', ex: 'I have a doctor\'s appointment.', exEs: 'Tengo turno con el médico.' },
    { t: 'arrange', es: 'organizar, coordinar', ex: 'We arranged to meet at six.', exEs: 'Quedamos en vernos a las seis.' },
    { t: 'probably', es: 'probablemente', ex: 'It will probably rain.', exEs: 'Probablemente llueva.' },
    { t: 'definitely', es: 'definitivamente', ex: 'I will definitely be there.', exEs: 'Voy a estar sin falta.' },
  ],
  exercises: [
    { type: 'mc', q: 'The phone is ringing! —  "I ___ get it."', options: ['am going to', 'will', 'am getting', 'get'], answer: 1, explain: 'Decisión espontánea: will.' },
    { type: 'mc', q: 'Look at those clouds. It ___.', options: ['will rain', 'rains', 'is going to rain', 'rained'], answer: 2, explain: 'Hay evidencia presente: going to.' },
    { type: 'mc', q: 'I\'ve bought tickets. We ___ to Madrid on Friday.', options: ['fly', 'are flying', 'will fly', 'flew'], answer: 1, explain: 'Plan fijo con arreglo concreto: present continuous.' },
    { type: 'mc', q: 'The train ___ at 7:30 tomorrow.', options: ['is leaving', 'will leave', 'leaves', 'leaving'], answer: 2, explain: 'Horarios oficiales: presente simple.' },
    { type: 'fill', q: 'I\'ll call you when I ___. (arrive)', answer: ['arrive'] },
    { type: 'fill', q: 'As soon as she ___, we\'ll leave. (finish)', answer: ['finishes'] },
    { type: 'fill', q: 'This time tomorrow, I\'ll ___ flying to Moscow. (be)', answer: ['be'] },
    { type: 'fill', q: 'By 2030, I will ___ learned Russian. (have)', answer: ['have'] },
    { type: 'mc', q: '¿Cuál es incorrecta?', options: ['I\'ll call you when I arrive.', 'I\'ll call you when I will arrive.', 'I\'ll wait until you come.', 'If it rains, we\'ll stay home.'], answer: 1 },
    { type: 'tr', q: 'Mañana voy a ver a mi hermano.', answer: ["I'm going to see my brother tomorrow.", 'I am going to see my brother tomorrow.', "I'm seeing my brother tomorrow.", 'I am seeing my brother tomorrow.', 'Tomorrow I\'m going to see my brother.'] },
    { type: 'tr', q: 'Llamame apenas llegues.', answer: ['Call me as soon as you arrive.', 'Call me as soon as you get there.'] },
    { type: 'tr', q: 'Para fin de año habré terminado el curso.', answer: ['By the end of the year, I will have finished the course.', 'By the end of the year I will have finished the course.', "By the end of the year, I'll have finished the course.", "By the end of the year I'll have finished the course."] },
    { type: 'order', q: 'Creo que mañana va a llover.', answer: 'I think it will rain tomorrow.', extra: ['rains'] },
    { type: 'listen', audio: 'I will definitely be there', answer: ['I will definitely be there', "I'll definitely be there"], instruction: 'Escuchá y escribí la frase.' },
    { type: 'speak', text: "By next year, I will have learned a lot of Russian.", es: 'Para el año que viene, habré aprendido mucho ruso.' },
  ],
};
