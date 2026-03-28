import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // On utilise des chaines vides par défaut pour éviter le crash de la librairie Supabase
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://tmp.supabase.co';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'tmp-key';

  return createBrowserClient(url, key);
}
