// Motor de ejercicios. Cada tipo sabe dibujarse y corregirse; el motor se ocupa del
// flujo (comprobar, mostrar la corrección, repetir lo que salió mal).
//
// Tipos que se corrigen: mc, fill, tr, order, listen, match, speak.
// Tipos que solo muestran algo (no puntúan): intro (palabras nuevas) y tip (un dato de gramática).

import { h, fmt, shuffle, normalize, similarity } from './util.js';
import { speak, canListen, listen, stopSpeaking } from './speech.js';
import { listenButtons, speakButton, icon } from './ui.js';
import { russianKeyboard } from './keyboard.js';
import * as sfx from './sfx.js';

const LANG_NAME = { ru: 'ruso', en: 'inglés' };
const PRAISE = ['Correcto.', 'Muy bien.', 'Eso es.', 'Bien.'];

// ---------- corrección ----------

function grade(given, answers, { loose = false } = {}) {
  const list = [].concat(answers);
  const g = normalize(given, { loose });
  const hit = list.find((a) => normalize(a, { loose }) === g);
  const ok = hit !== undefined;
  const near = !ok && list.some((a) => similarity(normalize(a, { loose }), g) >= 0.8);
  return { ok, given, expected: list[0], near, alternative: ok && hit !== list[0] ? list[0] : null };
}

// ---------- piezas comunes ----------

// Una escena de la vida real: dónde estás y qué te dicen. Tocar un globo lo reproduce con audio.
function sceneNode(scene, ctx) {
  const box = h('div', { class: `scene${ctx.lang === 'ru' ? ' show-es' : ''}` });
  if (scene.ctx) box.append(h('p', { class: 'scene-ctx' }, scene.ctx));
  scene.lines.forEach(([who, text, es], i) => {
    box.append(
      h(
        'div',
        { class: `bubble${i % 2 ? ' right' : ''}` },
        h('span', { class: 'bubble-who' }, who),
        h(
          'button',
          { class: 'bubble-text', type: 'button', lang: ctx.lang, 'aria-label': `Escuchar: ${text}`, onclick: () => speak(text, ctx.lang) },
          h('span', { class: 'bubble-icon', 'aria-hidden': 'true' }, '🔊'),
          text,
        ),
        h('span', { class: 'bubble-es' }, es),
      ),
    );
  });
  const last = scene.lines[scene.lines.length - 1];
  box.append(
    h('button', { class: 'link-btn scene-toggle', type: 'button', onclick: () => box.classList.toggle('show-es') }, 'Ver / ocultar traducción'),
  );
  // Arranca solo con lo último que te dijeron.
  setTimeout(() => {
    if (box.isConnected && !scene.noAuto) speak(last[1], ctx.lang);
  }, 450);
  return box;
}

function prompt(item, ctx, instruction) {
  const parts = [];
  if (instruction) parts.push(h('p', { class: 'ex-instruction' }, instruction));
  if (item.scene) parts.push(sceneNode(item.scene, ctx));
  if (item.big) parts.push(h('div', { class: 'ex-big', 'aria-hidden': 'true' }, item.big));
  if (item.q) parts.push(h('p', { class: 'ex-q', html: fmt(item.q) }));
  if (item.audio) {
    parts.push(listenButtons(item.audio, ctx.lang));
    // Algunas preguntas arrancan solas con el audio (escuchá y elegí).
    if (item.autoplay) {
      setTimeout(() => {
        if (parts[0]?.isConnected) speak(item.audio, ctx.lang);
      }, 350);
    }
  }
  return h('div', { class: 'ex-prompt' }, parts);
}

function textField({ multiline = false, lang, changed }) {
  const attrs = {
    class: 'field',
    autocomplete: 'off',
    autocapitalize: 'off',
    autocorrect: 'off',
    spellcheck: 'false',
    lang,
    'aria-label': 'Tu respuesta',
    oninput: changed,
  };
  return multiline ? h('textarea', { ...attrs, rows: 2 }) : h('input', { ...attrs, type: 'text' });
}

function withKeyboard(input, needed) {
  return needed ? russianKeyboard(input) : null;
}

// ---------- tipos de ejercicio ----------

