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
    <header className="fixed inset-x-0 top-0 z-[100] flex h-[70px] items-center justify-between border-b border-grey-200 bg-white/90 px-6 backdrop-blur-[18px] lg:px-[46px]">
      <Link href="/" className="flex items-center gap-3">
        <BrandLogo />
        <div className="leading-tight">
          <div className="text-[16.5px] font-extrabold leading-none text-primary">
            AP Vision Care
          </div>
          <div className="mt-[3px] text-[10.5px] text-grey-600">
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
            className="rounded-lg px-[15px] py-[9px] text-sm font-medium text-grey-600 transition-colors hover:bg-grey-100 hover:text-primary"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="hidden items-center gap-[11px] md:flex">
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="inline-flex items-center justify-center rounded-lg border-[1.5px] border-grey-300 bg-white px-[15px] py-2 text-[13px] font-semibold text-grey-900 transition-colors hover:border-primary hover:text-primary"
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => router.push("/register")}
          className="inline-flex items-center justify-center rounded-lg bg-accent px-[15px] py-2 text-[13px] font-semibold text-white shadow-md transition-all hover:bg-accent-dark hover:-translate-y-px"
        >
          Patient Registration
        </button>
      </div>

      <button
        type="button"
        className="ml-auto text-xl text-primary md:hidden"
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
              className="block border-b border-grey-100 py-3 text-sm font-medium text-grey-600"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-3 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="w-full rounded-lg border-[1.5px] border-grey-300 py-3 text-sm font-semibold text-grey-900"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => router.push("/register")}
              className="w-full rounded-lg bg-accent py-3 text-sm font-semibold text-white"
            >
              Patient Registration
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
