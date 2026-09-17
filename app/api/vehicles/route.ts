import { NextRequest, NextResponse } from "next/server";
import { getVehicles } from "@/lib/vehicles";
import type { InventoryFilter } from "@/types/vehicle";

export const dynamic = "force-dynamic";

const VALID_FILTERS: InventoryFilter[] = [
  "all",
  "available",
  "sold",
  "under-150k",
  "over-200k",
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const filterParam = searchParams.get("filter") ?? "all";
  const filter = VALID_FILTERS.includes(filterParam as InventoryFilter)
    ? (filterParam as InventoryFilter)
    : "all";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const result = await getVehicles({ filter, page });
  return NextResponse.json(result);
}
