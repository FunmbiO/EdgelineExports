import { NextRequest, NextResponse } from "next/server";
import { contactSchema, SUBJECT_OPTIONS } from "@/lib/validations/contact";
import { createAdminClient } from "@/lib/supabase/admin";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { sendEmail } from "@/lib/email/resend";
import { contactClientEmail, contactTeamEmail } from "@/lib/email/templates";

export const dynamic = "force-dynamic";

function subjectLabel(value: string): string {
  return SUBJECT_OPTIONS.find((opt) => opt.value === value)?.label ?? value;
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (typeof body.hpField === "string" && body.hpField.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const parsed = contactSchema.safeParse(body);
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

    const { name, email, subject, message } = parsed.data;
    const subjectText = subjectLabel(subject);

    const { data: submission, error: submissionError } = await supabase
      .from("form_submissions")
      .insert({
        type: "contact",
        payload: parsed.data,
        ip_address: ip,
      })
      .select()
      .single();

    if (submissionError || !submission) {
      throw submissionError ?? new Error("Submission insert returned no row");
    }

    const reference = `EDG-${submission.id.slice(0, 8).toUpperCase()}`;

    await Promise.all([
      sendEmail(contactClientEmail({ name, email })),
      sendEmail(contactTeamEmail({ name, email, subject: subjectText, message })),
    ]);

    return NextResponse.json({ ok: true, reference });
  } catch (err) {
    console.error("Contact submission failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
