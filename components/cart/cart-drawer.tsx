"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { Locale } from "@/lib/localization/config";
import { formatCurrency } from "@/lib/localization/strings";
import { ProductImage } from "@/components/ui/product-image";
import { useCart, useCartTotals } from "./cart-store";

export function CartDrawer({ locale }: { locale: Locale }) {
  const { items, drawerOpen, closeDrawer, removeItem, updateQuantity } = useCart();
  const { subtotal } = useCartTotals();

  if (!drawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Shopping bag">
      <button className="absolute inset-0 bg-ink/25" aria-label="Close cart" onClick={closeDrawer} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-porcelain shadow-2xl">
        <div className="flex items-center justify-between border-b border-[var(--border)] p-5">
          <p className="label">{locale === "ru" ? "Корзина" : locale === "it" ? "Borsa" : "Shopping bag"}</p>
          <button className="flex min-h-11 min-w-11 items-center justify-center rounded-full transition hover:bg-ink hover:text-porcelain" onClick={closeDrawer} aria-label="Close cart">
            <X />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <p className="serif text-3xl">{locale === "ru" ? "Корзина пуста." : locale === "it" ? "La borsa è vuota." : "Your bag is empty."}</p>
          ) : (
            <div className="grid gap-5">
              {items.map((item) => (
                <div key={item.id} className="grid grid-cols-[92px_1fr] gap-4">
                  <div className="aspect-[4/5] overflow-hidden border border-[var(--border)]">
                    <ProductImage src={item.image} alt={item.title} />
                  </div>
                  <div>
                    <div className="flex justify-between gap-3">
                      <p className="serif text-xl">{item.title}</p>
                      <button className="text-xs uppercase tracking-[0.12em]" onClick={() => removeItem(item.id)}>{locale === "ru" ? "Удалить" : locale === "it" ? "Rimuovi" : "Remove"}</button>
                    </div>
                    <p className="mt-1 text-sm text-graphite">{formatCurrency(item.price)}</p>
                    <label className="mt-3 flex items-center gap-2 text-sm">
                      {locale === "ru" ? "Кол-во" : locale === "it" ? "Qtà" : "Qty"}
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(event) => updateQuantity(item.id, Number(event.target.value))}
                        className="field-shell w-16 px-2 py-1"
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="border-t border-[var(--border)] p-5">
          <div className="mb-4 flex justify-between">
            <span>{locale === "ru" ? "Итог" : "Subtotal"}</span>
            <strong>{formatCurrency(subtotal)}</strong>
          </div>
          <div className="grid gap-3">
            <Link href={`/${locale}/cart`} className="button-secondary" onClick={closeDrawer}>
              {locale === "ru" ? "Корзина" : locale === "it" ? "Borsa" : "View bag"}
            </Link>
            <Link href={`/${locale}/checkout`} className="button-primary" onClick={closeDrawer}>
              {locale === "ru" ? "Оформить заказ" : locale === "it" ? "Checkout" : "Checkout"}
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
