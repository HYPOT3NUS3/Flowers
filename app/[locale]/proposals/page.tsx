import { ServicePage } from "@/components/services/service-page";
import { Locale } from "@/lib/localization/config";

export default async function ProposalsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return (
    <ServicePage
      locale={locale}
      label={locale === "ru" ? "Предложения" : locale === "it" ? "Proposte" : "Proposals"}
      title={locale === "ru" ? "Предложения руки и сердца" : locale === "it" ? "Proposte di matrimonio" : "Marriage proposals"}
      body={locale === "ru" ? "Флористические арт-объекты, романтические локации, лодки, виллы и камерные сценарии для самого важного момента." : locale === "it" ? "Oggetti d'arte floreale, location romantiche, barche, ville e scenografie intime per il momento più importante." : "Floral art objects, romantic locations, boats, villas and intimate scenarios for the most important moment."}
      image="/assets/editorial/generated/proposal-lakeside.png"
    />
  );
}
