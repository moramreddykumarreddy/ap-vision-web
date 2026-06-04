"use client";
import { colorAlpha, colors } from "@/app/lib/theme";
import { useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import { AppShell } from "@/app/components/app-shell";
import {
  StatCard,
  ProgressBar,
  StatsGrid,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Button,
} from "@/app/components/ui";
import { cn } from "@/app/lib/cn";

const districts = [
  {
    name: "Krishna",
    mandals: 50,
    camps: 42,
    screened: 48200,
    target: 55000,
    referrals: 1620,
    spectacles: 11400,
  },
  {
    name: "Guntur",
    mandals: 57,
    camps: 38,
    screened: 45600,
    target: 52000,
    referrals: 1580,
    spectacles: 10200,
  },
  {
    name: "Kurnool",
    mandals: 54,
    camps: 35,
    screened: 41200,
    target: 50000,
    referrals: 1240,
    spectacles: 9800,
  },
];

export default function DistrictDashboard() {
  const [selected, setSelected] = useState("Krishna");
  const d = districts.find((x) => x.name === selected) ?? districts[0];
  const pct = Math.round((d.screened / d.target) * 100);

  return (
    <AppShell
      sidebar={
        <Sidebar role="admin" userName="Venkat Rao" userSub="Super Admin" />
      }
      topbar={
        <Topbar
          title="District Analytics"
          subtitle="District-wise performance overview"
        />
      }
    >
      <div className="mb-6 flex flex-wrap gap-2">
        {districts.map((dist) => (
          <Button
            key={dist.name}
            size="sm"
            variant={selected === dist.name ? "primary" : "outline"}
            className={cn(
              selected !== dist.name &&
                "border-grey-300 bg-white text-grey-600",
            )}
            onClick={() => setSelected(dist.name)}
          >
            {dist.name}
          </Button>
        ))}
      </div>

      <div className="animate-fade-up mb-6 rounded-[20px] bg-gradient-to-br from-primary to-primary-light p-6 text-white">
        <div className="text-xl font-black">{d.name} District</div>
        <div className="mb-4 text-xs opacity-70">
          {d.mandals} Mandals • {d.camps} Camps Completed
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="mb-1.5 flex justify-between text-xs">
              <span>Coverage Progress</span>
              <span className="text-sm font-extrabold">{pct}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${pct}%`,
                  background:
                    pct >= 85 ? colors.goldLight : colors.warningLight,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <StatsGrid cols={4} className="mb-3.5">
        <StatCard
          title="Total Screened"
          value={d.screened.toLocaleString()}
          icon="👁️"
          color={colors.primary}
          delay={0.05}
        />
        <StatCard
          title="Target"
          value={d.target.toLocaleString()}
          icon="🎯"
          color={colors.gold}
          delay={0.1}
        />
        <StatCard
          title="Referrals"
          value={d.referrals.toLocaleString()}
          icon="🏥"
          color={colors.error}
          delay={0.15}
        />
        <StatCard
          title="Spectacles Given"
          value={d.spectacles.toLocaleString()}
          icon="👓"
          color={colors.accent}
          delay={0.2}
        />
      </StatsGrid>

      <Card>
        <CardHeader>
          <CardTitle>Mandal-wise Coverage – {d.name}</CardTitle>
        </CardHeader>
        <CardBody>
          {[
            "Vijayawada",
            "Machilipatnam",
            "Gudivada",
            "Nuzvid",
            "Jaggaiahpet",
            "Nandigama",
          ].map((m, i) => {
            const pctM = Math.max(55, 95 - i * 7);
            return (
              <div key={m} className="mb-3.5 last:mb-0">
                <div className="mb-1 flex justify-between">
                  <span className="text-[13px] font-semibold">{m}</span>
                  <span
                    className="text-xs font-bold"
                    style={{
                      color: pctM >= 85 ? colors.success : colors.warning,
                    }}
                  >
                    {pctM}%
                  </span>
                </div>
                <ProgressBar
                  value={pctM}
                  color={
                    pctM >= 85
                      ? colors.success
                      : pctM >= 70
                        ? colors.gold
                        : colors.warning
                  }
                />
              </div>
            );
          })}
        </CardBody>
      </Card>
    </AppShell>
  );
}
