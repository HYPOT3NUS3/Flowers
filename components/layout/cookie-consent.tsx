"use client";

import { useState, useSyncExternalStore } from "react";
import { Locale } from "@/lib/localization/config";

const consentKey = "flowers-cookie-consent";

function subscribeToConsent(onChange: () => void) {
  function onStorage(event: StorageEvent) {
    if (event.key === consentKey || event.key === null) onChange();
  }

  window.addEventListener("storage", onStorage);
  return () => window.removeEventListener("storage", onStorage);
}

function shouldShowConsent() {
  try {
    return window.localStorage.getItem(consentKey) !== "accepted";
  } catch {
    return true;
  }
}

function serverConsentSnapshot() {
  return false;
}

export function CookieConsent({ locale }: { locale: Locale }) {
  const [dismissed, setDismissed] = useState(false);
  const visible = useSyncExternalStore(
    subscribeToConsent,
    shouldShowConsent,
    serverConsentSnapshot
  );

  if (!visible || dismissed) return null;

  const copy =
    locale === "ru"
      ? "Мы используем необходимые cookie. Аналитика и сторонние сервисы подключаются только после согласия."
      : locale === "it"
        ? "Usiamo cookie necessari. Analytics e servizi di terze parti si attivano solo dopo il consenso."
        : "We use necessary cookies. Analytics and third-party services load only after consent.";

  return (
    <div role="region" aria-label="Cookies" className="cookie-bar fixed inset-x-0 bottom-0 z-50 border-t border-[var(--border)] bg-porcelain px-4 pb-[calc(0.6rem+env(safe-area-inset-bottom))] pt-2.5 md:inset-x-auto md:bottom-4 md:left-1/2 md:w-[min(92vw,620px)] md:-translate-x-1/2 md:rounded-xl md:border md:p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs leading-[1.45] md:text-sm md:leading-6 text-graphite">{copy}</p>
        <button
          className="button-primary shrink-0 !min-h-11 !px-5"
          onClick={() => {
            try {
              window.localStorage.setItem(consentKey, "accepted");
            } catch {
              // Allow dismissal for this page even when storage is unavailable.
            }
            setDismissed(true);
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
}
