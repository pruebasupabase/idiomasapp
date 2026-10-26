// Tema 4 de inglés: tecnología y software. Las sesiones se arman solas con js/builder.js.
export default {
  id: 'en-t04',
  title: 'Tech and software',
  emoji: '💻',
  level: 'B1',
  goal: 'Hablar de código, errores y despliegues con el vocabulario real del trabajo en IT.',
  words: [
    { t: 'bug', es: 'error de código', e: '🐛', ex: 'We found a bug in the login page.', exEs: 'Encontramos un error en la página de login.' },
    { t: 'feature', es: 'función nueva', e: '✨', pic: false, ex: 'The new feature launches next week.', exEs: 'La función nueva sale la semana que viene.' },
    { t: 'deploy', es: 'desplegar', e: '🚀', ex: 'We deploy to production every Friday.', exEs: 'Desplegamos a producción todos los viernes.' },
    { t: 'database', es: 'base de datos', e: '🗄️', ex: 'The database is down.', exEs: 'La base de datos está caída.' },

    { t: 'server', es: 'servidor', e: '🖥️', ex: 'The server crashed last night.', exEs: 'El servidor se cayó anoche.' },
    { t: 'update', es: 'actualización', e: '🔄', ex: 'Please install the update.', exEs: 'Por favor, instalá la actualización.' },
    { t: 'password', es: 'contraseña', e: '🔑', ex: 'I forgot my password.', exEs: 'Me olvidé la contraseña.' },
    { t: 'backup', es: 'copia de seguridad', e: '💾', ex: 'I always keep a backup.', exEs: 'Siempre tengo una copia de seguridad.' },

    { t: 'network', es: 'red', e: '🌐', ex: 'The network is slow today.', exEs: 'La red está lenta hoy.' },
    { t: 'security', es: 'seguridad', e: '🔒', pic: false, ex: 'Security is a top priority.', exEs: 'La seguridad es una prioridad máxima.' },
    { t: 'release', es: 'versión publicada', e: '📦', pic: false, ex: 'The next release is on Monday.', exEs: 'La próxima versión sale el lunes.' },
    { t: 'debug', es: 'depurar', e: '🔍', pic: false, ex: 'I need to debug this function.', exEs: 'Tengo que depurar esta función.' },
  ],
  phrases: [
    { t: 'It works on my machine.', es: 'En mi máquina funciona.' },
    { t: 'Could you reproduce the issue?', es: '¿Pudiste reproducir el problema?' },
    { t: "I'll push the fix today.", es: 'Hoy subo el arreglo.' },
    { t: 'The site is down.', es: 'El sitio está caído.' },
    { t: 'Have you tried turning it off and on again?', es: '¿Probaste apagarlo y prenderlo de nuevo?' },
  ],
  tips: [
    {
      after: 0,
      e: '🔤',
      title: 'Log in (verbo) y login (sustantivo)',
      html: `<p>Como verbo se escribe separado: <span class="say" lang="en">I log in every morning.</span> Como sustantivo, junto: <span class="say" lang="en">the login page</span>.</p>
<p>Pasa igual con <span lang="en">set up</span> / <span lang="en">setup</span> y <span lang="en">back up</span> / <span lang="en">backup</span>.</p>`,
    },
    {
      after: 1,
      e: '🐛',
      title: 'Bug, issue y error',
      html: `<p><span class="say" lang="en">bug</span> es un defecto en el código. <span class="say" lang="en">issue</span> es más general (un problema o ticket). <span class="say" lang="en">error</span> es lo que ve el usuario o el sistema.</p>
<p>En una reunión, <span class="say" lang="en">I'm seeing an error</span> y <span class="say" lang="en">we have an issue</span> suenan profesionales.</p>`,
    },
    {
      after: 2,
      e: '🚀',
      title: 'Deploy: verbo regular',
      html: `<p>El pasado es regular: <span class="say" lang="en">We deployed the fix yesterday.</span></p>
<p>Para avisar a tu equipo: <span class="say" lang="en">The fix is live.</span> (ya está en producción).</p>`,
    },
  ],
};
