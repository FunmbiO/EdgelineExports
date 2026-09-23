import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import VehicleGallery from "@/components/inventory/VehicleGallery";
import TrustSignals from "@/components/inventory/TrustSignals";
import InquiryModal from "@/components/inventory/InquiryModal";
import ReportRequestModal from "@/components/inventory/ReportRequestModal";
import { getVehicleBySlug } from "@/lib/vehicles";
import { formatPrice, formatMileage } from "@/lib/format";

export const revalidate = 60;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://edgelineexports.com";

const AVAILABILITY_MAP: Record<string, string> = {
  available: "https://schema.org/InStock",
  reserved: "https://schema.org/LimitedAvailability",
  sold: "https://schema.org/SoldOut",
  draft: "https://schema.org/OutOfStock",
};

const SPEC_LABELS: Record<string, string> = {
  engine: "Engine",
  transmission: "Transmission",
  drivetrain: "Drivetrain",
  "0-60": "0–60 mph",
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const vehicle = await getVehicleBySlug(params.slug);
  if (!vehicle) return { title: "Vehicle Not Found" };

  const title = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
  const description =
    vehicle.description ??
    `${vehicle.year} ${vehicle.make} ${vehicle.model} — ${formatMileage(vehicle.mileage)}, ${formatPrice(vehicle.price)}.`;

  return {
    title,
    description,
    alternates: { canonical: `/inventory/${vehicle.slug}` },
    openGraph: {
      title: `${title} | Edgeline Exports`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Edgeline Exports`,
      description,
    },
  };
}

export default async function VehicleDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const vehicle = await getVehicleBySlug(params.slug);
  if (!vehicle) notFound();

  const isSold = vehicle.status === "sold";
  const specEntries = Object.entries(vehicle.specs).filter(([, value]) => value);

  const vehicleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
    brand: vehicle.make,
    model: vehicle.model,
    vehicleModelDate: String(vehicle.year),
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: vehicle.mileage,
      unitCode: "SMI",
    },
    color: vehicle.color ?? undefined,
    image: vehicle.images.map((img) => img.url),
    description: vehicle.description ?? undefined,
    offers: {
      "@type": "Offer",
      price: vehicle.price,
      priceCurrency: "USD",
      availability: AVAILABILITY_MAP[vehicle.status],
      url: `${SITE_URL}/inventory/${vehicle.slug}`,
    },
  };

  return (
    <div className="bg-edgeline-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleJsonLd) }}
      />
      <PageHeader
        label="Inventory"
        title={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <VehicleGallery vehicle={vehicle} />

          <div>
            <p className="font-body text-edgeline-white/60">
              {formatMileage(vehicle.mileage)}
              {vehicle.color ? ` · ${vehicle.color}` : ""}
            </p>
            <p
              className={`mt-2 font-display text-4xl ${
                isSold ? "text-edgeline-white/40 line-through" : "text-edgeline-red"
              }`}
            >
              {formatPrice(vehicle.price)}
            </p>

            {specEntries.length > 0 && (
              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-edgeline-border pt-8">
                {specEntries.map(([key, value]) => (
                  <div key={key}>
                    <p className="font-condensed text-xs uppercase tracking-wider text-edgeline-white/50">
                      {SPEC_LABELS[key] ?? key}
                    </p>
                    <p className="mt-1 font-body text-edgeline-white">{value}</p>
                  </div>
                ))}
              </div>
            )}

            {vehicle.description && (
              <p className="mt-8 font-body text-edgeline-white/70">{vehicle.description}</p>
            )}

            {!isSold && (
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <InquiryModal
                  vehicle={{
                    slug: vehicle.slug,
                    year: vehicle.year,
                    make: vehicle.make,
                    model: vehicle.model,
                    price: vehicle.price,
                  }}
                />
                <ReportRequestModal
                  vehicle={{
                    slug: vehicle.slug,
                    year: vehicle.year,
                    make: vehicle.make,
                    model: vehicle.model,
                    price: vehicle.price,
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <div className="mt-16">
          <TrustSignals />
        </div>

        <div className="mt-12">
          <Link
            href="/inventory"
            className="font-condensed text-sm uppercase tracking-wider text-edgeline-white/60 hover:text-edgeline-red"
          >
            ← Back to Inventory
          </Link>
        </div>
      </div>
    </div>
  );
}
