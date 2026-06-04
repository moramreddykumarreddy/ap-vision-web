"use client";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import { AppShell } from "@/app/components/app-shell";
import {
  Card,
  CardBody,
  ProgressBar,
  SectionHeader,
  StatsGrid,
  StatCard,
} from "@/app/components/ui";

const mandals = [
  { name: "Vijayawada Urban", coverage: 92, camps: 48, pending: 12 },
  { name: "Machilipatnam", coverage: 78, camps: 35, pending: 8 },
  { name: "Nuzvid", coverage: 71, camps: 28, pending: 15 },
];

export default function MandalAnalyticsPage() {
  return (
    <AppShell
      sidebar={
        <Sidebar role="admin" userName="Venkat Rao" userSub="Super Admin" />
      }
      topbar={
        <Topbar
          title="Mandal Dashboard"
          subtitle="Krishna District — camp performance & pending deliveries"
        />
      }
    >
      <StatsGrid cols={3} className="mb-4">
        <StatCard title="Camps Active" value="18" icon="⛺" color="#1A3A6B" />
        <StatCard
          title="Pending Deliveries"
          value="41"
          icon="📦"
          color="#E65100"
        />
      </StatsGrid>
      <SectionHeader title="Mandal Coverage" />
      <div className="mt-3 flex flex-col gap-3">
        {mandals.map((m) => (
          <Card key={m.name}>
            <CardBody>
              <div className="mb-2 flex justify-between text-sm font-bold">
                <span>{m.name}</span>
                <span>{m.coverage}%</span>
              </div>
              <ProgressBar value={m.coverage} color="#00897B" />
              <div className="mt-2 text-xs text-grey-400">
                {m.camps} camps • {m.pending} pending deliveries
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
