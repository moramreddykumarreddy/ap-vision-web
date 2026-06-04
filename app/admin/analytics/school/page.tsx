'use client';
import { colorAlpha, colors } from '@/app/lib/theme';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { AppShell } from '@/app/components/app-shell';
import { StatCard, SectionHeader, ProgressBar, StatsGrid, Card, CardBody, fadeDelay } from '@/app/components/ui';

export default function SchoolVisionDashboard() {
  return (
    <AppShell
      sidebar={<Sidebar role="admin" userName="Venkat Rao" userSub="Super Admin" />}
      topbar={<Topbar title="School Vision Program" subtitle="Student eye health screening statewide" />}
    >
      <div className="mb-6 rounded-[20px] bg-gradient-to-br from-accent to-accent-dark p-6 text-white">
        <div className="mb-1 text-lg font-extrabold">🏫 School Vision Screening Program</div>
        <div className="text-xs opacity-75">Govt. Schools & Residential Institutions • 2024–25</div>
        <div className="mt-4 flex gap-8">
          {[{ v: '12,480', l: 'Schools Covered' }, { v: '3.8L', l: 'Students Screened' }, { v: '48,200', l: 'Specs Provided' }, { v: '8,400', l: 'Referrals' }].map(k => (
            <div key={k.l}>
              <div className="text-[22px] font-black">{k.v}</div>
              <div className="text-[11px] opacity-70">{k.l}</div>
            </div>
          ))}
        </div>
      </div>

      <StatsGrid cols={4} className="mb-3.5">
        <StatCard title="Schools Covered" value="12,480" icon="🏫" color={colors.accent} delay={0.05} />
        <StatCard title="Myopia Cases" value="28,400" icon="🔍" color={colors.primary} delay={0.10} subtitle="7.5%" />
        <StatCard title="Free Specs" value="48,200" icon="👓" color={colors.gold} delay={0.15} />
        <StatCard title="Avg Screening Age" value="11.2y" icon="👦" color={colors.clinical} delay={0.20} />
      </StatsGrid>

      <SectionHeader title="School Type Coverage" />
      <Card className="mt-2 mb-6">
        <CardBody>
          {[
            { type: 'Government Schools', total: 8200, done: 7400 },
            { type: 'Govt. Aided Schools', total: 2800, done: 2200 },
            { type: 'Residential Schools (SC/ST)', total: 840, done: 840 },
            { type: 'Model Schools', total: 640, done: 520 },
          ].map((s, i) => {
            const pct = Math.round((s.done / s.total) * 100);
            return (
              <div key={s.type} className={`animate-fade-up mb-4 last:mb-0 ${fadeDelay(i + 1)}`}>
                <div className="mb-1.5 flex justify-between">
                  <span className="text-[13px] font-bold">{s.type}</span>
                  <span className="text-xs text-grey-400">{s.done.toLocaleString()} / {s.total.toLocaleString()} • <strong style={{ color: pct >= 90 ? colors.success : colors.warning }}>{pct}%</strong></span>
                </div>
                <ProgressBar value={pct} color={pct >= 90 ? colors.success : colors.accent} />
              </div>
            );
          })}
        </CardBody>
      </Card>

      <SectionHeader title="Common Conditions Found in Students" />
      <div className="mt-2 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { icon: '🔍', label: 'Myopia', value: '28,400', pct: '7.5%', color: colors.primary },
          { icon: '👁️', label: 'Hyperopia', value: '12,200', pct: '3.2%', color: colors.primaryLight },
          { icon: '∞', label: 'Astigmatism', value: '18,600', pct: '4.9%', color: colors.accent },
          { icon: '🏃', label: 'Lazy Eye', value: '4,200', pct: '1.1%', color: colors.warning },
          { icon: '🎨', label: 'Color Blindness', value: '8,800', pct: '2.3%', color: colors.gold },
          { icon: '✅', label: 'Normal Vision', value: '308K', pct: '81%', color: colors.success },
        ].map((c, i) => (
          <Card key={c.label} className={`animate-fade-up ${fadeDelay(i + 1)}`}>
            <CardBody>
              <div className="mb-2 text-2xl">{c.icon}</div>
              <div className="text-xs text-grey-400">{c.label}</div>
              <div className="text-xl font-black" style={{ color: c.color }}>{c.value}</div>
              <div className="text-[11px] text-grey-400">{c.pct} of screened</div>
            </CardBody>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
