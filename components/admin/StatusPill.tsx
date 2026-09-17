const COLORS: Record<string, string> = {
  draft: "bg-edgeline-white/10 text-edgeline-white/60",
  available: "bg-edgeline-red/20 text-edgeline-red",
  reserved: "bg-yellow-500/20 text-yellow-500",
  sold: "bg-edgeline-white/10 text-edgeline-white/40",
};

export default function StatusPill({ status }: { status: string }) {
  return (
    <span
      className={`inline-block px-2 py-1 font-condensed text-xs uppercase tracking-wider ${COLORS[status] ?? ""}`}
    >
      {status}
    </span>
  );
}
