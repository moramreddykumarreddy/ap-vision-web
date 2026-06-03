'use client';
import { useState } from 'react';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { AppShell } from '@/app/components/app-shell';
import { StatusBadge, Card, CardBody, TableWrap, DataTable, Button, Input, FormGroup, Select, fadeDelay } from '@/app/components/ui';
import Modal, { DetailRow, SuccessBanner } from '@/app/components/Modal';

type Ref = { id: string; patient: string; age: number; condition: string; hospital: string; date: string; priority: string; status: string };

const REFS_INIT: Ref[] = [
  { id: 'REF-001', patient: 'Narasimha Rao', age: 71, condition: 'Glaucoma', hospital: 'LV Prasad Eye Institute, Hyderabad', date: '01 Jun 2025', priority: 'Urgent', status: 'Pending' },
  { id: 'REF-002', patient: 'Padmavathi', age: 38, condition: 'Diabetic Retinopathy', hospital: 'SVIMS, Tirupati', date: '31 May 2025', priority: 'High', status: 'Approved' },
  { id: 'REF-003', patient: 'Suresh Kumar', age: 62, condition: 'Cataract Surgery', hospital: 'GGH, Vijayawada', date: '28 May 2025', priority: 'Medium', status: 'Completed' },
  { id: 'REF-004', patient: 'Lakshmi Devi', age: 45, condition: 'Keratoconus', hospital: 'Sarojini Devi Eye Hospital, Hyderabad', date: '25 May 2025', priority: 'High', status: 'In Progress' },
];

const NEW_REF_INIT = { patient: '', age: '', condition: '', hospital: '', priority: 'Medium' };

function priorityBadgeClass(priority: string) {
  if (priority === 'Urgent') return 'bg-error/10 text-error';
  if (priority === 'High') return 'bg-warning/10 text-warning';
  return 'bg-grey-100 text-grey-600';
}

