export default {
  id: 'en-06',
  title: 'Modal verbs: obligation, advice and deduction',
  level: 'B1',
  minutes: 35,
  goal: 'Usar los verbos modales para obligación, permiso, consejo y deducción, incluidos los modales en pasado.',
  theory: `
<p>Los modales (<span lang="en">can, could, may, might, must, should, will, would</span>) van seguidos de infinitivo sin «to», no cambian con la persona (<span lang="en">she can</span>, no «she cans») y forman preguntas y negativas por sí mismos (<span lang="en">Can you…? / You can't…</span>). Tienen tres grandes campos de uso.</p>

<h3>1. Obligación, prohibición y necesidad</h3>
<div class="table-wrap"><table>
<thead><tr><th>Sentido</th><th>Forma</th><th>Ejemplo</th></tr></thead>
<tbody>
<tr><td>Obligación fuerte (opinión del que habla)</td><td><span class="say" lang="en">must</span></td><td><span lang="en">I must call my mother.</span></td></tr>
<tr><td>Obligación por regla externa</td><td><span class="say" lang="en">have to</span></td><td><span lang="en">You have to wear a helmet.</span></td></tr>
<tr><td>Prohibición</td><td><span class="say" lang="en">mustn't</span></td><td><span lang="en">You mustn't smoke here.</span></td></tr>
<tr><td>Falta de necesidad</td><td><span class="say" lang="en">don't have to / needn't</span></td><td><span lang="en">You don't have to come.</span></td></tr>
</tbody></table></div>
<aside class="note"><p>Esto es una trampa clásica: <span lang="en">mustn't</span> es «no se puede» (prohibido), pero <span lang="en">don't have to</span> es «no hace falta» (es opcional). Son significados muy distintos.</p></aside>

<h3>2. Consejo</h3>
<p><span class="say" lang="en">should</span> y <span class="say" lang="en">ought to</span> son los consejos suaves: <span lang="en">You should see a doctor.</span> Más fuerte: <span class="say" lang="en">had better</span> (con consecuencias): <span lang="en">You'd better leave now, or you'll miss the train.</span></p>

<h3>3. Deducción: qué tan seguro estás</h3>
<div class="table-wrap"><table>
<thead><tr><th>Seguridad</th><th>Presente</th><th>Pasado</th></tr></thead>
<tbody>
<tr><td>Casi seguro que sí</td><td><span class="say" lang="en">He must be at home.</span></td><td><span class="say" lang="en">He must have left.</span></td></tr>
<tr><td>Posible</td><td><span class="say" lang="en">She may / might / could be tired.</span></td><td><span class="say" lang="en">She might have forgotten.</span></td></tr>
<tr><td>Casi seguro que no</td><td><span class="say" lang="en">That can't be true.</span></td><td><span class="say" lang="en">He can't have seen me.</span></td></tr>
</tbody></table></div>
<p>El truco: para el pasado, <b>modal + have + participio</b>. Fijate que lo contrario de <em>must</em> en deducción es <span lang="en">can't</span> y no «mustn't».</p>

<h3>Modales en pasado: arrepentimientos y crítica</h3>
<p><span class="say" lang="en">should have</span> + participio: algo que debías haber hecho (y no hiciste). <span lang="en">I should have studied more.</span> Y <span class="say" lang="en">shouldn't have</span>: <span lang="en">You shouldn't have said that.</span></p>
<p><span class="say" lang="en">could have</span>: algo posible que no pasó. <span lang="en">We could have won, but we missed the goal.</span></p>

<h3>Habilidad y permiso</h3>
<p><span class="say" lang="en">can</span> / <span class="say" lang="en">could</span> para habilidad: <span lang="en">I can swim.</span> <span lang="en">When I was five, I could read.</span> Para una vez concreta en pasado se usa <span lang="en">was able to</span>: <span lang="en">I was able to finish the exam.</span> Permisos formales: <span lang="en">May I come in?</span></p>
`,
  vocab: [
    { t: 'must', es: 'deber (obligación fuerte)', ex: 'You must be careful.', exEs: 'Tenés que tener cuidado.' },
    { t: 'have to', es: 'tener que', ex: 'I have to work tomorrow.', exEs: 'Tengo que trabajar mañana.' },
    { t: 'should', es: 'debería', ex: 'You should rest.', exEs: 'Deberías descansar.' },
    { t: 'ought to', es: 'debería', ex: 'You ought to call her.', exEs: 'Deberías llamarla.' },
    { t: 'had better', es: 'más vale que', ex: 'You had better hurry.', exEs: 'Más vale que te apures.' },
    { t: 'might', es: 'podría (posibilidad)', ex: 'It might rain.', exEs: 'Podría llover.' },
    { t: 'may', es: 'puede que; permiso', ex: 'May I sit here?', exEs: '¿Puedo sentarme acá?' },
    { t: 'be able to', es: 'poder (lograr)', ex: 'I was able to finish.', exEs: 'Pude terminar.' },
    { t: 'advice', es: 'consejo (incontable)', ex: 'Can you give me some advice?', exEs: '¿Me das un consejo?' },
    { t: 'regret', es: 'arrepentirse; arrepentimiento', ex: 'I regret saying that.', exEs: 'Me arrepiento de haberlo dicho.' },
    { t: 'forbidden', es: 'prohibido', ex: 'Smoking is forbidden.', exEs: 'Está prohibido fumar.' },
    { t: 'compulsory', es: 'obligatorio', ex: 'Uniforms are compulsory.', exEs: 'Los uniformes son obligatorios.' },
  ],
  exercises: [
    { type: 'mc', q: 'No es obligatorio venir. "You ___ come."', options: ['mustn\'t', 'don\'t have to', 'shouldn\'t', 'can\'t'], answer: 1 },
    { type: 'mc', q: 'Está prohibido fumar. "You ___ smoke here."', options: ['don\'t have to', 'mustn\'t', 'needn\'t', 'might not'], answer: 1 },
    { type: 'mc', q: 'He\'s not answering. Seguramente se fue. "He ___ left."', options: ['must have', 'can\'t have', 'should', 'might'], answer: 0 },
    { type: 'mc', q: 'Imposible, no pudo verme. "He ___ seen me."', options: ['must have', 'can\'t have', 'mustn\'t have', 'should have'], answer: 1, explain: 'La negación de la deducción es can\'t, no mustn\'t.' },
    { type: 'fill', q: 'I ___ have studied more. (debería haber)', answer: ['should'] },
    { type: 'fill', q: 'You ___ have said that. (no deberías haberlo dicho)', answer: ["shouldn't", 'should not'] },
    { type: 'fill', q: 'She ___ be tired. She worked all day. (seguro)', answer: ['must'] },
    { type: 'fill', q: 'I ___ able to finish the exam. (pasado de be able to)', answer: ['was'] },
    { type: 'match', instruction: 'Uní cada modal con su sentido.', pairs: [['mustn\'t', 'prohibido'], ['don\'t have to', 'no hace falta'], ['should', 'consejo'], ['might', 'posibilidad'], ['had better', 'advertencia']] },
    { type: 'tr', q: 'Deberías ver a un médico.', answer: ['You should see a doctor.', 'You ought to see a doctor.'] },
    { type: 'tr', q: 'Tiene que haber sido difícil.', answer: ['It must have been difficult.', 'It must have been hard.'] },
    { type: 'tr', q: 'Podríamos haber ganado.', answer: ['We could have won.'] },
    { type: 'tr', dir: 't>es', q: 'You had better leave now.', answer: ['Más vale que te vayas ahora.', 'Más vale que te vayas ya.', 'Más te vale irte ahora.', 'Será mejor que te vayas ahora.', 'Mejor te vas ahora.'] },
    { type: 'order', q: 'No tenés que venir.', answer: "You don't have to come.", extra: ['mustn\'t'] },
    { type: 'listen', audio: 'You should have studied more', answer: ['You should have studied more'], instruction: 'Escuchá y escribí la frase.' },
    { type: 'speak', text: 'He must have forgotten, because he never arrived.', es: 'Debe de haberse olvidado, porque nunca llegó.' },
  ],
};
