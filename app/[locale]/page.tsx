import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { BudgetFilter } from "@/components/shop/budget-filter";
import { ProductCard } from "@/components/shop/product-card";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { EventCard } from "@/components/events/event-card";
import { InstagramGrid } from "@/components/home/instagram-grid";
import { ParallaxPhoto } from "@/components/motion/parallax-photo";
import { HeroTitle } from "@/components/motion/hero-title";
import { MobileOrderBar } from "@/components/home/mobile-order-bar";
import { ServiceTiles } from "@/components/services/service-tiles";
import { MarqueeBand } from "@/components/home/marquee-band";
import { products } from "@/content/products/products";
import { upcomingEvents } from "@/content/events/events";
import { photos } from "@/content/photos";
import { homeCopy, services, siteSettings } from "@/content/site";
import { Locale } from "@/lib/localization/config";
import { text } from "@/lib/localization/strings";

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const featured = products.filter((product) => product.featured).slice(0, 4);
  const events = upcomingEvents().slice(0, 3);
  const pick = (ru: string, en: string, it: string) => (locale === "ru" ? ru : locale === "it" ? it : en);
  const shopLabel = pick("Смотреть коллекции", "View collections", "Scopri le collezioni");

  return (
    <>
      {/* 1. Hero: the photograph bleeds to the screen edge; on phones it fills the first screen. */}
      <section className="home-hero relative isolate grid min-h-[calc(100svh-6.75rem)] md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div data-enter className="hero-photo absolute inset-0 -z-10 overflow-hidden md:relative md:inset-auto md:z-0 md:col-start-2 md:row-start-1">
          <Image
            src={photos.hero}
            alt={pick("Цветы у окна виллы на озере Комо", "Flowers by a villa window on Lake Como", "Fiori alla finestra di una villa sul Lago di Como")}
            fill
            priority
            sizes="(max-width: 767px) 100vw, 53vw"
            className="object-cover object-[50%_40%]"
          />
          <div aria-hidden="true" className="hero-scrim absolute inset-0 md:hidden" />
        </div>
        <div className="hero-copy flex flex-col justify-end px-4 pb-24 pt-40 text-porcelain md:col-start-1 md:row-start-1 md:justify-center md:py-16 md:pr-12 md:text-ink">
          <HeroTitle text={text(homeCopy.heroTitle, locale)} accent={pick("озере Комо", "Lake Como", "Lago di Como")} className="editorial-title hero-title max-w-[11ch]" />
          <div data-enter className="hero-actions mt-6 max-w-md md:mt-8">
            <p className="text-base leading-7 text-[rgba(253,251,246,0.88)] md:text-lg md:text-graphite">{text(homeCopy.heroText, locale)}</p>
            <div className="mt-6 grid gap-2.5 sm:flex sm:flex-wrap">
              <Link href={`/${locale}/shop`} className="button-primary">{shopLabel}</Link>
              <Link href={`/${locale}/contact?service=bespoke`} className="button-secondary hero-secondary">
                {pick("Индивидуальный заказ", "Bespoke order", "Ordine su misura")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <MarqueeBand
        words={[...services.map((service) => text(service.title, locale)), pick("Озеро Комо", "Lake Como", "Lago di Como")]}
        pauseLabel={pick("Остановить бегущую строку", "Pause the moving text", "Metti in pausa il testo")}
        playLabel={pick("Запустить бегущую строку", "Play the moving text", "Riproduci il testo")}
      />

      {/* 2. Services as photographs: one tile per thing the studio does. */}
      <section className="container-shell section-pad">
        <h2 data-reveal="lines" className="section-title max-w-[18ch]">{t("servicesLabel")}</h2>
        <div className="mt-8 md:mt-12">
          <ServiceTiles locale={locale} />
        </div>
      </section>

      {/* 3. Signature collection. */}
      <section className="border-t border-[var(--border)] bg-porcelain">
        <div className="container-shell section-pad">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 data-reveal="lines" className="section-title max-w-[20ch]">
                {pick("Искусство флористики для событий, которые остаются в сердце.", "The art of floristry for moments that stay in the heart.", "L'arte floreale per momenti che restano nel cuore.")}
              </h2>
              <p className="mt-4 max-w-xl text-graphite">{t("signatureText")}</p>
            </div>
            <Link href={`/${locale}/shop`} className="text-link shrink-0 self-start md:self-auto">{shopLabel}</Link>
          </div>
          <div data-reveal="stagger" className="product-grid mt-8 text-left md:mt-12">
            {featured.map((product) => <ProductCard key={product.id} product={product} locale={locale} />)}
          </div>
        </div>
      </section>

      <BudgetFilter locale={locale} title={t("budgetTitle")} />

      {/* 4. Studio: a large photograph beside the philosophy, set like a magazine page. */}
      <section className="section-pad">
        <div className="container-shell grid items-center gap-8 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-16">
          <div data-reveal="image" className="photo-frame relative aspect-[4/3] overflow-hidden rounded-[0.6rem] md:aspect-[5/4]">
            <Image src={photos.studio} alt={pick("Флорист собирает букет", "A florist arranging a bouquet", "Una fiorista compone un bouquet")} fill sizes="(max-width: 767px) 100vw, 56vw" className="object-cover" />
          </div>
          <div>
            <h2 data-reveal="lines" className="section-title">{t("philosophyLabel")}</h2>
            <p className="editorial-note mt-6">{text(homeCopy.philosophy, locale).split("\n\n")[0]}</p>
            <div className="mt-8 border-t border-[var(--border)] pt-6">
              <h3 className="text-sm font-medium uppercase tracking-[0.12em] text-toile">{t("missionLabel")}</h3>
              <p className="mt-2 text-lg leading-8 text-graphite">{text(homeCopy.mission, locale)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Weddings: the page's one scroll moment (the photo drifts inside its half). */}
      <section className="grid bg-[var(--toile-deep)] text-porcelain md:grid-cols-2">
        <div className="relative min-h-[62svh] overflow-hidden md:min-h-[760px]">
          <ParallaxPhoto className="absolute inset-0 will-change-transform">
            <Image src={photos.weddings} alt="" fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover" />
          </ParallaxPhoto>
        </div>
        <div className="flex flex-col justify-center px-4 py-14 md:px-16 md:py-20 lg:px-24">
          <h2 data-reveal="lines" className="section-title max-w-[12ch] !text-porcelain">{t("weddingTitle")}</h2>
          <p className="mt-6 max-w-md text-lg leading-8 text-[rgba(253,251,246,0.82)]">{t("weddingText")}</p>
          <Link href={`/${locale}/weddings`} className="button-secondary button-on-dark mt-8 self-start">
            {t("weddingCta")}
          </Link>
        </div>
      </section>

      {/* 6. Bespoke enquiry. */}
      <section className="bespoke-band section-pad">
        <div className="container-shell grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-16 md:items-start">
          <h2 data-reveal="lines" className="section-title max-w-[14ch]">{t("bespokeTitle")}</h2>
          <EnquiryForm locale={locale} />
        </div>
      </section>

      {events.length > 0 && (
        <section className="container-shell section-pad">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 data-reveal="lines" className="section-title">{t("eventsTitle")}</h2>
            <Link href={`/${locale}/events/archive`} className="text-link">
              {pick("Как это было", "Past events", "Eventi passati")}
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {events.map((event) => <EventCard key={event.id} event={event} locale={locale} />)}
          </div>
        </section>
      )}

      <section className="container-shell section-pad">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 data-reveal="lines" className="section-title">{t("instagram")}</h2>
          <a href={siteSettings.instagramUrl} className="text-link">{siteSettings.instagram}</a>
        </div>
        <InstagramGrid />
      </section>

      <section className="border-t border-[var(--border)] bg-porcelain py-14 md:py-20">
        <div className="container-shell grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-16">
          <h2 data-reveal="lines" className="section-title">{t("deliveryTitle")}</h2>
          <div>
            <p className="max-w-[62ch] text-lg leading-8 text-graphite [text-wrap:pretty]">{t("deliveryText")}</p>
            <Link href={`/${locale}/delivery`} className="text-link mt-6 inline-flex">
              {pick("Условия доставки", "Delivery details", "Dettagli consegna")}
            </Link>
          </div>
        </div>
      </section>

      <MobileOrderBar href={`/${locale}/shop`} label={shopLabel} />
    </>
  );
}
