'use client';
import { useState } from 'react';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { StatusBadge } from '@/app/components/ui';
import Modal, { DetailRow, downloadFile, SuccessBanner } from '@/app/components/Modal';

const events = [
  { date: '02 Jun 2025', type: 'Screening', title: 'Vision Screening at Vijayawada Urban Camp', doctor: 'Dr. Srinivasa Rao', summary: 'VA: OD 6/18, OS 6/24. Presbyopia diagnosed. Prescription issued.', color: '#1A3A6B', icon: '🔬', details: 'Visual Acuity: OD 6/18, OS 6/24\nRefraction: OD +1.25/-0.50×90, OS +1.00/-0.25×80\nPupil: PERRL\nOcular Pressure: OD 14 mmHg, OS 15 mmHg\nDiagnosis: Presbyopia\nPrescription: Bifocal glasses issued' },
  { date: '01 Jun 2025', type: 'Prescription', title: 'Prescription Generated', doctor: 'Dr. Srinivasa Rao', summary: 'OD: +1.25/-0.50×90, OS: +1.00/-0.25×80. Bifocal glasses ordered.', color: '#00897B', icon: '💊', details: 'Prescription ID: RX-001\nRight Eye: Sphere +1.25, Cyl -0.50, Axis 90°\nLeft Eye: Sphere +1.00, Cyl -0.25, Axis 80°\nAddition: +2.00 (both eyes)\nLens Type: Bifocal\nFrame: Government standard\nOrder placed with Vision Plus Ltd' },
  { date: '28 May 2025', type: 'Teleconsultation', title: 'Tele-consultation – Diabetic Retinopathy', doctor: 'Dr. Anita Rao', summary: 'Fundus examination reviewed. Mild NPDR detected. Follow-up in 3 months.', color: '#D4A017', icon: '📹', details: 'Teleconsultation ID: TC-445\nDoctor: Dr. Anita Rao (SVIMS, Tirupati)\nDuration: 18 minutes\nFindings: Mild non-proliferative diabetic retinopathy (NPDR) bilateral.\nNo macular edema detected.\nOptic disc normal.\nRecommendation: HbA1c control, repeat fundus in 3 months.\nFFA if progression noted.' },
  { date: '20 May 2025', type: 'Referral', title: 'Referral to SVIMS Tirupati', doctor: 'Dr. Srinivasa Rao', summary: 'Referred for detailed cataract evaluation and surgical consultation.', color: '#C62828', icon: '🏥', details: 'Referral ID: REF-001\nReferring Doctor: Dr. Srinivasa Rao\nHospital: SVIMS, Tirupati\nDepartment: Ophthalmology\nReason: Cataract evaluation and surgical consultation\nPriority: High\nLetter sent to hospital. Patient notified via SMS.' },
  { date: '10 Jan 2025', type: 'Screening', title: 'Initial Screening – Registration', doctor: 'Dr. Priya Devi', summary: 'First visit. Myopia detected. Glasses prescribed. APV ID issued.', color: '#1A3A6B', icon: '🔬', details: 'APV ID Issued: APV-001234\nVisual Acuity: OD 6/36, OS 6/24\nDiagnosis: Myopia (bilateral)\nPrescription: OD -2.00/-0.50×175, OS -1.75/-0.25×170\nRegistration: BPL category\nCamp: Vijayawada Registration Camp' },
];

const EMR_TEXT = `AP VISION CARE – ELECTRONIC MEDICAL RECORD
Patient: Ramaiah Venkata | ID: APV-001234 | DOB: 15-Mar-1967
Address: Patamata, Krishna District, Andhra Pradesh
Category: BPL | Known Conditions: Diabetes Mellitus

MEDICAL HISTORY:
---
Date: 10 Jan 2025 | Type: Initial Screening
Diagnosis: Myopia (bilateral) | Doctor: Dr. Priya Devi
Prescription: OD -2.00/-0.50×175, OS -1.75/-0.25×170

Date: 28 May 2025 | Type: Teleconsultation
Diagnosis: Mild NPDR | Doctor: Dr. Anita Rao
Recommendation: Follow-up in 3 months

Date: 02 Jun 2025 | Type: Screening
Diagnosis: Presbyopia | Doctor: Dr. Srinivasa Rao
Prescription: Bifocal glasses issued
---
Generated: ${new Date().toLocaleString()}
AP Vision Care Digital Platform`;

type Event = typeof events[0];

