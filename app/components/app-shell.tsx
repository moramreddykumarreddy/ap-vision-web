"use client";

import type { ReactNode } from "react";
import { AppShellProvider } from "@/app/components/app-shell-context";
import { cn } from "@/app/lib/cn";

export function AppShell({
  sidebar,
  topbar,
  children,
}: {
  sidebar: ReactNode;
  topbar: ReactNode;
  children: ReactNode;
}) {
  return (
    <AppShellProvider>
      <div className="flex min-h-screen">
        {sidebar}
        <div className="flex min-h-screen min-w-0 flex-1 flex-col md:ml-[230px]">
          {topbar}
          <main className="mx-auto w-full max-w-[1400px] flex-1 px-3 py-3 pt-[58px] sm:px-4 sm:py-3.5 sm:pt-[66px]">
            {children}
          </main>
        </div>
      </div>
    </AppShellProvider>
  );
}

export function StatsGrid({
  cols = 4,
  className,
  children,
}: {
  cols?: 3 | 4;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid gap-2.5",
        cols === 3
          ? "grid-cols-1 min-[380px]:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1 min-[380px]:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Card({
  children,
  className,
  style,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-grey-200 bg-white shadow-sm",
        className,
      )}
      style={style}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b border-grey-100 px-3.5 py-2.5",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardTitle({ children }: { children: ReactNode }) {
  return <h3 className="text-[13px] font-bold text-grey-900">{children}</h3>;
}

export function CardBody({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={cn("p-3", className)} style={style}>
      {children}
    </div>
  );
}

export function TableWrap({ children }: { children: ReactNode }) {
  return <div className="overflow-x-auto">{children}</div>;
}

export function DataTable({ children }: { children: ReactNode }) {
  return (
    <table className="w-full min-w-[520px] border-collapse [&_th]:border-b-2 [&_th]:border-grey-200 [&_th]:bg-grey-50 [&_th]:px-2.5 [&_th]:py-2.5 [&_th]:text-left [&_th]:text-[10px] [&_th]:font-bold [&_th]:uppercase [&_th]:tracking-wide [&_th]:text-grey-600 sm:[&_th]:px-4 sm:[&_th]:py-3 sm:[&_th]:text-[11px] [&_td]:border-b [&_td]:border-grey-100 [&_td]:px-2.5 [&_td]:py-3 [&_td]:text-xs [&_td]:text-grey-800 sm:[&_td]:px-4 sm:[&_td]:py-3.5 sm:[&_td]:text-[13px] [&_tr:hover_td]:bg-grey-50 [&_tr:last-child_td]:border-b-0">
      {children}
    </table>
  );
}
