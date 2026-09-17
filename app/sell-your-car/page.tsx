import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import ComparisonCard from "@/components/sell/ComparisonCard";
import SellYourCarForm from "@/components/forms/SellYourCarForm";

export const metadata: Metadata = {
  title: "Sell Your Car | Edgeline Exports",
  description: "Outright purchase or consignment — sell your car to Edgeline Exports.",
};

export default function SellYourCarPage() {
  return (
    <div className="bg-edgeline-black">
      <PageHeader
        label="Sell Your Car"
        title="Outright Purchase or Consignment"
        subtitle="Two ways to sell. Tell us your car's details and we'll recommend the right one."
      />

      <div className="mx-auto max-w-6xl px-4 py-16 md:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <ComparisonCard
            title="Outright Purchase"
            description="Fastest way to sell — no listing, no waiting on a buyer."
            steps={[
              "Tell us about your car",
              "Get a firm cash offer within 24 hours",
              "We pick up and pay you on the spot",
            ]}
          />
          <ComparisonCard
            title="Consignment"
            description="We market it for you and you keep more of the sale price."
            steps={[
              "We list and market your car to our buyer network",
              "We handle inquiries, viewings, and negotiation",
              "You get paid when it sells — typically for more",
            ]}
          />
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <SellYourCarForm />
        </div>
      </div>
    </div>
  );
}
