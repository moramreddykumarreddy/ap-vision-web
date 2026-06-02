'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';

export default function VideoConsultation() {
  const router = useRouter();
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const [notes, setNotes] = useState('');

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
                    style={{ height: 150, resize: 'none', fontSize: 13 }}
                    placeholder="Add clinical notes, observations, diagnosis..."
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                  />
                  <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                    <button className="btn btn-primary btn-sm" style={{ flex: 1 }}>💊 Write Prescription</button>
                    <button className="btn btn-sm" style={{ background: '#C62828', color: 'white', flex: 1 }}>🏥 Refer Patient</button>
                  </div>
                </div>
              </div>

              {/* Fundus image placeholder */}
              <div className="card">
                <div className="card-header"><h3>Retinal Images</h3></div>
                <div className="card-body" style={{ textAlign: 'center', color: '#BDBDBD' }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>👁️</div>
                  <div style={{ fontSize: 12 }}>Fundus images will appear here</div>
                  <button className="btn btn-outline btn-sm" style={{ marginTop: 10 }}>View Images</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
