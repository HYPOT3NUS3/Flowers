import { StudioEvent } from "@/content/events/events";
import { Locale } from "@/lib/localization/config";
import { formatCurrency, formatDate, text } from "@/lib/localization/strings";
import { ProductImage } from "@/components/ui/product-image";

export function EventCard({ event, locale }: { event: StudioEvent; locale: Locale }) {
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
          <div><dt className="text-graphite">Location</dt><dd>{event.location}</dd></div>
          <div><dt className="text-graphite">Price</dt><dd>{formatCurrency(event.price)}</dd></div>
          <div><dt className="text-graphite">Seats</dt><dd>{event.seatsAvailable}/{event.seatsTotal}</dd></div>
          <div><dt className="text-graphite">Type</dt><dd>{event.eventType}</dd></div>
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
