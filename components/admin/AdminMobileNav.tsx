"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/admin/inventory", label: "Inventory" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/testimonials", label: "Testimonials" },
];

export default function AdminMobileNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-2 overflow-x-auto border-b border-edgeline-border px-4 py-3 md:hidden">
      {LINKS.map((link) => {
        const isActive = pathname?.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`shrink-0 whitespace-nowrap border px-4 py-2 font-condensed text-xs uppercase tracking-wider transition-colors ${
              isActive
                ? "border-edgeline-red bg-edgeline-red text-edgeline-white"
                : "border-edgeline-border text-edgeline-white/70"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
