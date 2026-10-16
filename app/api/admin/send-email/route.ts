import { NextRequest, NextResponse } from "next/server";
import { sendEmailInputSchema } from "@/lib/validations/send-email";
import { requireAdminUser } from "@/lib/auth/require-admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendEmail } from "@/lib/email/resend";
import { customAdminEmail } from "@/lib/email/templates";

export const dynamic = "force-dynamic";

const TEAM_EMAIL = process.env.EDGELINE_TEAM_EMAIL ?? "team@edgelineexports.com";

export async function POST(request: NextRequest) {
  const user = await requireAdminUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = sendEmailInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { to, subject, message } = parsed.data;
  const supabase = createAdminClient();

  const result = await sendEmail({
    ...customAdminEmail({ to, subject, message }),
    replyTo: TEAM_EMAIL,
  });

  const { error: logError } = await supabase.from("sent_emails").insert({
    recipient_email: to,
    subject,
    message,
    status: result.ok ? "sent" : "failed",
    error: result.error ?? null,
  });
  if (logError) console.error("Failed to log sent email:", logError);

  if (!result.ok) {
    return NextResponse.json(
      { error: result.error ?? "Failed to send email. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
