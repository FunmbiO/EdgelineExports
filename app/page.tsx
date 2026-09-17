import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <section className="mx-auto max-w-7xl px-4 py-24 text-center md:px-8">
        <p className="font-condensed text-sm uppercase tracking-[0.3em] text-edgeline-red">
          Coming in Sprint 4
        </p>
        <h2 className="mt-3 font-display text-4xl">Services, Testimonials & More</h2>
        <p className="mx-auto mt-4 max-w-xl font-body text-edgeline-black/60">
          This section will showcase Buy From Us, We Find It, and Sell To Us, plus
          client testimonials. For now, explore inventory or start a sourcing request.
        </p>
      </section>
    </>
  );
}
