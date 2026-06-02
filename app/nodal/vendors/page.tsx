'use client';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { StatCard, SectionHeader, StatusBadge, ProgressBar } from '@/app/components/ui';

const vendors = [
  { id: 'V001', name: 'Vision Plus Ltd', contact: 'Mr. Rajesh Kumar', phone: '9876543210', ordersTotal: 350, delivered: 280, pending: 70, status: 'Active', rating: 4.5 },
  { id: 'V002', name: 'ClearSight Optics', contact: 'Ms. Anitha Rao', phone: '9765432109', ordersTotal: 200, delivered: 200, pending: 0, status: 'Active', rating: 4.8 },
  { id: 'V003', name: 'EyeCare Solutions', contact: 'Mr. Venkat Rao', phone: '9654321098', ordersTotal: 150, delivered: 80, pending: 70, status: 'Delayed', rating: 3.2 },
];

const orders = [
  { id: 'ORD-001', vendor: 'Vision Plus Ltd', items: 150, type: 'Single Vision', ordered: '25 May 2025', expected: '10 Jun 2025', status: 'In Progress' },
  { id: 'ORD-002', vendor: 'ClearSight Optics', items: 200, type: 'Bifocal', ordered: '20 May 2025', expected: '05 Jun 2025', status: 'Delivered' },
  { id: 'ORD-003', vendor: 'EyeCare Solutions', items: 100, type: 'Reading Glass', ordered: '28 May 2025', expected: '08 Jun 2025', status: 'Delayed' },
];

export default function VendorMonitoring() {
  return (
    <div className="app-layout">
      <Sidebar role="nodal" userName="Ravi Shankar" userSub="Nodal Officer, Krishna" />
      <div className="main-content">
        <Topbar title="Vendor Monitoring" subtitle="Track spectacle supply and delivery" />
        <main className="page-body">
          <div className="stats-grid stats-grid-3 mb-24">
            <StatCard title="Total Ordered" value="700" icon="📦" color="#1A3A6B" delay={0.05} />
            <StatCard title="Delivered" value="560" icon="✅" color="#2E7D32" delay={0.10} subtitle="80%" />
            <StatCard title="Pending Delivery" value="140" icon="⏳" color="#E65100" delay={0.15} />
          </div>

          <SectionHeader title="Vendor Performance" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 12, marginBottom: 24 }}>
            {vendors.map((v, i) => (
              <div key={v.id} className={`card animate-fade-up d${i + 1}`}>
                <div className="card-body">
                  <div className="flex items-center justify-between mb-12">
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 800 }}>{v.name}</div>
                      <div style={{ fontSize: 12, color: '#9E9E9E' }}>{v.contact} • {v.phone}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <StatusBadge label={v.status} />
                      <div style={{ fontSize: 12, marginTop: 4 }}>⭐ {v.rating}</div>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 12 }}>
                    <div><div style={{ fontSize: 11, color: '#9E9E9E' }}>Total Orders</div><div style={{ fontSize: 16, fontWeight: 800 }}>{v.ordersTotal}</div></div>
                    <div><div style={{ fontSize: 11, color: '#9E9E9E' }}>Delivered</div><div style={{ fontSize: 16, fontWeight: 800, color: '#2E7D32' }}>{v.delivered}</div></div>
                    <div><div style={{ fontSize: 11, color: '#9E9E9E' }}>Pending</div><div style={{ fontSize: 16, fontWeight: 800, color: v.pending > 0 ? '#E65100' : '#9E9E9E' }}>{v.pending}</div></div>
                  </div>
                  <div style={{ marginBottom: 6 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 11, color: '#9E9E9E' }}>Delivery Rate</span>
                      <span style={{ fontSize: 11, fontWeight: 700 }}>{Math.round(v.delivered / v.ordersTotal * 100)}%</span>
                    </div>
                    <ProgressBar value={Math.round(v.delivered / v.ordersTotal * 100)} color={v.status === 'Active' ? '#2E7D32' : '#E65100'} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <SectionHeader title="Active Orders" />
          <div className="card mt-12">
            <div className="card-body" style={{ padding: 0 }}>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Vendor</th>
                      <th>Items</th>
                      <th>Type</th>
                      <th>Ordered</th>
                      <th>Expected</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(o => (
                      <tr key={o.id}>
                        <td style={{ fontWeight: 700 }}>{o.id}</td>
                        <td>{o.vendor}</td>
                        <td>{o.items}</td>
                        <td>{o.type}</td>
                        <td>{o.ordered}</td>
                        <td>{o.expected}</td>
                        <td><StatusBadge label={o.status} /></td>
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
