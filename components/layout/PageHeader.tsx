export default function PageHeader({
  label,
  title,
  subtitle,
}: {
  label: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="border-b border-theme-border bg-surface px-4 py-16 text-center md:px-8 md:py-24">
      <p className="font-condensed text-sm uppercase tracking-[0.3em] text-edgeline-red">
        {label}
      </p>
      <h1 className="mt-3 font-heading text-5xl text-surface-foreground md:text-6xl">{title}</h1>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-xl font-body text-surface-foreground/60">{subtitle}</p>
      )}
    </div>
  );
}
