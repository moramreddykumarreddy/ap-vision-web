'use client';
import { useState } from 'react';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { StatusBadge } from '@/app/components/ui';
import Modal, { DetailRow, SuccessBanner } from '@/app/components/Modal';

const initialReferrals = [
  { id: 'REF-001', reason: 'Cataract Evaluation', hospital: 'SVIMS, Tirupati', doctor: 'Dr. Anita Rao', date: '01 Jun 2025', status: 'Pending', urgent: false },
  { id: 'REF-002', reason: 'Diabetic Retinopathy Check', hospital: 'Government General Hospital, Vijayawada', doctor: 'Dr. Rajesh Reddy', date: '28 May 2025', status: 'Approved', urgent: true },
];

export default function PatientReferralScreen() {
  const [referrals, setReferrals] = useState(initialReferrals);
  
  // Modal State
  const [viewLetterTarget, setViewLetterTarget] = useState<typeof initialReferrals[0] | null>(null);
  const [viewDirectionsTarget, setViewDirectionsTarget] = useState<typeof initialReferrals[0] | null>(null);
  const [bookingTarget, setBookingTarget] = useState<typeof initialReferrals[0] | null>(null);
  const [success, setSuccess] = useState(false);

  // Form State
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('10:00 AM');

  const handleBookAppointment = () => {
    if (!bookingTarget || !bookingDate) return;
    setReferrals(prev => prev.map(r => r.id === bookingTarget.id ? { ...r, status: 'Scheduled', date: bookingDate } : r));
    setSuccess(true);
    setTimeout(() => {
      setBookingTarget(null);
      setSuccess(false);
      setBookingDate('');
    }, 1500);
  };

  return (
    <div className="app-layout">
      <Sidebar role="patient" userName="Ramaiah Venkata" userSub="Patient" />
      <div className="main-content">
        <Topbar title="My Referrals" subtitle="Hospital and specialist referrals" />
        <main className="page-body">
          {referrals.map((r, i) => (
            <div key={r.id} className={`card animate-fade-up d${i + 1} mb-16`}>
              <div className="card-body">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 800 }}>{r.reason}</div>
                    <div style={{ fontSize: 11, color: '#9E9E9E' }}>{r.id} • {r.date}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    {r.urgent && <span className="badge badge-error">URGENT</span>}
                    <StatusBadge label={r.status} />
                  </div>
                </div>
                <div style={{ background: '#F5F5F5', borderRadius: 10, padding: 14 }}>
                  {[
                    { l: 'Hospital', v: r.hospital },
                    { l: 'Doctor', v: r.doctor },
                  ].map(item => (
                    <div key={item.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                      <span style={{ fontSize: 12, color: '#9E9E9E' }}>{item.l}</span>
                      <span style={{ fontSize: 13, fontWeight: 700 }}>{item.v}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                  <button className="btn btn-outline btn-sm" onClick={() => setViewLetterTarget(r)}>📄 View Letter</button>
                  <button className="btn btn-outline btn-sm" onClick={() => setViewDirectionsTarget(r)}>🗺️ Get Directions</button>
                  {r.status !== 'Scheduled' && (
                    <button className="btn btn-primary btn-sm" onClick={() => setBookingTarget(r)}>📅 Book Appointment</button>
                  )}
                </div>
              </div>
            </div>
          ))}
          {referrals.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#9E9E9E' }}>
              <div style={{ fontSize: 48 }}>✅</div>
              <div style={{ fontSize: 16, fontWeight: 600, marginTop: 12 }}>No pending referrals</div>
            </div>
          )}

          {/* View Letter Modal */}
          {viewLetterTarget && (
            <Modal
              open={!!viewLetterTarget}
              onClose={() => setViewLetterTarget(null)}
              title="Official Referral Letter"
              subtitle={`Referral ID: ${viewLetterTarget.id}`}
              actions={
                <button className="btn btn-primary" onClick={() => setViewLetterTarget(null)}>Close</button>
              }
            >
              <div style={{ border: '2px solid #EEEEEE', padding: 20, borderRadius: 12, fontFamily: 'serif' }}>
                <div style={{ textAlign: 'center', borderBottom: '2px solid #1A3A6B', paddingBottom: 10, marginBottom: 14 }}>
                  <div style={{ fontSize: 18, fontWeight: 900, color: '#1A3A6B', textTransform: 'uppercase' }}>AP Digital Vision Program</div>
                  <div style={{ fontSize: 11, color: '#757575' }}>Department of Health & Family Welfare, Govt. of Andhra Pradesh</div>
                </div>
                <div style={{ fontSize: 12, display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span><strong>Date:</strong> {viewLetterTarget.date}</span>
                  <span><strong>Ref:</strong> {viewLetterTarget.id}</span>
                </div>
                <div style={{ fontSize: 13, lineHeight: 1.6 }}>
                  <p><strong>To,</strong><br />Admissions Department,<br /><strong>{viewLetterTarget.hospital}</strong></p>
                  <p style={{ margin: '12px 0' }}>
                    This is to introduce patient <strong>Ramaiah Venkata (Age: 58/M, ID: APV-001234)</strong>. Based on screening camp assessments, the patient exhibits symptoms requiring professional evaluation.
                  </p>
                  <p>
                    <strong>Referral Reason:</strong> {viewLetterTarget.reason}<br />
                    <strong>Urgency Level:</strong> {viewLetterTarget.urgent ? 'Critical / Urgent' : 'Routine'}<br />
                    <strong>Attending Specialist:</strong> {viewLetterTarget.doctor}
                  </p>
                  <p style={{ marginTop: 14 }}>
                    Kindly facilitate clinical consultation and the necessary surgical or diagnostic workflow at the earliest.
                  </p>
                  <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{ textAlign: 'center', fontSize: 11 }}>
                      <div style={{ borderBottom: '1px solid #757575', width: 140, height: 30 }} />
                      <div style={{ marginTop: 4 }}>Program Coordinator</div>
                      <div>AP Digital Vision</div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          )}

          {/* Get Directions Modal */}
          {viewDirectionsTarget && (
            <Modal
              open={!!viewDirectionsTarget}
              onClose={() => setViewDirectionsTarget(null)}
              title="Hospital Map & Directions"
              subtitle={viewDirectionsTarget.hospital}
              actions={
                <button className="btn btn-primary" onClick={() => setViewDirectionsTarget(null)}>Close</button>
              }
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {/* Mock Map Area */}
                <div style={{
                  width: '100%', height: 180, background: '#ECEFF1',
                  borderRadius: 12, border: '1px solid #CFD8DC',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexDirection: 'column', gap: 8, overflow: 'hidden', position: 'relative'
                }}>
                  {/* Grid background to look like a map */}
                  <div style={{ position: 'absolute', inset: 0, opacity: 0.15, background: 'radial-gradient(circle, #000 10%, transparent 11%)', backgroundSize: '12px 12px' }} />
                  <span style={{ fontSize: 36 }}>🗺️</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#1A3A6B' }}>GGH Vijayawada Route Map</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <DetailRow label="Address" value={viewDirectionsTarget.hospital === 'SVIMS, Tirupati' ? 'Alipiri Road, Tirupati, AP 517507' : 'Eluru Rd, Governor Peta, Vijayawada, AP 520002'} />
                  <div style={{ marginTop: 8, padding: 12, borderRadius: 8, background: '#F5F7FA', fontSize: 12, color: '#424242', lineHeight: 1.5 }}>
                    <strong>Driving Directions:</strong> Take NH-16 towards city center. Exit at hospital main junction. Head straight for 500 meters to reach the outpatient lobby drop-off circle.
                  </div>
                </div>
              </div>
            </Modal>
          )}

          {/* Book Appointment Modal */}
          {bookingTarget && (
            <Modal
              open={!!bookingTarget}
              onClose={() => setBookingTarget(null)}
              title="Book Hospital Appointment"
              subtitle={bookingTarget.hospital}
              actions={
                <>
                  <button className="btn btn-outline" onClick={() => setBookingTarget(null)} disabled={success}>Cancel</button>
                  <button className="btn btn-primary" onClick={handleBookAppointment} disabled={success}>Confirm Booking</button>
                </>
              }
            >
              {success ? (
                <SuccessBanner message="Appointment booked! Confirmation SMS sent." />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: '#0D2347' }}>Select Date</label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={e => setBookingDate(e.target.value)}
                      style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #E0E0E0', fontSize: 13 }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: '#0D2347' }}>Select Time Slot</label>
                    <select
                      value={bookingTime}
                      onChange={e => setBookingTime(e.target.value)}
                      style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #E0E0E0', fontSize: 13, background: 'white' }}
                    >
                      <option value="09:00 AM">09:00 AM - 10:00 AM</option>
                      <option value="10:00 AM">10:00 AM - 11:00 AM</option>
                      <option value="11:00 AM">11:00 AM - 12:00 PM</option>
                      <option value="02:00 PM">02:00 PM - 03:00 PM</option>
                      <option value="03:00 PM">03:00 PM - 04:00 PM</option>
                    </select>
                  </div>
                </div>
              )}
            </Modal>
          )}
        </main>
      </div>
    </div>
  );
}

