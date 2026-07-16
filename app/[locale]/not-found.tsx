"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { isLocale, Locale } from "@/lib/localization/config";

export default function LocaleNotFound() {
  const params = useParams<{ locale?: string | string[] }>();
  const rawLocale = Array.isArray(params.locale) ? params.locale[0] : params.locale;
  const locale: Locale = isLocale(rawLocale || "") ? rawLocale as Locale : "ru";

  return (
    <main className="grid min-h-screen place-items-center bg-ivory px-6 text-center">
      <div>
        <p className="label">404</p>
        <h1 className="serif mt-4 text-6xl">
          {locale === "ru" ? "Страница не найдена" : locale === "it" ? "Pagina non trovata" : "Page not found"}
        </h1>
        <Link href={`/${locale}`} className="button-primary mt-8">
          {locale === "ru" ? "На главную" : locale === "it" ? "Torna alla home" : "Return home"}
        </Link>
      </div>
    </main>
  );
}
