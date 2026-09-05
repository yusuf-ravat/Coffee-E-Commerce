import { StoreProvider } from "./store/StoreContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import Shop from "./components/Shop";
import Rhythm from "./components/Rhythm";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import ProductModal from "./components/ProductModal";
import CheckoutModal from "./components/CheckoutModal";
import Toasts from "./components/Toasts";

function Shell() {
  return (
    <div className="relative min-h-screen bg-bean-950 text-cream-200 selection:bg-copper-500">
      {/* ambient layered background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="glow-drift absolute top-[-15%] right-[-10%] w-[560px] h-[560px] rounded-full bg-copper-600/10 blur-[140px]" />
        <div className="absolute bottom-[-20%] left-[-12%] w-[520px] h-[520px] rounded-full bg-sage-600/8 blur-[130px]" />
      </div>

      <Header />

      <main className="relative z-10">
        <Hero />
        <Ticker />
        <Shop />
        <Rhythm />
      </main>

      <Footer />

      <CartDrawer />
      <ProductModal />
      <CheckoutModal />
      <Toasts />

      {/* film grain */}
      <div className="noise-layer pointer-events-none fixed inset-0 z-[80] opacity-[0.05]" aria-hidden="true" />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  );
}
