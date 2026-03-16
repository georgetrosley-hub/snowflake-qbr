"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "@/app/context/theme-context";

const LOGO_WHITE = "/adaptive-logo-white.png";
const LOGO_DARK = "/adaptive-logo-dark.png";

interface AdaptiveLogoProps {
  className?: string;
  size?: number;
}

/** Adaptive brand mark — theme-aware transparent logo for header, sidebar, status bar, etc. */
export function AdaptiveLogoImage({ className, size = 24 }: AdaptiveLogoProps) {
  const { theme } = useTheme();
  const src = theme === "dark" ? LOGO_WHITE : LOGO_DARK;
  const s = size ?? 24;

  return (
    <img
      src={src}
      alt="Adaptive Security"
      width={s}
      height={s}
      className={cn("shrink-0 object-contain", className)}
      style={{ width: s, height: s }}
    />
  );
}

/** Same Adaptive logo at icon size — used in cards, sections, CTAs */
export function AdaptiveLogo({ className, size = 20 }: AdaptiveLogoProps) {
  const { theme } = useTheme();
  const src = theme === "dark" ? LOGO_WHITE : LOGO_DARK;
  const s = size ?? 20;

  return (
    <img
      src={src}
      alt=""
      width={s}
      height={s}
      className={cn("shrink-0 object-contain", className)}
      style={{ width: s, height: s }}
      aria-hidden
    />
  );
}

/** Chat/assistant icon for Ask panel — keep as SVG for UI clarity */
export function AdaptiveChatIcon({ className, size = 20 }: AdaptiveLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={cn("text-accent", className)}
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 4a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6l-2 2V4zm4 4h8v1.5H8V8zm0 3h8v1.5H8V11zm0 3h5v1.5H8V14z"
        fill="currentColor"
      />
    </svg>
  );
}
