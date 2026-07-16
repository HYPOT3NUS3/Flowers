import { Locale } from "@/lib/localization/config";

export default async function TermsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const copy = {
    label: locale === "ru" ? "Требуется юридическая проверка" : locale === "it" ? "Revisione legale richiesta" : "Legal review required",
    title: locale === "ru" ? "Условия" : locale === "it" ? "Termini" : "Terms",
    body:
      locale === "ru"
        ? "Черновик условий. Перед запуском замените этот текст профессионально подготовленными правилами оплаты, доставки, возврата и обслуживания."
        : locale === "it"
          ? "Testo provvisorio dei termini. Prima del lancio sostituiscilo con condizioni professionali su pagamenti, consegne, resi e servizio."
          : "Placeholder terms. Replace with professionally reviewed commercial, delivery, refund and privacy language before launch."
  };

  return (
    <section className="container-shell py-14">
      <p className="label text-toile">{copy.label}</p>
      <h1 className="serif mt-4 text-6xl leading-none md:text-8xl">{copy.title}</h1>
      <p className="mt-8 max-w-3xl leading-8 text-graphite">{copy.body}</p>
    </section>
  );
}
