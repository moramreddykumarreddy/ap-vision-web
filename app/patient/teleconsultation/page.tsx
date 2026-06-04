"use client";
import { colorAlpha, colors } from '@/app/lib/theme';
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import { AppShell } from "@/app/components/app-shell";
import {
  StatusBadge,
  Card,
  CardBody,
  Button,
  fadeDelay,
} from "@/app/components/ui";
import { usePatientSession } from "@/app/lib/use-patient-session";

export default function TeleconsultationScreen() {
  const { patient, teleconsultations } = usePatientSession();
  const upcoming = teleconsultations.filter(
    (c) => c.type === "upcoming" || c.status === "Scheduled",
  );

  return (
    <AppShell
      sidebar={
        <Sidebar role="patient" userName={patient.name} userSub="Patient" />
      }
      topbar={
        <Topbar
          title="Teleconsultation"
          subtitle="Video consultations with specialists"
        />
      }
    >
      {upcoming.map((c) => (
        <div
          key={c.id}
          className="animate-fade-up mb-3 rounded-[20px] bg-gradient-to-br from-primary to-info p-6 text-white"
        >
          <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[9px] font-extrabold tracking-wide">
            UPCOMING
          </span>
          <div className="mt-3.5 flex items-center gap-4">
            <div className="flex size-[52px] items-center justify-center rounded-full bg-white/20 text-2xl">
              👨‍⚕️
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-lg font-extrabold">{c.doctor}</div>
              <div className="text-xs opacity-80">{c.condition}</div>
              <div className="text-xs opacity-70">
                🕐 {c.date} • {c.time}
              </div>
            </div>
          </div>
          <Button variant="inverse" full className="mt-4 font-extrabold">
            📹 Join Video Call
          </Button>
        </div>
      ))}

      <div className="mb-3 text-[15px] font-bold">Consultation History</div>
      {teleconsultations.length === 0 && (
        <Card>
          <CardBody className="py-8 text-center text-sm text-grey-500">
            No teleconsultations scheduled yet.
          </CardBody>
        </Card>
      )}
      {teleconsultations.map((c, i) => (
        <Card key={c.id} className={`animate-fade-up mb-2 ${fadeDelay(i + 1)}`}>
          <CardBody>
            <div className="flex items-center gap-2">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl">
                👨‍⚕️
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-extrabold">{c.doctor}</div>
                <div className="text-xs text-grey-600">{c.condition}</div>
                <div className="text-[11px] text-primary">
                  🕐 {c.date} • {c.time}
                </div>
              </div>
              <StatusBadge label={c.status} />
            </div>
          </CardBody>
        </Card>
      ))}
    </AppShell>
  );
}
