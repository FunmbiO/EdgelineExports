import PageHeader from "@/components/layout/PageHeader";

export const metadata = {
  title: "Contact | Edgeline Exports",
  description: "Get in touch with Edgeline Exports.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        label="Contact"
        title="Get In Touch"
        subtitle="The split contact layout and message form, wired to email notifications, arrive in Sprint 4."
      />
      <div className="mx-auto max-w-7xl px-4 py-16 text-center font-body text-edgeline-black/60 md:px-8">
        Coming in Sprint 4 — Content Pages &amp; Admin CMS.
      </div>
    </>
  );
}
