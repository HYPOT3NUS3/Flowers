import Link from "next/link";
import Image from "next/image";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { HeroTitle } from "@/components/motion/hero-title";
import { ServiceTiles } from "@/components/services/service-tiles";
import { Locale } from "@/lib/localization/config";

export function ServicePage({
  locale,
  title,
  label,
  body,
  photo,
  href
}: {
  locale: Locale;
  title: string;
  label: string;
  body: string;
  /** Hero photograph from content/photos.ts. */
  photo: string;
  /** This page's path (e.g. "/weddings"), so its own tile is marked current. */
  href?: string;
}) {
  const t = (ru: string, en: string, it: string) => (locale === "ru" ? ru : locale === "it" ? it : en);

  return (
    <>
      {/* Hero: the same composition as the home page, with this service's photograph. */}
      <section className="home-hero relative isolate grid min-h-[calc(100svh-6.75rem)] md:min-h-[min(calc(100svh-6.75rem),820px)] md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div data-enter className="hero-photo absolute inset-0 -z-10 overflow-hidden md:relative md:inset-auto md:z-0 md:col-start-2 md:row-start-1">
          <Image src={photo} alt="" fill priority sizes="(max-width: 767px) 100vw, 53vw" className="object-cover" />
          <div aria-hidden="true" className="hero-scrim absolute inset-0 md:hidden" />
        </div>
        <div className="hero-copy flex flex-col justify-end px-4 pb-24 pt-40 text-porcelain md:col-start-1 md:row-start-1 md:justify-center md:py-16 md:pr-12 md:text-ink">
          <HeroTitle text={title} accent="" className="page-title hero-title max-w-[12ch] break-words" />
          <div data-enter className="mt-6 max-w-md">
            <p className="text-base leading-7 text-[rgba(253,251,246,0.88)] md:text-lg md:text-graphite">{body}</p>
            <Link href={`/${locale}/contact?service=${encodeURIComponent(label)}`} className="button-primary mt-6 w-full sm:w-auto">
              {t("Отправить запрос", "Send enquiry", "Invia una richiesta")}
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border)] bg-porcelain">
        <div className="container-shell section-pad">
          <h2 data-reveal="lines" className="section-title">{t("Что ещё делает студия", "More from the studio", "Altro dallo studio")}</h2>
          <div className="mt-8 md:mt-12">
            <ServiceTiles locale={locale} current={href} />
          </div>
        </div>
      </section>

      <section className="container-shell section-pad">
        <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <h2 data-reveal="lines" className="section-title max-w-[12ch]">{t("Обсудить проект", "Discuss the project", "Parliamo del progetto")}</h2>
          <EnquiryForm locale={locale} />
        </div>
      </section>
    </>
  );
}
