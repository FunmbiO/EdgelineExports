import Link from "next/link";
import { INVENTORY_FILTERS, type InventoryFilter } from "@/types/vehicle";
import { getLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/dictionary";

export default async function FilterBar({ active }: { active: InventoryFilter }) {
  const locale = await getLocale();
  const t = getDictionary(locale);

  return (
    <div className="flex flex-wrap gap-2">
      {INVENTORY_FILTERS.map((filter) => {
        const isActive = filter.value === active;
        return (
          <Link
            key={filter.value}
            href={filter.value === "all" ? "/inventory" : `/inventory?filter=${filter.value}`}
            className={`px-4 py-2 font-condensed text-sm uppercase tracking-wider transition-colors ${
              isActive
                ? "bg-edgeline-red text-edgeline-white"
                : "border border-theme-border text-surface-foreground/70 hover:border-edgeline-red hover:text-edgeline-red"
            }`}
          >
            {t.inventoryFilters[filter.value]}
          </Link>
        );
      })}
    </div>
  );
}
