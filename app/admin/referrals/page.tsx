'use client';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { StatusBadge } from '@/app/components/ui';

const referrals = [
  { id: 'REF-001', patient: 'Narasimha Rao', age: 71, condition: 'Glaucoma', hospital: 'LV Prasad Eye Institute, Hyderabad', date: '01 Jun 2025', priority: 'Urgent', status: 'Pending' },
  { id: 'REF-002', patient: 'Padmavathi', age: 38, condition: 'Diabetic Retinopathy', hospital: 'SVIMS, Tirupati', date: '31 May 2025', priority: 'High', status: 'Approved' },
  { id: 'REF-003', patient: 'Suresh Kumar', age: 62, condition: 'Cataract Surgery', hospital: 'GGH, Vijayawada', date: '28 May 2025', priority: 'Medium', status: 'Completed' },
  { id: 'REF-004', patient: 'Lakshmi Devi', age: 45, condition: 'Keratoconus', hospital: 'Sarojini Devi Eye Hospital, Hyderabad', date: '25 May 2025', priority: 'High', status: 'In Progress' },
];

export default function ReferralManagement() {
  return (
    <div className="app-layout">
      <Sidebar role="admin" userName="Venkat Rao" userSub="Super Admin" />
      <div className="main-content">
        <Topbar title="Referral Management" subtitle="Hospital and specialist referrals" />
        <main className="page-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
            {[
              { label: 'Total Referrals', v: '8,420', color: '#1A3A6B' },
              { label: 'Pending', v: '1,240', color: '#E65100' },
              { label: 'Approved', v: '4,820', color: '#00897B' },
              { label: 'Completed', v: '2,360', color: '#2E7D32' },
            ].map(s => (
              <div key={s.label} className="card animate-fade-up">
                <div className="card-body">
                  <div style={{ fontSize: 24, fontWeight: 900, color: s.color }}>{s.v}</div>
                  <div style={{ fontSize: 12, color: '#9E9E9E' }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
            <input className="form-input" style={{ flex: 1 }} placeholder="Search by patient or condition..." />
            <button className="btn btn-primary">+ New Referral</button>
          </div>

          <div className="card">
            <div className="card-body" style={{ padding: 0 }}>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Ref ID</th>
                      <th>Patient</th>
                      <th>Condition</th>
                      <th>Hospital</th>
                      <th>Date</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referrals.map((r, i) => (
                      <tr key={r.id} className={`animate-fade-up d${i + 1}`}>
                        <td style={{ fontWeight: 700 }}>{r.id}</td>
                        <td>
                          <div style={{ fontWeight: 700 }}>{r.patient}</div>
                          <div style={{ fontSize: 11, color: '#9E9E9E' }}>{r.age}y</div>
                        </td>
                        <td>{r.condition}</td>
                        <td style={{ fontSize: 12 }}>{r.hospital}</td>
                        <td>{r.date}</td>
                        <td>
                          <span className={`badge ${r.priority === 'Urgent' ? 'badge-error' : r.priority === 'High' ? 'badge-warning' : 'badge-grey'}`}>{r.priority}</span>
                        </td>
                        <td><StatusBadge label={r.status} /></td>
                        <td>
                          <div style={{ display: 'flex', gap: 4 }}>
                            <button className="btn btn-sm btn-outline" style={{ padding: '4px 10px', fontSize: 11 }}>View</button>
                            {r.status === 'Pending' && <button className="btn btn-sm btn-primary" style={{ padding: '4px 10px', fontSize: 11 }}>Approve</button>}
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
