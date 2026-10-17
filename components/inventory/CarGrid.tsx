import type { Vehicle } from "@/types/vehicle";
import CarCard from "@/components/inventory/CarCard";
import { getLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/dictionary";

export default async function CarGrid({ vehicles }: { vehicles: Vehicle[] }) {
  if (vehicles.length === 0) {
    const locale = await getLocale();
    const t = getDictionary(locale);
    return (
      <div className="border border-dashed border-theme-border py-20 text-center font-body text-surface-foreground/50">
        {t.inventory.noResults}
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
