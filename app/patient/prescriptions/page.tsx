'use client';
import { useState } from 'react';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { StatusBadge } from '@/app/components/ui';
import Modal, { SuccessBanner, downloadFile } from '@/app/components/Modal';

const prescriptions = [
  { id: 'RX-001', date: '02 Jun 2025', doctor: 'Dr. Srinivasa Rao', diagnosis: 'Presbyopia', odSphere: '+1.25', odCyl: '-0.50', odAxis: '90', osSphere: '+1.00', osCyl: '-0.25', osAxis: '80', add: '+2.00', type: 'Bifocal', status: 'Active' },
  { id: 'RX-002', date: '10 Jan 2025', doctor: 'Dr. Priya Devi', diagnosis: 'Myopia', odSphere: '-2.00', odCyl: '-0.50', odAxis: '175', osSphere: '-1.75', osCyl: '-0.25', osAxis: '170', add: 'N/A', type: 'Single Vision', status: 'Old' },
];

export default function PrescriptionList() {
  const [shareRx, setShareRx] = useState<typeof prescriptions[0] | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const getRxText = (rx: typeof prescriptions[0]) => {
    return `==================================================
AP DIGITAL VISION PROGRAM - PRESCRIPTION
==================================================
Prescription ID: ${rx.id}
Date: ${rx.date}
Doctor: ${rx.doctor}
Diagnosis: ${rx.diagnosis}
Lens Type: ${rx.type}
Status: ${rx.status}

REFRACTION DETAILS:
Right Eye (OD) - Sphere: ${rx.odSphere} | Cylinder: ${rx.odCyl} | Axis: ${rx.odAxis}
Left Eye (OS)  - Sphere: ${rx.osSphere} | Cylinder: ${rx.osCyl} | Axis: ${rx.osAxis}
Add Power: ${rx.add}
==================================================`;
  };

  const handlePrint = (rx: typeof prescriptions[0]) => {
    downloadFile(`Print_${rx.id}.txt`, getRxText(rx));
  };

  const handleDownload = (rx: typeof prescriptions[0]) => {
    downloadFile(`Prescription_${rx.id}.pdf`, getRxText(rx));
  };

  const handleCopyLink = () => {
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 1500);
  };

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
                    <button className="btn btn-primary btn-sm" onClick={() => handlePrint(rx)}>🖨️ Print</button>
                    <button className="btn btn-outline btn-sm" onClick={() => setShareRx(rx)}>📱 Share</button>
                    <button className="btn btn-outline btn-sm" onClick={() => handleDownload(rx)}>💾 Download PDF</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Share Modal */}
          {shareRx && (
            <Modal
              open={!!shareRx}
              onClose={() => setShareRx(null)}
              title="Share Prescription"
              subtitle={`Prescription ID: ${shareRx.id}`}
              actions={
                <button className="btn btn-primary" onClick={() => setShareRx(null)}>Close</button>
              }
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ fontSize: 13, color: '#424242' }}>
                  Share the digital prescription link with a pharmacy or clinic:
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    type="text"
                    readOnly
                    value={`https://apvision.ap.gov.in/rx/share/${shareRx.id}`}
                    style={{ flex: 1, padding: '8px 12px', borderRadius: 8, border: '1px solid #E0E0E0', fontSize: 12, background: '#F5F5F5', color: '#616161' }}
                  />
                  <button className="btn btn-sm btn-primary" onClick={handleCopyLink}>Copy</button>
                </div>
                {copySuccess && <SuccessBanner message="Prescription link copied to clipboard!" />}

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
                  <button className="btn btn-sm btn-outline" style={{ display: 'flex', gap: 10, justifyContent: 'center' }} onClick={handleCopyLink}>
                    💬 Share via WhatsApp
                  </button>
                  <button className="btn btn-sm btn-outline" style={{ display: 'flex', gap: 10, justifyContent: 'center' }} onClick={handleCopyLink}>
                    ✉️ Share via Email
                  </button>
                </div>
              </div>
            </Modal>
          )}
        </main>
      </div>
    </div>
  );
}

