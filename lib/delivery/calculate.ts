import { deliveryZones } from "@/content/delivery/zones";

export function calculateDelivery(input: { town?: string; postalCode?: string }) {
  const town = input.town?.trim().toLowerCase();
  const postalCode = input.postalCode?.trim();

  const zone = deliveryZones.find((item) => {
    const townMatch = town ? item.towns.includes(town) : false;
    const postalMatch = postalCode ? item.postalCodes.includes(postalCode) : false;
    return item.active && (townMatch || postalMatch);
  });

  if (!zone) {
    return {
      available: false,
      message: "Request a delivery quote."
    };
  }

  return {
    available: true,
    zoneName: zone.zoneName,
    deliveryFee: zone.deliveryFee,
    minimumLeadTimeHours: zone.minimumLeadTimeHours,
    availableTimeSlots: zone.availableTimeSlots,
    manualQuote: zone.manualQuote ?? false
  };
}
