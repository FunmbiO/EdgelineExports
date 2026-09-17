import Link from "next/link";
import type { InventoryFilter } from "@/types/vehicle";

export default function Pagination({
  page,
  totalPages,
  filter,
}: {
  page: number;
  totalPages: number;
  filter: InventoryFilter;
}) {
  if (totalPages <= 1) return null;

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
        <Link href={hrefFor(page - 1)} className="text-edgeline-white/70 hover:text-edgeline-red">
          ← Prev
        </Link>
      ) : (
        <span className="text-edgeline-white/20">← Prev</span>
      )}

      <span className="text-edgeline-white/50">
        Page {page} of {totalPages}
      </span>

      {page < totalPages ? (
        <Link href={hrefFor(page + 1)} className="text-edgeline-white/70 hover:text-edgeline-red">
          Next →
        </Link>
      ) : (
        <span className="text-edgeline-white/20">Next →</span>
      )}
    </nav>
  );
}
