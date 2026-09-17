"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/inventory", label: "Inventory" },
  { href: "/source-a-car", label: "Source a Car" },
  { href: "/sell-your-car", label: "Sell Your Car" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 edge-accent-top bg-edgeline-black">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <Link href="/" className="font-display text-2xl tracking-wide text-edgeline-white">
          EDGELINE <span className="text-edgeline-red">EXPORTS</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-condensed text-sm uppercase tracking-wider text-edgeline-white/80 transition-colors hover:text-edgeline-red"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-4 md:flex">
          <Link
            href="/admin/login"
            className="font-condensed text-xs uppercase tracking-wider text-edgeline-white/50 hover:text-edgeline-red"
          >
            Admin
          </Link>
          <Link
            href="/source-a-car"
            className="border border-edgeline-red bg-edgeline-red px-5 py-2 font-condensed text-sm uppercase tracking-wider text-edgeline-white transition-colors hover:bg-transparent hover:text-edgeline-red"
          >
            Find My Car
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          className="flex flex-col gap-1.5 md:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-edgeline-white transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span className={`h-0.5 w-6 bg-edgeline-white transition-opacity ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-0.5 w-6 bg-edgeline-white transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-edgeline-border px-4 pb-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-3 font-condensed text-sm uppercase tracking-wider text-edgeline-white/80 hover:text-edgeline-red"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/source-a-car"
            onClick={() => setOpen(false)}
            className="mt-2 inline-block bg-edgeline-red px-5 py-3 text-center font-condensed text-sm uppercase tracking-wider text-edgeline-white"
          >
            Find My Car
          </Link>
          <Link
            href="/admin/login"
            onClick={() => setOpen(false)}
            className="mt-2 py-2 text-center font-condensed text-xs uppercase tracking-wider text-edgeline-white/50"
          >
            Admin
          </Link>
        </nav>
      )}
    </header>
  );
}
