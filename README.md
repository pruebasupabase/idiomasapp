# Cuaderno

PWA personal para estudiar **ruso (A1 → A2)** e **inglés (B1 → B2)**. Teoría con explicación, vocabulario con repetición espaciada, ejercicios corregidos, dictado, pronunciación y un tutor con IA. Todo gratis: Supabase free, Groq o Gemini free y Vercel free.

- 14 lecciones de ruso y 15 de inglés, con teoría en español, vocabulario con audio y 14 a 18 ejercicios cada una.
- Se aprueba con 70 %. En Perfil se puede activar el modo libre para abrir cualquier lección.
- Cada persona tiene su cuenta y su progreso (se sincroniza entre dispositivos y funciona sin internet).

## Probarlo en tu compu (sin cuentas)

Con `js/config.js` vacío la app corre en **modo local**: sin login, y el progreso queda en el navegador.

```bash
npm start        # o: npx serve .
```

El tutor necesita Supabase (ver abajo); todo lo demás anda igual.

## Poner en marcha las cuentas y el tutor

1. **Supabase.** Creá un proyecto gratis en supabase.com. En *SQL Editor* pegá todo `supabase/schema.sql` y ejecutalo (se puede correr más de una vez).
2. **Claves.** En *Project Settings → API* copiá la URL y la clave `anon`/publishable y pegalas en `js/config.js`. La clave anon es pública por diseño: lo que protege los datos son las políticas del esquema.
3. **Cuentas.** En *Authentication → Users* creá las dos cuentas (la tuya y la de tu novia). Después, en *Authentication → Sign In / Providers*, desactivá los registros nuevos así nadie más puede entrar.
4. **Tutor.** Conseguí una clave gratis en console.groq.com (o en aistudio.google.com para Gemini). Guardala como secret y publicá la función:

   ```bash
   supabase secrets set GROQ_API_KEY=xxxx            # y/o GEMINI_API_KEY=xxxx
   supabase functions deploy tutor
   ```

   Opcionales: `GROQ_MODEL`, `GEMINI_MODEL`, `TUTOR_PROVIDER` (`groq`, `gemini` o `auto`). Los modelos gratis cambian con el tiempo; si uno deja de andar, cambiá el nombre con un secret, sin tocar el código.

## Publicar en Vercel

1. Subí la carpeta a un repositorio de GitHub.
2. En vercel.com, *Add New → Project* y elegí el repositorio. No hace falta configurar nada: `vercel.json` ya define el comando de build, que actualiza el caché offline en cada deploy.
3. Abrí la URL desde el celular y usá *Agregar a pantalla de inicio*.

## Desarrollo

```bash
npm test         # valida las lecciones y prueba la lógica (texto y repetición espaciada)
npm run build    # regenera la lista de archivos del service worker
```

Si cambiás archivos de la app y probás en un navegador que ya la instaló, recargá dos veces: el service worker nuevo toma el control en la segunda carga.

### Cómo agregar una lección

1. Creá el archivo en `js/content/ru/` o `js/content/en/`, siguiendo el número (por ejemplo `ru/15-nombre.js`).
2. Importalo en `js/content/index.js` y sumalo a una unidad.
3. Corré `npm test`: el validador revisa formato, ids repetidos, respuestas de opción múltiple, acentos tónicos del ruso y alfabetos mezclados.

Formato de una lección:

```js
export default {
  id: 'ru-15',            // curso + número de orden
  title: 'Título',
  level: 'A2',
  minutes: 30,
  goal: 'Qué vas a poder hacer al terminar.',
  theory: `<p>HTML en español. Usá <span class="say" lang="ru">palabras</span> para que se puedan escuchar.</p>`,
  dialogue: [{ who: 'Анто́н', t: 'Привет!', es: '¡Hola!' }],   // opcional
  vocab: [{ t: 'мо́ре', es: 'mar', ex: 'Я люблю́ мо́ре.', exEs: 'Me encanta el mar.' }],   // 10 a 16
  exercises: [ /* al menos 10 */ ],
};
```

Tipos de ejercicio:

| Tipo | Forma |
| --- | --- |
| `mc` | `{ q, options: [...], answer: índice, explain? }` |
| `fill` | `{ q: 'texto con ___', answer: ['…'], hint?, explain? }` |
| `tr` | `{ q, answer: ['…'], dir?: 't>es', hint? }` (por defecto traducís del español al idioma) |
| `order` | `{ q, answer: 'oración', extra?: ['distractor'] }` |
| `listen` | `{ audio, answer: ['…'], instruction? }` |
| `match` | `{ pairs: [['idioma', 'español'], …] }` (sin elementos repetidos) |
| `speak` | `{ text, es? }` |

En ruso, el acento tónico se marca con `´` sobre la vocal (`мо́ре`) en todo el vocabulario. Al corregir se ignoran acentos, mayúsculas, puntuación y la diferencia entre `ё` y `е`. Las respuestas en español toleran tildes. No se toleran errores de tipeo, porque en ruso una letra cambia el caso.

## Temas: palabras, audio y puntos

Además de las lecciones de gramática, cada curso empieza con **temas** (por ejemplo `js/content/ru/t01-saludos.js`).
Un tema se escribe una sola vez (palabras con dibujo, frases y datos de gramática) y `js/builder.js` arma solo las
sesiones cortas: palabras nuevas con audio → ejercicios de escuchar y elegir el dibujo, emparejar y escribir →
frases → repaso del tema.

Hoy hay 9 temas por idioma: ruso (saludos, familia, comida, números, ciudad, casa, días, verbos, colores) e inglés (trabajo, viajes, restaurante, tecnología, salud, compras, casa, emociones, mails).

Para sumar un tema nuevo:

1. Copiá un archivo `tNN-*.js` de `js/content/ru` o `js/content/en` y cambiá el contenido (entre 8 y 16 palabras, mínimo 4 con dibujo distinto, mínimo 4 frases).
2. Importalo en `js/content/index.js` y agregalo con `topicUnit(tema, 'ru')` al principio de `units`.
3. Corré `npm test`: revisa los acentos del ruso, los dibujos repetidos y arma cada sesión 25 veces para detectar ejercicios mal formados.

En Perfil se elige el modo de las lecciones (tranquilo o con 5 vidas) y se apagan los sonidos.

## Notas

- **Nivel de tu novia:** el curso de inglés arranca en B1. Si necesita algo más básico, puede usar el modo libre mientras se suman lecciones A2.
- **Cada persona elige sus cursos** en *Perfil*: vos ruso e inglés, ella solo inglés.
- **Datos:** *Perfil → Datos* permite exportar e importar el progreso como archivo.
- **Voz:** el audio y el micrófono usan el navegador. Chrome y Edge tienen las mejores voces; en iPhone el reconocimiento de voz puede faltar y la app pasa sola a autoevaluación.
