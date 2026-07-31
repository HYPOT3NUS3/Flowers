import Link from "next/link";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { ProductImage } from "@/components/ui/product-image";
import { services } from "@/content/site";
import { Locale } from "@/lib/localization/config";
import { text } from "@/lib/localization/strings";

export function ServicePage({
  locale,
  title,
  label,
  body,
  image = "/assets/editorial/generated/villa-interior.png"
}: {
  locale: Locale;
  title: string;
  label: string;
  body: string;
  image?: string;
}) {
  return (
    <>
      <section className="container-shell grid gap-10 py-14 text-center md:grid-cols-[0.95fr_1.05fr] md:items-center md:py-20 md:text-left">
        <div className="mx-auto min-w-0 max-w-full md:mx-0 md:max-w-3xl">
          <p className="label text-toile">{label}</p>
          <h1 className="serif mx-auto mt-4 max-w-4xl break-words text-5xl leading-none sm:text-6xl md:mx-0 lg:text-7xl xl:text-8xl">{title}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-graphite md:mx-0">{body}</p>
          <Link href={`/${locale}/contact?service=${label}`} className="button-primary mt-8">
            {locale === "ru" ? "Отправить запрос" : locale === "it" ? "Invia una richiesta" : "Send enquiry"}
          </Link>
        </div>
        <div className="mx-auto aspect-[4/5] w-full min-w-0 max-w-[560px] overflow-hidden rounded-[1.6rem] border border-[var(--border)] bg-powder shadow-[0_22px_70px_rgba(22,22,22,0.08)]">
          <ProductImage src={image} alt={title} />
        </div>
      </section>
      <section className="bg-porcelain py-14">
        <div className="container-shell">
          <p className="label text-center text-toile">{locale === "ru" ? "Студия" : locale === "it" ? "Studio" : "Studio"}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <Link key={service.slug} href={`/${locale}${service.href}`} className="surface-panel lift-card rounded-[1.25rem] p-6 text-center">
                <h2 className="serif break-words text-3xl leading-tight">{text(service.title, locale)}</h2>
                <p className="mt-5 text-sm leading-7 text-graphite">{text(service.body, locale)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="container-shell py-16 text-center">
        <h2 className="serif text-5xl leading-none">{locale === "ru" ? "Обсудить проект" : locale === "it" ? "Parliamo del progetto" : "Discuss the project"}</h2>
        <div className="mt-8">
          <EnquiryForm locale={locale} />
        </div>
      </section>
    </>
  );
}
