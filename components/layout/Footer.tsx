import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/inventory", label: "Inventory" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const SERVICE_LINKS = [
  { href: "/inventory", label: "Buy From Us" },
  { href: "/source-a-car", label: "We Find It" },
  { href: "/sell-your-car", label: "Sell To Us" },
];

const LEGAL_LINKS = [
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms of Service" },
  { href: "/admin/login", label: "Admin" },
];

export default function Footer() {
  return (
    <footer className="edge-accent-top bg-edgeline-black text-edgeline-white/70">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 md:grid-cols-4 md:px-8">
        <div className="col-span-2 md:col-span-1">
          <p className="font-display text-xl tracking-wide text-edgeline-white">
            EDGELINE <span className="text-edgeline-red">EXPORTS</span>
          </p>
          <p className="mt-3 font-body text-sm">Driven by Value.</p>
        </div>

        <div>
          <h3 className="font-condensed text-sm uppercase tracking-wider text-edgeline-white">Navigate</h3>
          <ul className="mt-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm hover:text-edgeline-red">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-condensed text-sm uppercase tracking-wider text-edgeline-white">Services</h3>
          <ul className="mt-4 space-y-2">
            {SERVICE_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm hover:text-edgeline-red">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-condensed text-sm uppercase tracking-wider text-edgeline-white">Contact</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>hello@edgelineexports.com</li>
            <li>(555) 010-9200</li>
            <li>Nationwide Delivery, USA</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-edgeline-border px-4 py-6 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-xs md:flex-row">
          <p>&copy; {new Date().getFullYear()} Edgeline Exports. All rights reserved.</p>
          <div className="flex gap-4">
            {LEGAL_LINKS.map((link) => (
              <Link key={link.label} href={link.href} className="hover:text-edgeline-red">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
