'use client';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { StatCard, SectionHeader } from '@/app/components/ui';

const riskCategories = [
  { label: 'Diabetic Retinopathy', count: 8420, pct: 12, color: '#C62828', risk: 'High' },
  { label: 'Glaucoma Suspect', count: 5600, pct: 8, color: '#E65100', risk: 'High' },
  { label: 'Macular Degeneration', count: 3200, pct: 4.6, color: '#D4A017', risk: 'Medium' },
  { label: 'Cataract (early)', count: 14200, pct: 20, color: '#1A3A6B', risk: 'Low' },
  { label: 'Refractive Error', count: 38000, pct: 54, color: '#00897B', risk: 'Low' },
  { label: 'Other', count: 1000, pct: 1.4, color: '#9E9E9E', risk: 'Low' },
];

export default function AiAnalyticsDashboard() {
  return (
    <div className="app-layout">
      <Sidebar role="admin" userName="Venkat Rao" userSub="Super Admin" />
      <div className="main-content">
        <Topbar title="AI Risk Analytics" subtitle="Machine learning-powered clinical insights" />
        <main className="page-body">
          <div style={{ background: 'linear-gradient(135deg, #6A1B9A, #9C27B0)', borderRadius: 20, padding: 24, color: 'white', marginBottom: 24 }}>
            <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>🤖 AI Risk Stratification Engine</div>
            <div style={{ fontSize: 12, opacity: 0.75 }}>Analysing 1.14M patient records • Last updated: Today 06:00 AM</div>
            <div style={{ display: 'flex', gap: 32, marginTop: 16 }}>
              {[{ v: '8,420', l: 'High Risk' }, { v: '28,600', l: 'Medium Risk' }, { v: '107K', l: 'Low Risk' }].map(k => (
                <div key={k.l}>
                  <div style={{ fontSize: 22, fontWeight: 900 }}>{k.v}</div>
                  <div style={{ fontSize: 11, opacity: 0.7 }}>{k.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="stats-grid stats-grid-4 mb-24">
            <StatCard title="Model Accuracy" value="94.2%" icon="🎯" color="#6A1B9A" delay={0.05} />
            <StatCard title="Predictions Made" value="1.14M" icon="🤖" color="#1A3A6B" delay={0.10} />
            <StatCard title="High Risk Flagged" value="8,420" icon="⚠️" color="#C62828" delay={0.15} />
            <StatCard title="Early Detections" value="2,840" icon="🔍" color="#00897B" delay={0.20} />
          </div>

          <SectionHeader title="Risk Distribution by Condition" />
          <div className="card mt-12 mb-24">
            <div className="card-body">
              {riskCategories.map((cat, i) => (
                <div key={cat.label} className={`animate-fade-up d${i + 1}`} style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <div>
                      <span style={{ fontSize: 13, fontWeight: 700 }}>{cat.label}</span>
                      <span className="badge" style={{ marginLeft: 8, background: cat.risk === 'High' ? '#C62828' : cat.risk === 'Medium' ? '#E65100' : '#EEEEEE', color: cat.risk === 'Low' ? '#9E9E9E' : 'white', fontSize: 10 }}>{cat.risk} Risk</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontWeight: 700, fontSize: 14, color: cat.color }}>{cat.count.toLocaleString()}</span>
                      <span style={{ fontSize: 11, color: '#9E9E9E', marginLeft: 4 }}>({cat.pct}%)</span>
                    </div>
                  </div>
                  <div style={{ background: '#F5F5F5', borderRadius: 99, height: 8 }}>
                    <div style={{ background: cat.color, borderRadius: 99, height: '100%', width: `${cat.pct}%`, transition: 'width .5s ease' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Predictive factors */}
          <SectionHeader title="Top Risk Factors (State Level)" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginTop: 12 }}>
            {[
              { icon: '🩸', label: 'Diabetes Prevalence', value: '18.4%', trend: '↑ +2.1%' },
              { icon: '👴', label: 'Age >60 Population', value: '22.8%', trend: '↑ +1.5%' },
              { icon: '🌾', label: 'Rural Exposure', value: '68.2%', trend: '→ Stable' },
              { icon: '💧', label: 'Water Quality Risk', value: '34.6%', trend: '↓ -3.2%' },
              { icon: '📚', label: 'Low Health Literacy', value: '41.2%', trend: '↓ -5.4%' },
              { icon: '🏥', label: 'Healthcare Access', value: '61.8%', trend: '↑ +8.1%' },
            ].map((f, i) => (
              <div key={f.label} className={`card animate-fade-up d${i + 1}`}>
                <div className="card-body">
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{f.icon}</div>
                  <div style={{ fontSize: 12, color: '#9E9E9E' }}>{f.label}</div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: '#1A3A6B' }}>{f.value}</div>
                  <div style={{ fontSize: 11, color: f.trend.startsWith('↑') ? '#E65100' : f.trend.startsWith('↓') ? '#2E7D32' : '#9E9E9E' }}>{f.trend}</div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
