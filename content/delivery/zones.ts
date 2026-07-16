import { LocalizedText } from "@/lib/localization/strings";

export type DeliveryZone = {
  zoneName: LocalizedText;
  towns: string[];
  townLabels: LocalizedText[];
  postalCodes: string[];
  deliveryFee: number;
  minimumLeadTimeHours: number;
  availableTimeSlots: LocalizedText[];
  active: boolean;
  manualQuote?: boolean;
};

// Editable demonstration values. Replace fees and coverage with verified commercial data before launch.
export const deliveryZones: DeliveryZone[] = [
  {
    zoneName: { ru: "Центр Комо", en: "Como centre", it: "Como centro" },
    towns: ["como"],
    townLabels: [{ ru: "Комо", en: "Como", it: "Como" }],
    postalCodes: ["22100"],
    deliveryFee: 18,
    minimumLeadTimeHours: 24,
    availableTimeSlots: [
      { ru: "10:00-12:00", en: "10:00-12:00", it: "10:00-12:00" },
      { ru: "12:00-15:00", en: "12:00-15:00", it: "12:00-15:00" },
      { ru: "15:00-18:00", en: "15:00-18:00", it: "15:00-18:00" }
    ],
    active: true
  },
  {
    zoneName: { ru: "Ближайшие города у озера Комо", en: "Lake Como nearby towns", it: "Paesi vicini sul Lago di Como" },
    towns: ["cernobbio", "blevio", "brunate", "lipomo", "moltrasio"],
    townLabels: [
      { ru: "Черноббио", en: "Cernobbio", it: "Cernobbio" },
      { ru: "Блевио", en: "Blevio", it: "Blevio" },
      { ru: "Брунате", en: "Brunate", it: "Brunate" },
      { ru: "Липомо", en: "Lipomo", it: "Lipomo" },
      { ru: "Мольтразио", en: "Moltrasio", it: "Moltrasio" }
    ],
    postalCodes: ["22012", "22020", "22034", "22030", "22010"],
    deliveryFee: 32,
    minimumLeadTimeHours: 36,
    availableTimeSlots: [
      { ru: "11:00-14:00", en: "11:00-14:00", it: "11:00-14:00" },
      { ru: "15:00-18:00", en: "15:00-18:00", it: "15:00-18:00" }
    ],
    active: true
  },
  {
    zoneName: { ru: "Виллы и дальние направления у озера", en: "Lake villas and distant destinations", it: "Ville e destinazioni più lontane sul lago" },
    towns: ["bellagio", "menaggio", "tremozzo", "varenna"],
    townLabels: [
      { ru: "Белладжо", en: "Bellagio", it: "Bellagio" },
      { ru: "Менаджо", en: "Menaggio", it: "Menaggio" },
      { ru: "Тремеццо", en: "Tremezzo", it: "Tremezzo" },
      { ru: "Варенна", en: "Varenna", it: "Varenna" }
    ],
    postalCodes: ["22021", "22017", "22016", "23829"],
    deliveryFee: 65,
    minimumLeadTimeHours: 72,
    availableTimeSlots: [{ ru: "По договоренности", en: "By appointment", it: "Su appuntamento" }],
    active: true,
    manualQuote: true
  }
];
