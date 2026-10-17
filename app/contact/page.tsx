import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import ContactForm from "@/components/forms/ContactForm";
import { getLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/dictionary";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Edgeline Exports.",
};

export default async function ContactPage() {
  const locale = await getLocale();
  const t = getDictionary(locale);

  return (
    <div className="bg-surface">
      <PageHeader label={t.pageHeaders.contact.label} title={t.pageHeaders.contact.title} />

      <div className="mx-auto max-w-6xl px-4 py-16 md:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-6">
            <div className="border border-theme-border p-8">
              <h3 className="font-condensed text-sm uppercase tracking-wider text-edgeline-red">
                {t.contactPage.infoTitle}
              </h3>
              <ul className="mt-4 space-y-2 font-body text-surface-foreground/80">
                <li>hello@edgelineexports.com</li>
                <li>(555) 010-9200</li>
                <li>{t.footer.nationwideDelivery}</li>
              </ul>
            </div>

            <div className="edge-accent-left border border-theme-border bg-surface p-8">
              <h3 className="font-condensed text-sm uppercase tracking-wider text-surface-foreground">
                {t.contactPage.responseTimeTitle}
              </h3>
              <p className="mt-2 font-body text-surface-foreground/60">{t.contactPage.responseTimeBody}</p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <ContactForm locale={locale} />
          </div>
        </div>
      </div>
    </div>
  );
}
