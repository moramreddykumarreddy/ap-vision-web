'use client';
import { colorAlpha, colors } from '@/app/lib/theme';
import { useRouter } from 'next/navigation';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { AppShell } from '@/app/components/app-shell';
import { StatCard, SectionHeader, StatusBadge, StatsGrid, Card, CardBody, QuickActionBtn, fadeDelay } from '@/app/components/ui';

const camps = [
  { id: 'C001', name: 'Vijayawada Urban Camp', mandal: 'Vijayawada', district: 'Krishna', date: '02 Jun 2025', status: 'Active', registered: 145, screened: 132, prescriptions: 48, referrals: 12 },
  { id: 'C002', name: 'Guntur Rural Health Camp', mandal: 'Tenali', district: 'Guntur', date: '01 Jun 2025', status: 'Completed', registered: 98, screened: 98, prescriptions: 31, referrals: 7 },
  { id: 'C003', name: 'Kurnool School Vision Camp', mandal: 'Kurnool', district: 'Kurnool', date: '03 Jun 2025', status: 'Scheduled', registered: 0, screened: 0, prescriptions: 0, referrals: 0 },
];

export default function ScreeningDashboard() {
  const router = useRouter();
  const activeCamp = camps.find(c => c.status === 'Active');

  return (
    <AppShell
      sidebar={<Sidebar role="screening" userName="Dr. Srinivasa Rao" userSub="Team Lead" />}
      topbar={<Topbar title="Screening Team" subtitle="Dr. Srinivasa Rao • Team Lead" />}
    >
      {activeCamp && (
        <div className="animate-fade-up mb-5 flex items-center gap-4 rounded-[20px] bg-gradient-to-br from-primary to-accent px-6 py-5 text-white">
          <div className="flex size-[52px] shrink-0 items-center justify-center rounded-full bg-white/20 text-2xl">⛺</div>
          <div className="min-w-0 flex-1">
            <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[9px] font-bold tracking-wide">● ACTIVE CAMP</span>
            <div className="mt-1 text-base font-extrabold">{activeCamp.name}</div>
            <div className="text-xs opacity-80">{activeCamp.mandal}, {activeCamp.district} • {activeCamp.date}</div>
          </div>
          <div className="text-right">
            <div className="text-[26px] font-black">{activeCamp.registered}</div>
            <div className="text-[11px] opacity-80">Patients</div>
          </div>
        </div>
      )}

      <SectionHeader title="Today's Summary" />
      <StatsGrid cols={4} className="mt-2 mb-3.5">
        <StatCard title="Patients Registered" value={`${activeCamp?.registered ?? 145}`} icon="📋" color={colors.primary} delay={0.05} />
        <StatCard title="Patients Screened" value={`${activeCamp?.screened ?? 132}`} icon="👁️" color={colors.primary} delay={0.10} subtitle="91%" />
        <StatCard title="Prescriptions" value={`${activeCamp?.prescriptions ?? 48}`} icon="💊" color={colors.accent} delay={0.15} />
        <StatCard title="Referrals" value={`${activeCamp?.referrals ?? 12}`} icon="🏥" color={colors.warning} delay={0.20} />
      </StatsGrid>

      <SectionHeader title="Quick Actions" />
      <div className="mt-2 mb-3.5 flex flex-wrap gap-2.5">
        {[
          { icon: '👤', label: 'Register Patient', color: colors.primary, href: '/screening/register' },
          { icon: '📷', label: 'Scan QR', color: colors.primaryLight, href: '/screening/search' },
          { icon: '🔍', label: 'Search Patient', color: colors.accent, href: '/screening/search' },
          { icon: '⛺', label: 'Manage Camp', color: colors.gold, href: '/screening/camps' },
        ].map(a => (
          <QuickActionBtn key={a.label} icon={a.icon} label={a.label} color={a.color} onClick={() => router.push(a.href)} />
        ))}
      </div>

      <SectionHeader title="Camps" actionLabel="View All" onAction={() => router.push('/screening/camps')} />
      <div className="flex flex-col gap-3">
        {camps.map((c, i) => (
          <Card key={c.id} className={`animate-fade-up ${fadeDelay(i + 1)}`}>
            <CardBody>
              <div className="mb-1.5 flex items-center justify-between">
                <div className="text-sm font-bold">{c.name}</div>
                <StatusBadge label={c.status} />
              </div>
              <div className="mb-2 text-xs text-grey-400">{c.mandal}, {c.district} • {c.date}</div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  { l: 'Registered', v: c.registered },
                  { l: 'Screened', v: c.screened },
                  { l: 'Prescriptions', v: c.prescriptions },
                  { l: 'Referrals', v: c.referrals },
                ].map(m => (
                  <div key={m.l} className="text-center">
                    <div className="text-lg font-extrabold">{m.v}</div>
                    <div className="text-[10px] text-grey-400">{m.l}</div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
