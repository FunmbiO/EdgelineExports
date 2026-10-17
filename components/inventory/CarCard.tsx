import Link from "next/link";
import type { Vehicle } from "@/types/vehicle";
import VehicleMedia from "@/components/inventory/VehicleMedia";
import StatusTag from "@/components/inventory/StatusTag";
import { formatPrice, formatMileage } from "@/lib/format";
import { getLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/dictionary";

export default async function CarCard({ vehicle }: { vehicle: Vehicle }) {
  const isSold = vehicle.status === "sold";
  const locale = await getLocale();
  const t = getDictionary(locale);

  return (
    <Link
      href={`/inventory/${vehicle.slug}`}
      className="group block border border-theme-border bg-card transition-colors hover:border-edgeline-red"
    >
      <div className="relative aspect-[4/3]">
        <VehicleMedia vehicle={vehicle} className="absolute inset-0" />
        <StatusTag vehicle={vehicle} />
      </div>

      <div className="p-5">
        <p className="font-display text-2xl text-card-foreground">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </p>
        <p className="mt-1 font-body text-sm text-card-foreground/60">
          {formatMileage(vehicle.mileage)}
          {vehicle.color ? ` · ${vehicle.color}` : ""}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <p className={`font-display text-xl ${isSold ? "text-card-foreground/40 line-through" : "text-edgeline-red"}`}>
            {formatPrice(vehicle.price)}
          </p>
          <span className="font-condensed text-xs uppercase tracking-wider text-card-foreground/70 group-hover:text-edgeline-red">
            {t.inventory.viewDetails} →
          </span>
        </div>
      </div>
    </Link>
  );
}
