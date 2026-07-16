import { EnquiryForm } from "@/components/forms/enquiry-form";
import { siteSettings } from "@/content/site";
import { Locale } from "@/lib/localization/config";

export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return (
    <section className="container-shell grid gap-10 py-14 md:grid-cols-[0.85fr_1.15fr]">
      <div>
        <p className="label text-toile">{locale === "ru" ? "Связь" : locale === "it" ? "Contatti" : "Contact"}</p>
        <h1 className="serif mt-4 text-6xl leading-none md:text-8xl">{locale === "ru" ? "Связаться со студией" : locale === "it" ? "Contatta lo studio" : "Contact the studio"}</h1>
        <div className="mt-8 grid gap-3 text-graphite">
          <a href={siteSettings.whatsapp}>WhatsApp {siteSettings.telephone}</a>
          <a href={`mailto:${siteSettings.email}`}>{siteSettings.email}</a>
          <span>{siteSettings.address}</span>
        </div>
      </div>
      <EnquiryForm locale={locale} />
    </section>
  );
}
