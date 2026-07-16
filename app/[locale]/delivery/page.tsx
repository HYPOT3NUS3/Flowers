import { deliveryZones } from "@/content/delivery/zones";
import { Locale } from "@/lib/localization/config";
import { formatCurrency, text } from "@/lib/localization/strings";

export default async function DeliveryPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const copy = {
    label: locale === "ru" ? "Озеро Комо" : locale === "it" ? "Lago di Como" : "Lake Como",
    title: locale === "ru" ? "Доставка" : locale === "it" ? "Consegna" : "Delivery",
    intro:
      locale === "ru"
        ? "Зоны, сроки и стоимость доставки можно обновлять в контенте или CMS."
        : locale === "it"
          ? "Zone, tempi e costi di consegna possono essere aggiornati nei contenuti o nel CMS."
          : "Delivery zones, timing and fees can be updated in the content file or CMS.",
    fee: locale === "ru" ? "Стоимость" : locale === "it" ? "Costo" : "Fee",
    leadTime: locale === "ru" ? "Минимальный срок" : locale === "it" ? "Tempo minimo" : "Lead time",
    hours: locale === "ru" ? "ч" : locale === "it" ? "ore" : "h",
    manualQuote:
      locale === "ru"
        ? "Для сложных адресов доступен индивидуальный расчет."
        : locale === "it"
          ? "Per destinazioni complesse è disponibile un preventivo personalizzato."
          : "Manual quote available for complex destinations."
  };

  return (
    <section className="container-shell py-14 text-center md:py-20">
      <p className="label text-toile">{copy.label}</p>
      <h1 className="serif mx-auto mt-4 max-w-4xl text-6xl leading-none md:text-8xl">{copy.title}</h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-graphite">
        {copy.intro}
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {deliveryZones.map((zone) => (
          <article key={zone.postalCodes.join("-")} className="surface-panel rounded-[1.25rem] p-6">
            <h2 className="serif text-3xl">{text(zone.zoneName, locale)}</h2>
            <p className="mt-4 text-sm leading-7 text-graphite">{zone.townLabels.map((town) => text(town, locale)).join(", ")}</p>
            <p className="mt-4 text-sm">{copy.fee}: {formatCurrency(zone.deliveryFee)}</p>
            <p className="mt-2 text-sm">{copy.leadTime}: {zone.minimumLeadTimeHours} {copy.hours}</p>
            {zone.manualQuote ? <p className="mt-2 text-sm text-toile">{copy.manualQuote}</p> : null}
          </article>
        ))}
      </div>
    </section>
  );
}
