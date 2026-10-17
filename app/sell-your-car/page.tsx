import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import ComparisonCard from "@/components/sell/ComparisonCard";
import SellYourCarForm from "@/components/forms/SellYourCarForm";
import { getLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/dictionary";

export const metadata: Metadata = {
  title: "Sell Your Car",
  description: "Outright purchase or consignment — sell your car to Edgeline Exports.",
};

export default async function SellYourCarPage() {
  const locale = await getLocale();
  const t = getDictionary(locale);

  return (
    <div className="bg-surface">
      <PageHeader
        label={t.pageHeaders.sellYourCar.label}
        title={t.pageHeaders.sellYourCar.title}
        subtitle={t.pageHeaders.sellYourCar.subtitle}
      />

      <div className="mx-auto max-w-6xl px-4 py-16 md:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <ComparisonCard
            title={t.comparisonCard.outrightTitle}
            description={t.comparisonCard.outrightDescription}
            steps={[...t.comparisonCard.outrightSteps]}
          />
          <ComparisonCard
            title={t.comparisonCard.consignmentTitle}
            description={t.comparisonCard.consignmentDescription}
            steps={[...t.comparisonCard.consignmentSteps]}
          />
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <SellYourCarForm locale={locale} />
        </div>
      </div>
    </div>
  );
}
