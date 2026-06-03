'use client';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { AppShell } from '@/app/components/app-shell';
import { StatCard, SectionHeader, StatsGrid, Card, CardBody, fadeDelay } from '@/app/components/ui';

export default function ElderlyCare() {
  return (
    <AppShell
      sidebar={<Sidebar role="admin" userName="Venkat Rao" userSub="Super Admin" />}
      topbar={<Topbar title="Elderly Care Dashboard" subtitle="Vision care for population 60+ years" />}
    >
      <div className="mb-6 rounded-[20px] bg-gradient-to-br from-[#4A148C] to-[#7B1FA2] p-6 text-white">
        <div className="mb-1 text-lg font-extrabold">👴 Elderly Vision Care Program</div>
        <div className="text-xs opacity-75">Population above 60 years • Prioritised screening</div>
      </div>

      <StatsGrid cols={4} className="mb-3.5">
        <StatCard title="Elderly Registered" value="284,000" icon="👴" color="#4A148C" delay={0.05} />
        <StatCard title="Cataract Cases" value="42,800" icon="👁️" color="#1A3A6B" delay={0.10} subtitle="15.1%" />
        <StatCard title="Surgeries Facilitated" value="8,420" icon="🏥" color="#2E7D32" delay={0.15} />
        <StatCard title="Glaucoma Cases" value="12,400" icon="⚠️" color="#E65100" delay={0.20} />
      </StatsGrid>

      <SectionHeader title="Priority Conditions in 60+ Age Group" />
      <Card className="mt-2 mb-6">
        <CardBody>
          {[
            { c: 'Cataract', n: 42800, pct: 15.1, severity: 'High' },
            { c: 'Presbyopia', n: 180000, pct: 63.4, severity: 'Low' },
            { c: 'Glaucoma', n: 12400, pct: 4.4, severity: 'High' },
            { c: 'AMD (Age-Related Macular)', n: 8200, pct: 2.9, severity: 'High' },
            { c: 'Diabetic Retinopathy', n: 18400, pct: 6.5, severity: 'High' },
          ].map((row, i) => (
            <div key={row.c} className={`animate-fade-up flex items-center gap-4 border-b border-grey-50 py-3 last:border-b-0 ${fadeDelay(i + 1)}`}>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-bold">{row.c}</div>
                <div className="text-[11px] text-grey-400">{row.n.toLocaleString()} patients</div>
              </div>
              <div className="flex-1">
                <div className="h-1.5 overflow-hidden rounded-full bg-grey-100">
                  <div className="h-full rounded-full" style={{ width: `${Math.min(row.pct, 100)}%`, background: row.severity === 'High' ? '#C62828' : '#00897B' }} />
                </div>
              </div>
              <div className="min-w-[50px] text-right text-[13px] font-bold">{row.pct}%</div>
              <span className="inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold" style={{ background: row.severity === 'High' ? '#C6282815' : '#00897B15', color: row.severity === 'High' ? '#C62828' : '#00897B' }}>{row.severity}</span>
            </div>
          ))}
        </CardBody>
      </Card>

      <SectionHeader title="Cataract Surgery Pipeline" />
      <div className="mt-2 grid grid-cols-1 gap-3.5 sm:grid-cols-3">
        {[
          { icon: '📋', label: 'Awaiting Assessment', value: '8,200', color: '#E65100' },
          { icon: '✅', label: 'Surgery Cleared', value: '5,400', color: '#1A3A6B' },
          { icon: '🏥', label: 'Surgeries Done', value: '8,420', color: '#2E7D32' },
        ].map(s => (
          <Card key={s.label}>
            <CardBody className="text-center">
              <div className="mb-2 text-[28px]">{s.icon}</div>
              <div className="text-xs text-grey-400">{s.label}</div>
              <div className="text-2xl font-black" style={{ color: s.color }}>{s.value}</div>
            </CardBody>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
