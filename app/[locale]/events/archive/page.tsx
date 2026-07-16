import { EventCard } from "@/components/events/event-card";
import { archivedEvents } from "@/content/events/events";
import { Locale } from "@/lib/localization/config";

export default async function EventsArchivePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return (
    <section className="container-shell py-14">
      <p className="label text-toile">{locale === "ru" ? "Архив" : locale === "it" ? "Archivio" : "Archive"}</p>
      <h1 className="serif mt-4 text-6xl leading-none md:text-8xl">{locale === "ru" ? "Как это было" : locale === "it" ? "Eventi passati" : "Past events"}</h1>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {archivedEvents().map((event) => <EventCard key={event.id} event={event} locale={locale} />)}
      </div>
    </section>
  );
}
