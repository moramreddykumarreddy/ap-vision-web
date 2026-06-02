'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { StatusBadge } from '@/app/components/ui';

const consultations = [
  { id: 'CON-001', patientName: 'Ramaiah Venkata', condition: 'Diabetic Retinopathy', scheduledTime: 'Today, 10:00 AM', status: 'Scheduled', age: 58, village: 'Patamata', notes: '' },
  { id: 'CON-002', patientName: 'Lakshmi Devi', condition: 'Glaucoma Suspect', scheduledTime: 'Today, 11:30 AM', status: 'Scheduled', age: 45, village: 'Kurnool', notes: '' },
  { id: 'CON-003', patientName: 'Suresh Kumar', condition: 'Macular Degeneration', scheduledTime: 'Today, 02:00 PM', status: 'Completed', age: 62, village: 'Ongole', notes: 'Referred to retinal specialist' },
  { id: 'CON-004', patientName: 'Padmavathi', condition: 'Cataract Evaluation', scheduledTime: 'Today, 03:30 PM', status: 'Completed', age: 38, village: 'Markapur', notes: 'Surgery advised' },
  { id: 'CON-005', patientName: 'Narasimha Rao', condition: 'Glaucoma', scheduledTime: 'Tomorrow, 09:00 AM', status: 'Scheduled', age: 71, village: 'Darsi', notes: '' },
];

export default function ConsultationList() {
  const router = useRouter();
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? consultations : consultations.filter(c => c.status === filter);

  return (
    <div className="app-layout">
      <Sidebar role="tele" userName="Dr. Anita Rao" userSub="SVIMS, Tirupati" />
      <div className="main-content">
        <Topbar title="Consultation List" subtitle="All teleconsultations" />
        <main className="page-body">
          {/* Filter */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            {['All', 'Scheduled', 'Completed'].map(s => (
              <button key={s} onClick={() => setFilter(s)} className="btn btn-sm"
                style={{ background: filter === s ? '#1A3A6B' : 'white', color: filter === s ? 'white' : '#616161', border: '1.5px solid', borderColor: filter === s ? '#1A3A6B' : '#E0E0E0' }}>
                {s} ({(s === 'All' ? consultations : consultations.filter(c => c.status === s)).length})
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filtered.map((c, i) => (
              <div key={c.id} className={`card animate-fade-up d${i + 1}`}>
                <div className="card-body">
                  <div className="flex items-center gap-12">
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#1A3A6B18', color: '#1A3A6B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16 }}>{c.patientName[0]}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 800 }}>{c.patientName}</div>
                      <div style={{ fontSize: 12, color: '#757575' }}>{c.condition} • {c.age}y • {c.village}</div>
                      <div style={{ fontSize: 11, color: '#1A3A6B', marginTop: 2 }}>🕐 {c.scheduledTime}</div>
                      {c.notes && <div style={{ fontSize: 11, color: '#9E9E9E', fontStyle: 'italic', marginTop: 2 }}>📝 {c.notes}</div>}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                      <StatusBadge label={c.status} />
                      {c.status === 'Scheduled' && (
                        <button className="btn btn-sm btn-primary" onClick={() => router.push('/tele/video')}>📹 Join</button>
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
