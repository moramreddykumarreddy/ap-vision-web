'use client';
import { useState } from 'react';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { AppShell } from '@/app/components/app-shell';
import { SectionHeader, Card, CardBody, Button, FormGroup, Select, Textarea, fadeDelay } from '@/app/components/ui';
import Modal, { DetailRow, SuccessBanner } from '@/app/components/Modal';

const initialRecommendations = [
  { id: 1, priority: 'Critical', title: 'Expand Cataract Surgery Camps', district: 'Vizianagaram, Srikakulam', impact: 'High', status: 'Action Required', color: '#C62828', assignee: 'Unassigned', notes: '' },
  { id: 2, priority: 'High', title: 'Increase Screening Frequency – Rural Areas', district: 'Kurnool, Anantapur', impact: 'High', status: 'In Progress', color: '#E65100', assignee: 'Dr. K. Srinivas', notes: 'Initial logistics planned.' },
  { id: 3, priority: 'High', title: 'Vitamin A Supplementation Drive', district: 'Tribal Districts', impact: 'Medium', status: 'Planned', color: '#D4A017', assignee: 'Unassigned', notes: '' },
  { id: 4, priority: 'Medium', title: 'Train Additional Optometrists', district: 'State-wide', impact: 'Medium', status: 'In Progress', color: '#1A3A6B', assignee: 'Dr. M. Lakshmi', notes: 'Nodal training centers selected.' },
  { id: 5, priority: 'Low', title: 'Digital EMR Integration Upgrade', district: 'State-wide', impact: 'Low', status: 'Planned', color: '#00897B', assignee: 'Unassigned', notes: '' },
];

