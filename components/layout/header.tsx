"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Menu, Phone, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { navItems, siteSettings } from "@/content/site";
import { Locale, localeNames, locales } from "@/lib/localization/config";
import { text } from "@/lib/localization/strings";
import { useCart, useCartTotals } from "@/components/cart/cart-store";
import { InstagramIcon } from "@/components/ui/instagram-icon";
import { BrandLogo } from "@/components/layout/brand-logo";

function switchLocale(pathname: string, nextLocale: Locale) {
  const parts = pathname.split("/");
  parts[1] = nextLocale;
  return parts.join("/") || `/${nextLocale}`;
}

export function Header({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    if (open && !menu.open) menu.showModal();
    if (!open && menu.open) menu.close();
  }, [open]);
  const openCart = useCart((state) => state.openDrawer);
  const { count } = useCartTotals();
  const links = useMemo(() => navItems.map((item) => ({ ...item, href: `/${locale}${item.href}` })), [locale]);
  const leftLinks = links.slice(0, 3);
  const rightLinks = links.slice(3);
  const labels = {
    openMenu: locale === "ru" ? "Открыть меню" : locale === "it" ? "Apri menu" : "Open menu",
    closeMenu: locale === "ru" ? "Закрыть меню" : locale === "it" ? "Chiudi menu" : "Close menu",
    home: locale === "ru" ? "Flowers Boutique, главная" : locale === "it" ? "Flowers Boutique, home" : "Flowers Boutique home",
    search: locale === "ru" ? "Поиск по каталогу" : locale === "it" ? "Cerca nel catalogo" : "Search catalogue",
    shoppingBag: locale === "ru" ? "Открыть корзину" : locale === "it" ? "Apri il carrello" : "Open cart",
    contacts: locale === "ru" ? "Контакты" : locale === "it" ? "Contatti" : "Contacts"
  };

  return (
    <>
      <div className="border-b border-[var(--border)] bg-porcelain px-4 py-1.5 text-center text-xs uppercase tracking-[0.1em] text-graphite">
        {text(siteSettings.announcement, locale)}
      </div>
      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-porcelain min-[1120px]:static">
        <div className="container-shell">
          <div className="grid min-h-[54px] grid-cols-[1fr_auto_1fr] items-center gap-1 md:min-h-[64px] md:gap-3 min-[1120px]:min-h-[76px] min-[1120px]:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] min-[1120px]:gap-3 xl:gap-5">
            <button className="flex min-h-11 min-w-11 items-center justify-center justify-self-start rounded-full transition hover:bg-ink hover:text-porcelain min-[1120px]:hidden" aria-label={labels.openMenu} aria-expanded={open} aria-haspopup="dialog" aria-controls="mobile-navigation" onClick={() => setOpen(true)}>
              <Menu size={22} />
            </button>

            <nav className="hidden min-w-0 items-center justify-start gap-0.5 min-[1120px]:flex xl:gap-1">
              {leftLinks.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-full px-2 py-2 text-center text-xs leading-snug uppercase tracking-[0.07em] transition hover:bg-ink hover:text-porcelain">
                  {text(item.label, locale)}
                </Link>
              ))}
            </nav>

            <Link href={`/${locale}`} className="brand-mark min-h-11 items-center justify-self-center px-1" aria-label={labels.home}>
              <BrandLogo className="brand-logo-header" />
            </Link>

            <div className="flex min-w-0 items-center justify-end gap-1 min-[1120px]:gap-2">
              <nav className="hidden min-w-0 items-center justify-end gap-0.5 min-[1120px]:flex xl:gap-1">
                {rightLinks.map((item) => (
                  <Link key={item.href} href={item.href} className="rounded-full px-2 py-2 text-center text-xs leading-snug uppercase tracking-[0.07em] transition hover:bg-ink hover:text-porcelain">
                    {text(item.label, locale)}
                  </Link>
                ))}
              </nav>
              <Link href={`/${locale}/shop?search=1`} className="hidden min-h-11 min-w-11 items-center justify-center rounded-full transition hover:bg-ink hover:text-porcelain md:flex" aria-label={labels.search}>
                <Search size={18} />
              </Link>
              <div className="hidden items-center gap-1 rounded-full border border-[var(--border)] bg-porcelain/65 px-2 py-1 min-[1120px]:flex">
                {locales.map((item) => (
                  <Link
                    key={item}
                    href={switchLocale(pathname, item)}
                    hrefLang={item}
                    aria-current={item === locale ? "page" : undefined}
                    className={`rounded-full px-1.5 py-1 text-xs uppercase tracking-[0.07em] transition ${item === locale ? "bg-ink text-porcelain" : "text-graphite hover:text-ink"}`}
                  >
                    {item}
                  </Link>
                ))}
              </div>
              <button className="relative flex min-h-11 min-w-11 items-center justify-center rounded-full transition hover:bg-ink hover:text-porcelain" aria-label={labels.shoppingBag} onClick={openCart}>
                <ShoppingBag size={20} />
                {count > 0 ? (
                  <span key={count} className="cart-badge absolute right-0 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1 text-[0.6875rem] tabular-nums text-porcelain">
                    {count}
                  </span>
                ) : null}
              </button>
            </div>
          </div>
        </div>
      </header>
      <dialog ref={menuRef} id="mobile-navigation" data-lenis-prevent aria-label={labels.openMenu} onCancel={(event) => { event.preventDefault(); setOpen(false); }} onClose={() => setOpen(false)} className="mobile-menu-paper fixed inset-0 m-0 h-[100dvh] max-h-none w-full max-w-none overflow-y-auto overscroll-contain">
        <div className="container-shell flex min-h-[62px] items-center justify-between">
          <Link href={`/${locale}`} className="brand-mark" aria-label={labels.home} onClick={() => setOpen(false)}>
            <BrandLogo className="brand-logo-header" />
          </Link>
          <button className="flex min-h-12 min-w-12 items-center justify-center rounded-full border border-[var(--border)] bg-porcelain/95 transition hover:bg-ink hover:text-porcelain" aria-label={labels.closeMenu} autoFocus onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>
        <nav className="container-shell mt-2 flex flex-col gap-2.5 pb-10">
          <div className="mb-2 grid grid-cols-3 gap-3">
            {locales.map((item) => (
              <Link
                key={item}
                href={switchLocale(pathname, item)}
                hrefLang={item}
                aria-current={item === locale ? "page" : undefined}
                className={`mobile-locale-pill ${item === locale ? "mobile-locale-pill-active" : ""}`}
                onClick={() => setOpen(false)}
              >
                {localeNames[item]}
              </Link>
            ))}
          </div>
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
        </nav>
      </dialog>
    </>
  );
}
