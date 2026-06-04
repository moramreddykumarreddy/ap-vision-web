"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BrandLogo } from "@/app/components/BrandLogo";
import PatientRegistrationFlow from "@/app/components/registration/PatientRegistrationFlow";

export default function PatientRegistrationPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col bg-bg-app">
      <header className="sticky top-0 z-50 flex h-14 shrink-0 items-center gap-3 bg-primary-dark px-4 text-white shadow-md sm:px-5">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="flex size-10 items-center justify-center rounded-lg text-xl transition-colors hover:bg-white/10"
          aria-label="Close registration"
        >
          ✕
        </button>
        <BrandLogo size="xs" onDark className="hidden sm:block" />
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-base font-bold">
            New Patient Registration
          </h1>
          <p className="truncate text-[11px] text-white/75">
            AP Vision Care · Andhra Pradesh
          </p>
        </div>
        <Link
          href="/login"
          className="hidden shrink-0 rounded-lg bg-white/15 px-3 py-1.5 text-xs font-semibold hover:bg-white/25 sm:inline-block"
        >
          Login
        </Link>
      </header>

      <PatientRegistrationFlow
        onExit={() => router.push("/")}
        onComplete={() => router.push("/patient/dashboard")}
      />
    </div>
  );
}
