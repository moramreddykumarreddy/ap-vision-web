"use client";
import { colorAlpha, colors } from "@/app/lib/theme";

import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/app/lib/cn";

const delayClass = [
  "",
  "delay-75",
  "delay-100",
  "delay-150",
  "delay-200",
  "delay-300",
] as const;

export function fadeDelay(index: number) {
  return delayClass[Math.min(Math.max(index, 1), 6)] ?? "delay-75";
}

/* ── Button (single theme app-wide) ─────────────────── */
export type ButtonVariant =
  | "primary"
  | "accent"
  | "outline"
  | "ghost"
  | "danger"
  | "inverse"
  | "onDark"
  | "outlineOnDark";

export type ButtonSize = "sm" | "md" | "lg";

const btnFocus =
  "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/30";

/** Main CTA — brand red #e31b23 (Register, Next, Save, Submit, etc.) */
const btnPrimary =
  "border-0 bg-error text-white shadow-md hover:bg-error/90 hover:-translate-y-px hover:shadow-lg active:translate-y-0 focus-visible:ring-error/30";

const btnBase = cn(
  "inline-flex items-center justify-center gap-1.5 rounded-lg font-semibold transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-md",
  btnFocus,
);

const btnVariants: Record<ButtonVariant, string> = {
  primary: btnPrimary,
  accent: btnPrimary,
  outline:
    "border-[1.5px] border-grey-300 bg-white text-primary hover:border-primary hover:bg-primary/5",
  ghost: "border-0 bg-transparent text-primary hover:bg-primary/5",
  danger:
    "border-[1.5px] border-error bg-transparent text-error hover:bg-error hover:text-white hover:-translate-y-px hover:shadow-md",
  inverse:
    "border-0 bg-white text-primary shadow-sm hover:-translate-y-px hover:bg-white/95 hover:shadow-md",
  onDark:
    "border-0 bg-white/20 text-white hover:bg-white/30",
  outlineOnDark:
    "border border-white/25 bg-transparent text-white hover:border-white/40 hover:bg-white/10",
};

const btnSizes: Record<ButtonSize, string> = {
  sm: "px-2.5 py-1 text-[11px]",
  md: "px-3.5 py-2.5 text-xs",
  lg: "px-5 py-3 text-[13px]",
};

export function Button({
  variant = "primary",
  size = "md",
  full,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  full?: boolean;
}) {
  return (
    <button
      className={cn(
        btnBase,
        btnVariants[variant],
        btnSizes[size],
        full && "w-full",
        className,
      )}
      {...props}
    />
  );
}

/* ── Form ───────────────────────────────────────────── */
export function FormGroup({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-4", className)}>
      <label className="mb-1.5 block text-xs font-bold text-grey-700">
        {label}
      </label>
      {children}
    </div>
  );
}

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-lg border-[1.5px] border-grey-300 bg-white px-3.5 py-2.5 text-sm text-grey-900 transition-[border-color,box-shadow] placeholder:text-grey-400 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10",
        className,
      )}
      {...props}
    />
  );
}

export function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "w-full appearance-none rounded-lg border-[1.5px] border-grey-300 bg-white px-3.5 py-2.5 text-sm text-grey-900 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full resize-y rounded-lg border-[1.5px] border-grey-300 bg-white px-3.5 py-2.5 text-sm text-grey-900 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10",
        className,
      )}
      {...props}
    />
  );
}

/* ── StatCard ──────────────────────────────────────── */
interface StatCardProps {
  title: string;
  value: string;
  icon: string;
  color: string;
  subtitle?: string;
  onClick?: () => void;
  delay?: number;
}

export function StatCard({
  title,
  value,
  icon,
  color,
  subtitle,
  onClick,
  delay = 0,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "relative cursor-default overflow-hidden rounded-lg border border-grey-200 bg-white p-3 px-3.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md animate-fade-up",
        onClick && "cursor-pointer",
      )}
      style={{ animationDelay: `${delay}s` }}
      onClick={onClick}
    >
      <div
        className="mb-2 flex size-[34px] items-center justify-center rounded-md text-lg"
        style={{ background: `${color}18`, color }}
      >
        {icon}
      </div>
      <h4 className="text-[10px] font-semibold uppercase tracking-wide text-grey-500">
        {title}
      </h4>
      <div className="text-[22px] font-black leading-tight" style={{ color }}>
        {value}
      </div>
      {subtitle && <div className="text-[10px] text-grey-500">{subtitle}</div>}
    </div>
  );
}

