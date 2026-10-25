export default {
  id: 'ru-02',
  title: 'Saludos y presentarse',
  level: 'A1',
  minutes: 25,
  goal: 'Saludar, decir cómo te llamás y de dónde sos, y pedir que te repitan algo, con «ты» o «вы» según corresponda.',
  theory: `
<h3>Ты o вы</h3>
<p>El ruso tiene dos formas de dirigirse a alguien: <span class="say" lang="ru">ты</span> (informal: amigos, familia, chicos de tu edad) y <span class="say" lang="ru">вы</span> (formal, o plural). No existe un «vos» aparte: <span lang="ru">ты</span> cumple ese papel. Con adultos que no conocés, en un negocio o por escrito, usá <span lang="ru">вы</span>.</p>

<h3>Saludos y despedidas</h3>
<div class="table-wrap"><table>
<thead><tr><th>Informal</th><th>Formal</th><th>Significa</th></tr></thead>
<tbody>
<tr><td><span class="say" lang="ru">Приве́т!</span></td><td><span class="say" lang="ru">Здра́вствуйте!</span></td><td>¡Hola!</td></tr>
<tr><td><span class="say" lang="ru">Пока́!</span></td><td><span class="say" lang="ru">До свида́ния!</span></td><td>¡Chau! / Adiós</td></tr>
<tr><td><span class="say" lang="ru">Как дела́?</span></td><td><span class="say" lang="ru">Как у вас дела́?</span></td><td>¿Cómo andás? / ¿Cómo le va?</td></tr>
<tr><td><span class="say" lang="ru">Спаси́бо!</span></td><td><span class="say" lang="ru">Большо́е спаси́бо!</span></td><td>¡Gracias! / ¡Muchas gracias!</td></tr>
<tr><td><span class="say" lang="ru">Извини́!</span></td><td><span class="say" lang="ru">Извини́те!</span></td><td>Perdón / Disculpe</td></tr>
</tbody></table></div>
<p>Según la hora: <span class="say" lang="ru">До́брое у́тро</span> (buen día, a la mañana), <span class="say" lang="ru">До́брый день</span> (buen día, de día), <span class="say" lang="ru">До́брый ве́чер</span> (buenas tardes / buenas noches al llegar) y <span class="say" lang="ru">Споко́йной но́чи</span> (que descanses, al irse a dormir).</p>
<p><span class="say" lang="ru">Пожа́луйста</span> significa tanto «por favor» como «de nada».</p>

<h3>Presentarse</h3>
<p>En ruso no se dice «yo me llamo» sino algo como «a mí me llaman»:</p>
<p><span class="say" lang="ru">Меня́ зову́т Анто́н.</span> (Me llamo Antón.)<br><span class="say" lang="ru">Как вас зову́т?</span> (¿Cómo se llama usted?)<br><span class="say" lang="ru">Как тебя́ зову́т?</span> (¿Cómo te llamás?)</p>
<p>Después de presentarse: <span class="say" lang="ru">О́чень прия́тно.</span> (Mucho gusto.)</p>

<h3>De dónde sos</h3>
<p><span class="say" lang="ru">Вы отку́да?</span> (¿De dónde es usted?) — <span class="say" lang="ru">Я из Аргенти́ны.</span> (Soy de Argentina.)</p>
<p>La nacionalidad cambia según seas hombre o mujer: <span lang="ru">я аргенти́нец</span> / <span lang="ru">я аргенти́нка</span>; <span lang="ru">я ру́сский</span> / <span lang="ru">я ру́сская</span>.</p>

<h3>Sin verbo «ser»</h3>
<p>En presente, el ruso <mark>no usa el verbo «ser»</mark>. Se dice directamente <span class="say" lang="ru">Я студе́нт.</span> (Soy estudiante), <span class="say" lang="ru">Он врач.</span> (Él es médico). Cuando escribas, no inventes una palabra para «soy»: no hace falta.</p>

<h3>Si no entendés</h3>
<p><span class="say" lang="ru">Я не понима́ю.</span> (No entiendo.) · <span class="say" lang="ru">Повтори́те, пожа́луйста.</span> (Repita, por favor.) · <span class="say" lang="ru">Я немно́го говорю́ по-ру́сски.</span> (Hablo un poco de ruso.)</p>
`,
  dialogue: [
    { who: 'Анто́н', t: 'Здра́вствуйте! Меня́ зову́т Анто́н. А как вас зову́т?', es: '¡Hola! Me llamo Antón. ¿Y usted, cómo se llama?' },
    { who: 'Мари́я', t: 'Здра́вствуйте, Анто́н! Меня́ зову́т Мари́я. О́чень прия́тно.', es: '¡Hola, Antón! Me llamo María. Mucho gusto.' },
    { who: 'Анто́н', t: 'О́чень прия́тно. Вы отку́да?', es: 'Mucho gusto. ¿De dónde es usted?' },
    { who: 'Мари́я', t: 'Я из Аргенти́ны. А вы?', es: 'Soy de Argentina. ¿Y usted?' },
    { who: 'Анто́н', t: 'Я из Москвы́. Вы хорошо́ говори́те по-ру́сски!', es: 'Soy de Moscú. ¡Usted habla muy bien ruso!' },
    { who: 'Мари́я', t: 'Спаси́бо, но я говорю́ то́лько немно́го.', es: 'Gracias, pero hablo solo un poco.' },
  ],
  vocab: [
    { t: 'Здра́вствуйте', es: 'hola (formal)', ex: 'Здра́вствуйте, Мари́я!', exEs: '¡Hola, María!' },
    { t: 'Приве́т', es: 'hola, chau (informal)', ex: 'Приве́т, Анто́н!', exEs: '¡Hola, Antón!' },
    { t: 'До свида́ния', es: 'adiós', ex: 'До свида́ния, Мари́я!', exEs: '¡Adiós, María!' },
    { t: 'Спаси́бо', es: 'gracias', ex: 'Большо́е спаси́бо!', exEs: '¡Muchas gracias!' },
    { t: 'Пожа́луйста', es: 'por favor, de nada', ex: 'Пожа́луйста, повтори́те.', exEs: 'Repita, por favor.' },
    { t: 'Извини́те', es: 'perdón, disculpe', ex: 'Извини́те, я не понима́ю.', exEs: 'Disculpe, no entiendo.' },
    { t: 'Как дела́?', es: '¿cómo andás?', ex: 'Как у вас дела́?', exEs: '¿Cómo le va?' },
    { t: 'О́чень прия́тно', es: 'mucho gusto', ex: 'Меня́ зову́т Анто́н. О́чень прия́тно.', exEs: 'Me llamo Antón. Mucho gusto.' },
    { t: 'Меня́ зову́т', es: 'me llamo', ex: 'Меня́ зову́т Мари́я.', exEs: 'Me llamo María.' },
    { t: 'отку́да', es: 'de dónde', ex: 'Вы отку́да?', exEs: '¿De dónde es usted?' },
    { t: 'говори́ть', es: 'hablar', ex: 'Я говорю́ по-ру́сски.', exEs: 'Hablo ruso.' },
    { t: 'по-ру́сски', es: 'en ruso', ex: 'Вы говори́те по-ру́сски?', exEs: '¿Habla usted ruso?' },
    { t: 'немно́го', es: 'un poco', ex: 'Я немно́го понима́ю.', exEs: 'Entiendo un poco.' },
    { t: 'да', es: 'sí', ex: 'Да, коне́чно.', exEs: 'Sí, por supuesto.' },
    { t: 'нет', es: 'no', ex: 'Нет, спаси́бо.', exEs: 'No, gracias.' },
  ],
  exercises: [
    { type: 'match', instruction: 'Uní la forma informal con la formal.', pairs: [['Приве́т', 'Здра́вствуйте'], ['Пока́', 'До свида́ния'], ['Извини́', 'Извини́те'], ['Как дела́?', 'Как у вас дела́?'], ['Спаси́бо', 'Большо́е спаси́бо']] },
    { type: 'mc', q: 'Llegás a una oficina y saludás a una persona mayor que no conocés. ¿Qué decís?', options: ['Приве́т!', 'Здра́вствуйте!', 'Пока́!', 'Спаси́бо!'], answer: 1, explain: 'Con desconocidos y adultos se usa la forma formal: Здра́вствуйте.' },
    { type: 'mc', q: '¿Qué significa **Меня́ зову́т Анто́н**?', options: ['Conozco a Antón', 'Me llamo Antón', 'Llamo a Antón', 'Antón me llama'], answer: 1, explain: 'Literalmente «a mí me llaman Antón».' },
    { type: 'fill', q: '___ зову́т Мари́я. (Me llamo María.)', answer: ['Меня́'], hint: 'me' },
    { type: 'tr', q: 'Mucho gusto.', answer: ['О́чень прия́тно.'] },
    { type: 'tr', q: 'Soy de Argentina.', answer: ['Я из Аргенти́ны.'] },
    { type: 'order', q: '¿Cómo te llamás?', answer: 'Как тебя́ зову́т?', extra: ['вас'] },
    { type: 'order', q: '¿Habla usted ruso?', answer: 'Вы говори́те по-ру́сски?', extra: ['ты'] },
    { type: 'mc', q: 'Una mujer se presenta: **Я аргенти́нка**. ¿Qué cambiaría si fuera un hombre?', options: ['Nada', 'Diría «аргенти́нец»', 'Diría «аргенти́нцы»', 'Diría «аргенти́нку»'], answer: 1, explain: 'аргенти́нец es el masculino y аргенти́нка el femenino.' },
    { type: 'mc', q: '¿Cómo se dice «Soy estudiante»?', options: ['Я есть студе́нт.', 'Я студе́нт.', 'Я быть студе́нт.', 'Студе́нт я есть.'], answer: 1, explain: 'En presente no se usa el verbo «ser»: Я студе́нт.' },
    { type: 'listen', audio: 'Как дела', answer: ['Как дела́?'], instruction: 'Escuchá y escribí la pregunta.' },
    { type: 'listen', audio: 'Очень приятно', answer: ['О́чень прия́тно'], instruction: 'Escuchá y escribí la frase.' },
    { type: 'tr', dir: 't>es', q: 'Вы отку́да?', answer: ['¿De dónde es usted?', '¿De dónde son?', '¿De dónde sos?', '¿De dónde eres?', '¿De dónde es?'], explain: 'Вы es la forma formal (o plural): «¿De dónde es usted?».' },
    { type: 'speak', text: 'Меня́ зову́т Анто́н. О́чень прия́тно.', es: 'Me llamo Antón. Mucho gusto.' },
  ],
};
