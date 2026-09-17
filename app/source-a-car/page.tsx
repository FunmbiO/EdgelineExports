import PageHeader from "@/components/layout/PageHeader";

export const metadata = {
  title: "Source a Car | Edgeline Exports",
  description: "Tell us what you're looking for and we'll find it.",
};

export default function SourceACarPage() {
  return (
    <>
      <PageHeader
        label="Source a Car"
        title="We'll Find It"
        subtitle="The full sourcing request form, with validation and email confirmation, arrives in Sprint 3."
      />
      <div className="mx-auto max-w-7xl px-4 py-16 text-center font-body text-edgeline-black/60 md:px-8">
        Coming in Sprint 3 — Source &amp; Sell Forms.
      </div>
    </>
  );
}
