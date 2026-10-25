export default {
  id: 'ru-05',
  title: 'Adjetivos y posesivos',
  level: 'A1',
  minutes: 30,
  goal: 'Hacer concordar adjetivos y posesivos con el género y el número del sustantivo, y describir personas y cosas.',
  theory: `
<p>En ruso el adjetivo y el posesivo <mark>copian el género y el número del sustantivo</mark> al que acompañan. Es la misma lógica del español («casa nueva», «libros nuevos»), pero con cuatro finales posibles en vez de dos, porque existe el neutro. Y como el género ya lo sabés por la lección anterior, esto es solo cuestión de elegir la terminación.</p>

<h3>Adjetivos: las cuatro terminaciones</h3>
<div class="table-wrap"><table>
<thead><tr><th></th><th>Masculino</th><th>Femenino</th><th>Neutro</th><th>Plural</th></tr></thead>
<tbody>
<tr><td>Dura</td><td><code>-ый</code> / <code>-ой</code></td><td><code>-ая</code></td><td><code>-ое</code></td><td><code>-ые</code></td></tr>
<tr><td>Ejemplo</td><td><span class="say" lang="ru">но́вый дом</span></td><td><span class="say" lang="ru">но́вая кни́га</span></td><td><span class="say" lang="ru">но́вое окно́</span></td><td><span class="say" lang="ru">но́вые кни́ги</span></td></tr>
</tbody></table></div>
<p>La terminación <code>-ой</code> aparece cuando el acento cae en ella: <span class="say" lang="ru">большо́й дом</span>, <span class="say" lang="ru">плохо́й день</span>. El resto se comporta igual: <span lang="ru">большая</span>, <span lang="ru">большо́е</span>, <span lang="ru">больши́е</span>.</p>

<h3>La regla de las siete letras otra vez</h3>
<p>Si la raíz termina en <span lang="ru">г к х ж ш ч щ</span>, no se puede escribir «ы»: el masculino termina en <code>-ий</code> y el plural en <code>-ие</code>. Así tenés <span class="say" lang="ru">хоро́ший друг</span>, <span class="say" lang="ru">хоро́шая кни́га</span>, <span class="say" lang="ru">хоро́шее мо́ре</span>, <span class="say" lang="ru">хоро́шие лю́ди</span>. Lo mismo con <span class="say" lang="ru">ру́сский</span> (ruso) y <span class="say" lang="ru">ма́ленький</span> (pequeño).</p>
<aside class="note"><p>Los idiomas son adjetivos: <span lang="ru">ру́сский язы́к</span> (idioma ruso), <span lang="ru">ру́сская кни́га</span>. Y fijate en que los adjetivos de nacionalidad y de idioma se escriben con minúscula.</p></aside>

<h3>Adjetivos blandos</h3>
<p>Unos pocos adjetivos tienen raíz blanda y se escriben con <code>-ий</code>, <code>-яя</code>, <code>-ее</code>, <code>-ие</code>, como <span class="say" lang="ru">после́дний</span> (último) y <span class="say" lang="ru">си́ний</span> (azul oscuro). No son tantos; los vas a ir juntando de a poco.</p>

<h3>Posesivos</h3>
<div class="table-wrap"><table>
<thead><tr><th></th><th>Masculino</th><th>Femenino</th><th>Neutro</th><th>Plural</th></tr></thead>
<tbody>
<tr><td>mi</td><td><span class="say" lang="ru">мой</span></td><td><span class="say" lang="ru">моя́</span></td><td><span class="say" lang="ru">моё</span></td><td><span class="say" lang="ru">мои́</span></td></tr>
<tr><td>tu (de ты)</td><td><span class="say" lang="ru">твой</span></td><td><span class="say" lang="ru">твоя́</span></td><td><span class="say" lang="ru">твоё</span></td><td><span class="say" lang="ru">твои́</span></td></tr>
<tr><td>nuestro</td><td><span class="say" lang="ru">наш</span></td><td><span class="say" lang="ru">на́ша</span></td><td><span class="say" lang="ru">на́ше</span></td><td><span class="say" lang="ru">на́ши</span></td></tr>
<tr><td>su (de usted / ustedes)</td><td><span class="say" lang="ru">ваш</span></td><td><span class="say" lang="ru">ва́ша</span></td><td><span class="say" lang="ru">ва́ше</span></td><td><span class="say" lang="ru">ва́ши</span></td></tr>
</tbody></table></div>
<p><mark>Su</mark> de tercera persona no cambia nunca: <span class="say" lang="ru">его́</span> (de él), <span class="say" lang="ru">её</span> (de ella), <span class="say" lang="ru">их</span> (de ellos). <span lang="ru">его́ кни́га</span>, <span lang="ru">её кни́ги</span>, <span lang="ru">их дом</span>.</p>

<h3>El adjetivo corto «el libro es nuevo»</h3>
<p>Para decir «es nuevo» no hace falta «ser»: <span class="say" lang="ru">Дом но́вый.</span> <span class="say" lang="ru">Кни́га интере́сная.</span> <span class="say" lang="ru">Окно́ большо́е.</span> Se usa el mismo adjetivo, con el género que corresponde.</p>
`,
  vocab: [
    { t: 'но́вый', es: 'nuevo', ex: 'Э́то мой но́вый дом.', exEs: 'Esta es mi casa nueva.' },
    { t: 'ста́рый', es: 'viejo', ex: 'Э́то ста́рая кни́га.', exEs: 'Es un libro viejo.' },
    { t: 'большо́й', es: 'grande', ex: 'У нас большо́й го́род.', exEs: 'Tenemos una ciudad grande.' },
    { t: 'ма́ленький', es: 'pequeño', ex: 'Э́то ма́ленькое окно́.', exEs: 'Es una ventana pequeña.' },
    { t: 'краси́вый', es: 'lindo, hermoso', ex: 'Кака́я краси́вая страна́!', exEs: '¡Qué país hermoso!' },
    { t: 'интере́сный', es: 'interesante', ex: 'Э́то интере́сная кни́га.', exEs: 'Es un libro interesante.' },
    { t: 'хоро́ший', es: 'bueno', ex: 'Он хоро́ший учи́тель.', exEs: 'Es un buen profesor.' },
    { t: 'плохо́й', es: 'malo', ex: 'У меня́ плохо́й день.', exEs: 'Tengo un mal día.' },
    { t: 'ру́сский', es: 'ruso', ex: 'Э́то ру́сская кни́га.', exEs: 'Es un libro ruso.' },
    { t: 'молодо́й', es: 'joven', ex: 'Он молодо́й учи́тель.', exEs: 'Es un profesor joven.' },
    { t: 'дорого́й', es: 'caro; querido', ex: 'Э́то дорого́й дом.', exEs: 'Es una casa cara.' },
    { t: 'дешёвый', es: 'barato', ex: 'Э́то дешёвая кни́га.', exEs: 'Es un libro barato.' },
    { t: 'страна́', es: 'país', ex: 'Моя́ страна́ — Аргенти́на.', exEs: 'Mi país es Argentina.' },
  ],
  exercises: [
    { type: 'fill', q: 'Э́то ___ дом. (nuevo)', answer: ['но́вый'] },
    { type: 'fill', q: 'Э́то ___ кни́га. (nueva)', answer: ['но́вая'] },
    { type: 'fill', q: 'Э́то ___ окно́. (grande)', answer: ['большо́е'] },
    { type: 'fill', q: 'Э́то ___ лю́ди. (buenas personas)', answer: ['хоро́шие'], explain: 'Después de «ш» no se escribe «ы»: хоро́шие.' },
    { type: 'fill', q: 'Э́то ___ друг. (mi amigo)', answer: ['мой'] },
    { type: 'fill', q: 'Э́то ___ страна́. (nuestro país)', answer: ['на́ша'], hint: 'страна́ es femenino' },
    { type: 'fill', q: 'Э́то ___ де́ти. (mis hijos)', answer: ['мои́'] },
    { type: 'mc', q: '¿Cuál es correcto?', options: ['ру́сский кни́га', 'ру́сская кни́га', 'ру́сское кни́га', 'ру́сские кни́га'], answer: 1, explain: 'кни́га es femenino, así que el adjetivo termina en -ая.' },
    { type: 'mc', q: 'Para decir «su libro (de ella)» se usa…', options: ['её кни́га', 'ва́ша кни́га', 'его́ кни́га', 'её кни́гу'], answer: 0, explain: '«Su» de tercera persona no cambia: его́ / её / их.' },
    { type: 'mc', q: '¿Por qué se escribe **хоро́ший** y no «хоро́шый»?', options: ['Es una excepción solo de esta palabra', 'Después de ж, ш, ч, щ, г, к, х no se escribe «ы»', 'Porque es de género femenino', 'Porque lleva acento'], answer: 1, explain: 'La regla de las siete letras.' },
    { type: 'match', instruction: 'Uní el sustantivo con su adjetivo correcto.', pairs: [['дом', 'но́вый'], ['кни́га', 'но́вая'], ['окно́', 'но́вое'], ['кни́ги', 'но́вые']] },
    { type: 'tr', q: 'Mi casa es grande.', answer: ['Мой дом большо́й.'] },
    { type: 'tr', q: 'Su libro (de ella) es interesante.', answer: ['Её кни́га интере́сная.'] },
    { type: 'order', q: 'Esta es nuestra ciudad.', answer: 'Э́то наш го́род.', extra: ['на́ша'] },
    { type: 'listen', audio: 'хороший друг', answer: ['хоро́ший друг'], instruction: 'Escuchá y escribí las dos palabras.' },
  ],
};
