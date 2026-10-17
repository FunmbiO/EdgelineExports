import type { UseFormRegisterReturn } from "react-hook-form";

export default function FormField({
  label,
  registration,
  error,
  type = "text",
  placeholder,
}: {
  label: string;
  registration: UseFormRegisterReturn;
  error?: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={registration.name}
        className="block font-condensed text-xs uppercase tracking-wider text-card-foreground/70"
      >
        {label}
      </label>
      <input
        id={registration.name}
        type={type}
        placeholder={placeholder}
        {...registration}
        className="mt-2 w-full border border-theme-border bg-card px-4 py-3 font-body text-card-foreground placeholder:text-card-foreground/30 focus:border-edgeline-red focus:outline-none"
      />
      {error && <p className="mt-1 text-xs text-edgeline-red">{error}</p>}
    </div>
  );
}
