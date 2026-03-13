"use client";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <header className="mb-6 sm:mb-8 lg:mb-10">
      <h2 className="text-[15px] font-medium tracking-tight text-text-primary sm:text-[16px]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-1 max-w-2xl text-[12px] leading-relaxed text-text-muted sm:text-[13px]">
          {subtitle}
        </p>
      )}
    </header>
  );
}
