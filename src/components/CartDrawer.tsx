import { FREE_SHIPPING_THRESHOLD, formatPrice } from "../data/products";
import { useStore } from "../store/StoreContext";
import {
  ArrowRightIcon,
  BagIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
  TruckIcon,
  XIcon,
} from "./icons";

export default function CartDrawer() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    setQty,
    removeItem,
    subtotal,
    cartCount,
    setCheckoutOpen,
    products,
    openProduct,
  } = useStore();

  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <div
      className={`fixed inset-0 z-[55] ${cartOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!cartOpen}
      style={{
        visibility: cartOpen ? "visible" : "hidden",
        transition: `visibility 0s linear ${cartOpen ? "0s" : "0.5s"}`,
      }}
    >
      {/* overlay */}
      <button
        tabIndex={-1}
        aria-label="Close cart"
        onClick={() => setCartOpen(false)}
        className={`absolute inset-0 bg-bean-950/70 backdrop-blur-[3px] transition-opacity duration-400 cursor-default ${
          cartOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* panel */}
      <aside
        role="dialog"
        aria-label="Shopping crate"
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-bean-900 border-l border-bean-700/70 shadow-[-30px_0_80px_rgba(8,4,1,0.6)] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between px-6 py-5 border-b border-bean-700/70">
          <h2 className="font-display text-2xl text-cream-100">
            Your crate{" "}
            <span className="text-copper-400 text-lg">({cartCount})</span>
          </h2>
          <button
            onClick={() => setCartOpen(false)}
            aria-label="Close cart"
            className="w-10 h-10 rounded-full border border-bean-600 text-cream-300 flex items-center justify-center transition-all hover:border-copper-500 hover:text-copper-300 hover:rotate-90 duration-300"
          >
            <XIcon className="w-4.5 h-4.5" />
          </button>
        </header>

        {/* free shipping meter */}
        <div className="px-6 py-4 border-b border-bean-700/50 bg-bean-850">
          {remaining > 0 ? (
            <p className="text-sm text-cream-300 flex items-center gap-2">
              <TruckIcon className="w-4.5 h-4.5 text-copper-400 shrink-0" />
              <span>
                <span className="text-copper-300 font-semibold">{formatPrice(remaining)}</span> away
                from free shipping
              </span>
            </p>
          ) : (
            <p className="text-sm text-sage-300 flex items-center gap-2 font-medium">
              <TruckIcon className="w-4.5 h-4.5 shrink-0" />
              Free shipping unlocked — nice.
            </p>
          )}
          <div className="mt-2.5 h-1.5 rounded-full bg-bean-700 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ease-out ${
                remaining > 0
                  ? "bg-gradient-to-r from-copper-600 to-copper-400"
                  : "bg-gradient-to-r from-sage-500 to-sage-300"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* items */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <BagIcon className="w-14 h-14 text-bean-500" />
              <p className="mt-5 font-display text-2xl text-cream-200">The crate is empty</p>
              <p className="mt-2 text-sm text-cream-500 max-w-[240px]">
                Six coffees are waiting on the shelf, all roasted this week.
              </p>
              <button
                onClick={() => setCartOpen(false)}
                className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-copper-500 hover:bg-copper-400 text-bean-950 font-semibold text-sm px-6 py-3 transition-all active:scale-95"
              >
                Browse the shelf
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <ul className="space-y-5">
              {cart.map((item) => {
                const p = products.find((x) => x.id === item.productId);
                if (!p) return null;
                return (
                  <li key={item.key} className="flex gap-4 group">
                    <button
                      onClick={() => {
                        setCartOpen(false);
                        openProduct(p.id);
                      }}
                      className="w-20 h-20 shrink-0 rounded-md overflow-hidden border border-bean-700/70 bg-bean-800"
                      aria-label={`View ${p.name}`}
                    >
                      <img
                        src={p.image}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-display text-lg text-cream-100 leading-tight truncate">
                            {p.name}
                          </p>
                          <p className="text-xs text-cream-500 mt-0.5">
                            {item.grind} · {p.weight}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.key)}
                          aria-label={`Remove ${p.name} from cart`}
                          className="text-cream-500 hover:text-clay-400 transition-colors shrink-0 mt-1"
                        >
                          <TrashIcon className="w-4.5 h-4.5" />
                        </button>
                      </div>
                      <div className="mt-2.5 flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-bean-600 bg-bean-800/70">
                          <button
                            onClick={() => setQty(item.key, item.qty - 1)}
                            aria-label="Decrease quantity"
                            className="w-8 h-8 flex items-center justify-center text-cream-300 hover:text-copper-300 transition-colors"
                          >
                            <MinusIcon className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-7 text-center text-sm font-semibold text-cream-100">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => setQty(item.key, item.qty + 1)}
                            disabled={item.qty >= 12}
                            aria-label="Increase quantity"
                            className="w-8 h-8 flex items-center justify-center text-cream-300 hover:text-copper-300 transition-colors disabled:opacity-30"
                          >
                            <PlusIcon className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="font-display text-base text-copper-300">
                          {formatPrice(p.price * item.qty)}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* footer */}
        {cart.length > 0 && (
          <footer className="border-t border-bean-700/70 px-6 py-5 bg-bean-850">
            <div className="flex items-center justify-between text-sm text-cream-400">
              <span>Shipping</span>
              <span>{remaining > 0 ? formatPrice(6) : "Free"}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="font-display text-xl text-cream-100">Subtotal</span>
              <span className="font-display text-2xl text-copper-300">{formatPrice(subtotal)}</span>
            </div>
            <button
              onClick={() => {
                setCartOpen(false);
                setCheckoutOpen(true);
              }}
              className="mt-4 w-full inline-flex items-center justify-center gap-2.5 rounded-full bg-copper-500 hover:bg-copper-400 text-bean-950 font-semibold py-3.5 transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,127,44,0.45)] active:scale-[0.98]"
            >
              Check out
              <ArrowRightIcon className="w-4.5 h-4.5" />
            </button>
            <button
              onClick={() => setCartOpen(false)}
              className="mt-2.5 w-full text-center text-sm text-cream-500 hover:text-copper-300 transition-colors py-1"
            >
              or keep browsing
            </button>
          </footer>
        )}
      </aside>
    </div>
  );
}
