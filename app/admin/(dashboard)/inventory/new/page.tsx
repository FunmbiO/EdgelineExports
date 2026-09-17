import VehicleForm from "@/components/admin/VehicleForm";

export default function NewVehiclePage() {
  return (
    <div>
      <h1 className="font-display text-3xl text-edgeline-white">Add Vehicle</h1>
      <div className="mt-8">
        <VehicleForm />
      </div>
    </div>
  );
}
