"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminTopBar({ email }: { email: string }) {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="flex items-center justify-between gap-3 border-b border-edgeline-border px-4 py-4 sm:px-6 md:px-10">
      <p className="truncate font-condensed text-sm text-edgeline-white/60">{email}</p>
      <button
        onClick={handleSignOut}
        className="shrink-0 font-condensed text-xs uppercase tracking-wider text-edgeline-white/60 hover:text-edgeline-red"
      >
        Sign Out
      </button>
    </div>
  );
}
