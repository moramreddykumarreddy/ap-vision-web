'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { AppShell } from '@/app/components/app-shell';
import { StatusBadge, Card, CardBody, Button, fadeDelay } from '@/app/components/ui';
import { cn } from '@/app/lib/cn';

const consultations = [
  { id: 'CON-001', patientName: 'Ramaiah Venkata', condition: 'Diabetic Retinopathy', scheduledTime: 'Today, 10:00 AM', status: 'Scheduled', age: 58, village: 'Patamata', notes: '' },
  { id: 'CON-002', patientName: 'Lakshmi Devi', condition: 'Glaucoma Suspect', scheduledTime: 'Today, 11:30 AM', status: 'Scheduled', age: 45, village: 'Kurnool', notes: '' },
  { id: 'CON-003', patientName: 'Suresh Kumar', condition: 'Macular Degeneration', scheduledTime: 'Today, 02:00 PM', status: 'Completed', age: 62, village: 'Ongole', notes: 'Referred to retinal specialist' },
  { id: 'CON-004', patientName: 'Padmavathi', condition: 'Cataract Evaluation', scheduledTime: 'Today, 03:30 PM', status: 'Completed', age: 38, village: 'Markapur', notes: 'Surgery advised' },
  { id: 'CON-005', patientName: 'Narasimha Rao', condition: 'Glaucoma', scheduledTime: 'Tomorrow, 09:00 AM', status: 'Scheduled', age: 71, village: 'Darsi', notes: '' },
];

export default function ConsultationList() {
  const router = useRouter();
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? consultations : consultations.filter(c => c.status === filter);

  return (
    <AppShell
      sidebar={<Sidebar role="tele" userName="Dr. Anita Rao" userSub="SVIMS, Tirupati" />}
      topbar={<Topbar title="Consultation List" subtitle="All teleconsultations" />}
    >
      <div className="mb-5 flex gap-2">
        {['All', 'Scheduled', 'Completed'].map(s => (
          <Button
            key={s}
            size="sm"
            variant={filter === s ? 'primary' : 'outline'}
            className={cn(filter !== s && 'border-grey-300 bg-white text-grey-600')}
            onClick={() => setFilter(s)}
          >
            {s} ({(s === 'All' ? consultations : consultations.filter(c => c.status === s)).length})
          </Button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {filtered.map((c, i) => (
          <Card key={c.id} className={`animate-fade-up ${fadeDelay(i + 1)}`}>
            <CardBody>
              <div className="flex items-center gap-2">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-base font-extrabold text-primary">{c.patientName[0]}</div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-extrabold">{c.patientName}</div>
                  <div className="text-xs text-grey-600">{c.condition} • {c.age}y • {c.village}</div>
                  <div className="mt-0.5 text-[11px] text-primary">🕐 {c.scheduledTime}</div>
                  {c.notes && <div className="mt-0.5 text-[11px] italic text-grey-400">📝 {c.notes}</div>}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <StatusBadge label={c.status} />
                  {c.status === 'Scheduled' && (
                    <Button size="sm" variant="primary" onClick={() => router.push('/tele/video')}>📹 Join</Button>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
