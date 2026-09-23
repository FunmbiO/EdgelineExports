import Link from "next/link";

export default function NotFound() {
  return (
    <div className="edge-accent-top flex min-h-[70vh] flex-col items-center justify-center bg-edgeline-black px-4 text-center">
      <p className="font-display text-8xl text-edgeline-red md:text-9xl">404</p>
      <h1 className="mt-4 font-display text-3xl text-edgeline-white md:text-4xl">
        This page took a wrong turn.
      </h1>
      <p className="mt-3 max-w-md font-body text-edgeline-white/60">
        The page you&apos;re looking for doesn&apos;t exist, or the listing may have already sold.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="bg-edgeline-red px-8 py-4 font-condensed text-sm uppercase tracking-wider text-edgeline-white transition-colors hover:bg-edgeline-red-dark"
        >
          Back to Home
        </Link>
        <Link
          href="/inventory"
          className="border border-edgeline-white/30 px-8 py-4 font-condensed text-sm uppercase tracking-wider text-edgeline-white transition-colors hover:border-edgeline-red hover:text-edgeline-red"
        >
          Browse Inventory
        </Link>
      </div>
    </div>
  );
}
