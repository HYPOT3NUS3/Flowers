import { ServicePage } from "@/components/services/service-page";
import { Locale } from "@/lib/localization/config";

export default async function WeddingsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return (
    <ServicePage
      locale={locale}
      label="Weddings"
      title={locale === "ru" ? "Свадьбы на озере Комо" : locale === "it" ? "Matrimoni sul Lago di Como" : "Lake Como weddings"}
      body={locale === "ru" ? "От камерной церемонии до полного флористического сопровождения торжества: арки, букет невесты, столы, виллы, лодки и welcome-зоны." : locale === "it" ? "Dalla cerimonia intima alla direzione floreale completa: archi, bouquet da sposa, tavoli, ville, barche e aree di benvenuto." : "From intimate ceremonies to complete floral direction: arches, bridal bouquets, tables, villas, boats and welcome areas."}
      image="/assets/editorial/generated/wedding-terrace.png"
    />
  );
}
