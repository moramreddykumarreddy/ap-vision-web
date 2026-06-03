'use client';
import { useState } from 'react';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { SectionHeader, StatusBadge } from '@/app/components/ui';
import Modal, { RosterTable, SuccessBanner } from '@/app/components/Modal';

const initialTeams = [
  { id: 'T001', name: 'Team Alpha', lead: 'Dr. Srinivasa Rao', members: 3, campsCompleted: 12, patientsScreened: 1840, status: 'Active', location: 'Vijayawada' },
  { id: 'T002', name: 'Team Beta', lead: 'Dr. Priya Devi', members: 2, campsCompleted: 9, patientsScreened: 1320, status: 'Active', location: 'Machilipatnam' },
  { id: 'T003', name: 'Team Gamma', lead: 'Dr. Ramesh Kumar', members: 1, campsCompleted: 7, patientsScreened: 980, status: 'On Leave', location: 'Nuzvid' },
];

const initialMembers = [
  { name: 'Dr. Srinivasa Rao', role: 'Ophthalmologist', team: 'Alpha', phone: '9876543210', status: 'Active' },
  { name: 'Nurse Sunitha', role: 'Optometrist', team: 'Alpha', phone: '9765432109', status: 'Active' },
  { name: 'Tech. Venkaiah', role: 'Technician', team: 'Alpha', phone: '9654321098', status: 'Active' },
  { name: 'Dr. Priya Devi', role: 'Ophthalmologist', team: 'Beta', phone: '9543210987', status: 'Active' },
  { name: 'Nurse Kavitha', role: 'Optometrist', team: 'Beta', phone: '9432109876', status: 'On Leave' },
  { name: 'Dr. Ramesh Kumar', role: 'Ophthalmologist', team: 'Gamma', phone: '9321098765', status: 'On Leave' },
];

const teamCampsData: Record<string, string[][]> = {
  T001: [
    ['CAMP-101', 'Vijayawada Central', '20 May 2025', '245 Patients', 'Completed'],
    ['CAMP-104', 'Benz Circle School', '25 May 2025', '190 Patients', 'Completed'],
    ['CAMP-108', 'Gollapudi Community Hall', '02 Jun 2025', '210 Patients', 'Completed'],
  ],
  T002: [
    ['CAMP-102', 'Machilipatnam Port', '18 May 2025', '180 Patients', 'Completed'],
    ['CAMP-105', 'RDO Office Camp', '28 May 2025', '225 Patients', 'Completed'],
  ],
  T003: [
    ['CAMP-103', 'Nuzvid Bus Stand', '15 May 2025', '140 Patients', 'Completed'],
    ['CAMP-107', 'MRO Office Hall', '01 Jun 2025', '165 Patients', 'Completed'],
  ],
};

