'use client';
import { useState, useRef, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function OtpContent() {
  const router = useRouter();
  const params = useSearchParams();
  const mobile = params.get('mobile') ?? '';
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const inputs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    const interval = setInterval(() => setTimer(t => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleKey = (i: number, val: string) => {
    const d = val.slice(-1);
    const next = [...otp];
    next[i] = d;
    setOtp(next);
    if (d && i < 5) inputs.current[i + 1]?.focus();
  };

  const handleBackspace = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) inputs.current[i - 1]?.focus();
  };

  const handleVerify = async () => {
    if (otp.join('').length < 6) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    router.push('/role-selection');
  };

  return (
    <div className="auth-page">
      <div className="auth-card animate-fade-up" style={{ maxWidth: 400 }}>
        <div className="auth-logo">
          <img src="/apvision.png" alt="AP Vision Care" style={{ width: 72, height: 72, borderRadius: 18, objectFit: 'contain', background: '#f0f4ff', padding: 6, margin: '0 auto 12px', display: 'block', boxShadow: '0 4px 20px rgba(26,58,107,0.15)' }} />
          <h1>OTP Verification</h1>
          <p>Code sent to +91 {mobile}</p>
        </div>

        <p style={{ textAlign: 'center', fontSize: 13, color: '#757575', marginBottom: 28 }}>
          Enter the 6-digit OTP sent to your mobile
        </p>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 24 }}>
          {otp.map((v, i) => (
            <input
              key={i}
              ref={el => { if (el) inputs.current[i] = el; }}
              className="form-input"
              id={`otp-${i}`}
              style={{ width: 48, height: 56, textAlign: 'center', fontSize: 22, fontWeight: 800, padding: 0 }}
              value={v}
              onChange={e => handleKey(i, e.target.value)}
              onKeyDown={e => handleBackspace(i, e)}
              maxLength={1}
            />
          ))}
        </div>

        {/* Demo hint */}
        <div style={{ background: '#F5F5F5', borderRadius: 8, padding: '8px 12px', fontSize: 12, color: '#757575', textAlign: 'center', marginBottom: 16 }}>
          💡 Demo: Enter any 6 digits to proceed
        </div>

        <button
          id="verify-otp-btn"
          className="btn btn-primary btn-full btn-lg"
          onClick={handleVerify}
          disabled={loading || otp.join('').length < 6}
        >
          {loading ? '⏳ Verifying...' : '✅ Verify OTP'}
        </button>

        <div style={{ textAlign: 'center', marginTop: 16 }}>
          {timer > 0 ? (
            <p style={{ fontSize: 12, color: '#9E9E9E' }}>Resend OTP in {timer}s</p>
          ) : (
            <button className="btn btn-ghost" style={{ fontSize: 12 }} onClick={() => setTimer(30)}>
              🔄 Resend OTP
            </button>
          )}
        </div>

        <button className="btn btn-ghost btn-full" style={{ marginTop: 8, fontSize: 12 }}
          onClick={() => router.push('/login')}>
          ← Change Number
        </button>
      </div>
    </div>
  );
}

export default function OtpPage() {
  return (
    <Suspense fallback={<div className="auth-page"><div className="auth-card">Loading...</div></div>}>
      <OtpContent />
    </Suspense>
  );
}
