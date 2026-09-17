import type { Vehicle } from "@/types/vehicle";
import CarCard from "@/components/inventory/CarCard";

export default function CarGrid({ vehicles }: { vehicles: Vehicle[] }) {
  if (vehicles.length === 0) {
    return (
      <div className="border border-dashed border-edgeline-border py-20 text-center font-body text-edgeline-white/50">
        No vehicles match this filter right now.
      </div>
    );
  }

  return (
    <div
      className="grid gap-5"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}
    >
      {vehicles.map((vehicle) => (
        <CarCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
}
