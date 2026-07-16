import { CartPageClient } from "@/components/cart/cart-page-client";
import { Locale } from "@/lib/localization/config";

export default async function CartPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return <CartPageClient locale={locale} />;
}
