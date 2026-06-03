'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import Modal, { DetailRow, SuccessBanner } from '@/app/components/Modal';

export default function VideoConsultation() {
  const router = useRouter();
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const [notes, setNotes] = useState('');

  // Modal State
  const [rxOpen, setRxOpen] = useState(false);
  const [referOpen, setReferOpen] = useState(false);
  const [imagesOpen, setImagesOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Prescription Form State
  const [odSphere, setOdSphere] = useState('+1.25');
  const [osSphere, setOsSphere] = useState('+1.00');
  const [odCyl, setOdCyl] = useState('-0.50');
  const [osCyl, setOsCyl] = useState('-0.25');
  const [lensType, setLensType] = useState('Bifocal');

  // Referral Form State
  const [hospital, setHospital] = useState('SVIMS, Tirupati');
  const [reason, setReason] = useState('Diabetic Retinopathy Check');
  const [urgent, setUrgent] = useState('Routine');

  const handleSaveRx = () => {
    setSuccessMsg('Prescription successfully issued and synced to EMR!');
    setTimeout(() => {
      setRxOpen(false);
      setSuccessMsg('');
    }, 1500);
  };

  const handleSaveReferral = () => {
    setSuccessMsg('Referral submitted successfully!');
    setTimeout(() => {
      setReferOpen(false);
      setSuccessMsg('');
    }, 1500);
  };

  return (
    <div className="app-layout">
      <Sidebar role="tele" userName="Dr. Anita Rao" userSub="SVIMS, Tirupati" />
      <div className="main-content">
        <Topbar title="Video Consultation" subtitle="Ramaiah Venkata • Diabetic Retinopathy" />
        <main className="page-body">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
            {/* Video */}
            <div>
              <div className="video-container">
                <div className="video-placeholder">
                  <div style={{ fontSize: 48 }}>👤</div>
                  <div style={{ fontSize: 16, fontWeight: 600 }}>Ramaiah Venkata</div>
                  <div style={{ fontSize: 12 }}>Vijayawada Urban Camp</div>
                  {videoOff && <div style={{ marginTop: 8, background: 'rgba(255,255,255,.1)', padding: '4px 12px', borderRadius: 20, fontSize: 12 }}>📷 Camera Off</div>}
                </div>
                {/* Self preview */}
                <div style={{
                  position: 'absolute', bottom: 12, right: 12,
                  width: 100, height: 75, borderRadius: 10,
                  background: '#1A3A6B', border: '2px solid rgba(255,255,255,.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,.7)', fontSize: 12,
                }}>You</div>
                {/* Timer */}
                <div style={{
                  position: 'absolute', top: 12, left: 12,
                  background: 'rgba(0,0,0,.5)', borderRadius: 20, padding: '4px 12px',
                  color: 'white', fontSize: 13, fontWeight: 700,
                }}>● 00:12:34</div>
              </div>

              {/* Controls */}
              <div style={{ background: '#1C2333', borderRadius: '0 0 20px 20px', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
                <button className="video-btn video-btn-grey" onClick={() => setMuted(!muted)} title="Mute" style={{ background: muted ? '#C62828' : 'rgba(255,255,255,.1)' }}>
                  {muted ? '🔇' : '🎙️'}
                </button>
                <button className="video-btn video-btn-grey" onClick={() => setVideoOff(!videoOff)} title="Video" style={{ background: videoOff ? '#C62828' : 'rgba(255,255,255,.1)' }}>
                  {videoOff ? '📷' : '📹'}
                </button>
                <button className="video-btn video-btn-grey" title="Screen Share">🖥️</button>
                <button className="video-btn video-btn-red" onClick={() => router.push('/tele/consultations')} title="End Call">📵</button>
              </div>
            </div>

            {/* Patient Info + Notes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Patient card */}
              <div className="card">
                <div className="card-header"><h3>Patient Details</h3></div>
                <div className="card-body">
                  {[
                    { l: 'Name', v: 'Ramaiah Venkata' },
                    { l: 'Age / Gender', v: '58 years • Male' },
                    { l: 'Village', v: 'Patamata, Krishna' },
                    { l: 'APV ID', v: 'APV-001234' },
                    { l: 'Condition', v: 'Diabetic Retinopathy' },
                    { l: 'Referred by', v: 'Dr. Srinivasa Rao' },
                  ].map(item => (
                    <div key={item.l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 11, color: '#9E9E9E' }}>{item.l}</span>
                      <span style={{ fontSize: 12, fontWeight: 700 }}>{item.v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="card" style={{ flex: 1 }}>
                <div className="card-header"><h3>Consultation Notes</h3></div>
                <div className="card-body">
                  <textarea
                    id="consultation-notes"
                    className="form-input"
                    style={{ height: 80, resize: 'none', fontSize: 13, marginBottom: 12 }}
                    placeholder="Add clinical notes, observations, diagnosis..."
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                  />
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={() => setRxOpen(true)}>💊 Write Prescription</button>
                    <button className="btn btn-sm" style={{ background: '#C62828', color: 'white', flex: 1 }} onClick={() => setReferOpen(true)}>🏥 Refer Patient</button>
                  </div>
                </div>
              </div>

              {/* Fundus image placeholder */}
              <div className="card">
                <div className="card-header"><h3>Retinal Images</h3></div>
                <div className="card-body" style={{ textAlign: 'center', color: '#BDBDBD', padding: '12px 16px' }}>
                  <div style={{ fontSize: 24, marginBottom: 4 }}>👁️</div>
                  <div style={{ fontSize: 11 }}>Retinal fundus scans captured at camp</div>
                  <button className="btn btn-outline btn-sm" style={{ marginTop: 8 }} onClick={() => setImagesOpen(true)}>View Images</button>
                </div>
              </div>
            </div>
          </div>

          {/* Write Prescription Modal */}
          <Modal
            open={rxOpen}
            onClose={() => setRxOpen(false)}
            title="Write Spectacle Prescription"
            subtitle="Add refraction coordinates for spects dispensing"
            actions={
              <>
                <button className="btn btn-outline" onClick={() => setRxOpen(false)} disabled={!!successMsg}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSaveRx} disabled={!!successMsg}>Issue Prescription</button>
              </>
            }
          >
            {successMsg ? (
              <SuccessBanner message={successMsg} />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <label style={{ fontSize: 11, fontWeight: 700 }}>Right Eye OD Sphere</label>
                    <input type="text" value={odSphere} onChange={e => setOdSphere(e.target.value)} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #E0E0E0', fontSize: 13 }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <label style={{ fontSize: 11, fontWeight: 700 }}>Left Eye OS Sphere</label>
                    <input type="text" value={osSphere} onChange={e => setOsSphere(e.target.value)} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #E0E0E0', fontSize: 13 }} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <label style={{ fontSize: 11, fontWeight: 700 }}>Right Eye OD Cylinder</label>
                    <input type="text" value={odCyl} onChange={e => setOdCyl(e.target.value)} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #E0E0E0', fontSize: 13 }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <label style={{ fontSize: 11, fontWeight: 700 }}>Left Eye OS Cylinder</label>
                    <input type="text" value={osCyl} onChange={e => setOsCyl(e.target.value)} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #E0E0E0', fontSize: 13 }} />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <label style={{ fontSize: 11, fontWeight: 700 }}>Lens Type</label>
                  <select value={lensType} onChange={e => setLensType(e.target.value)} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #E0E0E0', fontSize: 13, background: 'white' }}>
                    <option value="Single Vision">Single Vision</option>
                    <option value="Bifocal">Bifocal</option>
                    <option value="Progressive">Progressive</option>
                  </select>
                </div>
              </div>
            )}
          </Modal>

          {/* Refer Patient Modal */}
          <Modal
            open={referOpen}
            onClose={() => setReferOpen(false)}
            title="Refer Patient to Hospital"
            subtitle="Referral pathway for surgical or advanced clinical assessment"
            actions={
              <>
                <button className="btn btn-outline" onClick={() => setReferOpen(false)} disabled={!!successMsg}>Cancel</button>
                <button className="btn btn-primary" style={{ background: '#C62828', borderColor: '#C62828' }} onClick={handleSaveReferral} disabled={!!successMsg}>Submit Referral</button>
              </>
            }
          >
            {successMsg ? (
              <SuccessBanner message={successMsg} />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <label style={{ fontSize: 11, fontWeight: 700 }}>Select Referral Hospital</label>
                  <select value={hospital} onChange={e => setHospital(e.target.value)} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #E0E0E0', fontSize: 13, background: 'white' }}>
                    <option value="SVIMS, Tirupati">SVIMS, Tirupati</option>
                    <option value="Government General Hospital, Vijayawada">Government General Hospital, Vijayawada</option>
                    <option value="LV Prasad Eye Institute, Vijayawada">LV Prasad Eye Institute, Vijayawada</option>
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <label style={{ fontSize: 11, fontWeight: 700 }}>Urgency Level</label>
                  <select value={urgent} onChange={e => setUrgent(e.target.value)} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #E0E0E0', fontSize: 13, background: 'white' }}>
                    <option value="Routine">Routine</option>
                    <option value="Urgent">Urgent / Priority</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <label style={{ fontSize: 11, fontWeight: 700 }}>Referral Reason / Diagnosis</label>
                  <textarea value={reason} onChange={e => setReason(e.target.value)} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #E0E0E0', fontSize: 13, height: 70, resize: 'none' }} />
                </div>
              </div>
            )}
          </Modal>

          {/* View Images Modal */}
          <Modal
            open={imagesOpen}
            onClose={() => setImagesOpen(false)}
            title="Patient Retinal Scans"
            subtitle="APV-001234 • Ramaiah Venkata"
            actions={
              <button className="btn btn-primary" onClick={() => setImagesOpen(false)}>Close</button>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center' }}>
              <div style={{
                width: 280, height: 280,
                borderRadius: '50%',
                background: 'radial-gradient(circle, #F57C00 20%, #E65100 80%)',
                border: '4px solid #3E2723',
                position: 'relative',
                boxShadow: 'inset 0 0 40px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}>
                {/* optic disc */}
                <div style={{
                  position: 'absolute', right: '20%', top: '35%',
                  width: 50, height: 60,
                  borderRadius: '50%',
                  background: '#FFE082',
                  boxShadow: '0 0 15px #FFD54F',
                  opacity: 0.95,
                }} />
                {/* macula */}
                <div style={{
                  position: 'absolute', left: '25%', top: '45%',
                  width: 30, height: 30,
                  borderRadius: '50%',
                  background: '#D84315',
                  opacity: 0.8,
                }} />
                {/* blood vessels representation using lines */}
                <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                  <path d="M 224 126 Q 180 80 120 100" fill="none" stroke="#D32F2F" strokeWidth="2.5" opacity="0.85" />
                  <path d="M 224 126 Q 160 180 100 200" fill="none" stroke="#D32F2F" strokeWidth="2" opacity="0.8" />
                  <path d="M 224 126 Q 260 80 270 90" fill="none" stroke="#D32F2F" strokeWidth="1.5" opacity="0.75" />
                  <path d="M 224 126 Q 250 190 260 210" fill="none" stroke="#D32F2F" strokeWidth="2.5" opacity="0.8" />
                  {/* microaneurysms */}
                  <circle cx="150" cy="120" r="3" fill="#B71C1C" />
                  <circle cx="120" cy="160" r="2.5" fill="#B71C1C" />
                  <circle cx="160" cy="180" r="4" fill="#B71C1C" />
                </svg>
              </div>
              <div style={{ fontSize: 12, color: '#757575', textAlign: 'center', lineHeight: 1.5 }}>
                Left Eye (OS) Fundus Scan showing mild microaneurysms and early stage Diabetic Retinopathy signs in macula region.
              </div>
            </div>
          </Modal>
        </main>
      </div>
    </div>
  );
}

