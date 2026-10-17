import type { UseFormRegisterReturn } from "react-hook-form";

export default function FormTextarea({
  label,
  registration,
  error,
  placeholder,
  rows = 4,
}: {
  label: string;
  registration: UseFormRegisterReturn;
  error?: string;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div>
      <label
        htmlFor={registration.name}
        className="block font-condensed text-xs uppercase tracking-wider text-card-foreground/70"
      >
        {label}
      </label>
      <textarea
        id={registration.name}
        rows={rows}
        placeholder={placeholder}
        {...registration}
        className="mt-2 w-full resize-none border border-theme-border bg-card px-4 py-3 font-body text-card-foreground placeholder:text-card-foreground/30 focus:border-edgeline-red focus:outline-none"
      />
      {error && <p className="mt-1 text-xs text-edgeline-red">{error}</p>}
    </div>
  );
}