const RENDERERS = {
  // Opción múltiple: { q, options: [...], answer: índice, audio?, explain? }
  mc(item, ctx) {
    const options = shuffle(item.options.map((text, i) => ({ text, i })));
    let chosen = null;
    // visual: las opciones son dibujos (emoji) en una grilla de dos columnas.
    const buttons = options.map((opt, n) =>
      h(
        'button',
        {
          class: item.visual ? 'opt visual' : 'opt',
          type: 'button',
          role: 'radio',
          'aria-checked': 'false',
          'aria-label': item.visual && item.labels ? item.labels[opt.i] : null,
          onclick: () => select(n),
        },
        item.visual ? null : h('span', { class: 'opt-key', 'aria-hidden': 'true' }, String(n + 1)),
        h('span', { class: item.visual ? 'opt-emoji' : 'opt-text', lang: item.optLang || null }, opt.text),
      ),
    );

    function select(n) {
      if (chosen !== n) sfx.play('tap');
      chosen = n;
      buttons.forEach((b, k) => {
        b.classList.toggle('picked', k === n);
        b.setAttribute('aria-checked', String(k === n));
      });
      ctx.changed();
    }

    return {
      node: h('div', {}, prompt(item, ctx, item.instruction), h('div', { class: `opts${item.visual ? ' visual' : ''}`, role: 'radiogroup' }, buttons)),
      ready: () => chosen !== null,
      check() {
        const ok = options[chosen].i === item.answer;
        // En las preguntas con dibujos el feedback dice la palabra, no el emoji.
        const word = item.say || (item.sayAnswer ? item.options[item.answer] : null);
        return {
          ok,
          given: item.visual ? '' : options[chosen].text,
          expected: item.visual ? item.say || '' : item.options[item.answer],
          say: word,
        };
      },
      lock() {
        buttons.forEach((b, k) => {
          b.disabled = true;
          if (options[k].i === item.answer) b.classList.add('right');
          else if (k === chosen) b.classList.add('wrong');
        });
      },
      onKey(e) {
        const n = Number(e.key) - 1;
        if (n >= 0 && n < buttons.length) select(n);
      },
    };
  },

  // Completar: { q con ___, answer: 'x' | ['x','y'], hint?, explain? }
  fill(item, ctx) {
    const input = textField({ lang: ctx.lang, changed: ctx.changed });
    const node = h(
      'div',
      {},
      prompt(item, ctx, item.instruction || 'Completá.'),
      input,
      item.hint ? h('p', { class: 'ex-hint' }, `Pista: ${item.hint}`) : null,
      withKeyboard(input, ctx.lang === 'ru'),
    );
    return {
      node,
      ready: () => input.value.trim().length > 0,
      check() {
        const res = grade(input.value, item.answer);
        return { ...res, say: item.say === false ? null : item.sayFull || null };
      },
      lock: () => (input.disabled = true),
      focus: () => input.focus(),
    };
  },

  // Traducir: { q, dir: 'es>t' (por defecto) | 't>es', answer: [...] }
  tr(item, ctx) {
    const toSpanish = item.dir === 't>es';
    const instruction = item.instruction || (toSpanish ? 'Traducí al español.' : `Traducí al ${LANG_NAME[ctx.lang]}.`);
    const input = textField({ multiline: true, lang: toSpanish ? 'es' : ctx.lang, changed: ctx.changed });
    const shown = toSpanish && item.audio === undefined ? { ...item, audio: item.q } : item;
    const node = h(
      'div',
      {},
      prompt(shown, ctx, instruction),
      input,
      item.hint ? h('p', { class: 'ex-hint' }, `Pista: ${item.hint}`) : null,
      withKeyboard(input, ctx.lang === 'ru' && !toSpanish),
    );
    return {
      node,
      ready: () => input.value.trim().length > 0,
      check() {
        const res = grade(input.value, item.answer, { loose: toSpanish });
        return { ...res, say: toSpanish ? null : res.expected };
      },
      lock: () => (input.disabled = true),
      focus: () => input.focus(),
    };
  },

  // Ordenar palabras: { q (en español), answer: 'frase' | ['frase', ...], extra?: ['distractor'] }
  order(item, ctx) {
    const answers = [].concat(item.answer);
    const words = answers[0].split(/\s+/);
    let chips = [];
    for (let tries = 0; tries < 6; tries++) {
      chips = shuffle([...words, ...(item.extra || [])]).map((w, id) => ({ w, id }));
      if (chips.filter((c) => !(item.extra || []).includes(c.w)).map((c) => c.w).join(' ') !== words.join(' ')) break;
    }
    const picked = [];
    const line = h('div', { class: 'order-line', 'aria-label': 'Tu oración' });
    const bank = h('div', { class: 'order-bank' });
    const nodes = new Map();

    function redraw() {
      line.replaceChildren(...picked.map((c) => nodes.get(c.id)));
      bank.replaceChildren(...chips.filter((c) => !picked.includes(c)).map((c) => nodes.get(c.id)));
      ctx.changed();
    }
    for (const chip of chips) {
      nodes.set(
        chip.id,
        h(
          'button',
          {
            class: 'chip',
            type: 'button',
            lang: ctx.lang,
            onclick: () => {
              sfx.play('tap');
              if (picked.includes(chip)) picked.splice(picked.indexOf(chip), 1);
              else picked.push(chip);
              redraw();
            },
          },
          chip.w,
        ),
      );
    }
    redraw();

    return {
      node: h(
        'div',
        {},
        prompt(item, ctx, item.instruction || 'Armá la oración.'),
        line,
        bank,
      ),
      ready: () => picked.length > 0,
      check() {
        const res = grade(picked.map((c) => c.w).join(' '), answers);
        return { ...res, say: res.expected };
      },
      lock: () => nodes.forEach((n) => (n.disabled = true)),
    };
  },

  // Dictado: { audio (texto que se lee), answer?: [...] }
  listen(item, ctx) {
    const text = item.audio || [].concat(item.answer)[0];
    const answers = item.answer || [text];
    const input = textField({ lang: ctx.lang, changed: ctx.changed });
    const node = h(
      'div',
      {},
      h('p', { class: 'ex-instruction' }, item.instruction || 'Escuchá y escribí lo que oís.'),
      listenButtons(text, ctx.lang),
      input,
      withKeyboard(input, ctx.lang === 'ru'),
    );
    setTimeout(() => {
      if (node.isConnected) speak(text, ctx.lang);
    }, 350);
    return {
      node,
      ready: () => input.value.trim().length > 0,
      check() {
        const res = grade(input.value, answers);
        return { ...res, say: text };
      },
      lock: () => (input.disabled = true),
      focus: () => input.focus(),
    };
  },

  // Emparejar: { pairs: [[idioma, español], ...], instruction? }
  match(item, ctx) {
    const pairs = item.pairs;
    const left = shuffle(pairs.map((p, i) => ({ text: p[0], e: p[2] || '', i })));
    const right = shuffle(pairs.map((p, i) => ({ text: p[1], i })));
    const selected = { l: null, r: null };
    let mistakes = 0;
    let matched = 0;
    const lbtn = [];
    const rbtn = [];
    let finish;
    const auto = new Promise((resolve) => (finish = resolve));

    function paint() {
      lbtn.forEach((b, k) => b.classList.toggle('picked', selected.l === k));
      rbtn.forEach((b, k) => b.classList.toggle('picked', selected.r === k));
    }

    function evaluate() {
      const l = selected.l;
      const r = selected.r;
      selected.l = selected.r = null;
      if (left[l].i === right[r].i) {
        sfx.play('tap');
        for (const b of [lbtn[l], rbtn[r]]) {
          b.classList.remove('picked');
          b.classList.add('right');
          b.disabled = true;
        }
        matched++;
        if (matched === pairs.length) {
          const ok = mistakes === 0;
          finish({
            ok,
            given: mistakes ? `${mistakes} ${mistakes === 1 ? 'error' : 'errores'}` : '',
            expected: ok ? '' : pairs.map((p) => `${p[0]} = ${p[1]}`).join('  ·  '),
            note: ok ? '' : `Tuviste ${mistakes} ${mistakes === 1 ? 'error' : 'errores'} al emparejar.`,
          });
        }
      } else {
        mistakes++;
        sfx.play('wrong');
        for (const b of [lbtn[l], rbtn[r]]) {
          b.classList.add('wrong');
          setTimeout(() => b.classList.remove('wrong'), 450);
        }
      }
      paint();
    }

    function pick(side, k) {
      const other = side === 'l' ? 'r' : 'l';
      selected[side] = selected[side] === k ? null : k;
      if (selected[side] !== null && !(selected[other] !== null)) sfx.play('tap');
      if (side === 'l' && selected.l !== null && item.noSpeak !== true) speak(left[k].text, ctx.lang);
      paint();
      if (selected[other] !== null && selected[side] !== null) evaluate();
    }

    left.forEach((o, k) =>
      lbtn.push(
        h('button', { class: 'pair', type: 'button', lang: ctx.lang, onclick: () => pick('l', k) }, o.e ? h('span', { class: 'pair-e', 'aria-hidden': 'true' }, o.e) : null, o.text),
      ),
    );
    right.forEach((o, k) => rbtn.push(h('button', { class: 'pair', type: 'button', onclick: () => pick('r', k) }, o.text)));

    return {
      node: h(
        'div',
        {},
        prompt(item, ctx, item.instruction || 'Uní cada par.'),
        h('div', { class: 'pairs' }, h('div', { class: 'pairs-col' }, lbtn), h('div', { class: 'pairs-col' }, rbtn)),
      ),
      auto,
    };
  },

  // Pronunciación: { text, es? }  (usa el reconocimiento de voz del navegador si existe)
  speak(item, ctx) {
    let finish;
    const auto = new Promise((resolve) => (finish = resolve));
    const status = h('p', { class: 'ex-hint', 'aria-live': 'polite' }, '');
    const actions = h('div', { class: 'speak-actions' });

    function selfAssess() {
      status.textContent = 'Decí la frase en voz alta y marcá cómo te salió.';
      actions.replaceChildren(
        h('button', { class: 'btn', type: 'button', onclick: () => finish({ ok: true, given: '', expected: item.text, say: item.text }) }, 'Me salió bien'),
        h('button', { class: 'btn ghost', type: 'button', onclick: () => finish({ ok: false, given: '', expected: item.text, say: item.text }) }, 'Tengo que practicarla'),
      );
    }

    if (canListen()) {
      const mic = h(
        'button',
        {
          class: 'btn mic',
          type: 'button',
          onclick: async () => {
            mic.disabled = true;
            status.textContent = 'Escuchando… hablá ahora.';
            try {
              const { best, alts } = await listen(ctx.lang);
              if (!best) {
                status.textContent = 'No te escuché. Probá de nuevo.';
                mic.disabled = false;
                return;
              }
              const target = normalize(item.text);
              const score = Math.max(...alts.map((a) => similarity(normalize(a), target)));
              finish({ ok: score >= 0.75, given: best, expected: item.text, say: item.text });
            } catch {
              selfAssess();
            }
          },
        },
        icon('mic'),
        h('span', {}, 'Hablar'),
      );
      actions.append(mic, h('button', { class: 'link-btn', type: 'button', onclick: selfAssess }, 'Prefiero evaluarme yo'));
    } else {
      selfAssess();
    }
    actions.append(h('button', { class: 'link-btn', type: 'button', onclick: () => finish({ ok: true, skipped: true }) }, 'Saltar'));

    return {
      node: h(
        'div',
        {},
        h('p', { class: 'ex-instruction' }, item.instruction || 'Leé en voz alta.'),
        h('p', { class: 'ex-q big', lang: ctx.lang }, item.text),
        item.es ? h('p', { class: 'ex-hint' }, item.es) : null,
        listenButtons(item.text, ctx.lang),
        status,
        actions,
      ),
      auto,
    };
  },

  // Palabras o frases nuevas: { words: [{ t, es, e?, ex? }], title? }. No puntúa.
  // Hay que tocar cada una para escucharla antes de seguir.
  intro(item, ctx) {
    const heard = new Set();
    const tiles = item.words.map((w, n) => {
      const tile = h(
        'button',
        { class: `intro-tile${item.phrases ? ' phrase' : ''}`, type: 'button', style: `--n:${n}` },
        w.e ? h('span', { class: 'intro-e', 'aria-hidden': 'true' }, w.e) : null,
        h('span', { class: 'intro-t', lang: ctx.lang }, w.t),
        h('span', { class: 'intro-es' }, w.es),
      );
      tile.addEventListener('click', () => {
        sfx.play('tap');
        speak(w.t, ctx.lang);
        tile.classList.remove('bump');
        void tile.offsetWidth; // reinicia la animación si se toca dos veces
        tile.classList.add('bump', 'heard');
        heard.add(n);
        ctx.changed();
      });
      return tile;
    });

    setTimeout(() => {
      if (tiles[0]?.isConnected && item.autoplay !== false) speak(item.words[0].t, ctx.lang);
    }, 450);

    return {
      node: h(
        'div',
        {},
        h('p', { class: 'ex-instruction' }, item.title || 'Palabras nuevas'),
        h('p', { class: 'ex-hint' }, 'Tocá cada una para escucharla.'),
        h('div', { class: `intro-grid${item.phrases ? ' phrases' : ''}` }, tiles),
      ),
      buttonLabel: 'Seguir',
      ready: () => heard.size >= item.words.length,
      check: () => ({ ok: true, skipped: true }),
    };
  },

  // Un dato de gramática cortito: { e?, title, html }. No puntúa.
  tip(item, ctx) {
    const body = h('div', { class: 'tip-body prose', html: item.html });
    for (const el of body.querySelectorAll('.say')) {
      el.tabIndex = 0;
      el.setAttribute('role', 'button');
      el.setAttribute('title', 'Tocá para escuchar');
    }
    return {
      node: h('div', { class: 'tip' }, h('div', { class: 'tip-e', 'aria-hidden': 'true' }, item.e || '💡'), h('h2', { class: 'tip-title' }, item.title), body),
      buttonLabel: 'Entendido',
      ready: () => true,
      check: () => ({ ok: true, skipped: true }),
    };
  },
};

