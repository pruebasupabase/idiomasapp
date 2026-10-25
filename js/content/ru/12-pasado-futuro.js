export default {
  id: 'ru-12',
  title: 'Pasado y futuro',
  level: 'A1',
  minutes: 30,
  goal: 'Formar el pasado y el futuro compuesto y hablar de lo que pasó ayer, de lo que va a pasar mañana y del verbo «быть».',
  theory: `
<p>Acá el ruso es más fácil que el español: el pasado no cambia con la persona sino con el <mark>género</mark> del sujeto, y el futuro más sencillo se arma con «быть».</p>

<h3>El pasado: quitar -ть y agregar -л</h3>
<p>Al infinitivo se le saca <code>-ть</code> y se agrega la terminación según el género y el número del sujeto:</p>
<div class="table-wrap"><table>
<thead><tr><th>Sujeto</th><th>Terminación</th><th>чита́ть</th></tr></thead>
<tbody>
<tr><td>он (masculino)</td><td><code>-л</code></td><td><span class="say" lang="ru">он чита́л</span></td></tr>
<tr><td>она́ (femenino)</td><td><code>-ла</code></td><td><span class="say" lang="ru">она́ чита́ла</span></td></tr>
<tr><td>оно́ (neutro)</td><td><code>-ло</code></td><td><span class="say" lang="ru">оно́ чита́ло</span></td></tr>
<tr><td>они́, мы, вы (plural)</td><td><code>-ли</code></td><td><span class="say" lang="ru">они́ чита́ли</span></td></tr>
</tbody></table></div>
<p>Para <span lang="ru">я</span> y <span lang="ru">ты</span> se usa la forma del género de quien habla: Santi dice <span lang="ru">Я чита́л</span>, su novia dice <span lang="ru">Я чита́ла</span>. <span lang="ru">Ты</span> sigue la misma lógica. Con <span lang="ru">вы</span> siempre va plural: <span lang="ru">Вы чита́ли</span>, aun hablándole a una sola persona.</p>
<aside class="note"><p>No existe un equivalente al pretérito indefinido vs. imperfecto del español. El mismo pasado cubre «leí», «leía» y «estaba leyendo». La diferencia se hace con el <mark>aspecto</mark> del verbo (lección 14).</p></aside>

<h3>Pasados irregulares frecuentes</h3>
<div class="table-wrap"><table>
<thead><tr><th>Infinitivo</th><th>Masc.</th><th>Fem.</th><th>Plural</th></tr></thead>
<tbody>
<tr><td><span lang="ru">быть</span> (ser, estar)</td><td><span class="say" lang="ru">был</span></td><td><span class="say" lang="ru">была́</span></td><td><span class="say" lang="ru">бы́ли</span></td></tr>
<tr><td><span lang="ru">идти́</span> (ir a pie)</td><td><span class="say" lang="ru">шёл</span></td><td><span class="say" lang="ru">шла</span></td><td><span class="say" lang="ru">шли</span></td></tr>
<tr><td><span lang="ru">мочь</span> (poder)</td><td><span class="say" lang="ru">мог</span></td><td><span class="say" lang="ru">могла́</span></td><td><span class="say" lang="ru">могли́</span></td></tr>
<tr><td><span lang="ru">есть</span> (comer)</td><td><span class="say" lang="ru">ел</span></td><td><span class="say" lang="ru">е́ла</span></td><td><span class="say" lang="ru">е́ли</span></td></tr>
</tbody></table></div>
<p>En el pasado, «быть» tiene que decirse: <span class="say" lang="ru">Вчера́ я был до́ма.</span> (Ayer estuve en casa.) · <span class="say" lang="ru">Она́ была́ на рабо́те.</span> Y con «tener»: <span class="say" lang="ru">У меня́ был брат.</span> / <span class="say" lang="ru">У меня́ была́ сестра́.</span> (concuerda con lo que se tenía). Si no había: <span class="say" lang="ru">У нас не́ было вре́мени.</span> (siempre neutro, <span lang="ru">не́ было</span>).</p>

<h3>El futuro compuesto: быть + infinitivo</h3>
<div class="table-wrap"><table>
<thead><tr><th>я</th><th>ты</th><th>он / она́</th><th>мы</th><th>вы</th><th>они́</th></tr></thead>
<tbody><tr>
<td><span class="say" lang="ru">бу́ду</span></td><td><span class="say" lang="ru">бу́дешь</span></td><td><span class="say" lang="ru">бу́дет</span></td><td><span class="say" lang="ru">бу́дем</span></td><td><span class="say" lang="ru">бу́дете</span></td><td><span class="say" lang="ru">бу́дут</span></td>
</tr></tbody></table></div>
<p><span class="say" lang="ru">За́втра я бу́ду рабо́тать.</span> (Mañana voy a trabajar.) · <span class="say" lang="ru">Мы бу́дем чита́ть.</span> · <span class="say" lang="ru">Что ты бу́дешь де́лать?</span> (¿Qué vas a hacer?) Y solo, «быть» es «estaré / seré»: <span lang="ru">За́втра я бу́ду до́ма.</span></p>
<p>Esta forma funciona con verbos <b>imperfectivos</b>, los que vimos hasta ahora. Los verbos perfectivos tienen su propio futuro simple, que vas a ver en la lección 14.</p>

<h3>Palabras de tiempo</h3>
<p><span class="say" lang="ru">вчера́</span> (ayer), <span class="say" lang="ru">сего́дня</span> (hoy), <span class="say" lang="ru">за́втра</span> (mañana), <span class="say" lang="ru">ра́ньше</span> (antes), <span class="say" lang="ru">пото́м</span> (después), <span class="say" lang="ru">неда́вно</span> (hace poco), <span class="say" lang="ru">тогда́</span> (entonces).</p>
`,
  vocab: [
    { t: 'быть', es: 'ser, estar (haber)', ex: 'Я бу́ду до́ма.', exEs: 'Voy a estar en casa.' },
    { t: 'мочь', es: 'poder', ex: 'Я могу́ помо́чь.', exEs: 'Puedo ayudar.' },
    { t: 'ждать', es: 'esperar', ex: 'Я жду тебя́.', exEs: 'Te espero.' },
    { t: 'вчера́', es: 'ayer', ex: 'Вчера́ я был до́ма.', exEs: 'Ayer estuve en casa.' },
    { t: 'за́втра', es: 'mañana', ex: 'За́втра я рабо́таю.', exEs: 'Mañana trabajo.' },
    { t: 'ра́ньше', es: 'antes', ex: 'Ра́ньше я жил в Москве́.', exEs: 'Antes vivía en Moscú.' },
    { t: 'пото́м', es: 'después', ex: 'Пото́м я чита́ю.', exEs: 'Después leo.' },
    { t: 'неда́вно', es: 'hace poco', ex: 'Он неда́вно рабо́тал.', exEs: 'Trabajó hace poco.' },
    { t: 'тогда́', es: 'entonces', ex: 'Тогда́ я не знал.', exEs: 'Entonces yo no sabía.' },
    { t: 'снача́ла', es: 'primero, al principio', ex: 'Снача́ла я рабо́таю.', exEs: 'Primero trabajo.' },
    { t: 'наконе́ц', es: 'por fin', ex: 'Наконе́ц я до́ма!', exEs: '¡Por fin estoy en casa!' },
  ],
  exercises: [
    { type: 'fill', q: 'Вчера́ он ___ кни́гу. (чита́ть)', answer: ['чита́л'] },
    { type: 'fill', q: 'Вчера́ она́ ___ кни́гу. (чита́ть)', answer: ['чита́ла'] },
    { type: 'fill', q: 'Мы ___ в Москве́. (жить, pasado)', answer: ['жи́ли'], hint: 'plural → -ли' },
    { type: 'fill', q: 'Вчера́ я ___ до́ма. (hombre, быть)', answer: ['был'] },
    { type: 'fill', q: 'Она́ ___ на рабо́те. (быть)', answer: ['была́'] },
    { type: 'fill', q: 'За́втра я ___ рабо́тать. (бу́ду / будешь)', answer: ['бу́ду'] },
    { type: 'fill', q: 'Что ты ___ де́лать? (futuro)', answer: ['бу́дешь'] },
    { type: 'mc', q: 'Una mujer dice «Yo trabajé». ¿Cuál usa?', options: ['Я рабо́тал', 'Я рабо́тала', 'Я рабо́тало', 'Я рабо́тали'], answer: 1 },
    { type: 'mc', q: '«Antes yo vivía en Moscú» (un hombre) se dice…', options: ['Ра́ньше я жил в Москве́.', 'Ра́ньше я жила́ в Москве́.', 'Ра́ньше я живу́ в Москве́.', 'Ра́ньше я бу́ду жить в Москве́.'], answer: 0 },
    { type: 'mc', q: '«Nosotros no teníamos tiempo» →', options: ['У нас не́ было вре́мени.', 'У нас был вре́мя.', 'У нас не было вре́мя.', 'Мы не были время.'], answer: 0, explain: '«Не́ было» es una expresión fija, siempre en neutro.' },
    { type: 'match', instruction: 'Uní cada palabra de tiempo con su traducción.', pairs: [['вчера́', 'ayer'], ['за́втра', 'mañana'], ['пото́м', 'después'], ['ра́ньше', 'antes'], ['наконе́ц', 'por fin']] },
    { type: 'tr', q: 'Ayer trabajé en casa. (hombre)', answer: ['Вчера́ я рабо́тал до́ма.', 'Я вчера́ рабо́тал до́ма.'] },
    { type: 'tr', q: 'Mañana voy a leer.', answer: ['За́втра я бу́ду чита́ть.'] },
    { type: 'order', q: '¿Qué vas a hacer mañana?', answer: 'Что ты бу́дешь де́лать за́втра?', extra: ['был'] },
    { type: 'listen', audio: 'вчера я был дома', answer: ['Вчера́ я был до́ма'], instruction: 'Escuchá y escribí la frase.' },
  ],
};
