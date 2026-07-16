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
  const addLabel = locale === "ru" ? "Добавить" : locale === "it" ? "Aggiungi" : "Add";
  const bespokeLabel = locale === "ru" ? "Индивидуально" : locale === "it" ? "Su misura" : "Bespoke";

  return (
    <article className="group flex h-full min-w-0 flex-col">
      <Link href={`/${locale}/product/${product.slug}`} className="flex flex-1 flex-col">
        <div className="lift-card relative aspect-[4/5] overflow-hidden rounded-[1.35rem] bg-porcelain fine-border">
          <ProductImage src={product.images[0]} alt={title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]" />
        </div>
        <div className="mt-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="serif text-xl leading-tight md:text-2xl">{title}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-graphite">{text(product.shortDescription, locale)}</p>
          </div>
          <p className="shrink-0 text-sm">{formatCurrency(product.exactPrice)}</p>
        </div>
      </Link>
      <button
        className="button-secondary mt-4 w-full"
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
        <ShoppingBag size={16} aria-hidden="true" />
        {isBespoke ? bespokeLabel : addLabel}
      </button>
    </article>
  );
}
