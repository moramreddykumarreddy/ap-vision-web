'use client';
import { colorAlpha, colors } from '@/app/lib/theme';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { AppShell } from '@/app/components/app-shell';
import { SectionHeader, StatusBadge, Button, Input, Select, Textarea, FormGroup, Card, CardBody, fadeDelay } from '@/app/components/ui';
import { cn } from '@/app/lib/cn';
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
    <AppShell
      sidebar={<Sidebar role="screening" userName="Dr. Srinivasa Rao" userSub="Team Lead" />}
      topbar={<Topbar title="Camp Management" subtitle="All screening camps" />}
    >
          <div className="mb-3 flex flex-wrap gap-1.5">
            {statuses.map(s => (
              <Button
                key={s}
                size="sm"
                variant={filter === s ? 'primary' : 'outline'}
                className={cn(filter !== s && 'border-grey-300 bg-white text-grey-600')}
                onClick={() => setFilter(s)}
              >
                {s} {s !== 'All' && `(${camps.filter(c => c.status === s).length})`}
              </Button>
            ))}
            <Button variant="accent" size="sm" className="ml-auto" onClick={() => setNewCampOpen(true)}>
              + New Camp
            </Button>
          </div>

          <div className="flex flex-col gap-2.5">
            {filtered.map((c, i) => (
              <Card key={c.id} className={`animate-fade-up ${fadeDelay(i + 1)}`}>
                <CardBody>
                  <div className="mb-1 flex items-center justify-between">
                    <div>
                      <div className="text-[15px] font-extrabold">{c.name}</div>
                      <div className="text-xs text-grey-400">{c.id}</div>
                    </div>
                    <StatusBadge label={c.status} />
                  </div>
                  <div className="mb-2 grid grid-cols-2 gap-1.5">
                    <div className="text-xs text-grey-500">📍 {c.mandal}, {c.district}</div>
                    <div className="text-xs text-grey-500">📅 {c.date}</div>
                    <div className="text-xs text-grey-500">👨‍⚕️ {c.doctor}</div>
                    <div className="text-xs text-grey-500">🏛️ {c.venue}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 rounded-[10px] bg-grey-100 px-3 py-2 sm:grid-cols-4">
                    {[
                      { l: 'Registered', v: c.registered },
                      { l: 'Screened', v: c.screened },
                      { l: 'Prescriptions', v: c.prescriptions },
                      { l: 'Referrals', v: c.referrals },
                    ].map(m => (
                      <div key={m.l} className="text-center">
                        <div className="text-xl font-black">{m.v}</div>
                        <div className="text-[10px] text-grey-400">{m.l}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 flex gap-1.5">
                    {c.status === 'Active' && (
                      <Button variant="primary" size="sm" onClick={() => router.push('/screening/register')}>+ Register Patient</Button>
                    )}
                    <Button variant="outline" size="sm" onClick={() => setViewCamp(c)}>View Details</Button>
                    {c.status === 'Active' && (
                      <Button variant="outline" size="sm" className="ml-auto" onClick={() => setEndCampTarget(c)}>End Camp</Button>
                    )}
                  </div>
                </CardBody>
              </Card>
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
                <Button variant="outline" onClick={() => setNewCampOpen(false)} disabled={success}>Cancel</Button>
                <Button variant="primary" onClick={handleCreateCamp} disabled={success}>Schedule Camp</Button>
              </>
            }
          >
            {success ? (
              <SuccessBanner message="Camp scheduled successfully!" />
            ) : (
              <div className="flex flex-col gap-2">
                <FormGroup label="Camp Name">
                  <Input type="text" placeholder="e.g. Vijayawada Ward 12 Camp" value={name} onChange={e => setName(e.target.value)} />
                </FormGroup>
                <FormGroup label="Venue / Building">
                  <Input type="text" placeholder="e.g. Community Hall / Public School" value={venue} onChange={e => setVenue(e.target.value)} />
                </FormGroup>
                <div className="grid grid-cols-2 gap-2">
                  <FormGroup label="Mandal">
                    <Input type="text" placeholder="e.g. Tenali" value={mandal} onChange={e => setMandal(e.target.value)} />
                  </FormGroup>
                  <FormGroup label="District">
                    <Select value={district} onChange={e => setDistrict(e.target.value)}>
                      <option value="Krishna">Krishna</option>
                      <option value="Guntur">Guntur</option>
                      <option value="Kurnool">Kurnool</option>
                      <option value="Nellore">Nellore</option>
                    </Select>
                  </FormGroup>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <FormGroup label="Assigned Doctor">
                    <Select value={doctor} onChange={e => setDoctor(e.target.value)}>
                      <option value="Dr. Srinivasa Rao">Dr. Srinivasa Rao</option>
                      <option value="Dr. Priya Devi">Dr. Priya Devi</option>
                      <option value="Dr. Ramesh Kumar">Dr. Ramesh Kumar</option>
                    </Select>
                  </FormGroup>
                  <FormGroup label="Schedule Date">
                    <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
                  </FormGroup>
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
                <Button variant="primary" onClick={() => setViewCamp(null)}>Close</Button>
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
                  <Button variant="outline" onClick={() => setEndCampTarget(null)} disabled={success}>Cancel</Button>
                  <Button variant="primary" onClick={handleEndCamp} disabled={success}>Confirm End Camp</Button>
                </>
              }
            >
              {success ? (
                <SuccessBanner message="Camp has been marked as Completed!" />
              ) : (
                <div style={{ fontSize: 13, color: colors.grey800, lineHeight: 1.5 }}>
                  Are you sure you want to end <strong>{endCampTarget.name}</strong>? Ending the camp will freeze the registrations and update its status to <strong>Completed</strong>.
                </div>
              )}
            </Modal>
          )}
        </AppShell>
  );
}

