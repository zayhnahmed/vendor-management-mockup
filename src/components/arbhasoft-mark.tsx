import * as React from "react";

interface Props {
  className?: string;
}

/**
 * Arbhasoft mark — official two-hands (heart) logo.
 * Place the transparent PNG at public/arbhasoft-logo.png
 */
export function ArbhasoftMark({ className }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/arbhasoft-logo.png"
      alt="Arbhasoft"
      className={`object-contain ${className ?? ""}`}
      draggable={false}
    />
  );
}

export function ArbhasoftWordmark({ className }: Props) {
  return (
    <div className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <ArbhasoftMark className="h-8 w-8 shrink-0 object-contain" />
      <span className="font-bold tracking-[0.14em] text-[12px] uppercase text-foreground">
        Arbhasoft
      </span>
    </div>
  );
}
