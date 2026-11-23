import './styles.css';
import { registerWithEmail, signInWithEmail, startGoogleSignIn } from './auth-service.js';
import { isAtLeast13 } from './auth-validation.js';
import { createSupabaseClient } from './supabase-client.js';

const formArea = document.querySelector('#auth-form-area');
const form = document.querySelector('#auth-form');
const signupFields = document.querySelector('#auth-signup-fields');
const dateOfBirth = document.querySelector('#date-of-birth');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const submitButton = document.querySelector('#auth-submit');
const googleButton = document.querySelector('#google-sign-in');
const googleAgeConfirmation = document.querySelector('#google-age-confirmation');
const signOutButton = document.querySelector('#auth-sign-out');
const signedInPanel = document.querySelector('#auth-signed-in');
const accountEmail = document.querySelector('#auth-account-email');
const title = document.querySelector('#auth-title');
const description = document.querySelector('#auth-description');
const status = document.querySelector('#auth-status');
const modeButtons = [...document.querySelectorAll('[data-auth-mode]')];

let client;
let mode = 'signin';
let configurationError = '';

function announce(message, tone = 'info') {
  status.textContent = message;
  status.dataset.tone = tone;
  status.setAttribute('role', tone === 'error' ? 'alert' : 'status');
}

function setMode(nextMode) {
  mode = nextMode;
  const isSignup = mode === 'signup';
  signupFields.hidden = !isSignup;
  dateOfBirth.required = isSignup;
  dateOfBirth.setCustomValidity('');
  passwordInput.autocomplete = isSignup ? 'new-password' : 'current-password';
  title.textContent = isSignup ? 'Buat akun Kedip' : 'Masuk ke Kedip';
  description.textContent = isSignup
    ? 'Buat akun untuk memulai cerita kecil kalian.'
    : 'Simpan cerita kecil kalian, meski kota berbeda.';
  submitButton.textContent = isSignup ? 'Buat akun' : 'Masuk';
  for (const button of modeButtons) {
    button.setAttribute('aria-pressed', String(button.dataset.authMode === mode));
  }
  announce(configurationError, configurationError ? 'error' : 'info');
}

function setSession(session) {
  const hasSession = Boolean(session);
  formArea.hidden = hasSession;
  signedInPanel.hidden = !hasSession;
  accountEmail.textContent = session?.user?.email ?? 'Akun Kedip';
}

function getErrorMessage(error) {
  return error instanceof Error ? error.message : 'Terjadi kesalahan. Coba lagi.';
}

function setBusy(isBusy) {
  submitButton.disabled = isBusy || !client;
  googleButton.disabled = isBusy || !client;
  signOutButton.disabled = isBusy;
}

for (const button of modeButtons) {
  button.addEventListener('click', () => setMode(button.dataset.authMode));
}

dateOfBirth.addEventListener('input', () => dateOfBirth.setCustomValidity(''));
setMode('signin');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!client || !form.reportValidity()) {
    return;
  }

  if (mode === 'signup' && !isAtLeast13(dateOfBirth.value)) {
    dateOfBirth.setCustomValidity('Kamu harus berusia minimal 13 tahun untuk membuat akun.');
    dateOfBirth.reportValidity();
    dateOfBirth.focus();
    return;
  }
  dateOfBirth.setCustomValidity('');

  setBusy(true);
  announce(mode === 'signup' ? 'Membuat akun…' : 'Memeriksa akun…');
  try {
    if (mode === 'signup') {
      const { session } = await registerWithEmail(client, {
        email: emailInput.value.trim(),
        password: passwordInput.value,
        dateOfBirth: dateOfBirth.value,
        emailRedirectTo: new URL('/auth.html', window.location.origin).toString(),
      });
      if (session) {
        setSession(session);
        announce('Akun berhasil dibuat dan kamu sudah masuk.', 'success');
      } else {
        announce('Pendaftaran berhasil. Cek email untuk mengonfirmasi akun.', 'success');
      }
    } else {
      const { session } = await signInWithEmail(client, {
        email: emailInput.value.trim(),
        password: passwordInput.value,
      });
      setSession(session);
      announce('Berhasil masuk.', 'success');
    }
  } catch (error) {
    announce(getErrorMessage(error), 'error');
  } finally {
    setBusy(false);
  }
});

googleButton.addEventListener('click', async () => {
  if (!client) {
    return;
  }
  if (!googleAgeConfirmation.checked) {
    announce('Konfirmasi usia minimal 13 tahun untuk melanjutkan dengan Google.', 'error');
    googleAgeConfirmation.focus();
    return;
  }

  setBusy(true);
  announce('Menghubungkan ke Google…');
  try {
    const redirectTo = new URL('/auth.html', window.location.origin).toString();
    window.location.assign(await startGoogleSignIn(client, redirectTo));
  } catch (error) {
    announce(getErrorMessage(error), 'error');
    setBusy(false);
  }
});

signOutButton.addEventListener('click', async () => {
  setBusy(true);
  announce('Keluar dari akun…');
  try {
    const { error } = await client.auth.signOut();
    if (error) {
      throw error;
    }
    setSession(null);
    announce('Kamu sudah keluar.', 'success');
  } catch (error) {
    announce(getErrorMessage(error), 'error');
  } finally {
    setBusy(false);
  }
});

try {
  client = createSupabaseClient();
  setBusy(false);
  const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
    setSession(session);
  });
  window.addEventListener('pagehide', () => subscription.unsubscribe(), { once: true });

  client.auth.getSession().then(({ data, error }) => {
    if (error) {
      announce(error.message, 'error');
      return;
    }
    setSession(data.session);
  }).catch((error) => {
    announce(getErrorMessage(error), 'error');
  });
} catch (error) {
  setBusy(false);
  configurationError = `${getErrorMessage(error)} Salin .env.example menjadi .env, isi konfigurasi Supabase, lalu mulai ulang server.`;
  announce(configurationError, 'error');
}
