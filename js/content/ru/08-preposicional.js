export default {
  id: 'ru-08',
  title: 'Preposicional: dónde y sobre qué',
  level: 'A1',
  minutes: 30,
  goal: 'Decir dónde está algo o alguien y sobre qué se habla o se piensa, usando el caso preposicional con в, на y о.',
  theory: `
<p>El caso <strong>preposicional</strong> se llama así porque <mark>solo existe después de una preposición</mark>. Las tres principales: <span lang="ru">в</span> (en, dentro de), <span lang="ru">на</span> (en, sobre) y <span lang="ru">о</span> (sobre, acerca de). Responde a <span class="say" lang="ru">Где?</span> (¿dónde?) y a <span class="say" lang="ru">О ком? О чём?</span> (¿de quién? ¿de qué?).</p>

<h3>Terminaciones</h3>
<div class="table-wrap"><table>
<thead><tr><th>Nominativo</th><th>Terminación</th><th>Ejemplo</th></tr></thead>
<tbody>
<tr><td>Masculino (consonante)</td><td><code>-е</code></td><td><span class="say" lang="ru">в до́ме</span>, <span class="say" lang="ru">в го́роде</span></td></tr>
<tr><td>Femenino en -а</td><td><code>-е</code></td><td><span class="say" lang="ru">в шко́ле</span>, <span class="say" lang="ru">на рабо́те</span></td></tr>
<tr><td>Neutro en -о</td><td><code>-е</code></td><td><span class="say" lang="ru">в окне́</span>, <span class="say" lang="ru">на письме́</span></td></tr>
<tr><td>-ь, -ия, -ие (y -й)</td><td><code>-и</code> / <code>-ии</code></td><td><span class="say" lang="ru">в Росси́и</span>, <span class="say" lang="ru">в музе́е</span></td></tr>
</tbody></table></div>
<p>Los adjetivos también cambian: masculino y neutro <code>-ом</code> (<span lang="ru">в большо́м до́ме</span>), femenino <code>-ой</code> (<span lang="ru">в большо́й ко́мнате</span>). Los posesivos siguen el mismo patrón: <span lang="ru">в моём до́ме</span>, <span lang="ru">в мое́й шко́ле</span>.</p>

<h3>В y на</h3>
<p>No son intercambiables. <span lang="ru">в</span> se usa para espacios cerrados o ciudades y países; <span lang="ru">на</span> para superficies, eventos, calles y unos cuantos lugares que simplemente lo piden.</p>
<ul>
<li><span class="say" lang="ru">в до́ме</span>, <span class="say" lang="ru">в шко́ле</span>, <span class="say" lang="ru">в го́роде</span>, <span class="say" lang="ru">в Аргенти́не</span>, <span class="say" lang="ru">в Москве́</span></li>
<li><span class="say" lang="ru">на рабо́те</span> (en el trabajo), <span class="say" lang="ru">на у́лице</span> (en la calle), <span class="say" lang="ru">на столе́</span> (sobre la mesa), <span class="say" lang="ru">на ку́хне</span> (en la cocina), <span class="say" lang="ru">на конце́рте</span></li>
</ul>
<aside class="note"><p>Los lugares con <span lang="ru">на</span> hay que aprenderlos de a uno. Una pista: eventos (<span lang="ru">на уро́ке</span>, en la clase), superficies (<span lang="ru">на столе́</span>), espacios abiertos (<span lang="ru">на у́лице</span>) y el trabajo (<span lang="ru">на рабо́те</span>). El resto, <span lang="ru">в</span>.</p></aside>

<h3>Algunas terminaciones sorpresa</h3>
<p>Unos pocos masculinos toman <code>-у́</code> (acentuada) con <span lang="ru">в</span> y <span lang="ru">на</span>: <span class="say" lang="ru">в саду́</span> (en el jardín), <span class="say" lang="ru">в лесу́</span> (en el bosque), <span class="say" lang="ru">на мосту́</span> (en el puente), <span class="say" lang="ru">в шкафу́</span> (en el armario). Son pocos; tratalos como excepciones.</p>

<h3>О + preposicional: sobre qué hablás</h3>
<p><span class="say" lang="ru">Я ду́маю о тебе́.</span> (Pienso en vos.) · <span class="say" lang="ru">Мы говори́м о рабо́те.</span> (Hablamos del trabajo.) · <span class="say" lang="ru">Кни́га о Росси́и.</span> (Un libro sobre Rusia.) Cuando la palabra siguiente empieza con vocal, la preposición agrega una «б»: <span class="say" lang="ru">об о́тпуске</span> (sobre las vacaciones), <span class="say" lang="ru">об Анто́не</span>.</p>
<p>Los pronombres personales en preposicional: <span lang="ru">обо мне́, о тебе́, о нём, о ней, о нас, о вас, о них</span>.</p>
`,
  vocab: [
    { t: 'у́лица', es: 'calle', ex: 'Мы на у́лице.', exEs: 'Estamos en la calle.' },
    { t: 'рабо́та', es: 'trabajo', ex: 'Я на рабо́те.', exEs: 'Estoy en el trabajo.' },
    { t: 'ку́хня', es: 'cocina', ex: 'Мать на ку́хне.', exEs: 'Mamá está en la cocina.' },
    { t: 'ко́мната', es: 'habitación', ex: 'Моя́ ко́мната больша́я.', exEs: 'Mi habitación es grande.' },
    { t: 'уро́к', es: 'clase, lección', ex: 'Я на уро́ке.', exEs: 'Estoy en clase.' },
    { t: 'конце́рт', es: 'concierto', ex: 'Мы на конце́рте.', exEs: 'Estamos en un concierto.' },
    { t: 'Росси́я', es: 'Rusia', ex: 'Я живу́ в Росси́и.', exEs: 'Vivo en Rusia.' },
    { t: 'Аргенти́на', es: 'Argentina', ex: 'Он в Аргенти́не.', exEs: 'Él está en Argentina.' },
    { t: 'мать', es: 'madre', ex: 'Моя́ мать до́ма.', exEs: 'Mi madre está en casa.' },
    { t: 'оте́ц', es: 'padre', ex: 'Мой оте́ц на рабо́те.', exEs: 'Mi padre está en el trabajo.' },
    { t: 'где', es: 'dónde', ex: 'Где твой брат?', exEs: '¿Dónde está tu hermano?' },
    { t: 'до́ма', es: 'en casa', ex: 'Я до́ма.', exEs: 'Estoy en casa.' },
    { t: 'в', es: 'en, dentro de (preposición)', ex: 'Он в шко́ле.', exEs: 'Él está en la escuela.' },
    { t: 'на', es: 'en, sobre (preposición)', ex: 'Кни́га на столе́.', exEs: 'El libro está sobre la mesa.' },
  ],
  exercises: [
    { type: 'fill', q: 'Я живу́ в ___. (го́род)', answer: ['го́роде'] },
    { type: 'fill', q: 'Мы в ___. (шко́ла)', answer: ['шко́ле'] },
    { type: 'fill', q: 'Кни́га на ___. (стол)', answer: ['столе́'] },
    { type: 'fill', q: 'Он живёт в ___. (Росси́я)', answer: ['Росси́и'], explain: 'Los sustantivos en -ия toman -ии en preposicional.' },
    { type: 'fill', q: 'Она́ на ___. (рабо́та)', answer: ['рабо́те'] },
    { type: 'fill', q: 'Мы говори́м о ___. (рабо́та)', answer: ['рабо́те'] },
    { type: 'fill', q: 'Мы живём в ___ го́роде. (большо́й)', answer: ['большо́м'] },
    { type: 'fill', q: 'Я ду́маю о ___. (ты)', answer: ['тебе́'] },
    { type: 'mc', q: '¿Cuál es correcto?', options: ['Я на шко́ле.', 'Я в шко́ле.', 'Я в шко́ла.', 'Я на шко́ла.'], answer: 1 },
    { type: 'mc', q: '«Estoy en el trabajo» se dice…', options: ['Я в рабо́те.', 'Я на рабо́те.', 'Я на рабо́ту.', 'Я в рабо́ту.'], answer: 1, explain: 'рабо́та va con «на» y se escribe «рабо́те» en preposicional.' },
    { type: 'mc', q: '¿Qué pregunta se contesta con el preposicional?', options: ['Куда́?', 'Где?', 'Кто?', 'Ско́лько?'], answer: 1, explain: 'Где? (¿dónde?) pide preposicional; Куда́? (¿adónde?) pide acusativo.' },
    { type: 'match', instruction: 'Uní cada lugar con «dónde estás» (preposición + caso).', pairs: [['го́род', 'в го́роде'], ['у́лица', 'на у́лице'], ['ку́хня', 'на ку́хне'], ['шко́ла', 'в шко́ле'], ['конце́рт', 'на конце́рте']] },
    { type: 'tr', q: 'Mi madre está en la cocina.', answer: ['Моя́ мать на ку́хне.', 'Мать на ку́хне.'] },
    { type: 'tr', q: 'Vivo en Argentina.', answer: ['Я живу́ в Аргенти́не.'] },
    { type: 'order', q: 'Hablamos de Rusia.', answer: 'Мы говори́м о Росси́и.', extra: ['в'] },
    { type: 'listen', audio: 'я на работе', answer: ['Я на рабо́те'], instruction: 'Escuchá y escribí la frase.' },
  ],
};
