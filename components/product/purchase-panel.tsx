"use client";

import { useState } from "react";
import { Product } from "@/content/products/types";
import { Locale } from "@/lib/localization/config";
import { formatCurrency, text } from "@/lib/localization/strings";
import { useCart } from "@/components/cart/cart-store";

export function PurchasePanel({ product, locale }: { product: Product; locale: Locale }) {
  const addItem = useCart((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState("10:00-12:00");
  const title = text(product.title, locale);
  const isBespoke = product.exactPrice >= 500;

  return (
    <div className="md:sticky md:top-28">
      <p className="label text-toile">
        {product.madeToOrder
          ? locale === "ru" ? "Под заказ" : locale === "it" ? "Su ordinazione" : "Made to order"
          : locale === "ru" ? "Готово к заказу" : locale === "it" ? "Pronto da ordinare" : "Ready to order"}
      </p>
      <h1 className="serif mt-4 text-5xl leading-none md:text-7xl">{title}</h1>
      <p className="mt-5 text-2xl">{formatCurrency(product.exactPrice)}</p>
      <p className="mt-6 leading-8 text-graphite">{text(product.shortDescription, locale)}</p>
      <div className="mt-8 grid gap-4">
        <label className="grid gap-2 text-sm">
          {locale === "ru" ? "Дата доставки" : locale === "it" ? "Data di consegna" : "Delivery date"}
          <input className="field-shell min-h-11 px-3" type="date" value={deliveryDate} onChange={(event) => setDeliveryDate(event.target.value)} />
        </label>
        <label className="grid gap-2 text-sm">
          {locale === "ru" ? "Временной интервал" : locale === "it" ? "Fascia oraria" : "Time slot"}
          <select className="field-shell min-h-11 px-3" value={deliveryTimeSlot} onChange={(event) => setDeliveryTimeSlot(event.target.value)}>
            <option>10:00-12:00</option>
            <option>12:00-15:00</option>
            <option>15:00-18:00</option>
            <option>{locale === "ru" ? "По договоренности" : locale === "it" ? "Su appuntamento" : "By appointment"}</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm">
          {locale === "ru" ? "Количество" : locale === "it" ? "Quantità" : "Quantity"}
          <input className="field-shell min-h-11 w-28 px-3" type="number" min="1" value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} />
        </label>
      </div>
      <button
        className="button-primary mt-6 w-full"
        onClick={() =>
          isBespoke
            ? window.location.assign(`/${locale}/contact?product=${product.slug}`)
            : addItem({
                id: `${product.id}-${deliveryDate || "open"}-${deliveryTimeSlot}`,
                slug: product.slug,
                title,
                price: product.exactPrice,
                image: product.images[0],
                quantity,
                deliveryDate,
                deliveryTimeSlot
              })
        }
      >
        {isBespoke
          ? locale === "ru" ? "Запросить индивидуально" : locale === "it" ? "Richiedi su misura" : "Request bespoke"
          : locale === "ru" ? "Добавить в корзину" : locale === "it" ? "Aggiungi al carrello" : "Add to cart"}
      </button>
      <p className="mt-4 text-sm leading-6 text-graphite">
        {locale === "ru" ? "Минимальное время подготовки:" : locale === "it" ? "Tempo minimo di preparazione:" : "Minimum lead time:"} {product.minimumLeadTimeHours} {locale === "ru" ? "ч" : locale === "it" ? "ore" : "h"}
      </p>
    </div>
  );
}