export default function DecisionSupportDashboard() {
  const [recommendations, setRecommendations] = useState(initialRecommendations);
  const [selectedRec, setSelectedRec] = useState<typeof initialRecommendations[0] | null>(null);
  const [assigningRec, setAssigningRec] = useState<typeof initialRecommendations[0] | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [assignee, setAssignee] = useState('');
  const [notes, setNotes] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleOpenView = (rec: typeof initialRecommendations[0]) => {
    setSelectedRec(rec);
    setViewOpen(true);
  };

  const handleOpenAssign = (rec: typeof initialRecommendations[0]) => {
    setAssigningRec(rec);
    setAssignee(rec.assignee !== 'Unassigned' ? rec.assignee : 'Dr. K. Srinivas');
    setNotes(rec.notes);
    setShowSuccess(false);
    setAssignOpen(true);
  };

  const handleSaveAssign = () => {
    if (!assigningRec) return;
    setRecommendations(prev => prev.map(r => r.id === assigningRec.id ? { ...r, assignee, notes, status: r.status === 'Planned' || r.status === 'Action Required' ? 'In Progress' : r.status } : r));
    setShowSuccess(true);
    setTimeout(() => { setAssignOpen(false); setShowSuccess(false); }, 1500);
  };

  return (
    <AppShell
      sidebar={<Sidebar role="admin" userName="Venkat Rao" userSub="Super Admin" />}
      topbar={<Topbar title="Decision Support" subtitle="Evidence-based policy recommendations" />}
    >
      <div className="mb-6 rounded-[20px] bg-gradient-to-br from-accent to-[#F57F17] p-6 text-white">
        <div className="mb-1 text-lg font-extrabold">⚖️ Clinical Decision Support Engine</div>
        <div className="text-xs opacity-85">AI-powered policy and intervention recommendations for AP Vision Program</div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3.5 lg:grid-cols-4">
        {[
          { label: 'Critical Actions', v: recommendations.filter(r => r.priority === 'Critical').length.toString(), color: '#C62828' },
          { label: 'High Priority', v: recommendations.filter(r => r.priority === 'High').length.toString(), color: '#E65100' },
          { label: 'In Progress', v: recommendations.filter(r => r.status === 'In Progress').length.toString(), color: '#1A3A6B' },
          { label: 'Completed', v: '18', color: '#2E7D32' },
        ].map(s => (
          <Card key={s.label} className="animate-fade-up">
            <CardBody className="text-center">
              <div className="text-[28px] font-black" style={{ color: s.color }}>{s.v}</div>
              <div className="text-xs text-grey-400">{s.label}</div>
            </CardBody>
          </Card>
        ))}
      </div>

      <SectionHeader title="Recommendations" />
      <div className="mt-2 flex flex-col gap-3.5">
        {recommendations.map((r, i) => (
          <Card key={r.id} className={`animate-fade-up ${fadeDelay(i + 1)}`}>
            <CardBody>
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl text-xl" style={{ background: r.color + '15', color: r.color }}>
                  {r.priority === 'Critical' ? '🚨' : r.priority === 'High' ? '⚠️' : r.priority === 'Medium' ? '📊' : '📋'}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className="text-[15px] font-extrabold">{r.title}</span>
                    <span className="inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold" style={{ background: r.color + '15', color: r.color }}>{r.priority}</span>
                  </div>
                  <div className="mb-2 text-xs text-grey-400">📍 {r.district}</div>
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-grey-600">
                    <span>Impact: {r.impact}</span>
                    <span>•</span>
                    <span className="font-semibold" style={{ color: r.status === 'Action Required' ? '#C62828' : r.status === 'In Progress' ? '#1A3A6B' : '#9E9E9E' }}>{r.status}</span>
                    <span>•</span>
                    <span>Assignee: <strong>{r.assignee}</strong></span>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Button size="sm" variant="primary" onClick={() => handleOpenView(r)}>View Details</Button>
                  <Button size="sm" variant="outline" onClick={() => handleOpenAssign(r)}>Assign</Button>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {selectedRec && (
        <Modal open={viewOpen} onClose={() => setViewOpen(false)} title={selectedRec.title} subtitle="Recommendation Details & Clinical Insights"
          actions={<Button variant="primary" onClick={() => setViewOpen(false)}>Close</Button>}>
          <div className="flex flex-col gap-1.5">
            <DetailRow label="Priority" value={selectedRec.priority} />
            <DetailRow label="Impact Level" value={selectedRec.impact} />
            <DetailRow label="Target Districts" value={selectedRec.district} />
            <DetailRow label="Current Status" value={selectedRec.status} />
            <DetailRow label="Assigned Personnel" value={selectedRec.assignee} />
            {selectedRec.notes && <DetailRow label="Implementation Notes" value={selectedRec.notes} />}
            <div className="mt-3.5 rounded-lg bg-grey-50 p-3 text-xs leading-relaxed text-grey-800">
              <strong>Analysis & Action Plan:</strong> Based on clinical and demographic data analysis, {selectedRec.title.toLowerCase()} in {selectedRec.district} is highly recommended. The project scope encompasses mobilization of local screening camps, provisioning of standard clinical supplies, and coordination with nodal hospitals for advanced surgeries.
            </div>
          </div>
        </Modal>
      )}

      {assigningRec && (
        <Modal open={assignOpen} onClose={() => setAssignOpen(false)} title="Assign Recommendation" subtitle={assigningRec.title}
          actions={<><Button variant="outline" onClick={() => setAssignOpen(false)} disabled={showSuccess}>Cancel</Button><Button variant="primary" onClick={handleSaveAssign} disabled={showSuccess}>Save Assignment</Button></>}>
          {showSuccess ? (
            <SuccessBanner message="Assignment updated successfully!" />
          ) : (
            <div className="flex flex-col gap-3.5">
              <FormGroup label="Select Officer / Doctor">
                <Select value={assignee} onChange={e => setAssignee(e.target.value)}>
                  <option value="Dr. K. Srinivas">Dr. K. Srinivas (State Eye Health Officer)</option>
                  <option value="Dr. M. Lakshmi">Dr. M. Lakshmi (Regional Director)</option>
                  <option value="Dr. P. Rajesh">Dr. P. Rajesh (District Coordinator)</option>
                  <option value="Dr. S. Anand">Dr. S. Anand (Lead Ophthalmologist)</option>
                </Select>
              </FormGroup>
              <FormGroup label="Implementation Notes">
                <Textarea className="h-20 resize-none" placeholder="Add specific instructions or notes for this recommendation..." value={notes} onChange={e => setNotes(e.target.value)} />
              </FormGroup>
            </div>
          )}
        </Modal>
      )}
    </AppShell>
  );
}
