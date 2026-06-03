'use client';
import { useState } from 'react';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { AppShell } from '@/app/components/app-shell';
import { SectionHeader, StatusBadge, Card, CardBody, TableWrap, DataTable, Button, Input, Select, FormGroup, fadeDelay } from '@/app/components/ui';
import { cn } from '@/app/lib/cn';
import Modal, { DetailRow, downloadFile } from '@/app/components/Modal';

const DOCS_INIT = [
  { id: 'DOC-001', name: 'Referral Letter – SVIMS Tirupati', type: 'Referral', patient: 'Ramaiah Venkata', date: '01 Jun 2025', size: '142 KB', status: 'Active', icon: '📄', content: 'This is to certify that Ramaiah Venkata (APV-001234) is referred to SVIMS Tirupati for detailed cataract evaluation and surgical consultation. Diagnosis: Presbyopia with early cataract changes.\n\nDoctor: Dr. Srinivasa Rao\nDate: 01 Jun 2025\nPriority: High' },
  { id: 'DOC-002', name: 'Prescription – Bifocal Glasses', type: 'Prescription', patient: 'Ramaiah Venkata', date: '02 Jun 2025', size: '89 KB', status: 'Active', icon: '💊', content: 'Prescription for Ramaiah Venkata (APV-001234)\nOD: +1.25/-0.50×90 | OS: +1.00/-0.25×80 | Add: +2.00\nDiagnosis: Presbyopia | Lens Type: Bifocal\nDoctor: Dr. Srinivasa Rao | Date: 02 Jun 2025' },
  { id: 'DOC-003', name: 'Fundus Photo – OD', type: 'Clinical Image', patient: 'Ramaiah Venkata', date: '02 Jun 2025', size: '2.4 MB', status: 'Active', icon: '🖼️', content: 'Fundus photograph of right eye (OD) captured at Vijayawada Urban Camp.\nFindings: Mild background diabetic retinopathy. No macular edema detected.\nCaptured by: Dr. Priya Devi | Equipment: Topcon TRC-NW400' },
  { id: 'DOC-004', name: 'Aadhar Card', type: 'Identity', patient: 'Ramaiah Venkata', date: '01 Jan 2025', size: '380 KB', status: 'Verified', icon: '🪪', content: 'Identity Document: Aadhar Card\nName: Ramaiah Venkata | DOB: 15-03-1967\nAadhar No: XXXX XXXX 7890\nVerified by: Registration Officer on 01 Jan 2025' },
  { id: 'DOC-005', name: 'Teleconsultation Report', type: 'Report', patient: 'Ramaiah Venkata', date: '28 May 2025', size: '210 KB', status: 'Active', icon: '📋', content: 'Tele-consultation Report\nDoctor: Dr. Anita Rao (SVIMS, Tirupati) | Date: 28 May 2025\nFindings: Mild NPDR detected in both eyes. Optic disc normal.\nRecommendation: HbA1c control. Follow-up in 3 months. Fundus fluorescein angiography if progression.' },
];

type Doc = typeof DOCS_INIT[0];

