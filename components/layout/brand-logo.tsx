import { siteSettings } from "@/content/site";

type BrandLogoProps = {
  className?: string;
  title?: string;
};

export function BrandLogo({ className = "", title = "Flowers Boutique, Lake Como" }: BrandLogoProps) {
  return <img className={`brand-logo ${className}`} src={siteSettings.logo} alt={title} />;
}
