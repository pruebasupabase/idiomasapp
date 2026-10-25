export default {
  id: 'ru-01',
  title: 'Sonidos, acento y reducción vocálica',
  level: 'A1',
  minutes: 25,
  goal: 'Leer en voz alta con el acento en su lugar y sin pronunciar todas las «о» como «о».',
  theory: `
<p>Las letras ya las conocés. Esta lección arregla lo que más hace que un hispanohablante suene «raro» en ruso: <strong>el acento</strong> y <strong>las vocales sin acento</strong>. En todo el curso vas a ver el acento marcado con <code>´</code> sobre la vocal tónica. En los textos reales no se escribe, pero a vos te hace falta. Las palabras de una sola sílaba no lo llevan, y la <span lang="ru">ё</span> tampoco: siempre es tónica.</p>

<h3>1. El acento manda</h3>
<p>En ruso la vocal tónica se alarga y se pronuncia clara; <mark>las demás se encogen y cambian de sonido</mark>. Por eso el acento se aprende junto con cada palabra: no hay forma de adivinarlo. Y cambiarlo puede cambiar la palabra:</p>
<p><span class="say" lang="ru">за́мок</span> (castillo) y <span class="say" lang="ru">замо́к</span> (cerradura).</p>

<h3>2. La «о» sin acento suena como «а»</h3>
<p>Es la regla más importante. Una «о» sin acento no suena «o»: justo antes de la sílaba tónica suena como una «а» corta, y en otras posiciones como una «а» muy débil.</p>
<div class="table-wrap"><table>
<thead><tr><th>Se escribe</th><th>Suena como</th><th>Significa</th></tr></thead>
<tbody>
<tr><td><span class="say" lang="ru">молоко́</span></td><td lang="ru">малако́</td><td>leche</td></tr>
<tr><td><span class="say" lang="ru">вода́</span></td><td lang="ru">вада́</td><td>agua</td></tr>
<tr><td><span class="say" lang="ru">хорошо́</span></td><td lang="ru">харашо́</td><td>bien</td></tr>
<tr><td><span class="say" lang="ru">Москва́</span></td><td lang="ru">масква́</td><td>Moscú</td></tr>
</tbody></table></div>
<p>Algo parecido les pasa a la <span lang="ru">е</span> y a la <span lang="ru">я</span> sin acento: suenan como una «и» débil. <span class="say" lang="ru">язы́к</span> (idioma) se dice «йизы́к», <span class="say" lang="ru">весна́</span> (primavera) «висна́» y <span class="say" lang="ru">семья́</span> (familia) «симья́».</p>

<h3>3. Las sonoras al final se vuelven sordas</h3>
<p>Al final de una palabra, <span lang="ru">б в г д ж з</span> se pronuncian como <span lang="ru">п ф к т ш с</span>. Se escribe <span class="say" lang="ru">хлеб</span> (pan), pero se dice «хлеп». <span class="say" lang="ru">друг</span> (amigo) suena «друк», <span class="say" lang="ru">глаз</span> (ojo) suena «глас» y <span class="say" lang="ru">нож</span> (cuchillo) suena «нош». Lo mismo pasa dentro de la oración: <span class="say" lang="ru">в шко́ле</span> (en la escuela) se dice «фшко́ле».</p>

<h3>4. Consonantes duras y blandas</h3>
<p>Casi todas las consonantes tienen versión dura y versión blanda. Se ablandan cuando después viene <span lang="ru">ь</span> o una de las vocales «blandas» <span lang="ru">я е ё ю и</span>. Las vocales «duras» son <span lang="ru">а э о у ы</span>.</p>
<p><span class="say" lang="ru">лук</span> (cebolla) con <span lang="ru">л</span> dura, y <span class="say" lang="ru">люк</span> (escotilla) con <span lang="ru">л</span> blanda. <span class="say" lang="ru">брат</span> (hermano) termina dura y <span class="say" lang="ru">брать</span> (tomar) termina blanda.</p>
<aside class="note"><p><span lang="ru">ж</span>, <span lang="ru">ш</span> y <span lang="ru">ц</span> son siempre duras. <span lang="ru">ч</span>, <span lang="ru">щ</span> y <span lang="ru">й</span> son siempre blandas. Por eso después de <span lang="ru">ж ш ц</span> la letra <span lang="ru">и</span> se pronuncia como <span lang="ru">ы</span>: <span class="say" lang="ru">жизнь</span> (vida) suena «жызнь» y <span class="say" lang="ru">цирк</span> (circo) suena «цырк».</p></aside>

<h3>5. Cosas que se escriben distinto de cómo suenan</h3>
<ul>
<li>La <span lang="ru">г</span> de <span lang="ru">-ого</span> y <span lang="ru">-его</span> suena «в»: <span class="say" lang="ru">сего́дня</span> (hoy) se dice «сево́дня».</li>
<li><span class="say" lang="ru">что</span> (qué) se dice «што» y <span class="say" lang="ru">коне́чно</span> (por supuesto) «конешно».</li>
<li>La <span lang="ru">ы</span> no existe en español: es una «i» dicha con la lengua hacia atrás. Escuchá <span class="say" lang="ru">сын</span> (hijo) y compará con <span class="say" lang="ru">син</span>.</li>
</ul>

<h3>6. Entonación</h3>
<p>En una afirmación la voz baja al final: <span class="say" lang="ru">Э́то мой друг.</span> En una pregunta sin palabra interrogativa la voz <mark>sube sobre la sílaba tónica de la palabra por la que preguntás</mark> y después baja: <span class="say" lang="ru">Э́то мой друг?</span> No sube al final de la oración como en español.</p>
`,
  vocab: [
    { t: 'молоко́', es: 'leche', ex: 'Я пью́ молоко́.', exEs: 'Tomo leche.' },
    { t: 'вода́', es: 'agua', ex: 'Э́то вода́.', exEs: 'Esto es agua.' },
    { t: 'хорошо́', es: 'bien', ex: 'Всё хорошо́.', exEs: 'Todo está bien.' },
    { t: 'Москва́', es: 'Moscú', ex: 'Э́то Москва́.', exEs: 'Esto es Moscú.' },
    { t: 'язы́к', es: 'idioma, lengua', ex: 'Э́то ру́сский язы́к.', exEs: 'Este es el idioma ruso.' },
    { t: 'семья́', es: 'familia', ex: 'Э́то моя́ семья́.', exEs: 'Esta es mi familia.' },
    { t: 'друг', es: 'amigo', ex: 'Э́то мой друг.', exEs: 'Este es mi amigo.' },
    { t: 'хлеб', es: 'pan', ex: 'Э́то хлеб.', exEs: 'Esto es pan.' },
    { t: 'жизнь', es: 'vida', ex: 'Жизнь хороша́.', exEs: 'La vida es buena.' },
    { t: 'сего́дня', es: 'hoy', ex: 'Сего́дня хорошо́.', exEs: 'Hoy está bien.' },
    { t: 'коне́чно', es: 'por supuesto', ex: 'Да, коне́чно!', exEs: '¡Sí, por supuesto!' },
    { t: 'го́род', es: 'ciudad', ex: 'Э́то большо́й го́род.', exEs: 'Esta es una ciudad grande.' },
  ],
  exercises: [
    { type: 'mc', q: '¿Cómo suena la primera «о» de **молоко́**?', options: ['Como una «о» clara', 'Como una «а» corta', 'No suena', 'Como una «у»'], answer: 1, explain: 'La «о» sin acento justo antes de la sílaba tónica suena como «а»: молоко́ → «малако́».' },
    { type: 'mc', q: '**хлеб** (pan) se pronuncia al final como…', options: ['«б» firme', '«п»', '«в»', '«м»'], answer: 1, explain: 'Las sonoras al final de palabra se vuelven sordas: б → п. Se dice «хлеп».' },
    { type: 'mc', q: '¿Cómo suena la «г» de **сего́дня**?', options: ['«г»', '«к»', '«в»', '«х»'], answer: 2, explain: 'La «г» de -ого / -его (y en сегодня) suena «в»: «сево́дня».' },
    { type: 'mc', q: 'En **жизнь**, la «и» suena como…', options: ['«и»', '«ы»', '«э»', '«е»'], answer: 1, explain: 'Después de ж, ш y ц, la «и» se pronuncia como «ы» porque esas consonantes son siempre duras.' },
    { type: 'mc', q: '¿Qué letra lleva siempre el acento?', options: ['е', 'я', 'ё', 'ю'], answer: 2, explain: 'La «ё» siempre es tónica, por eso no lleva marca de acento.' },
    { type: 'mc', q: '¿Cómo se pronuncia **хорошо́**?', options: ['«хорошо́»', '«харашо́»', '«хирашо́»', '«харосо́»'], answer: 1, explain: 'Las dos primeras «о» no llevan acento y suenan como «а»: «харашо́».' },
    { type: 'match', instruction: 'Uní cada palabra con cómo suena.', pairs: [['вода́', 'вада́'], ['молоко́', 'малако́'], ['Москва́', 'масква́'], ['хлеб', 'хлеп'], ['друг', 'друк']] },
    { type: 'mc', q: '**лук** (cebolla) y **люк** (escotilla) se diferencian en…', options: ['La «л» es blanda en «люк»', 'La «у» es más larga en «лук»', 'Solamente en el acento', 'No se diferencian'], answer: 0, explain: 'La «ю» ablanda la «л» que la precede.' },
    { type: 'fill', q: 'En **семья́**, la «е» sin acento suena como una «___» débil.', answer: ['и'], hint: 'una vocal que ya conocés', explain: 'La «е» y la «я» sin acento suenan como una «и» débil: «симья́».' },
    { type: 'fill', q: 'Al final de **нож** se oye «но___».', answer: ['ш'], hint: 'la versión sorda de «ж»', explain: 'ж → ш al final de palabra.' },
    { type: 'mc', q: 'En «Э́то мой друг?» (una pregunta sin palabra interrogativa), la voz…', options: ['Sube al final de la oración', 'Sube en la sílaba tónica de «друг» y después baja', 'Baja siempre', 'No cambia'], answer: 1, explain: 'En ruso la entonación de pregunta se concentra en la palabra por la que preguntás y después baja.' },
    { type: 'listen', audio: 'молоко', answer: ['молоко́'], instruction: 'Escuchá y escribí la palabra.' },
    { type: 'listen', audio: 'сегодня', answer: ['сего́дня'], instruction: 'Escuchá y escribí la palabra.' },
    { type: 'tr', q: 'Hoy está bien.', answer: ['Сего́дня хорошо́.'], hint: 'hoy + bien' },
    { type: 'speak', text: 'Всё хорошо́', es: 'Todo está bien.', instruction: 'Leé en voz alta. Cuidá las «о» sin acento.' },
  ],
};
