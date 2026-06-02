'use client';
import { useState } from 'react';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';

export default function DeliveryVerification() {
  const [orderId, setOrderId] = useState('');
  const [verified, setVerified] = useState(false);
  const [recipientName, setRecipientName] = useState('');

  return (
    <div className="app-layout">
      <Sidebar role="vendor" userName="Vision Plus Ltd" userSub="Spectacle Vendor" />
      <div className="main-content">
        <Topbar title="Delivery Verification" subtitle="Confirm spectacle delivery to patients" />
        <main className="page-body">
          <div style={{ maxWidth: 600 }}>
            <div className="card mb-20">
              <div className="card-header"><h3>Scan / Enter Order ID</h3></div>
              <div className="card-body">
                <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
                  <input className="form-input" style={{ flex: 1 }} id="order-id-input" placeholder="Enter Order ID (e.g. ORD-001)" value={orderId} onChange={e => setOrderId(e.target.value)} />
                  <button className="btn btn-outline">📷 Scan QR</button>
                </div>
                <button className="btn btn-primary btn-full" onClick={() => setVerified(true)}>🔍 Verify Order</button>
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
                    <div style={{ border: '2px dashed #E0E0E0', borderRadius: 10, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#BDBDBD', cursor: 'pointer', fontSize: 13 }}>
                      ✍️ Tap to capture signature
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 10 }}>
                    <button className="btn btn-accent btn-full">📷 Capture Photo</button>
                    <button className="btn btn-primary btn-full">✅ Confirm Delivery</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
