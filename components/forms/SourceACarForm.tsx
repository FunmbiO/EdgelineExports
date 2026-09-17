"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  sourcingRequestSchema,
  BUDGET_OPTIONS,
  type SourcingRequestInput,
} from "@/lib/validations/sourcing";
import FormField from "@/components/forms/FormField";
import FormTextarea from "@/components/forms/FormTextarea";
import FormSelect from "@/components/forms/FormSelect";
import SuccessState from "@/components/forms/SuccessState";

export default function SourceACarForm() {
  const [reference, setReference] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SourcingRequestInput>({
    resolver: zodResolver(sourcingRequestSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: SourcingRequestInput) => {
    setSubmitError(null);
    try {
      const res = await fetch("/api/sourcing-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(typeof json.error === "string" ? json.error : "Something went wrong. Please try again.");
      }
      setReference(json.reference);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  if (reference) {
    return (
      <SuccessState
        reference={reference}
        message="We'll be in touch within 24 hours to talk through what you're looking for."
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-10 border border-edgeline-border bg-edgeline-black p-8 md:p-12"
    >
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        {...register("hpField")}
        className="hidden"
      />

      <div>
        <h3 className="font-condensed text-sm uppercase tracking-wider text-edgeline-red">
          Your Details
        </h3>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          <FormField label="Full Name" registration={register("name")} error={errors.name?.message} />
          <FormField
            label="Email"
            type="email"
            registration={register("email")}
            error={errors.email?.message}
          />
          <FormField label="Phone" type="tel" registration={register("phone")} error={errors.phone?.message} />
          <FormField label="Location" registration={register("location")} error={errors.location?.message} />
        </div>
      </div>

      <div>
        <h3 className="font-condensed text-sm uppercase tracking-wider text-edgeline-red">
          Vehicle Details
        </h3>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          <FormField label="Make" registration={register("make")} error={errors.make?.message} />
          <FormField label="Model" registration={register("model")} error={errors.model?.message} />
          <FormField
            label="Year Range"
            placeholder="e.g. 2020–2023"
            registration={register("yearRange")}
            error={errors.yearRange?.message}
          />
          <FormSelect
            label="Budget"
            options={BUDGET_OPTIONS}
            registration={register("budget")}
            error={errors.budget?.message}
          />
          <FormField label="Color" registration={register("color")} error={errors.color?.message} />
          <FormField
            label="Mileage"
            placeholder="e.g. under 20,000 mi"
            registration={register("mileage")}
            error={errors.mileage?.message}
          />
        </div>
        <div className="mt-6">
          <FormTextarea
            label="Must-Have Options"
            placeholder="Trim, packages, features..."
            registration={register("options")}
            error={errors.options?.message}
          />
        </div>
        <div className="mt-6">
          <FormTextarea label="Additional Notes" registration={register("notes")} error={errors.notes?.message} />
        </div>
      </div>

      {submitError && <p className="text-sm text-edgeline-red">{submitError}</p>}

      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="w-full bg-edgeline-red px-8 py-4 font-condensed text-sm uppercase tracking-wider text-edgeline-white transition-colors hover:bg-edgeline-red-dark disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
      >
        {isSubmitting ? "Submitting..." : "Submit Request"}
      </button>
    </form>
  );
}
