export type VehicleStatus = "draft" | "available" | "reserved" | "sold";

export interface VehicleImage {
  url: string;
  thumbUrl?: string;
  alt?: string;
  sortOrder?: number;
}

export interface VehicleSpecs {
  engine?: string;
  transmission?: string;
  drivetrain?: string;
  "0-60"?: string;
  [key: string]: string | undefined;
}

export interface Vehicle {
  id: string;
  slug: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  color: string | null;
  status: VehicleStatus;
  badge: string | null;
  description: string | null;
  specs: VehicleSpecs;
  images: VehicleImage[];
  createdAt: string;
  updatedAt: string;
}

export type InventoryFilter =
  | "all"
  | "available"
  | "sold"
  | "under-150k"
  | "over-200k";

export const INVENTORY_FILTERS: { value: InventoryFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "available", label: "Available" },
  { value: "sold", label: "Sold" },
  { value: "under-150k", label: "Under $150k" },
  { value: "over-200k", label: "Over $200k" },
];
