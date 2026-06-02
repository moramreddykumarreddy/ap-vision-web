'use client';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { StatusBadge } from '@/app/components/ui';

const prescriptions = [
  { id: 'RX-001', date: '02 Jun 2025', doctor: 'Dr. Srinivasa Rao', diagnosis: 'Presbyopia', odSphere: '+1.25', odCyl: '-0.50', odAxis: '90', osSphere: '+1.00', osCyl: '-0.25', osAxis: '80', add: '+2.00', type: 'Bifocal', status: 'Active' },
  { id: 'RX-002', date: '10 Jan 2025', doctor: 'Dr. Priya Devi', diagnosis: 'Myopia', odSphere: '-2.00', odCyl: '-0.50', odAxis: '175', osSphere: '-1.75', osCyl: '-0.25', osAxis: '170', add: 'N/A', type: 'Single Vision', status: 'Old' },
];

export default function PrescriptionList() {
  return (
    <div className="app-layout">
      <Sidebar role="patient" userName="Ramaiah Venkata" userSub="Patient" />
      <div className="main-content">
        <Topbar title="My Prescriptions" subtitle="All vision prescriptions" />
        <main className="page-body">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {prescriptions.map((rx, i) => (
              <div key={rx.id} className={`card animate-fade-up d${i + 1}`}>
                <div className="card-header">
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 15 }}>{rx.diagnosis}</div>
                    <div style={{ fontSize: 11, color: '#9E9E9E' }}>{rx.id} • {rx.date} • {rx.doctor}</div>
                  </div>
                  <StatusBadge label={rx.status} />
                </div>
                <div className="card-body">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                    {['Right Eye (OD)', 'Left Eye (OS)'].map(eye => (
                      <div key={eye} style={{ border: '1px solid #E0E0E0', borderRadius: 10, padding: 14 }}>
                        <div style={{ fontSize: 11, fontWeight: 800, color: '#1A3A6B', marginBottom: 10 }}>{eye}</div>
                        {[
                          ['Sphere', eye.includes('OD') ? rx.odSphere : rx.osSphere],
                          ['Cylinder', eye.includes('OD') ? rx.odCyl : rx.osCyl],
                          ['Axis', eye.includes('OD') ? rx.odAxis : rx.osAxis],
                          ['Add', rx.add],
                        ].map(([l, v]) => (
                          <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                            <span style={{ color: '#9E9E9E' }}>{l}</span>
                            <span style={{ fontWeight: 700 }}>{v}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: 12, color: '#757575', marginBottom: 14 }}>Lens Type: <strong>{rx.type}</strong></div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn btn-primary btn-sm">🖨️ Print</button>
                    <button className="btn btn-outline btn-sm">📱 Share</button>
                    <button className="btn btn-outline btn-sm">💾 Download PDF</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
