// Voz del navegador: síntesis (escuchar) y reconocimiento (hablar). Todo gratis y sin API.
// La calidad depende de las voces que tenga instaladas el dispositivo.

import { stripStress } from './util.js';

const LANG = { ru: 'ru-RU', en: 'en-US', es: 'es-AR' };

const config = { rate: 0.9, enAccent: 'en-US' };
let playing = null;

export function setVoiceConfig(patch) {
  Object.assign(config, patch);
}

export const canSpeak = () => typeof window !== 'undefined' && 'speechSynthesis' in window;

function langCode(lang) {
  if (lang === 'en') return config.enAccent || 'en-US';
  return LANG[lang] || lang;
}

function normLang(code) {
  return String(code).replace('_', '-').toLowerCase();
}

function pickVoice(code) {
  const voices = window.speechSynthesis.getVoices();
  const prefix = normLang(code).slice(0, 2);
  let pool = voices.filter((v) => normLang(v.lang).startsWith(prefix));
  if (!pool.length) return null;
  const exact = pool.filter((v) => normLang(v.lang) === normLang(code));
  if (exact.length) pool = exact;
  const good = pool.find((v) => /natural|neural|premium|enhanced|google/i.test(v.name));
  return good || pool[0];
}

// Cuántas voces hay para un idioma (para avisar si el dispositivo no tiene voz rusa, por ejemplo).
export function hasVoiceFor(lang) {
  if (!canSpeak()) return false;
  return !!pickVoice(langCode(lang));
}

export function stopSpeaking() {
  if (canSpeak()) window.speechSynthesis.cancel();
  playing = null;
}

// En iPhone la voz solo se puede arrancar después de un toque: se llama dentro de un clic para dejarla lista.
export function unlockSpeech() {
  if (!canSpeak()) return;
  const u = new SpeechSynthesisUtterance(' ');
  u.volume = 0;
  window.speechSynthesis.speak(u);
}

// Lee un texto en voz alta. Devuelve una promesa que se resuelve cuando termina.
export function speak(text, lang, { rate } = {}) {
  return new Promise((resolve) => {
    if (!canSpeak() || !text) return resolve(false);
    const synth = window.speechSynthesis;
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(stripStress(text));
    const code = langCode(lang);
    utterance.lang = code;
    const voice = pickVoice(code);
    if (voice) utterance.voice = voice;
    utterance.rate = rate ?? config.rate;

    playing = utterance;
    utterance.onend = () => resolve(true);
    utterance.onerror = () => resolve(false);
    synth.speak(utterance);
    if (synth.paused) synth.resume();
  });
}

// ---------- reconocimiento de voz ----------

function recognitionClass() {
  if (typeof window === 'undefined') return null;
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

export const canListen = () => !!recognitionClass();

let activeRec = null;

// Corta la escucha que esté en curso (por ejemplo, al salir del modo manos libres).
export function stopListening() {
  try {
    activeRec?.abort();
  } catch {
    /* ya estaba parado */
  }
  activeRec = null;
}

// Escucha una frase. Devuelve { best, alts } o lanza un error con el código del navegador.
export function listen(lang, { timeout = 9000 } = {}) {
  return new Promise((resolve, reject) => {
    const Recognition = recognitionClass();
    if (!Recognition) return reject(new Error('unsupported'));
    const rec = new Recognition();
    activeRec = rec;
    rec.lang = langCode(lang);
    rec.interimResults = false;
    rec.maxAlternatives = 3;
    rec.continuous = false;

    let finished = false;
    const finish = (fn) => {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      if (activeRec === rec) activeRec = null;
      fn();
    };

    rec.onresult = (event) => {
      const alts = [...event.results[0]].map((a) => a.transcript);
      finish(() => resolve({ best: alts[0] || '', alts }));
    };
    rec.onerror = (event) => finish(() => reject(new Error(event.error || 'error')));
    rec.onend = () => finish(() => resolve({ best: '', alts: [] }));

    const timer = setTimeout(() => {
      try {
        rec.stop();
      } catch {
        /* ya estaba parado */
      }
    }, timeout);

    try {
      rec.start();
    } catch (err) {
      finish(() => reject(err));
    }
  });
}
