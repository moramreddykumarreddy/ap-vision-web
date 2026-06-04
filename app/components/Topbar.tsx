"use client";

import { useAppShell } from "@/app/components/app-shell-context";
import { cn } from "@/app/lib/cn";

export default function Topbar({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  const { toggleMobileNav, mobileNavOpen } = useAppShell();

  return (
    <header className="fixed top-0 right-0 left-0 z-[90] flex h-[52px] items-center gap-2 border-b border-primary/10 bg-white px-3 shadow-sm sm:gap-3 sm:px-4 md:left-[230px]">
      <button
        type="button"
        className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-grey-200 bg-grey-50 text-lg text-primary transition-colors hover:bg-grey-100 md:hidden"
        onClick={toggleMobileNav}
        aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileNavOpen}
      >
        {mobileNavOpen ? "✕" : "☰"}
      </button>
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-sm font-extrabold text-primary sm:text-[15px]">
          {title}
        </h1>
        {subtitle && (
          <p className="truncate text-[10px] text-grey-500 sm:text-[11px]">
            {subtitle}
          </p>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        <div
          className={cn(
            "relative flex size-[30px] cursor-pointer items-center justify-center rounded-full bg-grey-100 text-[13px] transition-colors hover:bg-grey-200",
          )}
          title="Notifications"
        >
          🔔
          <div className="absolute top-1 right-1 size-1.5 rounded-full border-[1.5px] border-white bg-error" />
        </div>
      </div>
    </header>
  );
}
