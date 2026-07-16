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
    <section className="shop-clean-zone py-10 text-center md:py-12">
      <div className="container-shell">
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-end md:justify-between md:text-left">
          <h2 className="serif max-w-2xl text-4xl leading-none md:text-6xl">{title}</h2>
          <button
            className="button-secondary w-fit"
            onClick={() => selectBudget()}
          >
            {locale === "ru" ? "Все" : locale === "it" ? "Tutto" : "All"}
          </button>
        </div>
        <div className="budget-scroll mt-8 flex gap-3 overflow-x-auto pb-2 text-left">
          {budgetBands.map((band) => (
            <button
              key={band.id}
              className={`min-w-[220px] rounded-[1.4rem] p-4 text-left transition hover:-translate-y-1 hover:shadow-[var(--shadow-soft)] ${
                active === band.id ? "border border-ink bg-ink text-porcelain" : "surface-panel"
              }`}
              onClick={() => selectBudget(band.id)}
            >
              <span className="label block">{band.label}</span>
              <span className="mt-3 block text-sm leading-relaxed">{text(band.description, locale)}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
