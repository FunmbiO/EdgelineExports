import Image from "next/image";
import type { Vehicle } from "@/types/vehicle";

export default function VehicleMedia({
  vehicle,
  className = "",
  sizes = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
  priority = false,
}: {
  vehicle: Pick<Vehicle, "make" | "model" | "year" | "images">;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const primaryImage = vehicle.images[0];

  if (primaryImage) {
    return (
      <div className={`overflow-hidden bg-edgeline-black ${className}`}>
        <Image
          src={primaryImage.url}
          alt={primaryImage.alt ?? `${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center overflow-hidden bg-edgeline-black ${className}`}
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(196,30,42,0.35),transparent_60%)]"
        aria-hidden="true"
      />
      <p className="relative px-4 text-center font-display text-2xl leading-tight text-edgeline-white/70">
        {vehicle.year}
        <br />
        {vehicle.make} {vehicle.model}
      </p>
    </div>
  );
}
