import CarLoader from "@/components/ui/CarLoader";
import { getLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/dictionary";

export default async function Loading() {
  const locale = await getLocale();
  const t = getDictionary(locale);

  return (
    <div className="bg-surface text-surface-foreground">
      <CarLoader label={t.loading.label} />
    </div>
  );
}
