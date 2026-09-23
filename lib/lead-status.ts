import type { LeadStatus } from "@/types/lead";

export const STATUS_OPTIONS: { value: LeadStatus; label: string }[] = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "active", label: "Active" },
  { value: "closed", label: "Closed" },
];

// Filled/faded pill styling per status — "new" reads as most urgent (solid
// red), "closed" fades out, so the list is scannable by color alone.
export const STATUS_SELECTED_CLASS: Record<LeadStatus, string> = {
  new: "bg-edgeline-red text-edgeline-white border-edgeline-red",
  contacted: "bg-edgeline-white/10 text-edgeline-white border-edgeline-white/50",
  active: "bg-edgeline-white text-edgeline-black border-edgeline-white",
  closed: "bg-edgeline-white/5 text-edgeline-white/60 border-edgeline-white/30",
};

export const STATUS_UNSELECTED_CLASS =
  "bg-transparent text-edgeline-white/50 border-edgeline-white/20 hover:border-edgeline-white/50 hover:text-edgeline-white/80";
