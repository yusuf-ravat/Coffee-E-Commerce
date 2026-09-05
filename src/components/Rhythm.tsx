import Reveal from "./Reveal";
import { ArrowRightIcon, CupIcon, DropIcon, FlameIcon, TruckIcon } from "./icons";

const STEPS = [
  {
    n: "01",
    day: "Sunday",
    title: "Order window closes",
    copy: "Everything ordered by midnight Sunday makes Tuesday's drum. After that, you ride the next week's roast.",
    icon: <CupIcon className="w-6 h-6" />,
  },
  {
    n: "02",
    day: "Tuesday",
    title: "Roast day",
    copy: "Six coffees, one drum, zero autopilot. Every batch is profiled by hand and logged against last week's curve.",
    icon: <FlameIcon className="w-6 h-6" />,
  },
  {
    n: "03",
    day: "Wednesday",
    title: "Rest, cup & score",
    copy: "Each batch rests 24 h, then gets triangulated on the cupping table. Anything under 84 goes in the staff fridge, not your box.",
    icon: <DropIcon className="w-6 h-6" />,
  },
  {
    n: "04",
    day: "Thursday",
    title: "Sealed & shipped",
    copy: "Bags are stamped with the roast date, flushed with the good stuff, and out the door within 48 h of the flame.",
    icon: <TruckIcon className="w-6 h-6" />,
  },
];

export default function Rhythm() {
  return (
    <section id="rhythm" className="relative border-t border-bean-700/60 bg-bean-900/45 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <Reveal className="max-w-2xl">
          <p className="text-copper-400 text-[11px] font-semibold tracking-[0.3em] uppercase">
            Why your bag has a date on it
          </p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl text-cream-100 tracking-tight">
            The Tuesday <em className="italic font-light text-copper-400">rhythm</em>
          </h2>
          <p className="mt-5 text-cream-400 leading-relaxed">
            Coffee is produce, not pantry filler. So we run the roastery like a
            kitchen — one tight weekly loop from green bean to your doorstep.
          </p>
        </Reveal>

        {/* ledger rows */}
        <div className="mt-14 border-t border-bean-700/70">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 70}>
              <div className="group grid grid-cols-[auto_1fr] sm:grid-cols-[90px_auto_1fr] md:grid-cols-[110px_180px_1fr_44px] items-center gap-x-5 sm:gap-x-8 gap-y-2 py-7 sm:py-8 border-b border-bean-700/70 transition-all duration-500 hover:bg-bean-800/40 hover:pl-4 cursor-default">
                <span className="font-display text-3xl sm:text-4xl text-bean-500 transition-colors duration-500 group-hover:text-copper-500">
                  {s.n}
                </span>
                <span className="hidden sm:flex items-center gap-3 text-sage-300">
                  {s.icon}
                  <span className="text-[11px] tracking-[0.24em] uppercase font-semibold">{s.day}</span>
                </span>
                <span>
                  <span className="font-display text-xl sm:text-2xl text-cream-100 block">
                    {s.title}
                  </span>
                  <span className="mt-1.5 block text-sm text-cream-400 leading-relaxed max-w-2xl">
                    {s.copy}
                  </span>
                </span>
                <ArrowRightIcon className="hidden md:block w-5 h-5 text-bean-500 justify-self-end transition-all duration-500 group-hover:text-copper-400 group-hover:translate-x-2" />
              </div>
            </Reveal>
          ))}
        </div>

        {/* pull quote */}
        <Reveal delay={120} className="mt-16 grid lg:grid-cols-12 gap-8 items-center">
          <blockquote className="lg:col-span-8">
            <p className="font-display text-2xl sm:text-3xl lg:text-[2.1rem] leading-snug text-cream-200">
              “The Yirgacheffe landed four days off the roaster and my V60 has
              never smelled like a <em className="italic text-copper-400">flower market</em> before.
              I'm ruined for grocery-store coffee.”
            </p>
            <footer className="mt-5 flex items-center gap-3">
              <span className="w-10 h-px bg-copper-500" />
              <cite className="not-italic text-sm text-cream-500">
                Marisol V. — subscriber since 2019, Portland
              </cite>
            </footer>
          </blockquote>
          <div className="lg:col-span-4 flex lg:justify-end">
            <div className="rounded-md border border-bean-600/70 bg-bean-850 px-6 py-5">
              <p className="font-display text-4xl text-copper-400">4.9<span className="text-2xl text-cream-500">/5</span></p>
              <p className="mt-1 text-xs tracking-[0.18em] uppercase text-cream-500">
                2,300+ crate reviews
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
