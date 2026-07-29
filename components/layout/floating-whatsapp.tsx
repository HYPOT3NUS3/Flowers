import { MessageCircle } from "lucide-react";
import { Locale } from "@/lib/localization/config";
import { whatsappUrl } from "@/lib/contact/whatsapp";

export function FloatingWhatsApp({ locale }: { locale: Locale }) {
  const message =
    locale === "ru"
      ? "Здравствуйте! У меня есть вопрос о go love."
      : locale === "it"
        ? "Buongiorno! Ho una domanda su go love."
        : "Hello! I have a question about go love.";
  const label =
    locale === "ru"
      ? "Написать в WhatsApp"
      : locale === "it"
        ? "Scrivi su WhatsApp"
        : "Message on WhatsApp";

  return (
    <a className="whatsapp-float" href={whatsappUrl(message)} aria-label={label}>
      <MessageCircle size={24} strokeWidth={1.8} aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </a>
  );
}
