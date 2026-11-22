"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { budgetBands, BudgetBand } from "@/content/products/types";
import { Locale } from "@/lib/localization/config";
import { text } from "@/lib/localization/strings";

export function BudgetFilter({ locale, title }: { locale: Locale; title: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get("budget") as BudgetBand | null;

  function selectBudget(id?: BudgetBand) {
    const params = new URLSearchParams(searchParams.toString());
    if (id) {
      params.set("budget", id);
    } else {
      params.delete("budget");
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <section className="shop-clean-zone py-6 md:py-9">
      <div className="container-shell">
        <div className="flex items-center justify-between gap-3">
          <h2 className="item-title max-w-2xl">{title}</h2>
          <button
            className="button-secondary shrink-0"
            aria-pressed={!active}
            onClick={() => selectBudget()}
          >
            {locale === "ru" ? "Все" : locale === "it" ? "Tutto" : "All"}
          </button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2.5 text-left sm:grid-cols-3 lg:mt-5 lg:grid-cols-5">
          {budgetBands.map((band) => (
            <button
              key={band.id}
              className={`min-w-0 rounded-xl p-3 text-left transition-colors last:col-span-2 hover:border-ink/50 sm:last:col-span-1 md:p-4 ${
                active === band.id ? "border border-ink bg-ink text-porcelain" : "surface-panel"
              }`}
              aria-pressed={active === band.id}
              onClick={() => selectBudget(band.id)}
            >
              <span className="label block">{band.label}</span>
              <span className="mt-1.5 block text-[0.82rem] leading-5 md:text-sm">{text(band.description, locale)}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
