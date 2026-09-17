"use client";

import { useState } from "react";
import Image from "next/image";
import type { Vehicle } from "@/types/vehicle";
import StatusTag from "@/components/inventory/StatusTag";

export default function VehicleGallery({
  vehicle,
}: {
  vehicle: Pick<Vehicle, "make" | "model" | "year" | "images" | "status" | "badge">;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = vehicle.images;

  if (images.length === 0) {
    return (
      <div className="relative aspect-[4/3] overflow-hidden bg-edgeline-black">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(196,30,42,0.35),transparent_60%)]"
          aria-hidden="true"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="px-4 text-center font-display text-2xl leading-tight text-edgeline-white/70">
            {vehicle.year}
            <br />
            {vehicle.make} {vehicle.model}
          </p>
        </div>
        <StatusTag vehicle={vehicle} />
      </div>
    );
  }

  const activeImage = images[activeIndex];
  const goTo = (index: number) => setActiveIndex((index + images.length) % images.length);

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden bg-edgeline-black">
        <Image
          key={activeImage.url}
          src={activeImage.url}
          alt={activeImage.alt ?? `${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority
          className="object-cover"
        />
        <StatusTag vehicle={vehicle} />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-edgeline-black/60 p-2 text-edgeline-white transition-colors hover:bg-edgeline-red"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-edgeline-black/60 p-2 text-edgeline-white transition-colors hover:bg-edgeline-red"
            >
              →
            </button>
            <div className="absolute bottom-3 right-3 bg-edgeline-black/70 px-2 py-1 font-condensed text-xs text-edgeline-white">
              {activeIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {images.map((img, index) => (
            <button
              key={img.url}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`View photo ${index + 1}`}
              className={`relative h-16 w-24 shrink-0 overflow-hidden border-2 transition-colors ${
                index === activeIndex
                  ? "border-edgeline-red"
                  : "border-transparent hover:border-edgeline-white/30"
              }`}
            >
              <Image src={img.url} alt="" fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
