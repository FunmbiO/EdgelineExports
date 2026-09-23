"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Lead, LeadStatus } from "@/types/lead";
import { SOURCE_LABELS, SOURCE_BADGE_CLASS } from "@/lib/lead-fields";
import { STATUS_OPTIONS, STATUS_SELECTED_CLASS } from "@/lib/lead-status";
import { getInitials, formatRelativeTime } from "@/lib/format";

export default function LeadRow({ lead }: { lead: Lead }) {
  const router = useRouter();
  const [status, setStatus] = useState(lead.status);
  const [notes, setNotes] = useState(lead.notes ?? "");
  const [isSavingStatus, setIsSavingStatus] = useState(false);
  const [isSavingNotes, setIsSavingNotes] = useState(false);

  const save = async (patch: Partial<{ status: LeadStatus; notes: string }>) => {
    await fetch(`/api/admin/leads/${lead.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    router.refresh();
  };

  return (
    <tr className="border-b border-edgeline-border align-top transition-colors last:border-0 hover:bg-edgeline-white/[0.03]">
      <td className="px-4 py-3">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-edgeline-red/40 font-display text-xs text-edgeline-red">
            {getInitials(lead.name)}
          </div>
          <div>
            <Link
              href={`/admin/leads/${lead.id}`}
              className="font-body text-edgeline-white hover:text-edgeline-red"
            >
              {lead.name}
            </Link>
            <p className="text-xs text-edgeline-white/50">{lead.email}</p>
            {lead.phone && <p className="text-xs text-edgeline-white/50">{lead.phone}</p>}
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <span
          className={`inline-block whitespace-nowrap border px-2.5 py-1 font-condensed text-xs uppercase tracking-wider ${
            SOURCE_BADGE_CLASS[lead.source] ?? "border-edgeline-white/30 text-edgeline-white/70"
          }`}
        >
          {SOURCE_LABELS[lead.source] ?? lead.source}
        </span>
      </td>
      <td className="px-4 py-3">
        <div
          className={`inline-flex items-center border px-2.5 py-1.5 transition-opacity ${
            STATUS_SELECTED_CLASS[status]
          } ${isSavingStatus ? "opacity-60" : ""}`}
        >
          <select
            value={status}
            onChange={(e) => {
              const next = e.target.value as LeadStatus;
              setStatus(next);
              setIsSavingStatus(true);
              save({ status: next }).finally(() => setIsSavingStatus(false));
            }}
            disabled={isSavingStatus}
            className="bg-transparent font-condensed text-xs uppercase tracking-wider focus:outline-none disabled:cursor-not-allowed [&>option]:bg-edgeline-black [&>option]:text-edgeline-white"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </td>
      <td className="px-4 py-3">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          onBlur={() => {
            setIsSavingNotes(true);
            save({ notes }).finally(() => setIsSavingNotes(false));
          }}
          rows={2}
          placeholder="Add a note..."
          disabled={isSavingNotes}
          className="w-full min-w-[10rem] resize-none border border-edgeline-border bg-edgeline-black px-2 py-1.5 font-body text-xs text-edgeline-white placeholder:text-edgeline-white/30 focus:border-edgeline-red focus:outline-none disabled:opacity-60"
        />
      </td>
      <td className="px-4 py-3 font-body text-xs text-edgeline-white/50">
        {formatRelativeTime(lead.createdAt)}
      </td>
      <td className="px-4 py-3">
        {status === "closed" ? (
          <span className="font-condensed text-xs uppercase tracking-wider text-edgeline-white/30">
            Closed
          </span>
        ) : (
          <button
            type="button"
            onClick={() => {
              setStatus("closed");
              setIsSavingStatus(true);
              save({ status: "closed" }).finally(() => setIsSavingStatus(false));
            }}
            disabled={isSavingStatus}
            className="border border-edgeline-white/30 px-3 py-1.5 font-condensed text-xs uppercase tracking-wider text-edgeline-white/70 transition-colors hover:border-edgeline-red hover:text-edgeline-red disabled:cursor-not-allowed disabled:opacity-40"
          >
            Close
          </button>
        )}
      </td>
    </tr>
  );
}
