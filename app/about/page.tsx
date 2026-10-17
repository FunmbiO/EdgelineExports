import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import StatsBar from "@/components/home/StatsBar";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import TrustSignals from "@/components/inventory/TrustSignals";
import { getFeaturedTestimonials } from "@/lib/testimonials";
import { getLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/dictionary";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Edgeline Exports, our story, and our team.",
};

export default async function AboutPage() {
  const testimonials = await getFeaturedTestimonials();
  const locale = await getLocale();
  const t = getDictionary(locale);

  return (
    <div className="bg-surface">
      <PageHeader label={t.pageHeaders.about.label} title={t.pageHeaders.about.title} />

      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="edge-accent-left aspect-[4/3] bg-[radial-gradient(circle_at_30%_30%,rgba(196,30,42,0.25),transparent_60%)]" />

          <div>
            <p className="font-condensed text-sm uppercase tracking-[0.3em] text-edgeline-red">
              {t.about.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-4xl text-surface-foreground">{t.about.title}</h2>
            <p className="mt-6 font-body text-surface-foreground/70">{t.about.paragraph1}</p>
            <p className="mt-4 font-body text-surface-foreground/70">{t.about.paragraph2}</p>
          </div>
        </div>
      </div>

      <StatsBar />

      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <TrustSignals />
      </div>

      <TestimonialsSection testimonials={testimonials} />
    </div>
  );
}
