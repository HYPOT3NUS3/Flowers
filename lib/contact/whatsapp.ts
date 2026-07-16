import { siteSettings } from "@/content/site";

export function whatsappUrl(message: string) {
  const base = siteSettings.whatsapp || `https://wa.me/${siteSettings.whatsappNumber}`;
  return `${base}?text=${encodeURIComponent(message)}`;
}
