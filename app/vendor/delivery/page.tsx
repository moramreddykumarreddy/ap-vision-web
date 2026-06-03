'use client';
import { useState } from 'react';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import Modal, { SuccessBanner } from '@/app/components/Modal';

export default function DeliveryVerification() {
  const [orderId, setOrderId] = useState('');
  const [verified, setVerified] = useState(false);
  const [recipientName, setRecipientName] = useState('');

  // Modal / Interaction State
  const [qrOpen, setQrOpen] = useState(false);
  const [qrScanning, setQrScanning] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraCapturing, setCameraCapturing] = useState(false);
  const [signatureOpen, setSignatureOpen] = useState(false);

  // Status flags
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [photoData, setPhotoData] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSimulateScan = () => {
    setQrScanning(true);
    setTimeout(() => {
      setQrScanning(false);
      setOrderId('ORD-001');
      setVerified(true);
      setQrOpen(false);
    }, 1500);
  };

  const handleCapturePhoto = () => {
    setCameraCapturing(true);
    setTimeout(() => {
      setCameraCapturing(false);
      setPhotoData('📸 Spectacle Delivery Package Photo (Verified)');
      setCameraOpen(false);
    }, 1500);
  };

  const handleCaptureSignature = () => {
    setSignatureData('✍️ Signature Captured (Ramaiah V.)');
    setSignatureOpen(false);
  };

  const handleConfirmDelivery = () => {
    if (!recipientName.trim()) {
      alert('Please enter recipient name first.');
      return;
    }
    setSuccessMsg('Delivery confirmed! Spectacles marked as Delivered.');
    setTimeout(() => {
      setSuccessMsg('');
      setOrderId('');
      setVerified(false);
      setRecipientName('');
      setSignatureData(null);
      setPhotoData(null);
    }, 2000);
  };

  return (
    <div className="app-layout">
      <Sidebar role="vendor" userName="Vision Plus Ltd" userSub="Spectacle Vendor" />
      <div className="main-content">
        <Topbar title="Delivery Verification" subtitle="Confirm spectacle delivery to patients" />
        <main className="page-body">
          <div style={{ maxWidth: 600 }}>
            {successMsg ? (
              <div className="card animate-fade-up">
                <div className="card-body">
                  <SuccessBanner message={successMsg} />
                </div>
              </div>
            ) : (
              <>
                <div className="card mb-20">
                  <div className="card-header"><h3>Scan / Enter Order ID</h3></div>
                  <div className="card-body">
                    <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
                      <input className="form-input" style={{ flex: 1 }} id="order-id-input" placeholder="Enter Order ID (e.g. ORD-001)" value={orderId} onChange={e => setOrderId(e.target.value)} />
                      <button className="btn btn-outline" onClick={() => setQrOpen(true)}>📷 Scan QR</button>
                    </div>
                    <button className="btn btn-primary btn-full" onClick={() => { if (orderId.trim()) setVerified(true); }}>🔍 Verify Order</button>
                  </div>
                </div>

                {verified && (
                  <div className="card animate-fade-up">
                    <div className="card-header">
                      <h3>Order Verification</h3>
                      <span className="badge badge-success">✅ Found</span>
                    </div>
                    <div className="card-body">
                      <div style={{ background: '#F5F5F5', borderRadius: 10, padding: 16, marginBottom: 16 }}>
                        {[
                          { l: 'Order ID', v: 'ORD-001' },
                          { l: 'Patient Name', v: 'Ramaiah Venkata' },
                          { l: 'APV ID', v: 'APV-001234' },
                          { l: 'Lens Type', v: 'Bifocal • Full Rim' },
                          { l: 'Quantity', v: '1 pair' },
                          { l: 'Power (OD)', v: '+1.25/-0.50×90' },
                          { l: 'Power (OS)', v: '+1.00/-0.25×80' },
                        ].map(item => (
                          <div key={item.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #E0E0E0' }}>
                            <span style={{ fontSize: 12, color: '#9E9E9E' }}>{item.l}</span>
                            <span style={{ fontSize: 13, fontWeight: 700 }}>{item.v}</span>
                          </div>
                        ))}
                      </div>

                      <div className="form-group">
                        <label className="form-label">Recipient Name (Person Collecting)</label>
                        <input id="recipient-name" className="form-input" placeholder="Enter recipient name" value={recipientName} onChange={e => setRecipientName(e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Signature / Thumb Impression</label>
                        <div
                          onClick={() => setSignatureOpen(true)}
                          style={{
                            border: '2px dashed #E0E0E0', borderRadius: 10, height: 80,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: signatureData ? '#2E7D32' : '#BDBDBD', cursor: 'pointer', fontSize: 13,
                            background: signatureData ? 'rgba(46,125,50,0.05)' : 'transparent',
                            fontWeight: signatureData ? 700 : 400,
                          }}
                        >
                          {signatureData || '✍️ Tap to capture signature'}
                        </div>
                      </div>

                      {photoData && (
                        <div style={{ padding: '8px 12px', background: 'rgba(46,125,50,0.05)', border: '1px solid rgba(46,125,50,0.2)', borderRadius: 8, color: '#2E7D32', fontSize: 12, fontWeight: 700, marginBottom: 16, display: 'flex', gap: 6 }}>
                          <span>✅</span> {photoData}
                        </div>
                      )}

                      <div style={{ display: 'flex', gap: 10 }}>
                        <button className="btn btn-accent btn-full" onClick={() => setCameraOpen(true)}>📷 Capture Photo</button>
                        <button className="btn btn-primary btn-full" onClick={handleConfirmDelivery}>✅ Confirm Delivery</button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* QR Scan Modal */}
          <Modal
            open={qrOpen}
            onClose={() => setQrOpen(false)}
            title="Scan Order QR Code"
            subtitle="Position the spectacle packet barcode or QR in the scan view"
            actions={
              <button className="btn btn-outline" onClick={() => setQrOpen(false)} disabled={qrScanning}>Cancel</button>
            }
          >
            {qrScanning ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div className="spinner" style={{ margin: '0 auto 16px' }} />
                <div style={{ fontSize: 14, fontWeight: 700, color: '#1A3A6B' }}>Reading barcode...</div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 200, height: 200, border: '3px dashed #1A3A6B', background: '#ECEFF1', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 44 }}>🔲</span>
                </div>
                <div style={{ fontSize: 12, color: '#757575', textAlign: 'center' }}>
                  Place code inside the frame to scan. Click below to simulate.
                </div>
                <button className="btn btn-sm btn-outline" onClick={handleSimulateScan}>Simulate Scan (ORD-001)</button>
              </div>
            )}
          </Modal>

          {/* Signature Capture Modal */}
          <Modal
            open={signatureOpen}
            onClose={() => setSignatureOpen(false)}
            title="Draw Signature"
            subtitle="Draw signature or thumb impression on the screen pad"
            actions={
              <>
                <button className="btn btn-outline" onClick={() => setSignatureOpen(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleCaptureSignature}>Save Signature</button>
              </>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ border: '2px solid #E0E0E0', borderRadius: 12, height: 180, background: '#FAFAFA', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', cursor: 'crosshair' }}>
                {/* Mock draw line */}
                <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                  <path d="M 50 100 Q 120 40 220 120 T 320 80" fill="none" stroke="#0D2347" strokeWidth="3.5" />
                </svg>
                <div style={{ position: 'absolute', bottom: 8, left: 12, fontSize: 11, color: '#9E9E9E' }}>Sign Above</div>
                <div style={{ position: 'absolute', bottom: 8, right: 12, fontSize: 11, color: '#9E9E9E' }}>[Clear]</div>
              </div>
            </div>
          </Modal>

          {/* Camera Capture Modal */}
          <Modal
            open={cameraOpen}
            onClose={() => setCameraOpen(false)}
            title="Verify Delivery Handover Photo"
            subtitle="Take a photo of patient receiving the spectacles"
            actions={
              <button className="btn btn-outline" onClick={() => setCameraOpen(false)} disabled={cameraCapturing}>Cancel</button>
            }
          >
            {cameraCapturing ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div className="spinner" style={{ margin: '0 auto 16px' }} />
                <div style={{ fontSize: 14, fontWeight: 700, color: '#1A3A6B' }}>Saving photo...</div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                <div style={{ width: '100%', height: 220, background: '#ECEFF1', border: '1px solid #B0BEC5', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                  <span style={{ fontSize: 48 }}>👨‍🦳🕶️</span>
                  <div style={{ position: 'absolute', bottom: 10, left: 0, right: 0, textAlign: 'center', fontSize: 11, color: '#455A64', fontWeight: 600 }}>Camera Preview (Handover spectacles)</div>
                </div>
                <button className="btn btn-primary" onClick={handleCapturePhoto} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  📸 Click Shutter
                </button>
              </div>
            )}
          </Modal>
        </main>
      </div>
    </div>
  );
}

