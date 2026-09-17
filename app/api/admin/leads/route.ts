import { NextRequest, NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth/require-admin";
import { getLeads } from "@/lib/leads";
import type { LeadStatus } from "@/types/lead";

export const dynamic = "force-dynamic";

const VALID_STATUSES: LeadStatus[] = ["new", "contacted", "active", "closed"];

export async function GET(request: NextRequest) {
  const user = await requireAdminUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const statusParam = request.nextUrl.searchParams.get("status");
  const status = VALID_STATUSES.includes(statusParam as LeadStatus)
    ? (statusParam as LeadStatus)
    : undefined;

  const leads = await getLeads(status);
  return NextResponse.json({ leads });
}
