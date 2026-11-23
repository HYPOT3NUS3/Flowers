"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { budgetBands, BudgetBand } from "@/content/products/types";
import { Locale } from "@/lib/localization/config";
import { text } from "@/lib/localization/strings";

/** Price chips: one tap filters the catalogue by budget. The active chip's description shows below. */
export function BudgetFilter({ locale, title }: { locale: Locale; title: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get("budget") as BudgetBand | null;
  const activeBand = budgetBands.find((band) => band.id === active);
  const allLabel = locale === "ru" ? "Все" : locale === "it" ? "Tutto" : "All";
  const inShop = pathname.endsWith("/shop");

  function selectBudget(id?: BudgetBand) {
    const params = new URLSearchParams(searchParams.toString());
    if (id) params.set("budget", id);
    else params.delete("budget");
    const query = params.toString();
    // On the home page a budget opens the shop; in the shop it filters in place.
    const target = inShop ? pathname : `/${locale}/shop`;
    router.push(`${target}${query ? `?${query}` : ""}`, { scroll: !inShop });
  }

  return (
    <section className="container-shell pb-3 pt-8 md:pb-4 md:pt-10">
      <h2 className="font-serif text-[1.6rem] font-medium leading-tight md:text-[2rem]">{title}</h2>
      <div className="chip-row mt-4" role="group" aria-label={title}>
        <button className="chip" aria-pressed={!active} onClick={() => selectBudget()}>{allLabel}</button>
        {budgetBands.map((band) => (
          <button key={band.id} className="chip tabular-nums" aria-pressed={active === band.id} onClick={() => selectBudget(band.id)}>
            {band.label}
          </button>
        ))}
      </div>
      <p className="mt-3 min-h-6 text-sm text-graphite" aria-live="polite">
        {activeBand ? text(activeBand.description, locale) : null}
      </p>
    </section>
  );
}
