import type { CSSProperties } from "react";
import { BeanDot } from "./icons";

const PHRASES = [
  "Roasted every Tuesday",
  "Bergamot",
  "Free shipping over $45",
  "Apricot jam",
  "Cupped & scored weekly",
  "Toasted walnut",
  "14 partner farms",
  "Orange marmalade",
  "Ships in 48 h",
  "Jasmine",
  "Small batches only",
  "Demerara",
];

export default function Ticker() {
  const row = (key: string, hidden: boolean) => (
    <div
      key={key}
      aria-hidden={hidden}
      className="flex items-center gap-8 pr-8 shrink-0"
    >
      {PHRASES.map((p) => (
        <span key={`${key}-${p}`} className="flex items-center gap-8 shrink-0">
          <span className="font-display italic text-lg sm:text-xl text-cream-200 whitespace-nowrap">
            {p}
          </span>
          <BeanDot className="w-2.5 h-2.5 text-copper-500" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee-paused relative border-y border-bean-700/70 bg-bean-900/80 py-4 overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bean-950 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bean-950 to-transparent z-10" />
      <div
        className="marquee-track flex w-max"
        style={{ "--marquee-dur": "36s" } as CSSProperties}
      >
        {row("a", false)}
        {row("b", true)}
      </div>
    </div>
  );
}
