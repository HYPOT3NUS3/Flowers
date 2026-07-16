import { Locale } from "@/lib/localization/config";

export default async function CookiesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const copy = {
    label: locale === "ru" ? "Требуется юридическая проверка" : locale === "it" ? "Revisione legale richiesta" : "Legal review required",
    title: locale === "ru" ? "Политика cookie" : locale === "it" ? "Informativa cookie" : "Cookie Policy",
    body:
      locale === "ru"
        ? "Черновик текста о cookie. Необязательная аналитика и сторонние сервисы не должны загружаться до согласия пользователя."
        : locale === "it"
          ? "Testo provvisorio sui cookie. Analytics opzionali e servizi di terze parti non devono caricarsi prima del consenso."
          : "Placeholder cookie text. Optional analytics must not load before consent."
  };

  return (
    <section className="container-shell py-14">
      <p className="label text-toile">{copy.label}</p>
      <h1 className="serif mt-4 text-6xl leading-none md:text-8xl">{copy.title}</h1>
      <p className="mt-8 max-w-3xl leading-8 text-graphite">{copy.body}</p>
    </section>
  );
}
