import { Locale } from "@/lib/localization/config";

export default async function PrivacyPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return <LegalPage title={locale === "ru" ? "Политика конфиденциальности" : locale === "it" ? "Informativa privacy" : "Privacy Policy"} />;
}

function LegalPage({ title }: { title: string }) {
  return (
    <section className="container-shell py-14">
      <p className="label text-toile">Legal review required</p>
      <h1 className="serif mt-4 text-6xl leading-none md:text-8xl">{title}</h1>
      <p className="mt-8 max-w-3xl leading-8 text-graphite">Placeholder legal text. This page must be reviewed by a qualified professional before launch in Italy or the EU.</p>
    </section>
  );
}
