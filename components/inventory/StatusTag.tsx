import type { Vehicle } from "@/types/vehicle";

export function getStatusTag(vehicle: Pick<Vehicle, "status" | "badge">) {
  if (vehicle.status === "sold") return { label: "Sold", tone: "muted" as const };
  if (vehicle.status === "reserved") return { label: "Reserved", tone: "muted" as const };
  if (vehicle.badge) return { label: vehicle.badge, tone: "accent" as const };
  return null;
}

export default function StatusTag({ vehicle }: { vehicle: Pick<Vehicle, "status" | "badge"> }) {
  const tag = getStatusTag(vehicle);
  if (!tag) return null;

  return (
    <span
      className={`absolute left-3 top-3 px-3 py-1 font-condensed text-xs uppercase tracking-wider ${
        tag.tone === "accent"
          ? "bg-edgeline-red text-edgeline-white"
          : "bg-edgeline-black/80 text-edgeline-white/90"
      }`}
    >
      {tag.label}
    </span>
  );
}
