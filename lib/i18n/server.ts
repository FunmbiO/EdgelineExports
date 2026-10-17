import "server-only";
import { cookies } from "next/headers";
import { defaultLocale, type Locale } from "./dictionary";

export const LOCALE_COOKIE = "locale";

export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  return store.get(LOCALE_COOKIE)?.value === "fr" ? "fr" : defaultLocale;
}
