import { NextRequest, NextResponse } from "next/server";
import { testimonialInputSchema } from "@/lib/validations/testimonial";
import { requireAdminUser } from "@/lib/auth/require-admin";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const user = await requireAdminUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = testimonialInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("testimonials")
      .insert(parsed.data)
      .select()
      .single();

    if (error || !data) throw error ?? new Error("Testimonial insert returned no row");

    return NextResponse.json({ ok: true, testimonial: data });
  } catch (err) {
    console.error("Testimonial create failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
