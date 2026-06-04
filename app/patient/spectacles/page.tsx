"use client";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import { AppShell } from "@/app/components/app-shell";
import {
  StatusBadge,
  ProgressBar,
  Card,
  CardBody,
  CardHeader,
  fadeDelay,
} from "@/app/components/ui";
import { cn } from "@/app/lib/cn";
import { usePatientSession } from "@/app/lib/use-patient-session";

const timeline = [
  { label: "Prescription Approved", done: true },
  { label: "Order Placed with Vendor", done: true },
  { label: "Manufacturing", done: true },
  { label: "Quality Check", done: false },
  { label: "Dispatched to Camp", done: false },
  { label: "Delivered to Patient", done: false },
];

export default function SpectacleTracking() {
  const { patient, spectacles } = usePatientSession();

  return (
    <AppShell
      sidebar={
        <Sidebar role="patient" userName={patient.name} userSub="Patient" />
      }
      topbar={
        <Topbar
          title="Spectacle Tracking"
          subtitle="Track your spectacle orders"
        />
      }
    >
      {spectacles.length === 0 && (
        <Card>
          <CardBody className="py-10 text-center text-sm text-grey-500">
            No spectacle orders yet.
          </CardBody>
        </Card>
      )}
      {spectacles.map((s, i) => (
        <Card key={s.id} className={`animate-fade-up mb-3 ${fadeDelay(i + 1)}`}>
          <CardHeader>
            <div>
              <div className="text-[15px] font-extrabold">{s.id}</div>
              <div className="text-[11px] text-grey-400">
                Ordered: {s.ordered} • Expected: {s.expected}
              </div>
            </div>
            <StatusBadge label={s.status} />
          </CardHeader>
          <CardBody>
            <div className="mb-5">
              <div className="mb-1.5 flex justify-between">
                <span className="text-xs text-grey-400">Delivery Progress</span>
                <span className="text-xs font-bold">{s.progress}%</span>
              </div>
              <ProgressBar
                value={s.progress}
                color={s.progress === 100 ? "#2E7D32" : "#1A3A6B"}
              />
              <div className="mt-1 text-[11px] text-grey-400">
                📍 {s.location}
              </div>
            </div>
            {i === 0 && s.progress < 100 && (
              <div className="flex flex-col">
                {timeline.map((t, j) => (
                  <div
                    key={t.label}
                    className="relative flex gap-3 pb-4 last:pb-0"
                  >
                    {j < timeline.length - 1 && (
                      <div className="absolute left-[4px] top-3 h-[calc(100%-8px)] w-0.5 bg-grey-200" />
                    )}
                    <div
                      className={cn(
                        "relative z-[1] mt-0.5 size-2.5 shrink-0 rounded-full border-2",
                        t.done
                          ? "border-success bg-success"
                          : "border-grey-300 bg-white",
                      )}
                    />
                    <span
                      className={cn(
                        "text-xs",
                        t.done ? "font-bold text-primary" : "text-grey-300",
                      )}
                    >
                      {t.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>
      ))}
    </AppShell>
  );
}
