# Supabase authentication setup

The `/auth.html` page supports email/password registration and sign-in, plus Google OAuth. It requires a Supabase project; authentication stays unavailable until local environment values and the provider settings are configured.

## Local configuration

1. Create a Supabase project and open its API settings.
2. Copy `.env.example` to `.env`.
3. Set `VITE_SUPABASE_URL` to the project URL and `VITE_SUPABASE_ANON_KEY` to its public anon/publishable key.
4. Restart the Vite server with `npm run dev`.

Only a public anon/publishable key belongs in this client-side configuration. Never put a Supabase service-role key in a `VITE_` variable or browser code. `.env` is ignored by Git; do not commit it.

## Email confirmation

Enable the email provider in Supabase. Registration asks Supabase to return confirmation links to `/auth.html`, where the client can complete the session flow. Add the local and deployed `/auth.html` URLs to the Supabase project's allowed redirect URLs. Production must be served over HTTPS.

## Google OAuth

Enable the Google provider in Supabase and configure its client ID and secret using the provider's setup instructions. Add the Supabase callback URL shown in the provider settings to the Google OAuth client's authorized redirect URIs. Add local and deployed `/auth.html` URLs to Supabase's allowed redirect URLs. Use HTTPS for the deployed site and OAuth redirects.

## Scope and age handling

Email registration checks the minimum age of 13 in the browser and does not send or store the entered birth date. Google sign-in uses an age attestation because Google OAuth does not provide a date of birth here. These are client-side checks, not server-enforced age verification.

Authentication is the first P0 phase only. Partner linking, synchronized capture, editing, photo storage, galleries, downloads, and payments are not implemented yet.
