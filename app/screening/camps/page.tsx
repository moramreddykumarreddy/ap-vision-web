'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { SectionHeader, StatusBadge } from '@/app/components/ui';

const camps = [
  { id: 'C001', name: 'Vijayawada Urban Camp', mandal: 'Vijayawada', district: 'Krishna', date: '02 Jun 2025', status: 'Active', registered: 145, screened: 132, prescriptions: 48, referrals: 12, doctor: 'Dr. Srinivasa Rao', venue: 'Govt. School Hall' },
  { id: 'C002', name: 'Guntur Rural Health Camp', mandal: 'Tenali', district: 'Guntur', date: '01 Jun 2025', status: 'Completed', registered: 98, screened: 98, prescriptions: 31, referrals: 7, doctor: 'Dr. Priya Devi', venue: 'PHC Building' },
  { id: 'C003', name: 'Kurnool School Vision Camp', mandal: 'Kurnool', district: 'Kurnool', date: '03 Jun 2025', status: 'Scheduled', registered: 0, screened: 0, prescriptions: 0, referrals: 0, doctor: 'Dr. Ramesh Kumar', venue: 'ZPHS Kurnool' },
  { id: 'C004', name: 'Nellore Coastal Camp', mandal: 'Kavali', district: 'Nellore', date: '04 Jun 2025', status: 'Scheduled', registered: 0, screened: 0, prescriptions: 0, referrals: 0, doctor: 'Dr. Lakshmi Rao', venue: 'Fishermen Community Hall' },
];

export default function CampManagement() {
  const router = useRouter();
  const [filter, setFilter] = useState('All');
  const statuses = ['All', 'Active', 'Scheduled', 'Completed'];
  const filtered = filter === 'All' ? camps : camps.filter(c => c.status === filter);

  return (
    <div className="app-layout">
      <Sidebar role="screening" userName="Dr. Srinivasa Rao" userSub="Team Lead" />
      <div className="main-content">
        <Topbar title="Camp Management" subtitle="All screening camps" />
        <main className="page-body">
          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
            {statuses.map(s => (
              <button key={s} onClick={() => setFilter(s)} className="btn btn-sm"
                style={{
                  background: filter === s ? '#1A3A6B' : 'white',
                  color: filter === s ? 'white' : '#616161',
                  border: '1.5px solid', borderColor: filter === s ? '#1A3A6B' : '#E0E0E0',
                }}>
                {s} {s !== 'All' && `(${camps.filter(c => c.status === s).length})`}
              </button>
            ))}
            <button className="btn btn-accent btn-sm" style={{ marginLeft: 'auto' }} onClick={() => alert('Create New Camp')}>
              + New Camp
            </button>
          </div>

          {/* Camp Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {filtered.map((c, i) => (
              <div key={c.id} className={`card animate-fade-up d${i + 1}`}>
                <div className="card-body">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 800 }}>{c.name}</div>
                      <div style={{ fontSize: 12, color: '#9E9E9E' }}>{c.id}</div>
                    </div>
                    <StatusBadge label={c.status} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
                    <div style={{ fontSize: 12, color: '#757575' }}>📍 {c.mandal}, {c.district}</div>
                    <div style={{ fontSize: 12, color: '#757575' }}>📅 {c.date}</div>
                    <div style={{ fontSize: 12, color: '#757575' }}>👨‍⚕️ {c.doctor}</div>
                    <div style={{ fontSize: 12, color: '#757575' }}>🏛️ {c.venue}</div>
                  </div>
                  <div style={{ background: '#F5F5F5', borderRadius: 10, padding: '12px 16px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                    {[
                      { l: 'Registered', v: c.registered },
                      { l: 'Screened', v: c.screened },
                      { l: 'Prescriptions', v: c.prescriptions },
                      { l: 'Referrals', v: c.referrals },
                    ].map(m => (
                      <div key={m.l} style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 20, fontWeight: 900 }}>{m.v}</div>
                        <div style={{ fontSize: 10, color: '#9E9E9E' }}>{m.l}</div>
                      </div>
                    ))}
                  </div>
                  {c.status === 'Active' && (
                    <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                      <button className="btn btn-primary btn-sm" onClick={() => router.push('/screening/register')}>+ Register Patient</button>
                      <button className="btn btn-outline btn-sm">View Details</button>
                      <button className="btn btn-outline btn-sm" style={{ marginLeft: 'auto' }}>End Camp</button>
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
