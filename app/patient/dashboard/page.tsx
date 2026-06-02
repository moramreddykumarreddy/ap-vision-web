'use client';
import { useRouter } from 'next/navigation';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { StatCard, SectionHeader, StatusBadge, ProgressBar } from '@/app/components/ui';

export default function PatientDashboard() {
  const router = useRouter();
  return (
    <div className="app-layout">
      <Sidebar role="patient" userName="Ramaiah Venkata" userSub="Patient" />
      <div className="main-content">
        <Topbar title="My Health Dashboard" subtitle="Ramaiah Venkata • APV-001234" />
        <main className="page-body">
          {/* Profile Banner */}
          <div className="animate-fade-up" style={{ background: 'linear-gradient(135deg, #1A3A6B, #2952A3)', borderRadius: 20, padding: 24, color: 'white', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 900 }}>R</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 20, fontWeight: 900 }}>Ramaiah Venkata</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>58 years • Male • APV-001234</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Patamata, Krishna District</div>
            </div>
            <button className="btn btn-sm" style={{ background: 'rgba(255,255,255,.2)', color: 'white' }} onClick={() => router.push('/patient/profile')}>View Profile</button>
          </div>

          <div className="stats-grid stats-grid-4 mb-24">
            <StatCard title="Prescriptions" value="3" icon="💊" color="#1A3A6B" delay={0.05} onClick={() => router.push('/patient/prescriptions')} />
            <StatCard title="Spectacles" value="1" icon="👓" color="#00897B" delay={0.10} onClick={() => router.push('/patient/spectacles')} />
            <StatCard title="Referrals" value="1" icon="🏥" color="#C62828" delay={0.15} onClick={() => router.push('/patient/referrals')} />
            <StatCard title="Consultations" value="2" icon="📹" color="#D4A017" delay={0.20} onClick={() => router.push('/patient/teleconsultation')} />
          </div>

          {/* Next Appointment */}
          <div className="animate-fade-up mb-24" style={{ background: 'rgba(0,137,123,.05)', border: '1.5px solid rgba(0,137,123,.2)', borderRadius: 14, padding: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ fontSize: 28 }}>📅</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Next Appointment</div>
              <div style={{ fontSize: 12, color: '#00897B' }}>Tele-consultation with Dr. Anita Rao</div>
              <div style={{ fontSize: 11, color: '#9E9E9E' }}>10 Jun 2025 • 10:00 AM</div>
            </div>
            <button className="btn btn-accent btn-sm" onClick={() => router.push('/patient/teleconsultation')}>Join</button>
          </div>

          {/* Recent activity */}
          <SectionHeader title="Recent Activity" />
          <div className="card mt-12">
            <div className="card-body" style={{ padding: 0 }}>
              {[
                { icon: '💊', label: 'Prescription Generated', sub: 'Presbyopia • Dr. Srinivasa Rao', date: '02 Jun 2025', color: '#1A3A6B' },
                { icon: '👓', label: 'Spectacles Ordered', sub: 'Single Vision • Vision Plus Ltd', date: '01 Jun 2025', color: '#00897B' },
                { icon: '🔬', label: 'Vision Screening Done', sub: 'Vijayawada Urban Camp', date: '01 Jun 2025', color: '#D4A017' },
                { icon: '🏥', label: 'Referred to Specialist', sub: 'Cataract Evaluation • Dr. Anita Rao', date: '28 May 2025', color: '#C62828' },
              ].map((item, i) => (
                <div key={item.label} className={`list-item animate-fade-up d${i + 1}`} style={{ padding: '12px 20px' }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: item.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{item.icon}</div>
                  <div style={{ flex: 1, marginLeft: 12 }}>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{item.label}</div>
                    <div style={{ fontSize: 11, color: '#9E9E9E' }}>{item.sub}</div>
                  </div>
                  <div style={{ fontSize: 11, color: '#BDBDBD' }}>{item.date}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <SectionHeader title="Quick Access" actionLabel="" className="mt-24" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 12 }}>
            {[
              { icon: '💊', label: 'Prescriptions', color: '#1A3A6B', href: '/patient/prescriptions' },
              { icon: '👓', label: 'Spectacles', color: '#00897B', href: '/patient/spectacles' },
              { icon: '🏥', label: 'Referrals', color: '#C62828', href: '/patient/referrals' },
              { icon: '📹', label: 'Teleconsult', color: '#D4A017', href: '/patient/teleconsultation' },
              { icon: '👤', label: 'Profile', color: '#6A1B9A', href: '/patient/profile' },
            ].map((a, i) => (
              <div
                key={a.label}
                className={`card animate-fade-up d${i + 1}`}
                style={{ padding: 20, textAlign: 'center', cursor: 'pointer', transition: 'all .2s' }}
                onClick={() => router.push(a.href)}
                onMouseOver={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseOut={e => (e.currentTarget.style.transform = '')}
              >
                <div style={{ fontSize: 24, marginBottom: 8 }}>{a.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: a.color }}>{a.label}</div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
