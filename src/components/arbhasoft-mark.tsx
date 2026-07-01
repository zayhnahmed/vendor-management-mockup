import * as React from "react";

interface Props {
  className?: string;
}

export function ArbhasoftMark({ className }: Props) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Arbhasoft"
    >
      {/* Left arc — buyer blue */}
      <path
        d="M12 32 A20 20 0 0 1 32 12"
        stroke="var(--buyer, #1E5FBF)"
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M12 32 A20 20 0 0 0 32 52"
        stroke="var(--buyer, #1E5FBF)"
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Right arc — vendor orange */}
      <path
        d="M52 32 A20 20 0 0 0 32 12"
        stroke="var(--vendor, #F7941D)"
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M52 32 A20 20 0 0 1 32 52"
        stroke="var(--vendor, #F7941D)"
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function ArbhasoftWordmark({ className }: Props) {
  return (
    <div className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <ArbhasoftMark className="h-7 w-7 shrink-0" />
      <span className="font-semibold tracking-[0.14em] text-[12px] uppercase text-foreground">
        Arbhasoft
      </span>
    </div>
  );
}
