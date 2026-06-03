'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { SectionHeader, StatusBadge } from '@/app/components/ui';
import Modal, { DetailRow, RosterTable, SuccessBanner } from '@/app/components/Modal';

const initialCamps = [
  { id: 'C001', name: 'Vijayawada Urban Camp', mandal: 'Vijayawada', district: 'Krishna', date: '02 Jun 2025', status: 'Active', registered: 145, screened: 132, prescriptions: 48, referrals: 12, doctor: 'Dr. Srinivasa Rao', venue: 'Govt. School Hall' },
  { id: 'C002', name: 'Guntur Rural Health Camp', mandal: 'Tenali', district: 'Guntur', date: '01 Jun 2025', status: 'Completed', registered: 98, screened: 98, prescriptions: 31, referrals: 7, doctor: 'Dr. Priya Devi', venue: 'PHC Building' },
  { id: 'C003', name: 'Kurnool School Vision Camp', mandal: 'Kurnool', district: 'Kurnool', date: '03 Jun 2025', status: 'Scheduled', registered: 0, screened: 0, prescriptions: 0, referrals: 0, doctor: 'Dr. Ramesh Kumar', venue: 'ZPHS Kurnool' },
  { id: 'C004', name: 'Nellore Coastal Camp', mandal: 'Kavali', district: 'Nellore', date: '04 Jun 2025', status: 'Scheduled', registered: 0, screened: 0, prescriptions: 0, referrals: 0, doctor: 'Dr. Lakshmi Rao', venue: 'Fishermen Community Hall' },
];

