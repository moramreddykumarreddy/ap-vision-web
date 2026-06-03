'use client';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { AppShell } from '@/app/components/app-shell';
import { StatCard, SectionHeader, StatusBadge, ProgressBar, StatsGrid, Card, CardBody, TableWrap, DataTable, fadeDelay } from '@/app/components/ui';

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
    <AppShell
      sidebar={<Sidebar role="nodal" userName="Ravi Shankar" userSub="Nodal Officer, Krishna" />}
      topbar={<Topbar title="Vendor Monitoring" subtitle="Track spectacle supply and delivery" />}
    >
      <StatsGrid cols={3} className="mb-3.5">
        <StatCard title="Total Ordered" value="700" icon="📦" color="#1A3A6B" delay={0.05} />
        <StatCard title="Delivered" value="560" icon="✅" color="#2E7D32" delay={0.10} subtitle="80%" />
        <StatCard title="Pending Delivery" value="140" icon="⏳" color="#E65100" delay={0.15} />
      </StatsGrid>

      <SectionHeader title="Vendor Performance" />
      <div className="mt-2 mb-6 flex flex-col gap-3.5">
        {vendors.map((v, i) => (
          <Card key={v.id} className={`animate-fade-up ${fadeDelay(i + 1)}`}>
            <CardBody>
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <div className="text-[15px] font-extrabold">{v.name}</div>
                  <div className="text-xs text-grey-400">{v.contact} • {v.phone}</div>
                </div>
                <div className="text-right">
                  <StatusBadge label={v.status} />
                  <div className="mt-1 text-xs">⭐ {v.rating}</div>
                </div>
              </div>
              <div className="mb-3 grid grid-cols-3 gap-3">
                <div><div className="text-[11px] text-grey-400">Total Orders</div><div className="text-base font-extrabold">{v.ordersTotal}</div></div>
                <div><div className="text-[11px] text-grey-400">Delivered</div><div className="text-base font-extrabold text-success">{v.delivered}</div></div>
                <div><div className="text-[11px] text-grey-400">Pending</div><div className="text-base font-extrabold" style={{ color: v.pending > 0 ? '#E65100' : '#9E9E9E' }}>{v.pending}</div></div>
              </div>
              <div>
                <div className="mb-1 flex justify-between">
                  <span className="text-[11px] text-grey-400">Delivery Rate</span>
                  <span className="text-[11px] font-bold">{Math.round(v.delivered / v.ordersTotal * 100)}%</span>
                </div>
                <ProgressBar value={Math.round(v.delivered / v.ordersTotal * 100)} color={v.status === 'Active' ? '#2E7D32' : '#E65100'} />
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <SectionHeader title="Active Orders" />
      <Card className="mt-2">
        <CardBody className="p-0">
          <TableWrap>
            <DataTable>
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
                    <td className="font-bold">{o.id}</td>
                    <td>{o.vendor}</td>
                    <td>{o.items}</td>
                    <td>{o.type}</td>
                    <td>{o.ordered}</td>
                    <td>{o.expected}</td>
                    <td><StatusBadge label={o.status} /></td>
                  </tr>
                ))}
              </tbody>
            </DataTable>
          </TableWrap>
        </CardBody>
      </Card>
    </AppShell>
  );
}
