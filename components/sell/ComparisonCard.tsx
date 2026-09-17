export default function ComparisonCard({
  title,
  description,
  steps,
}: {
  title: string;
  description: string;
  steps: string[];
}) {
  return (
    <div className="flex flex-col border border-edgeline-border bg-edgeline-black p-8">
      <h3 className="font-display text-3xl text-edgeline-white">{title}</h3>
      <p className="mt-2 font-body text-edgeline-white/60">{description}</p>

      <ol className="mt-8 space-y-6">
        {steps.map((step, index) => (
          <li key={step} className="flex gap-4">
            <span className="font-display text-2xl text-edgeline-red">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-body text-edgeline-white/80">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
