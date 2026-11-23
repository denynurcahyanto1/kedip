export function getSupabaseConfig(environment = {}) {
  const url = environment.VITE_SUPABASE_URL?.trim();
  const anonKey = environment.VITE_SUPABASE_ANON_KEY?.trim();
  const missing = [];

  if (!url) {
    missing.push('VITE_SUPABASE_URL');
  }
  if (!anonKey) {
    missing.push('VITE_SUPABASE_ANON_KEY');
  }
  if (missing.length) {
    throw new Error(`Missing required environment variable(s): ${missing.join(', ')}.`);
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(url);
  } catch {
    throw new Error('VITE_SUPABASE_URL must be an absolute HTTP or HTTPS URL.');
  }

  if (!['http:', 'https:'].includes(parsedUrl.protocol) || !parsedUrl.hostname) {
    throw new Error('VITE_SUPABASE_URL must be an absolute HTTP or HTTPS URL.');
  }

  return {
    url: url.replace(/\/+$/, ''),
    anonKey,
  };
}
