"use client";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import { AppShell } from "@/app/components/app-shell";
import { Card, CardBody, SectionHeader } from "@/app/components/ui";

const logs = [
  {
    time: "2025-06-04 10:22",
    role: "Nodal Officer",
    action: "Approved prescription RX004",
  },
  {
    time: "2025-06-04 09:15",
    role: "Screening Team",
    action: "Registered patient P004",
  },
  {
    time: "2025-06-03 16:40",
    role: "Super Admin",
    action: "Updated spectacle delivery SLA configuration",
  },
  {
    time: "2025-06-03 14:02",
    role: "Nodal Officer",
    action: "Confirmed spectacle order ORD-012 dispatched",
  },
];

export default function AuditPage() {
  return (
    <AppShell
      sidebar={
        <Sidebar role="admin" userName="Venkat Rao" userSub="Super Admin" />
      }
      topbar={
        <Topbar title="Audit & Compliance" subtitle="System activity trail" />
      }
    >
      <SectionHeader title="Audit Logs" />
      <div className="mt-3 flex flex-col gap-2">
        {logs.map((l) => (
          <Card key={l.time + l.action}>
            <CardBody>
              <div className="text-sm font-bold">{l.action}</div>
              <div className="text-xs text-grey-400">
                {l.time} • {l.role}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
