import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import VehicleMedia from "@/components/inventory/VehicleMedia";
import StatusTag from "@/components/inventory/StatusTag";
import TrustSignals from "@/components/inventory/TrustSignals";
import { getVehicleBySlug } from "@/lib/vehicles";
import { formatPrice, formatMileage } from "@/lib/format";

export const dynamic = "force-dynamic";

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
  if (!vehicle) return { title: "Vehicle Not Found | Edgeline Exports" };

  const title = `${vehicle.year} ${vehicle.make} ${vehicle.model} | Edgeline Exports`;
  const description =
    vehicle.description ??
    `${vehicle.year} ${vehicle.make} ${vehicle.model} — ${formatMileage(vehicle.mileage)}, ${formatPrice(vehicle.price)}.`;

  return {
    title,
    description,
    openGraph: { title, description },
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
  const inquirySubject = encodeURIComponent(
    `Inquiry: ${vehicle.year} ${vehicle.make} ${vehicle.model}`,
  );

  return (
    <div className="bg-edgeline-black">
      <PageHeader
        label="Inventory"
        title={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/3]">
            <VehicleMedia vehicle={vehicle} className="absolute inset-0" priority />
            <StatusTag vehicle={vehicle} />
          </div>

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
                <a
                  href={`mailto:hello@edgelineexports.com?subject=${inquirySubject}`}
                  className="inline-block bg-edgeline-red px-8 py-4 text-center font-condensed text-sm uppercase tracking-wider text-edgeline-white transition-colors hover:bg-edgeline-red-dark"
                >
                  Inquire Now
                </a>
                <a
                  href={`mailto:hello@edgelineexports.com?subject=${inquirySubject}%20-%20Inspection%20Report`}
                  className="inline-block border border-edgeline-white/30 px-8 py-4 text-center font-condensed text-sm uppercase tracking-wider text-edgeline-white transition-colors hover:border-edgeline-red hover:text-edgeline-red"
                >
                  Request Report
                </a>
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
