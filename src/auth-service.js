export async function registerWithEmail(client, { email, password, emailRedirectTo }) {
  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: emailRedirectTo ? { emailRedirectTo } : undefined,
  });
  if (error) {
    throw error;
  }
  return data;
}

export async function signInWithEmail(client, { email, password }) {
  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error) {
    throw error;
  }
  return data;
}

export async function startGoogleSignIn(client, redirectTo) {
  const { data, error } = await client.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo, skipBrowserRedirect: true },
  });
  if (error) {
    throw error;
  }
  if (!data.url) {
    throw new Error('Supabase did not return a Google sign-in URL.');
  }
  return data.url;
}
