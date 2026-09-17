const SIGNALS = [
  {
    title: "Inspection Report",
    description: "Every vehicle passes a multi-point inspection before it's listed.",
  },
  {
    title: "Verified History",
    description: "Full title and accident history checked and documented.",
  },
  {
    title: "Nationwide Delivery",
    description: "Enclosed transport to your door, anywhere in the country.",
  },
];

export default function TrustSignals() {
  return (
    <div className="grid gap-5 sm:grid-cols-3">
      {SIGNALS.map((signal) => (
        <div key={signal.title} className="edge-accent-left border border-edgeline-border bg-edgeline-black p-6">
          <h3 className="font-condensed text-sm uppercase tracking-wider text-edgeline-white">
            {signal.title}
          </h3>
          <p className="mt-2 font-body text-sm text-edgeline-white/60">{signal.description}</p>
        </div>
      ))}
    </div>
  );
}
