type BrandLogoProps = {
  className?: string;
  title?: string;
};

export function BrandLogo({ className = "", title = "Go Love flowers boutique Lake Como" }: BrandLogoProps) {
  return (
    <svg className={`brand-logo ${className}`} viewBox="0 0 560 252" role="img" aria-label={title}>
      <text className="brand-logo-main" x="280" y="108" textAnchor="middle">Go Love</text>
      <line className="brand-logo-rule" x1="68" y1="151" x2="492" y2="151" />
      <text className="brand-logo-kicker" x="280" y="203" textAnchor="middle">FLOWERS BOUTIQUE</text>
      <text className="brand-logo-location" x="280" y="238" textAnchor="middle">LAKE COMO</text>
    </svg>
  );
}
