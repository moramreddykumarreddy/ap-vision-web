'use client';
import { useState } from 'react';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { StatusBadge } from '@/app/components/ui';
import Modal, { DetailRow, RosterTable, downloadFile, SuccessBanner } from '@/app/components/Modal';

type Rx = { id: string; patientName: string; age: number; village: string; diagnosis: string; power: string; date: string; doctor: string; status: string };

const INIT: Rx[] = [
  { id: 'RX-001', patientName: 'Ramaiah Venkata', age: 58, village: 'Patamata', diagnosis: 'Presbyopia', power: 'OD: +1.25/-0.50×90, OS: +1.00/-0.25×80', date: '02 Jun 2025', doctor: 'Dr. Srinivasa Rao', status: 'Pending' },
  { id: 'RX-003', patientName: 'Suresh Kumar', age: 62, village: 'Ongole', diagnosis: 'Cataract', power: 'Surgical referral recommended', date: '01 Jun 2025', doctor: 'Dr. Priya Devi', status: 'Pending' },
  { id: 'RX-002', patientName: 'Lakshmi Devi', age: 45, village: 'Kurnool', diagnosis: 'Myopia', power: 'OD: -2.50/-0.75×175, OS: -2.00/-0.50×170', date: '02 Jun 2025', doctor: 'Dr. Srinivasa Rao', status: 'Approved' },
  { id: 'RX-004', patientName: 'Padmavathi', age: 38, village: 'Markapur', diagnosis: 'Astigmatism', power: 'OD: -1.00/-1.25×90, OS: -1.25/-1.00×85', date: '31 May 2025', doctor: 'Dr. Ramesh Kumar', status: 'Approved' },
];

