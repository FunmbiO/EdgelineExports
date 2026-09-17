"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, SUBJECT_OPTIONS, type ContactInput } from "@/lib/validations/contact";
import FormField from "@/components/forms/FormField";
import FormTextarea from "@/components/forms/FormTextarea";
import FormSelect from "@/components/forms/FormSelect";
import SuccessState from "@/components/forms/SuccessState";

export default function ContactForm() {
  const [reference, setReference] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: ContactInput) => {
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(typeof json.error === "string" ? json.error : "Something went wrong. Please try again.");
      }
      setReference(json.reference ?? "EDG-000000");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  if (reference) {
    return (
      <SuccessState reference={reference} message="We typically respond within one business day." />
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 border border-edgeline-border bg-edgeline-black p-8"
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
      </div>

      <FormSelect
        label="Subject"
        options={SUBJECT_OPTIONS}
        registration={register("subject")}
        error={errors.subject?.message}
      />

      <FormTextarea
        label="Message"
        rows={5}
        registration={register("message")}
        error={errors.message?.message}
      />

      {submitError && <p className="text-sm text-edgeline-red">{submitError}</p>}

      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="w-full bg-edgeline-red px-8 py-4 font-condensed text-sm uppercase tracking-wider text-edgeline-white transition-colors hover:bg-edgeline-red-dark disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
