import "server-only";
import { Resend } from "resend";

let client: Resend | null = null;

function getClient(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  if (!client) client = new Resend(process.env.RESEND_API_KEY);
  return client;
}

export async function sendEmail(params: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<{ ok: boolean; error?: string }> {
  const resend = getClient();

  if (!resend) {
    const warning = `RESEND_API_KEY not set — skipping email "${params.subject}" to ${params.to}`;
    console.warn(warning);
    return { ok: false, error: warning };
  }

  try {
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "leads@edgelineexports.com",
      to: params.to,
      subject: params.subject,
      html: params.html,
      ...(params.replyTo ? { replyTo: params.replyTo } : {}),
    });
    if (error) throw error;
    return { ok: true };
  } catch (err) {
    console.error("Failed to send email:", err);
    return { ok: false, error: err instanceof Error ? err.message : "Failed to send email" };
  }
}
