// Tema 1 de inglés: trabajo y entrevistas. Las sesiones se arman solas con js/builder.js.
export default {
  id: 'en-t01',
  title: 'Work and job interviews',
  emoji: '💼',
  level: 'B1',
  goal: 'Hablar de tu trabajo y tu experiencia, y entender el vocabulario que aparece en una entrevista.',
  words: [
    { t: 'CV', es: 'currículum', e: '📄', ex: 'I sent my CV yesterday.', exEs: 'Mandé mi currículum ayer.' },
    { t: 'interview', es: 'entrevista', e: '🎤', ex: 'I have a job interview tomorrow.', exEs: 'Mañana tengo una entrevista de trabajo.' },
    { t: 'salary', es: 'sueldo', e: '💰', ex: 'What is the salary for this position?', exEs: '¿Cuál es el sueldo de este puesto?' },
    { t: 'skills', es: 'habilidades', e: '🛠️', ex: 'My main skills are Java and SQL.', exEs: 'Mis principales habilidades son Java y SQL.' },

    { t: 'experience', es: 'experiencia', e: '⭐', ex: 'She has a lot of experience.', exEs: 'Ella tiene mucha experiencia.' },
    { t: 'manager', es: 'jefe, gerente', e: '🧑‍💼', ex: 'My manager is very supportive.', exEs: 'Mi jefe me apoya mucho.' },
    { t: 'team', es: 'equipo', e: '👥', ex: 'I work in a small team.', exEs: 'Trabajo en un equipo chico.' },
    { t: 'meeting', es: 'reunión', e: '📅', ex: 'The meeting starts at ten.', exEs: 'La reunión empieza a las diez.' },

    { t: 'deadline', es: 'fecha límite', e: '⏰', ex: 'We have a tight deadline.', exEs: 'Tenemos una fecha límite muy justa.' },
    { t: 'apply for', es: 'postularse a', e: '📝', ex: 'I applied for three jobs.', exEs: 'Me postulé a tres trabajos.' },
    { t: 'hire', es: 'contratar', e: '🤝', ex: 'They hired me last month.', exEs: 'Me contrataron el mes pasado.' },
    { t: 'remote work', es: 'trabajo remoto', e: '🏠', ex: 'I prefer remote work.', exEs: 'Prefiero el trabajo remoto.' },
  ],
  phrases: [
    { t: 'Tell me about yourself.', es: 'Contame sobre vos.' },
    { t: 'I have three years of experience.', es: 'Tengo tres años de experiencia.' },
    { t: 'What are your strengths?', es: '¿Cuáles son tus fortalezas?' },
    { t: "I'm looking for a remote job.", es: 'Busco un trabajo remoto.' },
  ],
  tips: [
    {
      after: 1,
      e: '📚',
      title: 'Experience no tiene plural',
      html: `<p><span class="say" lang="en">experience</span>, en el sentido de experiencia laboral, es incontable: no lleva «a» ni «-s».</p>
<p><span class="say" lang="en">I have a lot of experience.</span> ✔</p>
<p><span lang="en">I have many experiences.</span> ✘ (eso significa «vivencias»)</p>
<p>Pasa lo mismo con <span lang="en">work</span> (trabajo en general): <span class="say" lang="en">I need work.</span> Un puesto concreto es <span class="say" lang="en">a job</span>.</p>`,
    },
    {
      after: 2,
      e: '⏳',
      title: 'Cuánto tiempo hace: for y since',
      html: `<p>Para decir cuánto tiempo llevás haciendo algo, usá el present perfect con <span lang="en">for</span> (una duración) o <span lang="en">since</span> (un punto de partida):</p>
<p><span class="say" lang="en">I have worked in IT for three years.</span></p>
<p><span class="say" lang="en">I have worked here since 2023.</span></p>`,
    },
  ],
};