export default function ApprovalScreen() {
  const [filter, setFilter] = useState('Pending');
  const [rxList, setRxList] = useState(INIT);
  const [viewRx, setViewRx] = useState<Rx | null>(null);
  const [actionRx, setActionRx] = useState<Rx | null>(null);
  const [actionType, setActionType] = useState<'approve' | 'reject'>('approve');
  const [done, setDone] = useState(false);

  const filtered = rxList.filter(p => filter === 'All' || p.status === filter);

  const doAction = () => {
    if (!actionRx) return;
    setRxList(prev => prev.map(r => r.id === actionRx.id ? { ...r, status: actionType === 'approve' ? 'Approved' : 'Rejected' } : r));
    setDone(true);
    setTimeout(() => { setDone(false); setActionRx(null); }, 1400);
  };

  const handlePrint = (rx: Rx) => {
    const content = `PRESCRIPTION\n${'='.repeat(40)}\nPatient: ${rx.patientName} (${rx.age} yrs)\nVillage: ${rx.village}\nDate: ${rx.date}\nDoctor: ${rx.doctor}\nDiagnosis: ${rx.diagnosis}\nPower: ${rx.power}\nStatus: ${rx.status}\n${'='.repeat(40)}\nAP Vision Care — Govt. of Andhra Pradesh`;
    downloadFile(`${rx.id}_Prescription.txt`, content);
  };

  return (
    <div className="app-layout">
      <Sidebar role="nodal" userName="Ravi Shankar" userSub="Nodal Officer, Krishna" />
      <div className="main-content">
        <Topbar title="Prescription Approvals" subtitle="Review and approve prescriptions" />
        <main className="page-body">
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {['Pending', 'Approved', 'All'].map(s => (
              <button key={s} onClick={() => setFilter(s)} className="btn btn-sm"
                style={{ background: filter === s ? '#1A3A6B' : 'white', color: filter === s ? 'white' : '#616161', border: '1.5px solid', borderColor: filter === s ? '#1A3A6B' : '#E0E0E0' }}>
                {s} ({rxList.filter(p => s === 'All' || p.status === s).length})
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filtered.map((rx, i) => (
              <div key={rx.id} className={`card animate-fade-up d${i + 1}`}>
                <div className="card-body">
                  <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-12">
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#1A3A6B18', color: '#1A3A6B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16 }}>{rx.patientName[0]}</div>
                      <div><div style={{ fontSize: 14, fontWeight: 800 }}>{rx.patientName}</div><div style={{ fontSize: 11, color: '#9E9E9E' }}>{rx.age}y • {rx.village} • {rx.date}</div></div>
                    </div>
                    <StatusBadge label={rx.status} />
                  </div>
                  <div style={{ background: '#F5F5F5', borderRadius: 10, padding: 12, marginBottom: 12 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      <div><div style={{ fontSize: 10, color: '#9E9E9E', fontWeight: 700 }}>DIAGNOSIS</div><div style={{ fontSize: 13, fontWeight: 700 }}>{rx.diagnosis}</div></div>
                      <div><div style={{ fontSize: 10, color: '#9E9E9E', fontWeight: 700 }}>DOCTOR</div><div style={{ fontSize: 13, fontWeight: 700 }}>{rx.doctor}</div></div>
                      <div style={{ gridColumn: '1/-1' }}><div style={{ fontSize: 10, color: '#9E9E9E', fontWeight: 700 }}>POWER</div><div style={{ fontSize: 12, color: '#424242' }}>{rx.power}</div></div>
                    </div>
                  </div>
                  {rx.status === 'Pending' && (
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={() => { setActionRx(rx); setActionType('approve'); setDone(false); }}>✅ Approve</button>
                      <button className="btn btn-sm" style={{ flex: 1, background: '#C62828', color: 'white' }} onClick={() => { setActionRx(rx); setActionType('reject'); setDone(false); }}>❌ Reject</button>
                      <button className="btn btn-outline btn-sm" onClick={() => setViewRx(rx)}>📋 View Full</button>
                    </div>
                  )}
                  {rx.status !== 'Pending' && (
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn btn-sm btn-outline" onClick={() => setViewRx(rx)}>📋 View Full</button>
                      <button className="btn btn-sm btn-outline" onClick={() => handlePrint(rx)}>🖨️ Print</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* View Full Modal */}
      <Modal open={!!viewRx} onClose={() => setViewRx(null)} title="Prescription Detail" subtitle={viewRx?.id}
        actions={<><button className="btn btn-outline btn-sm" onClick={() => { viewRx && handlePrint(viewRx); }}>🖨️ Print</button><button className="btn btn-primary btn-sm" onClick={() => setViewRx(null)}>Close</button></>}>
        {viewRx && <>
          <DetailRow label="Patient" value={`${viewRx.patientName}, ${viewRx.age} yrs`} />
          <DetailRow label="Village" value={viewRx.village} />
          <DetailRow label="Date" value={viewRx.date} />
          <DetailRow label="Doctor" value={viewRx.doctor} />
          <DetailRow label="Diagnosis" value={viewRx.diagnosis} />
          <DetailRow label="Prescription" value={viewRx.power} />
          <DetailRow label="Status" value={viewRx.status} />
        </>}
      </Modal>

      {/* Approve/Reject Confirm Modal */}
      <Modal open={!!actionRx} onClose={() => { setActionRx(null); setDone(false); }} title={actionType === 'approve' ? 'Approve Prescription' : 'Reject Prescription'} subtitle={actionRx?.id}
        actions={!done ? <><button className="btn btn-outline btn-sm" onClick={() => setActionRx(null)}>Cancel</button><button className="btn btn-sm" style={{ background: actionType === 'approve' ? '#2E7D32' : '#C62828', color: 'white' }} onClick={doAction}>{actionType === 'approve' ? '✅ Confirm Approve' : '❌ Confirm Reject'}</button></> : undefined}>
        {done ? <SuccessBanner message={`Prescription ${actionType === 'approve' ? 'approved' : 'rejected'} successfully!`} /> : actionRx && (
          <div style={{ textAlign: 'center', padding: '12px 0' }}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>{actionType === 'approve' ? '✅' : '❌'}</div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{actionType === 'approve' ? 'Approve' : 'Reject'} prescription for {actionRx.patientName}?</div>
            <div style={{ fontSize: 12, color: '#9E9E9E', marginTop: 6 }}>{actionRx.diagnosis} • {actionRx.doctor}</div>
          </div>
        )}
      </Modal>
    </div>
  );
}
