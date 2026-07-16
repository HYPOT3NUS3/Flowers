import { redirect } from "next/navigation";
import { Locale } from "@/lib/localization/config";

export default async function WorkshopsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  redirect(`/${locale}/events`);
}
