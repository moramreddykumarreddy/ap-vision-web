'use client';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { AppShell } from '@/app/components/app-shell';
import { StatCard, SectionHeader, ProgressBar, StatsGrid, Card, CardBody, CardHeader, CardTitle, TableWrap, DataTable, ChartBarWrap, ChartBarCol } from '@/app/components/ui';

const districtData = [
  { name: 'Visakhapatnam', target: 65000, achieved: 52400, pct: 80, referrals: 1840 },
  { name: 'Krishna', target: 55000, achieved: 48200, pct: 87, referrals: 1620 },
  { name: 'Guntur', target: 52000, achieved: 45600, pct: 87, referrals: 1580 },
  { name: 'Kurnool', target: 50000, achieved: 41200, pct: 82, referrals: 1240 },
  { name: 'East Godavari', target: 48000, achieved: 38900, pct: 81, referrals: 1100 },
  { name: 'West Godavari', target: 45000, achieved: 36700, pct: 81, referrals: 980 },
  { name: 'Nellore', target: 42000, achieved: 33400, pct: 79, referrals: 890 },
  { name: 'Chittoor', target: 40000, achieved: 30200, pct: 75, referrals: 820 },
  { name: 'Kadapa', target: 38000, achieved: 28000, pct: 73, referrals: 740 },
  { name: 'Prakasam', target: 36000, achieved: 26100, pct: 72, referrals: 680 },
  { name: 'Vizianagaram', target: 34000, achieved: 23800, pct: 70, referrals: 600 },
  { name: 'Srikakulam', target: 32000, achieved: 21400, pct: 66, referrals: 520 },
  { name: 'Anantapur', target: 30000, achieved: 19200, pct: 64, referrals: 480 },
];

const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const screenedData = [12000, 18000, 22000, 28000, 35000, 42000, 50000, 60000, 72000, 88000, 100000, 114000];
const maxVal = Math.max(...screenedData);

export default function StateAnalytics() {
  return (
    <AppShell
      sidebar={<Sidebar role="admin" userName="Venkat Rao" userSub="Super Admin" />}
      topbar={<Topbar title="State Analytics" subtitle="Andhra Pradesh • Programme Year 2024–25" />}
    >
      <StatsGrid cols={4} className="mb-3.5">
        <StatCard title="Total Patients" value="1.24M" icon="👥" color="#1A3A6B" delay={0.05} />
        <StatCard title="Screened" value="1.14M" icon="👁️" color="#00897B" delay={0.10} subtitle="91.9%" />
        <StatCard title="Prescriptions" value="186K" icon="💊" color="#D4A017" delay={0.15} />
        <StatCard title="Delivered" value="142K" icon="✅" color="#2E7D32" delay={0.20} subtitle="76%" />
      </StatsGrid>

      <Card className="mb-3.5">
        <CardHeader><CardTitle>Monthly Screening Trend (2024–25)</CardTitle></CardHeader>
        <CardBody>
          <ChartBarWrap>
            {months.map((m, i) => (
              <ChartBarCol
                key={m}
                label={m}
                height={`${(screenedData[i] / maxVal) * 100}%`}
                color={i === months.length - 1 ? '#1A3A6B' : '#1A3A6B80'}
              />
            ))}
          </ChartBarWrap>
        </CardBody>
      </Card>

      <SectionHeader title="District-wise Performance" />
      <Card className="mt-2">
        <CardBody className="p-0">
          <TableWrap>
            <DataTable>
              <thead>
                <tr>
                  <th>#</th>
                  <th>District</th>
                  <th>Target</th>
                  <th>Achieved</th>
                  <th>Coverage</th>
                  <th>Referrals</th>
                </tr>
              </thead>
              <tbody>
                {districtData.map((d, i) => (
                  <tr key={d.name}>
                    <td>{i + 1}</td>
                    <td className="font-bold">{d.name}</td>
                    <td>{d.target.toLocaleString()}</td>
                    <td>{d.achieved.toLocaleString()}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="max-w-20 flex-1">
                          <ProgressBar value={d.pct} color={d.pct >= 85 ? '#2E7D32' : d.pct >= 75 ? '#D4A017' : '#E65100'} />
                        </div>
                        <span className="text-xs font-bold" style={{ color: d.pct >= 85 ? '#2E7D32' : d.pct >= 75 ? '#D4A017' : '#E65100' }}>{d.pct}%</span>
                      </div>
                    </td>
                    <td>{d.referrals.toLocaleString()}</td>
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
