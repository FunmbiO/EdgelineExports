import { createPublicClient } from "@/lib/supabase/public";
import type {
  InventoryFilter,
  Vehicle,
  VehicleImage,
  VehicleSpecs,
  VehicleStatus,
} from "@/types/vehicle";

export const VEHICLES_PAGE_SIZE = 12;

export interface VehicleRow {
  id: string;
  slug: string;
  make: string;
  model: string;
  year: number;
  price: number | string;
  mileage: number;
  color: string | null;
  status: VehicleStatus;
  badge: string | null;
  description: string | null;
  specs: VehicleSpecs | null;
  images: VehicleImage[] | null;
  created_at: string;
  updated_at: string;
}

export function mapVehicleRow(row: VehicleRow): Vehicle {
  return {
    id: row.id,
    slug: row.slug,
    make: row.make,
    model: row.model,
    year: row.year,
    price: Number(row.price),
    mileage: row.mileage,
    color: row.color,
    status: row.status,
    badge: row.badge,
    description: row.description,
    specs: row.specs ?? {},
    images: row.images ?? [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getVehicles({
  filter = "all",
  page = 1,
}: {
  filter?: InventoryFilter;
  page?: number;
} = {}): Promise<{
  vehicles: Vehicle[];
  count: number;
  pageSize: number;
  page: number;
}> {
  try {
    const supabase = createPublicClient();
    let query = supabase
      .from("vehicles")
      .select("*", { count: "exact" })
      .neq("status", "draft");

    if (filter === "available") query = query.eq("status", "available");
    if (filter === "sold") query = query.eq("status", "sold");
    if (filter === "under-150k") query = query.lt("price", 150000);
    if (filter === "over-200k") query = query.gt("price", 200000);

    const from = (page - 1) * VEHICLES_PAGE_SIZE;
    const to = from + VEHICLES_PAGE_SIZE - 1;

    const { data, count, error } = await query
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;

    return {
      vehicles: (data ?? []).map(mapVehicleRow),
      count: count ?? 0,
      pageSize: VEHICLES_PAGE_SIZE,
      page,
    };
  } catch (err) {
    console.error("getVehicles failed:", err);
    return { vehicles: [], count: 0, pageSize: VEHICLES_PAGE_SIZE, page };
  }
}

export async function getFeaturedVehicle(): Promise<Vehicle | null> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .eq("status", "available")
      .eq("badge", "Featured")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    return data ? mapVehicleRow(data) : null;
  } catch (err) {
    console.error("getFeaturedVehicle failed:", err);
    return null;
  }
}

export async function getAllVehicleSlugs(): Promise<{ slug: string; updatedAt: string }[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("vehicles")
      .select("slug, updated_at")
      .neq("status", "draft");

    if (error) throw error;
    return (data ?? []).map((row) => ({ slug: row.slug, updatedAt: row.updated_at }));
  } catch (err) {
    console.error("getAllVehicleSlugs failed:", err);
    return [];
  }
}

export async function getVehicleBySlug(slug: string): Promise<Vehicle | null> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error) throw error;
    return data ? mapVehicleRow(data) : null;
  } catch (err) {
    console.error("getVehicleBySlug failed:", err);
    return null;
  }
}
