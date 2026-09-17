import Link from "next/link";

const LINKS = [
  { href: "/admin/inventory", label: "Inventory" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/submissions", label: "Submissions" },
];

export default function AdminSidebar() {
  return (
    <aside className="hidden w-56 shrink-0 border-r border-edgeline-border md:block">
      <div className="p-6">
        <p className="font-display text-xl text-edgeline-white">
          EDGELINE <span className="text-edgeline-red">EXPORTS</span>
        </p>
        <p className="mt-1 font-condensed text-xs uppercase tracking-wider text-edgeline-white/40">
          Admin
        </p>
      </div>
      <nav className="px-4">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block px-2 py-3 font-condensed text-sm uppercase tracking-wider text-edgeline-white/70 hover:text-edgeline-red"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
