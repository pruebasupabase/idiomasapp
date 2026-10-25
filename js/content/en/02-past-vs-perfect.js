export default {
  id: 'en-02',
  title: 'Past simple vs present perfect',
  level: 'B1',
  minutes: 35,
  goal: 'Elegir entre el pasado simple y el present perfect según haya o no un tiempo terminado, y usar for, since, already, yet y just.',
  theory: `
<p>Es el contraste que más errores produce en hispanohablantes, porque el español usa el pretérito perfecto de forma distinta («he ido» ≠ <em>I have gone</em> en todos los casos). La regla de fondo es una sola: <mark>¿el momento está terminado y mencionado, o no?</mark></p>

<h3>Past simple: un momento terminado</h3>
<p>Se usa cuando la acción ocurrió en un momento que está cerrado, aunque no lo digas. Suelen aparecer: <span lang="en">yesterday</span>, <span lang="en">last week</span>, <span lang="en">in 2019</span>, <span lang="en">two days ago</span>, <span lang="en">when I was a child</span>.</p>
<p><span class="say" lang="en">I visited Córdoba last year.</span> · <span class="say" lang="en">She lived in Madrid for five years</span> (y ya no vive ahí).</p>

<h3>Present perfect: conectado con el presente</h3>
<p>Se forma con <b>have / has + participio pasado</b>. Se usa cuando la acción:</p>
<ul>
<li>ocurrió en un tiempo no especificado, pero importa ahora: <span class="say" lang="en">I have lost my keys.</span> (y todavía no los tengo)</li>
<li>empezó en el pasado y continúa: <span class="say" lang="en">I have lived here for ten years.</span> (todavía vivo acá)</li>
<li>es una experiencia de vida: <span class="say" lang="en">Have you ever been to Russia?</span></li>
</ul>
<aside class="note"><p><mark>Con una fecha o un tiempo terminado, nunca present perfect.</mark> «I have seen him yesterday» es incorrecto: es <span lang="en">I saw him yesterday</span>.</p></aside>

<h3>For y since</h3>
<p><span class="say" lang="en">for</span> + duración: <span lang="en">for two years</span>, <span lang="en">for a long time</span>. <span class="say" lang="en">since</span> + punto de inicio: <span lang="en">since 2020</span>, <span lang="en">since Monday</span>, <span lang="en">since I was a child</span>.</p>
<p><span class="say" lang="en">I have studied English for six years.</span> · <span class="say" lang="en">I have studied English since 2020.</span></p>

<h3>Already, yet, just, ever, never, recently</h3>
<div class="table-wrap"><table>
<thead><tr><th>Palabra</th><th>Uso</th><th>Ejemplo</th></tr></thead>
<tbody>
<tr><td><span class="say" lang="en">already</span></td><td>afirmativas: «ya»</td><td><span lang="en">I've already eaten.</span></td></tr>
<tr><td><span class="say" lang="en">yet</span></td><td>preguntas y negativas, al final: «todavía / ya»</td><td><span lang="en">Have you finished yet? / I haven't finished yet.</span></td></tr>
<tr><td><span class="say" lang="en">just</span></td><td>hace un momento</td><td><span lang="en">She has just left.</span></td></tr>
<tr><td><span class="say" lang="en">ever / never</span></td><td>alguna vez / nunca</td><td><span lang="en">I've never tried sushi.</span></td></tr>
</tbody></table></div>

<h3>Been vs gone</h3>
<p><span class="say" lang="en">She has been to Paris.</span> (Fue y volvió.) frente a <span class="say" lang="en">She has gone to Paris.</span> (Está allá ahora.)</p>

<h3>Cómo preguntar: cuándo y desde cuándo</h3>
<p>Para preguntar por la experiencia: <span lang="en">Have you ever…?</span> Pero apenas das el detalle, pasás al pasado simple: <span class="say" lang="en">Have you ever been to London? — Yes, I went there in 2022.</span></p>
`,
  vocab: [
    { t: 'already', es: 'ya', ex: 'I have already finished.', exEs: 'Ya terminé.' },
    { t: 'yet', es: 'todavía, ya (preguntas/negativas)', ex: 'I haven\'t called him yet.', exEs: 'Todavía no lo llamé.' },
    { t: 'just', es: 'recién', ex: 'She has just arrived.', exEs: 'Recién llegó.' },
    { t: 'ever', es: 'alguna vez', ex: 'Have you ever been abroad?', exEs: '¿Alguna vez estuviste en el exterior?' },
    { t: 'never', es: 'nunca', ex: 'I have never seen snow.', exEs: 'Nunca vi nieve.' },
    { t: 'recently', es: 'recientemente', ex: 'I have recently moved.', exEs: 'Me mudé hace poco.' },
    { t: 'since', es: 'desde', ex: 'I have lived here since 2018.', exEs: 'Vivo acá desde 2018.' },
    { t: 'for', es: 'durante (tiempo)', ex: 'I have worked here for a year.', exEs: 'Trabajo acá hace un año.' },
    { t: 'so far', es: 'hasta ahora', ex: 'So far, it has been great.', exEs: 'Hasta ahora fue genial.' },
    { t: 'lately', es: 'últimamente', ex: 'I have been tired lately.', exEs: 'Estuve cansado últimamente.' },
    { t: 'ago', es: 'hace (tiempo)', ex: 'I met her two years ago.', exEs: 'La conocí hace dos años.' },
  ],
  exercises: [
    { type: 'mc', q: 'I ___ my keys. I can\'t find them.', options: ['lost', 'have lost', 'was losing', 'lose'], answer: 1, explain: 'Resultado actual: todavía no los encontrás.' },
    { type: 'mc', q: 'I ___ him yesterday.', options: ['have seen', 'saw', 'have been seeing', 'see'], answer: 1, explain: 'Con yesterday siempre va el pasado simple.' },
    { type: 'fill', q: 'She has lived here ___ 2015. (for / since)', answer: ['since'] },
    { type: 'fill', q: 'We have known each other ___ ten years. (for / since)', answer: ['for'] },
    { type: 'fill', q: 'Have you finished ___? (already / yet)', answer: ['yet'] },
    { type: 'fill', q: 'I have ___ eaten, thanks. (already / yet)', answer: ['already'] },
    { type: 'fill', q: 'They ___ to Italy last summer. (go)', answer: ['went'] },
    { type: 'fill', q: 'He has ___ his phone. (lose)', answer: ['lost'] },
    { type: 'mc', q: '"She has gone to Paris" significa…', options: ['Está en Paris ahora', 'Fue a Paris y ya volvió', 'Nunca fue a Paris', 'Va a ir a Paris'], answer: 0 },
    { type: 'mc', q: 'Elegí la oración correcta.', options: ['I have visited Rome in 2019.', 'I visited Rome in 2019.', 'I am visiting Rome in 2019.', 'I visit Rome in 2019.'], answer: 1 },
    { type: 'tr', q: 'Todavía no terminé el informe.', answer: ["I haven't finished the report yet.", 'I have not finished the report yet.'] },
    { type: 'tr', q: 'Vivo en Córdoba desde 2020.', answer: ['I have lived in Córdoba since 2020.', "I've lived in Córdoba since 2020."] },
    { type: 'tr', dir: 't>es', q: 'Have you ever tried Russian food?', answer: ['¿Alguna vez probaste comida rusa?', '¿Alguna vez probaste la comida rusa?', '¿Probaste alguna vez comida rusa?'] },
    { type: 'order', q: 'Recién llegó.', answer: 'She has just arrived.', extra: ['had'] },
    { type: 'listen', audio: 'I have lived here for ten years', answer: ['I have lived here for ten years', "I've lived here for ten years"], instruction: 'Escuchá y escribí la frase.' },
    { type: 'speak', text: "I've never been to Russia, but I'd like to go.", es: 'Nunca estuve en Rusia, pero me gustaría ir.' },
  ],
};
