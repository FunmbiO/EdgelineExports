"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AdminTestimonial } from "@/types/testimonial";

const inputClass =
  "mt-2 w-full border border-edgeline-border bg-edgeline-black px-4 py-3 font-body text-edgeline-white placeholder:text-edgeline-white/30 focus:border-edgeline-red focus:outline-none";
const labelClass = "block font-condensed text-xs uppercase tracking-wider text-edgeline-white/70";

export default function TestimonialForm({ testimonial }: { testimonial?: AdminTestimonial }) {
  const router = useRouter();
  const isEditing = Boolean(testimonial);

  const [name, setName] = useState(testimonial?.name ?? "");
  const [quote, setQuote] = useState(testimonial?.quote ?? "");
  const [location, setLocation] = useState(testimonial?.location ?? "");
  const [featured, setFeatured] = useState(testimonial?.featured ?? false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const payload = {
      name,
      quote,
      location: location || undefined,
      featured,
    };

    try {
      const res = await fetch(
        isEditing ? `/api/admin/testimonials/${testimonial!.id}` : "/api/admin/testimonials",
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const json = await res.json();
      if (!res.ok) {
        throw new Error(typeof json.error === "string" ? json.error : "Something went wrong.");
      }

      router.push("/admin/testimonials");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6 border border-edgeline-border bg-edgeline-black p-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">
            Client Name
          </label>
          <input
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="location">
            Location <span className="text-edgeline-white/40">(optional)</span>
          </label>
          <input
            id="location"
            placeholder="e.g. Austin, TX"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="quote">
          Quote
        </label>
        <textarea
          id="quote"
          required
          rows={4}
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          className={`${inputClass} resize-none`}
        />
      </div>

      <label className="flex items-center gap-3 font-body text-sm text-edgeline-white/80">
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
          className="h-4 w-4 accent-edgeline-red"
        />
        Show on the homepage &amp; About page
      </label>

      {error && <p className="text-sm text-edgeline-red">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-edgeline-red px-8 py-4 font-condensed text-sm uppercase tracking-wider text-edgeline-white transition-colors hover:bg-edgeline-red-dark disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isSubmitting ? "Saving..." : isEditing ? "Save Changes" : "Add Testimonial"}
      </button>
    </form>
  );
}
