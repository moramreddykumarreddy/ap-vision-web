'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { StatusBadge } from '@/app/components/ui';

const prescriptions = [
  { id: 'RX-001', patientName: 'Ramaiah Venkata', age: 58, village: 'Patamata', diagnosis: 'Presbyopia', power: 'OD: +1.25/-0.50×90, OS: +1.00/-0.25×80', date: '02 Jun 2025', doctor: 'Dr. Srinivasa Rao', status: 'Pending' },
  { id: 'RX-003', patientName: 'Suresh Kumar', age: 62, village: 'Ongole', diagnosis: 'Cataract', power: 'Surgical referral recommended', date: '01 Jun 2025', doctor: 'Dr. Priya Devi', status: 'Pending' },
  { id: 'RX-002', patientName: 'Lakshmi Devi', age: 45, village: 'Kurnool', diagnosis: 'Myopia', power: 'OD: -2.50/-0.75×175, OS: -2.00/-0.50×170', date: '02 Jun 2025', doctor: 'Dr. Srinivasa Rao', status: 'Approved' },
  { id: 'RX-004', patientName: 'Padmavathi', age: 38, village: 'Markapur', diagnosis: 'Astigmatism', power: 'OD: -1.00/-1.25×90, OS: -1.25/-1.00×85', date: '31 May 2025', doctor: 'Dr. Ramesh Kumar', status: 'Approved' },
];

export default function ApprovalScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState('Pending');
  const filtered = prescriptions.filter(p => filter === 'All' || p.status === filter);

  return (
    <div className="app-layout">
      <Sidebar role="nodal" userName="Ravi Shankar" userSub="Nodal Officer, Krishna" />
      <div className="main-content">
        <Topbar title="Prescription Approvals" subtitle="Review and approve prescriptions" />
        <main className="page-body">
          {/* Filter */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            {['Pending', 'Approved', 'All'].map(s => (
              <button key={s} onClick={() => setFilter(s)} className="btn btn-sm"
                style={{ background: filter === s ? '#1A3A6B' : 'white', color: filter === s ? 'white' : '#616161', border: '1.5px solid', borderColor: filter === s ? '#1A3A6B' : '#E0E0E0' }}>
                {s} ({prescriptions.filter(p => s === 'All' || p.status === s).length})
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {filtered.map((rx, i) => (
              <div key={rx.id} className={`card animate-fade-up d${i + 1}`}>
                <div className="card-body">
                  <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-12">
                      <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#1A3A6B18', color: '#1A3A6B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16 }}>{rx.patientName[0]}</div>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 800 }}>{rx.patientName}</div>
                        <div style={{ fontSize: 11, color: '#9E9E9E' }}>{rx.age}y • {rx.village} • {rx.date}</div>
                      </div>
                    </div>
                    <StatusBadge label={rx.status} />
                  </div>
                  <div style={{ background: '#F5F5F5', borderRadius: 10, padding: 14, marginBottom: 14 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      <div><div style={{ fontSize: 10, color: '#9E9E9E', fontWeight: 700 }}>DIAGNOSIS</div><div style={{ fontSize: 13, fontWeight: 700 }}>{rx.diagnosis}</div></div>
                      <div><div style={{ fontSize: 10, color: '#9E9E9E', fontWeight: 700 }}>DOCTOR</div><div style={{ fontSize: 13, fontWeight: 700 }}>{rx.doctor}</div></div>
                      <div style={{ gridColumn: '1/-1' }}><div style={{ fontSize: 10, color: '#9E9E9E', fontWeight: 700 }}>POWER</div><div style={{ fontSize: 12, color: '#424242' }}>{rx.power}</div></div>
                    </div>
                  </div>
                  {rx.status === 'Pending' && (
                    <div style={{ display: 'flex', gap: 10 }}>
                      <button className="btn btn-primary btn-sm" style={{ flex: 1 }}>✅ Approve</button>
                      <button className="btn btn-sm" style={{ flex: 1, background: '#C62828', color: 'white' }}>❌ Reject</button>
                      <button className="btn btn-outline btn-sm">📋 View Full</button>
                    </div>
                  )}
                  {rx.status === 'Approved' && (
                    <div style={{ display: 'flex', gap: 10 }}>
                      <button className="btn btn-sm btn-outline">📋 View Full</button>
                      <button className="btn btn-sm btn-outline">🖨️ Print</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
