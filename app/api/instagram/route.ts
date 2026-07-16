import { NextResponse } from "next/server";
import { getInstagramFeed } from "@/lib/instagram/feed";

export async function GET() {
  const feed = await getInstagramFeed();
  return NextResponse.json({ data: feed });
}
