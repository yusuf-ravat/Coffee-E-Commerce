import { useEffect, useState } from "react";
import { useStore } from "../store/StoreContext";
import { BrandMark, CartIcon, SearchIcon, XIcon } from "./icons";

export default function Header() {
  const { search, setSearch, cartCount, setCartOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);

  /** live search: typing above the fold glides the visitor down to the shop */
  const handleSearch = (v: string) => {
    setSearch(v);
    if (v.trim()) {
      const shop = document.getElementById("shop");
      if (shop && shop.getBoundingClientRect().top > window.innerHeight * 0.55) {
        shop.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 border-b ${
        scrolled
          ? "bg-bean-950/90 backdrop-blur-md border-bean-700/60 shadow-[0_10px_40px_rgba(10,5,2,0.55)]"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 h-16 sm:h-[76px]">
          {/* brand */}
          <a href="#top" className="flex items-center gap-2.5 group shrink-0">
            <BrandMark className="w-9 h-9 text-cream-200 transition-transform duration-500 group-hover:rotate-[18deg]" />
            <span className="leading-none">
              <span className="font-display font-semibold text-xl sm:text-2xl tracking-tight text-cream-100 block">
                Ember <span className="text-copper-400">&amp;</span> Oak
              </span>
              <span className="hidden sm:block text-[10px] tracking-[0.32em] uppercase text-cream-500 mt-1">
                Roasters · Portland
              </span>
            </span>
          </a>

          {/* nav */}
          <nav className="hidden md:flex items-center gap-7 ml-10 text-sm text-cream-300">
            <a href="#shop" className="link-sweep hover:text-cream-100 transition-colors">The Shelf</a>
            <a href="#rhythm" className="link-sweep hover:text-cream-100 transition-colors">Roast Rhythm</a>
            <a href="#journal" className="link-sweep hover:text-cream-100 transition-colors">Journal</a>
          </nav>

          {/* desktop search */}
          <div className="hidden md:flex items-center flex-1 max-w-xs ml-auto">
            <label className="relative w-full group">
              <SearchIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cream-500 group-focus-within:text-copper-400 transition-colors" />
              <input
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search beans, notes…"
                aria-label="Search coffees"
                className="w-full bg-bean-800/70 border border-bean-600/60 rounded-full pl-10 pr-9 py-2.5 text-sm text-cream-100 placeholder:text-cream-500 outline-none focus:border-copper-500/70 focus:bg-bean-800 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-cream-500 hover:text-copper-400 transition-colors"
                >
                  <XIcon className="w-4 h-4" />
                </button>
              )}
            </label>
          </div>

          {/* cart */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative ml-auto md:ml-4 flex items-center gap-2.5 bg-copper-500 hover:bg-copper-400 text-bean-950 font-semibold text-sm rounded-full pl-4 pr-5 py-2.5 transition-all duration-300 hover:shadow-[0_0_28px_rgba(212,127,44,0.45)] active:scale-95"
            aria-label={`Open cart, ${cartCount} items`}
          >
            <CartIcon className="w-5 h-5" strokeWidth={1.9} />
            <span className="hidden sm:inline">Crate</span>
            {cartCount > 0 && (
              <span
                key={cartCount}
                className="badge-pop absolute -top-1.5 -right-1.5 min-w-[22px] h-[22px] px-1 rounded-full bg-bean-950 text-copper-300 border border-copper-500/70 text-[11px] font-bold flex items-center justify-center"
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* mobile search */}
        <div className="md:hidden pb-3 -mt-1">
          <label className="relative block group">
            <SearchIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cream-500 group-focus-within:text-copper-400 transition-colors" />
            <input
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search beans, origins, tasting notes…"
              aria-label="Search coffees"
              className="w-full bg-bean-800/70 border border-bean-600/60 rounded-full pl-10 pr-9 py-2.5 text-sm text-cream-100 placeholder:text-cream-500 outline-none focus:border-copper-500/70 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-cream-500 hover:text-copper-400"
              >
                <XIcon className="w-4 h-4" />
              </button>
            )}
          </label>
        </div>
      </div>
    </header>
  );
}
