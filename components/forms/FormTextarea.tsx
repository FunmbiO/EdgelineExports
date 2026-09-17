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
        className="block font-condensed text-xs uppercase tracking-wider text-edgeline-white/70"
      >
        {label}
      </label>
      <textarea
        id={registration.name}
        rows={rows}
        placeholder={placeholder}
        {...registration}
        className="mt-2 w-full resize-none border border-edgeline-border bg-edgeline-black px-4 py-3 font-body text-edgeline-white placeholder:text-edgeline-white/30 focus:border-edgeline-red focus:outline-none"
      />
      {error && <p className="mt-1 text-xs text-edgeline-red">{error}</p>}
    </div>
  );
}
