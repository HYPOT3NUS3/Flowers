import { LocalizedText } from "@/lib/localization/strings";

export type BudgetBand = "100-150" | "150-200" | "200-300" | "300-500" | "500-plus";

export type Product = {
  id: string;
  slug: string;
  title: LocalizedText;
  shortDescription: LocalizedText;
  fullDescription: LocalizedText;
  exactPrice: number;
  images: string[];
  categories: string[];
  flowerComposition: LocalizedText;
  sizeDescription: LocalizedText;
  careInstructions: LocalizedText;
  seasonalDisclaimer: LocalizedText;
  featured: boolean;
  available: boolean;
  madeToOrder: boolean;
  minimumLeadTimeHours: number;
  seoTitle: LocalizedText;
  seoDescription: LocalizedText;
};

export const budgetBands: {
  id: BudgetBand;
  label: string;
  description: LocalizedText;
}[] = [
  {
    id: "100-150",
    label: "€100-€150",
    description: {
      ru: "Изящные авторские букеты и цветочные комплименты.",
      en: "Elegant signature bouquets and floral compliments.",
      it: "Bouquet d'autore eleganti e pensieri floreali."
    }
  },
  {
    id: "150-200",
    label: "€150-€200",
    description: {
      ru: "Деликатные композиции среднего масштаба.",
      en: "Refined compositions of a delicate medium scale.",
      it: "Composizioni raffinate di delicata dimensione media."
    }
  },
  {
    id: "200-300",
    label: "€200-€300",
    description: {
      ru: "Объемные премиальные букеты.",
      en: "Full, generous premium bouquets.",
      it: "Bouquet ricchi, generosi e di alto livello."
    }
  },
  {
    id: "300-500",
    label: "€300-€500",
    description: {
      ru: "Особые коллекции и масштабные подарки.",
      en: "Exclusive collections and statement gifts.",
      it: "Collezioni esclusive e regali di grande presenza."
    }
  },
  {
    id: "500-plus",
    label: "€500+",
    description: {
      ru: "Индивидуальное флористическое искусство и VIP-композиции.",
      en: "Luxury bespoke floral art and VIP commissions.",
      it: "Arte floreale su misura e commissioni VIP."
    }
  }
];

export function getBudgetBand(price: number): BudgetBand {
  if (price < 150) return "100-150";
  if (price < 200) return "150-200";
  if (price < 300) return "200-300";
  if (price < 500) return "300-500";
  return "500-plus";
}
