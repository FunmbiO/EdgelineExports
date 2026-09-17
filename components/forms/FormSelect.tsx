import type { UseFormRegisterReturn } from "react-hook-form";

export default function FormSelect({
  label,
  options,
  registration,
  error,
}: {
  label: string;
  options: readonly { value: string; label: string }[];
  registration: UseFormRegisterReturn;
  error?: string;
}) {
  return (
    <div>
      <label
        htmlFor={registration.name}
        className="block font-condensed text-xs uppercase tracking-wider text-edgeline-white/70"
      >
        {label}
      </label>
      <select
        id={registration.name}
        {...registration}
        className="mt-2 w-full border border-edgeline-border bg-edgeline-black px-4 py-3 font-body text-edgeline-white focus:border-edgeline-red focus:outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-edgeline-red">{error}</p>}
    </div>
  );
}