export default function CampManagement() {
  const router = useRouter();
  const [camps, setCamps] = useState(initialCamps);
  const [filter, setFilter] = useState('All');
  
  // Modal State
  const [newCampOpen, setNewCampOpen] = useState(false);
  const [viewCamp, setViewCamp] = useState<typeof initialCamps[0] | null>(null);
  const [endCampTarget, setEndCampTarget] = useState<typeof initialCamps[0] | null>(null);
  const [success, setSuccess] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [venue, setVenue] = useState('');
  const [mandal, setMandal] = useState('');
  const [district, setDistrict] = useState('Krishna');
  const [doctor, setDoctor] = useState('Dr. Srinivasa Rao');
  const [date, setDate] = useState('');

  const statuses = ['All', 'Active', 'Scheduled', 'Completed'];
  const filtered = filter === 'All' ? camps : camps.filter(c => c.status === filter);

  const handleCreateCamp = () => {
    if (!name.trim() || !venue.trim() || !mandal.trim() || !date.trim()) return;
    const newCamp = {
      id: `C00${camps.length + 1}`,
      name,
      mandal,
      district,
      date: new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Scheduled' as const,
      registered: 0,
      screened: 0,
      prescriptions: 0,
      referrals: 0,
      doctor,
      venue,
    };
    setCamps(prev => [newCamp, ...prev]);
    setSuccess(true);
    setTimeout(() => {
      setNewCampOpen(false);
      setSuccess(false);
      setName('');
      setVenue('');
      setMandal('');
      setDate('');
    }, 1500);
  };

  const handleEndCamp = () => {
    if (!endCampTarget) return;
    setCamps(prev => prev.map(c => c.id === endCampTarget.id ? { ...c, status: 'Completed' } : c));
    setSuccess(true);
    setTimeout(() => {
      setEndCampTarget(null);
      setSuccess(false);
    }, 1500);
  };

  return (
    <div className="app-layout">
      <Sidebar role="screening" userName="Dr. Srinivasa Rao" userSub="Team Lead" />
      <div className="main-content">
        <Topbar title="Camp Management" subtitle="All screening camps" />
        <main className="page-body">
          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
            {statuses.map(s => (
              <button key={s} onClick={() => setFilter(s)} className="btn btn-sm"
                style={{
                  background: filter === s ? '#1A3A6B' : 'white',
                  color: filter === s ? 'white' : '#616161',
                  border: '1.5px solid', borderColor: filter === s ? '#1A3A6B' : '#E0E0E0',
                }}>
                {s} {s !== 'All' && `(${camps.filter(c => c.status === s).length})`}
              </button>
            ))}
            <button className="btn btn-accent btn-sm" style={{ marginLeft: 'auto' }} onClick={() => setNewCampOpen(true)}>
              + New Camp
            </button>
          </div>

          {/* Camp Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {filtered.map((c, i) => (
              <div key={c.id} className={`card animate-fade-up d${i + 1}`}>
                <div className="card-body">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 800 }}>{c.name}</div>
                      <div style={{ fontSize: 12, color: '#9E9E9E' }}>{c.id}</div>
                    </div>
                    <StatusBadge label={c.status} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
                    <div style={{ fontSize: 12, color: '#757575' }}>📍 {c.mandal}, {c.district}</div>
                    <div style={{ fontSize: 12, color: '#757575' }}>📅 {c.date}</div>
                    <div style={{ fontSize: 12, color: '#757575' }}>👨‍⚕️ {c.doctor}</div>
                    <div style={{ fontSize: 12, color: '#757575' }}>🏛️ {c.venue}</div>
                  </div>
                  <div style={{ background: '#F5F5F5', borderRadius: 10, padding: '12px 16px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                    {[
                      { l: 'Registered', v: c.registered },
                      { l: 'Screened', v: c.screened },
                      { l: 'Prescriptions', v: c.prescriptions },
                      { l: 'Referrals', v: c.referrals },
                    ].map(m => (
                      <div key={m.l} style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 20, fontWeight: 900 }}>{m.v}</div>
                        <div style={{ fontSize: 10, color: '#9E9E9E' }}>{m.l}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                    {c.status === 'Active' && (
                      <button className="btn btn-primary btn-sm" onClick={() => router.push('/screening/register')}>+ Register Patient</button>
                    )}
                    <button className="btn btn-outline btn-sm" onClick={() => setViewCamp(c)}>View Details</button>
                    {c.status === 'Active' && (
                      <button className="btn btn-outline btn-sm" style={{ marginLeft: 'auto' }} onClick={() => setEndCampTarget(c)}>End Camp</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* New Camp Modal */}
          <Modal
            open={newCampOpen}
            onClose={() => setNewCampOpen(false)}
            title="Create New Screening Camp"
            subtitle="Schedule a new eye screening camp session"
            actions={
              <>
                <button className="btn btn-outline" onClick={() => setNewCampOpen(false)} disabled={success}>Cancel</button>
                <button className="btn btn-primary" onClick={handleCreateCamp} disabled={success}>Schedule Camp</button>
              </>
            }
          >
            {success ? (
              <SuccessBanner message="Camp scheduled successfully!" />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#0D2347' }}>Camp Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Vijayawada Ward 12 Camp"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #E0E0E0', fontSize: 13 }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#0D2347' }}>Venue / Building</label>
                  <input
                    type="text"
                    placeholder="e.g. Community Hall / Public School"
                    value={venue}
                    onChange={e => setVenue(e.target.value)}
                    style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #E0E0E0', fontSize: 13 }}
                  />
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: '#0D2347' }}>Mandal</label>
                    <input
                      type="text"
                      placeholder="e.g. Tenali"
                      value={mandal}
                      onChange={e => setMandal(e.target.value)}
                      style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #E0E0E0', fontSize: 13 }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: '#0D2347' }}>District</label>
                    <select
                      value={district}
                      onChange={e => setDistrict(e.target.value)}
                      style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #E0E0E0', fontSize: 13, background: 'white' }}
                    >
                      <option value="Krishna">Krishna</option>
                      <option value="Guntur">Guntur</option>
                      <option value="Kurnool">Kurnool</option>
                      <option value="Nellore">Nellore</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: '#0D2347' }}>Assigned Doctor</label>
                    <select
                      value={doctor}
                      onChange={e => setDoctor(e.target.value)}
                      style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #E0E0E0', fontSize: 13, background: 'white' }}
                    >
                      <option value="Dr. Srinivasa Rao">Dr. Srinivasa Rao</option>
                      <option value="Dr. Priya Devi">Dr. Priya Devi</option>
                      <option value="Dr. Ramesh Kumar">Dr. Ramesh Kumar</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: '#0D2347' }}>Schedule Date</label>
                    <input
                      type="date"
                      value={date}
                      onChange={e => setDate(e.target.value)}
                      style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #E0E0E0', fontSize: 13 }}
                    />
                  </div>
                </div>
              </div>
            )}
          </Modal>

          {/* View Details Modal */}
          {viewCamp && (
            <Modal
              open={!!viewCamp}
              onClose={() => setViewCamp(null)}
              title={viewCamp.name}
              subtitle={`Camp Code: ${viewCamp.id}`}
              actions={
                <button className="btn btn-primary" onClick={() => setViewCamp(null)}>Close</button>
              }
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
                <DetailRow label="Assigned Doctor" value={viewCamp.doctor} />
                <DetailRow label="Venue" value={viewCamp.venue} />
                <DetailRow label="Location" value={`${viewCamp.mandal}, ${viewCamp.district}`} />
                <DetailRow label="Status" value={viewCamp.status} />
              </div>
              <SectionHeader title="Roster & Attendance" />
              <div style={{ marginTop: 8 }}>
                <RosterTable
                  columns={['Patient ID', 'Patient Name', 'Age/Gender', 'Diagnosis', 'Referral?']}
                  rows={[
                    ['APV-001234', 'Ramaiah Venkata', '58 / M', 'Early Cataract', 'Yes (SVIMS)'],
                    ['APV-001235', 'Saraswathi Devi', '52 / F', 'Presbyopia', 'No'],
                    ['APV-001236', 'Nageswara Rao', '63 / M', 'Advanced Cataract', 'Yes (Nodal)'],
                    ['APV-001237', 'Koteswaramma G.', '47 / F', 'Normal Vision', 'No'],
                  ]}
                />
              </div>
            </Modal>
          )}

          {/* End Camp Confirmation Modal */}
          {endCampTarget && (
            <Modal
              open={!!endCampTarget}
              onClose={() => setEndCampTarget(null)}
              title="End Active Camp"
              subtitle={endCampTarget.name}
              actions={
                <>
                  <button className="btn btn-outline" onClick={() => setEndCampTarget(null)} disabled={success}>Cancel</button>
                  <button className="btn btn-primary" onClick={handleEndCamp} disabled={success}>Confirm End Camp</button>
                </>
              }
            >
              {success ? (
                <SuccessBanner message="Camp has been marked as Completed!" />
              ) : (
                <div style={{ fontSize: 13, color: '#424242', lineHeight: 1.5 }}>
                  Are you sure you want to end <strong>{endCampTarget.name}</strong>? Ending the camp will freeze the registrations and update its status to <strong>Completed</strong>.
                </div>
              )}
            </Modal>
          )}
        </main>
      </div>
    </div>
  );
}

