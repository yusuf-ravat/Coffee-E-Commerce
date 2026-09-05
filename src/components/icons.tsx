interface IconProps {
  className?: string;
  strokeWidth?: number;
}

const base = (className?: string) => className ?? "w-5 h-5";

export function BeanIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden="true">
      <path d="M7.6 3.9c4.4-2.5 9.8-.9 12.2 3.5 2.4 4.5.8 9.9-3.6 12.3-4.5 2.5-9.9.9-12.3-3.6C1.5 11.7 3.1 6.4 7.6 3.9Z" />
      <path d="M8.4 4.5c1.5 2.2.3 4.5 2.2 6.7 1.9 2.1 4.6 1.9 6.1 4.3 1 1.6.9 3 .5 4" />
    </svg>
  );
}

export function FlameIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden="true">
      <path d="M12 2.5c.6 3.2-3.4 5.1-3.4 9a5.4 5.4 0 0 0 10.8 0c0-2.3-1.2-3.9-2.2-5.1-.3 1.2-.9 2-1.9 2.5.5-2.4-.6-5.3-3.3-6.4Z" />
      <path d="M12 21.5a3.4 3.4 0 0 1-3.4-3.4c0-1.9 1.6-2.8 3.4-4.6 1.8 1.8 3.4 2.7 3.4 4.6A3.4 3.4 0 0 1 12 21.5Z" />
    </svg>
  );
}

export function CartIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden="true">
      <path d="M4 7.5h16l-1.6 11.2a2 2 0 0 1-2 1.8H7.6a2 2 0 0 1-2-1.8L4 7.5Z" />
      <path d="M8.5 10V6.5a3.5 3.5 0 0 1 7 0V10" />
      <path d="M9.5 14.5c.6 1 1.5 1.5 2.5 1.5s1.9-.5 2.5-1.5" />
    </svg>
  );
}

export function SearchIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.6 15.6 4.9 4.9" />
    </svg>
  );
}

export function PlusIcon({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" className={base(className)} aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function MinusIcon({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" className={base(className)} aria-hidden="true">
      <path d="M5 12h14" />
    </svg>
  );
}

export function XIcon({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" className={base(className)} aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function ArrowRightIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden="true">
      <path d="M4 12h16m0 0-6-6m6 6-6 6" />
    </svg>
  );
}

export function CheckIcon({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden="true">
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

export function LeafIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden="true">
      <path d="M5 19C5 9 11 4 20 4c0 9-5 15-15 15Z" />
      <path d="M5 19c3-5 6-8 10-10" />
    </svg>
  );
}

export function TruckIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden="true">
      <path d="M2.5 6h12v11h-12zM14.5 10h4l3 3.5V17h-7" />
      <circle cx="6.5" cy="17.5" r="1.9" />
      <circle cx="17.5" cy="17.5" r="1.9" />
    </svg>
  );
}

export function MountainIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden="true">
      <path d="m3 19 6.5-11L13 13.5 15.5 10 21 19H3Z" />
      <path d="m8 10.5 1.5 2 1.5-2" />
    </svg>
  );
}

export function DropIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden="true">
      <path d="M12 3.5S6 10.2 6 14.5a6 6 0 0 0 12 0C18 10.2 12 3.5 12 3.5Z" />
      <path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5" />
    </svg>
  );
}

export function CupIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden="true">
      <path d="M4 10h13v5.5A4.5 4.5 0 0 1 12.5 20h-4A4.5 4.5 0 0 1 4 15.5V10Z" />
      <path d="M17 11h1.5a2.5 2.5 0 0 1 0 5H17M3 21.5h15" />
      <path d="M8 7c-.8-1 .8-1.8 0-3M12.5 7c-.8-1 .8-1.8 0-3" />
    </svg>
  );
}

export function BagIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden="true">
      <path d="M5.5 8h13l-1 12.5h-11L5.5 8Z" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
    </svg>
  );
}

export function TrashIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden="true">
      <path d="M4.5 6.5h15M9.5 6V4.5h5V6M6.5 6.5l.8 13h9.4l.8-13M10 10.5v5.5M14 10.5v5.5" />
    </svg>
  );
}

export function LockIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden="true">
      <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5M12 14.5v2" />
    </svg>
  );
}

/** Brand mark: a bean with a flame heart */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className ?? "w-9 h-9"} aria-hidden="true">
      <path
        d="M13 5.5c7.5-4.2 16.7-1.5 20.8 6 4.1 7.4 1.4 16.7-6.1 20.8-7.4 4.1-16.7 1.4-20.8-6C2.8 18.9 5.6 9.6 13 5.5Z"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <path
        d="M20 12.5c.4 2.2-2.3 3.5-2.3 6.1a3.6 3.6 0 0 0 7.2 0c0-1.5-.8-2.6-1.5-3.4-.2.8-.6 1.3-1.3 1.7.4-1.7-.4-3.6-2.1-4.4Z"
        fill="var(--color-copper-400)"
      />
      <path d="M12.5 30c4.5-1.5 9.5-5.5 12-10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/** Tiny bean used as a list/ticker separator */
export function BeanDot({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" fill="currentColor" className={className ?? "w-2.5 h-2.5"} aria-hidden="true">
      <ellipse cx="6" cy="6" rx="4.6" ry="3.4" transform="rotate(-32 6 6)" opacity="0.9" />
    </svg>
  );
}
