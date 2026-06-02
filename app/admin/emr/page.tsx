'use client';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { StatusBadge } from '@/app/components/ui';

const events = [
  { date: '02 Jun 2025', type: 'Screening', title: 'Vision Screening at Vijayawada Urban Camp', doctor: 'Dr. Srinivasa Rao', summary: 'VA: OD 6/18, OS 6/24. Presbyopia diagnosed. Prescription issued.', color: '#1A3A6B', icon: '🔬' },
  { date: '01 Jun 2025', type: 'Prescription', title: 'Prescription Generated', doctor: 'Dr. Srinivasa Rao', summary: 'OD: +1.25/-0.50×90, OS: +1.00/-0.25×80. Bifocal glasses ordered.', color: '#00897B', icon: '💊' },
  { date: '28 May 2025', type: 'Teleconsultation', title: 'Tele-consultation – Diabetic Retinopathy', doctor: 'Dr. Anita Rao', summary: 'Fundus examination reviewed. Mild NPDR detected. Follow-up in 3 months.', color: '#D4A017', icon: '📹' },
  { date: '20 May 2025', type: 'Referral', title: 'Referral to SVIMS Tirupati', doctor: 'Dr. Srinivasa Rao', summary: 'Referred for detailed cataract evaluation and surgical consultation.', color: '#C62828', icon: '🏥' },
  { date: '10 Jan 2025', type: 'Screening', title: 'Initial Screening – Registration', doctor: 'Dr. Priya Devi', summary: 'First visit. Myopia detected. Glasses prescribed. APV ID issued.', color: '#1A3A6B', icon: '🔬' },
];

export default function EmrTimeline() {
  return (
    <div className="app-layout">
      <Sidebar role="admin" userName="Venkat Rao" userSub="Super Admin" />
      <div className="main-content">
        <Topbar title="EMR Timeline" subtitle="Ramaiah Venkata • APV-001234" />
        <main className="page-body">
          {/* Patient header */}
          <div className="card mb-20">
            <div className="card-body">
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#1A3A6B', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 900 }}>R</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 18, fontWeight: 900 }}>Ramaiah Venkata</div>
                  <div style={{ fontSize: 12, color: '#9E9E9E' }}>58 years • Male • APV-001234 • Patamata, Krishna</div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                    <StatusBadge label="Active" />
                    <span className="badge badge-info">BPL</span>
                    <span className="badge badge-warning">Diabetic</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-outline btn-sm">📄 Download EMR</button>
                  <button className="btn btn-primary btn-sm">+ Add Entry</button>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="order-timeline" style={{ paddingLeft: 28 }}>
            {events.map((e, i) => (
              <div key={i} className={`order-timeline-item animate-fade-up d${i + 1}`} style={{ paddingBottom: 24, paddingLeft: 20 }}>
                <div className="order-timeline-dot active" style={{ background: e.color, boxShadow: `0 0 0 3px ${e.color}30`, width: 16, height: 16, left: -29 }} />
                <div className="card">
                  <div className="card-body">
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                          <span style={{ fontSize: 16 }}>{e.icon}</span>
                          <span className="badge" style={{ background: e.color + '15', color: e.color }}>{e.type}</span>
                          <span style={{ fontSize: 11, color: '#9E9E9E' }}>{e.date}</span>
                        </div>
                        <div style={{ fontSize: 14, fontWeight: 800 }}>{e.title}</div>
                        <div style={{ fontSize: 12, color: '#757575', marginTop: 2 }}>👨‍⚕️ {e.doctor}</div>
                      </div>
                    </div>
                    <div style={{ background: '#F8F9FA', borderRadius: 8, padding: '10px 14px', fontSize: 12, color: '#424242' }}>
                      {e.summary}
                    </div>
                    <button className="btn btn-ghost btn-sm" style={{ marginTop: 8, fontSize: 11 }}>View Details →</button>
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
