export const locales = ["ru", "en", "it"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ru";

export const localeNames: Record<Locale, string> = {
  ru: "RU",
  en: "EN",
  it: "IT"
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
