"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale, localeNames, locales } from "@/lib/localization/config";

function switchLocale(pathname: string, nextLocale: Locale) {
  const parts = pathname.split("/");
  parts[1] = nextLocale;
  return parts.join("/") || `/${nextLocale}`;
}

export function LocaleSwitcher({ locale, className = "" }: { locale: Locale; className?: string }) {
  const pathname = usePathname();

  return (
    <nav className={`locale-switcher ${className}`} aria-label={locale === "ru" ? "Выбор языка" : locale === "it" ? "Selezione lingua" : "Language selection"}>
      {locales.map((item) => (
        <Link
          key={item}
          href={switchLocale(pathname, item)}
          aria-current={item === locale ? "page" : undefined}
          className={`locale-switcher-pill ${item === locale ? "locale-switcher-pill-active" : ""}`}
        >
          {localeNames[item]}
        </Link>
      ))}
    </nav>
  );
}
