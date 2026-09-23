import Link from "next/link";
import { getLeads, getLeadStatusCounts } from "@/lib/leads";
import LeadRow from "@/components/admin/LeadRow";
import type { LeadStatus } from "@/types/lead";

export const dynamic = "force-dynamic";

const STATUS_TABS: { value?: LeadStatus; label: string; countKey: "all" | LeadStatus }[] = [
  { value: undefined, label: "All", countKey: "all" },
  { value: "new", label: "New", countKey: "new" },
  { value: "contacted", label: "Contacted", countKey: "contacted" },
  { value: "active", label: "Active", countKey: "active" },
  { value: "closed", label: "Closed", countKey: "closed" },
];

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const activeStatus = STATUS_TABS.find((t) => t.value === searchParams.status)?.value;
  const [leads, counts] = await Promise.all([getLeads(activeStatus), getLeadStatusCounts()]);

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="font-display text-3xl text-edgeline-white">Leads</h1>
        <p className="font-body text-sm text-edgeline-white/50">
          {counts.all} total · {counts.new} awaiting first contact
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {(
          [
            { label: "New", value: counts.new },
            { label: "Contacted", value: counts.contacted },
            { label: "Active", value: counts.active },
            { label: "Closed", value: counts.closed },
          ] as const
        ).map((stat) => (
          <div key={stat.label} className="border border-edgeline-border bg-edgeline-black p-4">
            <p className="font-display text-2xl text-edgeline-white">{stat.value}</p>
            <p className="mt-1 font-condensed text-xs uppercase tracking-wider text-edgeline-white/50">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {STATUS_TABS.map((tab) => (
          <Link
            key={tab.label}
            href={tab.value ? `/admin/leads?status=${tab.value}` : "/admin/leads"}
            className={`px-4 py-2 font-condensed text-sm uppercase tracking-wider transition-colors ${
              activeStatus === tab.value
                ? "bg-edgeline-red text-edgeline-white"
                : "border border-edgeline-border text-edgeline-white/70 hover:border-edgeline-red hover:text-edgeline-red"
            }`}
          >
            {tab.label} <span className="opacity-60">({counts[tab.countKey]})</span>
          </Link>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto border border-edgeline-border">
        <table className="w-full text-left">
          <thead className="border-b border-edgeline-border">
            <tr className="font-condensed text-xs uppercase tracking-wider text-edgeline-white/50">
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Internal Notes</th>
              <th className="px-4 py-3">Received</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center font-body text-edgeline-white/50">
                  {activeStatus
                    ? `No ${activeStatus} leads right now.`
                    : "No leads yet — they'll show up here as soon as someone submits a form."}
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
