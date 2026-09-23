import type { MetadataRoute } from "next";
import { getAllVehicleSlugs } from "@/lib/vehicles";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://edgelineexports.com";

const STATIC_ROUTES: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/inventory", priority: 0.9 },
  { path: "/source-a-car", priority: 0.7 },
  { path: "/sell-your-car", priority: 0.7 },
  { path: "/about", priority: 0.5 },
  { path: "/contact", priority: 0.5 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const vehicles = await getAllVehicleSlugs();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority,
  }));

  const vehicleEntries: MetadataRoute.Sitemap = vehicles.map(({ slug, updatedAt }) => ({
    url: `${SITE_URL}/inventory/${slug}`,
    lastModified: updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...vehicleEntries];
}
