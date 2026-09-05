import { useState, type FormEvent } from "react";
import { useStore } from "../store/StoreContext";
import { BrandMark, CheckIcon, FlameIcon } from "./icons";

export default function Footer() {
  const { pushToast } = useStore();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const subscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      pushToast("That email looks off", "Double-check it and try again.");
      return;
    }
    setDone(true);
    pushToast("Subscribed to The Grind Letter", "First issue lands Friday.");
  };

  return (
    <footer id="journal" className="relative border-t border-bean-700/60 bg-bean-950 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid md:grid-cols-12 gap-12">
          {/* brand + newsletter */}
          <div className="md:col-span-5">
            <a href="#top" className="flex items-center gap-2.5">
              <BrandMark className="w-10 h-10 text-cream-200" />
              <span className="font-display font-semibold text-2xl text-cream-100">
                Ember <span className="text-copper-400">&amp;</span> Oak
              </span>
            </a>
            <p className="mt-4 text-cream-400 text-sm leading-relaxed max-w-sm">
              A two-drum roastery in Southeast Portland. Six coffees, one
              weekly rhythm, and a stubborn belief that roast dates should be
              days old, not months.
            </p>

            <div className="mt-7">
              <p className="text-[11px] tracking-[0.26em] uppercase text-copper-400 font-semibold">
                The Grind Letter
              </p>
              <p className="mt-2 text-sm text-cream-500">
                Brew guides, roast notes & first dibs on micro-lots. Monthly, no foam.
              </p>
              {done ? (
                <p className="mt-4 inline-flex items-center gap-2.5 rounded-full bg-sage-500/12 border border-sage-400/40 text-sage-300 text-sm font-medium px-5 py-3">
                  <CheckIcon className="w-4.5 h-4.5" />
                  You're on the list — see you Friday.
                </p>
              ) : (
                <form onSubmit={subscribe} className="mt-4 flex max-w-sm gap-2">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="you@morningcup.com"
                    aria-label="Email for newsletter"
                    className="flex-1 rounded-full bg-bean-800/80 border border-bean-600/70 px-5 py-3 text-sm text-cream-100 placeholder:text-cream-500/70 outline-none focus:border-copper-500/80 transition-colors"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-copper-500 hover:bg-copper-400 text-bean-950 font-semibold text-sm px-6 transition-all active:scale-95 shrink-0"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* visit */}
          <div className="md:col-span-3">
            <p className="text-[11px] tracking-[0.26em] uppercase text-cream-500 font-semibold">
              The counter
            </p>
            <address className="mt-4 not-italic text-sm text-cream-300 leading-relaxed">
              2114 SE Belmont St<br />
              Portland, OR 97214
            </address>
            <ul className="mt-4 text-sm text-cream-400 space-y-1.5">
              <li className="flex justify-between gap-4 max-w-[220px]"><span>Mon – Fri</span><span className="text-cream-200">7a – 5p</span></li>
              <li className="flex justify-between gap-4 max-w-[220px]"><span>Sat – Sun</span><span className="text-cream-200">8a – 4p</span></li>
              <li className="flex justify-between gap-4 max-w-[220px] text-copper-300"><span>Tuesdays</span><span>roast day</span></li>
            </ul>
          </div>

          {/* links */}
          <div className="md:col-span-4">
            <p className="text-[11px] tracking-[0.26em] uppercase text-cream-500 font-semibold">
              Around the roastery
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                ["The shelf", "#shop"],
                ["Roast rhythm", "#rhythm"],
                ["Wholesale & cafés", "#journal"],
                ["Brew guides", "#journal"],
                ["Our farms", "#journal"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="link-sweep text-cream-300 hover:text-copper-300 transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 inline-flex items-center gap-2 text-xs text-cream-500 border border-bean-700 rounded-full px-4 py-2">
              <FlameIcon className="w-3.5 h-3.5 text-copper-400" />
              Roasting since 2016 — powered by one very tired Probat
            </p>
          </div>
        </div>

        <div className="mt-14 pt-7 border-t border-bean-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream-500">
          <p>© 2026 Ember &amp; Oak Roasters. All beans reserved.</p>
          <p>Demo storefront — no real orders, cards, or beans are harmed.</p>
        </div>
      </div>
    </footer>
  );
}
