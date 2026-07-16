import { Locale } from "@/lib/localization/config";

export default async function CookiesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return (
    <section className="container-shell py-14">
      <p className="label text-toile">Legal review required</p>
      <h1 className="serif mt-4 text-6xl leading-none md:text-8xl">{locale === "ru" ? "Cookie Policy" : locale === "it" ? "Cookie Policy" : "Cookie Policy"}</h1>
      <p className="mt-8 max-w-3xl leading-8 text-graphite">Placeholder cookie text. Optional analytics must not load before consent.</p>
    </section>
  );
}
