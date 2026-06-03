'use client';
import { useState } from 'react';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { SectionHeader, StatusBadge } from '@/app/components/ui';
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
    <div className="app-layout">
      <Sidebar role="admin" userName="Venkat Rao" userSub="Super Admin" />
      <div className="main-content">
        <Topbar title="Document Management" subtitle="Patient documents and records" />
        <main className="page-body">
          <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
            <input className="form-input" style={{ flex: 1 }} placeholder="Search documents..." value={search} onChange={e => setSearch(e.target.value)} />
            <button className="btn btn-primary" onClick={() => setShowUpload(true)}>📤 Upload Document</button>
          </div>

          <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
            {['All', 'Prescription', 'Referral', 'Clinical Image', 'Report', 'Identity'].map(t => (
              <button key={t} onClick={() => setFilterType(t)} className="btn btn-sm" style={{ background: filterType === t ? '#1A3A6B' : 'white', color: filterType === t ? 'white' : '#616161', border: '1.5px solid', borderColor: filterType === t ? '#1A3A6B' : '#E0E0E0' }}>{t}</button>
            ))}
          </div>

          <div className="card">
            <div className="card-body" style={{ padding: 0 }}>
              <div className="table-wrap">
                <table>
                  <thead><tr><th>Document</th><th>Type</th><th>Patient</th><th>Date</th><th>Size</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    {filtered.map((d, i) => (
                      <tr key={d.id} className={`animate-fade-up d${i + 1}`}>
                        <td><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ fontSize: 20 }}>{d.icon}</span><div><div style={{ fontWeight: 700, fontSize: 13 }}>{d.name}</div><div style={{ fontSize: 10, color: '#9E9E9E' }}>{d.id}</div></div></div></td>
                        <td><span className="badge badge-info">{d.type}</span></td>
                        <td>{d.patient}</td>
                        <td>{d.date}</td>
                        <td>{d.size}</td>
                        <td><StatusBadge label={d.status} /></td>
                        <td>
                          <div style={{ display: 'flex', gap: 4 }}>
                            <button className="btn btn-sm btn-outline" style={{ padding: '4px 10px' }} title="View" onClick={() => setViewDoc(d)}>👁️</button>
                            <button className="btn btn-sm btn-outline" style={{ padding: '4px 10px' }} title="Download" onClick={() => handleDownload(d)}>📥</button>
                            <button className="btn btn-sm btn-outline" style={{ padding: '4px 10px', color: '#C62828' }} title="Delete" onClick={() => setDeleteDoc(d)}>🗑️</button>
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
      <Modal open={!!viewDoc} onClose={() => setViewDoc(null)} title={viewDoc?.name ?? ''} subtitle={`${viewDoc?.id} • ${viewDoc?.type}`}
        actions={<><button className="btn btn-outline btn-sm" onClick={() => { viewDoc && handleDownload(viewDoc); setViewDoc(null); }}>📥 Download</button><button className="btn btn-primary btn-sm" onClick={() => setViewDoc(null)}>Close</button></>}>
        {viewDoc && (
          <div>
            <DetailRow label="Document ID" value={viewDoc.id} />
            <DetailRow label="Type" value={viewDoc.type} />
            <DetailRow label="Patient" value={viewDoc.patient} />
            <DetailRow label="Date" value={viewDoc.date} />
            <DetailRow label="File Size" value={viewDoc.size} />
            <DetailRow label="Status" value={viewDoc.status} />
            <div style={{ marginTop: 16, background: '#F8F9FA', borderRadius: 10, padding: 14, fontSize: 12, color: '#424242', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
              {viewDoc.content}
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal open={!!deleteDoc} onClose={() => setDeleteDoc(null)} title="Delete Document" subtitle="This action cannot be undone"
        actions={<><button className="btn btn-outline btn-sm" onClick={() => setDeleteDoc(null)}>Cancel</button><button className="btn btn-sm" style={{ background: '#C62828', color: 'white' }} onClick={() => deleteDoc && handleDelete(deleteDoc.id)}>🗑️ Delete</button></>}>
        {deleteDoc && (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>⚠️</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0D2347' }}>Delete "{deleteDoc.name}"?</div>
            <div style={{ fontSize: 12, color: '#9E9E9E', marginTop: 6 }}>This will permanently remove the document from the system.</div>
          </div>
        )}
      </Modal>

      {/* Upload Modal */}
      <Modal open={showUpload} onClose={() => { setShowUpload(false); setUploaded(false); }} title="Upload Document" subtitle="Add a new document to the patient record"
        actions={<><button className="btn btn-outline btn-sm" onClick={() => setShowUpload(false)}>Cancel</button><button className="btn btn-primary btn-sm" onClick={handleUpload}>📤 Upload</button></>}>
        {uploaded ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>✅</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#2E7D32' }}>Document uploaded successfully!</div>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label className="form-label">Document Name</label>
              <input className="form-input" placeholder="e.g. Post-operative Report" value={uploadName} onChange={e => setUploadName(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Document Type</label>
              <select className="form-input form-select" value={uploadType} onChange={e => setUploadType(e.target.value)}>
                {['Prescription', 'Referral', 'Clinical Image', 'Report', 'Identity'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div style={{ border: '2px dashed #E0E0E0', borderRadius: 12, padding: '30px 20px', textAlign: 'center', color: '#9E9E9E', marginTop: 8 }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📁</div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Drop file here or click to browse</div>
              <div style={{ fontSize: 11, marginTop: 4 }}>PDF, JPG, PNG up to 10 MB</div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
