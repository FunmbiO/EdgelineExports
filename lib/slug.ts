import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Mirrors the DB-side vehicles_set_slug trigger (Sprint 2 migration) so
 * vehicle creation doesn't silently fail if that migration hasn't been
 * applied yet — the app generates a unique slug itself either way.
 */
export async function generateUniqueVehicleSlug(
  supabase: SupabaseClient,
  { year, make, model }: { year: number; make: string; model: string },
): Promise<string> {
  const baseSlug = slugify(`${year}-${make}-${model}`);
  let candidate = baseSlug;
  let suffix = 1;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { data, error } = await supabase
      .from("vehicles")
      .select("id")
      .eq("slug", candidate)
      .maybeSingle();

    if (error) throw error;
    if (!data) return candidate;

    suffix += 1;
    candidate = `${baseSlug}-${suffix}`;
  }
}
