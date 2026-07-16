"use client";

import Link from "next/link";
import { Locale } from "@/lib/localization/config";
import { formatCurrency } from "@/lib/localization/strings";
import { ProductImage } from "@/components/ui/product-image";
import { useCart, useCartTotals } from "./cart-store";

export function CartPageClient({ locale }: { locale: Locale }) {
  const { items, removeItem, updateQuantity } = useCart();
  const { subtotal } = useCartTotals();
  const copy = {
    empty: locale === "ru" ? "Корзина пуста." : locale === "it" ? "Il carrello è vuoto." : "Your cart is empty.",
    collections: locale === "ru" ? "Смотреть коллекции" : locale === "it" ? "Scopri le collezioni" : "View collections",
    bag: locale === "ru" ? "Корзина" : locale === "it" ? "Carrello" : "Cart",
    openDate: locale === "ru" ? "Дата открыта" : locale === "it" ? "Data da definire" : "Open date",
    openSlot: locale === "ru" ? "Время открыто" : locale === "it" ? "Orario da definire" : "Open slot",
    remove: locale === "ru" ? "Удалить" : locale === "it" ? "Rimuovi" : "Remove",
    qty: locale === "ru" ? "Количество" : locale === "it" ? "Quantità" : "Quantity",
    subtotal: locale === "ru" ? "Итог" : locale === "it" ? "Subtotale" : "Subtotal",
    checkout: locale === "ru" ? "Оформить заказ" : locale === "it" ? "Conferma ordine" : "Proceed to checkout",
    continue: locale === "ru" ? "Продолжить покупки" : locale === "it" ? "Continua lo shopping" : "Continue shopping",
    note:
      locale === "ru"
        ? "Доставка рассчитывается на следующем шаге по индексу и городу. Итоговая композиция совпадает с каталогом на 95-99%."
        : locale === "it"
          ? "La consegna viene calcolata nel passaggio successivo in base a CAP e località. La composizione finale corrisponde al catalogo per il 95-99%."
          : "Delivery is calculated in the next step by postal code and town. The final arrangement corresponds to the catalogue by 95-99%."
  };

  if (!items.length) {
    return (
      <section className="container-shell py-20 text-center">
        <h1 className="serif text-6xl">{copy.empty}</h1>
        <Link href={`/${locale}/shop`} className="button-primary mt-8">{copy.collections}</Link>
      </section>
    );
  }

  return (
    <section className="container-shell py-14">
      <h1 className="serif text-6xl leading-none md:text-8xl">{copy.bag}</h1>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="grid gap-5">
          {items.map((item) => (
            <article key={item.id} className="surface-panel grid gap-4 p-4 sm:grid-cols-[150px_1fr_auto]">
              <div className="aspect-[4/5] overflow-hidden border border-[var(--border)]">
                <ProductImage src={item.image} alt={item.title} />
              </div>
              <div>
                <h2 className="serif text-3xl">{item.title}</h2>
                <p className="mt-2 text-graphite">{formatCurrency(item.price)}</p>
                <p className="mt-4 text-sm text-graphite">
                  {item.deliveryDate || copy.openDate} / {item.deliveryTimeSlot || copy.openSlot}
                </p>
                <button className="mt-4 text-xs uppercase tracking-[0.12em]" onClick={() => removeItem(item.id)}>{copy.remove}</button>
              </div>
              <label className="grid h-fit gap-2 text-sm">
                {copy.qty}
                <input className="field-shell w-24 px-3 py-2" type="number" min="1" value={item.quantity} onChange={(event) => updateQuantity(item.id, Number(event.target.value))} />
              </label>
            </article>
          ))}
        </div>
        <aside className="surface-panel h-fit p-5">
          <div className="flex justify-between">
            <span>{copy.subtotal}</span>
            <strong>{formatCurrency(subtotal)}</strong>
          </div>
          <p className="mt-4 text-sm leading-6 text-graphite">
            {copy.note}
          </p>
          <Link href={`/${locale}/checkout`} className="button-primary mt-6 w-full">{copy.checkout}</Link>
          <Link href={`/${locale}/shop`} className="button-secondary mt-3 w-full">{copy.continue}</Link>
        </aside>
      </div>
    </section>
  );
}
