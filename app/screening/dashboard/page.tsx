'use client';
import { useRouter } from 'next/navigation';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { StatCard, SectionHeader, BannerCard, AlertBanner, StatusBadge, ListItem } from '@/app/components/ui';

const camps = [
  { id: 'C001', name: 'Vijayawada Urban Camp', mandal: 'Vijayawada', district: 'Krishna', date: '02 Jun 2025', status: 'Active', registered: 145, screened: 132, prescriptions: 48, referrals: 12 },
  { id: 'C002', name: 'Guntur Rural Health Camp', mandal: 'Tenali', district: 'Guntur', date: '01 Jun 2025', status: 'Completed', registered: 98, screened: 98, prescriptions: 31, referrals: 7 },
  { id: 'C003', name: 'Kurnool School Vision Camp', mandal: 'Kurnool', district: 'Kurnool', date: '03 Jun 2025', status: 'Scheduled', registered: 0, screened: 0, prescriptions: 0, referrals: 0 },
];

export default function ScreeningDashboard() {
  const router = useRouter();
  const activeCamp = camps.find(c => c.status === 'Active');

  return (
    <div className="app-layout">
      <Sidebar role="screening" userName="Dr. Srinivasa Rao" userSub="Team Lead" />
      <div className="main-content">
        <Topbar title="Screening Team" subtitle="Dr. Srinivasa Rao • Team Lead" />
        <main className="page-body">
          {/* Active Camp Banner */}
          {activeCamp && (
            <div className="animate-fade-up" style={{
              background: 'linear-gradient(135deg, #1A3A6B, #00897B)',
              borderRadius: 20, padding: '20px 24px', color: 'white',
              display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20,
            }}>
              <div style={{
                width: 52, height: 52, borderRadius: '50%',
                background: 'rgba(255,255,255,.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
              }}>⛺</div>
              <div style={{ flex: 1 }}>
                <span style={{
                  background: 'rgba(255,255,255,.2)', borderRadius: 20, padding: '2px 10px',
                  fontSize: 9, fontWeight: 700, letterSpacing: 1,
                }}>● ACTIVE CAMP</span>
                <div style={{ fontSize: 16, fontWeight: 800, marginTop: 4 }}>{activeCamp.name}</div>
                <div style={{ fontSize: 12, opacity: 0.8 }}>{activeCamp.mandal}, {activeCamp.district} • {activeCamp.date}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 26, fontWeight: 900 }}>{activeCamp.registered}</div>
                <div style={{ fontSize: 11, opacity: 0.8 }}>Patients</div>
              </div>
            </div>
          )}

          <SectionHeader title="Today's Summary" />
          <div className="stats-grid stats-grid-4 mt-12 mb-24">
            <StatCard title="Patients Registered" value={`${activeCamp?.registered ?? 145}`} icon="📋" color="#1A3A6B" delay={0.05} />
            <StatCard title="Patients Screened" value={`${activeCamp?.screened ?? 132}`} icon="👁️" color="#1A3A6B" delay={0.10} subtitle="91%" />
            <StatCard title="Prescriptions" value={`${activeCamp?.prescriptions ?? 48}`} icon="💊" color="#00897B" delay={0.15} />
            <StatCard title="Referrals" value={`${activeCamp?.referrals ?? 12}`} icon="🏥" color="#E65100" delay={0.20} />
          </div>

          {/* Quick Actions */}
          <SectionHeader title="Quick Actions" />
          <div className="quick-actions mt-12 mb-24">
            {[
              { icon: '👤', label: 'Register Patient', color: '#1A3A6B', href: '/screening/register' },
              { icon: '📷', label: 'Scan QR', color: '#2952A3', href: '/screening/search' },
              { icon: '🔍', label: 'Search Patient', color: '#00897B', href: '/screening/search' },
              { icon: '⛺', label: 'Manage Camp', color: '#D4A017', href: '/screening/camps' },
            ].map(a => (
              <button
                key={a.label}
                className="quick-action-btn"
                onClick={() => router.push(a.href)}
                style={{ background: a.color + '10', borderColor: a.color + '25', border: '1.5px solid' }}
              >
                <span style={{ fontSize: 22 }}>{a.icon}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: a.color, textAlign: 'center' }}>{a.label}</span>
              </button>
            ))}
          </div>

          {/* Camp List */}
          <SectionHeader title="Camps" actionLabel="View All" onAction={() => router.push('/screening/camps')} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {camps.map((c, i) => (
              <div key={c.id} className={`card animate-fade-up d${i + 1}`}>
                <div className="card-body">
                  <div className="flex items-center justify-between mb-8">
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{c.name}</div>
                    <StatusBadge label={c.status} />
                  </div>
                  <div style={{ fontSize: 12, color: '#9E9E9E', marginBottom: 12 }}>{c.mandal}, {c.district} • {c.date}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                    {[
                      { l: 'Registered', v: c.registered },
                      { l: 'Screened', v: c.screened },
                      { l: 'Prescriptions', v: c.prescriptions },
                      { l: 'Referrals', v: c.referrals },
                    ].map(m => (
                      <div key={m.l} style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 18, fontWeight: 800 }}>{m.v}</div>
                        <div style={{ fontSize: 10, color: '#9E9E9E' }}>{m.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
