'use client';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { AppShell } from '@/app/components/app-shell';
import { StatusBadge, ProgressBar, Card, CardBody, CardHeader, fadeDelay } from '@/app/components/ui';
import { cn } from '@/app/lib/cn';

const spectacles = [
  {
    id: 'SPC-001', orderedDate: '02 Jun 2025', expectedDate: '12 Jun 2025',
    vendor: 'Vision Plus Ltd', type: 'Bifocal', frame: 'Full Rim',
    power: 'OD: +1.25/-0.50×90  OS: +1.00/-0.25×80', status: 'In Progress',
    progress: 60, location: 'Being manufactured at vendor',
  },
  {
    id: 'SPC-002', orderedDate: '10 Jan 2025', expectedDate: '20 Jan 2025',
    vendor: 'ClearSight Optics', type: 'Single Vision', frame: 'Half Rim',
    power: 'OD: -2.00/-0.50×175  OS: -1.75/-0.25×170', status: 'Delivered',
    progress: 100, location: 'Collected on 19 Jan 2025',
  },
];

const timeline = [
  { label: 'Prescription Generated', done: true },
  { label: 'Order Placed with Vendor', done: true },
  { label: 'Manufacturing', done: true },
  { label: 'Quality Check', done: false },
  { label: 'Dispatched to Camp', done: false },
  { label: 'Delivered to Patient', done: false },
];

export default function SpectacleTracking() {
  return (
    <AppShell
      sidebar={<Sidebar role="patient" userName="Ramaiah Venkata" userSub="Patient" />}
      topbar={<Topbar title="Spectacle Tracking" subtitle="Track your spectacle orders" />}
    >
      {spectacles.map((s, i) => (
        <Card key={s.id} className={`animate-fade-up mb-3 ${fadeDelay(i + 1)}`}>
          <CardHeader>
            <div>
              <div className="text-[15px] font-extrabold">{s.id}</div>
              <div className="text-[11px] text-grey-400">{s.vendor} • Ordered: {s.orderedDate}</div>
            </div>
            <StatusBadge label={s.status} />
          </CardHeader>
          <CardBody>
            <div className="mb-4 rounded-[10px] bg-grey-50 p-3.5">
              <div className="mb-2.5 grid grid-cols-3 gap-2.5">
                {[{ l: 'Type', v: s.type }, { l: 'Frame', v: s.frame }, { l: 'Expected', v: s.expectedDate }].map(item => (
                  <div key={item.l}>
                    <div className="text-[10px] font-bold text-grey-400">{item.l}</div>
                    <div className="text-[13px] font-bold">{item.v}</div>
                  </div>
                ))}
              </div>
              <div><div className="text-[10px] font-bold text-grey-400">PRESCRIPTION POWER</div><div className="text-xs">{s.power}</div></div>
            </div>

            <div className="mb-5">
              <div className="mb-1.5 flex justify-between">
                <span className="text-xs text-grey-400">Delivery Progress</span>
                <span className="text-xs font-bold">{s.progress}%</span>
              </div>
              <ProgressBar value={s.progress} color={s.progress === 100 ? '#2E7D32' : '#1A3A6B'} />
              <div className="mt-1 text-[11px] text-grey-400">📍 {s.location}</div>
            </div>

            {i === 0 && (
              <div className="flex flex-col">
                {timeline.map((t, j) => (
                  <div key={t.label} className="relative flex gap-3 pb-4 last:pb-0">
                    {j < timeline.length - 1 && <div className="absolute left-[4px] top-3 h-[calc(100%-8px)] w-0.5 bg-grey-200" />}
                    <div className={cn('relative z-[1] mt-0.5 size-2.5 shrink-0 rounded-full border-2', t.done ? 'border-success bg-success' : 'border-grey-300 bg-white')} />
                    <span className={cn('text-xs', t.done ? 'font-bold text-primary' : 'text-grey-300')}>{t.label}</span>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>
      ))}
    </AppShell>
  );
}
