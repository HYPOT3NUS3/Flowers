import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { BudgetFilter } from "@/components/shop/budget-filter";
import { ProductCard } from "@/components/shop/product-card";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { EventCard } from "@/components/events/event-card";
import { InstagramGrid } from "@/components/home/instagram-grid";
import { ParallaxPhoto } from "@/components/motion/parallax-photo";
import { products } from "@/content/products/products";
import { upcomingEvents } from "@/content/events/events";
import { homeCopy, services, siteSettings } from "@/content/site";
import { Locale } from "@/lib/localization/config";
import { text } from "@/lib/localization/strings";

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const featured = products.filter((product) => product.featured).slice(0, 4);
  const events = upcomingEvents().slice(0, 3);

  return (
    <>
      <section className="home-hero border-b border-[var(--border)]">
        <div className="container-shell grid gap-5 py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:grid-rows-[1fr_auto_1fr] md:gap-x-12 md:gap-y-6 md:py-14 lg:py-16">
          <h1 data-enter className="editorial-title max-w-[16ch] md:col-start-1 md:row-start-2">{text(homeCopy.heroTitle, locale)}</h1>
          {/* Stand-in photograph (Wikimedia Commons, CC0): replace with the boutique's own hero shot. */}
          <div data-enter className="hero-photo photo-frame relative aspect-[4/3] overflow-hidden rounded-xl md:col-start-2 md:row-span-3 md:row-start-1 md:aspect-auto md:h-[calc(100svh-15rem)] md:min-h-[420px] md:max-h-[760px]">
            <Image
              src="/assets/photos/photo-f61734439.jpg"
              alt={locale === "ru" ? "Букет пастельных роз" : locale === "it" ? "Bouquet di rose pastello" : "Bouquet of pastel roses"}
              fill
              priority
              sizes="(max-width: 767px) calc(100vw - 2rem), 52vw"
              className="object-cover"
            />
          </div>
          <div data-enter className="min-w-0 md:col-start-1 md:row-start-3 md:self-start">
            <p className="max-w-md text-base leading-7 text-graphite lg:text-lg">{text(homeCopy.heroText, locale)}</p>
            <div className="mt-5 grid max-w-sm gap-2.5 sm:flex sm:max-w-none sm:flex-wrap">
              <Link href={`/${locale}/shop`} className="button-primary">{locale === "ru" ? "Смотреть коллекции" : locale === "it" ? "Scopri le collezioni" : "View collections"}</Link>
              <Link href={`/${locale}/contact?service=bespoke`} className="button-secondary">{locale === "ru" ? "Индивидуальный заказ" : locale === "it" ? "Ordine su misura" : "Bespoke order"}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell section-pad">
        <h2 className="section-title editorial-italic max-w-3xl">
          {locale === "ru" ? "Искусство флористики для событий, которые остаются в сердце." : locale === "it" ? "L'arte floreale per momenti che restano nel cuore." : "The art of floristry for moments that stay in the heart."}
        </h2>
        <p className="mt-4 max-w-xl text-graphite">{t("signatureText")}</p>
        <div className="product-grid mt-7 md:mt-10 text-left">
          {featured.map((product) => <ProductCard key={product.id} product={product} locale={locale} />)}
        </div>
      </section>

      <BudgetFilter locale={locale} title={t("budgetTitle")} />

      <section className="studio-story-band section-pad">
        <div className="container-shell grid gap-6 md:grid-cols-2 md:gap-12">
          <div>
            <p className="label text-toile">{t("philosophyLabel")}</p>
            <p className="editorial-note mt-3 max-w-3xl">{text(homeCopy.philosophy, locale).split("\n\n")[0]}</p>
          </div>
          <div className="border-t border-[var(--border)] pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-0">
            <p className="label text-toile">{t("missionLabel")}</p>
            <p className="editorial-note mt-3">{text(homeCopy.mission, locale)}</p>
          </div>
        </div>
      </section>

      <section className="container-shell section-pad">
        <h2 className="section-title editorial-italic">{t("servicesLabel")}</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Link key={service.slug} href={`/${locale}${service.href}`} className="surface-panel lift-card rounded-xl p-4 md:p-6">
              <h3 className="item-title break-words">{text(service.title, locale)}</h3>
              <p className="mt-2.5 text-sm leading-6 text-graphite">{text(service.body, locale)}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bespoke-band section-pad">
        <div className="container-shell grid gap-5 md:grid-cols-[0.78fr_1.22fr] md:gap-10 md:items-start">
          <div className="md:pt-2">
            <h2 className="section-title editorial-italic">{t("bespokeTitle")}</h2>
          </div>
          <EnquiryForm locale={locale} />
        </div>
      </section>

      {events.length > 0 && (
      <section className="container-shell section-pad">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="section-title editorial-italic">{t("eventsTitle")}</h2>
          </div>
          <Link href={`/${locale}/events/archive`} className="button-secondary">
            {locale === "ru" ? "Как это было" : locale === "it" ? "Eventi passati" : "Past events"}
          </Link>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {events.map((event) => <EventCard key={event.id} event={event} locale={locale} />)}
        </div>
      </section>
      )}

      <section className="relative isolate overflow-hidden bg-ink text-porcelain">
        {/* Stand-in photograph (Wikimedia Commons, Daniel Case, CC BY-SA 3.0). */}
        <ParallaxPhoto className="absolute inset-0 -z-10 will-change-transform">
          <Image src="/assets/photos/photo-f70892910.jpg" alt="" fill sizes="100vw" className="object-cover opacity-55" />
        </ParallaxPhoto>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-[rgba(22,22,22,0.88)] via-[rgba(22,22,22,0.55)] to-[rgba(22,22,22,0.2)]" />
        <div className="container-shell grid min-h-[70svh] gap-6 py-10 md:min-h-[520px] md:gap-8 md:py-16 md:grid-cols-[1.1fr_0.9fr] md:items-end content-end">
          <div>
            <h2 className="section-title editorial-italic">{t("weddingTitle")}</h2>
          </div>
          <div>
            <p className="max-w-xl leading-7 text-powder">{t("weddingText")}</p>
            <Link href={`/${locale}/weddings`} className="button-secondary button-on-dark mt-5">
              {t("weddingCta")}
            </Link>
          </div>
        </div>
      </section>

      <section className="container-shell section-pad">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="section-title editorial-italic">{t("instagram")}</h2>
          <a href={siteSettings.instagramUrl} className="button-secondary">Instagram</a>
        </div>
        <InstagramGrid />
      </section>

      <section className="border-t border-[var(--border)] bg-porcelain py-9 md:py-16">
        <div className="container-shell grid gap-6 md:grid-cols-[0.7fr_1.3fr] md:items-center">
          <h2 className="section-title editorial-italic">{t("deliveryTitle")}</h2>
          <div>
            <p className="max-w-[62ch] leading-8 text-graphite [text-wrap:pretty]">{t("deliveryText")}</p>
            <Link href={`/${locale}/delivery`} className="button-secondary mt-6">
              {locale === "ru" ? "Условия доставки" : locale === "it" ? "Dettagli consegna" : "Delivery details"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
