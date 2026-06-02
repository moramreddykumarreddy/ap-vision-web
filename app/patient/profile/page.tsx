'use client';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { StatusBadge } from '@/app/components/ui';

export default function PatientProfile() {
  return (
    <div className="app-layout">
      <Sidebar role="patient" userName="Ramaiah Venkata" userSub="Patient" />
      <div className="main-content">
        <Topbar title="My Profile" subtitle="APV-001234" />
        <main className="page-body" style={{ maxWidth: 800 }}>
          <div className="card mb-20">
            <div className="card-body" style={{ textAlign: 'center', padding: 32 }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#1A3A6B', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 900, margin: '0 auto 16px' }}>R</div>
              <div style={{ fontSize: 22, fontWeight: 900 }}>Ramaiah Venkata</div>
              <div style={{ fontSize: 13, color: '#9E9E9E', marginTop: 4 }}>APV-001234 • Patient since 2024</div>
              <div style={{ marginTop: 12, display: 'flex', justifyContent: 'center', gap: 8 }}>
                <StatusBadge label="Active" />
                <span className="badge badge-info">BPL</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div className="card">
              <div className="card-header"><h3>Personal Information</h3></div>
              <div className="card-body">
                {[
                  { l: 'Full Name', v: 'Ramaiah Venkata' },
                  { l: 'Date of Birth', v: '15 March 1967' },
                  { l: 'Age', v: '58 years' },
                  { l: 'Gender', v: 'Male' },
                  { l: 'Mobile', v: '9876543210' },
                  { l: 'Category', v: 'BPL' },
                  { l: 'Occupation', v: 'Farmer' },
                ].map(item => (
                  <div key={item.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F5F5F5' }}>
                    <span style={{ fontSize: 12, color: '#9E9E9E' }}>{item.l}</span>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>{item.v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="card mb-16">
                <div className="card-header"><h3>Address</h3></div>
                <div className="card-body">
                  {[
                    { l: 'Village / Ward', v: 'Patamata' },
                    { l: 'Mandal', v: 'Vijayawada' },
                    { l: 'District', v: 'Krishna' },
                    { l: 'State', v: 'Andhra Pradesh' },
                  ].map(item => (
                    <div key={item.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F5F5F5' }}>
                      <span style={{ fontSize: 12, color: '#9E9E9E' }}>{item.l}</span>
                      <span style={{ fontSize: 13, fontWeight: 700 }}>{item.v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <div className="card-header"><h3>Medical Summary</h3></div>
                <div className="card-body">
                  {[
                    { l: 'Diagnosis', v: 'Presbyopia' },
                    { l: 'Known Conditions', v: 'Diabetes Mellitus' },
                    { l: 'Last Screening', v: '02 Jun 2025' },
                    { l: 'Last Camp', v: 'Vijayawada Urban Camp' },
                  ].map(item => (
                    <div key={item.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F5F5F5' }}>
                      <span style={{ fontSize: 12, color: '#9E9E9E' }}>{item.l}</span>
                      <span style={{ fontSize: 13, fontWeight: 700 }}>{item.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
            <button className="btn btn-primary">✏️ Edit Profile</button>
            <button className="btn btn-outline">📋 Download Record</button>
          </div>
        </main>
      </div>
    </div>
  );
}
