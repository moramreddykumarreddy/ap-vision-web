"use client";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import { AppShell } from "@/app/components/app-shell";
import { Card, CardBody, SectionHeader } from "@/app/components/ui";

const sections = [
  {
    title: "Gender Wise",
    items: [
      ["Male", "52%"],
      ["Female", "47%"],
      ["Others", "1%"],
    ],
  },
  {
    title: "Age Wise",
    items: [
      ["0-18", "28%"],
      ["19-40", "34%"],
      ["41-60", "24%"],
      ["Above 60", "14%"],
    ],
  },
  {
    title: "Occupation Wise",
    items: [
      ["Students", "22%"],
      ["Farmers", "18%"],
      ["Labourers", "24%"],
      ["Govt Employees", "8%"],
      ["Others", "28%"],
    ],
  },
];

export default function DemographicsPage() {
  return (
    <AppShell
      sidebar={
        <Sidebar role="admin" userName="Venkat Rao" userSub="Super Admin" />
      }
      topbar={
        <Topbar
          title="Demographic Analytics"
          subtitle="Gender, age & occupation breakdown"
        />
      }
    >
      {sections.map((s) => (
        <div key={s.title} className="mb-5">
          <SectionHeader title={s.title} />
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {s.items.map(([label, value]) => (
              <Card key={label}>
                <CardBody className="flex justify-between text-sm">
                  <span>{label}</span>
                  <span className="font-extrabold text-primary">{value}</span>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </AppShell>
  );
}
