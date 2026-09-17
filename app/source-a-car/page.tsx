import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import SourceACarForm from "@/components/forms/SourceACarForm";

export const metadata: Metadata = {
  title: "Source a Car | Edgeline Exports",
  description: "Tell us what you're looking for and we'll find it.",
};

export default function SourceACarPage() {
  return (
    <div className="bg-edgeline-black">
      <PageHeader
        label="Source a Car"
        title="We'll Find It"
        subtitle="Tell us what you want, and we'll go source it from our network."
      />
      <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
        <SourceACarForm />
      </div>
    </div>
  );
}
