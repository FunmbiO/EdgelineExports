import Link from "next/link";
import { getLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/dictionary";

export default async function CtaBanner() {
  const locale = await getLocale();
  const t = getDictionary(locale);

  return (
    <section className="bg-edgeline-red px-4 py-16 text-center md:px-8">
      <h2 className="font-display text-3xl text-edgeline-white md:text-4xl">{t.cta.title}</h2>
      <p className="mx-auto mt-3 max-w-lg font-body text-edgeline-white/80">{t.cta.description}</p>
      <Link
        href="/source-a-car"
        className="mt-8 inline-block bg-edgeline-black px-8 py-4 font-condensed text-sm uppercase tracking-wider text-edgeline-white transition-colors hover:bg-edgeline-gray"
      >
        {t.cta.button}
      </Link>
    </section>
  );
}
