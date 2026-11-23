"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { Locale } from "@/lib/localization/config";
import { formatCurrency } from "@/lib/localization/strings";
import { ProductImage } from "@/components/ui/product-image";
import { useCart, useCartTotals } from "./cart-store";

export function CartDrawer({ locale }: { locale: Locale }) {
  const { items, drawerOpen, closeDrawer, removeItem, updateQuantity } = useCart();
  const { subtotal } = useCartTotals();
  const pathname = usePathname();

  // Close on navigation and on Escape.
  useEffect(() => {
    closeDrawer();
  }, [pathname, closeDrawer]);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && closeDrawer();
    window.addEventListener("keydown", onKey);
    document.documentElement.classList.add("drawer-open");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("drawer-open");
    };
  }, [drawerOpen, closeDrawer]);
  const copy = {
    bag: locale === "ru" ? "Корзина" : locale === "it" ? "Carrello" : "Cart",
    close: locale === "ru" ? "Закрыть корзину" : locale === "it" ? "Chiudi il carrello" : "Close cart",
    empty: locale === "ru" ? "Корзина пуста." : locale === "it" ? "Il carrello è vuoto." : "Your cart is empty.",
    remove: locale === "ru" ? "Удалить" : locale === "it" ? "Rimuovi" : "Remove",
    qty: locale === "ru" ? "Количество" : locale === "it" ? "Quantità" : "Quantity",
    subtotal: locale === "ru" ? "Итог" : locale === "it" ? "Subtotale" : "Subtotal",
    viewBag: locale === "ru" ? "Корзина" : locale === "it" ? "Vedi carrello" : "View cart",
    checkout: locale === "ru" ? "Оформить заказ" : locale === "it" ? "Conferma ordine" : "Checkout"
  };

  if (!drawerOpen) return null;

  return (
    <div data-lenis-prevent className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={copy.bag}>
      <button className="cart-backdrop absolute inset-0 bg-ink/30" aria-label={copy.close} onClick={closeDrawer} />
      <aside className="cart-panel absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-porcelain shadow-2xl">
        <div className="flex items-center justify-between border-b border-[var(--border)] p-5">
          <p className="font-serif text-2xl font-medium">{copy.bag}</p>
          <button className="flex min-h-11 min-w-11 items-center justify-center rounded-full transition hover:bg-ink hover:text-porcelain" onClick={closeDrawer} aria-label={copy.close}>
            <X />
          </button>
        </div>
        <div data-lenis-prevent className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5">
          {items.length === 0 ? (
            <p className="section-title">{copy.empty}</p>
          ) : (
            <div className="grid gap-5">
              {items.map((item) => (
                <div key={item.id} className="grid grid-cols-[clamp(64px,20vw,92px)_minmax(0,1fr)] gap-3 sm:gap-4">
                  <div className="aspect-[4/5] overflow-hidden rounded-[0.4rem] bg-powder">
                    <ProductImage src={item.image} alt={item.title} sizes="92px" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <p className="product-card-name">{item.title}</p>
                      <button className="min-h-11 text-xs uppercase tracking-[0.08em] hover:underline" onClick={() => removeItem(item.id)}>{copy.remove}</button>
                    </div>
                    <p className="mt-1 text-sm text-graphite">{formatCurrency(item.price)}</p>
                    <label className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                      {copy.qty}
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(event) => updateQuantity(item.id, Number(event.target.value))}
                        className="field-shell min-h-11 w-16 px-2 py-1"
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="border-t border-[var(--border)] px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-5">
          <div className="mb-4 flex justify-between">
            <span>{copy.subtotal}</span>
            <strong>{formatCurrency(subtotal)}</strong>
          </div>
          <div className="grid gap-3">
            <Link href={`/${locale}/cart`} className="button-secondary" onClick={closeDrawer}>
              {copy.viewBag}
            </Link>
            <Link href={`/${locale}/checkout`} className="button-primary" onClick={closeDrawer}>
              {copy.checkout}
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
