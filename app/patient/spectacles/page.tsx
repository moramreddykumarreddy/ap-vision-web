'use client';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { StatusBadge, ProgressBar } from '@/app/components/ui';

const spectacles = [
  {
    id: 'SPC-001', orderedDate: '02 Jun 2025', expectedDate: '12 Jun 2025',
    vendor: 'Vision Plus Ltd', type: 'Bifocal', frame: 'Full Rim',
    power: 'OD: +1.25/-0.50×90  OS: +1.00/-0.25×80', status: 'In Progress',
    progress: 60, location: 'Being manufactured at vendor',
  },
  {
    id: 'SPC-002', orderedDate: '10 Jan 2025', expectedDate: '20 Jan 2025',
    vendor: 'ClearSight Optics', type: 'Single Vision', frame: 'Half Rim',
    power: 'OD: -2.00/-0.50×175  OS: -1.75/-0.25×170', status: 'Delivered',
    progress: 100, location: 'Collected on 19 Jan 2025',
  },
];

const timeline = [
  { label: 'Prescription Generated', done: true },
  { label: 'Order Placed with Vendor', done: true },
  { label: 'Manufacturing', done: true },
  { label: 'Quality Check', done: false },
  { label: 'Dispatched to Camp', done: false },
  { label: 'Delivered to Patient', done: false },
];

export default function SpectacleTracking() {
  return (
    <div className="app-layout">
      <Sidebar role="patient" userName="Ramaiah Venkata" userSub="Patient" />
      <div className="main-content">
        <Topbar title="Spectacle Tracking" subtitle="Track your spectacle orders" />
        <main className="page-body">
          {spectacles.map((s, i) => (
            <div key={s.id} className={`card animate-fade-up d${i + 1} mb-20`}>
              <div className="card-header">
                <div>
                  <div style={{ fontWeight: 800, fontSize: 15 }}>{s.id}</div>
                  <div style={{ fontSize: 11, color: '#9E9E9E' }}>{s.vendor} • Ordered: {s.orderedDate}</div>
                </div>
                <StatusBadge label={s.status} />
              </div>
              <div className="card-body">
                <div style={{ background: '#F5F5F5', borderRadius: 10, padding: 14, marginBottom: 16 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 10 }}>
                    {[{ l: 'Type', v: s.type }, { l: 'Frame', v: s.frame }, { l: 'Expected', v: s.expectedDate }].map(item => (
                      <div key={item.l}>
                        <div style={{ fontSize: 10, color: '#9E9E9E', fontWeight: 700 }}>{item.l}</div>
                        <div style={{ fontSize: 13, fontWeight: 700 }}>{item.v}</div>
                      </div>
                    ))}
                  </div>
                  <div><div style={{ fontSize: 10, color: '#9E9E9E', fontWeight: 700 }}>PRESCRIPTION POWER</div><div style={{ fontSize: 12 }}>{s.power}</div></div>
                </div>

                {/* Progress */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 12, color: '#9E9E9E' }}>Delivery Progress</span>
                    <span style={{ fontSize: 12, fontWeight: 700 }}>{s.progress}%</span>
                  </div>
                  <ProgressBar value={s.progress} color={s.progress === 100 ? '#2E7D32' : '#1A3A6B'} />
                  <div style={{ fontSize: 11, color: '#9E9E9E', marginTop: 4 }}>📍 {s.location}</div>
                </div>

                {/* Timeline (only for first) */}
                {i === 0 && (
                  <div className="order-timeline">
                    {timeline.map((t, j) => (
                      <div key={t.label} className="order-timeline-item">
                        <div className={`order-timeline-dot${t.done ? ' active' : ''}`} />
                        <span style={{ fontSize: 12, color: t.done ? '#1A3A6B' : '#BDBDBD', fontWeight: t.done ? 700 : 400 }}>{t.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}
