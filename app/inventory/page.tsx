import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import FilterBar from "@/components/inventory/FilterBar";
import CarGrid from "@/components/inventory/CarGrid";
import Pagination from "@/components/inventory/Pagination";
import PickOfTheWeek from "@/components/inventory/PickOfTheWeek";
import { getVehicles, getFeaturedVehicle, VEHICLES_PAGE_SIZE } from "@/lib/vehicles";
import { INVENTORY_FILTERS, type InventoryFilter } from "@/types/vehicle";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Inventory | Edgeline Exports",
  description: "Browse Edgeline Exports' current vehicle inventory — available, reserved, and recently sold.",
};

function parseFilter(value: string | undefined): InventoryFilter {
  const found = INVENTORY_FILTERS.find((f) => f.value === value);
  return found ? found.value : "all";
}

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: { filter?: string; page?: string };
}) {
  const filter = parseFilter(searchParams.filter);
  const page = Math.max(1, Number(searchParams.page) || 1);

  const [{ vehicles, count }, featuredVehicle] = await Promise.all([
    getVehicles({ filter, page }),
    filter === "all" && page === 1 ? getFeaturedVehicle() : Promise.resolve(null),
  ]);

  const totalPages = Math.max(1, Math.ceil(count / VEHICLES_PAGE_SIZE));

  return (
    <div className="bg-edgeline-black">
      <PageHeader
        label="Inventory"
        title="Current Stock"
        subtitle="Every car we list is inspected and history-verified before it goes live."
      />

      <div className="mx-auto max-w-7xl space-y-10 px-4 py-12 md:px-8">
        {featuredVehicle && <PickOfTheWeek vehicle={featuredVehicle} />}

        <FilterBar active={filter} />

        <CarGrid vehicles={vehicles} />

        <Pagination page={page} totalPages={totalPages} filter={filter} />
      </div>
    </div>
  );
}