// ---------- flujo ----------

// El manejador de teclado de la pregunta que está en pantalla (para poder soltarlo al salir).
let activeKeydown = null;

export function cancelExercises() {
  if (activeKeydown) document.removeEventListener('keydown', activeKeydown);
  activeKeydown = null;
}

function feedbackNode(item, res, lang) {
  const box = h('div', { class: 'fb' });
  if (res.ok) {
    box.append(
      h('p', { class: 'fb-head' }, icon('check', 'tick'), h('span', {}, PRAISE[Math.floor(Math.random() * PRAISE.length)])),
    );
    if (res.alternative) box.append(h('p', { class: 'fb-line' }, 'Otra forma: ', h('span', { class: 'pen ok' }, res.alternative)));
  } else {
    box.append(h('p', { class: 'fb-head' }, res.near ? 'Casi. Revisá cómo está escrito.' : 'Para corregir'));
    if (res.expected) box.append(h('p', { class: 'fb-line' }, 'Va así: ', h('span', { class: 'pen' }, res.expected)));
    if (res.given) box.append(h('p', { class: 'fb-line muted' }, 'Pusiste: ', res.given));
    if (res.note) box.append(h('p', { class: 'fb-line muted' }, res.note));
  }
  if (item.explain && (!res.ok || item.explainAlways)) {
    box.append(h('p', { class: 'fb-explain', html: fmt(item.explain) }));
  }
  if (res.say) box.append(h('div', { class: 'fb-say' }, speakButton(res.say, lang, { label: 'Escuchar la frase' })));
  return box;
}

