import { createClient } from "@/lib/supabase/server";
import type { Testimonial } from "@/types/testimonial";

interface TestimonialRow {
  id: string;
  name: string;
  quote: string;
  location: string | null;
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("featured", true)
      .order("created_at", { ascending: false })
      .limit(6);

    if (error) throw error;

    return (data as TestimonialRow[] | null)?.map((row) => ({
      id: row.id,
      name: row.name,
      quote: row.quote,
      location: row.location,
    })) ?? [];
  } catch (err) {
    console.error("getFeaturedTestimonials failed:", err);
    return [];
  }
}
