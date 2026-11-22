import Link from "next/link";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { services } from "@/content/site";
import { Locale } from "@/lib/localization/config";
import { text } from "@/lib/localization/strings";

export function ServicePage({
  locale,
  title,
  label,
  body
}: {
  locale: Locale;
  title: string;
  label: string;
  body: string;
}) {
  return (
    <>
      <section className="container-shell py-9 md:py-16">
        <div className="max-w-3xl">
          <p className="label text-toile">{label}</p>
          <h1 className="page-title editorial-italic mt-3 break-words">{title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-graphite md:text-lg">{body}</p>
          <Link href={`/${locale}/contact?service=${label}`} className="button-primary mt-5">
            {locale === "ru" ? "Отправить запрос" : locale === "it" ? "Invia una richiesta" : "Send enquiry"}
          </Link>
        </div>
      </section>
      <section className="border-y border-[var(--border)] bg-porcelain py-8 md:py-12">
        <div className="container-shell">
          <p className="label text-toile">{locale === "ru" ? "Студия" : locale === "it" ? "Studio" : "Studio"}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <Link key={service.slug} href={`/${locale}${service.href}`} className="surface-panel lift-card rounded-xl p-4 md:p-6">
                <h2 className="item-title editorial-italic break-words">{text(service.title, locale)}</h2>
                <p className="mt-2.5 text-sm leading-6 text-graphite">{text(service.body, locale)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="container-shell py-9 md:py-14">
        <h2 className="section-title editorial-italic">{locale === "ru" ? "Обсудить проект" : locale === "it" ? "Parliamo del progetto" : "Discuss the project"}</h2>
        <div className="mt-5 max-w-3xl">
          <EnquiryForm locale={locale} />
        </div>
      </section>
    </>
  );
}
