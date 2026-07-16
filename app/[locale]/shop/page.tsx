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
      <section className="container-shell py-14 text-center md:py-20">
        <p className="label text-toile">{locale === "ru" ? "Каталог" : locale === "it" ? "Catalogo" : "Catalogue"}</p>
        <h1 className="serif mx-auto mt-4 max-w-4xl text-6xl leading-none md:text-8xl">{t("title")}</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-graphite">{t("intro")}</p>
      </section>
      <BudgetFilter locale={locale} title={home("budgetTitle")} />
      <ShopCatalogue locale={locale} />
    </>
  );
}
