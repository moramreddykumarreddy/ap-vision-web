'use client';
import { useState } from 'react';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { SectionHeader } from '@/app/components/ui';
import Modal, { downloadFile, SuccessBanner } from '@/app/components/Modal';

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

const CSV_DATA = `Report,AP Vision Care – Monthly Screening Report – May 2025
Generated,01 Jun 2025
District,All Districts

District,Registered,Screened,Prescriptions,Referrals,Coverage%
Visakhapatnam,6800,6240,2184,312,91.8%
Krishna,5400,4752,1663,237,88.0%
Guntur,5100,4335,1517,216,85.0%
Kurnool,4600,3772,1320,188,82.0%
East Godavari,4200,3318,1161,165,79.0%
West Godavari,3900,2964,1037,148,76.0%
Nellore,3600,2628,920,131,73.0%

Total,33600,27009,9802,1397,80.4%`;

export default function ReportsScreen() {
  const [generating, setGenerating] = useState<string | null>(null);
  const [generated, setGenerated] = useState<string | null>(null);
  const [shareReport, setShareReport] = useState<typeof reports[0] | null>(null);
  const [shareCopied, setShareCopied] = useState(false);
  const [fromDate, setFromDate] = useState('2025-05-01');
  const [toDate, setToDate] = useState('2025-05-31');
  const [district, setDistrict] = useState('All Districts');

  const handleGenerate = (label?: string) => {
    const key = label ?? `${district} Report (${fromDate} to ${toDate})`;
    setGenerating(key);
    setTimeout(() => { setGenerating(null); setGenerated(key); }, 1800);
  };

  const handleDownload = (r: typeof reports[0]) => {
    downloadFile(`${r.id}_${r.title.replace(/\s+/g, '_')}.csv`, CSV_DATA, 'text/csv');
  };

  const handleShare = (r: typeof reports[0]) => {
    setShareReport(r);
    setShareCopied(false);
  };

  return (
    <div className="app-layout">
      <Sidebar role="admin" userName="Venkat Rao" userSub="Super Admin" />
      <div className="main-content">
        <Topbar title="Reports" subtitle="Download and generate reports" />
        <main className="page-body">
          <SectionHeader title="Generate Report" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginTop: 10, marginBottom: 20 }}>
            {reportTypes.map((r, i) => (
              <div key={r.label} className={`card animate-fade-up d${i + 1}`} style={{ cursor: 'pointer', transition: 'all .2s' }}
                onMouseOver={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseOut={e => (e.currentTarget.style.transform = '')}
                onClick={() => handleGenerate(r.label)}>
                <div className="card-body" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: '#1A3A6B10', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{r.icon}</div>
                  <div><div style={{ fontSize: 13, fontWeight: 700 }}>{r.label}</div><div style={{ fontSize: 11, color: '#9E9E9E' }}>{r.desc}</div></div>
                </div>
              </div>
            ))}
          </div>

          <div className="card mb-20">
            <div className="card-body">
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Custom Report Generator</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, alignItems: 'end' }}>
                <div className="form-group" style={{ margin: 0 }}><label className="form-label">From Date</label><input type="date" className="form-input" value={fromDate} onChange={e => setFromDate(e.target.value)} /></div>
                <div className="form-group" style={{ margin: 0 }}><label className="form-label">To Date</label><input type="date" className="form-input" value={toDate} onChange={e => setToDate(e.target.value)} /></div>
                <div className="form-group" style={{ margin: 0 }}><label className="form-label">District</label>
                  <select className="form-input form-select" value={district} onChange={e => setDistrict(e.target.value)}>
                    {['All Districts', 'Krishna', 'Guntur', 'Kurnool', 'Visakhapatnam', 'Nellore'].map(d => <option key={d}>{d}</option>)}
                  </select></div>
                <button className="btn btn-primary" onClick={() => handleGenerate()}>📊 Generate</button>
              </div>
            </div>
          </div>

          <SectionHeader title="Recent Reports" />
          <div className="card mt-10">
            <div className="card-body" style={{ padding: 0 }}>
              {reports.map((r, i) => (
                <div key={r.id} className={`list-item animate-fade-up d${i + 1}`} style={{ padding: '12px 16px' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: '#1A3A6B10', color: '#1A3A6B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>📄</div>
                  <div style={{ flex: 1, marginLeft: 10 }}>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{r.title}</div>
                    <div style={{ fontSize: 11, color: '#9E9E9E' }}>{r.district} • {r.date} • {r.size}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn btn-sm btn-outline" onClick={() => handleDownload(r)}>📥 Download</button>
                    <button className="btn btn-sm btn-outline" onClick={() => handleShare(r)}>🔗 Share</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Generating Modal */}
      <Modal open={!!generating || !!generated} onClose={() => { setGenerating(null); setGenerated(null); }} title="Report Generator"
        actions={generated ? <><button className="btn btn-outline btn-sm" onClick={() => downloadFile('generated_report.csv', CSV_DATA, 'text/csv')}>📥 Download CSV</button><button className="btn btn-primary btn-sm" onClick={() => setGenerated(null)}>Done</button></> : undefined}>
        {generating ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ fontSize: 36, marginBottom: 12, animation: 'pulse 1s infinite' }}>⏳</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#1A3A6B' }}>Generating: {generating}</div>
            <div style={{ fontSize: 12, color: '#9E9E9E', marginTop: 6 }}>Processing data from all districts...</div>
          </div>
        ) : generated ? (
          <div>
            <SuccessBanner message={`Report generated: ${generated}`} />
            <div style={{ marginTop: 16, background: '#F8F9FA', borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10, color: '#0D2347' }}>Report Preview</div>
              <pre style={{ fontSize: 11, color: '#424242', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{CSV_DATA.slice(0, 400)}...</pre>
            </div>
          </div>
        ) : null}
      </Modal>

      {/* Share Modal */}
      <Modal open={!!shareReport} onClose={() => { setShareReport(null); setShareCopied(false); }} title="Share Report" subtitle={shareReport?.title}
        actions={<button className="btn btn-primary btn-sm" onClick={() => setShareReport(null)}>Done</button>}>
        {shareReport && (
          <div>
            <div style={{ background: '#F5F7FF', borderRadius: 10, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <code style={{ flex: 1, fontSize: 11, color: '#1A3A6B', wordBreak: 'break-all' }}>https://apvision.gov.in/reports/{shareReport.id}</code>
              <button className="btn btn-sm btn-primary" onClick={() => setShareCopied(true)}>{shareCopied ? '✅ Copied' : '📋 Copy'}</button>
            </div>
            {shareCopied && <SuccessBanner message="Link copied to clipboard!" />}
            <div style={{ marginTop: 14, display: 'flex', gap: 10 }}>
              {['📧 Email', '📱 WhatsApp', '📨 SMS'].map(m => <button key={m} className="btn btn-outline btn-sm" style={{ flex: 1 }}>{m}</button>)}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
