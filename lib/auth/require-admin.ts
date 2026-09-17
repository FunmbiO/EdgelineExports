import "server-only";
import { createClient } from "@/lib/supabase/server";

export async function requireAdminUser() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch (err) {
    console.error("requireAdminUser failed:", err);
    return null;
  }
}
