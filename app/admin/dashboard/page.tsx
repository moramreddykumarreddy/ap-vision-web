'use client';
import { useRouter } from 'next/navigation';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { StatCard, SectionHeader, BannerCard, RankBadge, ProgressBar } from '@/app/components/ui';

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
    <div className="app-layout">
      <Sidebar role="admin" userName="Venkat Rao" userSub="Super Admin" />
      <div className="main-content">
        <Topbar title="Super Admin" subtitle="AP Vision Program • State View" />
        <main className="page-body">
          {/* State KPI Banner */}
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

          <div className="stats-grid stats-grid-4 mt-20">
            <StatCard title="Total Referrals" value="8,420" icon="🏥" color="#C62828" delay={0.05} onClick={() => router.push('/admin/referrals')} />
            <StatCard title="Teleconsultations" value="5,678" icon="📹" color="#1A3A6B" delay={0.10} />
            <StatCard title="Districts Active" value="13" icon="🗺️" color="#1A3A6B" delay={0.15} onClick={() => router.push('/admin/analytics/district')} />
            <StatCard title="Camps This Month" value="248" icon="⛺" color="#1A3A6B" delay={0.20} />
          </div>

          {/* Analytics Modules */}
          <div className="mt-24">
            <SectionHeader title="Analytics Modules" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12 }}>
              {analyticsModules.map((m, i) => (
                <div
                  key={m.label}
                  className={`animate-fade-up d${i + 1}`}
                  onClick={() => router.push(m.href)}
                  style={{
                    background: m.color + '10', border: `1.5px solid ${m.color}20`,
                    borderRadius: 14, padding: '16px 8px', textAlign: 'center',
                    cursor: 'pointer', transition: 'all .2s',
                  }}
                  onMouseOver={e => (e.currentTarget.style.transform = 'translateY(-3px)')}
                  onMouseOut={e => (e.currentTarget.style.transform = '')}
                >
                  <div style={{ fontSize: 24, marginBottom: 6 }}>{m.icon}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: m.color, lineHeight: 1.3 }}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* District Rankings */}
          <div className="mt-24">
            <SectionHeader title="District Rankings" actionLabel="View All" onAction={() => router.push('/admin/analytics/district')} />
            <div className="card">
              <div className="card-body" style={{ padding: 0 }}>
                {districts.map((d, i) => (
                  <div key={d.name} className={`list-item animate-fade-up d${i + 1}`} style={{ padding: '14px 20px' }}>
                    <RankBadge rank={i + 1} />
                    <div style={{ flex: 1, marginLeft: 12 }}>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>{d.name}</div>
                      <div style={{ fontSize: 11, color: '#9E9E9E' }}>{d.screened.toLocaleString()} screened</div>
                    </div>
                    <div style={{ textAlign: 'right', minWidth: 80 }}>
                      <div style={{
                        fontSize: 16, fontWeight: 800,
                        color: d.coverage >= 85 ? '#2E7D32' : '#E65100',
                      }}>{d.coverage}%</div>
                      <div style={{ fontSize: 10, color: '#9E9E9E' }}>Coverage</div>
                      <ProgressBar value={d.coverage} color={d.coverage >= 85 ? '#2E7D32' : '#E65100'} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick nav tiles */}
          <div className="mt-24 col-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {[
              { icon: '📋', label: 'EMR Timeline', href: '/admin/emr', color: '#1A3A6B' },
              { icon: '📁', label: 'Documents', href: '/admin/documents', color: '#00897B' },
              { icon: '🏥', label: 'Referrals', href: '/admin/referrals', color: '#C62828' },
              { icon: '📄', label: 'Reports', href: '/admin/reports', color: '#D4A017' },
            ].map((t, i) => (
              <div
                key={t.label}
                className={`card animate-fade-up d${i + 1}`}
                style={{ cursor: 'pointer', padding: 20, textAlign: 'center', transition: 'all .2s' }}
                onClick={() => router.push(t.href)}
                onMouseOver={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseOut={e => (e.currentTarget.style.transform = '')}
              >
                <div style={{ fontSize: 28, marginBottom: 8 }}>{t.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: t.color }}>{t.label}</div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
