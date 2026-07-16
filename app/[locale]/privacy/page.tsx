import { Locale } from "@/lib/localization/config";

export default async function PrivacyPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return (
    <LegalPage
      label={locale === "ru" ? "Требуется юридическая проверка" : locale === "it" ? "Revisione legale richiesta" : "Legal review required"}
      title={locale === "ru" ? "Политика конфиденциальности" : locale === "it" ? "Informativa privacy" : "Privacy Policy"}
      body={
        locale === "ru"
          ? "Черновик юридического текста. Перед запуском в Италии или ЕС страницу должен проверить квалифицированный специалист."
          : locale === "it"
            ? "Testo legale provvisorio. Prima del lancio in Italia o nell'UE questa pagina deve essere verificata da un professionista qualificato."
            : "Placeholder legal text. This page must be reviewed by a qualified professional before launch in Italy or the EU."
      }
    />
  );
}

function LegalPage({ label, title, body }: { label: string; title: string; body: string }) {
  return (
    <section className="container-shell py-14">
      <p className="label text-toile">{label}</p>
      <h1 className="serif mt-4 text-6xl leading-none md:text-8xl">{title}</h1>
      <p className="mt-8 max-w-3xl leading-8 text-graphite">{body}</p>
    </section>
  );
}
