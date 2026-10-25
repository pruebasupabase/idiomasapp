export default {
  id: 'en-11',
  title: 'Relative clauses',
  level: 'B2',
  minutes: 30,
  goal: 'Unir ideas con who, which, that, whose, where y when, distinguir las cláusulas definidas de las no definidas y omitir el pronombre cuando se puede.',
  theory: `
<p>Las cláusulas de relativo agregan información sobre un sustantivo y evitan repetir. Se parecen mucho al español («el hombre <em>que</em> vive acá»), pero en inglés el pronombre depende de si hablás de una <b>persona</b> o una <b>cosa</b>.</p>

<h3>Los pronombres relativos</h3>
<div class="table-wrap"><table>
<thead><tr><th>Pronombre</th><th>Se usa para</th><th>Ejemplo</th></tr></thead>
<tbody>
<tr><td><span class="say" lang="en">who</span></td><td>personas (sujeto u objeto)</td><td><span lang="en">The woman who lives next door is a doctor.</span></td></tr>
<tr><td><span class="say" lang="en">which</span></td><td>cosas</td><td><span lang="en">The book which I bought is great.</span></td></tr>
<tr><td><span class="say" lang="en">that</span></td><td>personas o cosas (en cláusulas definidas)</td><td><span lang="en">The film that we saw was long.</span></td></tr>
<tr><td><span class="say" lang="en">whose</span></td><td>posesión</td><td><span lang="en">That's the man whose car was stolen.</span></td></tr>
<tr><td><span class="say" lang="en">where</span></td><td>lugares</td><td><span lang="en">This is the city where I was born.</span></td></tr>
<tr><td><span class="say" lang="en">when</span></td><td>momentos</td><td><span lang="en">I remember the day when we met.</span></td></tr>
</tbody></table></div>
<p>En español «cuyo» concuerda con lo poseído; <span lang="en">whose</span> no cambia: <span lang="en">the girl whose brother is a singer</span>.</p>

<h3>Definidas y no definidas</h3>
<p>Una cláusula <b>definida</b> es necesaria para saber de quién o de qué se habla; no lleva comas. <span class="say" lang="en">The students who study hard pass the exam.</span> (solo los que estudian)</p>
<p>Una cláusula <b>no definida</b> agrega un dato extra; va entre comas y <mark>no se puede usar «that»</mark>: <span class="say" lang="en">My brother, who lives in Rosario, is a teacher.</span> · <span class="say" lang="en">The Obelisk, which was built in 1936, is in Buenos Aires.</span></p>
<aside class="note"><p>Fijate en el efecto de las comas: <span lang="en">My brother who lives in Rosario</span> (sin comas) sugiere que tenés más de un hermano; <span lang="en">My brother, who lives in Rosario</span> sugiere que tenés uno solo.</p></aside>

<h3>Cuándo se puede omitir el pronombre</h3>
<p>Si el pronombre es el <b>objeto</b> de la cláusula (hay un sujeto distinto justo después), se puede omitir en cláusulas definidas: <span class="say" lang="en">The film (that) we saw was long.</span> · <span class="say" lang="en">The man (who) I met is a lawyer.</span> Si es el <b>sujeto</b> (le sigue un verbo), no: <span lang="en">The man who called you is here.</span></p>

<h3>Preposiciones</h3>
<p>En inglés cotidiano la preposición suele ir al final: <span class="say" lang="en">The person I was talking to is my boss.</span> En estilo formal sube y usa whom: <span class="say" lang="en">The person to whom I was talking…</span></p>

<h3>Which para toda la oración</h3>
<p>Después de coma, <span lang="en">which</span> puede comentar todo lo anterior: <span class="say" lang="en">He passed the exam, which surprised everyone.</span></p>
`,
  vocab: [
    { t: 'neighbour', es: 'vecino', ex: 'My neighbour is very friendly.', exEs: 'Mi vecino es muy amable.' },
    { t: 'lawyer', es: 'abogado', ex: 'She is a lawyer.', exEs: 'Es abogada.' },
    { t: 'be born', es: 'nacer', ex: 'I was born in Córdoba.', exEs: 'Nací en Córdoba.' },
    { t: 'surprise', es: 'sorprender', ex: 'The news surprised everyone.', exEs: 'La noticia sorprendió a todos.' },
    { t: 'whose', es: 'cuyo', ex: 'He is the man whose car was stolen.', exEs: 'Es el hombre al que le robaron el auto.' },
    { t: 'whom', es: 'a quien (formal)', ex: 'The person with whom I spoke.', exEs: 'La persona con quien hablé.' },
    { t: 'obvious', es: 'obvio', ex: 'The answer is obvious.', exEs: 'La respuesta es obvia.' },
    { t: 'knowledge', es: 'conocimiento', ex: 'She has a lot of knowledge.', exEs: 'Tiene muchos conocimientos.' },
    { t: 'especially', es: 'especialmente', ex: 'I like fruit, especially apples.', exEs: 'Me gusta la fruta, sobre todo las manzanas.' },
    { t: 'including', es: 'incluyendo', ex: 'Five people, including me.', exEs: 'Cinco personas, incluido yo.' },
    { t: 'employee', es: 'empleado', ex: 'He is a new employee.', exEs: 'Es un empleado nuevo.' },
  ],
  exercises: [
    { type: 'fill', q: 'The woman ___ lives next door is a doctor. (who / which)', answer: ['who', 'that'] },
    { type: 'fill', q: 'The book ___ I bought is great. (who / which)', answer: ['which', 'that'] },
    { type: 'fill', q: 'That\'s the man ___ car was stolen. (whose / who)', answer: ['whose'] },
    { type: 'fill', q: 'This is the city ___ I was born. (where / which)', answer: ['where'] },
    { type: 'fill', q: 'I remember the day ___ we met. (when / where)', answer: ['when'] },
    { type: 'mc', q: 'My brother, ___ lives in Rosario, is a teacher.', options: ['that', 'who', 'which', 'whose'], answer: 1, explain: 'Con comas no se usa «that».' },
    { type: 'mc', q: '¿En cuál se puede omitir el pronombre?', options: ['The man who called you is here.', 'The film that we saw was long.', 'The woman who lives next door is a doctor.', 'The bus which goes to the centre is late.'], answer: 1, explain: 'En "we saw" el pronombre es objeto: se puede omitir.' },
    { type: 'mc', q: 'He passed the exam, ___ surprised everyone.', options: ['that', 'who', 'which', 'what'], answer: 2 },
    { type: 'mc', q: '«Mi hermano que vive en Rosario» (sin comas) sugiere que…', options: ['Tengo un solo hermano', 'Tengo más de un hermano', 'Mi hermano no existe', 'Vive en Buenos Aires'], answer: 1 },
    { type: 'tr', q: 'La mujer que vive al lado es médica.', answer: ['The woman who lives next door is a doctor.', 'The woman that lives next door is a doctor.'] },
    { type: 'tr', q: 'Esta es la ciudad donde nací.', answer: ['This is the city where I was born.', 'This is the city I was born in.'] },
    { type: 'tr', q: 'La persona con la que hablé es mi jefe.', answer: ['The person I spoke to is my boss.', 'The person who I spoke to is my boss.', 'The person that I spoke to is my boss.', 'The person to whom I spoke is my boss.', 'The person I was talking to is my boss.'] },
    { type: 'tr', dir: 't>es', q: 'The film we saw was long.', answer: ['La película que vimos fue larga.', 'La película que vimos era larga.'] },
    { type: 'order', q: 'Ese es el hombre al que le robaron el auto.', answer: 'That is the man whose car was stolen.', extra: ['who'] },
    { type: 'listen', audio: 'This is the city where I was born', answer: ['This is the city where I was born'], instruction: 'Escuchá y escribí la frase.' },
    { type: 'speak', text: 'The book that I bought yesterday is really interesting.', es: 'El libro que compré ayer es muy interesante.' },
  ],
};
