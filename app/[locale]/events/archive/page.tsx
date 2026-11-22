import { EventCard } from "@/components/events/event-card";
import { archivedEvents } from "@/content/events/events";
import { Locale } from "@/lib/localization/config";

export default async function EventsArchivePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return (
    <section className="container-shell py-8 md:py-14">
      <p className="label text-toile">{locale === "ru" ? "Архив" : locale === "it" ? "Archivio" : "Archive"}</p>
      <h1 className="page-title editorial-italic mt-4">{locale === "ru" ? "Как это было" : locale === "it" ? "Eventi passati" : "Past events"}</h1>
      <div className="mt-6 grid md:mt-10 gap-5 md:grid-cols-3">
        {archivedEvents().map((event) => <EventCard key={event.id} event={event} locale={locale} />)}
      </div>
    </section>
  );
}
