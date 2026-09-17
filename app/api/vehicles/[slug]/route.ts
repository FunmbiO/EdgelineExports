import { NextRequest, NextResponse } from "next/server";
import { getVehicleBySlug } from "@/lib/vehicles";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } },
) {
  const vehicle = await getVehicleBySlug(params.slug);

  if (!vehicle) {
    return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
  }

  return NextResponse.json(vehicle);
}
