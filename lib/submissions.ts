import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import type { FormSubmission, SubmissionType } from "@/types/submission";

interface SubmissionRow {
  id: string;
  type: SubmissionType;
  payload: Record<string, unknown> | null;
  lead_id: string | null;
  ip_address: string | null;
  created_at: string;
}

function mapSubmissionRow(row: SubmissionRow): FormSubmission {
  return {
    id: row.id,
    type: row.type,
    payload: row.payload ?? {},
    leadId: row.lead_id,
    ipAddress: row.ip_address,
    createdAt: row.created_at,
  };
}

export async function getSubmissions(): Promise<FormSubmission[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("form_submissions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) throw error;
    return (data as SubmissionRow[] | null)?.map(mapSubmissionRow) ?? [];
  } catch (err) {
    console.error("getSubmissions failed:", err);
    return [];
  }
}
