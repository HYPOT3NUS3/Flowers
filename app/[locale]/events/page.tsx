import Link from "next/link";
import { EventCard } from "@/components/events/event-card";
import { upcomingEvents } from "@/content/events/events";
import { Locale } from "@/lib/localization/config";

export default async function EventsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const events = upcomingEvents();
  return (
    <section className="container-shell py-14 text-center md:py-20">
      <div className="flex flex-col items-center gap-4 md:flex-row md:items-end md:justify-between md:text-left">
        <div>
          <p className="label text-toile">Schedule</p>
          <h1 className="serif mx-auto mt-4 max-w-4xl text-6xl leading-none md:mx-0 md:text-8xl">{locale === "ru" ? "Мероприятия и воркшопы" : locale === "it" ? "Eventi e workshop" : "Events and workshops"}</h1>
        </div>
        <Link href={`/${locale}/events/archive`} className="button-secondary">{locale === "ru" ? "Как это было" : locale === "it" ? "Eventi passati" : "Past events"}</Link>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {events.length ? events.map((event) => <EventCard key={event.id} event={event} locale={locale} />) : (
          <div className="border border-[var(--border)] bg-porcelain p-10">
            <p className="serif text-4xl">No upcoming events.</p>
          </div>
        )}
      </div>
    </section>
  );
}
