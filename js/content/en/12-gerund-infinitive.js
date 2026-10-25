export default {
  id: 'en-12',
  title: 'Gerund or infinitive?',
  level: 'B2',
  minutes: 35,
  goal: 'Elegir entre -ing e infinitivo después de verbos y preposiciones, y reconocer los verbos que cambian de significado según la forma.',
  theory: `
<p>Cuando un verbo sigue a otro, el segundo puede ir en <b>-ing</b> (gerundio) o en <b>to + infinitivo</b>. No hay una regla universal: depende del primer verbo, y conviene aprender las listas por grupo.</p>

<h3>Verbos seguidos de -ing</h3>
<p><span class="say" lang="en">enjoy, avoid, finish, mind, suggest, keep, practise, consider, deny, risk, imagine, can't help, give up, miss</span></p>
<p><span class="say" lang="en">I enjoy learning languages.</span> · <span class="say" lang="en">She avoids eating late.</span> · <span class="say" lang="en">Would you mind opening the window?</span> · <span class="say" lang="en">I've given up smoking.</span></p>

<h3>Verbos seguidos de to + infinitivo</h3>
<p><span class="say" lang="en">want, need, decide, hope, plan, agree, refuse, manage, promise, afford, learn, expect, seem, offer</span></p>
<p><span class="say" lang="en">I want to learn Russian.</span> · <span class="say" lang="en">He decided to leave.</span> · <span class="say" lang="en">We can't afford to travel.</span> · <span class="say" lang="en">She managed to finish on time.</span></p>
<aside class="note"><p>Un buen atajo: los verbos de <b>planes, deseos y resultados</b> (want, hope, decide, manage) llevan infinitivo. Los verbos de <b>agrado o rechazo de algo que ya existe</b> (enjoy, avoid, mind, miss) llevan -ing.</p></aside>

<h3>Verbos con objeto + infinitivo</h3>
<p><span class="say" lang="en">want, ask, tell, allow, advise, invite, remind, teach + persona + to</span>: <span lang="en">She wants me to come.</span> · <span lang="en">They allowed us to leave.</span> Y los verbos de percepción y <span lang="en">make / let</span> llevan infinitivo <mark>sin to</mark>: <span class="say" lang="en">She made me laugh.</span> · <span class="say" lang="en">They let us go.</span> Pero en pasiva: <span lang="en">I was made to wait.</span></p>

<h3>Verbos con los dos, sin cambio de sentido</h3>
<p><span class="say" lang="en">like, love, hate, prefer, start, begin, continue</span>: <span lang="en">It started to rain / It started raining.</span> Con <span lang="en">would like / would love / would prefer</span> va siempre infinitivo: <span lang="en">I'd like to go.</span></p>

<h3>Verbos que cambian de significado</h3>
<div class="table-wrap"><table>
<thead><tr><th>Verbo</th><th>+ -ing</th><th>+ to infinitivo</th></tr></thead>
<tbody>
<tr><td><span class="say" lang="en">remember</span></td><td>recordar algo que hiciste: <span lang="en">I remember locking the door.</span></td><td>acordarse de hacer algo: <span lang="en">Remember to lock the door.</span></td></tr>
<tr><td><span class="say" lang="en">forget</span></td><td><span lang="en">I'll never forget meeting her.</span></td><td><span lang="en">Don't forget to call.</span></td></tr>
<tr><td><span class="say" lang="en">stop</span></td><td>dejar de hacer: <span lang="en">He stopped smoking.</span></td><td>parar para hacer: <span lang="en">He stopped to smoke.</span></td></tr>
<tr><td><span class="say" lang="en">try</span></td><td>probar, experimentar: <span lang="en">Try adding salt.</span></td><td>intentar: <span lang="en">I tried to open it.</span></td></tr>
<tr><td><span class="say" lang="en">regret</span></td><td>lamentar lo hecho: <span lang="en">I regret saying that.</span></td><td>lamentar tener que decir: <span lang="en">I regret to inform you…</span></td></tr>
</tbody></table></div>

<h3>Después de preposición, siempre -ing</h3>
<p><span class="say" lang="en">I'm interested in learning Russian.</span> · <span class="say" lang="en">Thanks for helping me.</span> · <span class="say" lang="en">She's good at drawing.</span> · <span class="say" lang="en">Before leaving, call me.</span> Esto incluye <span lang="en">look forward to</span>: <span class="say" lang="en">I look forward to meeting you.</span> (aquí «to» es preposición)</p>

<h3>Infinitivo de propósito</h3>
<p>Para decir «para + verbo» se usa <span class="say" lang="en">to + infinitivo</span>: <span lang="en">I went to the shop to buy bread.</span> (no «for buy»)</p>
`,
  vocab: [
    { t: 'enjoy', es: 'disfrutar', ex: 'I enjoy cooking.', exEs: 'Disfruto cocinar.' },
    { t: 'avoid', es: 'evitar', ex: 'Avoid driving at night.', exEs: 'Evitá manejar de noche.' },
    { t: 'give up', es: 'dejar, rendirse', ex: 'Don\'t give up!', exEs: '¡No te rindas!' },
    { t: 'manage', es: 'lograr', ex: 'We managed to arrive on time.', exEs: 'Logramos llegar a tiempo.' },
    { t: 'afford', es: 'poder pagar', ex: 'I can\'t afford to buy it.', exEs: 'No puedo pagarlo.' },
    { t: 'mind', es: 'molestar, importar', ex: 'Do you mind if I sit here?', exEs: '¿Te molesta si me siento acá?' },
    { t: 'look forward to', es: 'tener ganas de, esperar con ansias', ex: 'I look forward to seeing you.', exEs: 'Tengo ganas de verte.' },
    { t: 'be used to', es: 'estar acostumbrado a', ex: 'I\'m used to getting up early.', exEs: 'Estoy acostumbrado a madrugar.' },
    { t: 'allow', es: 'permitir', ex: 'They don\'t allow smoking.', exEs: 'No permiten fumar.' },
    { t: 'let', es: 'dejar (permitir)', ex: 'Let me help you.', exEs: 'Dejame ayudarte.' },
    { t: 'seem', es: 'parecer', ex: 'He seems to be tired.', exEs: 'Parece estar cansado.' },
    { t: 'consider', es: 'considerar', ex: 'I\'m considering moving.', exEs: 'Estoy pensando en mudarme.' },
  ],
  exercises: [
    { type: 'mc', q: 'I enjoy ___ languages.', options: ['to learn', 'learning', 'learn', 'learned'], answer: 1 },
    { type: 'mc', q: 'I want ___ Russian.', options: ['learning', 'learn', 'to learn', 'learned'], answer: 2 },
    { type: 'mc', q: 'She made me ___.', options: ['to laugh', 'laughing', 'laugh', 'laughed'], answer: 2, explain: 'Después de make + objeto va infinitivo sin to.' },
    { type: 'mc', q: 'Thanks for ___ me.', options: ['help', 'to help', 'helping', 'helped'], answer: 2, explain: 'Después de preposición siempre -ing.' },
    { type: 'mc', q: 'I\'d like ___ with you.', options: ['go', 'going', 'to go', 'gone'], answer: 2 },
    { type: 'fill', q: 'He decided ___ leave. (to)', answer: ['to'] },
    { type: 'fill', q: 'She avoids ___ late. (eat)', answer: ['eating'] },
    { type: 'fill', q: 'I went to the shop ___ buy bread. (to / for)', answer: ['to'] },
    { type: 'fill', q: 'I look forward to ___ you. (meet)', answer: ['meeting'] },
    { type: 'mc', q: '«Dejó de fumar»', options: ['He stopped to smoke.', 'He stopped smoking.', 'He stopped smoke.', 'He stopped to smoking.'], answer: 1 },
    { type: 'mc', q: '«No te olvides de llamar»', options: ['Don\'t forget calling.', 'Don\'t forget to call.', 'Don\'t forget call.', 'Don\'t forget for call.'], answer: 1 },
    { type: 'match', instruction: 'Uní cada verbo con lo que sigue.', pairs: [['enjoy', '+ -ing'], ['decide', '+ to + infinitivo'], ['let', '+ infinitivo sin to'], ['look forward to', '+ -ing (to es preposición)']] },
    { type: 'tr', q: 'Disfruto cocinar.', answer: ['I enjoy cooking.'] },
    { type: 'tr', q: 'Logramos terminar a tiempo.', answer: ['We managed to finish on time.', 'We managed to finish in time.'] },
    { type: 'tr', q: 'Tengo ganas de verte.', answer: ['I look forward to seeing you.', 'I\'m looking forward to seeing you.', 'I am looking forward to seeing you.'] },
    { type: 'order', q: 'Estoy interesado en aprender ruso.', answer: "I'm interested in learning Russian.", extra: ['to'] },
    { type: 'listen', audio: 'I managed to finish on time', answer: ['I managed to finish on time'], instruction: 'Escuchá y escribí la frase.' },
    { type: 'speak', text: 'She decided to stop smoking and started going to the gym.', es: 'Decidió dejar de fumar y empezó a ir al gimnasio.' },
  ],
};
