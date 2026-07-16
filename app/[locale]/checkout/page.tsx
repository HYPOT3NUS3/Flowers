import { CheckoutForm } from "@/components/checkout/checkout-form";
import { Locale } from "@/lib/localization/config";

export default async function CheckoutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return (
    <section className="container-shell py-14">
      <h1 className="serif text-6xl leading-none md:text-8xl">{locale === "ru" ? "Оформление заказа" : locale === "it" ? "Conferma ordine" : "Checkout"}</h1>
      <div className="mt-10">
        <CheckoutForm locale={locale} />
      </div>
    </section>
  );
}