function playItem(root, item, ctx) {
  return new Promise((resolve) => {
    const factory = RENDERERS[item.type];
    if (!factory) throw new Error(`Tipo de ejercicio desconocido: ${item.type}`);

    const bar = h('div', { class: 'ex-progress' }, h('span', { style: `width:${ctx.pct}%` }));
    const tag = ctx.retry ? h('p', { class: 'ex-tag' }, 'Otra vez, para fijarlo') : null;
    const body = h('div', { class: 'ex-body' });
    const feedback = h('div', { class: 'ex-feedback', 'aria-live': 'polite' });
    const button = h('button', { class: 'btn primary wide', type: 'button', disabled: true }, 'Comprobar');
    const frame = h('div', { class: 'ex', dataset: { type: item.type, state: 'answer' } }, bar, tag, body, h('div', { class: 'ex-sheet' }, feedback, h('div', { class: 'ex-footer' }, button)));
    root.replaceChildren(frame);

    let phase = 'answer';
    let result = null;

    // `renderer` se asigna después de crear el ejercicio: algunos tipos llaman a changed() mientras se arman.
    let renderer = null;
    renderer = factory(item, {
      lang: ctx.lang,
      changed: () => {
        if (phase === 'answer' && renderer) button.disabled = !renderer.ready();
      },
    });
    body.append(renderer.node);
    button.disabled = !renderer.ready?.();
    if (renderer.buttonLabel) button.textContent = renderer.buttonLabel;

    function show(res) {
      if (phase === 'checked') return;
      phase = 'checked';
      result = res;
      if (res.skipped) return finishItem();
      renderer.lock?.(res);
      sfx.play(res.ok ? 'right' : 'wrong');
      frame.dataset.state = res.ok ? 'ok' : 'bad';
      feedback.className = `ex-feedback ${res.ok ? 'ok' : 'bad'}`;
      feedback.replaceChildren(feedbackNode(item, res, ctx.lang));
      ctx.onAnswer?.(res, { item, sheet: feedback, frame });
      button.hidden = false;
      button.disabled = false;
      button.textContent = 'Continuar';
      button.focus();
    }

    function finishItem() {
      document.removeEventListener('keydown', onKeydown);
      if (activeKeydown === onKeydown) activeKeydown = null;
      stopSpeaking();
      resolve(result);
    }

    function onKeydown(e) {
      const tag = e.target?.tagName;
      const typing = tag === 'INPUT' || tag === 'TEXTAREA';
      if (e.key === 'Enter' && !e.shiftKey && !e.isComposing && (typing || tag === 'BODY')) {
        if (phase === 'answer' && renderer.ready?.()) {
          e.preventDefault();
          show(renderer.check());
        } else if (phase === 'checked') {
          e.preventDefault();
          finishItem();
        }
      } else if (!typing && phase === 'answer') {
        renderer.onKey?.(e);
      }
    }
    activeKeydown = onKeydown;
    document.addEventListener('keydown', onKeydown);

    button.addEventListener('click', () => {
      if (phase === 'answer') show(renderer.check());
      else finishItem();
    });

    if (renderer.auto) {
      button.hidden = true;
      renderer.auto.then(show);
    }
    renderer.focus?.();
  });
}

