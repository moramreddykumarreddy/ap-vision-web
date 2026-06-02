'use client';
import { useState } from 'react';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { SectionHeader, StatusBadge } from '@/app/components/ui';

const docs = [
  { id: 'DOC-001', name: 'Referral Letter – SVIMS Tirupati', type: 'Referral', patient: 'Ramaiah Venkata', date: '01 Jun 2025', size: '142 KB', status: 'Active', icon: '📄' },
  { id: 'DOC-002', name: 'Prescription – Bifocal Glasses', type: 'Prescription', patient: 'Ramaiah Venkata', date: '02 Jun 2025', size: '89 KB', status: 'Active', icon: '💊' },
  { id: 'DOC-003', name: 'Fundus Photo – OD', type: 'Clinical Image', patient: 'Ramaiah Venkata', date: '02 Jun 2025', size: '2.4 MB', status: 'Active', icon: '🖼️' },
  { id: 'DOC-004', name: 'Aadhar Card', type: 'Identity', patient: 'Ramaiah Venkata', date: '01 Jan 2025', size: '380 KB', status: 'Verified', icon: '🪪' },
  { id: 'DOC-005', name: 'Teleconsultation Report', type: 'Report', patient: 'Ramaiah Venkata', date: '28 May 2025', size: '210 KB', status: 'Active', icon: '📋' },
];

export default function DocumentManagement() {
  const [search, setSearch] = useState('');
  const filtered = docs.filter(d => d.name.toLowerCase().includes(search.toLowerCase()) || d.type.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="app-layout">
      <Sidebar role="admin" userName="Venkat Rao" userSub="Super Admin" />
      <div className="main-content">
        <Topbar title="Document Management" subtitle="Patient documents and records" />
        <main className="page-body">
          <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
            <input className="form-input" style={{ flex: 1 }} placeholder="Search documents..." value={search} onChange={e => setSearch(e.target.value)} />
            <button className="btn btn-primary">📤 Upload Document</button>
          </div>

          {/* Type filters */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
            {['All', 'Prescription', 'Referral', 'Clinical Image', 'Report', 'Identity'].map(t => (
              <button key={t} className="btn btn-sm btn-outline" style={{ fontSize: 11 }}>{t}</button>
            ))}
          </div>

          <div className="card">
            <div className="card-body" style={{ padding: 0 }}>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Document</th>
                      <th>Type</th>
                      <th>Patient</th>
                      <th>Date</th>
                      <th>Size</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((d, i) => (
                      <tr key={d.id} className={`animate-fade-up d${i + 1}`}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span style={{ fontSize: 20 }}>{d.icon}</span>
                            <div>
                              <div style={{ fontWeight: 700, fontSize: 13 }}>{d.name}</div>
                              <div style={{ fontSize: 10, color: '#9E9E9E' }}>{d.id}</div>
                            </div>
                          </div>
                        </td>
                        <td><span className="badge badge-info">{d.type}</span></td>
                        <td>{d.patient}</td>
                        <td>{d.date}</td>
                        <td>{d.size}</td>
                        <td><StatusBadge label={d.status} /></td>
                        <td>
                          <div style={{ display: 'flex', gap: 4 }}>
                            <button className="btn btn-sm btn-outline" style={{ padding: '4px 10px' }}>👁️</button>
                            <button className="btn btn-sm btn-outline" style={{ padding: '4px 10px' }}>📥</button>
                            <button className="btn btn-sm btn-outline" style={{ padding: '4px 10px', color: '#C62828' }}>🗑️</button>
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
    </div>
  );
}
