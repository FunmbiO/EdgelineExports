import { getLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/dictionary";

export default async function StatsBar() {
  const locale = await getLocale();
  const t = getDictionary(locale);

  const STATS = [
    { value: "340+", label: t.stats.carsSold },
    { value: "98%", label: t.stats.satisfaction },
    { value: t.stats.avgTurnaroundValue, label: t.stats.avgTurnaround },
    { value: "$52M", label: t.stats.volume },
  ];

  return (
    <section className="border-b border-theme-border bg-surface">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-theme-border px-4 md:grid-cols-4 md:px-8">
        {STATS.map((stat) => (
          <div key={stat.label} className="px-4 py-10 text-center first:pl-0 last:pr-0">
            <p className="font-display text-4xl text-surface-foreground md:text-5xl">
              <span className="text-edgeline-red">{stat.value.slice(0, 1)}</span>
              {stat.value.slice(1)}
            </p>
            <p className="mt-2 font-condensed text-xs uppercase tracking-wider text-surface-foreground/60">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
