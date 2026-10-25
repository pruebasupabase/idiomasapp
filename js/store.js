// Estado del estudiante: se guarda primero en este dispositivo (localStorage) y se sincroniza
// con Supabase en segundo plano. Así la app anda sin internet y el progreso viaja entre dispositivos.
//
// Cada registro lleva "u" (updated, en ms). Al sincronizar gana siempre el más reciente.

import { dayKey, startOfDay, addDays } from './util.js';
import { newCard } from './srs.js';
import { getClient, isLocalMode } from './auth.js';

const LS_STATE = 'lingua:state:';
const LS_LAST_USER = 'lingua:lastUser';
const PAGE = 1000;

export const defaultSettings = () => ({
  courses: ['en'],
  newPerDay: 10,
  freeMode: false,
  mode: 'relax', // relax: sin vidas · duo: 5 vidas por lección
  sound: true,
  rate: 0.9,
  enAccent: 'en-US',
  theme: 'auto',
  _u: 0,
});

const emptyState = () => ({
  v: 1,
  settings: defaultSettings(),
  cards: {}, // cards[curso][idTarjeta]
  lessons: {}, // lessons[curso][idLeccion]
  log: {}, // log['2026-10-25'][curso]
  meta: { lastPush: 0, lastPull: 0, lastSync: 0 },
});

let user = null;
let state = emptyState();
let saveTimer = null;
let syncTimer = null;
let syncing = false;
let syncInfo = { status: 'idle', message: '' };
const listeners = new Set();

export const onChange = (fn) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};
const emit = () => listeners.forEach((fn) => fn());

// ---------- carga y guardado local ----------

function readLocal(id) {
  try {
    const raw = localStorage.getItem(LS_STATE + id);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && parsed.v === 1 ? parsed : null;
  } catch {
    return null;
  }
}

function persistNow() {
  if (!user) return;
  try {
    localStorage.setItem(LS_STATE + user.id, JSON.stringify(state));
  } catch (err) {
    console.warn('No se pudo guardar en el dispositivo', err);
  }
}

function persist() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(persistNow, 250);
}

function touched() {
  persist();
  emit();
  scheduleSync();
}

export function loadUser(u) {
  user = u;
  const saved = readLocal(u.id);
  state = saved ? { ...emptyState(), ...saved } : emptyState();
  state.settings = { ...defaultSettings(), ...state.settings };
  state.meta = { ...emptyState().meta, ...state.meta };
  try {
    localStorage.setItem(LS_LAST_USER, JSON.stringify({ id: u.id, email: u.email, name: u.name }));
  } catch {
    /* sin espacio */
  }
  emit();
  if (!isLocalMode && !u.local) scheduleSync(300);
}

export function unloadUser() {
  persistNow();
  user = null;
  state = emptyState();
  emit();
}

export const getUser = () => user;

// ---------- ajustes ----------

export const getSettings = () => state.settings;

export function updateSettings(patch) {
  state.settings = { ...state.settings, ...patch, _u: Date.now() };
  touched();
}

// ---------- tarjetas ----------

const courseCards = (course) => (state.cards[course] ||= {});

export const getCard = (course, id) => courseCards(course)[id] || null;
export const allCards = (course) => Object.values(courseCards(course));

// Crea las tarjetas que falten (quedan como "nuevas"). Devuelve cuántas agregó.
export function ensureCards(course, ids) {
  const map = courseCards(course);
  let added = 0;
  const now = Date.now();
  for (const id of ids) {
    if (!map[id]) {
      map[id] = newCard(id, now);
      added++;
    }
  }
  if (added) touched();
  return added;
}

export function putCard(course, card) {
  courseCards(course)[card.id] = card;
  touched();
}

// ---------- lecciones ----------

const courseLessons = (course) => (state.lessons[course] ||= {});

export const getLessonProgress = (course, id) => courseLessons(course)[id] || null;

export function saveLessonResult(course, id, score) {
  const prev = courseLessons(course)[id];
  const now = Date.now();
  courseLessons(course)[id] = {
    best: Math.max(prev?.best || 0, score),
    last: score,
    attempts: (prev?.attempts || 0) + 1,
    done: (prev?.done || false) || score >= 70,
    at: now,
    u: now,
  };
  touched();
}

// ---------- actividad diaria ----------

const EMPTY_DAY = () => ({ reviews: 0, newCards: 0, exercises: 0, correct: 0, secs: 0, u: 0 });

export function logActivity(course, delta) {
  const key = dayKey();
  const day = (state.log[key] ||= {});
  const entry = (day[course] ||= EMPTY_DAY());
  for (const [field, value] of Object.entries(delta)) entry[field] = (entry[field] || 0) + value;
  entry.u = Date.now();
  touched();
}

export function todayActivity(course) {
  const entry = state.log[dayKey()]?.[course];
  return { ...EMPTY_DAY(), ...(entry || {}) };
}

