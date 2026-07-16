import { NextResponse } from "next/server";
import { calculateDelivery } from "@/lib/delivery/calculate";
import { isLocale } from "@/lib/localization/config";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  return NextResponse.json(calculateDelivery({ town: body.town, postalCode: body.postalCode, locale: isLocale(body.locale) ? body.locale : "en" }));
}
