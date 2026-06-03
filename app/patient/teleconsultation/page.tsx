'use client';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { AppShell } from '@/app/components/app-shell';
import { StatusBadge, Card, CardBody, Button, fadeDelay } from '@/app/components/ui';

const consultations = [
  { id: 'TC-001', doctor: 'Dr. Anita Rao', specialty: 'Tele-Ophthalmologist', hospital: 'SVIMS, Tirupati', scheduledTime: '10 Jun 2025, 10:00 AM', condition: 'Diabetic Retinopathy', status: 'Scheduled' },
  { id: 'TC-002', doctor: 'Dr. Rajesh Reddy', specialty: 'Retinal Specialist', hospital: 'GGH, Vijayawada', scheduledTime: '28 May 2025, 02:00 PM', condition: 'Macular Evaluation', status: 'Completed' },
];

export default function TeleconsultationScreen() {
  return (
    <AppShell
      sidebar={<Sidebar role="patient" userName="Ramaiah Venkata" userSub="Patient" />}
      topbar={<Topbar title="Teleconsultation" subtitle="Video consultations with specialists" />}
    >
      {consultations.filter(c => c.status === 'Scheduled').map(c => (
        <div key={c.id} className="animate-fade-up mb-3 rounded-[20px] bg-gradient-to-br from-primary to-[#01579B] p-6 text-white">
          <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[9px] font-extrabold tracking-wide">UPCOMING</span>
          <div className="mt-3.5 flex items-center gap-4">
            <div className="flex size-[52px] items-center justify-center rounded-full bg-white/20 text-2xl">👨‍⚕️</div>
            <div className="min-w-0 flex-1">
              <div className="text-lg font-extrabold">{c.doctor}</div>
              <div className="text-xs opacity-80">{c.specialty} • {c.hospital}</div>
              <div className="text-xs opacity-70">🕐 {c.scheduledTime}</div>
            </div>
          </div>
          <Button full className="mt-4 bg-white font-extrabold text-primary hover:bg-white/90">
            📹 Join Video Call
          </Button>
        </div>
      ))}

      <div className="mb-3 text-[15px] font-bold">Consultation History</div>
      {consultations.map((c, i) => (
        <Card key={c.id} className={`animate-fade-up mb-2 ${fadeDelay(i + 1)}`}>
          <CardBody>
            <div className="flex items-center gap-2">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl">👨‍⚕️</div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-extrabold">{c.doctor}</div>
                <div className="text-xs text-grey-600">{c.specialty}</div>
                <div className="text-[11px] text-primary">🕐 {c.scheduledTime}</div>
              </div>
              <StatusBadge label={c.status} />
            </div>
          </CardBody>
        </Card>
      ))}
    </AppShell>
  );
}
