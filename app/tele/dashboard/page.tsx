'use client';
import { useRouter } from 'next/navigation';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { StatCard, SectionHeader, StatusBadge } from '@/app/components/ui';

const consultations = [
  { id: 'CON-001', patientName: 'Ramaiah Venkata', condition: 'Diabetic Retinopathy', scheduledTime: 'Today, 10:00 AM', status: 'Scheduled', village: 'Patamata' },
  { id: 'CON-002', patientName: 'Lakshmi Devi', condition: 'Glaucoma Suspect', scheduledTime: 'Today, 11:30 AM', status: 'Scheduled', village: 'Kurnool' },
  { id: 'CON-003', patientName: 'Suresh Kumar', condition: 'Macular Degeneration', scheduledTime: 'Today, 02:00 PM', status: 'Completed', village: 'Ongole' },
  { id: 'CON-004', patientName: 'Padmavathi', condition: 'Cataract Evaluation', scheduledTime: 'Today, 03:30 PM', status: 'Completed', village: 'Markapur' },
];

export default function TeleDashboard() {
  const router = useRouter();
  const pending = consultations.filter(c => c.status === 'Scheduled').length;
  const completed = consultations.filter(c => c.status === 'Completed').length;
  const nextConsult = consultations.find(c => c.status === 'Scheduled');

  return (
    <div className="app-layout">
      <Sidebar role="tele" userName="Dr. Anita Rao" userSub="SVIMS, Tirupati" />
      <div className="main-content">
        <Topbar title="Tele-Ophthalmologist" subtitle="Dr. Anita Rao • SVIMS, Tirupati" />
        <main className="page-body">
          {/* Next Consultation Card */}
          {nextConsult && (
            <div className="animate-fade-up" style={{
              background: 'linear-gradient(135deg, #1A3A6B, #01579B)',
              borderRadius: 20, padding: 24, color: 'white', marginBottom: 20,
            }}>
              <span style={{ background: 'rgba(255,255,255,.2)', padding: '2px 10px', borderRadius: 20, fontSize: 9, fontWeight: 800, letterSpacing: 1 }}>NEXT UP</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 14 }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(255,255,255,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>👤</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 18, fontWeight: 800 }}>{nextConsult.patientName}</div>
                  <div style={{ fontSize: 12, opacity: 0.8 }}>{nextConsult.condition}</div>
                  <div style={{ fontSize: 11, opacity: 0.7 }}>{nextConsult.scheduledTime}</div>
                </div>
              </div>
              <button className="btn btn-full" style={{ marginTop: 16, background: 'white', color: '#1A3A6B', fontWeight: 800 }}
                onClick={() => router.push('/tele/video')}>
                📹 Join Consultation
              </button>
            </div>
          )}

          <SectionHeader title="Today's Summary" />
          <div className="stats-grid stats-grid-3 mt-12 mb-24">
            <StatCard title="Pending" value={`${pending}`} icon="⏳" color="#E65100" delay={0.05} />
            <StatCard title="Completed" value={`${completed}`} icon="✅" color="#2E7D32" delay={0.10} />
            <StatCard title="Referrals" value="2" icon="🏥" color="#C62828" delay={0.15} />
          </div>

          <SectionHeader title="Consultation Queue" actionLabel="View All" onAction={() => router.push('/tele/consultations')} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
            {consultations.map((c, i) => (
              <div key={c.id} className={`card animate-fade-up d${i + 1}`} style={{ cursor: 'pointer' }}
                onClick={() => router.push('/tele/video')}>
                <div className="card-body">
                  <div className="flex items-center gap-12">
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#1A3A6B18', color: '#1A3A6B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>{c.patientName[0]}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 700 }}>{c.patientName}</div>
                      <div style={{ fontSize: 12, color: '#9E9E9E' }}>{c.condition}</div>
                      <div style={{ fontSize: 11, color: '#1A3A6B' }}>{c.scheduledTime}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                      <StatusBadge label={c.status} />
                      {c.status === 'Scheduled' && (
                        <button className="btn btn-sm btn-primary" onClick={e => { e.stopPropagation(); router.push('/tele/video'); }}>Join</button>
                      )}
                    </div>
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
