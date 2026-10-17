import Link from "next/link";
import { getLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/dictionary";

export default async function NotFound() {
  const locale = await getLocale();
  const t = getDictionary(locale);

  return (
    <div className="edge-accent-top flex min-h-[70vh] flex-col items-center justify-center bg-surface px-4 text-center">
      <p className="font-display text-8xl text-edgeline-red md:text-9xl">404</p>
      <h1 className="mt-4 font-display text-3xl text-surface-foreground md:text-4xl">
        {t.notFound.title}
      </h1>
      <p className="mt-3 max-w-md font-body text-surface-foreground/60">{t.notFound.description}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="bg-edgeline-red px-8 py-4 font-condensed text-sm uppercase tracking-wider text-edgeline-white transition-colors hover:bg-edgeline-red-dark"
        >
          {t.notFound.backToHome}
        </Link>
        <Link
          href="/inventory"
          className="border border-surface-foreground/30 px-8 py-4 font-condensed text-sm uppercase tracking-wider text-surface-foreground transition-colors hover:border-edgeline-red hover:text-edgeline-red"
        >
          {t.notFound.browseInventory}
        </Link>
      </div>
    </div>
  );
}
