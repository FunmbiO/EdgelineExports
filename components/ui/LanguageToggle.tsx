"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n/dictionary";

export default function LanguageToggle({ locale }: { locale: Locale }) {
  const [pending, setPending] = useState(false);

  const toggle = () => {
    const next: Locale = locale === "en" ? "fr" : "en";
    document.cookie = `locale=${next}; path=/; max-age=31536000; samesite=lax`;
    setPending(true);
    // router.refresh() doesn't reliably pick up a cookie set in the same
    // tick (stale Router Cache payload); a full reload guarantees the
    // server re-renders with the new locale.
    window.location.reload();
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={pending}
      aria-label={locale === "en" ? "Passer au français" : "Switch to English"}
      className="font-condensed text-xs uppercase tracking-wider text-surface-foreground/60 transition-colors hover:text-edgeline-red disabled:opacity-50"
    >
      {locale === "en" ? "FR" : "EN"}
    </button>
  );
}
