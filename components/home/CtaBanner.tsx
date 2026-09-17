import Link from "next/link";

export default function CtaBanner() {
  return (
    <section className="bg-edgeline-red px-4 py-16 text-center md:px-8">
      <h2 className="font-display text-3xl text-edgeline-white md:text-4xl">
        Can&apos;t Find What You&apos;re Looking For?
      </h2>
      <p className="mx-auto mt-3 max-w-lg font-body text-edgeline-white/80">
        Tell us the exact car you want and we&apos;ll go find it.
      </p>
      <Link
        href="/source-a-car"
        className="mt-8 inline-block bg-edgeline-black px-8 py-4 font-condensed text-sm uppercase tracking-wider text-edgeline-white transition-colors hover:bg-edgeline-gray"
      >
        Source a Car
      </Link>
    </section>
  );
}
