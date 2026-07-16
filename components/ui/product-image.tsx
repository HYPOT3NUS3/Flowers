import Image from "next/image";

export function ProductImage({
  src,
  alt,
  className
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const classes = className || "h-full w-full object-cover";

  if (src.startsWith("http")) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={classes} loading="lazy" />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={1500}
      unoptimized={src.endsWith(".svg")}
      sizes="(max-width: 768px) 50vw, 25vw"
      className={classes}
    />
  );
}