function dayTotal(key) {
  const day = state.log[key];
  if (!day) return 0;
  return Object.values(day).reduce((sum, e) => sum + e.reviews + e.exercises, 0);
}

export function streak() {
  let cursor = startOfDay();
  if (dayTotal(dayKey(cursor)) === 0) cursor = addDays(cursor, -1);
  let count = 0;
  while (dayTotal(dayKey(cursor)) > 0) {
    count++;
    cursor = addDays(cursor, -1);
  }
  return count;
}

// Puntos acumulados: 10 por ejercicio bien, 2 por intentarlo y 5 por tarjeta repasada.
export function totalXp(course = null) {
  let xp = 0;
  for (const day of Object.values(state.log)) {
    for (const [id, e] of Object.entries(day)) {
      if (course && id !== course) continue;
      xp += e.correct * 10 + (e.exercises - e.correct) * 2 + e.reviews * 5;
    }
  }
  return xp;
}

export function lastDays(n = 7) {
  const out = [];
  const today = startOfDay();
  for (let i = n - 1; i >= 0; i--) {
    const ts = addDays(today, -i);
    const key = dayKey(ts);
    out.push({ key, date: new Date(ts), total: dayTotal(key) });
  }
  return out;
}

export function accuracy(course) {
  let exercises = 0;
  let correct = 0;
  for (const day of Object.values(state.log)) {
    const e = day[course];
    if (e) {
      exercises += e.exercises;
      correct += e.correct;
    }
  }
  return exercises ? Math.round((correct / exercises) * 100) : null;
}

// ---------- copia de seguridad ----------

export function exportData() {
  return JSON.stringify({ app: 'lingua', exportedAt: new Date().toISOString(), state }, null, 2);
}

function mergeMaps(local, remote) {
  for (const [course, map] of Object.entries(remote || {})) {
    const target = (local[course] ||= {});
    for (const [id, rec] of Object.entries(map)) {
      if (!target[id] || (rec.u || 0) > (target[id].u || 0)) target[id] = rec;
    }
  }
}

function mergeLog(local, remote) {
  for (const [key, courses] of Object.entries(remote || {})) {
    const day = (local[key] ||= {});
    for (const [course, rec] of Object.entries(courses)) {
      const mine = day[course];
      if (!mine) day[course] = { ...EMPTY_DAY(), ...rec };
      else {
        for (const f of ['reviews', 'newCards', 'exercises', 'correct', 'secs']) {
          mine[f] = Math.max(mine[f] || 0, rec[f] || 0);
        }
        mine.u = Math.max(mine.u || 0, rec.u || 0);
      }
    }
  }
}

export function importData(json) {
  const parsed = JSON.parse(json);
  const incoming = parsed?.state;
  if (!incoming || incoming.v !== 1) throw new Error('El archivo no es una copia de seguridad válida.');
  mergeMaps(state.cards, incoming.cards);
  mergeMaps(state.lessons, incoming.lessons);
  mergeLog(state.log, incoming.log);
  if ((incoming.settings?._u || 0) > (state.settings._u || 0)) {
    state.settings = { ...defaultSettings(), ...incoming.settings };
  }
  // Fuerza que todo se vuelva a subir.
  state.meta.lastPush = 0;
  touched();
}

// ---------- sincronización con Supabase ----------

export const getSyncInfo = () => ({ ...syncInfo, lastSync: state.meta.lastSync });

function setSync(status, message = '') {
  syncInfo = { status, message };
  emit();
}

export function scheduleSync(delay = 4000) {
  if (isLocalMode || !user || user.local) return;
  clearTimeout(syncTimer);
  syncTimer = setTimeout(() => sync(), delay);
}

const cardToRow = (course, c) => ({
  user_id: user.id,
  course,
  card_id: c.id,
  ease: c.ease,
  interval_days: c.interval,
  reps: c.reps,
  lapses: c.lapses,
  due_at: Math.round(c.due),
  seen: c.seen,
  last_at: Math.round(c.last || 0),
  updated_at: c.u,
});

const rowToCard = (r) => ({
  id: r.card_id,
  ease: r.ease,
  interval: r.interval_days,
  reps: r.reps,
  lapses: r.lapses,
  due: Number(r.due_at),
  seen: r.seen,
  last: Number(r.last_at),
  u: Number(r.updated_at),
});

const lessonToRow = (course, id, l) => ({
  user_id: user.id,
  course,
  lesson_id: id,
  best_score: l.best,
  last_score: l.last,
  attempts: l.attempts,
  completed: l.done,
  completed_at: l.at,
  updated_at: l.u,
});

const rowToLesson = (r) => ({
  best: r.best_score,
  last: r.last_score,
  attempts: r.attempts,
  done: r.completed,
  at: Number(r.completed_at),
  u: Number(r.updated_at),
});

