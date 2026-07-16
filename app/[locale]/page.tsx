import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { BudgetFilter } from "@/components/shop/budget-filter";
import { ProductCard } from "@/components/shop/product-card";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { EventCard } from "@/components/events/event-card";
import { InstagramGrid } from "@/components/home/instagram-grid";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { ProductImage } from "@/components/ui/product-image";
import { products } from "@/content/products/products";
import { upcomingEvents } from "@/content/events/events";
import { homeCopy, services } from "@/content/site";
import { Locale } from "@/lib/localization/config";
import { text } from "@/lib/localization/strings";

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const featured = products.filter((product) => product.featured).slice(0, 4);
  const events = upcomingEvents().slice(0, 3);

  return (
    <>
      <section className="botanical-paper border-b border-[var(--border)]">
        <div className="container-shell grid min-h-[78svh] items-center gap-10 py-14 md:grid-cols-[1.05fr_0.95fr]">
          <div className="hero-copy mx-auto max-w-3xl text-center md:-mt-36 md:text-left">
            <LocaleSwitcher locale={locale} className="hero-locale-switch mx-auto mb-7" />
            <div className="brand-mark hero-brand mx-auto mb-4 md:mx-0">
              <span className="brand-wordmark brand-wordmark-small">MUZA</span>
              <span className="brand-kicker">Flowers Boutique</span>
              <span className="brand-location">Lake Como</span>
            </div>
            <h1 className="editorial-title">{text(homeCopy.heroTitle, locale)}</h1>
            <p className="mt-4 max-w-xl text-lg leading-8 text-graphite">{text(homeCopy.heroText, locale)}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href={`/${locale}/shop`} className="button-primary">{locale === "ru" ? "Смотреть коллекции" : locale === "it" ? "Scopri le collezioni" : "View collections"}</Link>
              <Link href={`/${locale}/contact?service=bespoke`} className="button-secondary">{locale === "ru" ? "Индивидуальный заказ" : locale === "it" ? "Ordine su misura" : "Bespoke order"}</Link>
            </div>
          </div>
          <div className="glass-panel hidden aspect-[4/5] overflow-hidden md:block">
            <ProductImage src="/assets/products/generated/white-villa-arrangement.png" alt="Bellagio Garden bouquet" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="container-shell section-pad text-center">
        <p className="label text-toile">{t("signature")}</p>
        <h2 className="serif mx-auto mt-4 max-w-3xl text-5xl leading-none md:text-7xl">
          {locale === "ru" ? "Цветы для озера, виллы и момента." : locale === "it" ? "Fiori per il lago, la villa, il momento." : "Flowers for the lake, the villa, the moment."}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-graphite">{t("signatureText")}</p>
        <div className="product-grid mt-12 text-left">
          {featured.map((product) => <ProductCard key={product.id} product={product} locale={locale} />)}
        </div>
      </section>

      <BudgetFilter locale={locale} title={t("budgetTitle")} />

      <section className="studio-story-band section-pad">
        <div className="container-shell grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div className="lift-card aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-powder">
            <ProductImage src="/assets/editorial/generated/villa-interior.png" alt="Lake Como villa floral atmosphere" />
          </div>
          <div>
            <p className="label text-toile">{t("philosophyLabel")}</p>
            <p className="serif mt-6 max-w-3xl text-3xl leading-tight md:text-5xl">{text(homeCopy.philosophy, locale).split("\n\n")[0]}</p>
          </div>
        </div>
        <div className="container-shell mt-10 grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
          <div className="hidden md:block" aria-hidden="true" />
          <div className="studio-mission-panel">
            <p className="label text-toile">{t("missionLabel")}</p>
            <p className="serif mt-5 text-4xl leading-tight md:text-6xl">{text(homeCopy.mission, locale)}</p>
          </div>
        </div>
      </section>

      <section className="container-shell section-pad">
        <p className="label text-toile">{t("servicesLabel")}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {services.map((service) => (
            <Link key={service.slug} href={`/${locale}${service.href}`} className="surface-panel lift-card p-6">
              <h3 className="serif text-3xl leading-none">{text(service.title, locale)}</h3>
              <p className="mt-5 line-clamp-3 text-sm leading-7 text-graphite">{text(service.body, locale)}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bespoke-band section-pad">
        <div className="container-shell grid gap-10 md:grid-cols-[0.78fr_1.22fr] md:items-start">
          <div className="md:pt-2">
            <p className="label text-toile">{locale === "ru" ? "Индивидуально" : locale === "it" ? "Su misura" : "Bespoke"}</p>
            <h2 className="serif mt-4 text-5xl leading-none md:text-7xl">{t("bespokeTitle")}</h2>
          </div>
          <EnquiryForm locale={locale} />
        </div>
      </section>

      <section className="container-shell section-pad">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label text-toile">{locale === "ru" ? "Календарь" : locale === "it" ? "Calendario" : "Schedule"}</p>
            <h2 className="serif mt-4 text-5xl leading-none md:text-7xl">{t("eventsTitle")}</h2>
          </div>
          <Link href={`/${locale}/events/archive`} className="button-secondary">
            {locale === "ru" ? "Как это было" : locale === "it" ? "Eventi passati" : "Past events"}
          </Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {events.length ? events.map((event) => <EventCard key={event.id} event={event} locale={locale} />) : (
            <p>{locale === "ru" ? "Ближайших мероприятий пока нет." : locale === "it" ? "Non ci sono eventi in programma." : "No upcoming events."}</p>
          )}
        </div>
      </section>

      <section className="bg-ink text-porcelain">
        <div className="container-shell grid min-h-[620px] gap-8 py-16 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <p className="label text-powder">{locale === "ru" ? "Озеро Комо" : locale === "it" ? "Lago di Como" : "Lake Como"}</p>
            <h2 className="serif mt-4 text-6xl leading-none md:text-8xl">{t("weddingTitle")}</h2>
            <p className="mt-6 max-w-xl leading-8 text-powder">{t("weddingText")}</p>
            <Link href={`/${locale}/weddings`} className="button-secondary button-on-dark mt-8">
              {t("weddingCta")}
            </Link>
          </div>
          <div className="aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-porcelain/20 bg-powder shadow-2xl">
            <ProductImage src="/assets/editorial/generated/wedding-terrace.png" alt="Wedding floristry at Lake Como villa" />
          </div>
        </div>
      </section>

      <section className="container-shell section-pad">
        <p className="label text-toile">{t("instagram")}</p>
        <div className="mt-8">
          <InstagramGrid />
        </div>
      </section>

      <section className="border-t border-[var(--border)] bg-porcelain/86 py-16 backdrop-blur">
        <div className="container-shell grid gap-6 md:grid-cols-[0.7fr_1.3fr] md:items-center">
          <h2 className="serif text-5xl leading-none">{t("deliveryTitle")}</h2>
          <div>
            <p className="leading-8 text-graphite">{t("deliveryText")}</p>
            <Link href={`/${locale}/delivery`} className="button-secondary mt-6">
              {locale === "ru" ? "Условия доставки" : locale === "it" ? "Dettagli consegna" : "Delivery details"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
