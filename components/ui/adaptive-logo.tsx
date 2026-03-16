"use client";

import { cn } from "@/lib/utils";

interface AdaptiveLogoProps {
  className?: string;
  size?: number;
}

/** Adaptive wordmark — text logo for header/sidebar */
export function AdaptiveLogoImage({ className, size = 24 }: AdaptiveLogoProps) {
  return (
    <span
      className={cn(
        "shrink-0 font-semibold tracking-tight text-text-primary",
        className
      )}
      style={{ fontSize: size ? `${Math.max(14, size)}px` : undefined }}
      aria-label="Adaptive Security"
    >
      Adaptive
    </span>
  );
}

/** Shield icon for security context — used in nav, cards */
export function AdaptiveLogo({ className, size = 20 }: AdaptiveLogoProps) {
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
        d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4zm0 2.18l6 3v5.82c0 4.52-2.98 8.69-6 9.82-3.02-1.13-6-5.3-6-9.82V7.18l6-3z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Chat/assistant icon for Ask panel */
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
