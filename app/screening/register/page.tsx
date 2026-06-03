"use client";

import { useRouter } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import { AppShell } from "@/app/components/app-shell";
import PatientRegistrationFlow from "@/app/components/registration/PatientRegistrationFlow";

export default function ScreeningRegisterPage() {
  const router = useRouter();

  return (
    <AppShell
      sidebar={
        <Sidebar
          role="screening"
          userName="Dr. Srinivasa Rao"
          userSub="Team Lead"
        />
      }
      topbar={
        <Topbar
          title="New Patient Registration"
          subtitle="12-step clinical registration flow"
        />
      }
    >
      <div className="-m-3.5 flex min-h-[calc(100dvh-66px)] flex-col rounded-xl border border-grey-200 bg-grey-50 overflow-hidden">
        <PatientRegistrationFlow
          onExit={() => router.push("/screening/dashboard")}
          onComplete={() => router.push("/screening/camps")}
        />
      </div>
    </AppShell>
  );
}
