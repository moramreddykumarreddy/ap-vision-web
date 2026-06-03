'use client';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { AppShell } from '@/app/components/app-shell';
import { StatCard, SectionHeader, StatsGrid, Card, CardBody, fadeDelay } from '@/app/components/ui';

export default function NutritionAnalytics() {
  return (
    <AppShell
      sidebar={<Sidebar role="admin" userName="Venkat Rao" userSub="Super Admin" />}
      topbar={<Topbar title="Nutrition Risk Analytics" subtitle="Nutritional deficiency & vision correlation" />}
    >
      <div className="mb-6 rounded-[20px] bg-gradient-to-br from-[#E65100] to-[#FF9800] p-6 text-white">
        <div className="mb-1 text-lg font-extrabold">🥗 Nutrition & Vision Correlation Engine</div>
        <div className="text-xs opacity-75">Analysing nutritional risk factors across AP districts</div>
      </div>

      <StatsGrid cols={4} className="mb-3.5">
        <StatCard title="Vitamin A Deficiency" value="24.8%" icon="🥕" color="#E65100" delay={0.05} subtitle="High risk zones: 5" />
        <StatCard title="Anemia Cases" value="38.4%" icon="🩸" color="#C62828" delay={0.10} />
        <StatCard title="Malnutrition Risk" value="18.2%" icon="⚠️" color="#D4A017" delay={0.15} />
        <StatCard title="Night Blindness" value="4,820" icon="🌙" color="#6A1B9A" delay={0.20} />
      </StatsGrid>

      <SectionHeader title="District Nutrition Risk Map" />
      <Card className="mt-2">
        <CardBody>
          {[
            { d: 'Vizianagaram', vitA: 38, anemia: 52, malnutrition: 28 },
            { d: 'Srikakulam', vitA: 35, anemia: 48, malnutrition: 24 },
            { d: 'Kurnool', vitA: 30, anemia: 42, malnutrition: 20 },
            { d: 'Anantapur', vitA: 28, anemia: 39, malnutrition: 18 },
            { d: 'Krishna', vitA: 18, anemia: 29, malnutrition: 12 },
          ].map((row, i) => (
            <div key={row.d} className={`animate-fade-up grid grid-cols-[120px_1fr_1fr_1fr] items-center gap-4 border-b border-grey-50 py-2.5 last:border-b-0 ${fadeDelay(i + 1)}`}>
              <span className="text-[13px] font-bold">{row.d}</span>
              {[
                { label: 'Vit A Def.', val: row.vitA, color: '#E65100' },
                { label: 'Anemia', val: row.anemia, color: '#C62828' },
                { label: 'Malnutrition', val: row.malnutrition, color: '#D4A017' },
              ].map(col => (
                <div key={col.label}>
                  <div className="text-[10px] text-grey-400">{col.label}</div>
                  <div className="mt-0.5 flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-grey-100">
                      <div className="h-full rounded-full" style={{ width: `${col.val}%`, background: col.color }} />
                    </div>
                    <span className="text-[11px] font-bold">{col.val}%</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </CardBody>
      </Card>

      <SectionHeader title="Recommended Interventions" />
      <div className="mt-2 grid grid-cols-2 gap-3.5">
        {[
          { icon: '💊', title: 'Vitamin A Supplementation', desc: 'Priority camps in 3 districts', color: '#E65100' },
          { icon: '🍱', title: 'Mid-Day Meal Fortification', desc: 'Schools in high-risk zones', color: '#00897B' },
          { icon: '🩺', title: 'Anaemia Screening', desc: 'Integrate with camp screening', color: '#C62828' },
          { icon: '📢', title: 'Nutrition Awareness', desc: 'Community education programs', color: '#D4A017' },
        ].map(a => (
          <Card key={a.title}>
            <CardBody>
              <div className="mb-2 text-2xl">{a.icon}</div>
              <div className="text-sm font-bold" style={{ color: a.color }}>{a.title}</div>
              <div className="mt-1 text-xs text-grey-400">{a.desc}</div>
            </CardBody>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
