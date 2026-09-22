import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Lead, LeadStatus } from "@/types/lead";

interface LeadRow {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  source: Lead["source"];
  status: LeadStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

function mapLeadRow(row: LeadRow): Lead {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    source: row.source,
    status: row.status,
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getLeads(status?: LeadStatus): Promise<Lead[]> {
  try {
    const supabase = createAdminClient();
    let query = supabase.from("leads").select("*").order("created_at", { ascending: false });
    if (status) query = query.eq("status", status);

    const { data, error } = await query;
    if (error) throw error;
    return (data as LeadRow[] | null)?.map(mapLeadRow) ?? [];
  } catch (err) {
    console.error("getLeads failed:", err);
    return [];
  }
}

export async function getLeadById(id: string): Promise<Lead | null> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase.from("leads").select("*").eq("id", id).maybeSingle();
    if (error) throw error;
    return data ? mapLeadRow(data as LeadRow) : null;
  } catch (err) {
    console.error("getLeadById failed:", err);
    return null;
  }
}

export interface LeadSubmission {
  type: string;
  payload: Record<string, unknown>;
  createdAt: string;
}

export async function getLatestSubmissionForLead(leadId: string): Promise<LeadSubmission | null> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("form_submissions")
      .select("type, payload, created_at")
      .eq("lead_id", leadId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;

    return {
      type: data.type,
      payload: (data.payload as Record<string, unknown>) ?? {},
      createdAt: data.created_at,
    };
  } catch (err) {
    console.error("getLatestSubmissionForLead failed:", err);
    return null;
  }
}
