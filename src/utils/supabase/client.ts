import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // On récupère les clés avec des valeurs par défaut vides pour éviter le crash au build
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

  return createBrowserClient(url, key);
}
