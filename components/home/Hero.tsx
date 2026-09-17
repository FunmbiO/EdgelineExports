import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-edgeline-black">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(196,30,42,0.25),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(196,30,42,0.15),transparent_50%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.2)_0%,rgba(10,10,10,0.9)_100%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-30 md:px-8">
        <div className="fade-up max-w-2xl">
          <p className="font-condensed text-sm uppercase tracking-[0.3em] text-edgeline-red">
            Online-Only Dealership
          </p>
          <h1 className="mt-4 font-display text-6xl leading-none text-edgeline-white sm:text-7xl md:text-8xl">
            Driven by <span className="text-edgeline-red">Value</span>.
          </h1>
          <p className="mt-6 max-w-lg font-body text-lg text-edgeline-white/70">
            We buy, sell, and source performance and luxury vehicles nationwide —
            with verified history, honest inspections, and delivery to your door.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/inventory"
              className="inline-block bg-edgeline-red px-8 py-4 text-center font-condensed text-sm uppercase tracking-wider text-edgeline-white transition-colors hover:bg-edgeline-red-dark"
            >
              View Inventory
            </Link>
            <Link
              href="/source-a-car"
              className="inline-block border border-edgeline-white/30 px-8 py-4 text-center font-condensed text-sm uppercase tracking-wider text-edgeline-white transition-colors hover:border-edgeline-red hover:text-edgeline-red"
            >
              Source a Car
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
