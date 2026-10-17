import Link from "next/link";
import Logo from "@/components/layout/Logo";
import { getTheme } from "@/lib/theme/server";
import { getLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/dictionary";

export default async function Footer() {
  const theme = await getTheme();
  const locale = await getLocale();
  const t = getDictionary(locale);

  const NAV_LINKS = [
    { href: "/", label: t.footer.home },
    { href: "/inventory", label: t.nav.inventory },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  const SERVICE_LINKS = [
    { href: "/inventory", label: t.footer.buyFromUs },
    { href: "/source-a-car", label: t.footer.weFindIt },
    { href: "/sell-your-car", label: t.footer.sellToUs },
  ];

  const LEGAL_LINKS = [
    { href: "#", label: t.footer.privacyPolicy },
    { href: "#", label: t.footer.termsOfService },
  ];

  return (
    <footer className="edge-accent-top bg-surface text-surface-foreground/70">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 md:grid-cols-4 md:px-8">
        <div className="col-span-2 md:col-span-1">
          <Logo variant={theme === "dark" ? "dark" : "light"} className="h-16 w-auto" />
          <p className="mt-3 font-accent text-xl text-edgeline-red">{t.footer.tagline}</p>
        </div>

        <div>
          <h3 className="font-condensed text-sm uppercase tracking-wider text-surface-foreground">
            {t.footer.navigate}
          </h3>
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
          <h3 className="font-condensed text-sm uppercase tracking-wider text-surface-foreground">
            {t.footer.services}
          </h3>
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
          <h3 className="font-condensed text-sm uppercase tracking-wider text-surface-foreground">
            {t.footer.contact}
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>edgelineexports@gmail.com</li>
            <li>(506) 232-4862</li>
            <li>(506) 227-2923</li>
            <li>{t.footer.nationwideDelivery}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-theme-border px-4 py-6 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-xs md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} Edgeline Exports. {t.footer.rightsReserved}
          </p>
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
