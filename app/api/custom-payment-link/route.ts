import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const token = request.headers.get("authorization")?.replace("Bearer ", "");

  if (body.type === "enquiry") {
    return NextResponse.json({
      ok: true,
      demo: true,
      message: "Enquiry stored in demo mode. Configure Resend or a CRM integration for production."
    });
  }

  if (!process.env.STRIPE_PAYMENT_LINK_ADMIN_TOKEN || token !== process.env.STRIPE_PAYMENT_LINK_ADMIN_TOKEN) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: "Stripe is not configured." }, { status: 501 });
  }

  return NextResponse.json({
    ok: true,
    message: "Create a product and price through Stripe here for bespoke payment links."
  });
}
