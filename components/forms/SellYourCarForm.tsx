"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  sellRequestSchema,
  INTEREST_OPTIONS,
  type SellRequestInput,
} from "@/lib/validations/sell";
import FormField from "@/components/forms/FormField";
import FormTextarea from "@/components/forms/FormTextarea";
import FormSelect from "@/components/forms/FormSelect";
import SuccessState from "@/components/forms/SuccessState";

export default function SellYourCarForm() {
  const [reference, setReference] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SellRequestInput>({
    resolver: zodResolver(sellRequestSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: SellRequestInput) => {
    setSubmitError(null);
    try {
      const res = await fetch("/api/sell-request", {
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
        message="We'll be in touch within 24 hours with an offer or a consignment plan."
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 border border-edgeline-border bg-edgeline-black p-8 md:p-12"
    >
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        {...register("hpField")}
        className="hidden"
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField label="Full Name" registration={register("name")} error={errors.name?.message} />
        <FormField
          label="Email"
          type="email"
          registration={register("email")}
          error={errors.email?.message}
        />
        <FormField
          label="Make & Model"
          placeholder="e.g. Porsche 911 GT3"
          registration={register("makeModel")}
          error={errors.makeModel?.message}
        />
        <FormField label="Year" placeholder="e.g. 2023" registration={register("year")} error={errors.year?.message} />
        <FormField
          label="Mileage"
          placeholder="e.g. 12,000 mi"
          registration={register("mileage")}
          error={errors.mileage?.message}
        />
        <FormSelect
          label="I'm Interested In"
          options={INTEREST_OPTIONS}
          registration={register("interest")}
          error={errors.interest?.message}
        />
      </div>

      <FormTextarea
        label="Details"
        placeholder="Condition, modifications, service history..."
        registration={register("details")}
        error={errors.details?.message}
      />

      {submitError && <p className="text-sm text-edgeline-red">{submitError}</p>}

      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="w-full bg-edgeline-red px-8 py-4 font-condensed text-sm uppercase tracking-wider text-edgeline-white transition-colors hover:bg-edgeline-red-dark disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
      >
        {isSubmitting ? "Submitting..." : "Submit Details"}
      </button>
    </form>
  );
}
