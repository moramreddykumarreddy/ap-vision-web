'use client';
import { useRouter } from 'next/navigation';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { AppShell } from '@/app/components/app-shell';
import { StatCard, SectionHeader, AlertBanner, StatusBadge, StatsGrid, Card, CardBody, ListItem, fadeDelay } from '@/app/components/ui';

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
    <AppShell
      sidebar={<Sidebar role="nodal" userName="Ravi Shankar" userSub="Nodal Officer, Krishna" />}
      topbar={<Topbar title="Nodal Officer" subtitle="Krishna District" />}
    >
      <div className="animate-fade-up mb-5 flex items-center justify-between rounded-2xl bg-gradient-to-br from-primary to-primary/70 px-5 py-4">
        <div>
          <div className="text-base font-extrabold text-white">Krishna District Overview</div>
          <div className="text-[11px] text-white/70">Last updated: Today 02:30 PM</div>
        </div>
        {pendingApprovals > 0 && (
          <span className="rounded-full bg-accent px-3.5 py-1 text-xs font-bold text-white">{pendingApprovals} Pending</span>
        )}
      </div>

      <SectionHeader title="District Summary" />
      <StatsGrid cols={4} className="mt-2 mb-3.5">
        <StatCard title="Total Patients" value="15,200" icon="👥" color="#1A3A6B" delay={0.05} />
        <StatCard title="Pending Approvals" value={`${pendingApprovals}`} icon="⏳" color="#E65100" delay={0.10} subtitle="Action Required" onClick={() => router.push('/nodal/approvals')} />
        <StatCard title="Active Orders" value={`${orders.length}`} icon="🛒" color="#00897B" delay={0.15} onClick={() => router.push('/nodal/vendors')} />
        <StatCard title="Referrals" value={`${referrals.length}`} icon="🏥" color="#C62828" delay={0.20} subtitle={`${pendingReferrals} pending`} />
      </StatsGrid>

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
      <Card className="mt-2">
        <CardBody className="p-0">
          {prescriptions.map((rx, i) => (
            <ListItem
              key={rx.id}
              avatar={rx.patientName[0]}
              title={rx.patientName}
              subtitle={`${rx.diagnosis} • ${rx.date}`}
              trailing={<StatusBadge label={rx.status} />}
              delay={i * 0.05}
              className="px-5 py-3.5"
            />
          ))}
        </CardBody>
      </Card>
    </AppShell>
  );
}