export default function DocumentManagement() {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [docs, setDocs] = useState(DOCS_INIT);
  const [viewDoc, setViewDoc] = useState<Doc | null>(null);
  const [deleteDoc, setDeleteDoc] = useState<Doc | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [uploadName, setUploadName] = useState('');
  const [uploadType, setUploadType] = useState('Prescription');
  const [uploaded, setUploaded] = useState(false);

  const filtered = docs.filter(d =>
    (filterType === 'All' || d.type === filterType) &&
    (d.name.toLowerCase().includes(search.toLowerCase()) || d.type.toLowerCase().includes(search.toLowerCase()))
  );

  const handleDownload = (d: Doc) => {
    downloadFile(`${d.id}_${d.name.replace(/\s+/g, '_')}.txt`, d.content);
  };

  const handleDelete = (id: string) => {
    setDocs(prev => prev.filter(d => d.id !== id));
    setDeleteDoc(null);
  };

  const handleUpload = () => {
    if (!uploadName.trim()) return;
    const newDoc: Doc = {
      id: `DOC-00${docs.length + 1}`,
      name: uploadName,
      type: uploadType,
      patient: 'Ramaiah Venkata',
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      size: `${Math.floor(Math.random() * 900 + 100)} KB`,
      status: 'Active',
      icon: '📄',
      content: `Document: ${uploadName}\nType: ${uploadType}\nUploaded: ${new Date().toLocaleDateString()}`,
    };
    setDocs(prev => [newDoc, ...prev]);
    setUploaded(true);
    setTimeout(() => { setUploaded(false); setShowUpload(false); setUploadName(''); }, 1500);
  };

  return (
    <AppShell
      sidebar={<Sidebar role="admin" userName="Venkat Rao" userSub="Super Admin" />}
      topbar={<Topbar title="Document Management" subtitle="Patient documents and records" />}
    >
      <div className="mb-4 flex gap-2.5">
        <Input className="flex-1" placeholder="Search documents..." value={search} onChange={e => setSearch(e.target.value)} />
        <Button variant="primary" onClick={() => setShowUpload(true)}>📤 Upload Document</Button>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {['All', 'Prescription', 'Referral', 'Clinical Image', 'Report', 'Identity'].map(t => (
          <Button key={t} size="sm" variant={filterType === t ? 'primary' : 'outline'} className={cn(filterType !== t && 'border-grey-300 bg-white text-grey-600')} onClick={() => setFilterType(t)}>{t}</Button>
        ))}
      </div>

      <Card>
        <CardBody className="p-0">
          <TableWrap>
            <DataTable>
              <thead><tr><th>Document</th><th>Type</th><th>Patient</th><th>Date</th><th>Size</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {filtered.map((d, i) => (
                  <tr key={d.id} className={`animate-fade-up ${fadeDelay(i + 1)}`}>
                    <td><div className="flex items-center gap-2.5"><span className="text-xl">{d.icon}</span><div><div className="text-[13px] font-bold">{d.name}</div><div className="text-[10px] text-grey-400">{d.id}</div></div></div></td>
                    <td><span className="inline-flex rounded-full bg-info/10 px-2.5 py-0.5 text-[11px] font-semibold text-info">{d.type}</span></td>
                    <td>{d.patient}</td>
                    <td>{d.date}</td>
                    <td>{d.size}</td>
                    <td><StatusBadge label={d.status} /></td>
                    <td>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" className="px-2.5 py-1" title="View" onClick={() => setViewDoc(d)}>👁️</Button>
                        <Button size="sm" variant="outline" className="px-2.5 py-1" title="Download" onClick={() => handleDownload(d)}>📥</Button>
                        <Button size="sm" variant="outline" className="px-2.5 py-1 text-error" title="Delete" onClick={() => setDeleteDoc(d)}>🗑️</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </DataTable>
          </TableWrap>
        </CardBody>
      </Card>

      <Modal open={!!viewDoc} onClose={() => setViewDoc(null)} title={viewDoc?.name ?? ''} subtitle={`${viewDoc?.id} • ${viewDoc?.type}`}
        actions={<><Button variant="outline" size="sm" onClick={() => { viewDoc && handleDownload(viewDoc); setViewDoc(null); }}>📥 Download</Button><Button variant="primary" size="sm" onClick={() => setViewDoc(null)}>Close</Button></>}>
        {viewDoc && (
          <div>
            <DetailRow label="Document ID" value={viewDoc.id} />
            <DetailRow label="Type" value={viewDoc.type} />
            <DetailRow label="Patient" value={viewDoc.patient} />
            <DetailRow label="Date" value={viewDoc.date} />
            <DetailRow label="File Size" value={viewDoc.size} />
            <DetailRow label="Status" value={viewDoc.status} />
            <div className="mt-4 whitespace-pre-wrap rounded-[10px] bg-grey-50 p-3.5 text-xs leading-relaxed text-grey-800">{viewDoc.content}</div>
          </div>
        )}
      </Modal>

      <Modal open={!!deleteDoc} onClose={() => setDeleteDoc(null)} title="Delete Document" subtitle="This action cannot be undone"
        actions={<><Button variant="outline" size="sm" onClick={() => setDeleteDoc(null)}>Cancel</Button><Button size="sm" variant="danger" onClick={() => deleteDoc && handleDelete(deleteDoc.id)}>🗑️ Delete</Button></>}>
        {deleteDoc && (
          <div className="py-4 text-center">
            <div className="mb-3 text-[40px]">⚠️</div>
            <div className="text-sm font-bold text-primary">Delete &quot;{deleteDoc.name}&quot;?</div>
            <div className="mt-1.5 text-xs text-grey-400">This will permanently remove the document from the system.</div>
          </div>
        )}
      </Modal>

      <Modal open={showUpload} onClose={() => { setShowUpload(false); setUploaded(false); }} title="Upload Document" subtitle="Add a new document to the patient record"
        actions={<><Button variant="outline" size="sm" onClick={() => setShowUpload(false)}>Cancel</Button><Button variant="primary" size="sm" onClick={handleUpload}>📤 Upload</Button></>}>
        {uploaded ? (
          <div className="py-5 text-center">
            <div className="mb-2.5 text-[40px]">✅</div>
            <div className="text-sm font-bold text-success">Document uploaded successfully!</div>
          </div>
        ) : (
          <div>
            <FormGroup label="Document Name">
              <Input placeholder="e.g. Post-operative Report" value={uploadName} onChange={e => setUploadName(e.target.value)} />
            </FormGroup>
            <FormGroup label="Document Type">
              <Select value={uploadType} onChange={e => setUploadType(e.target.value)}>
                {['Prescription', 'Referral', 'Clinical Image', 'Report', 'Identity'].map(t => <option key={t}>{t}</option>)}
              </Select>
            </FormGroup>
            <div className="mt-2 rounded-xl border-2 border-dashed border-grey-300 px-5 py-8 text-center text-grey-400">
              <div className="mb-2 text-[32px]">📁</div>
              <div className="text-[13px] font-semibold">Drop file here or click to browse</div>
              <div className="mt-1 text-[11px]">PDF, JPG, PNG up to 10 MB</div>
            </div>
          </div>
        )}
      </Modal>
    </AppShell>
  );
}
