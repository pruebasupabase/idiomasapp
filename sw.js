// Service worker: guarda la app en el dispositivo para que abra sin internet.
// La lista de archivos y la versión del caché las genera scripts/update-sw.mjs (corre solo en cada deploy).

/* BUILD:START */
const CACHE = 'cuaderno-ef204ef34c';
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./css/styles.css",
  "./fonts/ibm-plex-sans-cyrillic-400-normal.woff2",
  "./fonts/ibm-plex-sans-cyrillic-500-normal.woff2",
  "./fonts/ibm-plex-sans-cyrillic-600-normal.woff2",
  "./fonts/ibm-plex-sans-latin-400-normal.woff2",
  "./fonts/ibm-plex-sans-latin-500-normal.woff2",
  "./fonts/ibm-plex-sans-latin-600-normal.woff2",
  "./fonts/source-serif-4-cyrillic-400-italic.woff2",
  "./fonts/source-serif-4-cyrillic-400-normal.woff2",
  "./fonts/source-serif-4-cyrillic-600-italic.woff2",
  "./fonts/source-serif-4-cyrillic-600-normal.woff2",
  "./fonts/source-serif-4-latin-400-italic.woff2",
  "./fonts/source-serif-4-latin-400-normal.woff2",
  "./fonts/source-serif-4-latin-600-italic.woff2",
  "./fonts/source-serif-4-latin-600-normal.woff2",
  "./icons/apple-touch-icon.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./js/app.js",
  "./js/auth.js",
  "./js/builder.js",
  "./js/config.js",
  "./js/content/en/01-pronunciacion.js",
  "./js/content/en/02-past-vs-perfect.js",
  "./js/content/en/03-perfect-continuous.js",
  "./js/content/en/04-narrative-tenses.js",
  "./js/content/en/05-future.js",
  "./js/content/en/06-modals.js",
  "./js/content/en/07-conditionals.js",
  "./js/content/en/08-third-mixed-wish.js",
  "./js/content/en/09-passive.js",
  "./js/content/en/10-reported-speech.js",
  "./js/content/en/11-relative-clauses.js",
  "./js/content/en/12-gerund-infinitive.js",
  "./js/content/en/13-linking-words.js",
  "./js/content/en/14-phrasal-verbs.js",
  "./js/content/en/15-collocations.js",
  "./js/content/en/t01-trabajo.js",
  "./js/content/index.js",
  "./js/content/ru/01-sonidos.js",
  "./js/content/ru/02-saludos.js",
  "./js/content/ru/03-genero-plural.js",
  "./js/content/ru/04-presente.js",
  "./js/content/ru/05-adjetivos-posesivos.js",
  "./js/content/ru/06-numeros-tiempo.js",
  "./js/content/ru/07-acusativo.js",
  "./js/content/ru/08-preposicional.js",
  "./js/content/ru/09-genitivo.js",
  "./js/content/ru/10-dativo.js",
  "./js/content/ru/11-instrumental.js",
  "./js/content/ru/12-pasado-futuro.js",
  "./js/content/ru/13-movimiento.js",
  "./js/content/ru/14-aspecto.js",
  "./js/content/ru/t01-saludos.js",
  "./js/exercises.js",
  "./js/fx.js",
  "./js/keyboard.js",
  "./js/progress.js",
  "./js/sfx.js",
  "./js/speech.js",
  "./js/srs.js",
  "./js/store.js",
  "./js/ui.js",
  "./js/util.js",
  "./js/views/alphabet.js",
  "./js/views/course.js",
  "./js/views/courses.js",
  "./js/views/home.js",
  "./js/views/lesson.js",
  "./js/views/login.js",
  "./js/views/me.js",
  "./js/views/review.js",
  "./js/views/topic.js",
  "./js/views/tutor.js",
  "./vendor/supabase.js"
];
/* BUILD:END */

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith('cuaderno-') && key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  // Supabase y cualquier otro servidor van directo a la red: nunca se guardan.
  if (url.origin !== self.location.origin) return;

  // Páginas: red primero (para tomar versiones nuevas) y, si no hay internet, lo guardado.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put('./index.html', copy));
          return response;
        })
        .catch(() => caches.match('./index.html')),
    );
    return;
  }

  // Resto: lo guardado primero y se actualiza por detrás.
  event.respondWith(
    caches.match(request).then((cached) => {
      const fresh = fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || fresh;
    }),
  );
});
