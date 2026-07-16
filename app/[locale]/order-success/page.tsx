import Link from "next/link";
import { Locale } from "@/lib/localization/config";
import { siteSettings } from "@/content/site";

export default async function OrderSuccessPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return (
    <section className="container-shell py-20">
      <p className="label text-toile">{locale === "ru" ? "Заказ" : locale === "it" ? "Ordine" : "Order"}</p>
      <h1 className="serif mt-4 text-6xl leading-none md:text-8xl">{locale === "ru" ? "Заказ создан." : locale === "it" ? "Ordine creato." : "Order created."}</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-graphite">
        {locale === "ru" ? siteSettings.revolutInstructions.ru : locale === "it" ? siteSettings.revolutInstructions.it : siteSettings.revolutInstructions.en}
      </p>
      <Link href={`/${locale}/shop`} className="button-primary mt-8">{locale === "ru" ? "Вернуться в каталог" : locale === "it" ? "Torna alle collezioni" : "Return to collections"}</Link>
    </section>
  );
}
