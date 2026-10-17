import Link from "next/link";
import { getLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/dictionary";

export default async function ServicesSection() {
  const locale = await getLocale();
  const t = getDictionary(locale);

  const SERVICES = [
    { title: t.services.buyTitle, description: t.services.buyDescription, href: "/inventory" },
    { title: t.services.findTitle, description: t.services.findDescription, href: "/source-a-car" },
    { title: t.services.sellTitle, description: t.services.sellDescription, href: "/sell-your-car" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 md:px-8">
      <p className="text-center font-condensed text-sm uppercase tracking-[0.3em] text-edgeline-red">
        {t.services.eyebrow}
      </p>
      <h2 className="mt-3 text-center font-display text-4xl text-surface-foreground">{t.services.title}</h2>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {SERVICES.map((service) => (
          <Link
            key={service.title}
            href={service.href}
            className="group relative overflow-hidden border border-theme-border p-8"
          >
            <h3 className="font-display text-2xl text-surface-foreground">{service.title}</h3>
            <p className="mt-3 font-body text-surface-foreground/60">{service.description}</p>
            <span className="mt-6 inline-block font-condensed text-xs uppercase tracking-wider text-edgeline-red">
              {t.services.learnMore} →
            </span>
            <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-edgeline-red transition-transform duration-300 group-hover:scale-x-100" />
          </Link>
        ))}
      </div>
    </section>
  );
}
