'use client';
import { useParams, useRouter } from 'next/navigation';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { StatusBadge, ProgressBar } from '@/app/components/ui';

const ordersData: Record<string, object> = {
  'ORD-001': { id: 'ORD-001', district: 'Krishna', mandal: 'Vijayawada', items: 150, type: 'Single Vision', frame: 'Full Rim', ordered: '25 May 2025', expected: '10 Jun 2025', status: 'In Progress', progress: 60, contact: 'Ravi Shankar', phone: '9876543210', address: 'District Hospital, Vijayawada' },
  'ORD-002': { id: 'ORD-002', district: 'Guntur', mandal: 'Tenali', items: 200, type: 'Bifocal', frame: 'Half Rim', ordered: '20 May 2025', expected: '05 Jun 2025', status: 'Delivered', progress: 100, contact: 'Narayana Rao', phone: '9765432109', address: 'PHC Building, Tenali' },
};

const timeline = [
  { step: 'Order Placed', time: '25 May 2025, 09:00 AM', done: true },
  { step: 'Manufacturing Started', time: '26 May 2025, 02:00 PM', done: true },
  { step: 'Quality Check', time: '28 May 2025, 11:00 AM', done: true },
  { step: 'Dispatched', time: '01 Jun 2025, 04:00 PM', done: false },
  { step: 'Delivered', time: 'Expected: 10 Jun 2025', done: false },
];

export default function OrderDetails() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const order = (ordersData[id as string] ?? ordersData['ORD-001']) as Record<string, unknown>;

  return (
    <div className="app-layout">
      <Sidebar role="vendor" userName="Vision Plus Ltd" userSub="Spectacle Vendor" />
      <div className="main-content">
        <Topbar title={`Order ${order.id as string}`} subtitle={`${order.district as string} District`} />
        <main className="page-body">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {/* Order Details */}
            <div>
              <div className="card mb-16">
                <div className="card-header">
                  <h3>Order Information</h3>
                  <StatusBadge label={order.status as string} />
                </div>
                <div className="card-body">
                  {[
                    { l: 'Order ID', v: order.id },
                    { l: 'District', v: order.district },
                    { l: 'Mandal', v: order.mandal },
                    { l: 'Lens Type', v: order.type },
                    { l: 'Frame Type', v: order.frame },
                    { l: 'Quantity', v: `${order.items} pairs` },
                    { l: 'Ordered Date', v: order.ordered },
                    { l: 'Expected Delivery', v: order.expected },
                  ].map(item => (
                    <div key={item.l as string} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F5F5F5' }}>
                      <span style={{ fontSize: 12, color: '#9E9E9E' }}>{item.l as string}</span>
                      <span style={{ fontSize: 13, fontWeight: 700 }}>{item.v as string}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 12, color: '#9E9E9E' }}>Progress</span>
                      <span style={{ fontSize: 13, fontWeight: 700 }}>{order.progress as number}%</span>
                    </div>
                    <ProgressBar value={order.progress as number} color="#1A3A6B" />
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header"><h3>Contact Details</h3></div>
                <div className="card-body">
                  {[
                    { l: 'Nodal Contact', v: order.contact },
                    { l: 'Phone', v: order.phone },
                    { l: 'Delivery Address', v: order.address },
                  ].map(item => (
                    <div key={item.l as string} style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 10, color: '#9E9E9E', fontWeight: 700 }}>{item.l as string}</div>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>{item.v as string}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <div className="card">
                <div className="card-header"><h3>Order Timeline</h3></div>
                <div className="card-body">
                  <div className="order-timeline">
                    {timeline.map((t, i) => (
                      <div key={t.step} className="order-timeline-item">
                        <div className={`order-timeline-dot${t.done ? ' active' : ''}`} />
                        <div style={{ fontSize: 13, fontWeight: t.done ? 700 : 500, color: t.done ? '#1A3A6B' : '#BDBDBD' }}>{t.step}</div>
                        <div style={{ fontSize: 11, color: '#BDBDBD', marginTop: 2 }}>{t.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => router.push('/vendor/delivery')}>Update Status</button>
                <button className="btn btn-outline" style={{ flex: 1 }}>Download Invoice</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
