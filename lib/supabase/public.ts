import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Anon-key client that never touches cookies() — safe to call during static
 * generation / ISR, unlike the cookie-based server client, which forces any
 * route that uses it into fully dynamic (per-request) rendering.
 */
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
