import { notFound } from "next/navigation";
import Link from "next/link";
import { getLeadById, getLatestSubmissionForLead } from "@/lib/leads";
import { getDisplayableSubmissionFields } from "@/lib/lead-fields";
import { formatRelativeTime } from "@/lib/format";
import LeadDetailForm from "@/components/admin/LeadDetailForm";

export const dynamic = "force-dynamic";

const SOURCE_LABELS: Record<string, string> = {
  sourcing: "Source a Car",
  sell: "Sell Your Car",
  contact: "Contact Form",
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const initials = parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "");
  return initials.join("") || "?";
}

export default async function AdminLeadDetailPage({ params }: { params: { id: string } }) {
  const lead = await getLeadById(params.id);
  if (!lead) notFound();

  const submission = await getLatestSubmissionForLead(lead.id);
  const fields = submission ? getDisplayableSubmissionFields(submission.payload) : [];

  return (
    <div>
      <Link
        href="/admin/leads"
        className="font-condensed text-xs uppercase tracking-wider text-edgeline-white/50 hover:text-edgeline-red"
      >
        ← Back to Leads
      </Link>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-6 border-b border-edgeline-border pb-8">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center border border-edgeline-red font-display text-2xl text-edgeline-red">
            {getInitials(lead.name)}
          </div>
          <div>
            <h1 className="font-display text-3xl text-edgeline-white">{lead.name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <span className="border border-edgeline-border px-3 py-1 font-condensed text-xs uppercase tracking-wider text-edgeline-white/60">
                {SOURCE_LABELS[lead.source] ?? lead.source}
              </span>
              <span className="font-body text-xs text-edgeline-white/40">
                Submitted {formatRelativeTime(lead.createdAt)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <a
            href={`mailto:${lead.email}`}
            className="border border-edgeline-white/30 px-5 py-3 font-condensed text-sm uppercase tracking-wider text-edgeline-white transition-colors hover:border-edgeline-red hover:text-edgeline-red"
          >
            Email
          </a>
          {lead.phone && (
            <a
              href={`tel:${lead.phone}`}
              className="border border-edgeline-white/30 px-5 py-3 font-condensed text-sm uppercase tracking-wider text-edgeline-white transition-colors hover:border-edgeline-red hover:text-edgeline-red"
            >
              Call
            </a>
          )}
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="edge-accent-left border border-edgeline-border bg-edgeline-black p-6">
            <h2 className="font-condensed text-sm uppercase tracking-wider text-edgeline-red">Contact</h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="font-condensed text-xs uppercase tracking-wider text-edgeline-white/50">
                  Email
                </dt>
                <dd className="mt-1 font-body text-sm text-edgeline-white">{lead.email}</dd>
              </div>
              {lead.phone && (
                <div>
                  <dt className="font-condensed text-xs uppercase tracking-wider text-edgeline-white/50">
                    Phone
                  </dt>
                  <dd className="mt-1 font-body text-sm text-edgeline-white">{lead.phone}</dd>
                </div>
              )}
            </dl>

            {fields.length > 0 ? (
              <>
                <h2 className="mt-8 font-condensed text-sm uppercase tracking-wider text-edgeline-red">
                  Submission Details
                </h2>
                <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                  {fields.map((field) => (
                    <div key={field.label} className={field.multiline ? "sm:col-span-2" : undefined}>
                      <dt className="font-condensed text-xs uppercase tracking-wider text-edgeline-white/50">
                        {field.label}
                      </dt>
                      <dd className="mt-1 font-body text-sm text-edgeline-white">{field.value}</dd>
                    </div>
                  ))}
                </dl>
              </>
            ) : (
              <p className="mt-8 font-body text-sm text-edgeline-white/50">
                No submission details on file for this lead.
              </p>
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          <LeadDetailForm lead={lead} />
        </div>
      </div>
    </div>
  );
}
