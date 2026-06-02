'use client';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { SectionHeader } from '@/app/components/ui';

const recommendations = [
  { id: 1, priority: 'Critical', title: 'Expand Cataract Surgery Camps', district: 'Vizianagaram, Srikakulam', impact: 'High', status: 'Action Required', color: '#C62828' },
  { id: 2, priority: 'High', title: 'Increase Screening Frequency – Rural Areas', district: 'Kurnool, Anantapur', impact: 'High', status: 'In Progress', color: '#E65100' },
  { id: 3, priority: 'High', title: 'Vitamin A Supplementation Drive', district: 'Tribal Districts', impact: 'Medium', status: 'Planned', color: '#D4A017' },
  { id: 4, priority: 'Medium', title: 'Train Additional Optometrists', district: 'State-wide', impact: 'Medium', status: 'In Progress', color: '#1A3A6B' },
  { id: 5, priority: 'Low', title: 'Digital EMR Integration Upgrade', district: 'State-wide', impact: 'Low', status: 'Planned', color: '#00897B' },
];

export default function DecisionSupportDashboard() {
  return (
    <div className="app-layout">
      <Sidebar role="admin" userName="Venkat Rao" userSub="Super Admin" />
      <div className="main-content">
        <Topbar title="Decision Support" subtitle="Evidence-based policy recommendations" />
        <main className="page-body">
          <div style={{ background: 'linear-gradient(135deg, #D4A017, #F57F17)', borderRadius: 20, padding: 24, color: 'white', marginBottom: 24 }}>
            <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>⚖️ Clinical Decision Support Engine</div>
            <div style={{ fontSize: 12, opacity: 0.85 }}>AI-powered policy and intervention recommendations for AP Vision Program</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
            {[
              { label: 'Critical Actions', v: '2', color: '#C62828' },
              { label: 'High Priority', v: '3', color: '#E65100' },
              { label: 'In Progress', v: '5', color: '#1A3A6B' },
              { label: 'Completed', v: '18', color: '#2E7D32' },
            ].map(s => (
              <div key={s.label} className="card animate-fade-up">
                <div className="card-body" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: s.color }}>{s.v}</div>
                  <div style={{ fontSize: 12, color: '#9E9E9E' }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          <SectionHeader title="Recommendations" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 12 }}>
            {recommendations.map((r, i) => (
              <div key={r.id} className={`card animate-fade-up d${i + 1}`}>
                <div className="card-body">
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: r.color + '15', color: r.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                      {r.priority === 'Critical' ? '🚨' : r.priority === 'High' ? '⚠️' : r.priority === 'Medium' ? '📊' : '📋'}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 15, fontWeight: 800 }}>{r.title}</span>
                        <span className="badge" style={{ background: r.color + '15', color: r.color }}>{r.priority}</span>
                      </div>
                      <div style={{ fontSize: 12, color: '#9E9E9E', marginBottom: 8 }}>📍 {r.district}</div>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <span style={{ fontSize: 11, color: '#757575' }}>Impact: {r.impact}</span>
                        <span style={{ fontSize: 11, color: '#757575' }}>•</span>
                        <span style={{ fontSize: 11, fontWeight: 600, color: r.status === 'Action Required' ? '#C62828' : r.status === 'In Progress' ? '#1A3A6B' : '#9E9E9E' }}>{r.status}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <button className="btn btn-sm btn-primary">View Details</button>
                      <button className="btn btn-sm btn-outline">Assign</button>
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
