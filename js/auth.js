// Cuentas con Supabase Auth (email y contraseña).
// Si no hay URL/clave en config.js, la app corre en modo local, sin login.

import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';

export const isLocalMode = !SUPABASE_URL || !SUPABASE_ANON_KEY;

let client = null;

export function getClient() {
  if (isLocalMode) return null;
  if (!client) {
    if (!window.supabase) throw new Error('No se cargó la librería de Supabase (vendor/supabase.js).');
    client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false },
    });
  }
  return client;
}

function toUser(authUser) {
  const name =
    authUser.user_metadata?.display_name || (authUser.email ? authUser.email.split('@')[0] : 'Estudiante');
  return { id: authUser.id, email: authUser.email, name, local: false };
}

export const LOCAL_USER = { id: 'local', email: '', name: 'Estudiante', local: true };

// Devuelve el usuario con sesión iniciada o null.
export async function currentUser() {
  if (isLocalMode) return LOCAL_USER;
  try {
    const { data, error } = await getClient().auth.getSession();
    if (error) throw error;
    return data.session ? toUser(data.session.user) : null;
  } catch (err) {
    // Sin internet: usamos el último usuario que entró en este dispositivo.
    if (!navigator.onLine) {
      try {
        const last = JSON.parse(localStorage.getItem('lingua:lastUser') || 'null');
        if (last) return { ...last, local: false, offline: true };
      } catch {
        /* nada guardado */
      }
    }
    return null;
  }
}

export async function signIn(email, password) {
  const { data, error } = await getClient().auth.signInWithPassword({ email, password });
  if (error) throw error;
  return toUser(data.user);
}

export async function signUp(name, email, password) {
  const { data, error } = await getClient().auth.signUp({
    email,
    password,
    options: { data: { display_name: name } },
  });
  if (error) throw error;
  // Si el proyecto exige confirmar el email no hay sesión todavía.
  if (!data.session) return { needsConfirmation: true };
  return { user: toUser(data.user) };
}

export async function signOut() {
  if (isLocalMode) return;
  await getClient().auth.signOut();
}

export async function sendPasswordReset(email) {
  const { error } = await getClient().auth.resetPasswordForEmail(email, {
    redirectTo: location.origin + location.pathname,
  });
  if (error) throw error;
}
