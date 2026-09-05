import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { PRODUCTS, type Category, type Grind, type Product } from "../data/products";

export type SortKey = "featured" | "price-asc" | "price-desc" | "score";

export interface CartItem {
  key: string;
  productId: string;
  grind: Grind;
  qty: number;
}

export interface Toast {
  id: number;
  title: string;
  sub?: string;
}

interface StoreValue {
  products: Product[];
  // browsing
  search: string;
  setSearch: (v: string) => void;
  category: Category | "all";
  setCategory: (c: Category | "all") => void;
  sort: SortKey;
  setSort: (s: SortKey) => void;
  // product modal
  selectedId: string | null;
  openProduct: (id: string) => void;
  closeProduct: () => void;
  // cart
  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  addToCart: (product: Product, grind: Grind, qty: number) => void;
  setQty: (key: string, qty: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  // checkout
  checkoutOpen: boolean;
  setCheckoutOpen: (v: boolean) => void;
  // toasts
  toasts: Toast[];
  pushToast: (title: string, sub?: string) => void;
  dismissToast: (id: number) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

const CART_KEY = "ember-oak-cart-v1";

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (i) => i && typeof i.productId === "string" && PRODUCTS.some((p) => p.id === i.productId),
    );
  } catch {
    return [];
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | "all">("all");
  const [sort, setSort] = useState<SortKey>("featured");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>(loadCart);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      /* storage unavailable — cart lives in memory only */
    }
  }, [cart]);

  const pushToast = useCallback((title: string, sub?: string) => {
    const id = ++toastId.current;
    setToasts((t) => [...t.slice(-2), { id, title, sub }]);
    window.setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 4200);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const addToCart = useCallback(
    (product: Product, grind: Grind, qty: number) => {
      const key = `${product.id}::${grind}`;
      setCart((prev) => {
        const existing = prev.find((i) => i.key === key);
        if (existing) {
          return prev.map((i) =>
            i.key === key ? { ...i, qty: Math.min(12, i.qty + qty) } : i,
          );
        }
        return [...prev, { key, productId: product.id, grind, qty: Math.min(12, qty) }];
      });
      pushToast(`${product.name} added to crate`, `${grind} · ${qty} × ${product.weight}`);
    },
    [pushToast],
  );

  const setQty = useCallback((key: string, qty: number) => {
    setCart((prev) =>
      qty < 1
        ? prev.filter((i) => i.key !== key)
        : prev.map((i) => (i.key === key ? { ...i, qty: Math.min(12, qty) } : i)),
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setCart((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);

  const subtotal = useMemo(
    () =>
      cart.reduce((s, i) => {
        const p = PRODUCTS.find((x) => x.id === i.productId);
        return p ? s + p.price * i.qty : s;
      }, 0),
    [cart],
  );

  const openProduct = useCallback((id: string) => setSelectedId(id), []);
  const closeProduct = useCallback(() => setSelectedId(null), []);

  const value: StoreValue = {
    products: PRODUCTS,
    search,
    setSearch,
    category,
    setCategory,
    sort,
    setSort,
    selectedId,
    openProduct,
    closeProduct,
    cart,
    cartCount,
    subtotal,
    addToCart,
    setQty,
    removeItem,
    clearCart,
    cartOpen,
    setCartOpen,
    checkoutOpen,
    setCheckoutOpen,
    toasts,
    pushToast,
    dismissToast,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}
