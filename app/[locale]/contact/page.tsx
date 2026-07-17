import { EnquiryForm } from "@/components/forms/enquiry-form";
import { InstagramIcon } from "@/components/ui/instagram-icon";
import { siteSettings } from "@/content/site";
import { Locale } from "@/lib/localization/config";
import { text } from "@/lib/localization/strings";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const copy = {
    label: locale === "ru" ? "Связь" : locale === "it" ? "Contatti" : "Contact",
    title: locale === "ru" ? "Связаться со студией" : locale === "it" ? "Contatta lo studio" : "Contact the studio",
    intro:
      locale === "ru"
        ? "Напишите нам в WhatsApp, Instagram или на email, и мы поможем с заказом, доставкой или цветочным оформлением."
        : locale === "it"
          ? "Scrivici su WhatsApp, Instagram o via email: ti aiutiamo con ordini, consegne e allestimenti floreali."
          : "Message us on WhatsApp, Instagram or email for orders, delivery questions and floral projects.",
    whatsapp: locale === "ru" ? "WhatsApp" : locale === "it" ? "WhatsApp" : "WhatsApp",
    phone: locale === "ru" ? "Телефон" : locale === "it" ? "Telefono" : "Phone",
    email: locale === "ru" ? "Email" : locale === "it" ? "Email" : "Email",
    address: locale === "ru" ? "Адрес" : locale === "it" ? "Indirizzo" : "Address"
  };
  const contactLinks = [
    {
      href: siteSettings.instagramUrl,
      label: "Instagram",
      value: siteSettings.instagram,
      icon: <InstagramIcon size={19} />
    },
    {
      href: siteSettings.whatsapp,
      label: copy.whatsapp,
      value: siteSettings.telephone,
      icon: <MessageCircle size={19} aria-hidden="true" />
    },
    {
      href: `tel:${siteSettings.telephone.replace(/\s/g, "")}`,
      label: copy.phone,
      value: siteSettings.telephone,
      icon: <Phone size={19} aria-hidden="true" />
    },
    {
      href: `mailto:${siteSettings.email}`,
      label: copy.email,
      value: siteSettings.email,
      icon: <Mail size={19} aria-hidden="true" />
    }
  ];

  return (
    <section className="container-shell grid gap-10 py-14 md:grid-cols-[0.85fr_1.15fr]">
      <div>
        <p className="label text-toile">{copy.label}</p>
        <h1 className="serif mt-4 text-6xl leading-none md:text-8xl">{copy.title}</h1>
        <p className="mt-6 max-w-xl leading-8 text-graphite">{copy.intro}</p>
        <div className="mt-8 grid gap-3">
          {contactLinks.map((item) => (
            <a key={item.href} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined} className="surface-panel grid grid-cols-[auto_1fr] items-center gap-3 rounded-[1.2rem] p-4 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-powder text-ink">{item.icon}</span>
              <span>
                <span className="label block text-toile">{item.label}</span>
                <span className="mt-1 block text-sm text-graphite [overflow-wrap:anywhere]">{item.value}</span>
              </span>
            </a>
          ))}
          <div className="surface-panel grid grid-cols-[auto_1fr] items-center gap-3 rounded-[1.2rem] p-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-powder text-ink"><MapPin size={19} aria-hidden="true" /></span>
            <span>
              <span className="label block text-toile">{copy.address}</span>
              <span className="mt-1 block text-sm text-graphite">{text(siteSettings.address, locale)}</span>
            </span>
          </div>
        </div>
      </div>
      <EnquiryForm locale={locale} />
    </section>
  );
}