export default function EmrTimeline() {
  const [viewEvent, setViewEvent] = useState<Event | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [addType, setAddType] = useState('Screening');
  const [addTitle, setAddTitle] = useState('');
  const [addSummary, setAddSummary] = useState('');
  const [addDoctor, setAddDoctor] = useState('');
  const [added, setAdded] = useState(false);
  const [allEvents, setAllEvents] = useState(events);

  const handleAdd = () => {
    if (!addTitle.trim()) return;
    const colorMap: Record<string, string> = { Screening: '#1A3A6B', Prescription: '#00897B', Teleconsultation: '#D4A017', Referral: '#C62828' };
    const iconMap: Record<string, string> = { Screening: '🔬', Prescription: '💊', Teleconsultation: '📹', Referral: '🏥' };
    const n: Event = { date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }), type: addType, title: addTitle, doctor: addDoctor || 'Dr. Attending', summary: addSummary || 'Entry added via admin portal.', color: colorMap[addType] ?? '#1A3A6B', icon: iconMap[addType] ?? '📋', details: `Type: ${addType}\nTitle: ${addTitle}\nDoctor: ${addDoctor}\nSummary: ${addSummary}\nAdded: ${new Date().toLocaleString()}` };
    setAllEvents(prev => [n, ...prev]);
    setAdded(true);
    setTimeout(() => { setAdded(false); setShowAdd(false); setAddTitle(''); setAddSummary(''); setAddDoctor(''); }, 1500);
  };

  return (
    <div className="app-layout">
      <Sidebar role="admin" userName="Venkat Rao" userSub="Super Admin" />
      <div className="main-content">
        <Topbar title="EMR Timeline" subtitle="Ramaiah Venkata • APV-001234" />
        <main className="page-body">
          <div className="card mb-16">
            <div className="card-body">
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 50, height: 50, borderRadius: '50%', background: '#1A3A6B', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 900 }}>R</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 900 }}>Ramaiah Venkata</div>
                  <div style={{ fontSize: 12, color: '#9E9E9E' }}>58 years • Male • APV-001234 • Patamata, Krishna</div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                    <StatusBadge label="Active" />
                    <span className="badge badge-info">BPL</span>
                    <span className="badge badge-warning">Diabetic</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-outline btn-sm" onClick={() => downloadFile('EMR_Ramaiah_Venkata_APV001234.txt', EMR_TEXT)}>📄 Download EMR</button>
                  <button className="btn btn-primary btn-sm" onClick={() => setShowAdd(true)}>+ Add Entry</button>
                </div>
              </div>
            </div>
          </div>

          <div className="order-timeline" style={{ paddingLeft: 28 }}>
            {allEvents.map((e, i) => (
              <div key={i} className={`order-timeline-item animate-fade-up d${i + 1}`} style={{ paddingBottom: 18, paddingLeft: 20 }}>
                <div className="order-timeline-dot active" style={{ background: e.color, boxShadow: `0 0 0 3px ${e.color}30`, width: 16, height: 16, left: -29 }} />
                <div className="card">
                  <div className="card-body">
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                          <span style={{ fontSize: 16 }}>{e.icon}</span>
                          <span className="badge" style={{ background: e.color + '15', color: e.color }}>{e.type}</span>
                          <span style={{ fontSize: 11, color: '#9E9E9E' }}>{e.date}</span>
                        </div>
                        <div style={{ fontSize: 14, fontWeight: 800 }}>{e.title}</div>
                        <div style={{ fontSize: 12, color: '#757575', marginTop: 2 }}>👨‍⚕️ {e.doctor}</div>
                      </div>
                    </div>
                    <div style={{ background: '#F8F9FA', borderRadius: 8, padding: '10px 14px', fontSize: 12, color: '#424242' }}>{e.summary}</div>
                    <button className="btn btn-ghost btn-sm" style={{ marginTop: 8, fontSize: 11 }} onClick={() => setViewEvent(e)}>View Details →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* View Detail Modal */}
      <Modal open={!!viewEvent} onClose={() => setViewEvent(null)} title={viewEvent?.title ?? ''} subtitle={`${viewEvent?.type} • ${viewEvent?.date}`}
        actions={<button className="btn btn-primary btn-sm" onClick={() => setViewEvent(null)}>Close</button>}>
        {viewEvent && (
          <div>
            <DetailRow label="Type" value={viewEvent.type} />
            <DetailRow label="Date" value={viewEvent.date} />
            <DetailRow label="Doctor" value={viewEvent.doctor} />
            <div style={{ marginTop: 14, background: '#F8F9FA', borderRadius: 10, padding: 14, fontSize: 12, color: '#424242', whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
              {viewEvent.details}
            </div>
          </div>
        )}
      </Modal>

      {/* Add Entry Modal */}
      <Modal open={showAdd} onClose={() => { setShowAdd(false); setAdded(false); }} title="Add EMR Entry"
        actions={!added ? <><button className="btn btn-outline btn-sm" onClick={() => setShowAdd(false)}>Cancel</button><button className="btn btn-primary btn-sm" onClick={handleAdd}>+ Add Entry</button></> : undefined}>
        {added ? <SuccessBanner message="EMR entry added successfully!" /> : (
          <div>
            <div className="form-group"><label className="form-label">Entry Type</label>
              <select className="form-input form-select" value={addType} onChange={e => setAddType(e.target.value)}>
                {['Screening', 'Prescription', 'Teleconsultation', 'Referral'].map(t => <option key={t}>{t}</option>)}
              </select></div>
            <div className="form-group"><label className="form-label">Title</label><input className="form-input" placeholder="e.g. Follow-up Screening" value={addTitle} onChange={e => setAddTitle(e.target.value)} /></div>
            <div className="form-group"><label className="form-label">Doctor</label><input className="form-input" placeholder="Doctor name" value={addDoctor} onChange={e => setAddDoctor(e.target.value)} /></div>
            <div className="form-group"><label className="form-label">Summary / Notes</label><textarea className="form-input" style={{ height: 80, resize: 'none' }} placeholder="Clinical findings and notes..." value={addSummary} onChange={e => setAddSummary(e.target.value)} /></div>
          </div>
        )}
      </Modal>
    </div>
  );
}
