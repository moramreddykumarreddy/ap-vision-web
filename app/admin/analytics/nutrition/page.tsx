'use client';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { StatCard, SectionHeader } from '@/app/components/ui';

export default function NutritionAnalytics() {
  return (
    <div className="app-layout">
      <Sidebar role="admin" userName="Venkat Rao" userSub="Super Admin" />
      <div className="main-content">
        <Topbar title="Nutrition Risk Analytics" subtitle="Nutritional deficiency & vision correlation" />
        <main className="page-body">
          <div style={{ background: 'linear-gradient(135deg, #E65100, #FF9800)', borderRadius: 20, padding: 24, color: 'white', marginBottom: 24 }}>
            <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>🥗 Nutrition & Vision Correlation Engine</div>
            <div style={{ fontSize: 12, opacity: 0.75 }}>Analysing nutritional risk factors across AP districts</div>
          </div>

          <div className="stats-grid stats-grid-4 mb-24">
            <StatCard title="Vitamin A Deficiency" value="24.8%" icon="🥕" color="#E65100" delay={0.05} subtitle="High risk zones: 5" />
            <StatCard title="Anemia Cases" value="38.4%" icon="🩸" color="#C62828" delay={0.10} />
            <StatCard title="Malnutrition Risk" value="18.2%" icon="⚠️" color="#D4A017" delay={0.15} />
            <StatCard title="Night Blindness" value="4,820" icon="🌙" color="#6A1B9A" delay={0.20} />
          </div>

          <SectionHeader title="District Nutrition Risk Map" />
          <div className="card mt-12">
            <div className="card-body">
              {[
                { d: 'Vizianagaram', vitA: 38, anemia: 52, malnutrition: 28 },
                { d: 'Srikakulam', vitA: 35, anemia: 48, malnutrition: 24 },
                { d: 'Kurnool', vitA: 30, anemia: 42, malnutrition: 20 },
                { d: 'Anantapur', vitA: 28, anemia: 39, malnutrition: 18 },
                { d: 'Krishna', vitA: 18, anemia: 29, malnutrition: 12 },
              ].map((row, i) => (
                <div key={row.d} className={`animate-fade-up d${i + 1}`} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 1fr 1fr', gap: 16, alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #F5F5F5' }}>
                  <span style={{ fontSize: 13, fontWeight: 700 }}>{row.d}</span>
                  <div>
                    <div style={{ fontSize: 10, color: '#9E9E9E' }}>Vit A Def.</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
                      <div style={{ flex: 1, background: '#F5F5F5', borderRadius: 99, height: 6 }}>
                        <div style={{ background: '#E65100', borderRadius: 99, height: '100%', width: `${row.vitA}%` }} />
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700 }}>{row.vitA}%</span>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: '#9E9E9E' }}>Anemia</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
                      <div style={{ flex: 1, background: '#F5F5F5', borderRadius: 99, height: 6 }}>
                        <div style={{ background: '#C62828', borderRadius: 99, height: '100%', width: `${row.anemia}%` }} />
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700 }}>{row.anemia}%</span>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: '#9E9E9E' }}>Malnutrition</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
                      <div style={{ flex: 1, background: '#F5F5F5', borderRadius: 99, height: 6 }}>
                        <div style={{ background: '#D4A017', borderRadius: 99, height: '100%', width: `${row.malnutrition}%` }} />
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700 }}>{row.malnutrition}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <SectionHeader title="Recommended Interventions" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginTop: 12 }}>
            {[
              { icon: '💊', title: 'Vitamin A Supplementation', desc: 'Priority camps in 3 districts', color: '#E65100' },
              { icon: '🍱', title: 'Mid-Day Meal Fortification', desc: 'Schools in high-risk zones', color: '#00897B' },
              { icon: '🩺', title: 'Anaemia Screening', desc: 'Integrate with camp screening', color: '#C62828' },
              { icon: '📢', title: 'Nutrition Awareness', desc: 'Community education programs', color: '#D4A017' },
            ].map(a => (
              <div key={a.title} className="card">
                <div className="card-body">
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{a.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: a.color }}>{a.title}</div>
                  <div style={{ fontSize: 12, color: '#9E9E9E', marginTop: 4 }}>{a.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
