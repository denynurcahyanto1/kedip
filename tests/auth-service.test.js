import assert from 'node:assert/strict';
import test from 'node:test';
import { createClient } from '@supabase/supabase-js';
import { registerWithEmail, startGoogleSignIn } from '../src/auth-service.js';

function createTestClient(fetchImplementation) {
  return createClient('http://127.0.0.1:54321', 'test-anon-key', {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
    global: { fetch: fetchImplementation },
  });
}

test('email registration sends credentials but never the birth date to Supabase', async () => {
  let request;
  const client = createTestClient(async (url, options) => {
    request = { url: String(url), body: JSON.parse(options.body) };
    return new Response(JSON.stringify({
      id: 'user-id',
      aud: 'authenticated',
      role: 'authenticated',
      email: 'person@example.com',
      app_metadata: { provider: 'email', providers: ['email'] },
      user_metadata: {},
      identities: [],
      created_at: '2026-01-01T00:00:00.000Z',
      updated_at: '2026-01-01T00:00:00.000Z',
    }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  });

  const result = await registerWithEmail(client, {
    email: 'person@example.com',
    password: 'a long passphrase',
    dateOfBirth: '2000-01-01',
    emailRedirectTo: 'http://localhost:5173/auth.html',
  });

  assert.equal(new URL(request.url).pathname, '/auth/v1/signup');
  assert.equal(new URL(request.url).searchParams.get('redirect_to'), 'http://localhost:5173/auth.html');
  assert.equal(request.body.email, 'person@example.com');
  assert.equal(request.body.password, 'a long passphrase');
  assert.equal('dateOfBirth' in request.body, false);
  assert.equal(result.user.id, 'user-id');
  await client.auth.dispose();
});

test('Google sign-in returns the provider URL for the page to navigate to', async () => {
  const client = createTestClient(() => {
    throw new Error('OAuth URL generation should not make a network request');
  });
  const redirectTo = 'http://localhost:4173/auth.html';

  const providerUrl = await startGoogleSignIn(client, redirectTo);
  const url = new URL(providerUrl);

  assert.equal(url.origin, 'http://127.0.0.1:54321');
  assert.equal(url.pathname, '/auth/v1/authorize');
  assert.equal(url.searchParams.get('provider'), 'google');
  assert.equal(url.searchParams.get('redirect_to'), redirectTo);
  await client.auth.dispose();
});

test('email registration surfaces Supabase errors', async () => {
  const client = createTestClient(async () => new Response(JSON.stringify({
    code: 'email_address_invalid',
    message: 'Email address is invalid',
  }), {
    status: 400,
    headers: { 'content-type': 'application/json' },
  }));

  await assert.rejects(
    registerWithEmail(client, {
      email: 'not-an-email',
      password: 'a long passphrase',
    }),
    /Email address is invalid/,
  );
  await client.auth.dispose();
});
