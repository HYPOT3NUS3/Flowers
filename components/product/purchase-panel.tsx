"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MessageCircle, Truck, Clock } from "lucide-react";
import { Product } from "@/content/products/types";
import { siteSettings } from "@/content/site";
import { Locale } from "@/lib/localization/config";
import { formatCurrency, text } from "@/lib/localization/strings";
import { whatsappUrl } from "@/lib/contact/whatsapp";
import { useCart } from "@/components/cart/cart-store";

export function PurchasePanel({ product, locale }: { product: Product; locale: Locale }) {
  const addItem = useCart((state) => state.addItem);
  const [quantityText, setQuantityText] = useState("1");
  const quantity = Math.max(1, Math.floor(Number(quantityText)) || 1);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState("10:00-12:00");
  const [buyVisible, setBuyVisible] = useState(true);
  const buyRef = useRef<HTMLButtonElement>(null);
  const title = text(product.title, locale);
  const isBespoke = product.exactPrice >= 500;
  const t = (ru: string, en: string, it: string) => (locale === "ru" ? ru : locale === "it" ? it : en);
  const buyLabel = isBespoke ? t("Запросить индивидуально", "Request bespoke", "Richiedi su misura") : t("Добавить в корзину", "Add to cart", "Aggiungi al carrello");

  // Phones: when the main button is off screen, a buy bar with the price stays at the bottom.
  useEffect(() => {
    const node = buyRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setBuyVisible(entry.isIntersecting));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function buy() {
    if (isBespoke) {
      window.location.assign(`/${locale}/contact?product=${product.slug}`);
      return;
    }
    addItem({
      id: `${product.id}-${deliveryDate || "open"}-${deliveryTimeSlot}`,
      slug: product.slug,
      title,
      price: product.exactPrice,
      image: product.images[0],
      quantity,
      deliveryDate,
      deliveryTimeSlot
    });
  }

  const details: [string, string][] = [
    [t("Состав", "Composition", "Composizione"), text(product.flowerComposition, locale)],
    [t("Размер", "Scale", "Dimensione"), text(product.sizeDescription, locale)],
    [t("Уход", "Care", "Cura"), text(product.careInstructions, locale)],
    [t("Сезонность", "Seasonal note", "Stagionalità"), text(product.seasonalDisclaimer, locale)]
  ];

  return (
    <div className="px-4 pt-6 md:sticky md:top-28 md:px-0 md:pt-0">
      <nav aria-label="Breadcrumb" className="text-sm text-graphite">
        <Link href={`/${locale}/shop`} className="underline-offset-4 hover:underline">{t("Коллекции", "Collections", "Collezioni")}</Link>
        <span aria-hidden="true" className="mx-2">/</span>
        <span className="text-ink">{title}</span>
      </nav>
      <h1 className="page-title mt-3">{title}</h1>
      <p className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="text-2xl tabular-nums">{formatCurrency(product.exactPrice)}</span>
        <span className="text-sm text-graphite">
          {product.madeToOrder ? t("Под заказ", "Made to order", "Su ordinazione") : t("Готово к заказу", "Ready to order", "Pronto da ordinare")}
        </span>
      </p>
      <p className="mt-5 max-w-[52ch] text-lg leading-8 text-graphite">{text(product.shortDescription, locale)}</p>

      <div className="mt-8 grid grid-cols-2 gap-3">
        <label className="col-span-2 grid gap-1.5 text-sm">
          {t("Дата доставки", "Delivery date", "Data di consegna")}
          <input className="field-shell min-h-11 w-full min-w-0 px-3 text-base" type="date" value={deliveryDate} onChange={(event) => setDeliveryDate(event.target.value)} />
        </label>
        <label className="grid min-w-0 gap-1.5 text-sm">
          {t("Временной интервал", "Time slot", "Fascia oraria")}
          <select className="field-shell min-h-11 w-full min-w-0 px-3 text-base" value={deliveryTimeSlot} onChange={(event) => setDeliveryTimeSlot(event.target.value)}>
            <option>10:00-12:00</option>
            <option>12:00-15:00</option>
            <option>15:00-18:00</option>
            <option>{t("По договоренности", "By appointment", "Su appuntamento")}</option>
          </select>
        </label>
        <label className="grid min-w-0 gap-1.5 text-sm">
          {t("Количество", "Quantity", "Quantità")}
          <input className="field-shell min-h-11 w-full min-w-0 px-3 text-base" type="number" min="1" inputMode="numeric" value={quantityText} onChange={(event) => setQuantityText(event.target.value)} onBlur={() => setQuantityText(String(quantity))} />
        </label>
      </div>
      <button ref={buyRef} className="button-primary mt-5 w-full" onClick={buy}>{buyLabel}</button>

      <ul className="mt-6 grid gap-3 border-y border-[var(--border)] py-5 text-sm text-graphite">
        <li className="flex items-center gap-3"><Truck size={18} strokeWidth={1.5} className="shrink-0 text-toile" aria-hidden="true" />{text(siteSettings.announcement, locale)}</li>
        <li className="flex items-center gap-3">
          <Clock size={18} strokeWidth={1.5} className="shrink-0 text-toile" aria-hidden="true" />
          {t("Минимальное время подготовки:", "Minimum lead time:", "Tempo minimo di preparazione:")} {product.minimumLeadTimeHours} {t("ч", "h", "ore")}
        </li>
        <li>
          <a href={whatsappUrl(`${t("Здравствуйте! Вопрос о букете", "Hello! A question about", "Buongiorno! Una domanda su")} ${title}`)} className="flex min-h-11 items-center gap-3 text-ink underline-offset-4 hover:underline">
            <MessageCircle size={18} strokeWidth={1.5} className="shrink-0 text-toile" aria-hidden="true" />
            {t("Вопрос о букете? Напишите в WhatsApp", "A question about this bouquet? Ask on WhatsApp", "Una domanda su questo bouquet? Scrivici su WhatsApp")}
          </a>
        </li>
      </ul>

      <div className="mt-2">
        {details.map(([heading, body], index) => (
          <details key={heading} className="product-detail border-b border-[var(--border)]" open={index === 0}>
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 font-serif text-xl font-medium">
              {heading}
              <span aria-hidden="true" className="detail-icon text-toile" />
            </summary>
            <p className="pb-5 text-[0.95rem] leading-7 text-graphite">{body}</p>
          </details>
        ))}
      </div>

      <div className="product-buy-bar md:hidden" data-visible={!buyVisible} aria-hidden={buyVisible}>
        <span className="text-base font-medium tabular-nums text-ink">{formatCurrency(product.exactPrice)}</span>
        <button className="button-primary flex-1 !min-h-11" tabIndex={buyVisible ? -1 : 0} onClick={buy}>{buyLabel}</button>
      </div>
    </div>
  );
}
