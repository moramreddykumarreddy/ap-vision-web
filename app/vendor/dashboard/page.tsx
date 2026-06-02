'use client';
import { useRouter } from 'next/navigation';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { StatCard, SectionHeader, StatusBadge, ProgressBar } from '@/app/components/ui';

const orders = [
  { id: 'ORD-001', district: 'Krishna', items: 150, type: 'Single Vision', ordered: '25 May 2025', expected: '10 Jun 2025', status: 'In Progress', progress: 60 },
  { id: 'ORD-002', district: 'Guntur', items: 200, type: 'Bifocal', ordered: '20 May 2025', expected: '05 Jun 2025', status: 'Delivered', progress: 100 },
  { id: 'ORD-003', district: 'Kurnool', items: 100, type: 'Reading Glass', ordered: '28 May 2025', expected: '08 Jun 2025', status: 'Pending', progress: 0 },
];

export default function VendorDashboard() {
  const router = useRouter();
  return (
    <div className="app-layout">
      <Sidebar role="vendor" userName="Vision Plus Ltd" userSub="Spectacle Vendor" />
      <div className="main-content">
        <Topbar title="Vendor Dashboard" subtitle="Vision Plus Ltd" />
        <main className="page-body">
          <div style={{
            background: 'linear-gradient(135deg, #1A3A6B, #2952A3)',
            borderRadius: 20, padding: 24, color: 'white', marginBottom: 20,
          }}>
            <div style={{ fontSize: 18, fontWeight: 800 }}>Vision Plus Ltd</div>
            <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 16 }}>Registered Spectacle Vendor • AP Vision Program</div>
            <div style={{ display: 'flex', gap: 32 }}>
              {[{ v: '700', l: 'Total Orders' }, { v: '560', l: 'Delivered' }, { v: '80%', l: 'Rating' }, { v: '4.5★', l: 'Performance' }].map(k => (
                <div key={k.l}>
                  <div style={{ fontSize: 22, fontWeight: 900 }}>{k.v}</div>
                  <div style={{ fontSize: 11, opacity: 0.7 }}>{k.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="stats-grid stats-grid-4 mb-24">
            <StatCard title="Pending Orders" value="3" icon="📦" color="#E65100" delay={0.05} onClick={() => router.push('/vendor/order/ORD-001')} />
            <StatCard title="In Progress" value="5" icon="⚙️" color="#1A3A6B" delay={0.10} />
            <StatCard title="Delivered" value="42" icon="✅" color="#2E7D32" delay={0.15} />
            <StatCard title="Pending Verify" value="2" icon="🔍" color="#D4A017" delay={0.20} onClick={() => router.push('/vendor/delivery')} />
          </div>

          <SectionHeader title="Recent Orders" actionLabel="View All" onAction={() => router.push('/vendor/order/ORD-001')} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 12 }}>
            {orders.map((o, i) => (
              <div key={o.id} className={`card animate-fade-up d${i + 1}`} style={{ cursor: 'pointer' }}
                onClick={() => router.push(`/vendor/order/${o.id}`)}>
                <div className="card-body">
                  <div className="flex items-center justify-between mb-12">
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 800 }}>{o.id}</div>
                      <div style={{ fontSize: 12, color: '#9E9E9E' }}>{o.district} District • {o.type}</div>
                    </div>
                    <StatusBadge label={o.status} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 14 }}>
                    <div><div style={{ fontSize: 10, color: '#9E9E9E' }}>QUANTITY</div><div style={{ fontWeight: 700 }}>{o.items} pairs</div></div>
                    <div><div style={{ fontSize: 10, color: '#9E9E9E' }}>ORDERED</div><div style={{ fontWeight: 700 }}>{o.ordered}</div></div>
                    <div><div style={{ fontSize: 10, color: '#9E9E9E' }}>EXPECTED</div><div style={{ fontWeight: 700 }}>{o.expected}</div></div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 11, color: '#9E9E9E' }}>Progress</span>
                      <span style={{ fontSize: 11, fontWeight: 700 }}>{o.progress}%</span>
                    </div>
                    <ProgressBar value={o.progress} color={o.progress === 100 ? '#2E7D32' : '#1A3A6B'} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
