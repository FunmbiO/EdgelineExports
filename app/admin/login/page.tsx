"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsSubmitting(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.push("/admin/inventory");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-edgeline-black px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm border border-edgeline-border bg-edgeline-black p-8"
      >
        <p className="font-display text-2xl text-edgeline-white">
          EDGELINE <span className="text-edgeline-red">EXPORTS</span>
        </p>
        <h1 className="mt-2 font-condensed text-sm uppercase tracking-wider text-edgeline-white/60">
          Admin Login
        </h1>

        <div className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block font-condensed text-xs uppercase tracking-wider text-edgeline-white/70"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full border border-edgeline-border bg-edgeline-black px-4 py-3 font-body text-edgeline-white focus:border-edgeline-red focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block font-condensed text-xs uppercase tracking-wider text-edgeline-white/70"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full border border-edgeline-border bg-edgeline-black px-4 py-3 font-body text-edgeline-white focus:border-edgeline-red focus:outline-none"
            />
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-edgeline-red">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-8 w-full bg-edgeline-red px-8 py-3 font-condensed text-sm uppercase tracking-wider text-edgeline-white transition-colors hover:bg-edgeline-red-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
