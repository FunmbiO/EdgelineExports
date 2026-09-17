import type { SupabaseClient } from "@supabase/supabase-js";

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

/**
 * Backed by form_submissions.ip_address rather than in-memory state, so
 * the limit holds across serverless instances. Fails open (allows the
 * request) if the check itself errors — a broken rate limiter shouldn't
 * block real leads.
 */
export async function checkRateLimit(
  supabase: SupabaseClient,
  ip: string,
): Promise<boolean> {
  if (!ip || ip === "unknown") return true;

  const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
  const { count, error } = await supabase
    .from("form_submissions")
    .select("id", { count: "exact", head: true })
    .eq("ip_address", ip)
    .gte("created_at", since);

  if (error) {
    console.error("Rate limit check failed:", error);
    return true;
  }

  return (count ?? 0) < RATE_LIMIT_MAX;
}

export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}
