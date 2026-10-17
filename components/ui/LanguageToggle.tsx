"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Locale } from "@/lib/i18n/dictionary";

export default function LanguageToggle({ locale }: { locale: Locale }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const toggle = () => {
    const next: Locale = locale === "en" ? "fr" : "en";
    document.cookie = `locale=${next}; path=/; max-age=31536000; samesite=lax`;
    setPending(true);
    router.refresh();
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
