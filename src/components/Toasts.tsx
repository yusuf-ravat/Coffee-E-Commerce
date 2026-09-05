import { useStore } from "../store/StoreContext";
import { BeanIcon, XIcon } from "./icons";

export default function Toasts() {
  const { toasts, dismissToast, setCartOpen } = useStore();

  return (
    <div
      className="fixed bottom-5 left-4 sm:left-6 z-[75] flex flex-col gap-3 w-[calc(100vw-2rem)] max-w-sm pointer-events-none"
      aria-live="polite"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className="toast-in pointer-events-auto flex items-start gap-3.5 rounded-md border border-bean-600/80 border-l-2 border-l-copper-500 bg-bean-850/95 backdrop-blur-md px-4.5 py-3.5 shadow-[0_18px_50px_rgba(8,4,1,0.65)]"
        >
          <span className="mt-0.5 text-copper-400 shrink-0">
            <BeanIcon className="w-5 h-5" />
          </span>
          <div className="min-w-0 flex-1">
            <button
              onClick={() => {
                dismissToast(t.id);
                setCartOpen(true);
              }}
              className="text-sm font-semibold text-cream-100 hover:text-copper-300 transition-colors text-left"
              title="Open cart"
            >
              {t.title}
            </button>
            {t.sub && <p className="text-xs text-cream-500 mt-0.5">{t.sub}</p>}
          </div>
          <button
            onClick={() => dismissToast(t.id)}
            aria-label="Dismiss notification"
            className="text-cream-500 hover:text-cream-200 transition-colors shrink-0"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
