'use client';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { StatCard, SectionHeader, ProgressBar } from '@/app/components/ui';

const districtData = [
  { name: 'Visakhapatnam', target: 65000, achieved: 52400, pct: 80, referrals: 1840 },
  { name: 'Krishna', target: 55000, achieved: 48200, pct: 87, referrals: 1620 },
  { name: 'Guntur', target: 52000, achieved: 45600, pct: 87, referrals: 1580 },
  { name: 'Kurnool', target: 50000, achieved: 41200, pct: 82, referrals: 1240 },
  { name: 'East Godavari', target: 48000, achieved: 38900, pct: 81, referrals: 1100 },
  { name: 'West Godavari', target: 45000, achieved: 36700, pct: 81, referrals: 980 },
  { name: 'Nellore', target: 42000, achieved: 33400, pct: 79, referrals: 890 },
  { name: 'Chittoor', target: 40000, achieved: 30200, pct: 75, referrals: 820 },
  { name: 'Kadapa', target: 38000, achieved: 28000, pct: 73, referrals: 740 },
  { name: 'Prakasam', target: 36000, achieved: 26100, pct: 72, referrals: 680 },
  { name: 'Vizianagaram', target: 34000, achieved: 23800, pct: 70, referrals: 600 },
  { name: 'Srikakulam', target: 32000, achieved: 21400, pct: 66, referrals: 520 },
  { name: 'Anantapur', target: 30000, achieved: 19200, pct: 64, referrals: 480 },
];

const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const screenedData = [12000, 18000, 22000, 28000, 35000, 42000, 50000, 60000, 72000, 88000, 100000, 114000];
const maxVal = Math.max(...screenedData);

export default function StateAnalytics() {
  return (
    <div className="app-layout">
      <Sidebar role="admin" userName="Venkat Rao" userSub="Super Admin" />
      <div className="main-content">
        <Topbar title="State Analytics" subtitle="Andhra Pradesh • Programme Year 2024–25" />
        <main className="page-body">
          <div className="stats-grid stats-grid-4 mb-24">
            <StatCard title="Total Patients" value="1.24M" icon="👥" color="#1A3A6B" delay={0.05} />
            <StatCard title="Screened" value="1.14M" icon="👁️" color="#00897B" delay={0.10} subtitle="91.9%" />
            <StatCard title="Prescriptions" value="186K" icon="💊" color="#D4A017" delay={0.15} />
            <StatCard title="Delivered" value="142K" icon="✅" color="#2E7D32" delay={0.20} subtitle="76%" />
          </div>

          {/* Trend Chart */}
          <div className="card mb-24">
            <div className="card-header"><h3>Monthly Screening Trend (2024–25)</h3></div>
            <div className="card-body">
              <div className="chart-bar-wrap">
                {months.map((m, i) => (
                  <div key={m} className="chart-bar-col">
                    <div className="chart-bar" style={{ height: `${(screenedData[i] / maxVal) * 100}%`, background: i === months.length - 1 ? '#1A3A6B' : '#1A3A6B80' }} />
                    <span className="chart-bar-label">{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* District Table */}
          <SectionHeader title="District-wise Performance" />
          <div className="card mt-12">
            <div className="card-body" style={{ padding: 0 }}>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>District</th>
                      <th>Target</th>
                      <th>Achieved</th>
                      <th>Coverage</th>
                      <th>Referrals</th>
                    </tr>
                  </thead>
                  <tbody>
                    {districtData.map((d, i) => (
                      <tr key={d.name}>
                        <td>{i + 1}</td>
                        <td style={{ fontWeight: 700 }}>{d.name}</td>
                        <td>{d.target.toLocaleString()}</td>
                        <td>{d.achieved.toLocaleString()}</td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ flex: 1, maxWidth: 80 }}>
                              <ProgressBar value={d.pct} color={d.pct >= 85 ? '#2E7D32' : d.pct >= 75 ? '#D4A017' : '#E65100'} />
                            </div>
                            <span style={{ fontWeight: 700, color: d.pct >= 85 ? '#2E7D32' : d.pct >= 75 ? '#D4A017' : '#E65100', fontSize: 12 }}>{d.pct}%</span>
                          </div>
                        </td>
                        <td>{d.referrals.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
