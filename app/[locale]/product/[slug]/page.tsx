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
      <section className="pb-6 md:mx-auto md:grid md:w-[min(1480px,calc(100%-clamp(2rem,5vw,5rem)))] md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:items-start md:gap-14 md:py-12 lg:gap-20">
        <div className="grid gap-4 md:sticky md:top-28">
          {product.images.map((image, index) => (
            <div key={image} data-enter className="photo-frame relative aspect-[4/5] max-h-[78svh] w-full overflow-hidden bg-powder md:max-h-[calc(100svh-9rem)] md:rounded-[0.6rem]">
              <ProductImage src={image} alt={title} loading={index === 0 ? "eager" : "lazy"} sizes="(max-width: 767px) 100vw, 56vw" className="block h-full w-full object-cover" />
            </div>
          ))}
        </div>
        <PurchasePanel product={product} locale={locale} />
      </section>
      <section className="border-t border-[var(--border)] bg-porcelain">
        <div className="container-shell section-pad">
        <h2 data-reveal="lines" className="section-title">{locale === "ru" ? "Похожие композиции" : locale === "it" ? "Composizioni correlate" : "Related arrangements"}</h2>
        <div data-reveal="stagger" className="product-grid mt-10">
          {related.map((item) => <ProductCard key={item.id} product={item} locale={locale} />)}
        </div>
        </div>
      </section>
    </>
  );
}
