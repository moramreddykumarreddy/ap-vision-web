'use client';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { StatCard, SectionHeader, ProgressBar } from '@/app/components/ui';

export default function SchoolVisionDashboard() {
  return (
    <div className="app-layout">
      <Sidebar role="admin" userName="Venkat Rao" userSub="Super Admin" />
      <div className="main-content">
        <Topbar title="School Vision Program" subtitle="Student eye health screening statewide" />
        <main className="page-body">
          <div style={{ background: 'linear-gradient(135deg, #00897B, #00695C)', borderRadius: 20, padding: 24, color: 'white', marginBottom: 24 }}>
            <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>🏫 School Vision Screening Program</div>
            <div style={{ fontSize: 12, opacity: 0.75 }}>Govt. Schools & Residential Institutions • 2024–25</div>
            <div style={{ display: 'flex', gap: 32, marginTop: 16 }}>
              {[{ v: '12,480', l: 'Schools Covered' }, { v: '3.8L', l: 'Students Screened' }, { v: '48,200', l: 'Specs Provided' }, { v: '8,400', l: 'Referrals' }].map(k => (
                <div key={k.l}>
                  <div style={{ fontSize: 22, fontWeight: 900 }}>{k.v}</div>
                  <div style={{ fontSize: 11, opacity: 0.7 }}>{k.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="stats-grid stats-grid-4 mb-24">
            <StatCard title="Schools Covered" value="12,480" icon="🏫" color="#00897B" delay={0.05} />
            <StatCard title="Myopia Cases" value="28,400" icon="🔍" color="#1A3A6B" delay={0.10} subtitle="7.5%" />
            <StatCard title="Free Specs" value="48,200" icon="👓" color="#D4A017" delay={0.15} />
            <StatCard title="Avg Screening Age" value="11.2y" icon="👦" color="#6A1B9A" delay={0.20} />
          </div>

          <SectionHeader title="School Type Coverage" />
          <div className="card mt-12 mb-24">
            <div className="card-body">
              {[
                { type: 'Government Schools', total: 8200, done: 7400 },
                { type: 'Govt. Aided Schools', total: 2800, done: 2200 },
                { type: 'Residential Schools (SC/ST)', total: 840, done: 840 },
                { type: 'Model Schools', total: 640, done: 520 },
              ].map((s, i) => {
                const pct = Math.round((s.done / s.total) * 100);
                return (
                  <div key={s.type} className={`animate-fade-up d${i + 1}`} style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 700 }}>{s.type}</span>
                      <span style={{ fontSize: 12, color: '#9E9E9E' }}>{s.done.toLocaleString()} / {s.total.toLocaleString()} • <strong style={{ color: pct >= 90 ? '#2E7D32' : '#E65100' }}>{pct}%</strong></span>
                    </div>
                    <ProgressBar value={pct} color={pct >= 90 ? '#2E7D32' : '#00897B'} />
                  </div>
                );
              })}
            </div>
          </div>

          <SectionHeader title="Common Conditions Found in Students" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginTop: 12 }}>
            {[
              { icon: '🔍', label: 'Myopia', value: '28,400', pct: '7.5%', color: '#1A3A6B' },
              { icon: '👁️', label: 'Hyperopia', value: '12,200', pct: '3.2%', color: '#2952A3' },
              { icon: '∞', label: 'Astigmatism', value: '18,600', pct: '4.9%', color: '#00897B' },
              { icon: '🏃', label: 'Lazy Eye', value: '4,200', pct: '1.1%', color: '#E65100' },
              { icon: '🎨', label: 'Color Blindness', value: '8,800', pct: '2.3%', color: '#D4A017' },
              { icon: '✅', label: 'Normal Vision', value: '308K', pct: '81%', color: '#2E7D32' },
            ].map((c, i) => (
              <div key={c.label} className={`card animate-fade-up d${i + 1}`}>
                <div className="card-body">
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{c.icon}</div>
                  <div style={{ fontSize: 12, color: '#9E9E9E' }}>{c.label}</div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: c.color }}>{c.value}</div>
                  <div style={{ fontSize: 11, color: '#9E9E9E' }}>{c.pct} of screened</div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
