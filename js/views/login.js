// Entrar o crear la cuenta. Con dos personas alcanza con registrar dos cuentas y
// después desactivar los registros nuevos en Supabase (ver README).

import { h } from '../util.js';
import { signIn, signUp, sendPasswordReset } from '../auth.js';
import { loadUser } from '../store.js';

function friendly(err) {
  const msg = String(err?.message || err);
  if (/invalid login credentials/i.test(msg)) return 'El email o la contraseña no coinciden.';
  if (/email not confirmed/i.test(msg)) return 'Falta confirmar el email. Revisá tu bandeja de entrada.';
  if (/already registered|already been registered/i.test(msg)) return 'Ese email ya tiene una cuenta. Probá entrar.';
  if (/password should be at least/i.test(msg)) return 'La contraseña tiene que tener al menos 6 caracteres.';
  if (/signups not allowed|signup is disabled/i.test(msg)) return 'Los registros nuevos están desactivados.';
  if (/failed to fetch|network/i.test(msg)) return 'No hay conexión con el servidor. Revisá tu internet.';
  return msg;
}

export default function loginView(root) {
  let mode = 'signin';
  const message = h('p', { class: 'form-msg', role: 'alert', 'aria-live': 'assertive' });

  const name = h('input', { class: 'field', type: 'text', id: 'f-name', autocomplete: 'name', placeholder: 'Cómo te llamás' });
  const email = h('input', { class: 'field', type: 'email', id: 'f-email', autocomplete: 'email', required: true, placeholder: 'tu@email.com' });
  const pass = h('input', { class: 'field', type: 'password', id: 'f-pass', autocomplete: 'current-password', required: true, minlength: 6, placeholder: 'Mínimo 6 caracteres' });
  const nameRow = h('div', { class: 'form-row', hidden: true }, h('label', { for: 'f-name' }, 'Nombre'), name);
  const submit = h('button', { class: 'btn primary wide', type: 'submit' }, 'Entrar');
  const switcher = h('button', { class: 'link-btn', type: 'button' });
  const forgot = h('button', { class: 'link-btn', type: 'button' }, 'Olvidé mi contraseña');

  function setMode(next) {
    mode = next;
    const signup = mode === 'signup';
    nameRow.hidden = !signup;
    name.required = signup;
    pass.autocomplete = signup ? 'new-password' : 'current-password';
    submit.textContent = signup ? 'Crear cuenta' : 'Entrar';
    switcher.textContent = signup ? 'Ya tengo cuenta' : 'Crear una cuenta';
    forgot.hidden = signup;
    message.textContent = '';
  }
  switcher.addEventListener('click', () => setMode(mode === 'signin' ? 'signup' : 'signin'));
  setMode('signin');

  forgot.addEventListener('click', async () => {
    if (!email.value.trim()) {
      message.textContent = 'Escribí tu email arriba y volvé a tocar este botón.';
      return;
    }
    try {
      await sendPasswordReset(email.value.trim());
      message.textContent = 'Te mandamos un mail para cambiar la contraseña.';
    } catch (err) {
      message.textContent = friendly(err);
    }
  });

  const form = h(
    'form',
    {
      class: 'form',
      novalidate: false,
      onsubmit: async (e) => {
        e.preventDefault();
        message.textContent = '';
        submit.disabled = true;
        try {
          if (mode === 'signup') {
            const res = await signUp(name.value.trim() || email.value.split('@')[0], email.value.trim(), pass.value);
            if (res.needsConfirmation) {
              message.textContent = 'Cuenta creada. Confirmá el email que te mandamos y después entrá.';
              setMode('signin');
              return;
            }
            loadUser(res.user);
          } else {
            loadUser(await signIn(email.value.trim(), pass.value));
          }
          location.hash = '#/';
        } catch (err) {
          message.textContent = friendly(err);
        } finally {
          submit.disabled = false;
        }
      },
    },
    nameRow,
    h('div', { class: 'form-row' }, h('label', { for: 'f-email' }, 'Email'), email),
    h('div', { class: 'form-row' }, h('label', { for: 'f-pass' }, 'Contraseña'), pass),
    message,
    submit,
    h('div', { class: 'form-links' }, switcher, forgot),
  );

  root.append(
    h(
      'section',
      { class: 'login' },
      h('div', { class: 'brand' }, h('h1', {}, 'Cuaderno'), h('p', {}, 'Ruso e inglés, paso a paso.')),
      form,
    ),
  );
  email.focus();
}
