import type { MetadataRoute } from "next";
import { products } from "@/content/products/products";
import { locales } from "@/lib/localization/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const staticPages = ["", "/shop", "/services", "/weddings", "/proposals", "/events", "/about", "/delivery", "/contact"];
  return [
    ...locales.flatMap((locale) =>
      staticPages.map((path) => ({
        url: `${base}/${locale}${path}`,
        lastModified: new Date()
      }))
    ),
    ...locales.flatMap((locale) =>
      products.map((product) => ({
        url: `${base}/${locale}/product/${product.slug}`,
        lastModified: new Date()
      }))
    )
  ];
}
