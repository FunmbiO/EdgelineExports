"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Lead, LeadStatus } from "@/types/lead";

const STATUS_OPTIONS: LeadStatus[] = ["new", "contacted", "active", "closed"];

export default function LeadDetailForm({ lead }: { lead: Lead }) {
  const router = useRouter();
  const [status, setStatus] = useState(lead.status);
  const [notes, setNotes] = useState(lead.notes ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    setSaved(false);
    await fetch(`/api/admin/leads/${lead.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, notes }),
    });
    setIsSaving(false);
    setSaved(true);
    router.refresh();
  };

  return (
    <div className="border border-edgeline-border p-6">
      <h2 className="font-condensed text-sm uppercase tracking-wider text-edgeline-red">Manage Lead</h2>

      <div className="mt-4">
        <label
          htmlFor="status"
          className="block font-condensed text-xs uppercase tracking-wider text-edgeline-white/70"
        >
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as LeadStatus)}
          className="mt-2 w-full border border-edgeline-border bg-edgeline-black px-4 py-3 font-body text-edgeline-white focus:border-edgeline-red focus:outline-none"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6">
        <label
          htmlFor="notes"
          className="block font-condensed text-xs uppercase tracking-wider text-edgeline-white/70"
        >
          Notes
        </label>
        <textarea
          id="notes"
          rows={6}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="mt-2 w-full resize-none border border-edgeline-border bg-edgeline-black px-4 py-3 font-body text-edgeline-white focus:border-edgeline-red focus:outline-none"
        />
      </div>

      <button
        type="button"
        onClick={handleSave}
        disabled={isSaving}
        className="mt-6 bg-edgeline-red px-6 py-3 font-condensed text-sm uppercase tracking-wider text-edgeline-white transition-colors hover:bg-edgeline-red-dark disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isSaving ? "Saving..." : "Save Changes"}
      </button>
      {saved && <p className="mt-2 text-xs text-edgeline-white/50">Saved.</p>}
    </div>
  );
}
