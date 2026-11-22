import Link from "next/link";
import { EventCard } from "@/components/events/event-card";
import { upcomingEvents } from "@/content/events/events";
import { Locale } from "@/lib/localization/config";

export default async function EventsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const events = upcomingEvents();
  const copy = {
    label: locale === "ru" ? "Календарь" : locale === "it" ? "Calendario" : "Schedule",
    title: locale === "ru" ? "Мероприятия и воркшопы" : locale === "it" ? "Eventi e workshop" : "Events and workshops",
    archive: locale === "ru" ? "Как это было" : locale === "it" ? "Eventi passati" : "Past events",
    empty: locale === "ru" ? "Ближайших мероприятий пока нет." : locale === "it" ? "Non ci sono eventi in programma." : "No upcoming events."
  };

  return (
    <section className="container-shell py-8 text-center md:py-16">
      <div className="flex flex-col items-center gap-4 md:flex-row md:items-end md:justify-between md:text-left">
        <div className="min-w-0">
          <p className="label text-toile">{copy.label}</p>
          <h1 className="page-title editorial-italic mx-auto mt-4 max-w-full break-words md:mx-0">{copy.title}</h1>
        </div>
        <Link href={`/${locale}/events/archive`} className="button-secondary">{copy.archive}</Link>
      </div>
      <div className="mt-6 grid md:mt-10 gap-5 md:grid-cols-3">
        {events.length ? events.map((event) => <EventCard key={event.id} event={event} locale={locale} />) : (
          <div className="border border-[var(--border)] bg-porcelain p-10">
            <p className="section-title">{copy.empty}</p>
          </div>
        )}
      </div>
    </section>
  );
}
