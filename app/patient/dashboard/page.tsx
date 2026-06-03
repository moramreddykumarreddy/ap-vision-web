'use client';
import { useRouter } from 'next/navigation';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { AppShell } from '@/app/components/app-shell';
import { StatCard, SectionHeader, StatsGrid, Card, CardBody, Button, fadeDelay } from '@/app/components/ui';

export default function PatientDashboard() {
  const router = useRouter();
  return (
    <AppShell
      sidebar={<Sidebar role="patient" userName="Ramaiah Venkata" userSub="Patient" />}
      topbar={<Topbar title="My Health Dashboard" subtitle="Ramaiah Venkata • APV-001234" />}
    >
      <div className="animate-fade-up mb-5 flex items-center gap-5 rounded-[20px] bg-gradient-to-br from-primary to-primary-light p-6 text-white">
        <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-white/20 text-[28px] font-black">R</div>
        <div className="min-w-0 flex-1">
          <div className="text-xl font-black">Ramaiah Venkata</div>
          <div className="text-xs opacity-70">58 years • Male • APV-001234</div>
          <div className="text-xs opacity-70">Patamata, Krishna District</div>
        </div>
        <Button size="sm" className="bg-white/20 text-white hover:bg-white/30" onClick={() => router.push('/patient/profile')}>
          View Profile
        </Button>
      </div>

      <StatsGrid cols={4} className="mb-3.5">
        <StatCard title="Prescriptions" value="3" icon="💊" color="#1A3A6B" delay={0.05} onClick={() => router.push('/patient/prescriptions')} />
        <StatCard title="Spectacles" value="1" icon="👓" color="#00897B" delay={0.10} onClick={() => router.push('/patient/spectacles')} />
        <StatCard title="Referrals" value="1" icon="🏥" color="#C62828" delay={0.15} onClick={() => router.push('/patient/referrals')} />
        <StatCard title="Consultations" value="2" icon="📹" color="#D4A017" delay={0.20} onClick={() => router.push('/patient/teleconsultation')} />
      </StatsGrid>

      <div className="animate-fade-up mb-3.5 flex items-center gap-3.5 rounded-[14px] border-[1.5px] border-[rgba(0,137,123,0.2)] bg-[rgba(0,137,123,0.05)] p-4.5">
        <span className="text-[28px]">📅</span>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-bold">Next Appointment</div>
          <div className="text-xs text-[#00897B]">Tele-consultation with Dr. Anita Rao</div>
          <div className="text-[11px] text-grey-400">10 Jun 2025 • 10:00 AM</div>
        </div>
        <Button variant="accent" size="sm" onClick={() => router.push('/patient/teleconsultation')}>Join</Button>
      </div>

      <SectionHeader title="Recent Activity" />
      <Card className="mt-2">
        <CardBody className="p-0">
          {[
            { icon: '💊', label: 'Prescription Generated', sub: 'Presbyopia • Dr. Srinivasa Rao', date: '02 Jun 2025', color: '#1A3A6B' },
            { icon: '👓', label: 'Spectacles Ordered', sub: 'Single Vision • Vision Plus Ltd', date: '01 Jun 2025', color: '#00897B' },
            { icon: '🔬', label: 'Vision Screening Done', sub: 'Vijayawada Urban Camp', date: '01 Jun 2025', color: '#D4A017' },
            { icon: '🏥', label: 'Referred to Specialist', sub: 'Cataract Evaluation • Dr. Anita Rao', date: '28 May 2025', color: '#C62828' },
          ].map((item, i) => (
            <div key={item.label} className={`flex animate-fade-up items-center gap-3 border-b border-grey-100 px-5 py-3 last:border-b-0 ${fadeDelay(i + 1)}`}>
              <div className="flex size-[38px] shrink-0 items-center justify-center rounded-[10px] text-lg" style={{ background: item.color + '15' }}>{item.icon}</div>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-bold">{item.label}</div>
                <div className="text-[11px] text-grey-400">{item.sub}</div>
              </div>
              <div className="text-[11px] text-grey-300">{item.date}</div>
            </div>
          ))}
        </CardBody>
      </Card>

      <SectionHeader title="Quick Access" />
      <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {[
          { icon: '💊', label: 'Prescriptions', color: '#1A3A6B', href: '/patient/prescriptions' },
          { icon: '👓', label: 'Spectacles', color: '#00897B', href: '/patient/spectacles' },
          { icon: '🏥', label: 'Referrals', color: '#C62828', href: '/patient/referrals' },
          { icon: '📹', label: 'Teleconsult', color: '#D4A017', href: '/patient/teleconsultation' },
          { icon: '👤', label: 'Profile', color: '#6A1B9A', href: '/patient/profile' },
        ].map((a, i) => (
          <Card
            key={a.label}
            className={`animate-fade-up cursor-pointer p-5 text-center transition-all duration-200 hover:-translate-y-0.5 ${fadeDelay(i + 1)}`}
            onClick={() => router.push(a.href)}
          >
            <div className="mb-2 text-2xl">{a.icon}</div>
            <div className="text-xs font-bold" style={{ color: a.color }}>{a.label}</div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
