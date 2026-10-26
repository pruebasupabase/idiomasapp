// Tema 5 de inglés: salud. Las sesiones se arman solas con js/builder.js.
export default {
  id: 'en-t05',
  title: 'Health and the doctor',
  emoji: '🩺',
  level: 'B1',
  goal: 'Explicar cómo te sentís, sacar un turno y entender lo que te indica un médico.',
  words: [
    { t: 'doctor', es: 'médico', e: '🩺', ex: 'I need to see a doctor.', exEs: 'Necesito ver a un médico.' },
    { t: 'headache', es: 'dolor de cabeza', e: '🤕', pic: false, ex: 'I have a terrible headache.', exEs: 'Tengo un dolor de cabeza terrible.' },
    { t: 'fever', es: 'fiebre', e: '🤒', ex: 'She has a high fever.', exEs: 'Ella tiene fiebre alta.' },
    { t: 'cough', es: 'tos', e: '😷', pic: false, ex: 'I have had a cough for a week.', exEs: 'Tengo tos hace una semana.' },

    { t: 'pain', es: 'dolor', e: '😣', pic: false, ex: 'I feel pain in my back.', exEs: 'Siento dolor en la espalda.' },
    { t: 'medicine', es: 'medicamento', e: '💊', ex: 'Take this medicine twice a day.', exEs: 'Tomá este medicamento dos veces por día.' },
    { t: 'prescription', es: 'receta médica', e: '📝', pic: false, ex: 'You need a prescription.', exEs: 'Necesitás una receta.' },
    { t: 'appointment', es: 'turno', e: '📅', pic: false, ex: 'I have an appointment at nine.', exEs: 'Tengo un turno a las nueve.' },

    { t: 'sore throat', es: 'dolor de garganta', e: '🗣️', pic: false, ex: 'I have a sore throat.', exEs: 'Me duele la garganta.' },
    { t: 'injury', es: 'lesión', e: '🩹', ex: 'He has a knee injury.', exEs: 'Tiene una lesión en la rodilla.' },
    { t: 'allergy', es: 'alergia', e: '🤧', pic: false, ex: 'I have a pollen allergy.', exEs: 'Tengo alergia al polen.' },
    { t: 'symptoms', es: 'síntomas', e: '🌡️', pic: false, ex: 'What are your symptoms?', exEs: '¿Cuáles son sus síntomas?' },
  ],
  phrases: [
    { t: 'I have a headache.', es: 'Tengo dolor de cabeza.' },
    { t: "I don't feel well.", es: 'No me siento bien.' },
    { t: 'I need to make an appointment.', es: 'Necesito sacar un turno.' },
    { t: 'How long have you had these symptoms?', es: '¿Hace cuánto tiene estos síntomas?' },
    { t: 'Take one tablet twice a day.', es: 'Tome una pastilla dos veces al día.' },
  ],
  tips: [
    {
      after: 0,
      e: '🤕',
      title: 'Ache: dolor que se une a la parte del cuerpo',
      html: `<p>Muchos dolores se arman juntando la parte del cuerpo con <span class="say" lang="en">ache</span>: <span class="say" lang="en">headache</span>, <span class="say" lang="en">stomachache</span>, <span class="say" lang="en">toothache</span>, <span class="say" lang="en">backache</span>.</p>
<p>Para el resto se usa <span lang="en">hurt</span>: <span class="say" lang="en">My knee hurts.</span></p>`,
    },
    {
      after: 1,
      e: '⏱️',
      title: 'How long have you had…? (present perfect)',
      html: `<p>Para decir desde cuándo te pasa algo se usa el present perfect con <span lang="en">for</span> o <span lang="en">since</span>:</p>
<p><span class="say" lang="en">I have had a cough for three days.</span></p>
<p><span class="say" lang="en">I have felt sick since Monday.</span></p>`,
    },
    {
      after: 2,
      e: '🤢',
      title: 'Sick, ill y «sentirse mal»',
      html: `<p><span class="say" lang="en">I feel sick</span> significa que tenés ganas de vomitar. Para decir que estás enfermo, usá <span class="say" lang="en">I'm ill</span> o <span class="say" lang="en">I'm not feeling well</span>.</p>
<p>En Estados Unidos <span lang="en">sick</span> también se usa para «enfermo».</p>`,
    },
  ],
};
