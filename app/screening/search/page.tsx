'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { StatusBadge } from '@/app/components/ui';

const patients = [
  { id: 'APV-001234', name: 'Ramaiah Venkata', age: 58, gender: 'M', village: 'Nandyal', phone: '9876543210', lastVisit: '01 Jun 2025', diagnosis: 'Presbyopia', status: 'Active' },
  { id: 'APV-001235', name: 'Lakshmi Devi', age: 45, gender: 'F', village: 'Kurnool', phone: '9765432109', lastVisit: '28 May 2025', diagnosis: 'Myopia', status: 'Active' },
  { id: 'APV-001236', name: 'Suresh Kumar', age: 62, gender: 'M', village: 'Ongole', phone: '9654321098', lastVisit: '25 May 2025', diagnosis: 'Cataract', status: 'Referred' },
  { id: 'APV-001237', name: 'Padmavathi', age: 38, gender: 'F', village: 'Markapur', phone: '9543210987', lastVisit: '20 May 2025', diagnosis: 'Astigmatism', status: 'Active' },
  { id: 'APV-001238', name: 'Narasimha Rao', age: 71, gender: 'M', village: 'Darsi', phone: '9432109876', lastVisit: '18 May 2025', diagnosis: 'Glaucoma', status: 'Referred' },
];

export default function PatientSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);

  const results = searched ? patients.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.id.toLowerCase().includes(query.toLowerCase()) ||
    p.phone.includes(query)
  ) : [];

  return (
    <div className="app-layout">
      <Sidebar role="screening" userName="Dr. Srinivasa Rao" userSub="Team Lead" />
      <div className="main-content">
        <Topbar title="Patient Search" subtitle="Find patients by name, ID, or phone" />
        <main className="page-body">
          {/* Search bar */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
            <input
              id="patient-search-input"
              className="form-input"
              style={{ flex: 1 }}
              placeholder="Search by name, APV ID, or phone number..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && setSearched(true)}
            />
            <button className="btn btn-primary" onClick={() => setSearched(true)}>🔍 Search</button>
            <button className="btn btn-outline" onClick={() => alert('QR Scanner')}>📷 Scan QR</button>
          </div>

          {!searched && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#9E9E9E' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>Search for a Patient</div>
              <div style={{ fontSize: 13, marginTop: 4 }}>Enter name, APV ID, or phone number above</div>
              <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={() => router.push('/screening/register')}>
                + Register New Patient
              </button>
            </div>
          )}

          {searched && results.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#9E9E9E' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>😕</div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>No patients found</div>
              <div style={{ fontSize: 13, marginTop: 4 }}>Try a different search term</div>
              <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={() => router.push('/screening/register')}>
                Register New Patient
              </button>
            </div>
          )}

          {searched && results.length === 0 && query === '' && (
            <div>
              {patients.map((p, i) => (
                <PatientCard key={p.id} patient={p} index={i} router={router} />
              ))}
            </div>
          )}

          {searched && results.map((p, i) => (
            <PatientCard key={p.id} patient={p} index={i} router={router} />
          ))}

          {/* Show all when not searched */}
          {!searched && (
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#9E9E9E', marginBottom: 12 }}>Recent Patients</div>
              {patients.map((p, i) => (
                <PatientCard key={p.id} patient={p} index={i} router={router} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function PatientCard({ patient: p, index: i, router }: { patient: typeof patients[0]; index: number; router: ReturnType<typeof useRouter> }) {
  return (
    <div className={`card animate-fade-up d${i + 1}`} style={{ marginBottom: 12, cursor: 'pointer' }}
      onClick={() => router.push('/admin/emr')}>
      <div className="card-body">
        <div className="flex items-center gap-12">
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: '#1A3A6B20', color: '#1A3A6B',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontWeight: 800, flexShrink: 0,
          }}>
            {p.name[0]}
          </div>
          <div style={{ flex: 1 }}>
            <div className="flex items-center gap-8 mb-4">
              <span style={{ fontSize: 14, fontWeight: 800 }}>{p.name}</span>
              <span style={{ fontSize: 11, color: '#9E9E9E' }}>{p.age}y • {p.gender}</span>
              <StatusBadge label={p.status} />
            </div>
            <div style={{ fontSize: 11, color: '#9E9E9E' }}>
              📋 {p.id} • 📍 {p.village} • 📞 {p.phone}
            </div>
            <div style={{ fontSize: 11, color: '#757575', marginTop: 2 }}>
              Last visit: {p.lastVisit} • {p.diagnosis}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button className="btn btn-sm btn-primary" onClick={e => { e.stopPropagation(); router.push('/admin/emr'); }}>View EMR</button>
            <button className="btn btn-sm btn-outline" onClick={e => { e.stopPropagation(); router.push('/screening/register'); }}>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
}
