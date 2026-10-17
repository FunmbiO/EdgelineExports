"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "@/components/layout/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LanguageToggle from "@/components/ui/LanguageToggle";
import type { Theme } from "@/lib/theme/server";
import type { Locale } from "@/lib/i18n/dictionary";
import { getDictionary } from "@/lib/i18n/dictionary";

export default function Nav({ theme, locale }: { theme: Theme; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const t = getDictionary(locale);

  const NAV_LINKS = [
    { href: "/inventory", label: t.nav.inventory },
    { href: "/source-a-car", label: t.nav.sourceACar },
    { href: "/sell-your-car", label: t.nav.sellYourCar },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 edge-accent-top bg-surface">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <Link href="/" aria-label="Edgeline Exports — Home">
          <Logo priority variant={theme === "dark" ? "dark" : "light"} className="h-9 w-auto sm:h-10" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-condensed text-sm uppercase tracking-wider text-surface-foreground/80 transition-colors hover:text-edgeline-red"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-5 md:flex">
          <LanguageToggle locale={locale} />
          <ThemeToggle theme={theme} />
          <Link
            href="/admin/login"
            className="font-condensed text-xs uppercase tracking-wider text-surface-foreground/50 hover:text-edgeline-red"
          >
            {t.nav.admin}
          </Link>
          <Link
            href="/source-a-car"
            className="border border-edgeline-red bg-edgeline-red px-5 py-2 font-condensed text-sm uppercase tracking-wider text-edgeline-white transition-colors hover:bg-transparent hover:text-edgeline-red"
          >
            {t.nav.findMyCar}
          </Link>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <LanguageToggle locale={locale} />
          <ThemeToggle theme={theme} />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
            className="flex flex-col gap-1.5"
          >
            <span
              className={`h-0.5 w-6 bg-surface-foreground transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span className={`h-0.5 w-6 bg-surface-foreground transition-opacity ${open ? "opacity-0" : ""}`} />
            <span
              className={`h-0.5 w-6 bg-surface-foreground transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-theme-border px-4 pb-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-3 font-condensed text-sm uppercase tracking-wider text-surface-foreground/80 hover:text-edgeline-red"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/source-a-car"
            onClick={() => setOpen(false)}
            className="mt-2 inline-block bg-edgeline-red px-5 py-3 text-center font-condensed text-sm uppercase tracking-wider text-edgeline-white"
          >
            {t.nav.findMyCar}
          </Link>
          <Link
            href="/admin/login"
            onClick={() => setOpen(false)}
            className="mt-2 py-2 text-center font-condensed text-xs uppercase tracking-wider text-surface-foreground/50"
          >
            {t.nav.admin}
          </Link>
        </nav>
      )}
    </header>
  );
}
