import { notFound } from "next/navigation";
import Link from "next/link";
import { getLeadById, getLatestSubmissionForLead } from "@/lib/leads";
import { getDisplayableSubmissionFields } from "@/lib/lead-fields";
import LeadDetailForm from "@/components/admin/LeadDetailForm";

export const dynamic = "force-dynamic";

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

      <h1 className="mt-4 font-display text-3xl text-edgeline-white">{lead.name}</h1>
      <p className="mt-1 font-condensed text-xs uppercase tracking-wider text-edgeline-white/50">
        {lead.source} lead · {new Date(lead.createdAt).toLocaleString()}
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="border border-edgeline-border p-6">
          <h2 className="font-condensed text-sm uppercase tracking-wider text-edgeline-red">Contact</h2>
          <dl className="mt-4 space-y-1 font-body text-sm text-edgeline-white/80">
            <div>
              <dt className="inline text-edgeline-white/50">Email: </dt>
              <dd className="inline">{lead.email}</dd>
            </div>
            {lead.phone && (
              <div>
                <dt className="inline text-edgeline-white/50">Phone: </dt>
                <dd className="inline">{lead.phone}</dd>
              </div>
            )}
          </dl>

          {fields.length > 0 ? (
            <>
              <h2 className="mt-8 font-condensed text-sm uppercase tracking-wider text-edgeline-red">
                Submission Details
              </h2>
              <dl className="mt-4 space-y-3">
                {fields.map((field) => (
                  <div key={field.label}>
                    <dt className="font-condensed text-xs uppercase tracking-wider text-edgeline-white/50">
                      {field.label}
                    </dt>
                    <dd className="mt-0.5 font-body text-sm text-edgeline-white/90">{field.value}</dd>
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

        <LeadDetailForm lead={lead} />
      </div>
    </div>
  );
}
