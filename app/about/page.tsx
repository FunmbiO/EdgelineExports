import PageHeader from "@/components/layout/PageHeader";

export const metadata = {
  title: "About | Edgeline Exports",
  description: "Learn about Edgeline Exports, our story, and our team.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="About"
        title="Our Story"
        subtitle="Company story, stats, trust pillars, and testimonials arrive in Sprint 4."
      />
      <div className="mx-auto max-w-7xl px-4 py-16 text-center font-body text-edgeline-black/60 md:px-8">
        Coming in Sprint 4 — Content Pages &amp; Admin CMS.
      </div>
    </>
  );
}
