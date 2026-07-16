"use client";

import { useMemo, useState } from "react";
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

  return (
    <div className="shop-clean-zone py-10 md:py-14">
      <div className="container-shell">
        <div className="surface-panel grid gap-4 p-5 md:grid-cols-[1fr_auto_auto] md:items-end">
          <label className="grid gap-2 text-sm">
            <span className="label">{locale === "ru" ? "Поиск" : locale === "it" ? "Cerca" : "Search"}</span>
            <span className="field-shell flex items-center px-3">
              <Search size={17} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="min-h-11 min-w-0 flex-1 bg-transparent px-3"
                placeholder={locale === "ru" ? "Название, цветок, категория" : locale === "it" ? "Nome, fiore, categoria" : "Name, flower, category"}
              />
            </span>
          </label>
          <label className="grid gap-2 text-sm">
            <span className="label">{locale === "ru" ? "Категория" : locale === "it" ? "Categoria" : "Category"}</span>
            <select className="field-shell min-h-11 px-3" value={category} onChange={(event) => setCategory(event.target.value)}>
              {categories.map((item) => <option key={item.id} value={item.id}>{text(item.label, locale)}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm">
            <span className="label">{locale === "ru" ? "Сортировка" : locale === "it" ? "Ordina" : "Sort"}</span>
            <select className="field-shell min-h-11 px-3" value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="featured">{locale === "ru" ? "Рекомендуемые" : locale === "it" ? "Consigliati" : "Featured"}</option>
              <option value="price-asc">€ ↑</option>
              <option value="price-desc">€ ↓</option>
            </select>
          </label>
        </div>
        <div className="mt-8 flex items-center justify-between">
          <p className="label">{filtered.length} {locale === "ru" ? "товаров" : locale === "it" ? "prodotti" : "products"}</p>
        </div>
        {filtered.length ? (
          <div className="product-grid mt-8">
            {filtered.map((product) => <ProductCard key={product.id} product={product} locale={locale} />)}
          </div>
        ) : (
          <div className="surface-panel mt-12 p-10 text-center">
            <p className="serif text-4xl">{locale === "ru" ? "Ничего не найдено." : locale === "it" ? "Nessun risultato." : "No results."}</p>
            <p className="mt-3 text-graphite">{locale === "ru" ? "Попробуйте другой бюджет или запрос." : locale === "it" ? "Prova un altro budget o una nuova ricerca." : "Try another budget or search term."}</p>
          </div>
        )}
      </div>
    </div>
  );
}
