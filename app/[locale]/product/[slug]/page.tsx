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
    image: product.images,
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
      <section className="container-shell grid gap-10 py-10 md:grid-cols-[1.05fr_0.95fr] md:py-16">
        <div className="grid gap-4">
          {product.images.map((image) => (
            <div key={image} className="lift-card aspect-[4/5] overflow-hidden border border-[var(--border)] bg-porcelain">
              <ProductImage src={image} alt={title} />
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
        <h2 className="serif text-5xl leading-none">{locale === "ru" ? "Похожие композиции" : locale === "it" ? "Composizioni correlate" : "Related arrangements"}</h2>
        <div className="product-grid mt-10">
          {related.map((item) => <ProductCard key={item.id} product={item} locale={locale} />)}
        </div>
      </section>
    </>
  );
}
