'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length !== 10) { setError('Enter a valid 10-digit mobile number'); return; }
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    router.push(`/otp?mobile=${mobile}`);
  };

  return (
    <div className="auth-page">
      {/* Background orbs */}
      <div style={{ position: 'absolute', top: '10%', left: '10%', width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,.03)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '15%', right: '8%', width: 200, height: 200, borderRadius: '50%', background: 'rgba(212,160,23,.05)', pointerEvents: 'none' }} />

      <div className="auth-card animate-fade-up">
        <div className="auth-logo">
          <div className="auth-logo-circle">AP</div>
          <h1>AP Vision Program</h1>
          <p>Government of Andhra Pradesh</p>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1A3A6B', marginBottom: 4 }}>Sign In</h2>
        <p style={{ fontSize: 13, color: '#9E9E9E', marginBottom: 24 }}>Enter your mobile number to continue</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Mobile Number</label>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                display: 'flex', alignItems: 'center', gap: 6,
                fontSize: 13, fontWeight: 600, color: '#616161',
              }}>
                📱 +91
              </div>
              <input
                id="mobile-input"
                className="form-input"
                style={{ paddingLeft: 70 }}
                type="tel"
                maxLength={10}
                placeholder="98765 43210"
                value={mobile}
                onChange={e => { setMobile(e.target.value.replace(/\D/g, '')); setError(''); }}
              />
            </div>
            {error && <p style={{ color: '#C62828', fontSize: 11, marginTop: 4 }}>{error}</p>}
          </div>

          <button
            id="send-otp-btn"
            type="submit"
            className="btn btn-primary btn-full btn-lg"
            disabled={loading}
          >
            {loading ? '⏳ Sending OTP...' : 'Send OTP →'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <button className="btn btn-ghost" style={{ fontSize: 12 }}>Forgot Session? Contact Admin</button>
        </div>

        <div style={{ textAlign: 'center', marginTop: 24, padding: '16px 0', borderTop: '1px solid #EEEEEE' }}>
          <p style={{ fontSize: 11, color: '#BDBDBD' }}>For support, call: 1800-XXX-XXXX (Toll Free)</p>
        </div>

        <button className="btn btn-ghost btn-full" style={{ marginTop: 8, fontSize: 12 }}
          onClick={() => router.push('/')}>
          ← Back to Home
        </button>
      </div>
    </div>
  );
}
