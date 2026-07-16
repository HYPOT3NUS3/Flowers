"use client";

import { useState } from "react";
import { Locale } from "@/lib/localization/config";

export function CookieConsent({ locale }: { locale: Locale }) {
  const [visible, setVisible] = useState(
    () => typeof window !== "undefined" && localStorage.getItem("flowers-cookie-consent") !== "accepted"
  );

  if (!visible) return null;

  const copy =
    locale === "ru"
      ? "Мы используем необходимые cookie. Аналитика и сторонние сервисы подключаются только после согласия."
      : locale === "it"
        ? "Usiamo cookie necessari. Analytics e servizi di terze parti si attivano solo dopo il consenso."
        : "We use necessary cookies. Analytics and third-party services load only after consent.";

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[min(92vw,620px)] -translate-x-1/2 border border-[var(--border)] bg-porcelain p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm leading-6 text-graphite">{copy}</p>
        <button
          className="button-primary shrink-0"
          onClick={() => {
            localStorage.setItem("flowers-cookie-consent", "accepted");
            setVisible(false);
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
}
