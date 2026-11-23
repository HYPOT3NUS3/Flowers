import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { photos } from "@/content/photos";
import { services } from "@/content/site";
import { Locale } from "@/lib/localization/config";
import { text } from "@/lib/localization/strings";

/** One photo tile per studio service. Used on the home page and on every service page. */
export function ServiceTiles({ locale, current }: { locale: Locale; current?: string }) {
  return (
    <div data-reveal="stagger" className="grid grid-cols-2 gap-x-3 gap-y-8 lg:grid-cols-4 lg:gap-x-5">
      {services.map((service) => (
        <Link
          key={service.slug}
          href={`/${locale}${service.href}`}
          aria-current={current === service.href ? "page" : undefined}
          className="group block min-w-0"
        >
          <div className="lift-card photo-frame relative aspect-[3/4] overflow-hidden rounded-[0.6rem] bg-powder">
            <Image src={photos.services[service.slug]} alt={text(service.title, locale)} fill sizes="(max-width: 1023px) 48vw, 24vw" className="object-cover" />
          </div>
          <h3 className="mt-3 flex items-start justify-between gap-2 font-serif text-[1.35rem] font-medium leading-tight md:text-[1.6rem]">
            <span className="min-w-0 break-words">{text(service.title, locale)}</span>
            <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.5} className="tile-arrow mt-1 shrink-0 text-toile" />
          </h3>
          <p className="mt-1.5 hidden text-sm leading-6 text-graphite [text-wrap:pretty] sm:block">{text(service.body, locale)}</p>
        </Link>
      ))}
    </div>
  );
}
