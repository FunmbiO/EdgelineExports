import Link from "next/link";
import type { InventoryFilter } from "@/types/vehicle";
import { getLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/dictionary";

export default async function Pagination({
  page,
  totalPages,
  filter,
}: {
  page: number;
  totalPages: number;
  filter: InventoryFilter;
}) {
  if (totalPages <= 1) return null;

  const locale = await getLocale();
  const t = getDictionary(locale);

  const hrefFor = (targetPage: number) => {
    const params = new URLSearchParams();
    if (filter !== "all") params.set("filter", filter);
    if (targetPage > 1) params.set("page", String(targetPage));
    const query = params.toString();
    return query ? `/inventory?${query}` : "/inventory";
  };

  return (
    <nav className="mt-10 flex items-center justify-center gap-4 font-condensed text-sm uppercase tracking-wider">
      {page > 1 ? (
        <Link href={hrefFor(page - 1)} className="text-surface-foreground/70 hover:text-edgeline-red">
          {t.inventory.prev}
        </Link>
      ) : (
        <span className="text-surface-foreground/20">{t.inventory.prev}</span>
      )}

      <span className="text-surface-foreground/50">
        {t.inventory.pageOf.replace("{page}", String(page)).replace("{total}", String(totalPages))}
      </span>

      {page < totalPages ? (
        <Link href={hrefFor(page + 1)} className="text-surface-foreground/70 hover:text-edgeline-red">
          {t.inventory.next}
        </Link>
      ) : (
        <span className="text-surface-foreground/20">{t.inventory.next}</span>
      )}
    </nav>
  );
}
