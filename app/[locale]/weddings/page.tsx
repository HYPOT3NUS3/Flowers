import { ServicePage } from "@/components/services/service-page";
import { Locale } from "@/lib/localization/config";

export default async function WeddingsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return (
    <ServicePage
      locale={locale}
      label={locale === "ru" ? "Свадьбы" : locale === "it" ? "Matrimoni" : "Weddings"}
      title={locale === "ru" ? "Свадьбы на озере Комо" : locale === "it" ? "Matrimoni sul Lago di Como" : "Lake Como weddings"}
      body={locale === "ru" ? "От камерных церемоний до масштабного флористического сопровождения. Букет невесты, свадебные арки, декор столов, велкам-зон, оформление лодок и вилл. Воплощаем в жизнь любые флористические сценарии для вашего особенного дня." : locale === "it" ? "Dalle cerimonie intime agli allestimenti floreali su larga scala. Bouquet da sposa, archi nuziali, decorazioni per tavoli e welcome zone, allestimenti per barche e ville. Diamo vita a ogni scenario floreale per il vostro giorno speciale." : "From intimate ceremonies to large-scale floral direction. Bridal bouquets, wedding arches, table decor, welcome areas, boats and villas. We bring every floral scenario to life for your special day."}
      image="/assets/editorial/generated/wedding-terrace.png"
    />
  );
}
