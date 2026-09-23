"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/format";

const STORAGE_KEY = "edgeline-inquirer";

interface ReportVehicle {
  slug: string;
  year: number;
  make: string;
  model: string;
  price: number;
}

export default function ReportRequestModal({ vehicle }: { vehicle: ReportVehicle }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hpField, setHpField] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);

  // Same stand-in as the Inquire Now modal — no customer accounts, so
  // name/email/phone are remembered locally after a first submission.
  useEffect(() => {
    if (!isOpen) return;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as { name?: string; email?: string; phone?: string };
        if (parsed.name) setName(parsed.name);
        if (parsed.email) setEmail(parsed.email);
        if (parsed.phone) setPhone(parsed.phone);
      }
    } catch {
      // localStorage unavailable (private browsing, etc.) — just skip prefill.
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const close = () => {
    setIsOpen(false);
    setError(null);
    setReference(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/report-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, vehicleSlug: vehicle.slug, hpField }),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(
          typeof json.error === "string" ? json.error : "Something went wrong. Please try again.",
        );
      }

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ name, email, phone }));
      } catch {
        // ignore — not critical if this fails
      }

      setReference(json.reference ?? "EDG-000000");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-block border border-edgeline-white/30 px-8 py-4 text-center font-condensed text-sm uppercase tracking-wider text-edgeline-white transition-colors hover:border-edgeline-red hover:text-edgeline-red"
      >
        Request Report
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="report-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          onClick={close}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md border border-edgeline-border bg-edgeline-black p-8"
          >
            {reference ? (
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-edgeline-red">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    className="h-7 w-7 text-edgeline-red"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mt-4 font-display text-2xl text-edgeline-white">Request Sent</h3>
                <p className="mt-2 font-body text-sm text-edgeline-white/70">
                  You&apos;ll hear back soon.
                </p>
                <p className="mt-4 font-condensed text-xs uppercase tracking-wider text-edgeline-white/50">
                  Reference: <span className="text-edgeline-red">{reference}</span>
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="mt-6 border border-edgeline-white/30 px-6 py-3 font-condensed text-sm uppercase tracking-wider text-edgeline-white transition-colors hover:border-edgeline-red hover:text-edgeline-red"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="flex items-start justify-between">
                  <h3 id="report-modal-title" className="font-display text-2xl text-edgeline-white">
                    Confirm Report Request
                  </h3>
                  <button
                    type="button"
                    onClick={close}
                    aria-label="Close"
                    className="text-edgeline-white/50 hover:text-edgeline-red"
                  >
                    ✕
                  </button>
                </div>

                <div className="mt-4 border border-edgeline-border p-4">
                  <p className="font-condensed text-xs uppercase tracking-wider text-edgeline-white/50">
                    Vehicle
                  </p>
                  <p className="mt-1 font-body text-edgeline-white">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </p>
                  <p className="mt-1 font-display text-lg text-edgeline-red">
                    {formatPrice(vehicle.price)}
                  </p>
                </div>

                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={hpField}
                  onChange={(e) => setHpField(e.target.value)}
                  className="hidden"
                />

                <div className="mt-6">
                  <label
                    htmlFor="report-name"
                    className="block font-condensed text-xs uppercase tracking-wider text-edgeline-white/70"
                  >
                    Full Name
                  </label>
                  <input
                    id="report-name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 w-full border border-edgeline-border bg-edgeline-black px-4 py-3 font-body text-edgeline-white focus:border-edgeline-red focus:outline-none"
                  />
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="report-email"
                    className="block font-condensed text-xs uppercase tracking-wider text-edgeline-white/70"
                  >
                    Email
                  </label>
                  <input
                    id="report-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 w-full border border-edgeline-border bg-edgeline-black px-4 py-3 font-body text-edgeline-white focus:border-edgeline-red focus:outline-none"
                  />
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="report-phone"
                    className="block font-condensed text-xs uppercase tracking-wider text-edgeline-white/70"
                  >
                    Phone <span className="text-edgeline-white/40">(optional)</span>
                  </label>
                  <input
                    id="report-phone"
                    type="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-2 w-full border border-edgeline-border bg-edgeline-black px-4 py-3 font-body text-edgeline-white focus:border-edgeline-red focus:outline-none"
                  />
                </div>

                {error && <p className="mt-4 text-sm text-edgeline-red">{error}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-6 w-full bg-edgeline-red px-8 py-4 font-condensed text-sm uppercase tracking-wider text-edgeline-white transition-colors hover:bg-edgeline-red-dark disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {isSubmitting ? "Sending..." : "Confirm Details"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
