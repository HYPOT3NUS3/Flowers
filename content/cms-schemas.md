# Sanity CMS Schema Notes

Use these models when connecting Sanity. The local data files mirror these fields so page components can keep the same shape.

## Product

- id
- slug
- titleRu, titleEn, titleIt
- shortDescriptionRu, shortDescriptionEn, shortDescriptionIt
- fullDescriptionRu, fullDescriptionEn, fullDescriptionIt
- exactPrice
- budgetBand: calculate from exactPrice in the frontend/data layer
- images
- categories
- flowerCompositionRu, flowerCompositionEn, flowerCompositionIt
- sizeDescriptionRu, sizeDescriptionEn, sizeDescriptionIt
- careInstructionsRu, careInstructionsEn, careInstructionsIt
- seasonalDisclaimerRu, seasonalDisclaimerEn, seasonalDisclaimerIt
- featured
- available
- madeToOrder
- minimumLeadTimeHours
- seoTitleRu, seoTitleEn, seoTitleIt
- seoDescriptionRu, seoDescriptionEn, seoDescriptionIt

## Event

- id
- slug
- titleRu, titleEn, titleIt
- descriptionRu, descriptionEn, descriptionIt
- eventType
- date
- startTime
- endTime
- location
- price
- seatsTotal
- seatsAvailable
- images
- bookingEnabled
- archived
- paymentUrl

## Delivery Zone

- zoneName
- towns
- postalCodes
- deliveryFee
- minimumLeadTimeHours
- availableTimeSlots
- active
- manualQuote

## Site Settings

- announcementRu, announcementEn, announcementIt
- contact telephone
- WhatsApp link
- email
- Instagram handle
- studio address
- opening hours
- Revolut payment instructions
- social links
