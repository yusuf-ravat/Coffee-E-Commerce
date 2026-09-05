import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { FLAT_SHIPPING, FREE_SHIPPING_THRESHOLD, formatPrice } from "../data/products";
import { useStore } from "../store/StoreContext";
import { CheckIcon, FlameIcon, LockIcon, XIcon } from "./icons";

type Step = "form" | "processing" | "success";

interface OrderLine {
  name: string;
  grind: string;
  qty: number;
  line: number;
}
interface OrderSnapshot {
  lines: OrderLine[];
  subtotal: number;
  shipping: number;
  total: number;
  orderNo: string;
}

const inputCls =
  "w-full rounded-md bg-bean-800/80 border border-bean-600/70 px-4 py-3 text-sm text-cream-100 placeholder:text-cream-500/70 outline-none focus:border-copper-500/80 transition-colors";

export default function CheckoutModal() {
  const { checkoutOpen, setCheckoutOpen, cart, products, subtotal, clearCart } = useStore();
  const [step, setStep] = useState<Step>("form");
  const [order, setOrder] = useState<OrderSnapshot | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    card: "",
    expiry: "",
    cvc: "",
  });
  const timer = useRef<number | null>(null);
  const firstField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (checkoutOpen) {
      setStep("form");
      setErrors({});
      document.body.style.overflow = "hidden";
      window.setTimeout(() => firstField.current?.focus(), 120);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [checkoutOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && step !== "processing") setCheckoutOpen(false);
    };
    if (checkoutOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [checkoutOpen, step, setCheckoutOpen]);

  if (!checkoutOpen) return null;

  const set = (k: keyof typeof form) => (e: ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value;
    if (k === "card") v = v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
    if (k === "expiry") {
      v = v.replace(/\D/g, "").slice(0, 4);
      if (v.length > 2) v = `${v.slice(0, 2)}/${v.slice(2)}`;
    }
    if (k === "cvc") v = v.replace(/\D/g, "").slice(0, 4);
    if (k === "zip") v = v.replace(/[^\d-]/g, "").slice(0, 10);
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((er) => ({ ...er, [k]: "" }));
  };

  const validate = () => {
    const er: Record<string, string> = {};
    if (form.name.trim().length < 2) er.name = "Tell us who's drinking it";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) er.email = "That email looks under-extracted";
    if (form.address.trim().length < 4) er.address = "We need a street address";
    if (form.city.trim().length < 2) er.city = "Required";
    if (form.zip.trim().length < 3) er.zip = "Required";
    if (form.card.replace(/\s/g, "").length !== 16) er.card = "16 digits, no spaces needed";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry)) er.expiry = "MM/YY";
    if (form.cvc.length < 3) er.cvc = "3–4 digits";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const placeOrder = () => {
    if (!validate()) return;
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
    const lines: OrderLine[] = cart.map((i) => {
      const p = products.find((x) => x.id === i.productId)!;
      return { name: p.name, grind: i.grind, qty: i.qty, line: p.price * i.qty };
    });
    const snapshot: OrderSnapshot = {
      lines,
      subtotal,
      shipping,
      total: subtotal + shipping,
      orderNo: `EMB-${Math.floor(1000 + Math.random() * 9000)}`,
    };
    setOrder(snapshot);
    setStep("processing");
    timer.current = window.setTimeout(() => {
      clearCart();
      setStep("success");
    }, 1900);
  };

  const field = (k: keyof typeof form) => errors[k];

  return (
    <div
      className="fixed inset-0 z-[65] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Checkout"
    >
      <button
        aria-label="Close checkout"
        onClick={() => step !== "processing" && setCheckoutOpen(false)}
        className="absolute inset-0 bg-bean-950/85 backdrop-blur-sm cursor-default"
      />
      <div className="toast-in relative w-full max-w-2xl max-h-[92svh] overflow-y-auto rounded-lg border border-bean-600/70 bg-bean-900 shadow-[0_40px_120px_rgba(8,4,1,0.85)]">
        {step === "form" && (
          <>
            <header className="flex items-center justify-between px-6 sm:px-8 pt-6 pb-5 border-b border-bean-700/70">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl text-cream-100">Checkout</h2>
                <p className="text-xs text-cream-500 mt-1 flex items-center gap-1.5">
                  <LockIcon className="w-3.5 h-3.5" /> Demo checkout — nothing is charged
                </p>
              </div>
              <button
                onClick={() => setCheckoutOpen(false)}
                aria-label="Close"
                className="w-10 h-10 rounded-full border border-bean-600 text-cream-300 flex items-center justify-center hover:border-copper-500 hover:text-copper-300 transition-all hover:rotate-90 duration-300"
              >
                <XIcon className="w-4.5 h-4.5" />
              </button>
            </header>

            <div className="px-6 sm:px-8 py-6 grid md:grid-cols-5 gap-8">
              <form
                className="md:col-span-3 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  placeOrder();
                }}
                noValidate
              >
                <p className="text-[10px] tracking-[0.24em] uppercase text-copper-400 font-semibold">
                  Contact
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 sm:col-span-1">
                    <input ref={firstField} value={form.name} onChange={set("name")} placeholder="Full name" className={inputCls} aria-label="Full name" />
                    {field("name") && <p className="mt-1 text-xs text-clay-400">{field("name")}</p>}
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <input value={form.email} onChange={set("email")} type="email" placeholder="Email" className={inputCls} aria-label="Email" />
                    {field("email") && <p className="mt-1 text-xs text-clay-400">{field("email")}</p>}
                  </div>
                </div>

                <p className="text-[10px] tracking-[0.24em] uppercase text-copper-400 font-semibold pt-2">
                  Ship to
                </p>
                <div>
                  <input value={form.address} onChange={set("address")} placeholder="Street address" className={inputCls} aria-label="Street address" />
                  {field("address") && <p className="mt-1 text-xs text-clay-400">{field("address")}</p>}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <input value={form.city} onChange={set("city")} placeholder="City" className={inputCls} aria-label="City" />
                    {field("city") && <p className="mt-1 text-xs text-clay-400">{field("city")}</p>}
                  </div>
                  <div>
                    <input value={form.zip} onChange={set("zip")} placeholder="ZIP" className={inputCls} aria-label="ZIP code" />
                    {field("zip") && <p className="mt-1 text-xs text-clay-400">{field("zip")}</p>}
                  </div>
                </div>

                <p className="text-[10px] tracking-[0.24em] uppercase text-copper-400 font-semibold pt-2">
                  Payment
                </p>
                <div>
                  <input value={form.card} onChange={set("card")} inputMode="numeric" placeholder="Card number · 4242 4242 4242 4242" className={inputCls} aria-label="Card number" />
                  {field("card") && <p className="mt-1 text-xs text-clay-400">{field("card")}</p>}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input value={form.expiry} onChange={set("expiry")} inputMode="numeric" placeholder="MM/YY" className={inputCls} aria-label="Expiry date" />
                    {field("expiry") && <p className="mt-1 text-xs text-clay-400">{field("expiry")}</p>}
                  </div>
                  <div>
                    <input value={form.cvc} onChange={set("cvc")} inputMode="numeric" placeholder="CVC" className={inputCls} aria-label="Security code" />
                    {field("cvc") && <p className="mt-1 text-xs text-clay-400">{field("cvc")}</p>}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 rounded-full bg-copper-500 hover:bg-copper-400 text-bean-950 font-semibold py-3.5 transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,127,44,0.45)] active:scale-[0.98]"
                >
                  Place order — {formatPrice(subtotal + (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING))}
                </button>
              </form>

              {/* summary */}
              <aside className="md:col-span-2 rounded-md bg-bean-850 border border-bean-700/60 p-5 h-fit md:sticky md:top-6">
                <p className="text-[10px] tracking-[0.24em] uppercase text-cream-500 font-semibold">
                  Order summary
                </p>
                <ul className="mt-4 space-y-3">
                  {cart.map((i) => {
                    const p = products.find((x) => x.id === i.productId);
                    if (!p) return null;
                    return (
                      <li key={i.key} className="flex justify-between gap-3 text-sm">
                        <span className="text-cream-300 min-w-0">
                          {i.qty} × {p.name}
                          <span className="block text-xs text-cream-500">{i.grind}</span>
                        </span>
                        <span className="text-cream-200 shrink-0">{formatPrice(p.price * i.qty)}</span>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-4 pt-4 border-t border-bean-700/70 space-y-2 text-sm">
                  <p className="flex justify-between text-cream-400">
                    <span>Shipping</span>
                    <span>{subtotal >= FREE_SHIPPING_THRESHOLD ? "Free" : formatPrice(FLAT_SHIPPING)}</span>
                  </p>
                  <p className="flex justify-between font-display text-lg text-cream-100 pt-1">
                    <span>Total</span>
                    <span className="text-copper-300">
                      {formatPrice(subtotal + (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING))}
                    </span>
                  </p>
                </div>
              </aside>
            </div>
          </>
        )}

        {step === "processing" && (
          <div className="py-24 flex flex-col items-center text-center px-6">
            <span className="relative w-20 h-20 flex items-center justify-center">
              <span className="absolute inset-0 rounded-full border-2 border-bean-600" />
              <span className="absolute inset-0 rounded-full border-2 border-transparent border-t-copper-400 spin-slow" />
              <FlameIcon className="w-9 h-9 text-copper-400 flame-flicker" />
            </span>
            <h2 className="mt-8 font-display text-2xl text-cream-100">Firing up the register…</h2>
            <p className="mt-2 text-sm text-cream-500 max-w-xs">
              Pretending to talk to the bank. Your beans are already mentally bagged.
            </p>
          </div>
        )}

        {step === "success" && order && (
          <div className="py-16 px-6 sm:px-12 flex flex-col items-center text-center">
            <span className="w-20 h-20 rounded-full bg-sage-500/15 border border-sage-400/50 flex items-center justify-center">
              <CheckIcon className="w-9 h-9 text-sage-300" strokeWidth={2.2} />
            </span>
            <p className="mt-7 text-[11px] tracking-[0.3em] uppercase text-sage-300 font-semibold">
              Order {order.orderNo} confirmed
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl text-cream-100 leading-tight">
              The roaster has <em className="italic text-copper-400">your ticket</em>.
            </h2>
            <p className="mt-3 text-cream-400 text-sm max-w-md leading-relaxed">
              Your beans go on the drum Tuesday, rest 24 hours, and ship within 48 hours of
              roasting. A confirmation is on its way to <span className="text-cream-200">{form.email || "your inbox"}</span>.
            </p>

            <div className="mt-8 w-full max-w-sm rounded-md bg-bean-850 border border-bean-700/60 p-5 text-left">
              <ul className="space-y-2.5">
                {order.lines.map((l, i) => (
                  <li key={i} className="flex justify-between gap-3 text-sm">
                    <span className="text-cream-300">
                      {l.qty} × {l.name} <span className="text-cream-500 text-xs">· {l.grind}</span>
                    </span>
                    <span className="text-cream-200 shrink-0">{formatPrice(l.line)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-3.5 border-t border-bean-700/70 flex justify-between text-sm">
                <span className="text-cream-400">Shipping</span>
                <span className="text-cream-200">{order.shipping === 0 ? "Free" : formatPrice(order.shipping)}</span>
              </div>
              <div className="mt-1.5 flex justify-between font-display text-lg">
                <span className="text-cream-100">Paid</span>
                <span className="text-copper-300">{formatPrice(order.total)}</span>
              </div>
            </div>

            <button
              onClick={() => setCheckoutOpen(false)}
              className="mt-8 rounded-full bg-cream-100 hover:bg-copper-300 text-bean-950 font-semibold px-8 py-3 transition-all active:scale-95"
            >
              Back to the shelf
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
