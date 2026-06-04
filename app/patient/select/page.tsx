"use client";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PATIENTS_BY_MOBILE } from "@/app/components/registration/constants";
import { Button } from "@/app/components/ui";

function SelectPatientContent() {
  const router = useRouter();
  const params = useSearchParams();
  const mobile = params.get("mobile") ?? "";
  const patients = PATIENTS_BY_MOBILE[mobile] ?? [];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-dark to-primary p-6">
      <div className="w-full max-w-md animate-fade-up rounded-xl bg-white p-8 shadow-xl">
        <h1 className="text-xl font-black text-primary">Select Patient</h1>
        <p className="mt-1 text-xs text-grey-500">Patients registered with +91 {mobile}</p>
        <div className="mt-6 space-y-3">
          {patients.length === 0 ? (
            <p className="text-center text-sm text-grey-500">No patients found for this mobile number.</p>
          ) : (
            patients.map((p) => (
              <button
                key={p.id}
                type="button"
                className="flex w-full items-center gap-3 rounded-xl border border-grey-200 p-4 text-left transition hover:border-primary hover:bg-primary/5"
                onClick={() => {
                  sessionStorage.setItem("apvision_patient", JSON.stringify(p));
                  router.push("/patient/dashboard");
                }}
              >
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-sm font-extrabold text-primary">{p.name[0]}</div>
                <div>
                  <div className="text-sm font-bold">{p.name}</div>
                  <div className="text-[11px] text-grey-400">{p.age}y • {p.gender} • {p.village}, {p.district}</div>
                </div>
              </button>
            ))
          )}
        </div>
        <Button variant="ghost" full className="mt-4 text-xs" onClick={() => router.push("/login")}>← Back</Button>
      </div>
    </div>
  );
}

export default function SelectPatientPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <SelectPatientContent />
    </Suspense>
  );
}