const logToRow = (key, course, e) => ({
  user_id: user.id,
  day: key,
  course,
  reviews: e.reviews,
  new_cards: e.newCards,
  exercises: e.exercises,
  correct: e.correct,
  seconds: e.secs,
  updated_at: e.u,
});

const rowToLog = (r) => ({
  reviews: r.reviews,
  newCards: r.new_cards,
  exercises: r.exercises,
  correct: r.correct,
  secs: r.seconds,
  u: Number(r.updated_at),
});

async function upsertChunks(client, table, rows, conflict) {
  for (let i = 0; i < rows.length; i += 500) {
    const { error } = await client.from(table).upsert(rows.slice(i, i + 500), { onConflict: conflict });
    if (error) throw error;
  }
}

async function fetchAll(client, table, since) {
  const rows = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await client
      .from(table)
      .select('*')
      .eq('user_id', user.id)
      .gt('updated_at', since)
      .order('updated_at', { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw error;
    rows.push(...data);
    if (data.length < PAGE) break;
  }
  return rows;
}

async function push(client) {
  const since = state.meta.lastPush || 0;
  let maxU = since;
  const cards = [];
  const lessons = [];
  const logs = [];

  for (const [course, map] of Object.entries(state.cards)) {
    for (const c of Object.values(map)) {
      if (c.u > since) {
        cards.push(cardToRow(course, c));
        maxU = Math.max(maxU, c.u);
      }
    }
  }
  for (const [course, map] of Object.entries(state.lessons)) {
    for (const [id, l] of Object.entries(map)) {
      if (l.u > since) {
        lessons.push(lessonToRow(course, id, l));
        maxU = Math.max(maxU, l.u);
      }
    }
  }
  for (const [key, courses] of Object.entries(state.log)) {
    for (const [course, e] of Object.entries(courses)) {
      if (e.u > since) {
        logs.push(logToRow(key, course, e));
        maxU = Math.max(maxU, e.u);
      }
    }
  }

  await upsertChunks(client, 'cards', cards, 'user_id,course,card_id');
  await upsertChunks(client, 'lesson_progress', lessons, 'user_id,course,lesson_id');
  await upsertChunks(client, 'study_log', logs, 'user_id,day,course');

  if ((state.settings._u || 0) > since) {
    const { error } = await client.from('profiles').upsert(
      {
        id: user.id,
        display_name: user.name,
        settings: state.settings,
        updated_at: state.settings._u,
      },
      { onConflict: 'id' },
    );
    if (error) throw error;
    maxU = Math.max(maxU, state.settings._u);
  }

  state.meta.lastPush = maxU;
}

async function pull(client) {
  const since = state.meta.lastPull || 0;
  let maxU = since;

  const cardRows = await fetchAll(client, 'cards', since);
  for (const r of cardRows) {
    const incoming = rowToCard(r);
    const map = courseCards(r.course);
    if (!map[incoming.id] || incoming.u > map[incoming.id].u) map[incoming.id] = incoming;
    maxU = Math.max(maxU, incoming.u);
  }

  const lessonRows = await fetchAll(client, 'lesson_progress', since);
  for (const r of lessonRows) {
    const incoming = rowToLesson(r);
    const map = courseLessons(r.course);
    if (!map[r.lesson_id] || incoming.u > map[r.lesson_id].u) map[r.lesson_id] = incoming;
    maxU = Math.max(maxU, incoming.u);
  }

  const logRows = await fetchAll(client, 'study_log', since);
  const remoteLog = {};
  for (const r of logRows) {
    const key = String(r.day).slice(0, 10);
    (remoteLog[key] ||= {})[r.course] = rowToLog(r);
    maxU = Math.max(maxU, Number(r.updated_at));
  }
  mergeLog(state.log, remoteLog);

  const { data: profile, error } = await client
    .from('profiles')
    .select('settings, updated_at')
    .eq('id', user.id)
    .maybeSingle();
  if (error) throw error;
  if (profile && Number(profile.updated_at) > (state.settings._u || 0) && profile.settings?.courses) {
    state.settings = { ...defaultSettings(), ...profile.settings, _u: Number(profile.updated_at) };
    maxU = Math.max(maxU, Number(profile.updated_at));
  }

  state.meta.lastPull = maxU;
}

export async function sync() {
  if (isLocalMode || !user || user.local || syncing) return false;
  if (!navigator.onLine) {
    setSync('offline', 'Sin conexión: se sincroniza cuando vuelva internet.');
    return false;
  }
  syncing = true;
  setSync('syncing');
  try {
    const client = getClient();
    await push(client);
    await pull(client);
    state.meta.lastSync = Date.now();
    persistNow();
    setSync('ok');
    return true;
  } catch (err) {
    console.warn('Falló la sincronización', err);
    setSync('error', err.message || 'No se pudo sincronizar.');
    return false;
  } finally {
    syncing = false;
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('online', () => scheduleSync(500));
  window.addEventListener('pagehide', persistNow);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      persistNow();
      scheduleSync(200);
    }
  });
}
