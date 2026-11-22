import { notFound } from "next/navigation";
import { ProductCard } from "@/components/shop/product-card";
import { ProductImage } from "@/components/ui/product-image";
import { PurchasePanel } from "@/components/product/purchase-panel";
import { getProduct, products } from "@/content/products/products";
import { Locale } from "@/lib/localization/config";
import { text } from "@/lib/localization/strings";

export function generateStaticParams() {
  return products.flatMap((product) => [
    { locale: "ru", slug: product.slug },
    { locale: "en", slug: product.slug },
    { locale: "it", slug: product.slug }
  ]);
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: text(product.seoTitle, locale),
    description: text(product.seoDescription, locale)
  };
}

export default async function ProductPage({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const title = text(product.title, locale);
  const related = products.filter((item) => item.slug !== product.slug && item.categories.some((category) => product.categories.includes(category))).slice(0, 4);
  const detailHeadings = {
    composition: locale === "ru" ? "Состав" : locale === "it" ? "Composizione" : "Composition",
    scale: locale === "ru" ? "Размер" : locale === "it" ? "Dimensione" : "Scale",
    care: locale === "ru" ? "Уход" : locale === "it" ? "Cura" : "Care",
    seasonal: locale === "ru" ? "Сезонность" : locale === "it" ? "Stagionalità" : "Seasonal note"
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: title,
    description: text(product.shortDescription, locale),
    image: product.images.filter((image) => !image.endsWith("/product-placeholder.svg")),
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: product.exactPrice,
      availability: product.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <section className="container-shell grid items-start gap-5 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-10 md:py-12">
        <div className="grid gap-4">
          {product.images.map((image) => (
            <div key={image} className="aspect-[4/5] max-h-[68svh] w-full self-start overflow-hidden rounded-xl border border-[var(--border)] bg-porcelain md:max-h-[calc(100svh-10rem)]">
              <ProductImage src={image} alt={title} loading="eager" sizes="(max-width: 767px) 94vw, 49vw" className="block h-full w-full object-cover" />
            </div>
          ))}
        </div>
        <PurchasePanel product={product} locale={locale} />
      </section>
      <section className="container-shell grid gap-8 border-y border-[var(--border)] py-12 md:grid-cols-4">
        {[
          [detailHeadings.composition, text(product.flowerComposition, locale)],
          [detailHeadings.scale, text(product.sizeDescription, locale)],
          [detailHeadings.care, text(product.careInstructions, locale)],
          [detailHeadings.seasonal, text(product.seasonalDisclaimer, locale)]
        ].map(([heading, body]) => (
          <div key={heading}>
            <p className="label text-toile">{heading}</p>
            <p className="mt-4 text-sm leading-7 text-graphite">{body}</p>
          </div>
        ))}
      </section>
      <section className="container-shell section-pad">
        <h2 className="section-title">{locale === "ru" ? "Похожие композиции" : locale === "it" ? "Composizioni correlate" : "Related arrangements"}</h2>
        <div className="product-grid mt-10">
          {related.map((item) => <ProductCard key={item.id} product={item} locale={locale} />)}
        </div>
      </section>
    </>
  );
}
