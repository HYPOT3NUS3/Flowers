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
      <section className="container-shell py-8 md:py-12">
        <div>
          <h1 className="page-title max-w-4xl">{t("title")}</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 md:text-lg text-graphite">{t("intro")}</p>
        </div>
      </section>
      <BudgetFilter locale={locale} title={home("budgetTitle")} />
      <ShopCatalogue locale={locale} />
    </>
  );
}
