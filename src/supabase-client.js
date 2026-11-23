import { createClient } from '@supabase/supabase-js';
import { getSupabaseConfig } from './supabase-config.js';

export function createSupabaseClient(environment = import.meta.env ?? {}) {
  const { url, anonKey } = getSupabaseConfig(environment);
  return createClient(url, anonKey);
}
