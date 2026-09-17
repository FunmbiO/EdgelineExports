import PageHeader from "@/components/layout/PageHeader";

export default function VehicleDetailPage({ params }: { params: { slug: string } }) {
  return (
    <>
      <PageHeader
        label="Vehicle"
        title={params.slug.replace(/-/g, " ")}
        subtitle="Full spec grid, gallery, and inquiry CTAs arrive in Sprint 2, wired to Supabase."
      />
      <div className="mx-auto max-w-7xl px-4 py-16 text-center font-body text-edgeline-black/60 md:px-8">
        Coming in Sprint 2 — Inventory &amp; Car Detail.
      </div>
    </>
  );
}
