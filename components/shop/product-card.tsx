"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Product } from "@/content/products/types";
import { Locale } from "@/lib/localization/config";
import { formatCurrency, text } from "@/lib/localization/strings";
import { ProductImage } from "@/components/ui/product-image";
import { useCart } from "@/components/cart/cart-store";

export function ProductCard({ product, locale }: { product: Product; locale: Locale }) {
  const addItem = useCart((state) => state.addItem);
  const title = text(product.title, locale);
  const isBespoke = product.exactPrice >= 500;
  const addLabel = locale === "ru" ? "В корзину" : locale === "it" ? "Aggiungi al carrello" : "Add to cart";
  const bespokeLabel = locale === "ru" ? "Индивидуально" : locale === "it" ? "Su misura" : "Bespoke";

  return (
    <article className="group flex h-full min-w-0 flex-col">
      <Link href={`/${locale}/product/${product.slug}`} className="flex flex-1 flex-col">
        <div className="lift-card photo-frame relative aspect-[4/5] overflow-hidden rounded-xl bg-porcelain fine-border">
          <ProductImage src={product.images[0]} alt={title} sizes="(max-width: 359px) calc(100vw - 32px), (max-width: 767px) 46vw, (max-width: 1023px) 31vw, (max-width: 1560px) 23vw, 350px" className="h-full w-full object-cover" />
        </div>
        <div className="mt-3 grid flex-1 grid-cols-[minmax(0,1fr)] grid-rows-[1fr_auto] gap-1 min-[1180px]:grid-cols-[minmax(0,1fr)_auto] min-[1180px]:grid-rows-1 min-[1180px]:gap-2">
          <div className="min-w-0">
            <h3 className="product-name break-words">{title}</h3>
            <p className="mt-1 text-[0.82rem] leading-5 md:text-sm text-graphite">{text(product.shortDescription, locale)}</p>
          </div>
          <p className="whitespace-nowrap text-sm tabular-nums">{formatCurrency(product.exactPrice)}</p>
        </div>
      </Link>
      <button
        className="button-secondary product-action mt-3 w-full"
        onClick={() =>
          isBespoke
            ? window.location.assign(`/${locale}/contact?service=bespoke`)
            : addItem({
                id: product.id,
                slug: product.slug,
                title,
                price: product.exactPrice,
                image: product.images[0]
              })
        }
      >
        <ShoppingBag size={16} className="hidden shrink-0 min-[1180px]:block" aria-hidden="true" />
        {isBespoke ? bespokeLabel : addLabel}
      </button>
    </article>
  );
}
