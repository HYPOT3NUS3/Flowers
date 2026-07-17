"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Menu, Phone, Search, ShoppingBag, X } from "lucide-react";
import { useMemo, useState } from "react";
import { navItems, siteSettings } from "@/content/site";
import { Locale, localeNames, locales } from "@/lib/localization/config";
import { text } from "@/lib/localization/strings";
import { useCart, useCartTotals } from "@/components/cart/cart-store";
import { InstagramIcon } from "@/components/ui/instagram-icon";

function switchLocale(pathname: string, nextLocale: Locale) {
  const parts = pathname.split("/");
  parts[1] = nextLocale;
  return parts.join("/") || `/${nextLocale}`;
}

export function Header({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const openCart = useCart((state) => state.openDrawer);
  const { count } = useCartTotals();
  const links = useMemo(() => navItems.map((item) => ({ ...item, href: `/${locale}${item.href}` })), [locale]);
  const leftLinks = links.slice(0, 3);
  const rightLinks = links.slice(3);
  const labels = {
    openMenu: locale === "ru" ? "Открыть меню" : locale === "it" ? "Apri menu" : "Open menu",
    closeMenu: locale === "ru" ? "Закрыть меню" : locale === "it" ? "Chiudi menu" : "Close menu",
    home: locale === "ru" ? "MUZA, главная" : locale === "it" ? "MUZA, home" : "MUZA home",
    search: locale === "ru" ? "Поиск по каталогу" : locale === "it" ? "Cerca nel catalogo" : "Search catalogue",
    shoppingBag: locale === "ru" ? "Открыть корзину" : locale === "it" ? "Apri il carrello" : "Open cart",
    contacts: locale === "ru" ? "Контакты" : locale === "it" ? "Contatti" : "Contacts"
  };

  return (
    <>
      <div className="border-b border-[var(--border)] bg-porcelain/62 py-2 text-center text-[0.68rem] uppercase tracking-[0.18em] text-graphite backdrop-blur-xl">
        {text(siteSettings.announcement, locale)}
      </div>
      <header className="sticky top-0 z-40 px-3 py-2 lg:static lg:py-3">
        <div className="container-shell overflow-hidden rounded-[2rem] border border-[var(--border)] bg-porcelain/88 shadow-[0_18px_60px_rgba(22,22,22,0.08)] backdrop-blur-2xl">
          <div className="grid min-h-[78px] grid-cols-[auto_1fr_auto] items-center gap-3 px-4 md:min-h-[82px] md:px-6 lg:min-h-[104px] lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-5">
            <button className="flex min-h-11 min-w-11 items-center justify-center rounded-full transition hover:bg-ink hover:text-porcelain lg:hidden" aria-label={labels.openMenu} onClick={() => setOpen(true)}>
              <Menu size={22} />
            </button>

            <nav className="hidden min-w-0 items-center justify-start gap-1 lg:flex">
              {leftLinks.map((item) => (
                <Link key={item.href} href={item.href} className="whitespace-nowrap rounded-full px-3 py-2 text-[0.68rem] uppercase tracking-[0.13em] transition hover:bg-ink hover:text-porcelain xl:px-4">
                  {text(item.label, locale)}
                </Link>
              ))}
            </nav>

            <Link href={`/${locale}`} className="brand-mark justify-self-center px-2 py-2" aria-label={labels.home}>
              <span className="brand-wordmark brand-wordmark-header">MUZA</span>
              <span className="brand-kicker">Flowers Boutique</span>
              <span className="brand-location">Lake Como</span>
            </Link>

            <div className="flex min-w-0 items-center justify-end gap-1 lg:gap-2">
              <nav className="hidden min-w-0 items-center justify-end gap-1 lg:flex">
                {rightLinks.map((item) => (
                  <Link key={item.href} href={item.href} className="whitespace-nowrap rounded-full px-3 py-2 text-[0.68rem] uppercase tracking-[0.13em] transition hover:bg-ink hover:text-porcelain xl:px-4">
                    {text(item.label, locale)}
                  </Link>
                ))}
              </nav>
              <Link href={`/${locale}/shop`} className="hidden min-h-11 min-w-11 items-center justify-center rounded-full transition hover:bg-ink hover:text-porcelain md:flex" aria-label={labels.search}>
                <Search size={18} />
              </Link>
              <div className="hidden items-center gap-1 rounded-full border border-[var(--border)] bg-porcelain/65 px-2 py-1 xl:flex">
                {locales.map((item) => (
                  <Link
                    key={item}
                    href={switchLocale(pathname, item)}
                    className={`rounded-full px-2 py-1 text-xs uppercase tracking-[0.12em] transition ${item === locale ? "bg-ink text-porcelain" : "text-graphite hover:text-ink"}`}
                  >
                    {item}
                  </Link>
                ))}
              </div>
              <button className="relative flex min-h-11 min-w-11 items-center justify-center rounded-full transition hover:bg-ink hover:text-porcelain" aria-label={labels.shoppingBag} onClick={openCart}>
                <ShoppingBag size={20} />
                {count > 0 ? (
                  <span className="absolute right-0 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1 text-[0.65rem] text-porcelain">
                    {count}
                  </span>
                ) : null}
              </button>
            </div>
          </div>
        </div>
      </header>
      {open ? (
        <div className="mobile-menu-paper fixed inset-0 z-50 overflow-y-auto">
          <div className="container-shell flex min-h-[96px] items-center justify-between">
            <Link href={`/${locale}`} className="brand-mark" aria-label={labels.home} onClick={() => setOpen(false)}>
              <span className="brand-wordmark brand-wordmark-header">MUZA</span>
              <span className="brand-kicker">Flowers Boutique</span>
              <span className="brand-location">Lake Como</span>
            </Link>
            <button className="flex min-h-12 min-w-12 items-center justify-center rounded-full border border-[var(--border)] bg-porcelain/95 shadow-[0_12px_34px_rgba(22,22,22,0.08)] transition hover:bg-ink hover:text-porcelain" aria-label={labels.closeMenu} onClick={() => setOpen(false)}>
              <X />
            </button>
          </div>
          <nav className="container-shell mt-5 flex flex-col gap-3 pb-10">
            {links.map((item) => (
              <Link key={item.href} href={item.href} className="mobile-menu-link" onClick={() => setOpen(false)}>
                <span className="mobile-menu-text">{text(item.label, locale)}</span>
                <ChevronRight className="mobile-menu-arrow" size={19} />
              </Link>
            ))}
            <a href={siteSettings.instagramUrl} target="_blank" rel="noreferrer" className="mobile-menu-link mobile-menu-link-social">
              <span className="mobile-menu-icon"><InstagramIcon size={20} /></span>
              <span className="mobile-menu-text">Instagram</span>
              <ChevronRight className="mobile-menu-arrow" size={19} />
            </a>
            <Link href={`/${locale}/contact`} className="mobile-menu-link mobile-menu-link-social" onClick={() => setOpen(false)}>
              <span className="mobile-menu-icon"><Phone size={20} /></span>
              <span className="mobile-menu-text">{labels.contacts}</span>
              <ChevronRight className="mobile-menu-arrow" size={19} />
            </Link>
            <Link href={`/${locale}/contact?service=bespoke`} className="button-primary mt-5 w-full" onClick={() => setOpen(false)}>
              {locale === "ru" ? "Индивидуальный заказ" : locale === "it" ? "Ordine su misura" : "Bespoke order"}
            </Link>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {locales.map((item) => (
                <Link
                  key={item}
                  href={switchLocale(pathname, item)}
                  className={`mobile-locale-pill ${item === locale ? "mobile-locale-pill-active" : ""}`}
                  onClick={() => setOpen(false)}
                >
                  {localeNames[item]}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
}
