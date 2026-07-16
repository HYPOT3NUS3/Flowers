import { ServicePage } from "@/components/services/service-page";
import { Locale } from "@/lib/localization/config";

export default async function ServicesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return (
    <ServicePage
      locale={locale}
      label={locale === "ru" ? "Услуги" : locale === "it" ? "Servizi" : "Services"}
      title={locale === "ru" ? "Услуги студии" : locale === "it" ? "Servizi dello studio" : "Studio services"}
      body={locale === "ru" ? "Коллекции, свадьбы, предложения, мероприятия и мастер-классы объединены общей эстетикой MUZA." : locale === "it" ? "Collezioni, matrimoni, proposte, eventi e workshop condividono l'estetica MUZA." : "Collections, weddings, proposals, events and workshops share the MUZA aesthetic."}
    />
  );
}
