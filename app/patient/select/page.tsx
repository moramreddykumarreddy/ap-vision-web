"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { persistDefaultPatientSession } from "@/app/lib/dummy-data";

function RedirectToDashboard() {
  const router = useRouter();
  const params = useSearchParams();
  const mobile = params.get("mobile") ?? "";

  useEffect(() => {
    persistDefaultPatientSession(mobile);
    router.replace("/patient/dashboard");
  }, [mobile, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-dark to-primary p-6 text-white">
      <p className="text-sm opacity-80">Loading your health dashboard…</p>
    </div>
  );
}

export default function SelectPatientPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-dark to-primary p-6 text-white">
          <p className="text-sm opacity-80">Loading…</p>
        </div>
      }
    >
      <RedirectToDashboard />
    </Suspense>
  );
}
