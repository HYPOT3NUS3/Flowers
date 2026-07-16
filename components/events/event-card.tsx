import { StudioEvent } from "@/content/events/events";
import { Locale } from "@/lib/localization/config";
import { formatCurrency, formatDate, text } from "@/lib/localization/strings";
import { ProductImage } from "@/components/ui/product-image";

export function EventCard({ event, locale }: { event: StudioEvent; locale: Locale }) {
  const labels = {
    location: locale === "ru" ? "Место" : locale === "it" ? "Luogo" : "Location",
    price: locale === "ru" ? "Стоимость" : locale === "it" ? "Prezzo" : "Price",
    seats: locale === "ru" ? "Места" : locale === "it" ? "Posti" : "Seats",
    type: locale === "ru" ? "Формат" : locale === "it" ? "Formato" : "Type"
  };
  const eventTypes = {
    workshop: locale === "ru" ? "Воркшоп" : locale === "it" ? "Workshop" : "Workshop",
    gathering: locale === "ru" ? "Встреча" : locale === "it" ? "Incontro" : "Gathering",
    private: locale === "ru" ? "Частный формат" : locale === "it" ? "Formato privato" : "Private"
  };

  return (
    <article className="surface-panel grid gap-4 rounded-[1.25rem] p-4 text-left">
      <div className="aspect-[5/3] overflow-hidden rounded-[1rem] bg-powder">
        <ProductImage src={event.images[0]} alt={text(event.title, locale)} />
      </div>
      <div>
        <p className="label text-toile">{formatDate(event.date, locale)} / {event.startTime}-{event.endTime}</p>
        <h3 className="serif mt-3 text-3xl leading-none">{text(event.title, locale)}</h3>
        <p className="mt-3 text-sm leading-6 text-graphite">{text(event.description, locale)}</p>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div><dt className="text-graphite">{labels.location}</dt><dd>{text(event.location, locale)}</dd></div>
          <div><dt className="text-graphite">{labels.price}</dt><dd>{formatCurrency(event.price)}</dd></div>
          <div><dt className="text-graphite">{labels.seats}</dt><dd>{event.seatsAvailable}/{event.seatsTotal}</dd></div>
          <div><dt className="text-graphite">{labels.type}</dt><dd>{eventTypes[event.eventType]}</dd></div>
        </dl>
      </div>
      {event.bookingEnabled ? (
        <a className="button-secondary" href={`/${locale}/contact?event=${event.slug}`}>
          {locale === "ru" ? "Забронировать место" : locale === "it" ? "Prenota un posto" : "Book a place"}
        </a>
      ) : null}
    </article>
  );
}
