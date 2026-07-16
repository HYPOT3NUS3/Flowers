"use client";

import Link from "next/link";
import { Locale } from "@/lib/localization/config";
import { formatCurrency } from "@/lib/localization/strings";
import { ProductImage } from "@/components/ui/product-image";
import { useCart, useCartTotals } from "./cart-store";

export function CartPageClient({ locale }: { locale: Locale }) {
  const { items, removeItem, updateQuantity } = useCart();
  const { subtotal } = useCartTotals();

  if (!items.length) {
    return (
      <section className="container-shell py-20 text-center">
        <h1 className="serif text-6xl">{locale === "ru" ? "Корзина пуста." : locale === "it" ? "La borsa è vuota." : "Your bag is empty."}</h1>
        <Link href={`/${locale}/shop`} className="button-primary mt-8">{locale === "ru" ? "Смотреть коллекции" : locale === "it" ? "Scopri le collezioni" : "View collections"}</Link>
      </section>
    );
  }

  return (
    <section className="container-shell py-14">
      <h1 className="serif text-6xl leading-none md:text-8xl">{locale === "ru" ? "Корзина" : locale === "it" ? "Borsa" : "Shopping bag"}</h1>
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
                  {item.deliveryDate || (locale === "ru" ? "Дата открыта" : locale === "it" ? "Data aperta" : "Open date")} / {item.deliveryTimeSlot || (locale === "ru" ? "Время открыто" : locale === "it" ? "Orario aperto" : "Open slot")}
                </p>
                <button className="mt-4 text-xs uppercase tracking-[0.12em]" onClick={() => removeItem(item.id)}>{locale === "ru" ? "Удалить" : locale === "it" ? "Rimuovi" : "Remove"}</button>
              </div>
              <label className="grid h-fit gap-2 text-sm">
                {locale === "ru" ? "Кол-во" : locale === "it" ? "Qtà" : "Qty"}
                <input className="field-shell w-24 px-3 py-2" type="number" min="1" value={item.quantity} onChange={(event) => updateQuantity(item.id, Number(event.target.value))} />
              </label>
            </article>
          ))}
        </div>
        <aside className="surface-panel h-fit p-5">
          <div className="flex justify-between">
            <span>{locale === "ru" ? "Итог" : "Subtotal"}</span>
            <strong>{formatCurrency(subtotal)}</strong>
          </div>
          <p className="mt-4 text-sm leading-6 text-graphite">
            {locale === "ru"
              ? "Доставка рассчитывается на следующем шаге по CAP и городу. Итоговая композиция совпадает с каталогом на 95-99%."
              : locale === "it"
                ? "La consegna viene calcolata nel passaggio successivo in base a CAP e località. La composizione finale corrisponde al catalogo per il 95-99%."
                : "Delivery is calculated in the next step by postal code and town. The final arrangement corresponds to the catalogue by 95-99%."}
          </p>
          <Link href={`/${locale}/checkout`} className="button-primary mt-6 w-full">{locale === "ru" ? "Оформить заказ" : locale === "it" ? "Vai al checkout" : "Proceed to checkout"}</Link>
          <Link href={`/${locale}/shop`} className="button-secondary mt-3 w-full">{locale === "ru" ? "Продолжить покупки" : locale === "it" ? "Continua lo shopping" : "Continue shopping"}</Link>
        </aside>
      </div>
    </section>
  );
}
