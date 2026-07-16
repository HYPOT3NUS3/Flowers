import { LocalizedText } from "@/lib/localization/strings";

export type StudioEvent = {
  id: string;
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  eventType: "workshop" | "gathering" | "private";
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  price: number;
  seatsTotal: number;
  seatsAvailable: number;
  images: string[];
  bookingEnabled: boolean;
  archived: boolean;
  paymentUrl?: string;
};

// Demo content: replace with Sanity event records when CMS credentials are available.
export const events: StudioEvent[] = [
  {
    id: "e-001",
    slug: "summer-table-flowers",
    title: { ru: "Летний стол у озера", en: "Summer Table by the Lake", it: "Tavola Estiva sul Lago" },
    description: { ru: "Флористический воркшоп по низким настольным композициям.", en: "A floral workshop dedicated to low table arrangements.", it: "Workshop floreale dedicato alle composizioni basse da tavola." },
    eventType: "workshop",
    date: "2026-08-08",
    startTime: "11:00",
    endTime: "13:30",
    location: "Como centro",
    price: 145,
    seatsTotal: 12,
    seatsAvailable: 6,
    images: ["/assets/editorial/generated/workshop-table.png"],
    bookingEnabled: true,
    archived: false
  },
  {
    id: "e-002",
    slug: "villa-flowers-evening",
    title: { ru: "Цветы для вечера на вилле", en: "Villa Flowers Evening", it: "Fiori per una Sera in Villa" },
    description: { ru: "Закрытая встреча о цветах, сервировке и атмосфере приема.", en: "An intimate gathering about flowers, tablescapes and hosting atmosphere.", it: "Un incontro intimo su fiori, mise en place e atmosfera dell'accoglienza." },
    eventType: "gathering",
    date: "2026-09-12",
    startTime: "17:30",
    endTime: "20:00",
    location: "Cernobbio",
    price: 180,
    seatsTotal: 10,
    seatsAvailable: 4,
    images: ["/assets/editorial/generated/villa-interior.png"],
    bookingEnabled: true,
    archived: false
  },
  {
    id: "e-003",
    slug: "bridal-bouquet-study",
    title: { ru: "Эскиз букета невесты", en: "Bridal Bouquet Study", it: "Studio del Bouquet da Sposa" },
    description: { ru: "Мастер-класс о силуэте, пропорции и сезонности свадебного букета.", en: "A masterclass on silhouette, proportion and seasonality in bridal bouquets.", it: "Masterclass su silhouette, proporzione e stagionalità del bouquet da sposa." },
    eventType: "workshop",
    date: "2026-10-04",
    startTime: "10:30",
    endTime: "13:00",
    location: "Lake Como studio",
    price: 160,
    seatsTotal: 14,
    seatsAvailable: 9,
    images: ["/assets/products/generated/blue-white-bouquet.png"],
    bookingEnabled: true,
    archived: false
  },
  {
    id: "e-004",
    slug: "spring-como-archive",
    title: { ru: "Весенняя встреча в Комо", en: "Spring Gathering in Como", it: "Incontro di Primavera a Como" },
    description: { ru: "Архивная встреча о сезонной флористике.", en: "Past gathering on seasonal floristry.", it: "Incontro passato sulla floristica stagionale." },
    eventType: "gathering",
    date: "2026-04-18",
    startTime: "11:00",
    endTime: "13:00",
    location: "Como",
    price: 120,
    seatsTotal: 12,
    seatsAvailable: 0,
    images: ["/assets/editorial/generated/workshop-table.png"],
    bookingEnabled: false,
    archived: true
  },
  {
    id: "e-005",
    slug: "may-villa-table-archive",
    title: { ru: "Майская сервировка виллы", en: "May Villa Tablescape", it: "Mise en Place di Maggio" },
    description: { ru: "Архивный воркшоп о цветах для ужина.", en: "Past workshop on dinner flowers.", it: "Workshop passato sui fiori per la cena." },
    eventType: "workshop",
    date: "2026-05-23",
    startTime: "16:00",
    endTime: "18:00",
    location: "Blevio",
    price: 150,
    seatsTotal: 10,
    seatsAvailable: 0,
    images: ["/assets/editorial/generated/villa-interior.png"],
    bookingEnabled: false,
    archived: true
  },
  {
    id: "e-006",
    slug: "june-proposal-flowers-archive",
    title: { ru: "Цветы для предложения", en: "Flowers for a Proposal", it: "Fiori per una Proposta" },
    description: { ru: "Архивный разговор о романтических локациях Комо.", en: "Past talk about romantic Como locations.", it: "Conversazione passata sulle location romantiche del Lago di Como." },
    eventType: "private",
    date: "2026-06-15",
    startTime: "18:00",
    endTime: "19:30",
    location: "Bellagio",
    price: 95,
    seatsTotal: 8,
    seatsAvailable: 0,
    images: ["/assets/editorial/generated/proposal-lakeside.png"],
    bookingEnabled: false,
    archived: true
  }
];

export function upcomingEvents() {
  const now = new Date();
  return events
    .filter((event) => !event.archived && new Date(event.date) >= now)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function archivedEvents() {
  return events
    .filter((event) => event.archived || new Date(event.date) < new Date())
    .sort((a, b) => b.date.localeCompare(a.date));
}
