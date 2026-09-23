import { ImageResponse } from "next/og";
import { getVehicleBySlug } from "@/lib/vehicles";
import { formatPrice, formatMileage } from "@/lib/format";

export const alt = "Vehicle listing — Edgeline Exports";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const vehicle = await getVehicleBySlug(params.slug);
  const title = vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : "Edgeline Exports";
  const price = vehicle ? formatPrice(vehicle.price) : null;
  const mileage = vehicle ? formatMileage(vehicle.mileage) : null;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0a0a",
          padding: 64,
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 10, backgroundColor: "#c41e2a" }} />
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#c41e2a",
            letterSpacing: 4,
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          Edgeline Exports
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 60, color: "#ffffff", fontWeight: 700, lineHeight: 1.15 }}>
            {title}
          </div>
          {mileage && (
            <div style={{ display: "flex", marginTop: 12, fontSize: 28, color: "rgba(255,255,255,0.6)" }}>
              {mileage}
            </div>
          )}
          {price && (
            <div style={{ display: "flex", marginTop: 20, fontSize: 52, color: "#c41e2a", fontWeight: 700 }}>
              {price}
            </div>
          )}
        </div>
      </div>
    ),
    { ...size },
  );
}