/* ── SectionHeader ─────────────────────────────────── */
export function SectionHeader({
  title,
  actionLabel,
  onAction,
}: {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <h3 className="text-[13px] font-bold text-grey-900">{title}</h3>
      {actionLabel && (
        <Button type="button" variant="ghost" size="sm" onClick={onAction}>
          {actionLabel} →
        </Button>
      )}
    </div>
  );
}

/* ── Badge ─────────────────────────────────────────── */
const badgeStyles = {
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  error: "bg-error/10 text-error",
  info: "bg-info/10 text-info",
  grey: "bg-grey-100 text-grey-600",
} as const;

export function StatusBadge({ label }: { label: string }) {
  const statusMap: Record<string, keyof typeof badgeStyles> = {
    active: "success",
    completed: "success",
    delivered: "success",
    approved: "success",
    pending: "warning",
    scheduled: "warning",
    "in progress": "warning",
    cancelled: "error",
    rejected: "error",
    urgent: "error",
  };
  const type = statusMap[label.toLowerCase()] ?? "grey";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
        badgeStyles[type],
      )}
    >
      {label}
    </span>
  );
}

/* ── BannerCard ────────────────────────────────────── */
export function BannerCard({
  title,
  subtitle,
  kpis,
  gradient,
  badge,
  onBadgeClick,
  extra,
}: {
  title: string;
  subtitle?: string;
  kpis?: { value: string; label: string }[];
  gradient?: string;
  badge?: string;
  onBadgeClick?: () => void;
  extra?: ReactNode;
}) {
  return (
    <div
      className="animate-fade-up rounded-xl bg-gradient-to-br from-primary to-primary-light p-3.5 px-4 text-white"
      style={gradient ? { background: gradient } : undefined}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="mb-0.5 text-[15px] font-extrabold">{title}</h2>
          {subtitle && <p className="text-[11px] opacity-75">{subtitle}</p>}
        </div>
        {badge && (
          <Button
            type="button"
            variant="onDark"
            size="sm"
            className="rounded-full px-3.5"
            onClick={onBadgeClick}
          >
            {badge}
          </Button>
        )}
      </div>
      {kpis && (
        <div className="mt-2.5 flex">
          {kpis.map((k, i) => (
            <div key={i} className="flex-1 text-center">
              <div className="text-xl font-black">{k.value}</div>
              <div className="text-[10px] opacity-75">{k.label}</div>
            </div>
          ))}
        </div>
      )}
      {extra}
    </div>
  );
}

/* ── ListItem ──────────────────────────────────────── */
export function ListItem({
  avatar,
  avatarBg,
  avatarColor,
  title,
  subtitle,
  trailing,
  delay = 0,
  className,
}: {
  avatar: string;
  avatarBg?: string;
  avatarColor?: string;
  title: string;
  subtitle?: string;
  trailing?: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex animate-fade-up items-center gap-2.5 border-b border-grey-100 py-2 last:border-b-0",
        className,
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      <div
        className="flex size-8 shrink-0 items-center justify-center rounded-full text-[13px] font-extrabold"
        style={{
          background: avatarBg ?? colorAlpha(colors.primary, "18"),
          color: avatarColor ?? colors.primary,
        }}
      >
        {avatar}
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="truncate text-xs font-bold">{title}</h4>
        {subtitle && <p className="text-[10px] text-grey-500">{subtitle}</p>}
      </div>
      {trailing}
    </div>
  );
}

/* ── AlertBanner ───────────────────────────────────── */
const alertStyles = {
  warning: "border-warning/25 bg-warning/5 text-warning",
  success: "border-success/25 bg-success/5 text-success",
  info: "border-info/25 bg-info/5 text-info",
} as const;

