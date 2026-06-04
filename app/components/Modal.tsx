"use client";
import { colorAlpha, colors } from '@/app/lib/theme';
import { useEffect } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  width?: number;
}

export default function Modal({
  open,
  onClose,
  title,
  subtitle,
  children,
  actions,
  width = 580,
}: ModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-primary-dark/55 p-5 backdrop-blur-sm animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: width }}
        className="flex max-h-[90vh] w-full flex-col overflow-hidden rounded-[18px] bg-white shadow-[0_24px_80px_rgba(13,35,71,0.25)] animate-fade-up"
      >
        <div className="flex shrink-0 items-start justify-between border-b border-grey-200 px-[22px] pb-3.5 pt-[18px]">
          <div>
            <div className="text-base font-extrabold text-primary-dark">
              {title}
            </div>
            {subtitle && (
              <div className="mt-0.5 text-[11px] text-grey-500">{subtitle}</div>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="flex size-[30px] shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-grey-100 text-base text-grey-700 transition-colors hover:bg-grey-200"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-[22px] py-[18px]">
          {children}
        </div>

        {actions && (
          <div className="flex shrink-0 justify-end gap-2.5 border-t border-grey-200 px-[22px] py-3.5">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Reusable detail row ───────────────────────────── */
export function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-grey-100 py-2">
      <span className="text-xs text-grey-500">{label}</span>
      <span className="max-w-[60%] text-right text-[13px] font-bold text-grey-900">
        {value}
      </span>
    </div>
  );
}

/* ── Roster table ──────────────────────────────────── */
export function RosterTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-xs">
        <thead>
          <tr>
            {columns.map((c) => (
              <th
                key={c}
                className="border-b-2 border-grey-200 bg-surface-clinical px-3 py-2 text-left text-[10px] font-bold uppercase tracking-wide text-grey-600"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-grey-50"}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`border-b border-grey-100 px-3 py-2.5 text-grey-900 ${j === 0 ? "font-bold" : "font-normal"}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Success banner ────────────────────────────────── */
export function SuccessBanner({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border-[1.5px] border-success/25 bg-success/10 px-5 py-4">
      <span className="text-2xl">✅</span>
      <span className="text-sm font-bold text-success">{message}</span>
    </div>
  );
}

/* ── Download helper ───────────────────────────────── */
export function downloadFile(
  filename: string,
  content: string,
  type = "text/plain",
) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
