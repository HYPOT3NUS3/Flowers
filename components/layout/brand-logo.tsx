type BrandLogoProps = {
  className?: string;
  title?: string;
};

export function BrandLogo({ className = "", title = "Go Love flowers boutique Lake Como" }: BrandLogoProps) {
  return (
    <svg className={`brand-logo ${className}`} viewBox="0 0 420 190" role="img" aria-label={title}>
      <text className="brand-logo-main" x="210" y="79" textAnchor="middle">Go Love</text>
      <text className="brand-logo-kicker" x="210" y="126" textAnchor="middle">FLOWERS BOUTIQUE</text>
      <text className="brand-logo-location" x="210" y="160" textAnchor="middle">LAKE COMO</text>
    </svg>
  );
}
