import { HERO_IMAGE, formatPrice } from "../data/products";
import { useStore } from "../store/StoreContext";
import { ArrowRightIcon, BeanDot, FlameIcon, PlusIcon } from "./icons";

function SteamCup() {
  return (
    <svg viewBox="0 0 64 56" fill="none" className="w-14 h-12" aria-hidden="true">
      <g className="steam-wisp" style={{ animationDelay: "0s" }}>
        <path d="M24 16c-2-3 2-4.5 0-8" stroke="var(--color-cream-300)" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g className="steam-wisp" style={{ animationDelay: "1.1s" }}>
        <path d="M33 14c-2-3 2-4.5 0-8" stroke="var(--color-cream-300)" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g className="steam-wisp" style={{ animationDelay: "2.1s" }}>
        <path d="M42 16c-2-3 2-4.5 0-8" stroke="var(--color-cream-300)" strokeWidth="2" strokeLinecap="round" />
      </g>
      <path
        d="M14 26h34v12a12 12 0 0 1-12 12h-10a12 12 0 0 1-12-12V26Z"
        stroke="var(--color-copper-300)"
        strokeWidth="2.4"
      />
      <path d="M48 29h4a6 6 0 0 1 0 12h-4M10 52h42" stroke="var(--color-copper-300)" strokeWidth="2.4" strokeLinecap="round" />
      <ellipse cx="31" cy="26" rx="17" ry="3.2" fill="var(--color-bean-600)" />
    </svg>
  );
}

export default function Hero() {
  const { products, addToCart, openProduct } = useStore();
  const featured = products[0];

  return (
    <section id="top" className="relative min-h-svh flex items-end lg:items-center overflow-hidden">
      {/* layered backdrop */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt=""
          className="kenburns w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bean-950 via-bean-950/82 to-bean-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-bean-950 via-transparent to-bean-950/70" />
        <div className="glow-drift absolute -left-32 top-1/4 w-[520px] h-[520px] rounded-full bg-copper-600/14 blur-[130px]" />
        <div className="absolute right-[-10%] bottom-[-20%] w-[460px] h-[460px] rounded-full bg-sage-600/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full pt-32 lg:pt-24 pb-14 grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* copy */}
        <div className="lg:col-span-7">
          <p className="flex items-center gap-2.5 text-copper-400 text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            <FlameIcon className="w-4 h-4 flame-flicker" />
            Small-batch roastery — est. 2016
          </p>

          <h1 className="font-display font-medium text-cream-100 leading-[0.98] tracking-tight text-[13.5vw] sm:text-6xl lg:text-[5.2rem] xl:text-[6rem]">
            <span className="line-mask">
              <span className="line-rise" style={{ animationDelay: "0.08s" }}>
                Slow fire,
              </span>
            </span>
            <span className="line-mask">
              <span className="line-rise" style={{ animationDelay: "0.22s" }}>
                six good beans,
              </span>
            </span>
            <span className="line-mask">
              <span className="line-rise text-copper-400 italic font-light" style={{ animationDelay: "0.36s" }}>
                zero shortcuts.
              </span>
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-cream-300 text-base sm:text-lg leading-relaxed">
            We roast every Tuesday, cup every batch on Wednesday, and ship within
            48 hours of the flame. Six coffees on the shelf — never more, never
            stale.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#shop"
              className="group inline-flex items-center gap-3 bg-cream-100 text-bean-950 font-semibold rounded-full pl-6 pr-5 py-3.5 transition-all duration-300 hover:bg-copper-300 hover:shadow-[0_0_36px_rgba(240,181,113,0.35)] active:scale-95"
            >
              Shop the shelf
              <ArrowRightIcon className="w-4.5 h-4.5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>
            <a
              href="#rhythm"
              className="link-sweep inline-flex items-center gap-2 text-cream-200 font-medium py-3 hover:text-copper-300 transition-colors"
            >
              How the roast week runs
            </a>
          </div>

          {/* ledger stats */}
          <dl className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-y-6 max-w-2xl">
            {[
              ["86.4", "avg. cup score"],
              ["14", "partner farms"],
              ["48 h", "roast-to-door"],
              ["Tue", "roast day"],
            ].map(([n, label], i) => (
              <div key={label} className={`pr-6 ${i > 0 ? "sm:border-l sm:border-bean-600/60 sm:pl-6" : ""}`}>
                <dt className="sr-only">{label}</dt>
                <dd className="font-display text-3xl sm:text-4xl text-cream-100">{n}</dd>
                <dd className="text-[11px] tracking-[0.18em] uppercase text-cream-500 mt-1.5">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* featured roast card */}
        <div className="lg:col-span-5 lg:justify-self-end w-full max-w-sm lg:max-w-none">
          <div
            role="button"
            tabIndex={0}
            onClick={() => openProduct(featured.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter") openProduct(featured.id);
            }}
            aria-label={`View details for ${featured.name}`}
            className="group relative block w-full text-left rounded-lg overflow-hidden border border-bean-600/70 bg-bean-900/85 backdrop-blur-sm transition-all duration-500 hover:border-copper-500/60 hover:shadow-[0_28px_80px_rgba(10,5,2,0.7)] hover:-translate-y-1.5 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-copper-400"
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-bean-700/70">
              <span className="text-[11px] tracking-[0.26em] uppercase text-copper-400 font-semibold">
                On the roaster this week
              </span>
              <SteamCup />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-bean-800 to-bean-900">
              <img
                src={featured.image}
                alt={`${featured.name} coffee bag`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bean-950/80 via-transparent to-transparent" />
              <span
                className="absolute top-4 left-4 text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full bg-bean-950/80 border"
                style={{ color: featured.accent, borderColor: `${featured.accent}66` }}
              >
                {featured.badge}
              </span>
            </div>
            <div className="p-5 sm:p-6">
              <p className="text-[11px] tracking-[0.22em] uppercase text-cream-500">{featured.origin}</p>
              <div className="mt-1.5 flex items-baseline justify-between gap-4">
                <h2 className="font-display text-2xl sm:text-[1.7rem] text-cream-100 leading-tight">
                  {featured.name}
                </h2>
                <span className="font-display text-xl text-copper-300 shrink-0">
                  {formatPrice(featured.price)}
                </span>
              </div>
              <div className="mt-3.5 flex flex-wrap gap-x-3 gap-y-1.5 text-sm text-cream-400">
                {featured.notes.map((n, i) => (
                  <span key={n} className="inline-flex items-center gap-3">
                    {i > 0 && <BeanDot className="w-2 h-2 text-copper-500" />}
                    {n}
                  </span>
                ))}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(featured, "Whole bean", 1);
                }}
                className="mt-5 inline-flex items-center gap-2.5 w-full justify-center rounded-full border border-copper-500/60 text-copper-300 font-semibold text-sm py-3 transition-all duration-300 hover:bg-copper-500 hover:text-bean-950 active:scale-[0.98] cursor-pointer"
              >
                <PlusIcon className="w-4 h-4" strokeWidth={2.2} />
                Add whole bean — {formatPrice(featured.price)}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-cream-500">
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <span className="w-px h-10 bg-gradient-to-b from-copper-500 to-transparent" />
      </div>
    </section>
  );
}
