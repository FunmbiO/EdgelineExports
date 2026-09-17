import PageHeader from "@/components/layout/PageHeader";

export const metadata = {
  title: "Sell Your Car | Edgeline Exports",
  description: "Outright purchase or consignment — sell your car to Edgeline Exports.",
};

export default function SellYourCarPage() {
  return (
    <>
      <PageHeader
        label="Sell Your Car"
        title="Outright Purchase or Consignment"
        subtitle="The comparison layout and sell form, with validation and email confirmation, arrive in Sprint 3."
      />
      <div className="mx-auto max-w-7xl px-4 py-16 text-center font-body text-edgeline-black/60 md:px-8">
        Coming in Sprint 3 — Source &amp; Sell Forms.
      </div>
    </>
  );
}