export default function ReferralManagement() {
  const [refs, setRefs] = useState(REFS_INIT);
  const [viewRef, setViewRef] = useState<Ref | null>(null);
  const [approveRef, setApproveRef] = useState<Ref | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [newRef, setNewRef] = useState(NEW_REF_INIT);
  const [approvedId, setApprovedId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const doApprove = (id: string) => {
    setRefs(prev => prev.map(r => r.id === id ? { ...r, status: 'Approved' } : r));
    setApprovedId(id);
    setTimeout(() => { setApproveRef(null); setApprovedId(null); }, 1200);
  };

  const doSubmitNew = () => {
    if (!newRef.patient.trim()) return;
    const n: Ref = { id: `REF-00${refs.length + 1}`, patient: newRef.patient, age: Number(newRef.age) || 0, condition: newRef.condition, hospital: newRef.hospital, date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }), priority: newRef.priority, status: 'Pending' };
    setRefs(prev => [n, ...prev]);
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setShowNew(false); setNewRef(NEW_REF_INIT); }, 1500);
  };

  const stats = [
    { label: 'Total Referrals', v: refs.length.toString(), color: '#1A3A6B' },
    { label: 'Pending', v: refs.filter(r => r.status === 'Pending').length.toString(), color: '#E65100' },
    { label: 'Approved', v: refs.filter(r => r.status === 'Approved').length.toString(), color: '#00897B' },
    { label: 'Completed', v: refs.filter(r => r.status === 'Completed').length.toString(), color: '#2E7D32' },
  ];

  return (
    <AppShell
      sidebar={<Sidebar role="admin" userName="Venkat Rao" userSub="Super Admin" />}
      topbar={<Topbar title="Referral Management" subtitle="Hospital and specialist referrals" />}
    >
      <div className="mb-4 grid grid-cols-2 gap-3.5 lg:grid-cols-4">
        {stats.map(s => (
          <Card key={s.label} className="animate-fade-up">
            <CardBody>
              <div className="font-heading text-2xl font-black" style={{ color: s.color }}>{s.v}</div>
              <div className="text-xs text-grey-400">{s.label}</div>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="mb-3.5 flex gap-2.5">
        <Input className="flex-1" placeholder="Search by patient or condition..." />
        <Button variant="primary" onClick={() => setShowNew(true)}>+ New Referral</Button>
      </div>

      <Card>
        <CardBody className="p-0">
          <TableWrap>
            <DataTable>
              <thead><tr><th>Ref ID</th><th>Patient</th><th>Condition</th><th>Hospital</th><th>Date</th><th>Priority</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                {refs.map((r, i) => (
                  <tr key={r.id} className={`animate-fade-up ${fadeDelay(i + 1)}`}>
                    <td className="font-bold">{r.id}</td>
                    <td><div className="font-bold">{r.patient}</div><div className="text-[11px] text-grey-400">{r.age}y</div></td>
                    <td>{r.condition}</td>
                    <td className="text-xs">{r.hospital}</td>
                    <td>{r.date}</td>
                    <td><span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${priorityBadgeClass(r.priority)}`}>{r.priority}</span></td>
                    <td><StatusBadge label={r.status} /></td>
                    <td>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" className="px-2.5 py-1 text-[11px]" onClick={() => setViewRef(r)}>View</Button>
                        {r.status === 'Pending' && <Button size="sm" variant="primary" className="px-2.5 py-1 text-[11px]" onClick={() => setApproveRef(r)}>Approve</Button>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </DataTable>
          </TableWrap>
        </CardBody>
      </Card>

      <Modal open={!!viewRef} onClose={() => setViewRef(null)} title="Referral Details" subtitle={viewRef?.id}
        actions={<Button variant="primary" size="sm" onClick={() => setViewRef(null)}>Close</Button>}>
        {viewRef && <>
          <DetailRow label="Referral ID" value={viewRef.id} />
          <DetailRow label="Patient" value={`${viewRef.patient}, ${viewRef.age} yrs`} />
          <DetailRow label="Condition" value={viewRef.condition} />
          <DetailRow label="Referred Hospital" value={viewRef.hospital} />
          <DetailRow label="Date" value={viewRef.date} />
          <DetailRow label="Priority" value={viewRef.priority} />
          <DetailRow label="Status" value={viewRef.status} />
          <div className="mt-3.5 rounded-[10px] border border-[#FFD54F40] bg-[#FFF8E1] p-3.5 text-xs text-[#5D4037]">
            <strong>Clinical Note:</strong> Patient requires specialized evaluation. All relevant reports and fundus photographs have been attached. Appointment to be scheduled within 7 days of this referral.
          </div>
        </>}
      </Modal>

      <Modal open={!!approveRef} onClose={() => setApproveRef(null)} title="Approve Referral" subtitle={`${approveRef?.patient} — ${approveRef?.condition}`}
        actions={!approvedId ? <><Button variant="outline" size="sm" onClick={() => setApproveRef(null)}>Cancel</Button><Button variant="primary" size="sm" onClick={() => approveRef && doApprove(approveRef.id)}>✅ Confirm Approve</Button></> : undefined}>
        {approvedId ? <SuccessBanner message={`Referral ${approvedId} approved successfully!`} /> : (
          approveRef && <>
            <DetailRow label="Patient" value={`${approveRef.patient}, ${approveRef.age} yrs`} />
            <DetailRow label="Condition" value={approveRef.condition} />
            <DetailRow label="Hospital" value={approveRef.hospital} />
            <DetailRow label="Priority" value={approveRef.priority} />
            <div className="mt-3.5 rounded-[10px] bg-primary/5 p-3.5 text-xs text-grey-800">
              Approving this referral will notify the hospital and send appointment details to the patient via SMS.
            </div>
          </>
        )}
      </Modal>

      <Modal open={showNew} onClose={() => { setShowNew(false); setSubmitted(false); }} title="Create New Referral"
        actions={!submitted ? <><Button variant="outline" size="sm" onClick={() => setShowNew(false)}>Cancel</Button><Button variant="primary" size="sm" onClick={doSubmitNew}>Submit Referral</Button></> : undefined}>
        {submitted ? <SuccessBanner message="Referral submitted successfully!" /> : (
          <div>
            {[{ label: 'Patient Name', key: 'patient', type: 'text', placeholder: 'Full name' }, { label: 'Age', key: 'age', type: 'number', placeholder: 'Age in years' }, { label: 'Condition / Diagnosis', key: 'condition', type: 'text', placeholder: 'e.g. Cataract' }, { label: 'Referred Hospital', key: 'hospital', type: 'text', placeholder: 'Hospital name' }].map(f => (
              <FormGroup key={f.key} label={f.label}>
                <Input type={f.type} placeholder={f.placeholder} value={(newRef as Record<string, string>)[f.key]} onChange={e => setNewRef(p => ({ ...p, [f.key]: e.target.value }))} />
              </FormGroup>
            ))}
            <FormGroup label="Priority">
              <Select value={newRef.priority} onChange={e => setNewRef(p => ({ ...p, priority: e.target.value }))}>
                {['Urgent', 'High', 'Medium', 'Low'].map(p => <option key={p}>{p}</option>)}
              </Select>
            </FormGroup>
          </div>
        )}
      </Modal>
    </AppShell>
  );
}
