import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { GRINDS, formatPrice, type Grind } from "../data/products";
import { useStore } from "../store/StoreContext";
import {
  DropIcon,
  LeafIcon,
  MinusIcon,
  MountainIcon,
  PlusIcon,
  XIcon,
} from "./icons";

function Spec({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 rounded-md bg-bean-800/70 border border-bean-700/60 px-3.5 py-3">
      <span className="text-copper-400 mt-0.5">{icon}</span>
      <span>
        <span className="block text-[10px] tracking-[0.2em] uppercase text-cream-500">{label}</span>
        <span className="block text-sm text-cream-200 mt-0.5 leading-snug">{value}</span>
      </span>
    </div>
  );
}

export default function ProductModal() {
  const { products, selectedId, closeProduct, addToCart, setCartOpen } = useStore();
  const product = useMemo(
    () => products.find((p) => p.id === selectedId) ?? null,
    [products, selectedId],
  );

  const [grind, setGrind] = useState<Grind>("Whole bean");
  const [qty, setQtyLocal] = useState(1);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (product) {
      setGrind("Whole bean");
      setQtyLocal(1);
      closeRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeProduct();
    };
    if (product) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [product, closeProduct]);

  if (!product) return null;

  const total = product.price * qty;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name} details`}
    >
      <button
        aria-label="Close product details"
        onClick={closeProduct}
        className="absolute inset-0 bg-bean-950/80 backdrop-blur-sm cursor-default"
      />
      <div className="toast-in relative w-full sm:max-w-3xl max-h-[92svh] overflow-y-auto rounded-t-xl sm:rounded-lg border border-bean-600/70 bg-bean-900 shadow-[0_40px_120px_rgba(8,4,1,0.8)]">
        <button
          ref={closeRef}
          onClick={closeProduct}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-bean-950/70 border border-bean-600/70 text-cream-300 flex items-center justify-center transition-all hover:border-copper-500 hover:text-copper-300 hover:rotate-90 duration-300"
        >
          <XIcon className="w-4.5 h-4.5" />
        </button>

        <div className="grid md:grid-cols-2">
          {/* image side */}
          <div className="relative aspect-[5/4] md:aspect-auto md:min-h-[540px] overflow-hidden bg-gradient-to-br from-bean-800 to-bean-900">
            <img
              src={product.image}
              alt={`${product.name} coffee bag`}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bean-950/60 via-transparent to-transparent" />
            {product.badge && (
              <span
                className="absolute top-4 left-4 text-[10px] font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full bg-bean-950/85 border"
                style={{ color: product.accent, borderColor: `${product.accent}59` }}
              >
                {product.badge}
              </span>
            )}
            <span className="absolute bottom-4 left-4 font-display italic text-cream-200/90 text-lg">
              Cup score {product.score.toFixed(1)}
            </span>
          </div>

          {/* info side */}
          <div className="p-6 sm:p-8 flex flex-col">
            <p className="text-[11px] tracking-[0.24em] uppercase text-copper-400 font-semibold">
              {product.origin}
            </p>
            <h3 className="mt-2 font-display text-3xl sm:text-4xl text-cream-100 leading-tight">
              {product.name}
            </h3>
            <p className="mt-1.5 text-cream-500 text-sm">
              {product.weight} · {product.roastLabel} roast
            </p>

            <p className="mt-4 text-cream-300 text-[15px] leading-relaxed">{product.description}</p>

            {/* tasting notes */}
            <div className="mt-5 flex flex-wrap gap-2">
              {product.notes.map((n) => (
                <span
                  key={n}
                  className="rounded-full border px-3.5 py-1.5 text-sm"
                  style={{ borderColor: `${product.accent}55`, color: product.accent }}
                >
                  {n}
                </span>
              ))}
            </div>

            {/* specs */}
            <div className="mt-5 grid grid-cols-2 gap-2.5">
              <Spec icon={<DropIcon className="w-4.5 h-4.5" />} label="Process" value={product.process} />
              <Spec icon={<MountainIcon className="w-4.5 h-4.5" />} label="Altitude" value={product.altitude} />
              <Spec icon={<LeafIcon className="w-4.5 h-4.5" />} label="Varietal" value={product.varietal} />
              <Spec
                icon={
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4.5 h-4.5">
                    <circle cx="12" cy="12" r="8.5" />
                    <path d="M12 7.5V12l3 2" strokeLinecap="round" />
                  </svg>
                }
                label="Roast level"
                value={`${product.roastLevel} / 5 — ${product.roastLabel}`}
              />
            </div>

            {/* grind */}
            <fieldset className="mt-6">
              <legend className="text-[10px] tracking-[0.22em] uppercase text-cream-500 mb-2.5">
                Grind
              </legend>
              <div className="flex flex-wrap gap-2">
                {GRINDS.map((g) => (
                  <button
                    key={g}
                    onClick={() => setGrind(g)}
                    aria-pressed={grind === g}
                    className={`rounded-full px-4 py-2 text-sm font-medium border transition-all duration-200 active:scale-95 ${
                      grind === g
                        ? "bg-cream-100 border-cream-100 text-bean-950"
                        : "border-bean-600 text-cream-300 hover:border-copper-500/60 hover:text-copper-300"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* qty + add */}
            <div className="mt-6 flex items-stretch gap-3">
              <div className="flex items-center rounded-full border border-bean-600 bg-bean-800/70">
                <button
                  onClick={() => setQtyLocal((q) => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                  aria-label="Decrease quantity"
                  className="w-11 h-11 flex items-center justify-center text-cream-300 transition-colors hover:text-copper-300 disabled:opacity-30 disabled:hover:text-cream-300"
                >
                  <MinusIcon className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-display text-lg text-cream-100" aria-live="polite">
                  {qty}
                </span>
                <button
                  onClick={() => setQtyLocal((q) => Math.min(12, q + 1))}
                  disabled={qty >= 12}
                  aria-label="Increase quantity"
                  className="w-11 h-11 flex items-center justify-center text-cream-300 transition-colors hover:text-copper-300 disabled:opacity-30 disabled:hover:text-cream-300"
                >
                  <PlusIcon className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => {
                  addToCart(product, grind, qty);
                  closeProduct();
                  setCartOpen(true);
                }}
                className="flex-1 rounded-full bg-copper-500 hover:bg-copper-400 text-bean-950 font-semibold text-sm px-6 transition-all duration-300 hover:shadow-[0_0_28px_rgba(212,127,44,0.45)] active:scale-[0.98]"
              >
                Add {qty} × {product.weight} — {formatPrice(total)}
              </button>
            </div>

            <p className="mt-4 text-xs text-cream-500 leading-relaxed">
              Roasted {product.roastLabel.toLowerCase()} on Tuesday, rested 24 h, shipped in a
              one-way-valve bag with the roast date stamped on the back.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
