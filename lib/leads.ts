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
