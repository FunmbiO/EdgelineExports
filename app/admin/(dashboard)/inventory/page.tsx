import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { mapVehicleRow, type VehicleRow } from "@/lib/vehicles";
import StatusPill from "@/components/admin/StatusPill";
import VehicleRowActions from "@/components/admin/VehicleRowActions";
import { formatPrice, formatMileage } from "@/lib/format";
import type { Vehicle } from "@/types/vehicle";

export const dynamic = "force-dynamic";

async function getAllVehicles(): Promise<Vehicle[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data as VehicleRow[] | null)?.map(mapVehicleRow) ?? [];
  } catch (err) {
    console.error("Failed to load admin vehicle list:", err);
    return [];
  }
}

export default async function AdminInventoryPage() {
  const vehicles = await getAllVehicles();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl text-edgeline-white">Inventory</h1>
        <Link
          href="/admin/inventory/new"
          className="bg-edgeline-red px-5 py-2 font-condensed text-sm uppercase tracking-wider text-edgeline-white hover:bg-edgeline-red-dark"
        >
          + Add Vehicle
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto border border-edgeline-border">
        <table className="w-full text-left">
          <thead className="border-b border-edgeline-border">
            <tr className="font-condensed text-xs uppercase tracking-wider text-edgeline-white/50">
              <th className="px-4 py-3">Vehicle</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Mileage</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center font-body text-edgeline-white/50">
                  No vehicles yet.
                </td>
              </tr>
            )}
            {vehicles.map((v) => (
              <tr key={v.id} className="border-b border-edgeline-border last:border-0">
                <td className="px-4 py-3 font-body text-edgeline-white">
                  {v.year} {v.make} {v.model}
                </td>
                <td className="px-4 py-3">
                  <StatusPill status={v.status} />
                </td>
                <td className="px-4 py-3 font-body text-edgeline-white/70">{formatPrice(v.price)}</td>
                <td className="px-4 py-3 font-body text-edgeline-white/70">{formatMileage(v.mileage)}</td>
                <td className="px-4 py-3">
                  <VehicleRowActions id={v.id} status={v.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
