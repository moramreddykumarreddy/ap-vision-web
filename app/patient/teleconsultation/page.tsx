'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { StatusBadge } from '@/app/components/ui';

const consultations = [
  { id: 'TC-001', doctor: 'Dr. Anita Rao', specialty: 'Tele-Ophthalmologist', hospital: 'SVIMS, Tirupati', scheduledTime: '10 Jun 2025, 10:00 AM', condition: 'Diabetic Retinopathy', status: 'Scheduled' },
  { id: 'TC-002', doctor: 'Dr. Rajesh Reddy', specialty: 'Retinal Specialist', hospital: 'GGH, Vijayawada', scheduledTime: '28 May 2025, 02:00 PM', condition: 'Macular Evaluation', status: 'Completed' },
];

export default function TeleconsultationScreen() {
  const router = useRouter();
  return (
    <div className="app-layout">
      <Sidebar role="patient" userName="Ramaiah Venkata" userSub="Patient" />
      <div className="main-content">
        <Topbar title="Teleconsultation" subtitle="Video consultations with specialists" />
        <main className="page-body">
          {/* Upcoming */}
          {consultations.filter(c => c.status === 'Scheduled').map((c, i) => (
            <div key={c.id} className="animate-fade-up mb-20" style={{
              background: 'linear-gradient(135deg, #1A3A6B, #01579B)', borderRadius: 20, padding: 24, color: 'white',
            }}>
              <span style={{ background: 'rgba(255,255,255,.2)', padding: '2px 10px', borderRadius: 20, fontSize: 9, fontWeight: 800, letterSpacing: 1 }}>UPCOMING</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 14 }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(255,255,255,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>👨‍⚕️</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 18, fontWeight: 800 }}>{c.doctor}</div>
                  <div style={{ fontSize: 12, opacity: 0.8 }}>{c.specialty} • {c.hospital}</div>
                  <div style={{ fontSize: 12, opacity: 0.7 }}>🕐 {c.scheduledTime}</div>
                </div>
              </div>
              <button className="btn btn-full" style={{ marginTop: 16, background: 'white', color: '#1A3A6B', fontWeight: 800 }}>
                📹 Join Video Call
              </button>
            </div>
          ))}

          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Consultation History</div>
          {consultations.map((c, i) => (
            <div key={c.id} className={`card animate-fade-up d${i + 1} mb-12`}>
              <div className="card-body">
                <div className="flex items-center gap-12">
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#1A3A6B18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>👨‍⚕️</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 800 }}>{c.doctor}</div>
                    <div style={{ fontSize: 12, color: '#757575' }}>{c.specialty}</div>
                    <div style={{ fontSize: 11, color: '#1A3A6B' }}>🕐 {c.scheduledTime}</div>
                  </div>
                  <StatusBadge label={c.status} />
                </div>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}
