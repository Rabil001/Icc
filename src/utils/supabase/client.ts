import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  let url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  let key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Si l'URL n'est pas valide ou absente, on force une URL de secours
  if (!url || !url.startsWith('http')) {
    url = 'https://placeholder.supabase.co';
  }

  if (!key) {
    key = 'placeholder';
  }

  return createBrowserClient(url, key);
}
