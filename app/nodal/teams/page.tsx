'use client';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { SectionHeader, StatusBadge } from '@/app/components/ui';

const teams = [
  { id: 'T001', name: 'Team Alpha', lead: 'Dr. Srinivasa Rao', members: 5, campsCompleted: 12, patientsScreened: 1840, status: 'Active', location: 'Vijayawada' },
  { id: 'T002', name: 'Team Beta', lead: 'Dr. Priya Devi', members: 4, campsCompleted: 9, patientsScreened: 1320, status: 'Active', location: 'Machilipatnam' },
  { id: 'T003', name: 'Team Gamma', lead: 'Dr. Ramesh Kumar', members: 6, campsCompleted: 7, patientsScreened: 980, status: 'On Leave', location: 'Nuzvid' },
];

const members = [
  { name: 'Dr. Srinivasa Rao', role: 'Ophthalmologist', team: 'Alpha', phone: '9876543210', status: 'Active' },
  { name: 'Nurse Sunitha', role: 'Optometrist', team: 'Alpha', phone: '9765432109', status: 'Active' },
  { name: 'Tech. Venkaiah', role: 'Technician', team: 'Alpha', phone: '9654321098', status: 'Active' },
  { name: 'Dr. Priya Devi', role: 'Ophthalmologist', team: 'Beta', phone: '9543210987', status: 'Active' },
  { name: 'Nurse Kavitha', role: 'Optometrist', team: 'Beta', phone: '9432109876', status: 'On Leave' },
];

export default function TeamManagement() {
  return (
    <div className="app-layout">
      <Sidebar role="nodal" userName="Ravi Shankar" userSub="Nodal Officer, Krishna" />
      <div className="main-content">
        <Topbar title="Team Management" subtitle="Screening teams in Krishna district" />
        <main className="page-body">
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
            <button className="btn btn-primary">+ Add Team Member</button>
          </div>

          <SectionHeader title="Screening Teams" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 12, marginBottom: 24 }}>
            {teams.map((t, i) => (
              <div key={t.id} className={`card animate-fade-up d${i + 1}`}>
                <div className="card-body">
                  <div className="flex items-center justify-between mb-12">
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
                    <button className="btn btn-outline btn-sm">View Members</button>
                    <button className="btn btn-outline btn-sm">View Camps</button>
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
        </main>
      </div>
    </div>
  );
}
