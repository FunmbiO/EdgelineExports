"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Theme } from "@/lib/theme/server";

export default function ThemeToggle({ theme }: { theme: Theme }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.cookie = `theme=${next}; path=/; max-age=31536000; samesite=lax`;
    document.documentElement.classList.toggle("dark", next === "dark");
    setPending(true);
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={pending}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-8 w-8 items-center justify-center rounded-full text-surface-foreground/60 transition-colors hover:text-edgeline-red disabled:opacity-50"
    >
      {theme === "dark" ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
          <circle cx="12" cy="12" r="4.5" />
          <path
            strokeLinecap="round"
            d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M20.4 14.7A8.3 8.3 0 0 1 9.3 3.6a.75.75 0 0 0-.9-1A9.8 9.8 0 1 0 21.4 15.6a.75.75 0 0 0-1-.9Z" />
        </svg>
      )}
    </button>
  );
}
