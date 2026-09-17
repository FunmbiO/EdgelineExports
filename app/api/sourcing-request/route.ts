import { NextRequest, NextResponse } from "next/server";
import { sourcingRequestSchema } from "@/lib/validations/sourcing";
import { createAdminClient } from "@/lib/supabase/admin";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { sendEmail } from "@/lib/email/resend";
import { sourcingClientEmail, sourcingTeamEmail } from "@/lib/email/templates";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Honeypot: bots that fill this hidden field get a fake success so they
  // don't learn to avoid it, but nothing is stored or emailed.
  if (typeof body.hpField === "string" && body.hpField.length > 0) {
    return NextResponse.json({ ok: true, reference: "EDG-000000" });
  }

  const parsed = sourcingRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const ip = getClientIp(request.headers);

  try {
    const supabase = createAdminClient();

    const withinLimit = await checkRateLimit(supabase, ip);
    if (!withinLimit) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 },
      );
    }

    const { name, email, phone, ...vehicleDetails } = parsed.data;

    const { data: lead, error: leadError } = await supabase
      .from("leads")
      .insert({ name, email, phone: phone || null, source: "sourcing" })
      .select()
      .single();

    if (leadError || !lead) {
      throw leadError ?? new Error("Lead insert returned no row");
    }

    const { data: submission, error: submissionError } = await supabase
      .from("form_submissions")
      .insert({
        type: "sourcing",
        payload: parsed.data,
        lead_id: lead.id,
        ip_address: ip,
      })
      .select()
      .single();

    if (submissionError || !submission) {
      throw submissionError ?? new Error("Submission insert returned no row");
    }

    const reference = `EDG-${submission.id.slice(0, 8).toUpperCase()}`;

    await Promise.all([
      sendEmail(sourcingClientEmail({ name, email, reference })),
      sendEmail(sourcingTeamEmail({ name, email, phone, reference, ...vehicleDetails })),
    ]);

    return NextResponse.json({ ok: true, reference });
  } catch (err) {
    console.error("Sourcing request failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
