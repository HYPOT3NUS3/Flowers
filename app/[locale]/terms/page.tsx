import { Locale } from "@/lib/localization/config";

export default async function TermsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return (
    <section className="container-shell py-14">
      <p className="label text-toile">Legal review required</p>
      <h1 className="serif mt-4 text-6xl leading-none md:text-8xl">{locale === "ru" ? "Условия" : locale === "it" ? "Termini" : "Terms"}</h1>
      <p className="mt-8 max-w-3xl leading-8 text-graphite">Placeholder terms. Replace with professionally reviewed commercial, delivery, refund and privacy language before launch.</p>
    </section>
  );
}
