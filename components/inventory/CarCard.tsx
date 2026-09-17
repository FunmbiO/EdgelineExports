import Link from "next/link";
import type { Vehicle } from "@/types/vehicle";
import VehicleMedia from "@/components/inventory/VehicleMedia";
import StatusTag from "@/components/inventory/StatusTag";
import { formatPrice, formatMileage } from "@/lib/format";

export default function CarCard({ vehicle }: { vehicle: Vehicle }) {
  const isSold = vehicle.status === "sold";

  return (
    <Link
      href={`/inventory/${vehicle.slug}`}
      className="group block border border-edgeline-border bg-edgeline-black transition-colors hover:border-edgeline-red"
    >
      <div className="relative aspect-[4/3]">
        <VehicleMedia vehicle={vehicle} className="absolute inset-0" />
        <StatusTag vehicle={vehicle} />
      </div>

      <div className="p-5">
        <p className="font-display text-2xl text-edgeline-white">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </p>
        <p className="mt-1 font-body text-sm text-edgeline-white/60">
          {formatMileage(vehicle.mileage)}
          {vehicle.color ? ` · ${vehicle.color}` : ""}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <p className={`font-display text-xl ${isSold ? "text-edgeline-white/40 line-through" : "text-edgeline-red"}`}>
            {formatPrice(vehicle.price)}
          </p>
          <span className="font-condensed text-xs uppercase tracking-wider text-edgeline-white/70 group-hover:text-edgeline-red">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}
