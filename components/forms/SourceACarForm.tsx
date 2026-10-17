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
import { getDictionary, type Locale } from "@/lib/i18n/dictionary";

export default function SourceACarForm({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const budgetOptions = BUDGET_OPTIONS.map((o) => ({ ...o, label: t.budgetOptions[o.value] }));
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
        throw new Error(typeof json.error === "string" ? json.error : t.forms.somethingWentWrong);
      }
      setReference(json.reference);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : t.forms.somethingWentWrong);
    }
  };

  if (reference) {
    return (
      <SuccessState reference={reference} message={t.forms.sourceSuccessMessage} locale={locale} />
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-10 border border-theme-border bg-card p-8 md:p-12"
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
          {t.forms.yourDetails}
        </h3>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          <FormField label={t.forms.fullName} registration={register("name")} error={errors.name?.message} />
          <FormField
            label={t.forms.email}
            type="email"
            registration={register("email")}
            error={errors.email?.message}
          />
          <FormField label={t.forms.phone} type="tel" registration={register("phone")} error={errors.phone?.message} />
          <FormField label={t.forms.location} registration={register("location")} error={errors.location?.message} />
        </div>
      </div>

      <div>
        <h3 className="font-condensed text-sm uppercase tracking-wider text-edgeline-red">
          {t.forms.vehicleDetails}
        </h3>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          <FormField label={t.forms.make} registration={register("make")} error={errors.make?.message} />
          <FormField label={t.forms.model} registration={register("model")} error={errors.model?.message} />
          <FormField
            label={t.forms.yearRange}
            placeholder={t.forms.yearRangePlaceholder}
            registration={register("yearRange")}
            error={errors.yearRange?.message}
          />
          <FormSelect
            label={t.forms.budget}
            options={budgetOptions}
            registration={register("budget")}
            error={errors.budget?.message}
          />
          <FormField label={t.forms.color} registration={register("color")} error={errors.color?.message} />
          <FormField
            label={t.forms.mileage}
            placeholder={t.forms.mileagePlaceholderSource}
            registration={register("mileage")}
            error={errors.mileage?.message}
          />
        </div>
        <div className="mt-6">
          <FormTextarea
            label={t.forms.mustHaveOptions}
            placeholder={t.forms.mustHaveOptionsPlaceholder}
            registration={register("options")}
            error={errors.options?.message}
          />
        </div>
        <div className="mt-6">
          <FormTextarea label={t.forms.additionalNotes} registration={register("notes")} error={errors.notes?.message} />
        </div>
      </div>

      {submitError && <p className="text-sm text-edgeline-red">{submitError}</p>}

      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="w-full bg-edgeline-red px-8 py-4 font-condensed text-sm uppercase tracking-wider text-edgeline-white transition-colors hover:bg-edgeline-red-dark disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
      >
        {isSubmitting ? t.forms.submitting : t.forms.submitRequest}
      </button>
    </form>
  );
}
