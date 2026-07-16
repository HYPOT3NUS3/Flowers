export type DeliveryZone = {
  zoneName: string;
  towns: string[];
  postalCodes: string[];
  deliveryFee: number;
  minimumLeadTimeHours: number;
  availableTimeSlots: string[];
  active: boolean;
  manualQuote?: boolean;
};

// Editable demonstration values. Replace fees and coverage with verified commercial data before launch.
export const deliveryZones: DeliveryZone[] = [
  {
    zoneName: "Como centro",
    towns: ["como"],
    postalCodes: ["22100"],
    deliveryFee: 18,
    minimumLeadTimeHours: 24,
    availableTimeSlots: ["10:00-12:00", "12:00-15:00", "15:00-18:00"],
    active: true
  },
  {
    zoneName: "Lake Como nearby towns",
    towns: ["cernobbio", "blevio", "brunate", "lipomo", "moltrasio"],
    postalCodes: ["22012", "22020", "22034", "22030", "22010"],
    deliveryFee: 32,
    minimumLeadTimeHours: 36,
    availableTimeSlots: ["11:00-14:00", "15:00-18:00"],
    active: true
  },
  {
    zoneName: "Lake villas and distant destinations",
    towns: ["bellagio", "menaggio", "tremozzo", "varenna"],
    postalCodes: ["22021", "22017", "22016", "23829"],
    deliveryFee: 65,
    minimumLeadTimeHours: 72,
    availableTimeSlots: ["By appointment"],
    active: true,
    manualQuote: true
  }
];
