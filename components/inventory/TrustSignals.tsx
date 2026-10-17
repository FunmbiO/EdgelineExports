import { getLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/dictionary";

export default async function TrustSignals() {
  const locale = await getLocale();
  const t = getDictionary(locale);

  const SIGNALS = [
    { title: t.trustSignals.inspectionTitle, description: t.trustSignals.inspectionDescription },
    { title: t.trustSignals.historyTitle, description: t.trustSignals.historyDescription },
    { title: t.trustSignals.deliveryTitle, description: t.trustSignals.deliveryDescription },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-3">
      {SIGNALS.map((signal) => (
        <div key={signal.title} className="edge-accent-left border border-theme-border bg-card p-6">
          <h3 className="font-condensed text-sm uppercase tracking-wider text-card-foreground">
            {signal.title}
          </h3>
          <p className="mt-2 font-body text-sm text-card-foreground/60">{signal.description}</p>
        </div>
      ))}
    </div>
  );
}
