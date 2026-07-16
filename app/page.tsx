import { redirect } from "next/navigation";
import { defaultLocale } from "@/lib/localization/config";

export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
