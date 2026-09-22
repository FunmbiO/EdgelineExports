"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Lead, LeadStatus } from "@/types/lead";

const STATUS_OPTIONS: LeadStatus[] = ["new", "contacted", "active", "closed"];

export default function LeadRow({ lead }: { lead: Lead }) {
  const router = useRouter();
  const [status, setStatus] = useState(lead.status);
  const [notes, setNotes] = useState(lead.notes ?? "");
  const [isSaving, setIsSaving] = useState(false);

  const save = async (patch: Partial<{ status: LeadStatus; notes: string }>) => {
    setIsSaving(true);
    await fetch(`/api/admin/leads/${lead.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    setIsSaving(false);
    router.refresh();
  };

  return (
    <tr className="border-b border-edgeline-border align-top last:border-0">
      <td className="px-4 py-3 font-body text-edgeline-white">
        <Link href={`/admin/leads/${lead.id}`} className="hover:text-edgeline-red">
          {lead.name}
        </Link>
        <p className="text-xs text-edgeline-white/50">{lead.email}</p>
        {lead.phone && <p className="text-xs text-edgeline-white/50">{lead.phone}</p>}
      </td>
      <td className="px-4 py-3 font-condensed text-xs uppercase tracking-wider text-edgeline-white/60">
        {lead.source}
      </td>
      <td className="px-4 py-3">
        <select
          value={status}
          onChange={(e) => {
            const next = e.target.value as LeadStatus;
            setStatus(next);
            save({ status: next });
          }}
          disabled={isSaving}
          className="border border-edgeline-border bg-edgeline-black px-2 py-1 font-condensed text-xs uppercase tracking-wider text-edgeline-white"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </td>
      <td className="px-4 py-3">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          onBlur={() => save({ notes })}
          rows={2}
          className="w-full resize-none border border-edgeline-border bg-edgeline-black px-2 py-1 font-body text-xs text-edgeline-white"
        />
      </td>
      <td className="px-4 py-3 font-body text-xs text-edgeline-white/50">
        {new Date(lead.createdAt).toLocaleDateString()}
      </td>
    </tr>
  );
}
