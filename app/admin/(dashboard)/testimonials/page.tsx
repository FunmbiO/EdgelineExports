import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import TestimonialRowActions from "@/components/admin/TestimonialRowActions";
import { formatRelativeTime } from "@/lib/format";
import type { AdminTestimonial } from "@/types/testimonial";

export const dynamic = "force-dynamic";

interface TestimonialRow {
  id: string;
  name: string;
  quote: string;
  location: string | null;
  featured: boolean;
  created_at: string;
}

async function getAllTestimonials(): Promise<AdminTestimonial[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data as TestimonialRow[] | null)?.map((row) => ({
      id: row.id,
      name: row.name,
      quote: row.quote,
      location: row.location,
      featured: row.featured,
      createdAt: row.created_at,
    })) ?? [];
  } catch (err) {
    console.error("Failed to load admin testimonial list:", err);
    return [];
  }
}

export default async function AdminTestimonialsPage() {
  const testimonials = await getAllTestimonials();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl text-edgeline-white">Testimonials</h1>
        <Link
          href="/admin/testimonials/new"
          className="bg-edgeline-red px-5 py-2 font-condensed text-sm uppercase tracking-wider text-edgeline-white hover:bg-edgeline-red-dark"
        >
          + Add Testimonial
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto border border-edgeline-border">
        <table className="w-full text-left">
          <thead className="border-b border-edgeline-border">
            <tr className="font-condensed text-xs uppercase tracking-wider text-edgeline-white/50">
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Quote</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Added</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center font-body text-edgeline-white/50">
                  No testimonials yet — add your first one.
                </td>
              </tr>
            )}
            {testimonials.map((t) => (
              <tr key={t.id} className="border-b border-edgeline-border align-top last:border-0">
                <td className="px-4 py-3">
                  <p className="font-body text-edgeline-white">{t.name}</p>
                  {t.location && <p className="text-xs text-edgeline-white/50">{t.location}</p>}
                </td>
                <td className="max-w-md px-4 py-3 font-body text-sm text-edgeline-white/70">
                  &ldquo;{t.quote}&rdquo;
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block border px-2.5 py-1 font-condensed text-xs uppercase tracking-wider ${
                      t.featured
                        ? "border-edgeline-red bg-edgeline-red/10 text-edgeline-red"
                        : "border-edgeline-white/20 text-edgeline-white/50"
                    }`}
                  >
                    {t.featured ? "Published" : "Hidden"}
                  </span>
                </td>
                <td className="px-4 py-3 font-body text-xs text-edgeline-white/50">
                  {formatRelativeTime(t.createdAt)}
                </td>
                <td className="px-4 py-3">
                  <TestimonialRowActions id={t.id} featured={t.featured} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
