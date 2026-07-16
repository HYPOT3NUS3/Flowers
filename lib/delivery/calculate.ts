import { deliveryZones } from "@/content/delivery/zones";
import { Locale } from "@/lib/localization/config";
import { text } from "@/lib/localization/strings";

export function calculateDelivery(input: { town?: string; postalCode?: string; locale?: Locale }) {
  const town = input.town?.trim().toLowerCase();
  const postalCode = input.postalCode?.trim();
  const locale = input.locale || "en";

  const zone = deliveryZones.find((item) => {
    const townMatch = town ? item.towns.includes(town) : false;
    const postalMatch = postalCode ? item.postalCodes.includes(postalCode) : false;
    return item.active && (townMatch || postalMatch);
  });

  if (!zone) {
    return {
      available: false,
      message:
        locale === "ru"
          ? "Запросите индивидуальный расчет доставки."
          : locale === "it"
            ? "Richiedi un preventivo di consegna."
            : "Request a delivery quote."
    };
  }

  return {
    available: true,
    zoneName: text(zone.zoneName, locale),
    deliveryFee: zone.deliveryFee,
    minimumLeadTimeHours: zone.minimumLeadTimeHours,
    availableTimeSlots: zone.availableTimeSlots.map((slot) => text(slot, locale)),
    manualQuote: zone.manualQuote ?? false
  };
}
