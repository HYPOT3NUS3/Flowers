import { ServicePage } from "@/components/services/service-page";
import { Locale } from "@/lib/localization/config";

export default async function ProposalsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return (
    <ServicePage
      locale={locale}
      label={locale === "ru" ? "Предложение руки и сердца" : locale === "it" ? "Proposta di matrimonio" : "Marriage proposal"}
      title={locale === "ru" ? "Предложения руки и сердца" : locale === "it" ? "Proposte di matrimonio" : "Marriage proposals"}
      body={locale === "ru" ? "Цветочное оформление романтических локаций, лодок и вилл для ваших главных признаний." : locale === "it" ? "Allestimenti floreali per location romantiche, barche e ville, pensati per le vostre dichiarazioni piu importanti." : "Floral styling for romantic locations, boats and villas for your most important declarations."}
      image="/assets/editorial/generated/proposal-lakeside.png"
    />
  );
}
