import Link from "next/link";
import { navItems, siteSettings } from "@/content/site";
import { Locale, locales } from "@/lib/localization/config";
import { text } from "@/lib/localization/strings";
import { BrandLogo } from "@/components/layout/brand-logo";

export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t border-[var(--border)] bg-porcelain">
      <div className="container-shell grid grid-cols-2 gap-x-4 gap-y-6 pb-24 pt-7 sm:gap-x-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:py-14">
        <div className="col-span-2 lg:col-span-1">
          <div className="brand-mark text-left">
            <BrandLogo className="brand-logo-footer" />
          </div>
          <p className="mt-3 max-w-sm text-sm leading-6 text-graphite">
            {locale === "ru"
              ? "Flowers Boutique. Авторская флористика, доставка, свадьбы, предложения и мастер-классы на озере Комо."
              : locale === "it"
                ? "Flowers Boutique. Floristica d'autore, consegne, matrimoni, proposte e workshop sul Lago di Como."
                : "Flowers Boutique. Artful floristry, delivery, weddings, proposals and workshops on Lake Como."}
          </p>
        </div>
        <div>
          <p className="label">{locale === "ru" ? "Навигация" : locale === "it" ? "Navigazione" : "Navigation"}</p>
          <nav className="mt-3 grid gap-1 text-sm [&_a]:flex [&_a]:min-h-10 [&_a]:items-center [&_a]:[overflow-wrap:anywhere] [&_a:hover]:underline">
            {navItems.map((item) => (
              <Link key={item.href} href={`/${locale}${item.href}`}>{text(item.label, locale)}</Link>
            ))}
          </nav>
        </div>
        <div>
          <p className="label">{locale === "ru" ? "Контакты" : locale === "it" ? "Contatti" : "Contact"}</p>
          <div className="mt-3 grid gap-2 text-sm text-graphite [&_a]:flex [&_a]:items-center [&_a]:min-h-10 [&_a]:[overflow-wrap:anywhere] [&_a:hover]:underline">
            <a href={`mailto:${siteSettings.email}`}>{siteSettings.email}</a>
            <a href={siteSettings.whatsapp}>WhatsApp {siteSettings.telephone}</a>
            <span>{text(siteSettings.address, locale)}</span>
            <span>{text(siteSettings.openingHours, locale)}</span>
          </div>
        </div>
        <div className="col-span-2 min-w-0 lg:col-span-1">
          <p className="label">{locale === "ru" ? "Документы" : locale === "it" ? "Legale" : "Legal"}</p>
          <nav className="mt-3 grid gap-1 text-sm [&_a]:flex [&_a]:min-h-10 [&_a]:items-center [&_a]:[overflow-wrap:anywhere] [&_a:hover]:underline">
            <Link href={`/${locale}/terms`}>{locale === "ru" ? "Условия" : locale === "it" ? "Termini" : "Terms"}</Link>
            <Link href={`/${locale}/privacy`}>{locale === "ru" ? "Конфиденциальность" : locale === "it" ? "Privacy" : "Privacy"}</Link>
            <Link href={`/${locale}/cookies`}>{locale === "ru" ? "Cookie" : locale === "it" ? "Cookie" : "Cookies"}</Link>
            <div className="flex gap-3 pt-3">
              {locales.map((item) => (
                <Link key={item} href={`/${item}`} hrefLang={item} aria-current={item === locale ? "true" : undefined} className={item === locale ? "text-ink" : "text-graphite"}>
                  {item.toUpperCase()}
                </Link>
              ))}
            </div>
          </nav>
          <form className="mt-5 max-w-sm">
            <label className="label" htmlFor="newsletter">{locale === "ru" ? "Рассылка" : locale === "it" ? "Newsletter" : "Newsletter"}</label>
            <div className="field-shell mt-3 flex">
              <input id="newsletter" type="email" placeholder="email@example.com" className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm" />
              <button className="min-h-11 min-w-11 border-l border-[var(--border)] px-4 text-xs uppercase tracking-[0.12em]">OK</button>
            </div>
          </form>
        </div>
        <p className="col-span-2 border-t border-[var(--border)] pt-4 text-xs leading-5 text-graphite lg:col-span-4">
          {/* Stand-in photographs from Wikimedia Commons: remove each credit when its photo is replaced. */}
          Photos: Jez Timms (CC0), Daniel Case (CC BY-SA 3.0), Susanne Nilsson (CC BY-SA 2.0), Alexandra Seinet (CC0), Ruth Hartnup (CC BY 2.0), Rodion Kutsaev (CC0), Kor!An (CC BY-SA 3.0), Jina Lee (CC BY-SA 3.0), Downtowngal (CC BY-SA 4.0), Alvin Mahmudov (CC0), George E. Koronaios (CC BY-SA 4.0), Megala Shankar (CC BY-SA 4.0), direct2Florist (CC BY 2.0), via{" "}
          <a href="https://commons.wikimedia.org" className="underline underline-offset-2">Wikimedia Commons</a>.
        </p>
      </div>
    </footer>
  );
}
