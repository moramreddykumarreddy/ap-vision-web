'use client';
import { useState } from 'react';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { StatCard, ProgressBar } from '@/app/components/ui';

const districts = [
  { name: 'Krishna', mandals: 50, camps: 42, screened: 48200, target: 55000, referrals: 1620, spectacles: 11400 },
  { name: 'Guntur', mandals: 57, camps: 38, screened: 45600, target: 52000, referrals: 1580, spectacles: 10200 },
  { name: 'Kurnool', mandals: 54, camps: 35, screened: 41200, target: 50000, referrals: 1240, spectacles: 9800 },
];

export default function DistrictDashboard() {
  const [selected, setSelected] = useState('Krishna');
  const d = districts.find(d => d.name === selected) ?? districts[0];
  const pct = Math.round((d.screened / d.target) * 100);

  return (
    <div className="app-layout">
      <Sidebar role="admin" userName="Venkat Rao" userSub="Super Admin" />
      <div className="main-content">
        <Topbar title="District Analytics" subtitle="District-wise performance overview" />
        <main className="page-body">
          {/* District selector */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
            {districts.map(d => (
              <button key={d.name} onClick={() => setSelected(d.name)} className="btn btn-sm"
                style={{ background: selected === d.name ? '#1A3A6B' : 'white', color: selected === d.name ? 'white' : '#616161', border: '1.5px solid', borderColor: selected === d.name ? '#1A3A6B' : '#E0E0E0' }}>
                {d.name}
              </button>
            ))}
          </div>

          {/* Summary banner */}
          <div className="animate-fade-up" style={{ background: 'linear-gradient(135deg, #1A3A6B, #2952A3)', borderRadius: 20, padding: 24, color: 'white', marginBottom: 24 }}>
            <div style={{ fontSize: 20, fontWeight: 900 }}>{d.name} District</div>
            <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 16 }}>{d.mandals} Mandals • {d.camps} Camps Completed</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 12 }}>Coverage Progress</span>
                  <span style={{ fontSize: 14, fontWeight: 800 }}>{pct}%</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,.2)', borderRadius: 99, height: 8 }}>
                  <div style={{ background: pct >= 85 ? '#FFD54F' : '#FF9800', borderRadius: 99, height: '100%', width: `${pct}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="stats-grid stats-grid-4 mb-24">
            <StatCard title="Total Screened" value={d.screened.toLocaleString()} icon="👁️" color="#1A3A6B" delay={0.05} />
            <StatCard title="Target" value={d.target.toLocaleString()} icon="🎯" color="#D4A017" delay={0.10} />
            <StatCard title="Referrals" value={d.referrals.toLocaleString()} icon="🏥" color="#C62828" delay={0.15} />
            <StatCard title="Spectacles Given" value={d.spectacles.toLocaleString()} icon="👓" color="#00897B" delay={0.20} />
          </div>

          {/* Mandal-wise chart placeholder */}
          <div className="card">
            <div className="card-header"><h3>Mandal-wise Coverage – {d.name}</h3></div>
            <div className="card-body">
              {['Vijayawada', 'Machilipatnam', 'Gudivada', 'Nuzvid', 'Jaggaiahpet', 'Nandigama'].map((m, i) => {
                const pctM = Math.max(55, 95 - i * 7);
                return (
                  <div key={m} style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{m}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: pctM >= 85 ? '#2E7D32' : '#E65100' }}>{pctM}%</span>
                    </div>
                    <ProgressBar value={pctM} color={pctM >= 85 ? '#2E7D32' : pctM >= 70 ? '#D4A017' : '#E65100'} />
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
