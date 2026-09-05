import { useMemo } from "react";
import { CATEGORY_LABELS, type Category } from "../data/products";
import { useStore, type SortKey } from "../store/StoreContext";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";
import { BeanIcon, XIcon } from "./icons";

const CATEGORIES: (Category | "all")[] = ["all", "single-origin", "blend", "decaf"];

const SORTS: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "score", label: "Cup score" },
  { key: "price-asc", label: "Price · low to high" },
  { key: "price-desc", label: "Price · high to low" },
];

export default function Shop() {
  const { products, search, setSearch, category, setCategory, sort, setSort } = useStore();

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = products.filter((p) => {
      const inCat = category === "all" || p.category === category;
      if (!inCat) return false;
      if (!q) return true;
      const hay = [p.name, p.origin, p.process, p.varietal, p.roastLabel, ...p.notes]
        .join(" ")
        .toLowerCase();
      return q.split(/\s+/).every((w) => hay.includes(w));
    });
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "score":
        list = [...list].sort((a, b) => b.score - a.score);
        break;
      default:
        break;
    }
    return list;
  }, [products, search, category, sort]);

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    map.set("all", products.length);
    products.forEach((p) => map.set(p.category, (map.get(p.category) ?? 0) + 1));
    return map;
  }, [products]);

  return (
    <section id="shop" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 scroll-mt-24">
      {/* header */}
      <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <div>
          <p className="text-copper-400 text-[11px] font-semibold tracking-[0.3em] uppercase">
            Roasted this Tuesday · in stock now
          </p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl text-cream-100 tracking-tight">
            The shelf
            <span className="text-outline font-light italic"> — six beans</span>
          </h2>
        </div>
        <p className="max-w-md text-cream-400 leading-relaxed text-sm sm:text-base lg:text-right">
          Everything below left the roaster this week. Pick a grind, or take it
          whole and let your burrs do the talking.
        </p>
      </Reveal>

      {/* controls */}
      <Reveal delay={80} className="mt-10 flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
          {CATEGORIES.map((c) => {
            const active = category === c;
            return (
              <button
                key={c}
                role="tab"
                aria-selected={active}
                onClick={() => setCategory(c)}
                className={`rounded-full px-4.5 py-2 text-sm font-medium border transition-all duration-300 active:scale-95 ${
                  active
                    ? "bg-copper-500 border-copper-500 text-bean-950 shadow-[0_0_22px_rgba(212,127,44,0.35)]"
                    : "border-bean-600/80 text-cream-300 hover:border-copper-500/60 hover:text-copper-300"
                }`}
              >
                {CATEGORY_LABELS[c]}
                <span className={`ml-2 text-xs ${active ? "text-bean-800" : "text-cream-500"}`}>
                  {counts.get(c) ?? 0}
                </span>
              </button>
            );
          })}
        </div>

        <div className="md:ml-auto flex items-center gap-3">
          {search.trim() && (
            <span className="inline-flex items-center gap-2 rounded-full bg-bean-800 border border-bean-600/70 px-3.5 py-1.5 text-sm text-cream-300">
              “{search.trim()}”
              <button
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="text-cream-500 hover:text-copper-400 transition-colors"
              >
                <XIcon className="w-3.5 h-3.5" />
              </button>
            </span>
          )}
          <label className="relative">
            <span className="sr-only">Sort products</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="appearance-none rounded-full bg-bean-800 border border-bean-600/80 text-cream-200 text-sm pl-4.5 pr-10 py-2 outline-none focus:border-copper-500/70 cursor-pointer transition-colors"
            >
              {SORTS.map((s) => (
                <option key={s.key} value={s.key} className="bg-bean-900">
                  {s.label}
                </option>
              ))}
            </select>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-500">
              <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </label>
        </div>
      </Reveal>

      <p className="mt-6 text-sm text-cream-500" aria-live="polite">
        Showing <span className="text-copper-300 font-semibold">{filtered.length}</span>{" "}
        {filtered.length === 1 ? "coffee" : "coffees"}
        {category !== "all" && <> in {CATEGORY_LABELS[category].toLowerCase()}</>}
      </p>

      {/* grid / empty state */}
      {filtered.length > 0 ? (
        <div className="mt-6 grid sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
          {filtered.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 90} as="div">
              <ProductCard product={p} index={i} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-lg border border-dashed border-bean-600 bg-bean-900/50 py-20 flex flex-col items-center text-center px-6">
          <BeanIcon className="w-12 h-12 text-bean-500" />
          <h3 className="mt-5 font-display text-2xl text-cream-200">No beans in this corner</h3>
          <p className="mt-2 max-w-sm text-cream-500 text-sm leading-relaxed">
            Nothing matches “{search.trim()}”{category !== "all" && " in this category"}.
            Try a tasting note like <em className="text-copper-300 not-italic">caramel</em> or an origin like{" "}
            <em className="text-copper-300 not-italic">Ethiopia</em>.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setCategory("all");
            }}
            className="mt-6 rounded-full border border-copper-500/60 text-copper-300 font-semibold text-sm px-6 py-2.5 transition-all hover:bg-copper-500 hover:text-bean-950 active:scale-95"
          >
            Clear search & filters
          </button>
        </div>
      )}
    </section>
  );
}
