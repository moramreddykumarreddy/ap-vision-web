'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const NAV_TABS = [
  { id: 'home',     label: 'Home',        icon: '🏠' },
  { id: 'about',    label: 'About',       icon: '📋' },
  { id: 'services', label: 'Services',    icon: '🩺' },
  { id: 'camps',    label: 'Eye Camps',   icon: '⛺' },
  { id: 'contact',  label: 'Contact',     icon: '📞' },
];

const FEATURES = [
  { icon: '🔬', title: 'Smart Screening', desc: 'AI-powered eye screening camps across all 13 districts with real-time data capture and instant results.' },
  { icon: '📡', title: 'Tele-Ophthalmology', desc: 'Connect with specialist doctors remotely. Live video consultations bring expert care to rural communities.' },
  { icon: '🏥', title: 'End-to-End Care', desc: 'From screening to surgery – seamlessly manage the entire patient care journey on one unified platform.' },
  { icon: '📦', title: 'Supply Chain', desc: 'Real-time tracking of spectacles, medicines, and equipment from vendors to beneficiaries.' },
  { icon: '📊', title: 'Live Analytics', desc: 'District-level dashboards give nodal officers and administrators instant visibility into program metrics.' },
  { icon: '🔒', title: 'Secure & Private', desc: 'Government-grade security ensures patient data is protected end-to-end with role-based access control.' },
];

const STATS = [
  { value: '1.2M+', label: 'Patients Screened',  color: '#D4A017' },
  { value: '13',    label: 'Districts Covered',   color: '#00897B' },
  { value: '248',   label: 'Active Eye Camps',    color: '#2952A3' },
  { value: '95%',   label: 'Programme Coverage',  color: '#D4A017' },
  { value: '3,400+',label: 'Doctors & Paramedics',color: '#00897B' },
  { value: '98K+',  label: 'Specs Delivered',     color: '#2952A3' },
];

const SERVICES = [
  { icon: '👁️', title: 'Vision Screening', desc: 'Comprehensive eye check-up at your doorstep' },
  { icon: '👓', title: 'Free Spectacles',   desc: 'Government-funded spectacles for eligible beneficiaries' },
  { icon: '🏨', title: 'Surgical Referral', desc: 'Cataract & other surgeries at empanelled hospitals' },
  { icon: '💊', title: 'Medicine Supply',   desc: 'Essential eye medicines distributed at camps' },
];

