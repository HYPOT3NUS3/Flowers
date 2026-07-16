import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe/server";

type CheckoutItem = {
  title: string;
  price: number;
  quantity: number;
  slug: string;
};

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.items?.length) {
    return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
  }

  const stripe = getStripe();
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const locale = body.locale || "ru";

  if (!stripe) {
    return NextResponse.json({
      demo: true,
      message: "Stripe is not configured. Demo checkout created; no payment was processed."
    });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    currency: "eur",
    line_items: (body.items as CheckoutItem[]).map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "eur",
        unit_amount: Math.round(item.price * 100),
        product_data: {
          name: item.title,
          metadata: {
            slug: item.slug
          }
        }
      }
    })),
    success_url: `${base}/${locale}/order-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${base}/${locale}/checkout`,
    metadata: {
      locale,
      deliveryTown: body.values?.town || "",
      deliveryPostalCode: body.values?.postalCode || "",
      deliveryDate: body.values?.deliveryDate || ""
    }
  });

  return NextResponse.json({ url: session.url });
}