export default function TeamManagement() {
  const [teams, setTeams] = useState(initialTeams);
  const [members, setMembers] = useState(initialMembers);

  // Modal State
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<typeof initialTeams[0] | null>(null);
  const [viewMembersOpen, setViewMembersOpen] = useState(false);
  const [viewCampsOpen, setViewCampsOpen] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [role, setRole] = useState('Optometrist');
  const [teamSelect, setTeamSelect] = useState('Alpha');
  const [phone, setPhone] = useState('');
  const [success, setSuccess] = useState(false);

  const handleAddMember = () => {
    if (!name.trim() || !phone.trim()) return;
    const newMember = {
      name,
      role,
      team: teamSelect,
      phone,
      status: 'Active',
    };
    setMembers(prev => [newMember, ...prev]);

    // Update member count in teams state
    setTeams(prev => prev.map(t => {
      if (t.name.toLowerCase().includes(teamSelect.toLowerCase())) {
        return { ...t, members: t.members + 1 };
      }
      return t;
    }));

    setSuccess(true);
    setTimeout(() => {
      setAddMemberOpen(false);
      setSuccess(false);
      setName('');
      setPhone('');
    }, 1500);
  };

  const getTeamMembers = (teamName: string) => {
    return members
      .filter(m => m.team.toLowerCase() === teamName.replace('Team ', '').toLowerCase())
      .map(m => [m.name, m.role, m.phone, m.status]);
  };

  return (
    <div className="app-layout">
      <Sidebar role="nodal" userName="Ravi Shankar" userSub="Nodal Officer, Krishna" />
      <div className="main-content">
        <Topbar title="Team Management" subtitle="Screening teams in Krishna district" />
        <main className="page-body">
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
            <button className="btn btn-primary" onClick={() => setAddMemberOpen(true)}>+ Add Team Member</button>
          </div>

          <SectionHeader title="Screening Teams" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 12, marginBottom: 24 }}>
            {teams.map((t, i) => (
              <div key={t.id} className={`card animate-fade-up d${i + 1}`}>
                <div className="card-body">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 800 }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: '#9E9E9E' }}>Lead: {t.lead} • {t.location}</div>
                    </div>
                    <StatusBadge label={t.status} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, background: '#F5F5F5', borderRadius: 10, padding: 14 }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 20, fontWeight: 900 }}>{t.members}</div>
                      <div style={{ fontSize: 10, color: '#9E9E9E' }}>Members</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 20, fontWeight: 900 }}>{t.campsCompleted}</div>
                      <div style={{ fontSize: 10, color: '#9E9E9E' }}>Camps</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 20, fontWeight: 900 }}>{t.patientsScreened.toLocaleString()}</div>
                      <div style={{ fontSize: 10, color: '#9E9E9E' }}>Screened</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    <button className="btn btn-outline btn-sm" onClick={() => { setSelectedTeam(t); setViewMembersOpen(true); }}>View Members</button>
                    <button className="btn btn-outline btn-sm" onClick={() => { setSelectedTeam(t); setViewCampsOpen(true); }}>View Camps</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <SectionHeader title="All Members" />
          <div className="card mt-12">
            <div className="card-body" style={{ padding: 0 }}>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Team</th>
                      <th>Phone</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map(m => (
                      <tr key={m.name}>
                        <td style={{ fontWeight: 700 }}>{m.name}</td>
                        <td>{m.role}</td>
                        <td>Team {m.team}</td>
                        <td>{m.phone}</td>
                        <td><StatusBadge label={m.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Add Team Member Modal */}
          <Modal
            open={addMemberOpen}
            onClose={() => setAddMemberOpen(false)}
            title="Add New Team Member"
            subtitle="Register new personnel to screening teams"
            actions={
              <>
                <button className="btn btn-outline" onClick={() => setAddMemberOpen(false)} disabled={success}>Cancel</button>
                <button className="btn btn-primary" onClick={handleAddMember} disabled={success}>Add Member</button>
              </>
            }
          >
            {success ? (
              <SuccessBanner message="Team member registered successfully!" />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#0D2347' }}>Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #E0E0E0', fontSize: 13 }}
                  />
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: '#0D2347' }}>Role</label>
                    <select
                      value={role}
                      onChange={e => setRole(e.target.value)}
                      style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #E0E0E0', fontSize: 13, background: 'white' }}
                    >
                      <option value="Ophthalmologist">Ophthalmologist</option>
                      <option value="Optometrist">Optometrist</option>
                      <option value="Technician">Technician</option>
                      <option value="Field Support">Field Support</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: '#0D2347' }}>Team</label>
                    <select
                      value={teamSelect}
                      onChange={e => setTeamSelect(e.target.value)}
                      style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #E0E0E0', fontSize: 13, background: 'white' }}
                    >
                      <option value="Alpha">Team Alpha</option>
                      <option value="Beta">Team Beta</option>
                      <option value="Gamma">Team Gamma</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#0D2347' }}>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #E0E0E0', fontSize: 13 }}
                  />
                </div>
              </div>
            )}
          </Modal>

          {/* View Members Modal */}
          {selectedTeam && (
            <Modal
              open={viewMembersOpen}
              onClose={() => setViewMembersOpen(false)}
              title={`${selectedTeam.name} Members`}
              subtitle={`Detailed team registry for ${selectedTeam.name}`}
              actions={
                <button className="btn btn-primary" onClick={() => setViewMembersOpen(false)}>Close</button>
              }
            >
              <RosterTable
                columns={['Name', 'Role', 'Phone', 'Status']}
                rows={getTeamMembers(selectedTeam.name)}
              />
            </Modal>
          )}

          {/* View Camps Modal */}
          {selectedTeam && (
            <Modal
              open={viewCampsOpen}
              onClose={() => setViewCampsOpen(false)}
              title={`${selectedTeam.name} Camps`}
              subtitle={`Activity log for screening camps conducted by ${selectedTeam.name}`}
              actions={
                <button className="btn btn-primary" onClick={() => setViewCampsOpen(false)}>Close</button>
              }
            >
              <RosterTable
                columns={['Camp ID', 'Location', 'Date', 'Activity', 'Status']}
                rows={teamCampsData[selectedTeam.id] || []}
              />
            </Modal>
          )}
        </main>
      </div>
    </div>
  );
}