export default function LandingPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Inter', sans-serif", background: '#f0f4ff' }}>

      {/* ─── Navbar ──────────────────────────────────────────── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999,
        background: 'rgba(13,35,71,0.82)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 4px 32px rgba(13,35,71,0.22)',
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          padding: '0 24px',
          height: 68,
          display: 'flex', alignItems: 'center', gap: 16,
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <div style={{
              width: 42, height: 42, borderRadius: 12,
              background: 'linear-gradient(135deg, #D4A017, #FFD54F)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 900, fontSize: 17, color: '#0D2347',
              fontFamily: "'Outfit', sans-serif",
              boxShadow: '0 4px 16px rgba(212,160,23,0.4)',
            }}>AP</div>
            <div>
              <div style={{ color: '#fff', fontWeight: 800, fontSize: 15, fontFamily: "'Outfit', sans-serif", lineHeight: 1.2 }}>AP Vision Care</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, lineHeight: 1.2 }}>Govt. of Andhra Pradesh</div>
            </div>
          </div>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Desktop Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }} className="nav-tabs-desktop">
            {NAV_TABS.map(tab => (
              <button
                key={tab.id}
                id={`nav-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: activeTab === tab.id
                    ? 'rgba(212,160,23,0.18)'
                    : 'transparent',
                  border: activeTab === tab.id
                    ? '1px solid rgba(212,160,23,0.4)'
                    : '1px solid transparent',
                  borderRadius: 10,
                  color: activeTab === tab.id ? '#FFD54F' : 'rgba(255,255,255,0.72)',
                  padding: '7px 14px',
                  fontSize: 13, fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 5,
                  transition: 'all 0.18s ease',
                }}
                onMouseEnter={e => {
                  if (activeTab !== tab.id) {
                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.07)';
                    (e.currentTarget as HTMLButtonElement).style.color = '#fff';
                  }
                }}
                onMouseLeave={e => {
                  if (activeTab !== tab.id) {
                    (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                    (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.72)';
                  }
                }}
              >
                <span style={{ fontSize: 14 }}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Login Button */}
          <button
            id="nav-login-btn"
            onClick={() => router.push('/login')}
            style={{
              background: 'linear-gradient(135deg, #D4A017, #FFD54F)',
              color: '#0D2347',
              border: 'none',
              borderRadius: 10,
              padding: '9px 22px',
              fontSize: 13, fontWeight: 800,
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6,
              boxShadow: '0 4px 16px rgba(212,160,23,0.35)',
              transition: 'all 0.18s ease',
              flexShrink: 0,
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 24px rgba(212,160,23,0.5)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 16px rgba(212,160,23,0.35)';
            }}
          >
            🔑 Login
          </button>

          {/* Mobile Hamburger */}
          <button
            id="nav-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            style={{
              display: 'none',
              background: 'transparent', border: 'none',
              color: 'white', fontSize: 22, cursor: 'pointer',
            }}
            className="nav-hamburger"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={{
            background: 'rgba(13,35,71,0.97)',
            padding: '12px 24px 20px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}>
            {NAV_TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setMenuOpen(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  width: '100%', background: 'transparent', border: 'none',
                  color: activeTab === tab.id ? '#FFD54F' : 'rgba(255,255,255,0.75)',
                  padding: '12px 0',
                  fontSize: 14, fontWeight: 600, cursor: 'pointer',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <span>{tab.icon}</span>{tab.label}
              </button>
            ))}
            <button
              onClick={() => router.push('/login')}
              style={{
                marginTop: 12, width: '100%',
                background: 'linear-gradient(135deg, #D4A017, #FFD54F)',
                color: '#0D2347', border: 'none', borderRadius: 10,
                padding: '12px', fontSize: 14, fontWeight: 800, cursor: 'pointer',
              }}
            >
              🔑 Login to Portal
            </button>
          </div>
        )}
      </nav>

      {/* ─── Hero Section ────────────────────────────────────── */}
      <section style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #061529 0%, #0D2347 45%, #1A3A6B 80%, #1a4a8a 100%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '100px 24px 60px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative blobs */}
        <div style={{
          position: 'absolute', top: '10%', left: '5%',
          width: 340, height: 340, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,160,23,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '15%', right: '8%',
          width: 420, height: 420, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,137,123,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '35%', right: '15%',
          width: 180, height: 180, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(41,82,163,0.25) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Badge */}
        <div className="animate-fade-up" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(212,160,23,0.12)',
          border: '1px solid rgba(212,160,23,0.3)',
          borderRadius: 100,
          padding: '6px 18px', marginBottom: 28,
          color: '#FFD54F', fontSize: 12, fontWeight: 700,
          letterSpacing: 0.5,
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#FFD54F', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
          Government of Andhra Pradesh — Digital Vision Programme 2024–25
        </div>

        {/* Logo Icon */}
        <div className="animate-fade-up d1" style={{
          width: 100, height: 100, borderRadius: 28,
          background: 'linear-gradient(135deg, #D4A017, #FFD54F)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 42, fontWeight: 900, fontFamily: "'Outfit', sans-serif",
          color: '#0D2347', marginBottom: 28,
          boxShadow: '0 12px 48px rgba(212,160,23,0.4), 0 0 0 1px rgba(212,160,23,0.2)',
        }}>AP</div>

        <h1 className="animate-fade-up d2" style={{
          fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 900,
          fontFamily: "'Outfit', sans-serif", color: '#fff',
          textAlign: 'center', lineHeight: 1.15, marginBottom: 20,
          maxWidth: 820,
        }}>
          Bringing <span style={{ color: '#FFD54F' }}>Clarity</span> to Every<br />
          Corner of Andhra Pradesh
        </h1>

        <p className="animate-fade-up d3" style={{
          fontSize: 'clamp(14px, 1.8vw, 18px)',
          color: 'rgba(255,255,255,0.65)',
          textAlign: 'center', maxWidth: 600,
          lineHeight: 1.7, marginBottom: 44,
        }}>
          A comprehensive digital platform connecting patients, screening teams, tele-ophthalmologists,
          and government administrators — delivering world-class eye care at scale.
        </p>

        <div className="animate-fade-up d4" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 72 }}>
          <button
            id="hero-get-started-btn"
            onClick={() => router.push('/role-selection')}
            style={{
              background: 'linear-gradient(135deg, #D4A017, #FFD54F)',
              color: '#0D2347', border: 'none', borderRadius: 14,
              padding: '15px 36px', fontSize: 15, fontWeight: 800,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
              boxShadow: '0 6px 24px rgba(212,160,23,0.45)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 12px 36px rgba(212,160,23,0.6)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 24px rgba(212,160,23,0.45)';
            }}
          >
            🚀 Get Started
          </button>
          <button
            id="hero-login-btn"
            onClick={() => router.push('/login')}
            style={{
              background: 'rgba(255,255,255,0.08)',
              color: '#fff', border: '1.5px solid rgba(255,255,255,0.2)',
              borderRadius: 14, padding: '15px 36px',
              fontSize: 15, fontWeight: 700,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.14)';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.4)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.08)';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.2)';
            }}
          >
            🔑 Login to Portal
          </button>
        </div>

        {/* Stats Strip */}
        <div className="animate-fade-up d5" style={{
          display: 'flex', gap: 0, flexWrap: 'wrap', justifyContent: 'center',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 20, padding: '20px 8px',
          backdropFilter: 'blur(8px)',
          maxWidth: 860, width: '100%',
        }}>
          {STATS.slice(0,4).map((s, i) => (
            <div key={s.label} style={{
              flex: 1, minWidth: 140,
              textAlign: 'center', padding: '8px 20px',
              borderRight: i < 3 ? '1px solid rgba(255,255,255,0.1)' : 'none',
            }}>
              <div style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 900, color: s.color, fontFamily: "'Outfit', sans-serif" }}>{s.value}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll cue */}
        <div style={{
          position: 'absolute', bottom: 28,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
          color: 'rgba(255,255,255,0.3)', fontSize: 11, fontWeight: 600,
        }}>
          <div style={{ fontSize: 18, animation: 'pulse 2s infinite' }}>↓</div>
          Scroll to explore
        </div>
      </section>

      {/* ─── Services Section ─────────────────────────────────── */}
      <section style={{ padding: '80px 24px', background: 'white' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div style={{
              display: 'inline-block',
              background: 'rgba(26,58,107,0.08)', color: '#1A3A6B',
              borderRadius: 100, padding: '5px 18px',
              fontSize: 11, fontWeight: 700, letterSpacing: 1,
              textTransform: 'uppercase', marginBottom: 14,
            }}>Our Services</div>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 900, color: '#0D2347', fontFamily: "'Outfit', sans-serif", marginBottom: 12 }}>
              Comprehensive Eye Care Services
            </h2>
            <p style={{ color: '#757575', fontSize: 15, maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
              Free, high-quality eye care delivered across all districts of Andhra Pradesh.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {SERVICES.map((s, i) => (
              <div key={s.title} style={{
                background: 'linear-gradient(135deg, #f6f9ff, #eef2ff)',
                border: '1.5px solid #e0e8ff',
                borderRadius: 20, padding: 28,
                cursor: 'default',
                transition: 'all 0.2s ease',
                animationDelay: `${i * 0.07}s`,
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 36px rgba(26,58,107,0.12)';
                  (e.currentTarget as HTMLDivElement).style.borderColor = '#1A3A6B';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                  (e.currentTarget as HTMLDivElement).style.borderColor = '#e0e8ff';
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 14 }}>{s.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0D2347', marginBottom: 8, fontFamily: "'Outfit', sans-serif" }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: '#616161', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features Section ─────────────────────────────────── */}
      <section style={{
        padding: '80px 24px',
        background: 'linear-gradient(160deg, #0D2347, #1A3A6B)',
      }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div style={{
              display: 'inline-block',
              background: 'rgba(212,160,23,0.15)', color: '#FFD54F',
              borderRadius: 100, padding: '5px 18px',
              fontSize: 11, fontWeight: 700, letterSpacing: 1,
              textTransform: 'uppercase', marginBottom: 14,
            }}>Platform Features</div>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 900, color: '#fff', fontFamily: "'Outfit', sans-serif", marginBottom: 12 }}>
              Built for Every Stakeholder
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
              A unified digital ecosystem purpose-built for the AP Vision Care programme.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            {FEATURES.map((f, i) => (
              <div key={f.title} style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 20, padding: 28,
                backdropFilter: 'blur(8px)',
                transition: 'all 0.2s ease',
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.09)';
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(212,160,23,0.35)';
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.05)';
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.1)';
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: 'rgba(212,160,23,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 26, marginBottom: 16,
                }}>{f.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: '#FFD54F', marginBottom: 8, fontFamily: "'Outfit', sans-serif" }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Stats Section ────────────────────────────────────── */}
      <section style={{ padding: '80px 24px', background: '#f8faff' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div style={{
              display: 'inline-block',
              background: 'rgba(0,137,123,0.1)', color: '#00695C',
              borderRadius: 100, padding: '5px 18px',
              fontSize: 11, fontWeight: 700, letterSpacing: 1,
              textTransform: 'uppercase', marginBottom: 14,
            }}>Programme Impact</div>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 900, color: '#0D2347', fontFamily: "'Outfit', sans-serif" }}>
              Transforming Lives at Scale
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 20 }}>
            {STATS.map((s) => (
              <div key={s.label} style={{
                background: 'white',
                border: '1.5px solid #e8eef8',
                borderRadius: 20, padding: '28px 20px',
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(26,58,107,0.06)',
                transition: 'all 0.2s ease',
                position: 'relative', overflow: 'hidden',
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 36px rgba(26,58,107,0.12)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(26,58,107,0.06)';
                }}
              >
                <div style={{
                  position: 'absolute', top: -20, right: -20,
                  width: 80, height: 80, borderRadius: '50%',
                  background: s.color, opacity: 0.07,
                }} />
                <div style={{ fontSize: 'clamp(26px, 3.5vw, 36px)', fontWeight: 900, color: s.color, fontFamily: "'Outfit', sans-serif", marginBottom: 8 }}>{s.value}</div>
                <div style={{ fontSize: 12, color: '#757575', fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─────────────────────────────────────── */}
      <section style={{
        padding: '80px 24px',
        background: 'linear-gradient(135deg, #D4A017 0%, #F5C842 50%, #D4A017 100%)',
      }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 44px)', fontWeight: 900, color: '#0D2347', fontFamily: "'Outfit', sans-serif", marginBottom: 16 }}>
            Ready to Join the Programme?
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(13,35,71,0.7)', marginBottom: 40, lineHeight: 1.7 }}>
            Access the platform as a patient, screening officer, tele-ophthalmologist, vendor, or administrator.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              id="cta-get-started-btn"
              onClick={() => router.push('/role-selection')}
              style={{
                background: '#0D2347', color: '#FFD54F',
                border: 'none', borderRadius: 14,
                padding: '15px 36px', fontSize: 15, fontWeight: 800,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                boxShadow: '0 6px 24px rgba(13,35,71,0.3)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; }}
            >
              🚀 Get Started Now
            </button>
            <button
              id="cta-login-btn"
              onClick={() => router.push('/login')}
              style={{
                background: 'rgba(13,35,71,0.1)', color: '#0D2347',
                border: '2px solid rgba(13,35,71,0.25)', borderRadius: 14,
                padding: '15px 36px', fontSize: 15, fontWeight: 700,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(13,35,71,0.18)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(13,35,71,0.1)'; }}
            >
              🔑 Login
            </button>
          </div>
        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────────────── */}
      <footer style={{ background: '#061529', padding: '40px 24px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, #D4A017, #FFD54F)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 900, fontSize: 14, color: '#0D2347',
            }}>AP</div>
            <div>
              <div style={{ color: '#fff', fontWeight: 800, fontSize: 13 }}>AP Vision Care</div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10 }}>Government of Andhra Pradesh</div>
            </div>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, textAlign: 'center' }}>
            Digital Vision Programme 2024–25 &nbsp;·&nbsp; Toll Free: 1800-XXX-XXXX
          </div>
          <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11 }}>
            © 2025 Govt. of Andhra Pradesh. All rights reserved.
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .nav-tabs-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .animate-fade-up { animation: fadeUp 0.5s ease both; }
        .d1{animation-delay:.08s} .d2{animation-delay:.14s} .d3{animation-delay:.2s}
        .d4{animation-delay:.26s} .d5{animation-delay:.32s}
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}
