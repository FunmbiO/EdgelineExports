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
import { getDictionary, type Locale } from "@/lib/i18n/dictionary";

export default function SellYourCarForm({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const interestOptions = INTEREST_OPTIONS.map((o) => ({ ...o, label: t.interestOptions[o.value] }));
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
        throw new Error(typeof json.error === "string" ? json.error : t.forms.somethingWentWrong);
      }
      setReference(json.reference);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : t.forms.somethingWentWrong);
    }
  };

  if (reference) {
    return (
      <SuccessState reference={reference} message={t.forms.sellSuccessMessage} locale={locale} />
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 border border-theme-border bg-card p-8 md:p-12"
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
        <FormField label={t.forms.fullName} registration={register("name")} error={errors.name?.message} />
        <FormField
          label={t.forms.email}
          type="email"
          registration={register("email")}
          error={errors.email?.message}
        />
        <FormField
          label={t.forms.makeModel}
          placeholder={t.forms.makeModelPlaceholder}
          registration={register("makeModel")}
          error={errors.makeModel?.message}
        />
        <FormField
          label={t.forms.year}
          placeholder={t.forms.yearPlaceholder}
          registration={register("year")}
          error={errors.year?.message}
        />
        <FormField
          label={t.forms.mileage}
          placeholder={t.forms.mileagePlaceholderSell}
          registration={register("mileage")}
          error={errors.mileage?.message}
        />
        <FormSelect
          label={t.forms.interestedIn}
          options={interestOptions}
          registration={register("interest")}
          error={errors.interest?.message}
        />
      </div>

      <FormTextarea
        label={t.forms.details}
        placeholder={t.forms.detailsPlaceholder}
        registration={register("details")}
        error={errors.details?.message}
      />

      {submitError && <p className="text-sm text-edgeline-red">{submitError}</p>}

      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="w-full bg-edgeline-red px-8 py-4 font-condensed text-sm uppercase tracking-wider text-edgeline-white transition-colors hover:bg-edgeline-red-dark disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
      >
        {isSubmitting ? t.forms.submitting : t.forms.submitDetails}
      </button>
    </form>
  );
}
