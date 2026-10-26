// Tema 1 de inglés: trabajo y entrevistas. Las sesiones se arman solas con js/builder.js.
export default {
  id: 'en-t01',
  title: 'Work and job interviews',
  emoji: '💼',
  level: 'B1',
  goal: 'Hablar de tu trabajo y tu experiencia, y entender el vocabulario que aparece en una entrevista.',
  words: [
    { t: 'CV', es: 'currículum', e: '📄', ex: 'I sent my CV yesterday.', exEs: 'Mandé mi currículum ayer.' },
    { t: 'interview', es: 'entrevista', e: '🎤', pic: false, ex: 'I have a job interview tomorrow.', exEs: 'Mañana tengo una entrevista de trabajo.' },
    { t: 'salary', es: 'sueldo', e: '💰', ex: 'What is the salary for this position?', exEs: '¿Cuál es el sueldo de este puesto?' },
    { t: 'skills', es: 'habilidades', e: '🛠️', pic: false, ex: 'My main skills are Java and SQL.', exEs: 'Mis principales habilidades son Java y SQL.' },

    { t: 'experience', es: 'experiencia', e: '⭐', pic: false, ex: 'She has a lot of experience.', exEs: 'Ella tiene mucha experiencia.' },
    { t: 'manager', es: 'jefe, gerente', e: '🧑‍💼', ex: 'My manager is very supportive.', exEs: 'Mi jefe me apoya mucho.' },
    { t: 'team', es: 'equipo', e: '👥', ex: 'I work in a small team.', exEs: 'Trabajo en un equipo chico.' },
    { t: 'meeting', es: 'reunión', e: '📅', pic: false, ex: 'The meeting starts at ten.', exEs: 'La reunión empieza a las diez.' },

    { t: 'deadline', es: 'fecha límite', e: '⏰', pic: false, ex: 'We have a tight deadline.', exEs: 'Tenemos una fecha límite muy justa.' },
    { t: 'apply for', es: 'postularse a', e: '📝', pic: false, ex: 'I applied for three jobs.', exEs: 'Me postulé a tres trabajos.' },
    { t: 'hire', es: 'contratar', e: '🤝', pic: false, ex: 'They hired me last month.', exEs: 'Me contrataron el mes pasado.' },
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
  scenes: [
    {
      ctx: 'A job interview for an IT position. The interviewer starts.',
      lines: [
        ['Interviewer', 'Tell me about yourself.', 'Contame sobre vos.'],
      ],
      ask: 'Decile que tenés tres años de experiencia en IT.',
      options: ['I have three years of experience in IT.', 'I has three years of experience in IT.', 'I have three years of experiences in IT.'],
      answer: 0,
      alt: ['I have three years experience in IT.'],
      why: 'Experience es incontable en este sentido: no lleva «-s». Con I se usa have.',
    },
    {
      ctx: 'The interviewer asks about your strengths.',
      lines: [
        ['Interviewer', 'What are your strengths?', '¿Cuáles son tus fortalezas?'],
      ],
      ask: 'Decile que sos bueno trabajando en equipo.',
      options: ['I\'m good at working in a team.', 'I\'m good to work in team.', 'I\'m good at work in a team.'],
      answer: 0,
      alt: ['I am good at working in a team.', 'I\'m good at working in teams.'],
      why: 'Después de good at va un verbo con -ing.',
    },
    {
      ctx: 'Your manager invites you to a meeting that clashes with another one.',
      lines: [
        ['Manager', 'Can you join the meeting at ten?', '¿Podés venir a la reunión a las diez?'],
      ],
      ask: 'Decile que lo sentís pero tenés otra reunión a esa hora.',
      options: ['I\'m sorry, but I have another meeting then.', 'I\'m sorry, but I have another meeting at the ten.', 'I\'m sorry, but I am another meeting then.'],
      answer: 0,
      alt: ['I am sorry, but I have another meeting then.', 'Sorry, but I have another meeting then.'],
      why: 'Then significa «a esa hora» y evita repetir la hora.',
    },
    {
      ctx: 'A recruiter is discussing the offer with you.',
      lines: [
        ['Recruiter', 'Do you have any questions?', '¿Tenés alguna pregunta?'],
      ],
      ask: 'Preguntá cuál es el rango salarial del puesto.',
      options: ['What is the salary range for this position?', 'What is the salary for this position of range?', 'Which are the salary range of this position?'],
      answer: 0,
      alt: ['What is the salary range for this role?', 'What\'s the salary range for this position?'],
      why: 'For this position significa «para este puesto».',
    },
    {
      ctx: 'A project is running late.',
      lines: [
        ['Manager', 'Will you finish the report by Friday?', '¿Terminás el informe para el viernes?'],
      ],
      ask: 'Decile que sí, que vas a cumplir el plazo.',
      options: ['Yes, I\'ll meet the deadline.', 'Yes, I\'ll do the deadline.', 'Yes, I\'ll meet the date limit.'],
      answer: 0,
      alt: ['Yes, I will meet the deadline.'],
      why: 'Con deadline el verbo natural es meet (cumplir).',
    },
  ],
};
