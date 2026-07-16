import { Locale } from "./config";

export type LocalizedText = {
  ru: string;
  en: string;
  it: string;
};

export function text(value: LocalizedText, locale: Locale) {
  return value[locale] || value.ru;
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-EU", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(value);
}

export function formatDate(date: string, locale: Locale) {
  const map: Record<Locale, string> = {
    ru: "ru-RU",
    en: "en-GB",
    it: "it-IT"
  };
  return new Intl.DateTimeFormat(map[locale], {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(new Date(date));
}
