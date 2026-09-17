const STATS = [
  { value: "340+", label: "Cars Sold" },
  { value: "98%", label: "Satisfaction" },
  { value: "14 Day", label: "Avg. Turnaround" },
  { value: "$52M", label: "Volume" },
];

export default function StatsBar() {
  return (
    <section className="border-b border-edgeline-border bg-edgeline-black">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-edgeline-border px-4 md:grid-cols-4 md:px-8">
        {STATS.map((stat) => (
          <div key={stat.label} className="px-4 py-10 text-center first:pl-0 last:pr-0">
            <p className="font-display text-4xl text-edgeline-white md:text-5xl">
              <span className="text-edgeline-red">{stat.value.slice(0, 1)}</span>
              {stat.value.slice(1)}
            </p>
            <p className="mt-2 font-condensed text-xs uppercase tracking-wider text-edgeline-white/60">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
