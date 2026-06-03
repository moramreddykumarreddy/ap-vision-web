'use client';
import { useRouter } from 'next/navigation';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { AppShell } from '@/app/components/app-shell';
import { StatCard, SectionHeader, StatusBadge, ProgressBar, StatsGrid, Card, CardBody, fadeDelay } from '@/app/components/ui';

const orders = [
  { id: 'ORD-001', district: 'Krishna', items: 150, type: 'Single Vision', ordered: '25 May 2025', expected: '10 Jun 2025', status: 'In Progress', progress: 60 },
  { id: 'ORD-002', district: 'Guntur', items: 200, type: 'Bifocal', ordered: '20 May 2025', expected: '05 Jun 2025', status: 'Delivered', progress: 100 },
  { id: 'ORD-003', district: 'Kurnool', items: 100, type: 'Reading Glass', ordered: '28 May 2025', expected: '08 Jun 2025', status: 'Pending', progress: 0 },
];

export default function VendorDashboard() {
  const router = useRouter();
  return (
    <AppShell
      sidebar={<Sidebar role="vendor" userName="Vision Plus Ltd" userSub="Spectacle Vendor" />}
      topbar={<Topbar title="Vendor Dashboard" subtitle="Vision Plus Ltd" />}
    >
      <div className="mb-5 rounded-[20px] bg-gradient-to-br from-primary to-primary-light p-6 text-white">
        <div className="text-lg font-extrabold">Vision Plus Ltd</div>
        <div className="mb-4 text-xs opacity-70">Registered Spectacle Vendor • AP Vision Program</div>
        <div className="flex gap-8">
          {[{ v: '700', l: 'Total Orders' }, { v: '560', l: 'Delivered' }, { v: '80%', l: 'Rating' }, { v: '4.5★', l: 'Performance' }].map(k => (
            <div key={k.l}>
              <div className="text-[22px] font-black">{k.v}</div>
              <div className="text-[11px] opacity-70">{k.l}</div>
            </div>
          ))}
        </div>
      </div>

      <StatsGrid cols={4} className="mb-3.5">
        <StatCard title="Pending Orders" value="3" icon="📦" color="#E65100" delay={0.05} onClick={() => router.push('/vendor/order/ORD-001')} />
        <StatCard title="In Progress" value="5" icon="⚙️" color="#1A3A6B" delay={0.10} />
        <StatCard title="Delivered" value="42" icon="✅" color="#2E7D32" delay={0.15} />
        <StatCard title="Pending Verify" value="2" icon="🔍" color="#D4A017" delay={0.20} onClick={() => router.push('/vendor/delivery')} />
      </StatsGrid>

      <SectionHeader title="Recent Orders" actionLabel="View All" onAction={() => router.push('/vendor/order/ORD-001')} />
      <div className="mt-2 flex flex-col gap-3.5">
        {orders.map((o, i) => (
          <Card key={o.id} className={`animate-fade-up cursor-pointer ${fadeDelay(i + 1)}`} onClick={() => router.push(`/vendor/order/${o.id}`)}>
            <CardBody>
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <div className="text-[15px] font-extrabold">{o.id}</div>
                  <div className="text-xs text-grey-400">{o.district} District • {o.type}</div>
                </div>
                <StatusBadge label={o.status} />
              </div>
              <div className="mb-3.5 grid grid-cols-3 gap-3">
                <div><div className="text-[10px] text-grey-400">QUANTITY</div><div className="font-bold">{o.items} pairs</div></div>
                <div><div className="text-[10px] text-grey-400">ORDERED</div><div className="font-bold">{o.ordered}</div></div>
                <div><div className="text-[10px] text-grey-400">EXPECTED</div><div className="font-bold">{o.expected}</div></div>
              </div>
              <div>
                <div className="mb-1 flex justify-between">
                  <span className="text-[11px] text-grey-400">Progress</span>
                  <span className="text-[11px] font-bold">{o.progress}%</span>
                </div>
                <ProgressBar value={o.progress} color={o.progress === 100 ? '#2E7D32' : '#1A3A6B'} />
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
