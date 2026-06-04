"use client";
import { colors, pageHeroClass } from "@/app/lib/theme";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import { AppShell } from "@/app/components/app-shell";
import {
  StatCard,
  SectionHeader,
  StatsGrid,
  Card,
  CardBody,
  fadeDelay,
} from "@/app/components/ui";

const series = [
  { key: "vitA", label: "Vit A Def.", color: colors.primary },
  { key: "anemia", label: "Anemia", color: colors.accent },
  { key: "malnutrition", label: "Malnutrition", color: colors.clinical },
] as const;

const districts = [
  { d: "Vizianagaram", vitA: 38, anemia: 52, malnutrition: 28 },
  { d: "Srikakulam", vitA: 35, anemia: 48, malnutrition: 24 },
  { d: "Kurnool", vitA: 30, anemia: 42, malnutrition: 20 },
  { d: "Anantapur", vitA: 28, anemia: 39, malnutrition: 18 },
  { d: "Krishna", vitA: 18, anemia: 29, malnutrition: 12 },
];

export default function NutritionAnalytics() {
  return (
    <AppShell
      sidebar={
        <Sidebar role="admin" userName="Venkat Rao" userSub="Super Admin" />
      }
      topbar={
        <Topbar
          title="Nutrition Risk Analytics"
          subtitle="Nutritional deficiency & vision correlation"
        />
      }
    >
      <div className={`mb-6 ${pageHeroClass}`}>
        <div className="mb-1 text-lg font-extrabold">
          Nutrition & Vision Correlation Engine
        </div>
        <div className="text-xs text-white/75">
          Analysing nutritional risk factors across AP districts
        </div>
      </div>

      <StatsGrid cols={4} className="mb-3.5">
        <StatCard
          title="Vitamin A Deficiency"
          value="24.8%"
          icon="🥕"
          color={colors.primary}
          delay={0.05}
          subtitle="High risk zones: 5"
        />
        <StatCard
          title="Anemia Cases"
          value="38.4%"
          icon="🩸"
          color={colors.accent}
          delay={0.1}
        />
        <StatCard
          title="Malnutrition Risk"
          value="18.2%"
          icon="⚠️"
          color={colors.clinical}
          delay={0.15}
        />
        <StatCard
          title="Night Blindness"
          value="4,820"
          icon="🌙"
          color={colors.primaryLight}
          delay={0.2}
        />
      </StatsGrid>

      <SectionHeader title="District Nutrition Risk Map" />
      <div className="mb-2 flex flex-wrap gap-4 text-[10px] font-semibold text-grey-600">
        {series.map((s) => (
          <span key={s.key} className="flex items-center gap-1.5">
            <span
              className="inline-block size-2 rounded-full"
              style={{ background: s.color }}
            />
            {s.label}
          </span>
        ))}
      </div>
      <Card className="mt-2">
        <CardBody>
          {districts.map((row, i) => (
            <div
              key={row.d}
              className={`animate-fade-up grid grid-cols-[120px_1fr_1fr_1fr] items-center gap-4 border-b border-grey-100 py-2.5 last:border-b-0 ${fadeDelay(i + 1)}`}
            >
              <span className="text-[13px] font-bold text-primary">
                {row.d}
              </span>
              {series.map((col) => {
                const val = row[col.key];
                return (
                  <div key={col.key}>
                    <div className="text-[10px] text-grey-500">{col.label}</div>
                    <div className="mt-0.5 flex items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-grey-100">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${val}%`, background: col.color }}
                        />
                      </div>
                      <span
                        className="text-[11px] font-bold"
                        style={{ color: col.color }}
                      >
                        {val}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </CardBody>
      </Card>

      <SectionHeader title="Recommended Interventions" />
      <div className="mt-2 grid grid-cols-2 gap-3.5">
        {[
          {
            icon: "💊",
            title: "Vitamin A Supplementation",
            desc: "Priority camps in 3 districts",
            color: colors.primary,
          },
          {
            icon: "🍱",
            title: "Mid-Day Meal Fortification",
            desc: "Schools in high-risk zones",
            color: colors.accent,
          },
          {
            icon: "🩺",
            title: "Anaemia Screening",
            desc: "Integrate with camp screening",
            color: colors.clinical,
          },
          {
            icon: "📢",
            title: "Nutrition Awareness",
            desc: "Community education programs",
            color: colors.primaryLight,
          },
        ].map((a) => (
          <Card key={a.title} className="border border-grey-200">
            <CardBody>
              <div
                className="mb-2 flex size-10 items-center justify-center rounded-lg text-xl"
                style={{
                  background: `${a.color}14`,
                  color: a.color,
                }}
              >
                {a.icon}
              </div>
              <div className="text-sm font-bold text-grey-900">{a.title}</div>
              <div className="mt-1 text-xs text-grey-500">{a.desc}</div>
            </CardBody>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
