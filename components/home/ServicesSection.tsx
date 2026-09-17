import Link from "next/link";

const SERVICES = [
  {
    title: "Buy From Us",
    description: "Browse verified, inspected inventory ready to ship nationwide.",
    href: "/inventory",
  },
  {
    title: "We Find It",
    description: "Tell us what you want and we'll source it from our network.",
    href: "/source-a-car",
  },
  {
    title: "Sell To Us",
    description: "Outright purchase or consignment — get paid on your terms.",
    href: "/sell-your-car",
  },
];

export default function ServicesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 md:px-8">
      <p className="text-center font-condensed text-sm uppercase tracking-[0.3em] text-edgeline-red">
        Services
      </p>
      <h2 className="mt-3 text-center font-display text-4xl text-edgeline-black">How We Work</h2>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {SERVICES.map((service) => (
          <Link
            key={service.title}
            href={service.href}
            className="group relative overflow-hidden border border-edgeline-black/10 p-8"
          >
            <h3 className="font-display text-2xl text-edgeline-black">{service.title}</h3>
            <p className="mt-3 font-body text-edgeline-black/60">{service.description}</p>
            <span className="mt-6 inline-block font-condensed text-xs uppercase tracking-wider text-edgeline-red">
              Learn More →
            </span>
            <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-edgeline-red transition-transform duration-300 group-hover:scale-x-100" />
          </Link>
        ))}
      </div>
    </section>
  );
}
