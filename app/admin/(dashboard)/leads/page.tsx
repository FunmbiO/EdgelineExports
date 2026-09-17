import Link from "next/link";
import { getLeads } from "@/lib/leads";
import LeadRow from "@/components/admin/LeadRow";
import type { LeadStatus } from "@/types/lead";

export const dynamic = "force-dynamic";

const STATUS_TABS: { value?: LeadStatus; label: string }[] = [
  { value: undefined, label: "All" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "active", label: "Active" },
  { value: "closed", label: "Closed" },
];

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const activeStatus = STATUS_TABS.find((t) => t.value === searchParams.status)?.value;
  const leads = await getLeads(activeStatus);

  return (
    <div>
      <h1 className="font-display text-3xl text-edgeline-white">Leads</h1>

      <div className="mt-6 flex flex-wrap gap-2">
        {STATUS_TABS.map((tab) => (
          <Link
            key={tab.label}
            href={tab.value ? `/admin/leads?status=${tab.value}` : "/admin/leads"}
            className={`px-4 py-2 font-condensed text-sm uppercase tracking-wider ${
              activeStatus === tab.value
                ? "bg-edgeline-red text-edgeline-white"
                : "border border-edgeline-border text-edgeline-white/70 hover:border-edgeline-red hover:text-edgeline-red"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <div className="mt-8 overflow-x-auto border border-edgeline-border">
        <table className="w-full text-left">
          <thead className="border-b border-edgeline-border">
            <tr className="font-condensed text-xs uppercase tracking-wider text-edgeline-white/50">
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Notes</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center font-body text-edgeline-white/50">
                  No leads yet.
                </td>
              </tr>
            )}
            {leads.map((lead) => (
              <LeadRow key={lead.id} lead={lead} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
