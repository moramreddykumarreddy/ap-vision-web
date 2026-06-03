'use client';
import { useState } from 'react';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { AppShell } from '@/app/components/app-shell';
import { StatusBadge, Card, CardBody, Button, FormGroup, Select, Input, Textarea, fadeDelay } from '@/app/components/ui';
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
    <AppShell
      sidebar={<Sidebar role="admin" userName="Venkat Rao" userSub="Super Admin" />}
      topbar={<Topbar title="EMR Timeline" subtitle="Ramaiah Venkata • APV-001234" />}
    >
      <Card className="mb-2.5">
        <CardBody>
          <div className="flex items-center gap-3.5">
            <div className="flex size-[50px] shrink-0 items-center justify-center rounded-full bg-primary text-xl font-black text-white">R</div>
            <div className="min-w-0 flex-1">
              <div className="text-base font-black">Ramaiah Venkata</div>
              <div className="text-xs text-grey-400">58 years • Male • APV-001234 • Patamata, Krishna</div>
              <div className="mt-1.5 flex flex-wrap gap-2">
                <StatusBadge label="Active" />
                <span className="inline-flex rounded-full bg-info/10 px-2.5 py-0.5 text-[11px] font-semibold text-info">BPL</span>
                <span className="inline-flex rounded-full bg-warning/10 px-2.5 py-0.5 text-[11px] font-semibold text-warning">Diabetic</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => downloadFile('EMR_Ramaiah_Venkata_APV001234.txt', EMR_TEXT)}>📄 Download EMR</Button>
              <Button variant="primary" size="sm" onClick={() => setShowAdd(true)}>+ Add Entry</Button>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="pl-7">
        {allEvents.map((e, i) => (
          <div key={i} className={`relative animate-fade-up pb-4 pl-5 ${fadeDelay(i + 1)}`}>
            <div className="absolute -left-[7px] top-1 size-4 rounded-full" style={{ background: e.color, boxShadow: `0 0 0 3px ${e.color}30` }} />
            {i < allEvents.length - 1 && <div className="absolute -left-px top-5 h-[calc(100%-12px)] w-0.5 bg-grey-200" />}
            <Card>
              <CardBody>
                <div className="mb-2">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className="text-base">{e.icon}</span>
                    <span className="inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold" style={{ background: e.color + '15', color: e.color }}>{e.type}</span>
                    <span className="text-[11px] text-grey-400">{e.date}</span>
                  </div>
                  <div className="text-sm font-extrabold">{e.title}</div>
                  <div className="mt-0.5 text-xs text-grey-600">👨‍⚕️ {e.doctor}</div>
                </div>
                <div className="rounded-lg bg-grey-50 px-3.5 py-2.5 text-xs text-grey-800">{e.summary}</div>
                <Button variant="ghost" size="sm" className="mt-2 text-[11px]" onClick={() => setViewEvent(e)}>View Details →</Button>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>

      <Modal open={!!viewEvent} onClose={() => setViewEvent(null)} title={viewEvent?.title ?? ''} subtitle={`${viewEvent?.type} • ${viewEvent?.date}`}
        actions={<Button variant="primary" size="sm" onClick={() => setViewEvent(null)}>Close</Button>}>
        {viewEvent && (
          <div>
            <DetailRow label="Type" value={viewEvent.type} />
            <DetailRow label="Date" value={viewEvent.date} />
            <DetailRow label="Doctor" value={viewEvent.doctor} />
            <div className="mt-3.5 whitespace-pre-wrap rounded-[10px] bg-grey-50 p-3.5 text-xs leading-relaxed text-grey-800">{viewEvent.details}</div>
          </div>
        )}
      </Modal>

      <Modal open={showAdd} onClose={() => { setShowAdd(false); setAdded(false); }} title="Add EMR Entry"
        actions={!added ? <><Button variant="outline" size="sm" onClick={() => setShowAdd(false)}>Cancel</Button><Button variant="primary" size="sm" onClick={handleAdd}>+ Add Entry</Button></> : undefined}>
        {added ? <SuccessBanner message="EMR entry added successfully!" /> : (
          <div>
            <FormGroup label="Entry Type">
              <Select value={addType} onChange={e => setAddType(e.target.value)}>
                {['Screening', 'Prescription', 'Teleconsultation', 'Referral'].map(t => <option key={t}>{t}</option>)}
              </Select>
            </FormGroup>
            <FormGroup label="Title"><Input placeholder="e.g. Follow-up Screening" value={addTitle} onChange={e => setAddTitle(e.target.value)} /></FormGroup>
            <FormGroup label="Doctor"><Input placeholder="Doctor name" value={addDoctor} onChange={e => setAddDoctor(e.target.value)} /></FormGroup>
            <FormGroup label="Summary / Notes"><Textarea className="h-20 resize-none" placeholder="Clinical findings and notes..." value={addSummary} onChange={e => setAddSummary(e.target.value)} /></FormGroup>
          </div>
        )}
      </Modal>
    </AppShell>
  );
}
