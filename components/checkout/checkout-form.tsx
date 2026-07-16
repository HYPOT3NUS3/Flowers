"use client";

import { useMemo, useState } from "react";
import { UseFormRegisterReturn, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { checkoutSchema } from "@/lib/validation/schemas";
import { Locale } from "@/lib/localization/config";
import { formatCurrency } from "@/lib/localization/strings";
import { useCart, useCartTotals } from "@/components/cart/cart-store";
import { whatsappUrl } from "@/lib/contact/whatsapp";

type CheckoutInput = z.input<typeof checkoutSchema>;
type CheckoutOutput = z.output<typeof checkoutSchema>;

export function CheckoutForm({ locale }: { locale: Locale }) {
  const items = useCart((state) => state.items);
  const clearCart = useCart((state) => state.clearCart);
  const { subtotal } = useCartTotals();
  const [delivery, setDelivery] = useState<{ available: boolean; deliveryFee?: number; zoneName?: string; message?: string } | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [manualErrors, setManualErrors] = useState<Partial<Record<keyof CheckoutInput, string>>>({});
  const {
    register,
    getValues,
  } = useForm<CheckoutInput, unknown, CheckoutOutput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      anonymousDelivery: false,
      blankCard: false,
      anonymousSender: false,
      paymentMethod: "stripe"
    }
  });
  const total = useMemo(() => subtotal + (delivery?.deliveryFee || 0), [delivery, subtotal]);
  const errorFor = (name: keyof CheckoutInput) => manualErrors[name];

  async function checkDelivery() {
    const { town, postalCode } = getValues();
    const response = await fetch("/api/delivery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ town, postalCode })
    });
    setDelivery(await response.json());
  }

  async function onSubmit(values: CheckoutOutput) {
    setStatus("loading");
    try {
      const orderLines = items.map((item) =>
        `- ${item.title} x ${item.quantity} (${formatCurrency(item.price * item.quantity)})${item.deliveryDate ? `, ${item.deliveryDate}` : ""}${item.deliveryTimeSlot ? `, ${item.deliveryTimeSlot}` : ""}`
      );
      const message = [
        locale === "ru" ? "Здравствуйте! Хочу оформить заказ MUZA." : locale === "it" ? "Buongiorno! Vorrei confermare un ordine MUZA." : "Hello! I would like to place a MUZA order.",
        "",
        locale === "ru" ? "Состав заказа:" : locale === "it" ? "Ordine:" : "Order:",
        ...orderLines,
        "",
        `${locale === "ru" ? "Сумма" : locale === "it" ? "Totale" : "Total"}: ${formatCurrency(total)}`,
        delivery?.zoneName ? `${locale === "ru" ? "Доставка" : locale === "it" ? "Consegna" : "Delivery"}: ${delivery.zoneName}, ${formatCurrency(delivery.deliveryFee || 0)}` : "",
        "",
        `${locale === "ru" ? "Покупатель" : locale === "it" ? "Cliente" : "Customer"}: ${values.customerName}`,
        `Email: ${values.customerEmail}`,
        `${locale === "ru" ? "Телефон" : locale === "it" ? "Telefono" : "Phone"}: ${values.customerPhone}`,
        `${locale === "ru" ? "Получатель" : locale === "it" ? "Destinatario" : "Recipient"}: ${values.recipientName}`,
        `${locale === "ru" ? "Телефон получателя" : locale === "it" ? "Telefono destinatario" : "Recipient phone"}: ${values.recipientPhone}`,
        `${locale === "ru" ? "Адрес" : locale === "it" ? "Indirizzo" : "Address"}: ${values.street}, ${values.apartment || ""}, ${values.town}, ${values.postalCode}`,
        `${locale === "ru" ? "Дата и время" : locale === "it" ? "Data e orario" : "Date and time"}: ${values.deliveryDate}, ${values.deliveryTimeSlot}`,
        values.deliveryInstructions ? `${locale === "ru" ? "Инструкции" : locale === "it" ? "Istruzioni" : "Instructions"}: ${values.deliveryInstructions}` : "",
        values.conciergeContact ? `${locale === "ru" ? "Контакт на месте" : locale === "it" ? "Contatto in loco" : "On-site contact"}: ${values.conciergeContact}` : "",
        values.cardMessage ? `${locale === "ru" ? "Текст открытки" : locale === "it" ? "Messaggio biglietto" : "Card message"}: ${values.cardMessage}` : "",
        values.anonymousDelivery ? (locale === "ru" ? "Доставка анонимно." : locale === "it" ? "Consegna anonima." : "Anonymous delivery.") : "",
        values.anonymousSender ? (locale === "ru" ? "Отправитель анонимно." : locale === "it" ? "Mittente anonimo." : "Anonymous sender.") : ""
      ].filter(Boolean).join("\n");
      clearCart();
      window.location.assign(whatsappUrl(message));
    } catch {
      setStatus("error");
    }
  }

  function handleManualSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = checkoutSchema.safeParse(getValues());
    if (!parsed.success) {
      const flattened = parsed.error.flatten().fieldErrors;
      setManualErrors(
        Object.fromEntries(
          Object.entries(flattened).map(([key, value]) => [key, value?.[0]])
        ) as Partial<Record<keyof CheckoutInput, string>>
      );
      return;
    }
    setManualErrors({});
    void onSubmit(parsed.data);
  }

  const copy = {
    empty: locale === "ru" ? "Добавьте композиции перед оформлением." : locale === "it" ? "Aggiungi composizioni prima del checkout." : "Add arrangements before checkout.",
    customer: locale === "ru" ? "Покупатель" : locale === "it" ? "Cliente" : "Customer",
    recipient: locale === "ru" ? "Получатель" : locale === "it" ? "Destinatario" : "Recipient",
    delivery: locale === "ru" ? "Доставка" : locale === "it" ? "Consegna" : "Delivery",
    gift: locale === "ru" ? "Открытка и подтверждение" : locale === "it" ? "Biglietto e conferma" : "Gift and confirmation",
    name: locale === "ru" ? "Имя" : locale === "it" ? "Nome" : "Name",
    email: "Email",
    phone: locale === "ru" ? "Телефон / WhatsApp" : locale === "it" ? "Telefono / WhatsApp" : "Phone / WhatsApp",
    recipientName: locale === "ru" ? "Имя получателя" : locale === "it" ? "Nome destinatario" : "Recipient name",
    recipientPhone: locale === "ru" ? "Телефон получателя" : locale === "it" ? "Telefono destinatario" : "Recipient phone",
    anonymousDelivery: locale === "ru" ? "Анонимная доставка" : locale === "it" ? "Consegna anonima" : "Anonymous delivery",
    street: locale === "ru" ? "Улица и номер дома" : locale === "it" ? "Via e numero civico" : "Street address",
    apartment: locale === "ru" ? "Квартира, вилла или отель" : locale === "it" ? "Appartamento, villa o hotel" : "Apartment, villa or hotel",
    town: locale === "ru" ? "Город" : locale === "it" ? "Località" : "Town",
    postalCode: locale === "ru" ? "Индекс / CAP" : locale === "it" ? "CAP" : "Postal code",
    date: locale === "ru" ? "Дата доставки" : locale === "it" ? "Data di consegna" : "Delivery date",
    time: locale === "ru" ? "Время доставки" : locale === "it" ? "Fascia oraria" : "Delivery time slot",
    choose: locale === "ru" ? "Выберите" : locale === "it" ? "Scegli" : "Choose",
    appointment: locale === "ru" ? "По договоренности" : locale === "it" ? "Su appuntamento" : "By appointment",
    instructions: locale === "ru" ? "Комментарий к доставке" : locale === "it" ? "Istruzioni di consegna" : "Delivery instructions",
    concierge: locale === "ru" ? "Контакт консьержа или виллы" : locale === "it" ? "Contatto concierge o villa" : "Hotel concierge or villa contact",
    calculate: locale === "ru" ? "Рассчитать доставку" : locale === "it" ? "Calcola consegna" : "Calculate delivery",
    card: locale === "ru" ? "Текст для открытки" : locale === "it" ? "Messaggio per il biglietto" : "Complimentary card message",
    blankCard: locale === "ru" ? "Оставить открытку пустой" : locale === "it" ? "Lasciare il biglietto vuoto" : "Leave the card blank",
    anonymousSender: locale === "ru" ? "Анонимный отправитель" : locale === "it" ? "Mittente anonimo" : "Anonymous sender",
    terms: locale === "ru" ? "Я принимаю условия." : locale === "it" ? "Accetto i termini." : "I accept the terms.",
    privacy: locale === "ru" ? "Я ознакомлен(а) с политикой конфиденциальности." : locale === "it" ? "Ho letto l'informativa privacy." : "I acknowledge the privacy notice.",
    seasonal: locale === "ru" ? "Я понимаю, что сезонные цветы могут отличаться на 1-5%." : locale === "it" ? "Confermo il disclaimer stagionale 95-99%." : "I acknowledge the 95-99% seasonal floral disclaimer.",
    order: locale === "ru" ? "Заказ" : locale === "it" ? "Ordine" : "Order",
    subtotal: locale === "ru" ? "Сумма" : locale === "it" ? "Subtotale" : "Subtotal",
    total: locale === "ru" ? "Итого" : locale === "it" ? "Totale" : "Total",
    send: locale === "ru" ? "Отправить в WhatsApp" : locale === "it" ? "Invia su WhatsApp" : "Send to WhatsApp",
    success: locale === "ru" ? "Заказ подготовлен для WhatsApp." : locale === "it" ? "Ordine preparato per WhatsApp." : "Order prepared for WhatsApp.",
    error: locale === "ru" ? "Не удалось подготовить заказ. Попробуйте еще раз." : locale === "it" ? "Impossibile preparare l'ordine. Riprova." : "Failed to prepare the order. Please try again."
  };
  const field = "w-full field-shell px-3 py-3 text-sm";
  const sectionTitle = "serif text-3xl";

  if (!items.length) {
    return <p className="serif text-4xl">{copy.empty}</p>;
  }

  return (
    <form onSubmit={handleManualSubmit} className="grid gap-10 lg:grid-cols-[1fr_360px]">
      <div className="grid gap-8">
        <section className="surface-panel grid gap-4 p-5 md:grid-cols-2">
          <h2 className={`${sectionTitle} md:col-span-2`}>{copy.customer}</h2>
          <Input label={copy.name} error={errorFor("customerName")} className={field} props={register("customerName")} />
          <Input label={copy.email} error={errorFor("customerEmail")} className={field} props={register("customerEmail")} />
          <Input label={copy.phone} error={errorFor("customerPhone")} className={field} props={register("customerPhone")} />
        </section>
        <section className="surface-panel grid gap-4 p-5 md:grid-cols-2">
          <h2 className={`${sectionTitle} md:col-span-2`}>{copy.recipient}</h2>
          <Input label={copy.recipientName} error={errorFor("recipientName")} className={field} props={register("recipientName")} />
          <Input label={copy.recipientPhone} error={errorFor("recipientPhone")} className={field} props={register("recipientPhone")} />
          <Checkbox label={copy.anonymousDelivery} props={register("anonymousDelivery")} />
        </section>
        <section className="surface-panel grid gap-4 p-5 md:grid-cols-2">
          <h2 className={`${sectionTitle} md:col-span-2`}>{copy.delivery}</h2>
          <Input label={copy.street} error={errorFor("street")} className={field} props={register("street")} />
          <Input label={copy.apartment} error={errorFor("apartment")} className={field} props={register("apartment")} />
          <Input label={copy.town} error={errorFor("town")} className={field} props={register("town")} />
          <Input label={copy.postalCode} error={errorFor("postalCode")} className={field} props={register("postalCode")} />
          <Input label={copy.date} type="date" error={errorFor("deliveryDate")} className={field} props={register("deliveryDate")} />
          <label className="grid gap-2 text-sm">
            {copy.time}
            <select className={field} {...register("deliveryTimeSlot")}>
              <option value="">{copy.choose}</option>
              <option>10:00-12:00</option>
              <option>12:00-15:00</option>
              <option>15:00-18:00</option>
              <option>{copy.appointment}</option>
            </select>
            {errorFor("deliveryTimeSlot") ? <span className="text-xs text-red-700">{errorFor("deliveryTimeSlot")}</span> : null}
          </label>
          <Input label={copy.instructions} error={errorFor("deliveryInstructions")} className={field} props={register("deliveryInstructions")} />
          <Input label={copy.concierge} error={errorFor("conciergeContact")} className={field} props={register("conciergeContact")} />
          <button type="button" className="button-secondary md:col-span-2" onClick={checkDelivery}>{copy.calculate}</button>
          {delivery ? (
            <p className="md:col-span-2 text-sm text-graphite">
              {delivery.available ? `${delivery.zoneName}: ${formatCurrency(delivery.deliveryFee || 0)}` : delivery.message}
            </p>
          ) : null}
        </section>
        <section className="surface-panel grid gap-4 p-5">
          <h2 className={sectionTitle}>{copy.gift}</h2>
          <textarea className={`${field} min-h-28`} placeholder={copy.card} {...register("cardMessage")} />
          <Checkbox label={copy.blankCard} props={register("blankCard")} />
          <Checkbox label={copy.anonymousSender} props={register("anonymousSender")} />
          <div className="grid gap-2 text-sm text-graphite">
            <p>{locale === "ru" ? "После отправки откроется WhatsApp с готовым текстом заказа. Оплату и детали мы подтвердим в переписке." : locale === "it" ? "Dopo l'invio si aprirà WhatsApp con il riepilogo dell'ordine. Confermeremo pagamento e dettagli in chat." : "After sending, WhatsApp opens with your order summary. Payment and details will be confirmed in chat."}</p>
          </div>
          <Checkbox label={copy.terms} props={register("terms")} error={errorFor("terms")} />
          <Checkbox label={copy.privacy} props={register("privacy")} error={errorFor("privacy")} />
          <Checkbox label={copy.seasonal} props={register("seasonalDisclaimer")} error={errorFor("seasonalDisclaimer")} />
        </section>
      </div>
      <aside className="surface-panel h-fit p-5">
        <h2 className="serif text-3xl">{copy.order}</h2>
        <div className="mt-5 grid gap-3 text-sm">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between gap-3">
              <span>{item.title} x {item.quantity}</span>
              <span>{formatCurrency(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 border-t border-[var(--border)] pt-5">
          <div className="flex justify-between"><span>{copy.subtotal}</span><strong>{formatCurrency(subtotal)}</strong></div>
          <div className="mt-2 flex justify-between"><span>{copy.delivery}</span><strong>{delivery?.deliveryFee ? formatCurrency(delivery.deliveryFee) : "-"}</strong></div>
          <div className="mt-4 flex justify-between text-lg"><span>{copy.total}</span><strong>{formatCurrency(total)}</strong></div>
        </div>
        <button className="button-primary mt-6 w-full" disabled={status === "loading"}>{status === "loading" ? "..." : copy.send}</button>
        {status === "success" ? <p className="mt-4 text-sm text-graphite">{copy.success}</p> : null}
        {status === "error" ? <p className="mt-4 text-sm text-red-700">{copy.error}</p> : null}
      </aside>
    </form>
  );
}

function Input({ label, props, error, className, type = "text" }: { label: string; props: UseFormRegisterReturn; error?: string; className: string; type?: string }) {
  return (
    <label className="grid gap-2 text-sm">
      {label}
      <input type={type} className={className} {...props} />
      {error ? <span className="text-xs text-red-700">{error}</span> : null}
    </label>
  );
}

function Checkbox({ label, props, error }: { label: string; props: UseFormRegisterReturn; error?: string }) {
  return (
    <label className="flex items-start gap-3 text-sm">
      <input type="checkbox" className="mt-1" {...props} />
      <span>{label}{error ? <span className="block text-xs text-red-700">{error}</span> : null}</span>
    </label>
  );
}
