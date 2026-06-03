"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BrandLogo } from "@/app/components/landing/Icon";
import { cn } from "@/app/lib/cn";
import { scrollToSection } from "@/app/lib/scroll";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Platform", href: "#components" },
  { label: "Roles", href: "#roles" },
  { label: "Workflow", href: "#workflow" },
  { label: "AI Analytics", href: "#ai" },
];

function handleNavClick(
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  onDone?: () => void,
) {
  e.preventDefault();
  scrollToSection(href);
  onDone?.();
}

export default function LandingNav() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-[100] flex h-[70px] items-center justify-between border-b border-line bg-white/82 px-6 backdrop-blur-[18px] lg:px-[46px]">
      <Link href="/" className="flex items-center gap-3">
        <BrandLogo />
        <div className="leading-tight">
          <div className="text-[16.5px] font-extrabold leading-none text-navy">
            AP Vision Care
          </div>
          <div className="mt-[3px] text-[10.5px] text-muted">
            Digital Vision Care &amp; Health Intelligence
          </div>
        </div>
      </Link>

      <nav className="hidden items-center gap-1 md:flex">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            className="rounded-[9px] px-[15px] py-[9px] text-sm font-medium text-muted transition-colors hover:bg-bg-app hover:text-navy"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="hidden items-center gap-[11px] md:flex">
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="inline-flex items-center justify-center rounded-[13px] border-[1.5px] border-line bg-surface px-[15px] py-2 text-[13px] font-semibold text-ink transition-colors hover:border-teal hover:text-teal-d"
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => router.push("/screening/register")}
          className="inline-flex items-center justify-center rounded-[13px] bg-teal px-[15px] py-2 text-[13px] font-semibold text-white shadow-[0_4px_14px_rgba(17,181,168,0.28)] transition-all hover:bg-teal-d hover:-translate-y-px"
        >
          Patient Registration
        </button>
      </div>

      <button
        type="button"
        className="ml-auto text-xl text-navy md:hidden"
        onClick={() => setOpen((o) => !o)}
        aria-label="Menu"
      >
        {open ? "✕" : "☰"}
      </button>

      {open && (
        <div
          className={cn(
            "absolute inset-x-0 top-[70px] border-b border-line bg-white px-6 py-4 md:hidden",
          )}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) =>
                handleNavClick(e, link.href, () => setOpen(false))
              }
              className="block border-b border-line-2 py-3 text-sm font-medium text-muted"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-3 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="w-full rounded-[13px] border-[1.5px] border-line py-3 text-sm font-semibold text-ink"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => router.push("/screening/register")}
              className="w-full rounded-[13px] bg-teal py-3 text-sm font-semibold text-white"
            >
              Patient Registration
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
