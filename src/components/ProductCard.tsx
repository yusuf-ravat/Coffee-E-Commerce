import { formatPrice, type Product } from "../data/products";
import { useStore } from "../store/StoreContext";
import { BeanDot, CartIcon, PlusIcon, SearchIcon } from "./icons";

function RoastMeter({ level, label, accent }: { level: number; label: string; accent: string }) {
  return (
    <div className="flex items-center gap-1.5" title={`${label} roast`}>
      <div className="flex gap-[3px]">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className="w-[7px] h-[7px] rounded-full transition-colors"
            style={{
              background: i <= level ? accent : "color-mix(in srgb, var(--color-cream-500) 22%, transparent)",
            }}
          />
        ))}
      </div>
      <span className="text-[10px] tracking-[0.14em] uppercase text-cream-500">{label}</span>
    </div>
  );
}

export default function ProductCard({ product, index }: { product: Product; index: number }) {
  const { addToCart, openProduct } = useStore();

  return (
    <article
      className="group relative flex flex-col rounded-lg overflow-hidden border border-bean-700/70 bg-bean-900/70 transition-all duration-500 hover:border-copper-500/50 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(10,5,2,0.6)] cursor-pointer"
      style={{ transitionDelay: `${(index % 3) * 40}ms` }}
      onClick={() => openProduct(product.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter") openProduct(product.id);
      }}
      tabIndex={0}
      aria-label={`View details for ${product.name}`}
    >
      {/* image */}
      <div className="relative aspect-[5/4] overflow-hidden bg-gradient-to-br from-bean-800 to-bean-900">
        <img
          src={product.image}
          alt={`${product.name} — ${product.origin}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bean-950/70 via-transparent to-bean-950/10" />
        {product.badge && (
          <span
            className="absolute top-3.5 left-3.5 text-[10px] font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full bg-bean-950/85 border"
            style={{ color: product.accent, borderColor: `${product.accent}59` }}
          >
            {product.badge}
          </span>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            openProduct(product.id);
          }}
          className="absolute bottom-3.5 right-3.5 flex items-center gap-2 rounded-full bg-bean-950/85 border border-cream-500/25 text-cream-200 text-xs font-medium px-4 py-2 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 hover:border-copper-400 hover:text-copper-300"
        >
          <SearchIcon className="w-3.5 h-3.5" />
          Quick view
        </button>
        <span className="absolute bottom-3.5 left-3.5 text-[10px] font-semibold tracking-[0.2em] uppercase text-cream-300/90 bg-bean-950/60 backdrop-blur-sm px-2.5 py-1 rounded-full">
          {product.weight}
        </span>
      </div>

      {/* body */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] tracking-[0.22em] uppercase text-cream-500">{product.origin}</p>
          <RoastMeter level={product.roastLevel} label={product.roastLabel} accent={product.accent} />
        </div>

        <div className="mt-2 flex items-start justify-between gap-4">
          <h3 className="font-display text-[1.45rem] leading-tight text-cream-100 group-hover:text-copper-300 transition-colors duration-300">
            {product.name}
          </h3>
          <p className="font-display text-lg text-cream-200 shrink-0 mt-0.5">
            {formatPrice(product.price)}
          </p>
        </div>

        <p className="mt-2.5 flex flex-wrap gap-x-2.5 gap-y-1 text-sm text-cream-400">
          {product.notes.map((n, i) => (
            <span key={n} className="inline-flex items-center gap-2.5">
              {i > 0 && <BeanDot className="w-1.5 h-1.5 text-bean-500" />}
              {n}
            </span>
          ))}
        </p>

        <div className="mt-auto pt-5 flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, "Whole bean", 1);
            }}
            className="flex-1 inline-flex items-center justify-center gap-2.5 rounded-full bg-copper-500 hover:bg-copper-400 text-bean-950 font-semibold text-sm py-2.5 transition-all duration-300 active:scale-[0.97] hover:shadow-[0_0_24px_rgba(212,127,44,0.4)]"
          >
            <PlusIcon className="w-4 h-4" strokeWidth={2.2} />
            Add to crate
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              openProduct(product.id);
            }}
            aria-label={`Details for ${product.name}`}
            className="w-10 h-10 shrink-0 rounded-full border border-bean-600 text-cream-300 flex items-center justify-center transition-all duration-300 hover:border-copper-500 hover:text-copper-300 hover:rotate-12"
          >
            <CartIcon className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>
    </article>
  );
}
