"use client";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import { AppShell } from "@/app/components/app-shell";
import { Card, CardBody, SectionHeader } from "@/app/components/ui";

const sections = [
  { title: "Districts & Mandals", count: 13, icon: "🗺️" },
  { title: "Referral Hospitals", count: 48, icon: "🏥" },
  { title: "Nodal Officers", count: 13, icon: "🏢" },
  { title: "Vendors", count: 24, icon: "🏭" },
  { title: "Tele-Ophthalmologists", count: 36, icon: "👁️" },
];

export default function MasterDataPage() {
  return (
    <AppShell
      sidebar={
        <Sidebar role="admin" userName="Venkat Rao" userSub="Super Admin" />
      }
      topbar={
        <Topbar
          title="Master Data"
          subtitle="District, hospital, vendor & user configuration"
        />
      }
    >
      <SectionHeader title="Master Data Management" />
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {sections.map((s) => (
          <Card key={s.title}>
            <CardBody className="flex items-center gap-3">
              <span className="text-2xl">{s.icon}</span>
              <div>
                <div className="text-sm font-extrabold">{s.title}</div>
                <div className="text-xs text-grey-400">
                  {s.count} records configured
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
