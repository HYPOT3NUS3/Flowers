import { LocalizedText } from "@/lib/localization/strings";

export const siteSettings = {
  brandName: "MUZA",
  descriptor: "Lake Como",
  logo: "/assets/references/moodboard-reference-05-toile.png",
  announcement: {
    ru: "Доставка по Комо и побережью озера",
    en: "Delivery across Como and the Lake Como area",
    it: "Consegna a Como e lungo il Lago di Como"
  } satisfies LocalizedText,
  telephone: "+39 351 809 3005",
  whatsappNumber: "393518093005",
  whatsapp: "https://wa.me/393518093005",
  email: "victoriat@mail.ru",
  instagram: "@muza_lakecomo",
  address: "Lake Como, Italy",
  openingHours: "Mon-Sat 10:00-19:00",
  revolutInstructions: {
    ru: "Данные Revolut/IBAN добавляются администратором. Не используйте этот демо-текст для реальных оплат.",
    en: "Revolut/IBAN details are configured by the administrator. Do not use this demo copy for real payments.",
    it: "I dettagli Revolut/IBAN sono configurati dall'amministratore. Non usare questo testo demo per pagamenti reali."
  }
};

export const navItems = [
  { href: "/about", label: { ru: "О студии", en: "About", it: "Chi siamo" } },
  { href: "/shop", label: { ru: "Коллекции", en: "Collections", it: "Collezioni" } },
  { href: "/proposals", label: { ru: "Предложения", en: "Proposals", it: "Proposte" } },
  { href: "/weddings", label: { ru: "Свадьбы", en: "Weddings", it: "Matrimoni" } },
  { href: "/events", label: { ru: "Мероприятия", en: "Events", it: "Eventi" } },
  { href: "/delivery", label: { ru: "Доставка", en: "Delivery", it: "Consegna" } }
];

export const services = [
  {
    slug: "premium-collections",
    href: "/shop",
    title: { ru: "Премиальные коллекции", en: "Premium collections", it: "Collezioni premium" },
    body: {
      ru: "Авторские букеты в нескольких масштабах для подарка, виллы или события.",
      en: "Signature bouquets for gifting, villas and refined occasions.",
      it: "Bouquet d'autore per regali, ville e occasioni raffinate."
    }
  },
  {
    slug: "wedding-floristry",
    href: "/weddings",
    title: { ru: "Свадебная флористика", en: "Wedding floristry", it: "Floristica per matrimoni" },
    body: {
      ru: "Камерные церемонии, арки, букеты невесты и полное цветочное оформление.",
      en: "Ceremonies, arches, bridal bouquets and complete floral direction.",
      it: "Cerimonie, archi, bouquet da sposa e direzione floreale completa."
    }
  },
  {
    slug: "marriage-proposals",
    href: "/proposals",
    title: { ru: "Предложения руки и сердца", en: "Marriage proposals", it: "Proposte di matrimonio" },
    body: {
      ru: "Романтичные цветочные сцены на озере Комо для самого важного «да».",
      en: "Romantic floral scenes on Lake Como for the most important yes.",
      it: "Scene floreali romantiche sul Lago di Como per il sì più importante."
    }
  },
  {
    slug: "events-workshops",
    href: "/events",
    title: { ru: "Мероприятия и воркшопы", en: "Events and workshops", it: "Eventi e workshop" },
    body: {
      ru: "Мастер-классы, девичники и эстетичные встречи с цветами.",
      en: "Workshops, creative gatherings and flower-led celebrations.",
      it: "Workshop, incontri creativi e celebrazioni con i fiori."
    }
  }
];

export const homeCopy = {
  heroTitle: {
    ru: "Цветы на озере Комо.",
    en: "Artful floristry on Lake Como.",
    it: "Floristica d'autore sul Lago di Como."
  },
  heroText: {
    ru: "Элегантные композиции для подарков, свадеб и особых моментов.",
    en: "Elegant florals for gifts, weddings and meaningful moments.",
    it: "Fiori eleganti per regali, matrimoni e momenti speciali."
  },
  philosophy: {
    ru: "Авторская флористика для тех, кто видит в цветах характер, чувство и тихую роскошь.",
    en: "Artful floristry for those who see flowers as character, emotion and quiet luxury.",
    it: "Floristica d'autore per chi vede nei fiori carattere, emozione e lusso discreto."
  },
  mission: {
    ru: "Каждая доставка — персональный жест внимания.",
    en: "Every delivery becomes a personal gesture.",
    it: "Ogni consegna diventa un gesto personale."
  }
};
