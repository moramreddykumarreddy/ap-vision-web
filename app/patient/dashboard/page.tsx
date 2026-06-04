"use client";
import { colorAlpha, colors } from "@/app/lib/theme";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import { AppShell } from "@/app/components/app-shell";
import {
  StatCard,
  SectionHeader,
  StatsGrid,
  Card,
  CardBody,
  Button,
  fadeDelay,
} from "@/app/components/ui";
import { usePatientSession } from "@/app/lib/use-patient-session";

export default function PatientDashboard() {
  const router = useRouter();
  const {
    patient,
    prescriptions,
    spectacles,
    referrals,
    teleconsultations,
    activity,
    upcomingTele,
  } = usePatientSession();

  return (
    <AppShell
      sidebar={
        <Sidebar role="patient" userName={patient.name} userSub="Patient" />
      }
      topbar={
        <Topbar
          title="My Health Dashboard"
          subtitle={`${patient.name} • ${patient.id}`}
        />
      }
    >
      <div className="animate-fade-up mb-5 flex items-center gap-5 rounded-[20px] bg-gradient-to-br from-primary to-primary-light p-6 text-white">
        <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-white/20 text-[28px] font-black">
          {patient.name[0]}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-xl font-black">{patient.name}</div>
          <div className="text-xs opacity-70">
            {patient.age} years • {patient.gender} • {patient.id}
          </div>
          <div className="text-xs opacity-70">
            {patient.village}, {patient.district} District
          </div>
        </div>
        <Button
          variant="onDark"
          size="sm"
          onClick={() => router.push("/patient/profile")}
        >
          View Profile
        </Button>
      </div>

      <StatsGrid cols={4} className="mb-3.5">
        <StatCard
          title="Prescriptions"
          value={String(prescriptions.length)}
          icon="💊"
          color={colors.primary}
          delay={0.05}
          onClick={() => router.push("/patient/prescriptions")}
        />
        <StatCard
          title="Spectacles"
          value={String(spectacles.length)}
          icon="👓"
          color={colors.accent}
          delay={0.1}
          onClick={() => router.push("/patient/spectacles")}
        />
        <StatCard
          title="Referrals"
          value={String(referrals.length)}
          icon="🏥"
          color={colors.error}
          delay={0.15}
          onClick={() => router.push("/patient/referrals")}
        />
        <StatCard
          title="Consultations"
          value={String(teleconsultations.length)}
          icon="📹"
          color={colors.gold}
          delay={0.2}
          onClick={() => router.push("/patient/teleconsultation")}
        />
      </StatsGrid>

      {upcomingTele && (
        <div className="animate-fade-up mb-3.5 flex items-center gap-3.5 rounded-[14px] border-[1.5px] border-accent/20 bg-accent/5 p-4.5">
          <span className="text-[28px]">📅</span>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-bold">Next Appointment</div>
            <div className="text-xs text-accent">
              Tele-consultation with {upcomingTele.doctor}
            </div>
            <div className="text-[11px] text-grey-400">
              {upcomingTele.date} • {upcomingTele.time}
            </div>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => router.push("/patient/teleconsultation")}
          >
            Join
          </Button>
        </div>
      )}

      <SectionHeader title="Recent Activity" />
      <Card className="mt-2">
        <CardBody className="p-0">
          {activity.map((item, i) => (
            <div
              key={item.label}
              className={`flex animate-fade-up items-center gap-3 border-b border-grey-100 px-5 py-3 last:border-b-0 ${fadeDelay(i + 1)}`}
            >
              <div
                className="flex size-[38px] shrink-0 items-center justify-center rounded-[10px] text-lg"
                style={{ background: item.color + "15" }}
              >
                {item.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-bold">{item.label}</div>
                <div className="text-[11px] text-grey-400">{item.sub}</div>
              </div>
              <div className="text-[11px] text-grey-300">{item.date}</div>
            </div>
          ))}
        </CardBody>
      </Card>

      <SectionHeader title="Quick Access" />
      <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {[
          {
            icon: "💊",
            label: "Prescriptions",
            color: colors.primary,
            href: "/patient/prescriptions",
          },
          {
            icon: "👓",
            label: "Spectacles",
            color: colors.accent,
            href: "/patient/spectacles",
          },
          {
            icon: "🏥",
            label: "Referrals",
            color: colors.error,
            href: "/patient/referrals",
          },
          {
            icon: "📹",
            label: "Teleconsult",
            color: colors.gold,
            href: "/patient/teleconsultation",
          },
          {
            icon: "👤",
            label: "Profile",
            color: colors.clinical,
            href: "/patient/profile",
          },
        ].map((a, i) => (
          <Card
            key={a.label}
            className={`animate-fade-up cursor-pointer p-5 text-center transition-all duration-200 hover:-translate-y-0.5 ${fadeDelay(i + 1)}`}
            onClick={() => router.push(a.href)}
          >
            <div className="mb-2 text-2xl">{a.icon}</div>
            <div className="text-xs font-bold" style={{ color: a.color }}>
              {a.label}
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
