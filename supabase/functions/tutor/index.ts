// Tutor de idiomas. Recibe la conversación desde la app, llama a Groq (o a Gemini si Groq falla)
// y devuelve { reply, notes }. Las claves viven acá, como secrets de Supabase, nunca en el navegador.
//
// Secrets (Supabase > Edge Functions > Secrets):
//   GROQ_API_KEY     clave gratis de console.groq.com
//   GEMINI_API_KEY   clave gratis de aistudio.google.com   (con una de las dos alcanza)
// Opcionales:
//   GROQ_MODEL       por defecto llama-3.3-70b-versatile
//   GEMINI_MODEL     por defecto gemini-3.6-flash (mirá cuáles son gratis hoy en ai.google.dev)
//   TUTOR_PROVIDER   groq | gemini | auto (por defecto auto: Groq primero, Gemini de respaldo)
//
// La función exige sesión iniciada (verify_jwt activado, que es lo normal).

type Role = 'user' | 'assistant';
interface Msg {
  role: Role;
  content: string;
}
interface Payload {
  course: 'ru' | 'en';
  level: string;
  mode: 'chat' | 'correct' | 'explain';
  scenario: string;
  studied: string[];
  start: boolean;
  messages: Msg[];
}

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...CORS, 'Content-Type': 'application/json' } });

// ---------- validación ----------

function parsePayload(raw: any): Payload | string {
  if (!raw || typeof raw !== 'object') return 'Pedido inválido.';
  if (raw.course !== 'ru' && raw.course !== 'en') return 'Curso desconocido.';
  if (!['chat', 'correct', 'explain'].includes(raw.mode)) return 'Modo desconocido.';

  const messages: Msg[] = Array.isArray(raw.messages)
    ? raw.messages
        .filter((m: any) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
        .slice(-12)
        .map((m: any) => ({ role: m.role as Role, content: m.content.slice(0, 2000) }))
    : [];

  return {
    course: raw.course,
    mode: raw.mode,
    level: typeof raw.level === 'string' ? raw.level.slice(0, 4) : 'A1',
    scenario: typeof raw.scenario === 'string' ? raw.scenario.slice(0, 80) : '',
    studied: Array.isArray(raw.studied) ? raw.studied.filter((s: any) => typeof s === 'string').slice(0, 10).map((s: string) => s.slice(0, 80)) : [],
    start: raw.start === true,
    messages,
  };
}

// ---------- instrucciones para el modelo ----------

function systemPrompt(p: Payload): string {
  const target = p.course === 'ru' ? 'ruso' : 'inglés';
  const stress =
    p.course === 'ru'
      ? 'En ruso, marcá el acento tónico con ́ (por ejemplo: молоко́) en toda palabra de dos o más sílabas.'
      : '';
  const studied = p.studied.length ? `El estudiante ya vio estos temas: ${p.studied.join('; ')}. Usalos y reforzalos.` : '';

  const common = [
    `Sos un tutor de ${target} para una persona de Argentina que lo estudia en una escuela de idiomas online.`,
    `Su nivel actual es ${p.level} (marco europeo). Adaptá el vocabulario y la gramática a ese nivel: oraciones cortas y claras.`,
    studied,
    stress,
    'Cuando le hables en español, usá español rioplatense con voseo. No uses emojis ni markdown.',
    'Respondé SIEMPRE con un único objeto JSON válido con exactamente dos claves de texto: "reply" y "notes". No agregues nada fuera del JSON.',
  ];

  const byMode: Record<Payload['mode'], string[]> = {
    chat: [
      `Modo conversación. Situación: ${p.scenario || 'charla libre'}.`,
      `"reply": tu mensaje en ${target}, de una a tres oraciones simples, que termine con una pregunta corta para que el estudiante siga.`,
      '"notes": en español, como máximo dos oraciones. Si el último mensaje del estudiante tuvo errores, mostrá cómo se dice bien y la regla en pocas palabras. Si no hubo errores, dejalo vacío ("").',
      p.start ? 'La conversación recién empieza: saludá y abrí la situación. "notes" vacío.' : '',
    ],
    correct: [
      'Modo corrección de textos.',
      `"reply": el texto del estudiante corregido, en ${target}, solo el texto corregido, sin comentarios. Si ya estaba perfecto, repetilo igual.`,
      '"notes": en español, hasta cinco correcciones, una por línea (separadas con \\n), con el formato: error → corrección: motivo breve. Si no había errores, felicitalo en una frase.',
    ],
    explain: [
      'Modo explicación.',
      `"reply": respuesta en español, clara y concreta, de hasta 150 palabras, con uno a tres ejemplos en ${target} y su traducción.`,
      '"notes": un consejo práctico de una oración, o vacío ("").',
    ],
  };

  return [...common, ...byMode[p.mode]].filter(Boolean).join('\n');
}

// El historial tiene que empezar con un mensaje del estudiante (lo exigen los dos proveedores).
function history(p: Payload): Msg[] {
  const list = [...p.messages];
  if (list.length === 0) {
    list.push({ role: 'user', content: p.mode === 'chat' ? 'Empecemos la conversación.' : 'Hola.' });
  } else if (list[0].role === 'assistant') {
    list.unshift({ role: 'user', content: 'Empecemos la conversación.' });
  }
  return list;
}

// ---------- proveedores ----------

async function withTimeout(url: string, init: RequestInit, ms = 25000): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function callGroq(system: string, msgs: Msg[]): Promise<string> {
  const key = Deno.env.get('GROQ_API_KEY');
  if (!key) throw new Error('Falta GROQ_API_KEY');
  // Groq cambia su lista de modelos seguido: probamos varios en orden y usamos el primero que exista.
  const models = [Deno.env.get('GROQ_MODEL'), 'openai/gpt-oss-120b', 'llama-3.3-70b-versatile', 'openai/gpt-oss-20b', 'llama-3.1-8b-instant'].filter(
    (m, i, all): m is string => !!m && all.indexOf(m) === i,
  );
  let lastError = '';
  for (const model of models) {
    const res = await withTimeout('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        messages: [{ role: 'system', content: system }, ...msgs],
        temperature: 0.5,
        max_tokens: 1500,
        response_format: { type: 'json_object' },
        ...(model.startsWith('openai/gpt-oss') ? { reasoning_effort: 'low' } : {}),
      }),
    });
    if (res.ok) {
      const data = await res.json();
      return data.choices?.[0]?.message?.content ?? '';
    }
    lastError = `Groq ${model} ${res.status}: ${(await res.text()).slice(0, 200)}`;
    if (res.status !== 404 && res.status !== 400) break;
  }
  throw new Error(lastError);
}