export function AlertBanner({
  icon,
  title,
  message,
  type,
  action,
}: {
  icon: string;
  title: string;
  message: string;
  type: keyof typeof alertStyles;
  action?: { label: string; onClick: () => void };
}) {
  return (
    <div
      className={cn(
        "mb-4 flex flex-col gap-3 rounded-md border-[1.5px] px-4 py-3.5 sm:flex-row sm:items-center",
        alertStyles[type],
      )}
    >
      <span className="text-xl">{icon}</span>
      <div className="flex-1">
        <div className="text-[13px] font-bold">{title}</div>
        <div className="text-xs opacity-80">{message}</div>
      </div>
      {action && (
        <Button variant="outline" size="sm" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}

/* ── ProgressBar ───────────────────────────────────── */
export function ProgressBar({
  value,
  color,
}: {
  value: number;
  color: string;
}) {
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-grey-200">
      <div
        className="h-full rounded-full transition-[width] duration-500"
        style={{ width: `${value}%`, background: color }}
      />
    </div>
  );
}

/* ── Quick Action Btn ──────────────────────────────── */
export function QuickActionBtn({
  icon,
  label,
  color,
  onClick,
}: {
  icon: string;
  label: string;
  color: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-w-[100px] flex-1 cursor-pointer flex-col items-center gap-1.5 rounded-md border-[1.5px] px-2 py-3.5 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md"
      style={{ background: `${color}10`, borderColor: `${color}25` }}
    >
      <span className="text-[22px]">{icon}</span>
      <span
        className="text-center text-[11px] font-semibold leading-snug"
        style={{ color }}
      >
        {label}
      </span>
    </button>
  );
}

/* ── Rank Badge ────────────────────────────────────── */
export function RankBadge({ rank }: { rank: number }) {
  const bg =
    rank === 1
      ? colors.primary
      : rank === 2
        ? colors.grey500
        : rank === 3
          ? colors.error
          : colors.grey200;
  const color = rank <= 3 ? "white" : colors.grey600;
  return (
    <div
      className="flex size-8 items-center justify-center rounded-full text-sm font-black"
      style={{ background: bg, color }}
    >
      {rank}
    </div>
  );
}

/* ── Chart helpers ─────────────────────────────────── */
export function ChartBarWrap({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-[120px] items-end gap-1.5 px-1">{children}</div>
  );
}

export function ChartBarCol({
  label,
  height,
  color,
}: {
  label: string;
  height: string;
  color: string;
}) {
  return (
    <div className="flex h-full flex-1 flex-col items-center gap-1">
      <div
        className="min-h-1 w-full rounded-t"
        style={{ height, background: color }}
      />
      <span className="text-[9px] font-semibold text-grey-500">{label}</span>
    </div>
  );
}

/* ── Stepper ───────────────────────────────────────── */
export function Stepper({
  steps,
  current,
}: {
  steps: string[];
  current: number;
}) {
  return (
    <div className="-mx-1 mb-3.5 overflow-x-auto pb-1">
      <div className="flex min-w-max items-center px-1">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={label} className="flex flex-1 items-center">
            <div
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-full border-2 text-[10px] font-bold",
                done && "border-success bg-success text-white",
                active && !done && "border-error bg-error text-white",
                !done && !active && "border-grey-300 text-grey-500",
              )}
            >
              {done ? "✓" : i + 1}
            </div>
            <span
              className={cn(
                "ml-2 hidden text-[11px] font-semibold sm:inline",
                done && "text-success",
                active && !done && "text-primary",
                !done && !active && "text-grey-400",
              )}
            >
              {label}
            </span>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "mx-2 h-0.5 flex-1",
                  done || active ? "bg-primary" : "bg-grey-200",
                )}
              />
            )}
          </div>
        );
      })}
      </div>
    </div>
  );
}

/* ── Settings toggle ───────────────────────────────── */
export function SettingsToggle({
  on,
  onToggle,
}: {
  on: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onToggle}
      className={cn(
        "relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors",
        on ? "bg-primary" : "bg-grey-300",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 left-0.5 size-[18px] rounded-full bg-white transition-[left]",
          on && "left-[23px]",
        )}
      />
    </button>
  );
}

/* Re-export layout primitives for convenience */
export {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  StatsGrid,
  TableWrap,
  DataTable,
} from "@/app/components/app-shell";
