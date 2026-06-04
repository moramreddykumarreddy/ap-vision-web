"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BrandLogo } from "@/app/components/landing/Icon";
import { Button } from "@/app/components/ui";
import { cn } from "@/app/lib/cn";
import { landingNavClass } from "@/app/lib/theme";
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
    <header className={landingNavClass}>
      <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
        <BrandLogo />
        <div className="min-w-0 leading-tight">
          <div className="truncate text-sm font-extrabold leading-none text-white sm:text-[16.5px]">
            AP Vision Care
          </div>
          <div className="mt-[3px] hidden text-[10.5px] text-white/60 sm:block">
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
            className="rounded-lg px-[15px] py-[9px] text-sm font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="hidden items-center gap-[11px] md:flex">
        <Button
          type="button"
          variant="outlineOnDark"
          size="md"
          onClick={() => router.push("/login")}
        >
          Login
        </Button>
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={() => router.push("/register")}
        >
          Patient Registration
        </Button>
      </div>

      <button
        type="button"
        className="ml-auto text-xl text-white md:hidden"
        onClick={() => setOpen((o) => !o)}
        aria-label="Menu"
      >
        {open ? "✕" : "☰"}
      </button>

      {open && (
        <div
          className={cn(
            "absolute inset-x-0 top-14 border-b border-white/10 bg-primary-dark px-4 py-4 sm:top-[70px] sm:px-6 md:hidden",
          )}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) =>
                handleNavClick(e, link.href, () => setOpen(false))
              }
              className="block border-b border-white/10 py-3 text-sm font-medium text-white/80"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-3 flex flex-col gap-2">
            <Button
              type="button"
              variant="outlineOnDark"
              size="lg"
              full
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
            <Button
              type="button"
              variant="primary"
              size="lg"
              full
              onClick={() => router.push("/register")}
            >
              Patient Registration
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
