'use client';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #0D2347, #1A3A6B, #2952A3)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      color: 'white', textAlign: 'center', padding: 24,
    }}>
      <div className="animate-fade-up" style={{
        width: 90, height: 90, borderRadius: 28,
        background: '#D4A017', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 36, fontWeight: 900, fontFamily: 'Outfit, sans-serif',
        color: '#0D2347', marginBottom: 24, boxShadow: '0 8px 32px rgba(212,160,23,.4)',
      }}>
        AP
      </div>
      <h1 className="animate-fade-up d1" style={{ fontSize: 32, fontWeight: 900, fontFamily: 'Outfit, sans-serif', marginBottom: 8 }}>
        AP Vision Care
      </h1>
      <p className="animate-fade-up d2" style={{ fontSize: 15, opacity: 0.7, marginBottom: 4 }}>
        Government of Andhra Pradesh
      </p>
      <p className="animate-fade-up d3" style={{ fontSize: 13, opacity: 0.5, marginBottom: 48 }}>
        Digital Vision Program 2024–25
      </p>

      <div className="animate-fade-up d4" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button className="btn btn-lg" style={{ background: '#D4A017', color: '#0D2347', fontWeight: 800 }}
          onClick={() => router.push('/role-selection')}>
          🚀 Get Started
        </button>
        <button className="btn btn-lg btn-outline" style={{ borderColor: 'rgba(255,255,255,.3)', color: 'white' }}
          onClick={() => router.push('/login')}>
          🔑 Login
        </button>
      </div>

      <div className="animate-fade-up d5" style={{ marginTop: 64, display: 'flex', gap: 32, opacity: 0.5, flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          { v: '1.2M+', l: 'Patients' },
          { v: '13', l: 'Districts' },
          { v: '248', l: 'Active Camps' },
          { v: '95%', l: 'Coverage' },
        ].map(k => (
          <div key={k.l} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: 'Outfit, sans-serif' }}>{k.v}</div>
            <div style={{ fontSize: 11 }}>{k.l}</div>
          </div>
        ))}
      </div>

      <p style={{ position: 'absolute', bottom: 20, fontSize: 11, opacity: 0.35 }}>
        For support, call: 1800-XXX-XXXX (Toll Free)
      </p>
    </div>
  );
}
