import { homeCopy } from "@/content/site";
import { Locale } from "@/lib/localization/config";
import { text } from "@/lib/localization/strings";

export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return (
    <section className="container-shell py-14 text-center md:py-20">
      <p className="label text-toile">Flowers Boutique</p>
      <h1 className="page-title editorial-italic mx-auto mt-4 max-w-4xl">{locale === "ru" ? "О студии" : locale === "it" ? "Chi siamo" : "About the studio"}</h1>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {text(homeCopy.philosophy, locale).split("\n\n").map((paragraph) => <p key={paragraph} className="editorial-note">{paragraph}</p>)}
      </div>
      <div className="mx-auto mt-12 max-w-5xl rounded-[1.5rem] bg-powder/90 p-8 shadow-[0_18px_55px_rgba(22,22,22,0.07)]">
        <p className="editorial-note">{text(homeCopy.mission, locale)}</p>
      </div>
    </section>
  );
}
