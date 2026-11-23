import assert from 'node:assert/strict';
import test from 'node:test';
import { getSupabaseConfig } from '../src/supabase-config.js';

test('Supabase config reads and trims the public project settings', () => {
  assert.deepEqual(
    getSupabaseConfig({
      VITE_SUPABASE_URL: ' https://kedip.supabase.co ',
      VITE_SUPABASE_ANON_KEY: ' public-anon-key ',
    }),
    {
      url: 'https://kedip.supabase.co',
      anonKey: 'public-anon-key',
    },
  );
});

test('Supabase config reports which environment variables are missing without exposing values', () => {
  assert.throws(
    () => getSupabaseConfig({ VITE_SUPABASE_URL: 'https://kedip.supabase.co' }),
    (error) => error.message.includes('VITE_SUPABASE_ANON_KEY') && !error.message.includes('kedip.supabase.co'),
  );
});

test('Supabase config rejects invalid project URLs', () => {
  assert.throws(
    () => getSupabaseConfig({
      VITE_SUPABASE_URL: 'not-a-url',
      VITE_SUPABASE_ANON_KEY: 'public-anon-key',
    }),
    /VITE_SUPABASE_URL must be an absolute HTTP or HTTPS URL/,
  );
});