// Corre toda la serie. Lo que sale mal se repite una vez al final.
// onItem(ok): una vez por pregunta (la primera vez). onAnswer(res, info): cada vez que se corrige algo,
// repeticiones incluidas. shouldStop(): si devuelve true se corta la serie (por ejemplo, sin vidas).
export async function runExercises(root, items, { lang, onItem, onAnswer, shouldStop }) {
  const queue = items.map((item) => ({ item, retry: false }));
  const total = items.length;
  const first = [];
  let counted = 0;
  let stopped = false;
  const started = Date.now();

  while (queue.length) {
    const { item, retry } = queue.shift();
    const res = await playItem(root, item, { lang, retry, onAnswer, pct: Math.round((counted / total) * 100) });
    if (shouldStop?.()) {
      if (!retry && !res.skipped) first.push({ item, ok: res.ok, given: res.given, expected: res.expected });
      stopped = true;
      break;
    }
    if (res.skipped) {
      if (!retry) counted++;
      continue;
    }
    if (!retry) {
      first.push({ item, ok: res.ok, given: res.given, expected: res.expected });
      counted++;
      onItem?.(res.ok);
    }
    const repeatable = item.type !== 'match' && item.type !== 'speak';
    if (!res.ok && !retry && repeatable) queue.push({ item, retry: true });
  }

  const correct = first.filter((r) => r.ok).length;
  return {
    total: first.length,
    correct,
    score: first.length ? Math.round((correct / first.length) * 100) : 100,
    results: first,
    stopped,
    secs: Math.round((Date.now() - started) / 1000),
  };
}

export const EXERCISE_TYPES = Object.keys(RENDERERS);
