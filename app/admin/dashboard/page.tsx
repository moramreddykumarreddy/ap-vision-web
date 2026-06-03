'use client';
import { useRouter } from 'next/navigation';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { AppShell } from '@/app/components/app-shell';
import {
  StatCard,
  SectionHeader,
  BannerCard,
  RankBadge,
  ProgressBar,
  StatsGrid,
  Card,
  CardBody,
  fadeDelay,
} from '@/app/components/ui';

const districts = [
  { name: 'Visakhapatnam', screened: 52400, coverage: 92 },
  { name: 'Krishna', screened: 48200, coverage: 88 },
  { name: 'Guntur', screened: 45600, coverage: 85 },
  { name: 'Kurnool', screened: 41200, coverage: 82 },
  { name: 'East Godavari', screened: 38900, coverage: 79 },
  { name: 'West Godavari', screened: 36700, coverage: 76 },
  { name: 'Nellore', screened: 33400, coverage: 73 },
];

const analyticsModules = [
  { icon: '📊', label: 'State Analytics', color: '#1A3A6B', href: '/admin/analytics/state' },
  { icon: '🗺️', label: 'District View', color: '#1A3A6B', href: '/admin/analytics/district' },
  { icon: '🤖', label: 'AI Risk', color: '#6A1B9A', href: '/admin/analytics/ai' },
  { icon: '🥗', label: 'Nutrition Risk', color: '#E65100', href: '/admin/analytics/nutrition' },
  { icon: '🏫', label: 'School Vision', color: '#00897B', href: '/admin/analytics/school' },
  { icon: '⚖️', label: 'Decision Support', color: '#D4A017', href: '/admin/analytics/decision' },
];

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <AppShell
      sidebar={<Sidebar role="admin" userName="Venkat Rao" userSub="Super Admin" />}
      topbar={<Topbar title="Super Admin" subtitle="AP Vision Program • State View" />}
    >
      <BannerCard
        title="Andhra Pradesh State Overview"
        subtitle="Programme Year 2024–25 • Updated Today"
        kpis={[
          { value: '1.2M', label: 'Patients' },
          { value: '1.1M', label: 'Screened' },
          { value: '186K', label: 'Rx Given' },
          { value: '142K', label: 'Delivered' },
        ]}
      />

      <StatsGrid cols={4} className="mt-3">
        <StatCard title="Total Referrals" value="8,420" icon="🏥" color="#C62828" delay={0.05} onClick={() => router.push('/admin/referrals')} />
        <StatCard title="Teleconsultations" value="5,678" icon="📹" color="#1A3A6B" delay={0.10} />
        <StatCard title="Districts Active" value="13" icon="🗺️" color="#1A3A6B" delay={0.15} onClick={() => router.push('/admin/analytics/district')} />
        <StatCard title="Camps This Month" value="248" icon="⛺" color="#1A3A6B" delay={0.20} />
      </StatsGrid>

      <div className="mt-3.5">
        <SectionHeader title="Analytics Modules" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {analyticsModules.map((m, i) => (
            <div
              key={m.label}
              className={`animate-fade-up cursor-pointer rounded-[14px] px-2 py-4 text-center transition-all duration-200 hover:-translate-y-0.5 ${fadeDelay(i + 1)}`}
              style={{ background: m.color + '10', border: `1.5px solid ${m.color}20` }}
              onClick={() => router.push(m.href)}
            >
              <div className="mb-1.5 text-2xl">{m.icon}</div>
              <div className="text-[11px] font-bold leading-snug" style={{ color: m.color }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3.5">
        <SectionHeader title="District Rankings" actionLabel="View All" onAction={() => router.push('/admin/analytics/district')} />
        <Card>
          <CardBody className="p-0">
            {districts.map((d, i) => (
              <div key={d.name} className={`flex animate-fade-up items-center gap-3 border-b border-grey-100 px-5 py-3.5 last:border-b-0 ${fadeDelay(i + 1)}`}>
                <RankBadge rank={i + 1} />
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-bold">{d.name}</div>
                  <div className="text-[11px] text-grey-400">{d.screened.toLocaleString()} screened</div>
                </div>
                <div className="min-w-20 text-right">
                  <div className="text-base font-extrabold" style={{ color: d.coverage >= 85 ? '#2E7D32' : '#E65100' }}>{d.coverage}%</div>
                  <div className="text-[10px] text-grey-400">Coverage</div>
                  <ProgressBar value={d.coverage} color={d.coverage >= 85 ? '#2E7D32' : '#E65100'} />
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>

      <div className="mt-3.5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { icon: '📋', label: 'EMR Timeline', href: '/admin/emr', color: '#1A3A6B' },
          { icon: '📁', label: 'Documents', href: '/admin/documents', color: '#00897B' },
          { icon: '🏥', label: 'Referrals', href: '/admin/referrals', color: '#C62828' },
          { icon: '📄', label: 'Reports', href: '/admin/reports', color: '#D4A017' },
        ].map((t, i) => (
          <Card
            key={t.label}
            className={`animate-fade-up cursor-pointer p-5 text-center transition-all duration-200 hover:-translate-y-0.5 ${fadeDelay(i + 1)}`}
            onClick={() => router.push(t.href)}
          >
            <div className="mb-2 text-[28px]">{t.icon}</div>
            <div className="text-xs font-bold" style={{ color: t.color }}>{t.label}</div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
