'use client';
import { useState } from 'react';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { StatusBadge } from '@/app/components/ui';
import Modal, { DetailRow, SuccessBanner } from '@/app/components/Modal';

type Ref = { id: string; patient: string; age: number; condition: string; hospital: string; date: string; priority: string; status: string };

const REFS_INIT: Ref[] = [
  { id: 'REF-001', patient: 'Narasimha Rao', age: 71, condition: 'Glaucoma', hospital: 'LV Prasad Eye Institute, Hyderabad', date: '01 Jun 2025', priority: 'Urgent', status: 'Pending' },
  { id: 'REF-002', patient: 'Padmavathi', age: 38, condition: 'Diabetic Retinopathy', hospital: 'SVIMS, Tirupati', date: '31 May 2025', priority: 'High', status: 'Approved' },
  { id: 'REF-003', patient: 'Suresh Kumar', age: 62, condition: 'Cataract Surgery', hospital: 'GGH, Vijayawada', date: '28 May 2025', priority: 'Medium', status: 'Completed' },
  { id: 'REF-004', patient: 'Lakshmi Devi', age: 45, condition: 'Keratoconus', hospital: 'Sarojini Devi Eye Hospital, Hyderabad', date: '25 May 2025', priority: 'High', status: 'In Progress' },
];

const NEW_REF_INIT = { patient: '', age: '', condition: '', hospital: '', priority: 'Medium' };

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
    <div className="app-layout">
      <Sidebar role="admin" userName="Venkat Rao" userSub="Super Admin" />
      <div className="main-content">
        <Topbar title="Referral Management" subtitle="Hospital and specialist referrals" />
        <main className="page-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 16 }}>
            {stats.map(s => (
              <div key={s.label} className="card animate-fade-up">
                <div className="card-body">
                  <div style={{ fontSize: 24, fontWeight: 900, color: s.color, fontFamily: "'Space Grotesk', sans-serif" }}>{s.v}</div>
                  <div style={{ fontSize: 12, color: '#9E9E9E' }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
            <input className="form-input" style={{ flex: 1 }} placeholder="Search by patient or condition..." />
            <button className="btn btn-primary" onClick={() => setShowNew(true)}>+ New Referral</button>
          </div>

          <div className="card">
            <div className="card-body" style={{ padding: 0 }}>
              <div className="table-wrap">
                <table>
                  <thead><tr><th>Ref ID</th><th>Patient</th><th>Condition</th><th>Hospital</th><th>Date</th><th>Priority</th><th>Status</th><th>Action</th></tr></thead>
                  <tbody>
                    {refs.map((r, i) => (
                      <tr key={r.id} className={`animate-fade-up d${i + 1}`}>
                        <td style={{ fontWeight: 700 }}>{r.id}</td>
                        <td><div style={{ fontWeight: 700 }}>{r.patient}</div><div style={{ fontSize: 11, color: '#9E9E9E' }}>{r.age}y</div></td>
                        <td>{r.condition}</td>
                        <td style={{ fontSize: 12 }}>{r.hospital}</td>
                        <td>{r.date}</td>
                        <td><span className={`badge ${r.priority === 'Urgent' ? 'badge-error' : r.priority === 'High' ? 'badge-warning' : 'badge-grey'}`}>{r.priority}</span></td>
                        <td><StatusBadge label={r.status} /></td>
                        <td>
                          <div style={{ display: 'flex', gap: 4 }}>
                            <button className="btn btn-sm btn-outline" style={{ padding: '4px 10px', fontSize: 11 }} onClick={() => setViewRef(r)}>View</button>
                            {r.status === 'Pending' && <button className="btn btn-sm btn-primary" style={{ padding: '4px 10px', fontSize: 11 }} onClick={() => setApproveRef(r)}>Approve</button>}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* View Modal */}
      <Modal open={!!viewRef} onClose={() => setViewRef(null)} title="Referral Details" subtitle={viewRef?.id}
        actions={<button className="btn btn-primary btn-sm" onClick={() => setViewRef(null)}>Close</button>}>
        {viewRef && <>
          <DetailRow label="Referral ID" value={viewRef.id} />
          <DetailRow label="Patient" value={`${viewRef.patient}, ${viewRef.age} yrs`} />
          <DetailRow label="Condition" value={viewRef.condition} />
          <DetailRow label="Referred Hospital" value={viewRef.hospital} />
          <DetailRow label="Date" value={viewRef.date} />
          <DetailRow label="Priority" value={viewRef.priority} />
          <DetailRow label="Status" value={viewRef.status} />
          <div style={{ marginTop: 14, background: '#FFF8E1', border: '1px solid #FFD54F40', borderRadius: 10, padding: 14, fontSize: 12, color: '#5D4037' }}>
            <strong>Clinical Note:</strong> Patient requires specialized evaluation. All relevant reports and fundus photographs have been attached. Appointment to be scheduled within 7 days of this referral.
          </div>
        </>}
      </Modal>

      {/* Approve Modal */}
      <Modal open={!!approveRef} onClose={() => setApproveRef(null)} title="Approve Referral" subtitle={`${approveRef?.patient} — ${approveRef?.condition}`}
        actions={!approvedId ? <><button className="btn btn-outline btn-sm" onClick={() => setApproveRef(null)}>Cancel</button><button className="btn btn-primary btn-sm" onClick={() => approveRef && doApprove(approveRef.id)}>✅ Confirm Approve</button></> : undefined}>
        {approvedId ? <SuccessBanner message={`Referral ${approvedId} approved successfully!`} /> : (
          approveRef && <>
            <DetailRow label="Patient" value={`${approveRef.patient}, ${approveRef.age} yrs`} />
            <DetailRow label="Condition" value={approveRef.condition} />
            <DetailRow label="Hospital" value={approveRef.hospital} />
            <DetailRow label="Priority" value={approveRef.priority} />
            <div style={{ marginTop: 14, background: 'rgba(26,58,107,0.05)', borderRadius: 10, padding: 14, fontSize: 12, color: '#424242' }}>
              Approving this referral will notify the hospital and send appointment details to the patient via SMS.
            </div>
          </>
        )}
      </Modal>

      {/* New Referral Modal */}
      <Modal open={showNew} onClose={() => { setShowNew(false); setSubmitted(false); }} title="Create New Referral"
        actions={!submitted ? <><button className="btn btn-outline btn-sm" onClick={() => setShowNew(false)}>Cancel</button><button className="btn btn-primary btn-sm" onClick={doSubmitNew}>Submit Referral</button></> : undefined}>
        {submitted ? <SuccessBanner message="Referral submitted successfully!" /> : (
          <div>
            {[{ label: 'Patient Name', key: 'patient', type: 'text', placeholder: 'Full name' }, { label: 'Age', key: 'age', type: 'number', placeholder: 'Age in years' }, { label: 'Condition / Diagnosis', key: 'condition', type: 'text', placeholder: 'e.g. Cataract' }, { label: 'Referred Hospital', key: 'hospital', type: 'text', placeholder: 'Hospital name' }].map(f => (
              <div className="form-group" key={f.key}>
                <label className="form-label">{f.label}</label>
                <input className="form-input" type={f.type} placeholder={f.placeholder} value={(newRef as any)[f.key]} onChange={e => setNewRef(p => ({ ...p, [f.key]: e.target.value }))} />
              </div>
            ))}
            <div className="form-group">
              <label className="form-label">Priority</label>
              <select className="form-input form-select" value={newRef.priority} onChange={e => setNewRef(p => ({ ...p, priority: e.target.value }))}>
                {['Urgent', 'High', 'Medium', 'Low'].map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
