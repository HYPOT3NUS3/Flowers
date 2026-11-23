"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { ProductCard } from "./product-card";
import { products } from "@/content/products/products";
import { BudgetBand, getBudgetBand } from "@/content/products/types";
import { Locale } from "@/lib/localization/config";
import { text } from "@/lib/localization/strings";

const categories = [
  { id: "all", label: { ru: "Все", en: "All", it: "Tutti" } },
  { id: "signature", label: { ru: "Авторские букеты", en: "Signature bouquets", it: "Bouquet d'autore" } },
  { id: "seasonal", label: { ru: "Сезонные цветы", en: "Seasonal flowers", it: "Fiori stagionali" } },
  { id: "roses", label: { ru: "Розы", en: "Roses", it: "Rose" } },
  { id: "table", label: { ru: "Настольные композиции", en: "Table arrangements", it: "Composizioni da tavola" } },
  { id: "gifts", label: { ru: "Подарки", en: "Gifts", it: "Regali" } },
  { id: "bespoke", label: { ru: "Индивидуальные", en: "Bespoke", it: "Su misura" } }
];

export function ShopCatalogue({ locale }: { locale: Locale }) {
  const searchParams = useSearchParams();
  const budget = searchParams.get("budget") as BudgetBand | null;
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const wantsSearch = searchParams.get("search") === "1";

  // The header's search icon opens the shop ready to type.
  useEffect(() => {
    if (!wantsSearch) return;
    searchRef.current?.focus({ preventScroll: true });
    searchRef.current?.scrollIntoView({ block: "center" });
  }, [wantsSearch]);
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return products
      .filter((product) => (budget ? getBudgetBand(product.exactPrice) === budget : true))
      .filter((product) => (category === "all" ? true : product.categories.includes(category)))
      .filter((product) => {
        if (!normalized) return true;
        const haystack = [
          text(product.title, locale),
          text(product.shortDescription, locale),
          text(product.fullDescription, locale),
          text(product.flowerComposition, locale),
          ...product.categories
        ].join(" ").toLowerCase();
        return haystack.includes(normalized);
      })
      .sort((a, b) => {
        if (sort === "price-asc") return a.exactPrice - b.exactPrice;
        if (sort === "price-desc") return b.exactPrice - a.exactPrice;
        return Number(b.featured) - Number(a.featured);
      });
  }, [budget, category, locale, query, sort]);

  const t = (ru: string, en: string, it: string) => (locale === "ru" ? ru : locale === "it" ? it : en);

  return (
    <div className="pb-16 md:pb-24">
      <div className="container-shell">
        <div className="border-y border-[var(--border)] py-4">
          <div className="chip-row" role="group" aria-label={t("Категория", "Category", "Categoria")}>
            {categories.map((item) => (
              <button key={item.id} className="chip" aria-pressed={category === item.id} onClick={() => setCategory(item.id)}>
                {text(item.label, locale)}
              </button>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] gap-2.5">
            <label className="field-shell flex min-w-0 items-center px-3">
              <Search size={17} className="shrink-0 text-graphite" aria-hidden="true" />
              <span className="sr-only">{t("Поиск", "Search", "Cerca")}</span>
              <input
                ref={searchRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="min-h-11 min-w-0 flex-1 bg-transparent px-3 text-base md:text-sm"
                placeholder={t("Поиск букетов", "Search bouquets", "Cerca bouquet")}
              />
            </label>
            <label className="field-shell flex items-center">
              <span className="sr-only">{t("Сортировка", "Sort", "Ordina")}</span>
              <select className="min-h-11 bg-transparent pl-3 pr-2 text-base md:text-sm" value={sort} onChange={(event) => setSort(event.target.value)}>
                <option value="featured">{t("Рекомендуемые", "Featured", "Consigliati")}</option>
                <option value="price-asc">{t("Цена ↑", "Price ↑", "Prezzo ↑")}</option>
                <option value="price-desc">{t("Цена ↓", "Price ↓", "Prezzo ↓")}</option>
              </select>
            </label>
          </div>
        </div>
        <p className="mt-6 text-sm text-graphite" role="status">
          {filtered.length} {t("товаров", "arrangements", "composizioni")}
        </p>
        {filtered.length ? (
          <div className="product-grid mt-4">
            {filtered.map((product) => <ProductCard key={product.id} product={product} locale={locale} />)}
          </div>
        ) : (
          <div className="mt-12 border-y border-[var(--border)] py-14 text-center">
            <p className="section-title">{t("Ничего не найдено.", "No results.", "Nessun risultato.")}</p>
            <p className="mt-3 text-graphite">{t("Попробуйте другой бюджет или запрос.", "Try another budget or search term.", "Prova un altro budget o una nuova ricerca.")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
