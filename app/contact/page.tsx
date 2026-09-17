import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Edgeline Exports",
  description: "Get in touch with Edgeline Exports.",
};

export default function ContactPage() {
  return (
    <div className="bg-edgeline-black">
      <PageHeader label="Contact" title="Get In Touch" />

      <div className="mx-auto max-w-6xl px-4 py-16 md:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-6">
            <div className="border border-edgeline-border p-8">
              <h3 className="font-condensed text-sm uppercase tracking-wider text-edgeline-red">
                Contact Info
              </h3>
              <ul className="mt-4 space-y-2 font-body text-edgeline-white/80">
                <li>hello@edgelineexports.com</li>
                <li>(555) 010-9200</li>
                <li>Nationwide Delivery, USA</li>
              </ul>
            </div>

            <div className="edge-accent-left border border-edgeline-border bg-edgeline-black p-8">
              <h3 className="font-condensed text-sm uppercase tracking-wider text-edgeline-white">
                Response Time
              </h3>
              <p className="mt-2 font-body text-edgeline-white/60">
                We respond to every message within one business day.
              </p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
