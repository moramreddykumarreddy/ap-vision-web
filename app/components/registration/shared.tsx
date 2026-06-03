"use client";

import type { ReactNode } from "react";
import {
  FormGroup,
  Input,
  Select as UiSelect,
  Textarea,
} from "@/app/components/ui";
import { cn } from "@/app/lib/cn";

export function StepTitle({
  title,
  subtitle,
  emoji,
}: {
  title: string;
  subtitle: string;
  emoji: string;
}) {
  return (
    <div className="mb-6 flex gap-3">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xl">
        {emoji}
      </div>
      <div>
        <h2 className="text-base font-bold text-grey-900">{title}</h2>
        <p className="text-sm text-grey-600">{subtitle}</p>
      </div>
    </div>
  );
}

export function Field({
  label,
  id,
  placeholder,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  id: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <FormGroup label={`${label}${required ? " *" : ""}`}>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </FormGroup>
  );
}

export function SelectField({
  label,
  id,
  options,
  value,
  onChange,
}: {
  label: string;
  id: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <FormGroup label={label}>
      <UiSelect
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select...</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </UiSelect>
    </FormGroup>
  );
}

export function CheckRow({
  label,
  id,
  checked,
  onChange,
}: {
  label: string;
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label
      htmlFor={id}
      className="mb-2.5 flex cursor-pointer items-center gap-2.5 rounded-lg border border-grey-200 px-3 py-2.5 transition-colors hover:bg-grey-50"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="size-4 accent-primary"
      />
      <span className="text-[13px] text-grey-800">{label}</span>
    </label>
  );
}

export function Grid2({ children }: { children: ReactNode }) {
  return <div className="grid gap-3 sm:grid-cols-2">{children}</div>;
}

export function AreaTypeSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const options = ["Urban", "Rural", "Tribal"];
  return (
    <div className="grid grid-cols-3 gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={cn(
            "rounded-lg border-[1.5px] py-3.5 text-sm font-semibold transition-all",
            value === opt
              ? "border-primary bg-primary text-white"
              : "border-grey-300 text-grey-600 hover:border-primary",
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export { Textarea, FormGroup };
