'use client';
import { useRouter } from 'next/navigation';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { StatCard, SectionHeader, AlertBanner, StatusBadge } from '@/app/components/ui';

const prescriptions = [
  { id: 'RX-001', patientName: 'Ramaiah Venkata', diagnosis: 'Presbyopia', date: '02 Jun 2025', status: 'Pending' },
  { id: 'RX-002', patientName: 'Lakshmi Devi', diagnosis: 'Myopia', date: '02 Jun 2025', status: 'Approved' },
  { id: 'RX-003', patientName: 'Suresh Kumar', diagnosis: 'Cataract', date: '01 Jun 2025', status: 'Pending' },
];
const referrals = [
  { id: 'REF-001', patientName: 'Narasimha Rao', condition: 'Glaucoma', date: '01 Jun 2025', status: 'Pending' },
  { id: 'REF-002', patientName: 'Padmavathi', condition: 'Diabetic Retinopathy', date: '31 May 2025', status: 'Approved' },
];
const orders = [
  { id: 'ORD-001', vendor: 'Vision Plus Ltd', items: 150, status: 'In Progress' },
  { id: 'ORD-002', vendor: 'ClearSight Optics', items: 200, status: 'Delivered' },
];

export default function NodalDashboard() {
  const router = useRouter();
  const pendingApprovals = prescriptions.filter(p => p.status === 'Pending').length;
  const pendingReferrals = referrals.filter(r => r.status === 'Pending').length;

  return (
    <div className="app-layout">
      <Sidebar role="nodal" userName="Ravi Shankar" userSub="Nodal Officer, Krishna" />
      <div className="main-content">
        <Topbar title="Nodal Officer" subtitle="Krishna District" />
        <main className="page-body">
          {/* District Banner */}
          <div className="animate-fade-up" style={{
            background: 'linear-gradient(135deg, #1A3A6B, rgba(26,58,107,.7))',
            borderRadius: 16, padding: '16px 20px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 20,
          }}>
            <div>
              <div style={{ color: 'white', fontWeight: 800, fontSize: 16 }}>Krishna District Overview</div>
              <div style={{ color: 'rgba(255,255,255,.7)', fontSize: 11 }}>Last updated: Today 02:30 PM</div>
            </div>
            {pendingApprovals > 0 && (
              <span style={{
                background: '#D4A017', color: 'white', fontWeight: 700, fontSize: 12,
                padding: '5px 14px', borderRadius: 20,
              }}>{pendingApprovals} Pending</span>
            )}
          </div>

          <SectionHeader title="District Summary" />
          <div className="stats-grid stats-grid-4 mt-12 mb-24">
            <StatCard title="Total Patients" value="15,200" icon="👥" color="#1A3A6B" delay={0.05} />
            <StatCard title="Pending Approvals" value={`${pendingApprovals}`} icon="⏳" color="#E65100" delay={0.10} subtitle="Action Required" onClick={() => router.push('/nodal/approvals')} />
            <StatCard title="Active Orders" value={`${orders.length}`} icon="🛒" color="#00897B" delay={0.15} onClick={() => router.push('/nodal/vendors')} />
            <StatCard title="Referrals" value={`${referrals.length}`} icon="🏥" color="#C62828" delay={0.20} subtitle={`${pendingReferrals} pending`} />
          </div>

          {/* Alert */}
          {pendingApprovals > 0 && (
            <AlertBanner
              icon="⚠️"
              title="Pending Prescriptions"
              message={`${pendingApprovals} prescriptions awaiting your approval`}
              type="warning"
              action={{ label: 'Review', onClick: () => router.push('/nodal/approvals') }}
            />
          )}

          <SectionHeader title="Recent Prescriptions" actionLabel="View All" onAction={() => router.push('/nodal/approvals')} />
          <div className="card mt-12">
            <div className="card-body" style={{ padding: 0 }}>
              {prescriptions.map((rx, i) => (
                <div key={rx.id} className={`list-item animate-fade-up d${i + 1}`} style={{ padding: '14px 20px' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#1A3A6B18', color: '#1A3A6B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>{rx.patientName[0]}</div>
                  <div style={{ flex: 1, marginLeft: 12 }}>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{rx.patientName}</div>
                    <div style={{ fontSize: 11, color: '#9E9E9E' }}>{rx.diagnosis} • {rx.date}</div>
                  </div>
                  <StatusBadge label={rx.status} />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
