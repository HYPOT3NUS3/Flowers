import Image from "next/image";

export function ProductImage({
  src,
  alt,
  className,
  loading = "lazy",
  sizes = "(max-width: 768px) 50vw, 25vw"
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  loading?: "eager" | "lazy";
}) {
  const classes = className || "h-full w-full object-cover";

  // Older carts can still carry a retired image path in local storage.
  const placeholder = src.includes("/generated/") || src.startsWith("/assets/photography/") || src.endsWith("/product-placeholder.svg");
  if (placeholder) return <span aria-hidden="true" className="product-photo-placeholder block h-full w-full" />;

  if (src.startsWith("http")) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={classes} loading={loading} />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={1500}
      unoptimized={src.endsWith(".svg")}
      loading={loading}
      sizes={sizes}
      className={classes}
    />
  );
}
