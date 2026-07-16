import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(6, "Please enter a telephone or WhatsApp number."),
  occasion: z.string().min(2, "Please describe the occasion."),
  date: z.string().min(1, "Please choose a desired date."),
  budget: z.string().min(1, "Please choose an approximate budget."),
  message: z.string().min(10, "Please add a few details."),
  preferredLanguage: z.enum(["ru", "en", "it"])
});

export const checkoutSchema = z.object({
  customerName: z.string().min(2, "Enter the customer name."),
  customerEmail: z.string().email("Enter a valid customer email."),
  customerPhone: z.string().min(6, "Enter the customer telephone."),
  recipientName: z.string().min(2, "Enter the recipient name."),
  recipientPhone: z.string().min(6, "Enter the recipient telephone."),
  anonymousDelivery: z.boolean().default(false),
  street: z.string().min(4, "Enter the street address."),
  apartment: z.string().optional(),
  town: z.string().min(2, "Enter the town."),
  postalCode: z.string().min(4, "Enter the CAP/postal code."),
  deliveryDate: z.string().min(1, "Choose a delivery date."),
  deliveryTimeSlot: z.string().min(1, "Choose a delivery time slot."),
  deliveryInstructions: z.string().optional(),
  conciergeContact: z.string().optional(),
  cardMessage: z.string().optional(),
  blankCard: z.boolean().default(false),
  anonymousSender: z.boolean().default(false),
  paymentMethod: z.enum(["stripe", "revolut", "cash"]),
  terms: z.literal(true, { error: "Accept the terms to continue." }),
  privacy: z.literal(true, { error: "Acknowledge the privacy notice to continue." }),
  seasonalDisclaimer: z.literal(true, { error: "Acknowledge the seasonal floral disclaimer." })
});
