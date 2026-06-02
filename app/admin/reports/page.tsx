'use client';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { SectionHeader } from '@/app/components/ui';

const reports = [
  { id: 'RPT-001', title: 'Monthly Screening Report – May 2025', type: 'Monthly', district: 'All Districts', date: '01 Jun 2025', size: '2.4 MB' },
  { id: 'RPT-002', title: 'District Coverage Report – Krishna', type: 'District', district: 'Krishna', date: '28 May 2025', size: '880 KB' },
  { id: 'RPT-003', title: 'Vendor Performance Report – Q1 2025', type: 'Vendor', district: 'All Districts', date: '01 Apr 2025', size: '1.2 MB' },
  { id: 'RPT-004', title: 'Annual Programme Report 2024–25', type: 'Annual', district: 'State-wide', date: '31 Mar 2025', size: '8.6 MB' },
  { id: 'RPT-005', title: 'Teleconsultation Utilization Report', type: 'Specialty', district: 'All Districts', date: '15 May 2025', size: '640 KB' },
];

const reportTypes = [
  { icon: '📊', label: 'State Summary Report', desc: 'Overall KPIs and progress' },
  { icon: '🗺️', label: 'District Report', desc: 'District-wise breakdown' },
  { icon: '⛺', label: 'Camp-wise Report', desc: 'Individual camp performance' },
  { icon: '👓', label: 'Spectacle Delivery', desc: 'Vendor and delivery stats' },
  { icon: '📹', label: 'Tele-consult Report', desc: 'Consultation statistics' },
  { icon: '💊', label: 'Prescription Report', desc: 'All prescriptions summary' },
];

export default function ReportsScreen() {
  return (
    <div className="app-layout">
      <Sidebar role="admin" userName="Venkat Rao" userSub="Super Admin" />
      <div className="main-content">
        <Topbar title="Reports" subtitle="Download and generate reports" />
        <main className="page-body">
          {/* Generate Reports */}
          <SectionHeader title="Generate Report" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginTop: 12, marginBottom: 28 }}>
            {reportTypes.map((r, i) => (
              <div key={r.label} className={`card animate-fade-up d${i + 1}`} style={{ cursor: 'pointer', transition: 'all .2s' }}
                onMouseOver={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseOut={e => (e.currentTarget.style.transform = '')}>
                <div className="card-body" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: '#1A3A6B10', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{r.icon}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{r.label}</div>
                    <div style={{ fontSize: 11, color: '#9E9E9E' }}>{r.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Date range filter */}
          <div className="card mb-24">
            <div className="card-body">
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Custom Report Generator</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, alignItems: 'end' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">From Date</label>
                  <input type="date" className="form-input" defaultValue="2025-05-01" />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">To Date</label>
                  <input type="date" className="form-input" defaultValue="2025-05-31" />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">District</label>
                  <select className="form-input form-select">
                    <option>All Districts</option>
                    <option>Krishna</option>
                    <option>Guntur</option>
                    <option>Kurnool</option>
                  </select>
                </div>
                <button className="btn btn-primary">📊 Generate</button>
              </div>
            </div>
          </div>

          {/* Past Reports */}
          <SectionHeader title="Recent Reports" />
          <div className="card mt-12">
            <div className="card-body" style={{ padding: 0 }}>
              {reports.map((r, i) => (
                <div key={r.id} className={`list-item animate-fade-up d${i + 1}`} style={{ padding: '14px 20px' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: '#1A3A6B10', color: '#1A3A6B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>📄</div>
                  <div style={{ flex: 1, marginLeft: 12 }}>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{r.title}</div>
                    <div style={{ fontSize: 11, color: '#9E9E9E' }}>{r.district} • {r.date} • {r.size}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn btn-sm btn-outline">📥 Download</button>
                    <button className="btn btn-sm btn-outline">🔗 Share</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
