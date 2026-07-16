import { NextResponse } from "next/server";
import { calculateDelivery } from "@/lib/delivery/calculate";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  return NextResponse.json(calculateDelivery({ town: body.town, postalCode: body.postalCode }));
}
