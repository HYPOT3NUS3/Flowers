import Link from "next/link";
import { navItems, siteSettings } from "@/content/site";
import { Locale, locales } from "@/lib/localization/config";
import { text } from "@/lib/localization/strings";

export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t border-[var(--border)] bg-porcelain/88 backdrop-blur">
      <div className="container-shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="brand-mark text-left">
            <span className="brand-wordmark">MUZA</span>
            <span className="brand-kicker">Flowers Boutique</span>
            <span className="brand-location">Lake Como</span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-7 text-graphite">
            {locale === "ru"
              ? "MUZA Lake Como. Авторская флористика, доставка, свадьбы, предложения и мастер-классы."
              : locale === "it"
                ? "MUZA Lake Como. Floristica editoriale, consegne, matrimoni, proposte e workshop."
                : "MUZA Lake Como. Editorial floristry, delivery, weddings, proposals and workshops."}
          </p>
        </div>
        <div>
          <p className="label">{locale === "ru" ? "Навигация" : locale === "it" ? "Navigazione" : "Navigation"}</p>
          <nav className="mt-4 grid gap-3 text-sm">
            {navItems.map((item) => (
              <Link key={item.href} href={`/${locale}${item.href}`}>{text(item.label, locale)}</Link>
            ))}
          </nav>
        </div>
        <div>
          <p className="label">{locale === "ru" ? "Контакты" : locale === "it" ? "Contatti" : "Contact"}</p>
          <div className="mt-4 grid gap-3 text-sm text-graphite">
            <a href={`mailto:${siteSettings.email}`}>{siteSettings.email}</a>
            <a href={siteSettings.whatsapp}>WhatsApp {siteSettings.telephone}</a>
            <span>{siteSettings.address}</span>
            <span>{siteSettings.openingHours}</span>
          </div>
        </div>
        <div>
          <p className="label">{locale === "ru" ? "Документы" : locale === "it" ? "Legale" : "Legal"}</p>
          <nav className="mt-4 grid gap-3 text-sm">
            <Link href={`/${locale}/terms`}>{locale === "ru" ? "Условия" : locale === "it" ? "Termini" : "Terms"}</Link>
            <Link href={`/${locale}/privacy`}>{locale === "ru" ? "Конфиденциальность" : locale === "it" ? "Privacy" : "Privacy"}</Link>
            <Link href={`/${locale}/cookies`}>Cookies</Link>
            <div className="flex gap-3 pt-3">
              {locales.map((item) => (
                <Link key={item} href={`/${item}`} className={item === locale ? "text-ink" : "text-graphite"}>
                  {item.toUpperCase()}
                </Link>
              ))}
            </div>
          </nav>
          <form className="mt-6">
            <label className="label" htmlFor="newsletter">Newsletter</label>
            <div className="field-shell mt-3 flex">
              <input id="newsletter" type="email" placeholder="email@example.com" className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm" />
              <button className="border-l border-[var(--border)] px-4 text-xs uppercase tracking-[0.12em]">OK</button>
            </div>
          </form>
        </div>
      </div>
    </footer>
  );
}
