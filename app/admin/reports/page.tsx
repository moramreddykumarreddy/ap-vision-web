'use client';
import { useState } from 'react';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { AppShell } from '@/app/components/app-shell';
import { SectionHeader, Card, CardBody, Button, Input, Select, FormGroup, ListItem, fadeDelay } from '@/app/components/ui';
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
    <AppShell
      sidebar={<Sidebar role="admin" userName="Venkat Rao" userSub="Super Admin" />}
      topbar={<Topbar title="Reports" subtitle="Download and generate reports" />}
    >
      <SectionHeader title="Generate Report" />
      <div className="mt-2.5 mb-3 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {reportTypes.map((r, i) => (
          <Card key={r.label} className={`animate-fade-up cursor-pointer transition-all duration-200 hover:-translate-y-0.5 ${fadeDelay(i + 1)}`} onClick={() => handleGenerate(r.label)}>
            <CardBody className="flex items-center gap-3.5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-primary/10 text-xl">{r.icon}</div>
              <div><div className="text-[13px] font-bold">{r.label}</div><div className="text-[11px] text-grey-400">{r.desc}</div></div>
            </CardBody>
          </Card>
        ))}
      </div>

      <Card className="mb-3">
        <CardBody>
          <div className="mb-2.5 text-[13px] font-bold">Custom Report Generator</div>
          <div className="grid grid-cols-1 items-end gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <FormGroup label="From Date" className="mb-0"><Input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} /></FormGroup>
            <FormGroup label="To Date" className="mb-0"><Input type="date" value={toDate} onChange={e => setToDate(e.target.value)} /></FormGroup>
            <FormGroup label="District" className="mb-0">
              <Select value={district} onChange={e => setDistrict(e.target.value)}>
                {['All Districts', 'Krishna', 'Guntur', 'Kurnool', 'Visakhapatnam', 'Nellore'].map(d => <option key={d}>{d}</option>)}
              </Select>
            </FormGroup>
            <Button variant="primary" onClick={() => handleGenerate()}>📊 Generate</Button>
          </div>
        </CardBody>
      </Card>

      <SectionHeader title="Recent Reports" />
      <Card className="mt-2.5">
        <CardBody className="p-0">
          {reports.map((r, i) => (
            <ListItem
              key={r.id}
              avatar="📄"
              avatarBg="#1A3A6B10"
              avatarColor="#1A3A6B"
              title={r.title}
              subtitle={`${r.district} • ${r.date} • ${r.size}`}
              delay={i * 0.05}
              className="px-4 py-3"
              trailing={
                <div className="flex gap-1.5">
                  <Button size="sm" variant="outline" onClick={() => handleDownload(r)}>📥 Download</Button>
                  <Button size="sm" variant="outline" onClick={() => handleShare(r)}>🔗 Share</Button>
                </div>
              }
            />
          ))}
        </CardBody>
      </Card>

      <Modal open={!!generating || !!generated} onClose={() => { setGenerating(null); setGenerated(null); }} title="Report Generator"
        actions={generated ? <><Button variant="outline" size="sm" onClick={() => downloadFile('generated_report.csv', CSV_DATA, 'text/csv')}>📥 Download CSV</Button><Button variant="primary" size="sm" onClick={() => setGenerated(null)}>Done</Button></> : undefined}>
        {generating ? (
          <div className="py-6 text-center">
            <div className="mb-3 animate-pulse text-4xl">⏳</div>
            <div className="text-sm font-bold text-primary">Generating: {generating}</div>
            <div className="mt-1.5 text-xs text-grey-400">Processing data from all districts...</div>
          </div>
        ) : generated ? (
          <div>
            <SuccessBanner message={`Report generated: ${generated}`} />
            <div className="mt-4 rounded-[10px] bg-grey-50 p-3.5">
              <div className="mb-2.5 text-xs font-bold text-primary">Report Preview</div>
              <pre className="whitespace-pre-wrap text-[11px] leading-relaxed text-grey-800">{CSV_DATA.slice(0, 400)}...</pre>
            </div>
          </div>
        ) : null}
      </Modal>

      <Modal open={!!shareReport} onClose={() => { setShareReport(null); setShareCopied(false); }} title="Share Report" subtitle={shareReport?.title}
        actions={<Button variant="primary" size="sm" onClick={() => setShareReport(null)}>Done</Button>}>
        {shareReport && (
          <div>
            <div className="mb-4 flex items-center gap-2.5 rounded-[10px] bg-[#F5F7FF] px-4 py-3">
              <code className="flex-1 break-all text-[11px] text-primary">https://apvision.gov.in/reports/{shareReport.id}</code>
              <Button size="sm" variant="primary" onClick={() => setShareCopied(true)}>{shareCopied ? '✅ Copied' : '📋 Copy'}</Button>
            </div>
            {shareCopied && <SuccessBanner message="Link copied to clipboard!" />}
            <div className="mt-3.5 flex gap-2.5">
              {['📧 Email', '📱 WhatsApp', '📨 SMS'].map(m => <Button key={m} variant="outline" size="sm" className="flex-1">{m}</Button>)}
            </div>
          </div>
        )}
      </Modal>
    </AppShell>
  );
}
