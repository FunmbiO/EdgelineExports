"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Lead, LeadStatus } from "@/types/lead";

const STATUS_OPTIONS: { value: LeadStatus; label: string }[] = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "active", label: "Active" },
  { value: "closed", label: "Closed" },
];

const STATUS_SELECTED_CLASS: Record<LeadStatus, string> = {
  new: "bg-edgeline-red text-edgeline-white border-edgeline-red",
  contacted: "bg-edgeline-white/10 text-edgeline-white border-edgeline-white/50",
  active: "bg-edgeline-white text-edgeline-black border-edgeline-white",
  closed: "bg-edgeline-white/5 text-edgeline-white/60 border-edgeline-white/30",
};

const STATUS_UNSELECTED_CLASS =
  "bg-transparent text-edgeline-white/50 border-edgeline-white/20 hover:border-edgeline-white/50 hover:text-edgeline-white/80";

export default function LeadDetailForm({ lead }: { lead: Lead }) {
  const router = useRouter();
  const [status, setStatus] = useState(lead.status);
  const [notes, setNotes] = useState(lead.notes ?? "");
  const [isSavingStatus, setIsSavingStatus] = useState(false);
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [notesSaved, setNotesSaved] = useState(false);

  const handleStatusChange = async (next: LeadStatus) => {
    setStatus(next);
    setIsSavingStatus(true);
    await fetch(`/api/admin/leads/${lead.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    setIsSavingStatus(false);
    router.refresh();
  };

  const handleSaveNotes = async () => {
    setIsSavingNotes(true);
    setNotesSaved(false);
    await fetch(`/api/admin/leads/${lead.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes }),
    });
    setIsSavingNotes(false);
    setNotesSaved(true);
    router.refresh();
  };

  return (
    <div className="border border-edgeline-border bg-edgeline-black p-6">
      <h2 className="font-condensed text-sm uppercase tracking-wider text-edgeline-red">Status</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => handleStatusChange(opt.value)}
            disabled={isSavingStatus}
            className={`border px-4 py-2 font-condensed text-xs uppercase tracking-wider transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
              status === opt.value ? STATUS_SELECTED_CLASS[opt.value] : STATUS_UNSELECTED_CLASS
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <h2 className="mt-8 font-condensed text-sm uppercase tracking-wider text-edgeline-red">Notes</h2>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={7}
        placeholder="Internal notes about this lead..."
        className="mt-4 w-full resize-none border border-edgeline-border bg-edgeline-black px-4 py-3 font-body text-sm text-edgeline-white placeholder:text-edgeline-white/30 focus:border-edgeline-red focus:outline-none"
      />

      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={handleSaveNotes}
          disabled={isSavingNotes}
          className="bg-edgeline-red px-6 py-3 font-condensed text-sm uppercase tracking-wider text-edgeline-white transition-colors hover:bg-edgeline-red-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isSavingNotes ? "Saving..." : "Save Notes"}
        </button>
        {notesSaved && (
          <span className="font-condensed text-xs uppercase tracking-wider text-edgeline-white/50">
            Saved
          </span>
        )}
      </div>
    </div>
  );
}
