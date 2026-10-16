import { createAdminClient } from "@/lib/supabase/admin";
import EmailComposer from "@/components/admin/EmailComposer";
import { formatRelativeTime } from "@/lib/format";
import type { SentEmail } from "@/types/sent-email";

export const dynamic = "force-dynamic";

interface SentEmailRow {
  id: string;
  recipient_email: string;
  subject: string;
  message: string;
  status: "sent" | "failed";
  error: string | null;
  created_at: string;
}

async function getRecentSentEmails(): Promise<SentEmail[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("sent_emails")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20);

    if (error) throw error;
    return (data as SentEmailRow[] | null)?.map((row) => ({
      id: row.id,
      recipientEmail: row.recipient_email,
      subject: row.subject,
      message: row.message,
      status: row.status,
      error: row.error,
      createdAt: row.created_at,
    })) ?? [];
  } catch (err) {
    console.error("Failed to load sent email history:", err);
    return [];
  }
}

export default async function AdminEmailPage() {
  const sentEmails = await getRecentSentEmails();

  return (
    <div>
      <h1 className="font-display text-3xl text-edgeline-white">Send Email</h1>
      <p className="mt-2 max-w-xl font-body text-sm text-edgeline-white/50">
        Send a branded Edgeline Exports email to any client. Replies land in{" "}
        {process.env.EDGELINE_REPLY_TO_EMAIL ?? "edgelineexports@gmail.com"}.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <EmailComposer />
        </div>

        <div className="lg:col-span-2">
          <h2 className="font-condensed text-sm uppercase tracking-wider text-edgeline-red">
            Recently Sent
          </h2>
          <div className="mt-4 space-y-3">
            {sentEmails.length === 0 && (
              <p className="font-body text-sm text-edgeline-white/50">
                Nothing sent yet.
              </p>
            )}
            {sentEmails.map((email) => (
              <div key={email.id} className="border border-edgeline-border p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-body text-sm text-edgeline-white">{email.subject}</p>
                    <p className="mt-1 text-xs text-edgeline-white/50">{email.recipientEmail}</p>
                  </div>
                  <span
                    className={`shrink-0 border px-2 py-1 font-condensed text-xs uppercase tracking-wider ${
                      email.status === "sent"
                        ? "border-edgeline-white/20 text-edgeline-white/50"
                        : "border-edgeline-red bg-edgeline-red/10 text-edgeline-red"
                    }`}
                  >
                    {email.status}
                  </span>
                </div>
                <p className="mt-2 text-xs text-edgeline-white/40">
                  {formatRelativeTime(email.createdAt)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
