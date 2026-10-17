import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import SourceACarForm from "@/components/forms/SourceACarForm";
import { getLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/dictionary";

export const metadata: Metadata = {
  title: "Source a Car",
  description: "Tell us what you're looking for and we'll find it.",
};

export default async function SourceACarPage() {
  const locale = await getLocale();
  const t = getDictionary(locale);

  return (
    <div className="bg-surface">
      <PageHeader
        label={t.pageHeaders.sourceACar.label}
        title={t.pageHeaders.sourceACar.title}
        subtitle={t.pageHeaders.sourceACar.subtitle}
      />
      <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
        <SourceACarForm locale={locale} />
      </div>
    </div>
  );
}
