import Link from "next/link";
import { getLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/dictionary";

export default async function Hero() {
  const locale = await getLocale();
  const t = getDictionary(locale);

  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-surface">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(196,30,42,0.25),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(196,30,42,0.15),transparent_50%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,var(--hero-vignette-start)_0%,var(--hero-vignette-end)_100%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-30 md:px-8">
        <div className="fade-up max-w-2xl">
          <p className="font-condensed text-sm uppercase tracking-[0.3em] text-edgeline-red">
            {t.hero.eyebrow}
          </p>
          <h1 className="mt-4 font-display text-6xl font-bold leading-none text-surface-foreground sm:text-7xl md:text-8xl">
            {t.hero.titleLine1} <span className="text-edgeline-red">{t.hero.titleHighlight}</span>.
          </h1>
          <p className="mt-6 max-w-lg font-body text-lg text-surface-foreground/70">
            {t.hero.description}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/inventory"
              className="inline-block bg-edgeline-red px-8 py-4 text-center font-condensed text-sm uppercase tracking-wider text-edgeline-white transition-colors hover:bg-edgeline-red-dark"
            >
              {t.hero.viewInventory}
            </Link>
            <Link
              href="/source-a-car"
              className="inline-block border border-surface-foreground/30 px-8 py-4 text-center font-condensed text-sm uppercase tracking-wider text-surface-foreground transition-colors hover:border-edgeline-red hover:text-edgeline-red"
            >
              {t.hero.sourceACar}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