async function callGemini(system: string, msgs: Msg[]): Promise<string> {
  const key = Deno.env.get('GEMINI_API_KEY');
  if (!key) throw new Error('Falta GEMINI_API_KEY');
  const model = Deno.env.get('GEMINI_MODEL') || 'gemini-3.6-flash';
  const res = await withTimeout(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: 'POST',
    headers: { 'x-goog-api-key': key, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: system }] },
      contents: msgs.map((m) => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] })),
      generationConfig: { temperature: 0.5, maxOutputTokens: 700, responseMimeType: 'application/json' },
    }),
  });
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.map((x: any) => x.text ?? '').join('') ?? '';
}

// El modelo a veces envuelve el JSON en texto: buscamos el primer objeto.
function parseModelOutput(text: string): { reply: string; notes: string } {
  const tryParse = (s: string) => {
    try {
      const o = JSON.parse(s);
      return { reply: String(o.reply ?? '').trim(), notes: String(o.notes ?? '').trim() };
    } catch {
      return null;
    }
  };
  const direct = tryParse(text);
  if (direct && direct.reply) return direct;
  const match = text.match(/\{[\s\S]*\}/);
  const inner = match ? tryParse(match[0]) : null;
  if (inner && inner.reply) return inner;
  return { reply: text.trim(), notes: '' };
}

// ---------- servidor ----------

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return json({ error: 'Método no permitido.' }, 405);

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return json({ error: 'El pedido no es JSON válido.' }, 400);
  }
  const payload = parsePayload(raw);
  if (typeof payload === 'string') return json({ error: payload }, 400);

  const system = systemPrompt(payload);
  const msgs = history(payload);

  const choice = (Deno.env.get('TUTOR_PROVIDER') || 'auto').toLowerCase();
  const order: Array<['groq' | 'gemini', typeof callGroq]> =
    choice === 'gemini'
      ? [['gemini', callGemini]]
      : choice === 'groq'
        ? [['groq', callGroq]]
        : [['groq', callGroq], ['gemini', callGemini]];

  const problems: string[] = [];
  for (const [name, call] of order) {
    try {
      const text = await call(system, msgs);
      const out = parseModelOutput(text);
      if (!out.reply) throw new Error('Respuesta vacía');
      return json({ ...out, provider: name });
    } catch (err) {
      console.error(`[tutor] ${name} falló:`, err instanceof Error ? err.message : err);
      problems.push(name);
    }
  }

  return json(
    { error: `El tutor no pudo responder ahora (${problems.join(', ')}). Probá de nuevo en un minuto; si sigue, revisá las claves en Supabase.` },
    502,
  );
});
