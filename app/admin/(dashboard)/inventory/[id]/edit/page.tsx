import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { mapVehicleRow, type VehicleRow } from "@/lib/vehicles";
import VehicleForm from "@/components/admin/VehicleForm";
import type { Vehicle } from "@/types/vehicle";

export const dynamic = "force-dynamic";

async function getVehicleById(id: string): Promise<Vehicle | null> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) throw error;
    return data ? mapVehicleRow(data as VehicleRow) : null;
  } catch (err) {
    console.error("Failed to load vehicle for edit:", err);
    return null;
  }
}

export default async function EditVehiclePage({ params }: { params: { id: string } }) {
  const vehicle = await getVehicleById(params.id);
  if (!vehicle) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl text-edgeline-white">Edit Vehicle</h1>
      <div className="mt-8">
        <VehicleForm vehicle={vehicle} />
      </div>
    </div>
  );
}
