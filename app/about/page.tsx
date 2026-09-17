import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import StatsBar from "@/components/home/StatsBar";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import TrustSignals from "@/components/inventory/TrustSignals";
import { getFeaturedTestimonials } from "@/lib/testimonials";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About | Edgeline Exports",
  description: "Learn about Edgeline Exports, our story, and our team.",
};

export default async function AboutPage() {
  const testimonials = await getFeaturedTestimonials();

  return (
    <div className="bg-edgeline-black">
      <PageHeader label="About" title="Our Story" />

      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="edge-accent-left aspect-[4/3] bg-[radial-gradient(circle_at_30%_30%,rgba(196,30,42,0.25),transparent_60%)]" />

          <div>
            <p className="font-condensed text-sm uppercase tracking-[0.3em] text-edgeline-red">
              Since Day One
            </p>
            <h2 className="mt-3 font-display text-4xl text-edgeline-white">Driven by Value</h2>
            <p className="mt-6 font-body text-edgeline-white/70">
              Edgeline Exports started as an online-only dealership built around a simple
              idea: buying or selling a performance car shouldn&apos;t require a showroom,
              a hard sell, or guesswork about a vehicle&apos;s history.
            </p>
            <p className="mt-4 font-body text-edgeline-white/70">
              Every car we list is inspected and history-verified before it goes live. Every
              sourcing request is handled by someone who actually knows the market. And every
              sale — whether you&apos;re buying, selling, or having us find your next car — is
              backed by nationwide delivery and a team that answers the phone.
            </p>
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
