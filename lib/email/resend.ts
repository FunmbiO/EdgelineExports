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
}): Promise<void> {
  const resend = getClient();

  if (!resend) {
    console.warn(`RESEND_API_KEY not set — skipping email "${params.subject}" to ${params.to}`);
    return;
  }

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "leads@edgelineexports.com",
      to: params.to,
      subject: params.subject,
      html: params.html,
    });
  } catch (err) {
    console.error("Failed to send email:", err);
  }
}
