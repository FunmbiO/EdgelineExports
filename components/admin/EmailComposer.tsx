"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const inputClass =
  "mt-2 w-full border border-edgeline-border bg-edgeline-black px-4 py-3 font-body text-edgeline-white placeholder:text-edgeline-white/30 focus:border-edgeline-red focus:outline-none";
const labelClass = "block font-condensed text-xs uppercase tracking-wider text-edgeline-white/70";

export default function EmailComposer() {
  const router = useRouter();
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, subject, message }),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(typeof json.error === "string" ? json.error : "Failed to send.");
      }

      setSuccess(true);
      setTo("");
      setSubject("");
      setMessage("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6 border border-edgeline-border bg-edgeline-black p-4 sm:p-8">
      <div>
        <label className={labelClass} htmlFor="to">
          Client Email
        </label>
        <input
          id="to"
          type="email"
          required
          placeholder="client@example.com"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="subject">
          Subject
        </label>
        <input
          id="subject"
          required
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={8}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputClass} resize-none`}
        />
      </div>

      {error && <p className="text-sm text-edgeline-red">{error}</p>}
      {success && (
        <p className="font-condensed text-xs uppercase tracking-wider text-edgeline-white/70">
          Email sent.
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-edgeline-red px-8 py-4 font-condensed text-sm uppercase tracking-wider text-edgeline-white transition-colors hover:bg-edgeline-red-dark disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isSubmitting ? "Sending..." : "Send Email"}
      </button>
    </form>
  );
}
