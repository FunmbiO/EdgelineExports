import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import TestimonialForm from "@/components/admin/TestimonialForm";
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

async function getTestimonialById(id: string): Promise<AdminTestimonial | null> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;

    const row = data as TestimonialRow;
    return {
      id: row.id,
      name: row.name,
      quote: row.quote,
      location: row.location,
      featured: row.featured,
      createdAt: row.created_at,
    };
  } catch (err) {
    console.error("Failed to load testimonial for edit:", err);
    return null;
  }
}

export default async function EditTestimonialPage({ params }: { params: { id: string } }) {
  const testimonial = await getTestimonialById(params.id);
  if (!testimonial) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl text-edgeline-white">Edit Testimonial</h1>
      <div className="mt-8 max-w-2xl">
        <TestimonialForm testimonial={testimonial} />
      </div>
    </div>
  );
}
