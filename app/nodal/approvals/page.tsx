'use client';
import { useState } from 'react';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { AppShell } from '@/app/components/app-shell';
import { StatusBadge, Button, Card, CardBody, fadeDelay } from '@/app/components/ui';
import { cn } from '@/app/lib/cn';
import Modal, { DetailRow, downloadFile, SuccessBanner } from '@/app/components/Modal';

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
    downloadFile(`${rx.id}_Prescription.txt`, `PRESCRIPTION\nPatient: ${rx.patientName}\n...`);
  };

  return (
    <AppShell
      sidebar={<Sidebar role="nodal" userName="Ravi Shankar" userSub="Nodal Officer, Krishna" />}
      topbar={<Topbar title="Prescription Approvals" subtitle="Review and approve prescriptions" />}
    >
      <div className="mb-4 flex gap-2">
        {['Pending', 'Approved', 'All'].map(s => (
          <Button key={s} size="sm" variant={filter === s ? 'primary' : 'outline'} className={cn(filter !== s && 'border-grey-300 bg-white text-grey-600')} onClick={() => setFilter(s)}>
            {s} ({rxList.filter(p => s === 'All' || p.status === s).length})
          </Button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {filtered.map((rx, i) => (
          <Card key={rx.id} className={`animate-fade-up ${fadeDelay(i + 1)}`}>
            <CardBody>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-base font-extrabold text-primary">{rx.patientName[0]}</div>
                  <div><div className="text-sm font-extrabold">{rx.patientName}</div><div className="text-[11px] text-grey-400">{rx.age}y • {rx.village} • {rx.date}</div></div>
                </div>
                <StatusBadge label={rx.status} />
              </div>
              <div className="mb-3 rounded-[10px] bg-grey-50 p-3">
                <div className="grid grid-cols-2 gap-2">
                  <div><div className="text-[10px] font-bold text-grey-400">DIAGNOSIS</div><div className="text-[13px] font-bold">{rx.diagnosis}</div></div>
                  <div><div className="text-[10px] font-bold text-grey-400">DOCTOR</div><div className="text-[13px] font-bold">{rx.doctor}</div></div>
                  <div className="col-span-2"><div className="text-[10px] font-bold text-grey-400">POWER</div><div className="text-xs text-grey-800">{rx.power}</div></div>
                </div>
              </div>
              {rx.status === 'Pending' ? (
                <div className="flex gap-2">
                  <Button size="sm" variant="primary" className="flex-1" onClick={() => { setActionRx(rx); setActionType('approve'); setDone(false); }}>✅ Approve</Button>
                  <Button size="sm" variant="danger" className="flex-1" onClick={() => { setActionRx(rx); setActionType('reject'); setDone(false); }}>❌ Reject</Button>
                  <Button size="sm" variant="outline" onClick={() => setViewRx(rx)}>📋 View Full</Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setViewRx(rx)}>📋 View Full</Button>
                  <Button size="sm" variant="outline" onClick={() => handlePrint(rx)}>🖨️ Print</Button>
                </div>
              )}
            </CardBody>
          </Card>
        ))}
      </div>

      <Modal open={!!viewRx} onClose={() => setViewRx(null)} title="Prescription Detail" subtitle={viewRx?.id}
        actions={<><Button variant="outline" size="sm" onClick={() => { viewRx && handlePrint(viewRx); }}>🖨️ Print</Button><Button variant="primary" size="sm" onClick={() => setViewRx(null)}>Close</Button></>}>
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

      <Modal open={!!actionRx} onClose={() => { setActionRx(null); setDone(false); }} title={actionType === 'approve' ? 'Approve Prescription' : 'Reject Prescription'} subtitle={actionRx?.id}
        actions={!done ? <><Button variant="outline" size="sm" onClick={() => setActionRx(null)}>Cancel</Button><Button size="sm" variant={actionType === 'approve' ? 'primary' : 'danger'} onClick={doAction}>{actionType === 'approve' ? '✅ Confirm Approve' : '❌ Confirm Reject'}</Button></> : undefined}>
        {done ? <SuccessBanner message={`Prescription ${actionType === 'approve' ? 'approved' : 'rejected'} successfully!`} /> : actionRx && (
          <div className="py-3 text-center">
            <div className="mb-2.5 text-4xl">{actionType === 'approve' ? '✅' : '❌'}</div>
            <div className="text-sm font-bold">{actionType === 'approve' ? 'Approve' : 'Reject'} prescription for {actionRx.patientName}?</div>
            <div className="mt-1.5 text-xs text-grey-400">{actionRx.diagnosis} • {actionRx.doctor}</div>
          </div>
        )}
      </Modal>
    </AppShell>
  );
}
