"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "@/app/context/theme-context";

const LOGO_WHITE = "/adaptive-logo-white.png";
const LOGO_DARK = "/adaptive-logo-dark.png";

interface AdaptiveLogoProps {
  className?: string;
  size?: number;
}

/** Adaptive brand mark — theme-aware: black on light, white on dark. Light mode uses mask so shape is crisp black. */
export function AdaptiveLogoImage({ className, size = 24 }: AdaptiveLogoProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const s = size ?? 24;

  if (isDark) {
    return (
      <img
        src={LOGO_WHITE}
        alt="Adaptive Security"
        width={s}
        height={s}
        className={cn("shrink-0 object-contain", className)}
        style={{ width: s, height: s }}
      />
    );
  }

  return (
    <span
      role="img"
      aria-label="Adaptive Security"
      className={cn("shrink-0 inline-block text-black", className)}
      style={{
        width: s,
        height: s,
        maskImage: `url(${LOGO_DARK})`,
        WebkitMaskImage: `url(${LOGO_DARK})`,
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
        backgroundColor: "currentColor",
      }}
    />
  );
}

/** Same Adaptive logo at icon size — black on light, white on dark */
export function AdaptiveLogo({ className, size = 20 }: AdaptiveLogoProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const s = size ?? 20;

  if (isDark) {
    return (
      <img
        src={LOGO_WHITE}
        alt=""
        width={s}
        height={s}
        className={cn("shrink-0 object-contain", className)}
        style={{ width: s, height: s }}
        aria-hidden
      />
    );
  }

  return (
    <span
      className={cn("shrink-0 inline-block text-black", className)}
      style={{
        width: s,
        height: s,
        maskImage: `url(${LOGO_DARK})`,
        WebkitMaskImage: `url(${LOGO_DARK})`,
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
        backgroundColor: "currentColor",
      }}
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
