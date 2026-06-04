'use client';
import { colorAlpha, colors } from '@/app/lib/theme';
import { useRouter } from 'next/navigation';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { AppShell } from '@/app/components/app-shell';
import { StatCard, SectionHeader, StatusBadge, StatsGrid, Card, CardBody, Button, fadeDelay } from '@/app/components/ui';

const consultations = [
  { id: 'CON-001', patientName: 'Ramaiah Venkata', condition: 'Diabetic Retinopathy', scheduledTime: 'Today, 10:00 AM', status: 'Scheduled', village: 'Patamata' },
  { id: 'CON-002', patientName: 'Lakshmi Devi', condition: 'Glaucoma Suspect', scheduledTime: 'Today, 11:30 AM', status: 'Scheduled', village: 'Kurnool' },
  { id: 'CON-003', patientName: 'Suresh Kumar', condition: 'Macular Degeneration', scheduledTime: 'Today, 02:00 PM', status: 'Completed', village: 'Ongole' },
  { id: 'CON-004', patientName: 'Padmavathi', condition: 'Cataract Evaluation', scheduledTime: 'Today, 03:30 PM', status: 'Completed', village: 'Markapur' },
];

export default function TeleDashboard() {
  const router = useRouter();
  const pending = consultations.filter(c => c.status === 'Scheduled').length;
  const completed = consultations.filter(c => c.status === 'Completed').length;
  const nextConsult = consultations.find(c => c.status === 'Scheduled');

  return (
    <AppShell
      sidebar={<Sidebar role="tele" userName="Dr. Anita Rao" userSub="SVIMS, Tirupati" />}
      topbar={<Topbar title="Tele-Ophthalmologist" subtitle="Dr. Anita Rao • SVIMS, Tirupati" />}
    >
      {nextConsult && (
        <div className="animate-fade-up mb-5 rounded-[20px] bg-gradient-to-br from-primary to-info p-6 text-white">
          <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[9px] font-extrabold tracking-wide">NEXT UP</span>
          <div className="mt-3.5 flex items-center gap-4">
            <div className="flex size-[52px] items-center justify-center rounded-full bg-white/20 text-[22px]">👤</div>
            <div className="min-w-0 flex-1">
              <div className="text-lg font-extrabold">{nextConsult.patientName}</div>
              <div className="text-xs opacity-80">{nextConsult.condition}</div>
              <div className="text-[11px] opacity-70">{nextConsult.scheduledTime}</div>
            </div>
          </div>
          <Button variant="inverse" full className="mt-4 font-extrabold" onClick={() => router.push('/tele/video')}>
            📹 Join Consultation
          </Button>
        </div>
      )}

      <SectionHeader title="Today's Summary" />
      <StatsGrid cols={3} className="mt-2 mb-3.5">
        <StatCard title="Pending" value={`${pending}`} icon="⏳" color={colors.warning} delay={0.05} />
        <StatCard title="Completed" value={`${completed}`} icon="✅" color={colors.success} delay={0.10} />
        <StatCard title="Referrals" value="2" icon="🏥" color={colors.error} delay={0.15} />
      </StatsGrid>

      <SectionHeader title="Consultation Queue" actionLabel="View All" onAction={() => router.push('/tele/consultations')} />
      <div className="mt-2 flex flex-col gap-3">
        {consultations.map((c, i) => (
          <Card key={c.id} className={`animate-fade-up cursor-pointer ${fadeDelay(i + 1)}`} onClick={() => router.push('/tele/video')}>
            <CardBody>
              <div className="flex items-center gap-2">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 font-extrabold text-primary">{c.patientName[0]}</div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold">{c.patientName}</div>
                  <div className="text-xs text-grey-400">{c.condition}</div>
                  <div className="text-[11px] text-primary">{c.scheduledTime}</div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <StatusBadge label={c.status} />
                  {c.status === 'Scheduled' && (
                    <Button size="sm" variant="primary" onClick={e => { e.stopPropagation(); router.push('/tele/video'); }}>Join</Button>
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
