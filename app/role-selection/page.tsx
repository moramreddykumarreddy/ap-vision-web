'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const roles = [
  { id: 'admin', icon: '👑', title: 'Super Admin', desc: 'State-level administration', href: '/admin/dashboard', color: '#1A3A6B' },
  { id: 'nodal', icon: '🏢', title: 'Nodal Officer', desc: 'District management', href: '/nodal/dashboard', color: '#1A3A6B' },
  { id: 'screening', icon: '🔬', title: 'Screening Team', desc: 'Camp & patient screening', href: '/screening/dashboard', color: '#1A3A6B' },
  { id: 'tele', icon: '👁️', title: 'Tele-Ophthalmologist', desc: 'Remote consultations', href: '/tele/dashboard', color: '#1A3A6B' },
  { id: 'vendor', icon: '🏭', title: 'Vendor', desc: 'Spectacle supply & delivery', href: '/vendor/dashboard', color: '#1A3A6B' },
  { id: 'patient', icon: '🧑‍⚕️', title: 'Patient', desc: 'My health records', href: '/patient/dashboard', color: '#1A3A6B' },
];

export default function RoleSelectionPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  const handleContinue = () => {
    const role = roles.find(r => r.id === selected);
    if (role) router.push(role.href);
  };

  return (
    <div className="auth-page" style={{ flexDirection: 'column', gap: 0 }}>
      <div style={{ textAlign: 'center', marginBottom: 32, color: 'white' }}>
        <img src="/apvision.png" alt="AP Vision Care" style={{ width: 64, height: 64, borderRadius: 18, objectFit: 'contain', background: 'rgba(255,255,255,0.95)', padding: 6, margin: '0 auto 12px', display: 'block', boxShadow: '0 8px 28px rgba(0,0,0,0.25)' }} />
        <h1 style={{ fontSize: 22, fontWeight: 900, fontFamily: 'Outfit, sans-serif', marginBottom: 4 }}>Select Your Role</h1>
        <p style={{ fontSize: 13, opacity: 0.65 }}>Choose the role to continue to your dashboard</p>
      </div>

      <div style={{ background: 'white', borderRadius: 20, padding: 32, width: '100%', maxWidth: 540, boxShadow: '0 20px 60px rgba(0,0,0,.2)' }} className="animate-fade-up">
        <div className="role-grid">
          {roles.map((role, i) => (
            <div
              key={role.id}
              id={`role-${role.id}`}
              className={`role-card animate-fade-up d${i + 1}${selected === role.id ? ' selected' : ''}`}
              onClick={() => setSelected(role.id)}
            >
              <div className="role-icon">{role.icon}</div>
              <div className="role-title">{role.title}</div>
              <div className="role-desc">{role.desc}</div>
            </div>
          ))}
        </div>

        <button
          id="continue-btn"
          className="btn btn-primary btn-full btn-lg"
          style={{ marginTop: 20 }}
          disabled={!selected}
          onClick={handleContinue}
        >
          Continue as {selected ? roles.find(r => r.id === selected)?.title : '...'} →
        </button>
      </div>

      <button className="btn btn-ghost" style={{ marginTop: 16, color: 'rgba(255,255,255,.6)', fontSize: 12 }}
        onClick={() => router.push('/login')}>
        ← Back to Login
      </button>
    </div>
  );
}
