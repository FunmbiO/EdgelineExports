import Link from "next/link";
import type { Vehicle } from "@/types/vehicle";
import VehicleMedia from "@/components/inventory/VehicleMedia";
import { formatPrice, formatMileage } from "@/lib/format";

export default function PickOfTheWeek({ vehicle }: { vehicle: Vehicle }) {
  return (
    <div className="grid overflow-hidden border border-edgeline-border md:grid-cols-2">
      <VehicleMedia vehicle={vehicle} className="aspect-[4/3] md:aspect-auto" priority />

      <div className="flex flex-col justify-center bg-edgeline-black p-8 md:p-12">
        <p className="font-condensed text-sm uppercase tracking-[0.3em] text-edgeline-red">
          Pick of the Week
        </p>
        <h2 className="mt-3 font-display text-4xl text-edgeline-white">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h2>
        <p className="mt-3 font-body text-edgeline-white/60">
          {formatMileage(vehicle.mileage)}
          {vehicle.color ? ` · ${vehicle.color}` : ""}
        </p>
        {vehicle.description && (
          <p className="mt-4 max-w-md font-body text-edgeline-white/70">{vehicle.description}</p>
        )}

        <div className="mt-6 flex items-center gap-6">
          <p className="font-display text-2xl text-edgeline-red">{formatPrice(vehicle.price)}</p>
          <Link
            href={`/inventory/${vehicle.slug}`}
            className="border border-edgeline-white/30 px-6 py-3 font-condensed text-sm uppercase tracking-wider text-edgeline-white transition-colors hover:border-edgeline-red hover:text-edgeline-red"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
