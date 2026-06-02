'use client';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { StatusBadge } from '@/app/components/ui';

const referrals = [
  { id: 'REF-001', reason: 'Cataract Evaluation', hospital: 'SVIMS, Tirupati', doctor: 'Dr. Anita Rao', date: '01 Jun 2025', status: 'Pending', urgent: false },
  { id: 'REF-002', reason: 'Diabetic Retinopathy Check', hospital: 'Government General Hospital, Vijayawada', doctor: 'Dr. Rajesh Reddy', date: '28 May 2025', status: 'Approved', urgent: true },
];

export default function PatientReferralScreen() {
  return (
    <div className="app-layout">
      <Sidebar role="patient" userName="Ramaiah Venkata" userSub="Patient" />
      <div className="main-content">
        <Topbar title="My Referrals" subtitle="Hospital and specialist referrals" />
        <main className="page-body">
          {referrals.map((r, i) => (
            <div key={r.id} className={`card animate-fade-up d${i + 1} mb-16`}>
              <div className="card-body">
                <div className="flex items-center justify-between mb-12">
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 800 }}>{r.reason}</div>
                    <div style={{ fontSize: 11, color: '#9E9E9E' }}>{r.id} • {r.date}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    {r.urgent && <span className="badge badge-error">URGENT</span>}
                    <StatusBadge label={r.status} />
                  </div>
                </div>
                <div style={{ background: '#F5F5F5', borderRadius: 10, padding: 14 }}>
                  {[
                    { l: 'Hospital', v: r.hospital },
                    { l: 'Doctor', v: r.doctor },
                  ].map(item => (
                    <div key={item.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                      <span style={{ fontSize: 12, color: '#9E9E9E' }}>{item.l}</span>
                      <span style={{ fontSize: 13, fontWeight: 700 }}>{item.v}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                  <button className="btn btn-outline btn-sm">📄 View Letter</button>
                  <button className="btn btn-outline btn-sm">🗺️ Get Directions</button>
                  <button className="btn btn-primary btn-sm">📅 Book Appointment</button>
                </div>
              </div>
            </div>
          ))}
          {referrals.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#9E9E9E' }}>
              <div style={{ fontSize: 48 }}>✅</div>
              <div style={{ fontSize: 16, fontWeight: 600, marginTop: 12 }}>No pending referrals</div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
