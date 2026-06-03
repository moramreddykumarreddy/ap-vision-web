'use client';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { AppShell } from '@/app/components/app-shell';
import { StatCard, SectionHeader, StatsGrid, Card, CardBody, ProgressBar, fadeDelay } from '@/app/components/ui';

const riskCategories = [
  { label: 'Diabetic Retinopathy', count: 8420, pct: 12, color: '#C62828', risk: 'High' },
  { label: 'Glaucoma Suspect', count: 5600, pct: 8, color: '#E65100', risk: 'High' },
  { label: 'Macular Degeneration', count: 3200, pct: 4.6, color: '#D4A017', risk: 'Medium' },
  { label: 'Cataract (early)', count: 14200, pct: 20, color: '#1A3A6B', risk: 'Low' },
  { label: 'Refractive Error', count: 38000, pct: 54, color: '#00897B', risk: 'Low' },
  { label: 'Other', count: 1000, pct: 1.4, color: '#9E9E9E', risk: 'Low' },
];

export default function AiAnalyticsDashboard() {
  return (
    <AppShell
      sidebar={<Sidebar role="admin" userName="Venkat Rao" userSub="Super Admin" />}
      topbar={<Topbar title="AI Risk Analytics" subtitle="Machine learning-powered clinical insights" />}
    >
      <div className="mb-6 rounded-[20px] bg-gradient-to-br from-[#6A1B9A] to-[#9C27B0] p-6 text-white">
        <div className="mb-1 text-lg font-extrabold">🤖 AI Risk Stratification Engine</div>
        <div className="text-xs opacity-75">Analysing 1.14M patient records • Last updated: Today 06:00 AM</div>
        <div className="mt-4 flex gap-8">
          {[{ v: '8,420', l: 'High Risk' }, { v: '28,600', l: 'Medium Risk' }, { v: '107K', l: 'Low Risk' }].map(k => (
            <div key={k.l}>
              <div className="text-[22px] font-black">{k.v}</div>
              <div className="text-[11px] opacity-70">{k.l}</div>
            </div>
          ))}
        </div>
      </div>

      <StatsGrid cols={4} className="mb-3.5">
        <StatCard title="Model Accuracy" value="94.2%" icon="🎯" color="#6A1B9A" delay={0.05} />
        <StatCard title="Predictions Made" value="1.14M" icon="🤖" color="#1A3A6B" delay={0.10} />
        <StatCard title="High Risk Flagged" value="8,420" icon="⚠️" color="#C62828" delay={0.15} />
        <StatCard title="Early Detections" value="2,840" icon="🔍" color="#00897B" delay={0.20} />
      </StatsGrid>

      <SectionHeader title="Risk Distribution by Condition" />
      <Card className="mt-2 mb-6">
        <CardBody>
          {riskCategories.map((cat, i) => (
            <div key={cat.label} className={`animate-fade-up mb-4 last:mb-0 ${fadeDelay(i + 1)}`}>
              <div className="mb-1.5 flex items-center justify-between">
                <div>
                  <span className="text-[13px] font-bold">{cat.label}</span>
                  <span className="ml-2 inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ background: cat.risk === 'High' ? '#C62828' : cat.risk === 'Medium' ? '#E65100' : '#EEEEEE', color: cat.risk === 'Low' ? '#9E9E9E' : 'white' }}>{cat.risk} Risk</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold" style={{ color: cat.color }}>{cat.count.toLocaleString()}</span>
                  <span className="ml-1 text-[11px] text-grey-400">({cat.pct}%)</span>
                </div>
              </div>
              <ProgressBar value={cat.pct} color={cat.color} />
            </div>
          ))}
        </CardBody>
      </Card>

      <SectionHeader title="Top Risk Factors (State Level)" />
      <div className="mt-2 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { icon: '🩸', label: 'Diabetes Prevalence', value: '18.4%', trend: '↑ +2.1%' },
          { icon: '👴', label: 'Age >60 Population', value: '22.8%', trend: '↑ +1.5%' },
          { icon: '🌾', label: 'Rural Exposure', value: '68.2%', trend: '→ Stable' },
          { icon: '💧', label: 'Water Quality Risk', value: '34.6%', trend: '↓ -3.2%' },
          { icon: '📚', label: 'Low Health Literacy', value: '41.2%', trend: '↓ -5.4%' },
          { icon: '🏥', label: 'Healthcare Access', value: '61.8%', trend: '↑ +8.1%' },
        ].map((f, i) => (
          <Card key={f.label} className={`animate-fade-up ${fadeDelay(i + 1)}`}>
            <CardBody>
              <div className="mb-2 text-2xl">{f.icon}</div>
              <div className="text-xs text-grey-400">{f.label}</div>
              <div className="text-xl font-black text-primary">{f.value}</div>
              <div className="text-[11px]" style={{ color: f.trend.startsWith('↑') ? '#E65100' : f.trend.startsWith('↓') ? '#2E7D32' : '#9E9E9E' }}>{f.trend}</div>
            </CardBody>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
