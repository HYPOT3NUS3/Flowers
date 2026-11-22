"use client";

import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { enquirySchema } from "@/lib/validation/schemas";
import { Locale } from "@/lib/localization/config";
import { whatsappUrl } from "@/lib/contact/whatsapp";
import { z } from "zod";

type EnquiryValues = z.infer<typeof enquirySchema>;

export function EnquiryForm({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const errorId = useId();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { preferredLanguage: locale }
  });

  async function onSubmit(values: EnquiryValues) {
    setStatus("loading");
    try {
      const message = [
        locale === "ru" ? "Здравствуйте! Хочу обсудить индивидуальный заказ Flowers Boutique." : locale === "it" ? "Buongiorno! Vorrei parlare di un ordine su misura Flowers Boutique." : "Hello! I would like to discuss a bespoke Flowers Boutique order.",
        "",
        `${locale === "ru" ? "Имя" : locale === "it" ? "Nome" : "Name"}: ${values.name}`,
        `Email: ${values.email}`,
        `${locale === "ru" ? "Телефон" : locale === "it" ? "Telefono" : "Phone"}: ${values.phone}`,
        values.occasion ? `${locale === "ru" ? "Повод" : locale === "it" ? "Occasione" : "Occasion"}: ${values.occasion}` : "",
        values.date ? `${locale === "ru" ? "Дата" : locale === "it" ? "Data" : "Date"}: ${values.date}` : "",
        values.budget ? `${locale === "ru" ? "Бюджет" : locale === "it" ? "Budget" : "Budget"}: ${values.budget}` : "",
        `${locale === "ru" ? "Язык связи" : locale === "it" ? "Lingua di contatto" : "Preferred language"}: ${values.preferredLanguage}`,
        values.message ? `${locale === "ru" ? "Сообщение" : locale === "it" ? "Messaggio" : "Message"}: ${values.message}` : ""
      ].filter(Boolean).join("\n");
      setStatus("success");
      window.location.assign(whatsappUrl(message));
    } catch {
      setStatus("error");
    }
  }

  const labels = {
    name: locale === "ru" ? "Имя" : locale === "it" ? "Nome" : "Name",
    email: "Email",
    phone: locale === "ru" ? "Телефон или WhatsApp" : locale === "it" ? "Telefono o WhatsApp" : "Telephone or WhatsApp",
    occasion: locale === "ru" ? "Повод" : locale === "it" ? "Occasione" : "Occasion",
    date: locale === "ru" ? "Желаемая дата" : locale === "it" ? "Data desiderata" : "Desired date",
    budget: locale === "ru" ? "Бюджет" : locale === "it" ? "Budget indicativo" : "Approximate budget",
    message: locale === "ru" ? "Сообщение" : locale === "it" ? "Messaggio" : "Message"
  };
  const errorLabels: Partial<Record<keyof EnquiryValues, string>> = {
    name: locale === "ru" ? "Введите имя." : locale === "it" ? "Inserisci il nome." : "Please enter your name.",
    email: locale === "ru" ? "Введите корректный email." : locale === "it" ? "Inserisci un'email valida." : "Please enter a valid email address.",
    phone: locale === "ru" ? "Введите телефон или WhatsApp." : locale === "it" ? "Inserisci telefono o WhatsApp." : "Please enter a telephone or WhatsApp number.",
    occasion: locale === "ru" ? "Опишите повод." : locale === "it" ? "Descrivi l'occasione." : "Please describe the occasion.",
    date: locale === "ru" ? "Выберите желаемую дату." : locale === "it" ? "Scegli una data desiderata." : "Please choose a desired date.",
    budget: locale === "ru" ? "Укажите примерный бюджет." : locale === "it" ? "Indica un budget orientativo." : "Please choose an approximate budget.",
    message: locale === "ru" ? "Добавьте несколько деталей." : locale === "it" ? "Aggiungi qualche dettaglio." : "Please add a few details."
  };
  const errorFor = (field: keyof EnquiryValues) => errors[field] ? errorLabels[field] : null;

  const fieldClass = "min-w-0 w-full field-shell min-h-12 px-3 py-2.5 text-sm";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`grid gap-x-4 gap-y-3 ${compact ? "" : "md:grid-cols-2"}`}>
      {(["name", "email", "phone", "occasion", "date", "budget"] as const).map((field) => (
        <label key={field} className="grid min-w-0 gap-1.5 text-sm font-medium">
          {labels[field]}
          <input className={fieldClass} type={field === "date" ? "date" : "text"} inputMode={field === "email" ? "email" : field === "phone" ? "tel" : undefined} autoComplete={field === "name" ? "name" : field === "email" ? "email" : field === "phone" ? "tel" : undefined} aria-invalid={Boolean(errors[field])} aria-describedby={errorFor(field) ? `${errorId}-${field}` : undefined} {...register(field)} />
          {errorFor(field) ? <span id={`${errorId}-${field}`} className="text-xs text-red-700">{errorFor(field)}</span> : null}
        </label>
      ))}
      <label className={`grid min-w-0 gap-1.5 text-sm font-medium ${compact ? "" : "md:col-span-2"}`}>
        {labels.message}
        <textarea className={`${fieldClass} min-h-28`} aria-invalid={Boolean(errors.message)} aria-describedby={errorFor("message") ? `${errorId}-message` : undefined} {...register("message")} />
        {errorFor("message") ? <span id={`${errorId}-message`} className="text-xs text-red-700">{errorFor("message")}</span> : null}
      </label>
      <label className="grid min-w-0 gap-1.5 text-sm font-medium">
        {locale === "ru" ? "Язык связи" : locale === "it" ? "Lingua di contatto" : "Preferred contact language"}
        <select className={fieldClass} {...register("preferredLanguage")}>
          <option value="ru">RU</option>
          <option value="en">EN</option>
          <option value="it">IT</option>
        </select>
      </label>
      <div className={compact ? "" : "md:col-span-2"}>
        <button className="button-primary w-full md:w-auto" disabled={status === "loading"}>
          {status === "loading" ? "..." : locale === "ru" ? "Отправить в WhatsApp" : locale === "it" ? "Invia su WhatsApp" : "Send to WhatsApp"}
        </button>
        {status === "success" ? <p role="status" className="mt-3 text-sm text-graphite">{locale === "ru" ? "Открываем WhatsApp с вашим запросом." : locale === "it" ? "Apriamo WhatsApp con la tua richiesta." : "Opening WhatsApp with your request."}</p> : null}
        {status === "error" ? <p role="alert" className="mt-3 text-sm text-red-700">{locale === "ru" ? "Не удалось подготовить запрос. Попробуйте еще раз." : locale === "it" ? "Impossibile preparare la richiesta. Riprova." : "The request could not be prepared. Please try again."}</p> : null}
      </div>
    </form>
  );
}
