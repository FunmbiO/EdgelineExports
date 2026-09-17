import PageHeader from "@/components/layout/PageHeader";

export const metadata = {
  title: "Inventory | Edgeline Exports",
  description: "Browse Edgeline Exports' current vehicle inventory.",
};

export default function InventoryPage() {
  return (
    <>
      <PageHeader
        label="Inventory"
        title="Current Stock"
        subtitle="Live filtering, car cards, and the full inventory grid arrive in Sprint 2, wired to Supabase."
      />
      <div className="mx-auto max-w-7xl px-4 py-16 text-center font-body text-edgeline-black/60 md:px-8">
        Coming in Sprint 2 — Inventory &amp; Car Detail.
      </div>
    </>
  );
}
