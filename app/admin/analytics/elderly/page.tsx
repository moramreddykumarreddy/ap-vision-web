'use client';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { StatCard, SectionHeader } from '@/app/components/ui';

export default function ElderlyCare() {
  return (
    <div className="app-layout">
      <Sidebar role="admin" userName="Venkat Rao" userSub="Super Admin" />
      <div className="main-content">
        <Topbar title="Elderly Care Dashboard" subtitle="Vision care for population 60+ years" />
        <main className="page-body">
          <div style={{ background: 'linear-gradient(135deg, #4A148C, #7B1FA2)', borderRadius: 20, padding: 24, color: 'white', marginBottom: 24 }}>
            <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>👴 Elderly Vision Care Program</div>
            <div style={{ fontSize: 12, opacity: 0.75 }}>Population above 60 years • Prioritised screening</div>
          </div>

          <div className="stats-grid stats-grid-4 mb-24">
            <StatCard title="Elderly Registered" value="284,000" icon="👴" color="#4A148C" delay={0.05} />
            <StatCard title="Cataract Cases" value="42,800" icon="👁️" color="#1A3A6B" delay={0.10} subtitle="15.1%" />
            <StatCard title="Surgeries Facilitated" value="8,420" icon="🏥" color="#2E7D32" delay={0.15} />
            <StatCard title="Glaucoma Cases" value="12,400" icon="⚠️" color="#E65100" delay={0.20} />
          </div>

          <SectionHeader title="Priority Conditions in 60+ Age Group" />
          <div className="card mt-12 mb-24">
            <div className="card-body">
              {[
                { c: 'Cataract', n: 42800, pct: 15.1, severity: 'High' },
                { c: 'Presbyopia', n: 180000, pct: 63.4, severity: 'Low' },
                { c: 'Glaucoma', n: 12400, pct: 4.4, severity: 'High' },
                { c: 'AMD (Age-Related Macular)', n: 8200, pct: 2.9, severity: 'High' },
                { c: 'Diabetic Retinopathy', n: 18400, pct: 6.5, severity: 'High' },
              ].map((row, i) => (
                <div key={row.c} className={`animate-fade-up d${i + 1}`} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 0', borderBottom: '1px solid #F5F5F5' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{row.c}</div>
                    <div style={{ fontSize: 11, color: '#9E9E9E' }}>{row.n.toLocaleString()} patients</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ background: '#F5F5F5', borderRadius: 99, height: 6 }}>
                      <div style={{ background: row.severity === 'High' ? '#C62828' : '#00897B', borderRadius: 99, height: '100%', width: `${Math.min(row.pct, 100)}%` }} />
                    </div>
                  </div>
                  <div style={{ minWidth: 50, textAlign: 'right', fontWeight: 700, fontSize: 13 }}>{row.pct}%</div>
                  <span className="badge" style={{ background: row.severity === 'High' ? '#C6282815' : '#00897B15', color: row.severity === 'High' ? '#C62828' : '#00897B' }}>{row.severity}</span>
                </div>
              ))}
            </div>
          </div>

          <SectionHeader title="Cataract Surgery Pipeline" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginTop: 12 }}>
            {[
              { icon: '📋', label: 'Awaiting Assessment', value: '8,200', color: '#E65100' },
              { icon: '✅', label: 'Surgery Cleared', value: '5,400', color: '#1A3A6B' },
              { icon: '🏥', label: 'Surgeries Done', value: '8,420', color: '#2E7D32' },
            ].map(s => (
              <div key={s.label} className="card">
                <div className="card-body" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                  <div style={{ fontSize: 12, color: '#9E9E9E' }}>{s.label}</div>
                  <div style={{ fontSize: 24, fontWeight: 900, color: s.color }}>{s.value}</div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
