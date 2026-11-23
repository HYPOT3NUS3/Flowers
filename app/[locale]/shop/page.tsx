import { getTranslations } from "next-intl/server";
import { BudgetFilter } from "@/components/shop/budget-filter";
import { ShopCatalogue } from "@/components/shop/shop-catalogue";
import { Locale } from "@/lib/localization/config";

export default async function ShopPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "shop" });
  const home = await getTranslations({ locale, namespace: "home" });

  return (
    <>
      <section className="container-shell pt-10 md:pt-16">
        <h1 data-enter className="page-title">{t("title")}</h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-graphite md:text-lg">{t("intro")}</p>
      </section>
      <BudgetFilter locale={locale} title={home("budgetTitle")} />
      <ShopCatalogue locale={locale} />
    </>
  );
}
