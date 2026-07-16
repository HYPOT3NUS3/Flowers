import { deliveryZones } from "@/content/delivery/zones";
import { Locale } from "@/lib/localization/config";

export default async function DeliveryPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return (
    <section className="container-shell py-14 text-center md:py-20">
      <p className="label text-toile">Lake Como</p>
      <h1 className="serif mx-auto mt-4 max-w-4xl text-6xl leading-none md:text-8xl">{locale === "ru" ? "Доставка" : locale === "it" ? "Consegna" : "Delivery"}</h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-graphite">
        {locale === "ru" ? "Зоны и значения ниже являются демонстрационными и редактируются в контентном файле или CMS." : locale === "it" ? "Le zone e i valori sono dimostrativi e modificabili nel file contenuti o nel CMS." : "The zones and values below are demonstration data and editable in the content file or CMS."}
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {deliveryZones.map((zone) => (
          <article key={zone.zoneName} className="surface-panel rounded-[1.25rem] p-6">
            <h2 className="serif text-3xl">{zone.zoneName}</h2>
            <p className="mt-4 text-sm leading-7 text-graphite">{zone.towns.join(", ")}</p>
            <p className="mt-4 text-sm">Fee demo: EUR {zone.deliveryFee}</p>
            <p className="mt-2 text-sm">Lead time: {zone.minimumLeadTimeHours}h</p>
            {zone.manualQuote ? <p className="mt-2 text-sm text-toile">Manual quote available for complex destinations.</p> : null}
          </article>
        ))}
      </div>
    </section>
  );
}
