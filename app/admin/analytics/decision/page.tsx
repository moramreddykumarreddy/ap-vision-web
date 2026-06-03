'use client';
import { useState } from 'react';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';
import { SectionHeader } from '@/app/components/ui';
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

  // Form State
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
    setTimeout(() => {
      setAssignOpen(false);
      setShowSuccess(false);
    }, 1500);
  };

  return (
    <div className="app-layout">
      <Sidebar role="admin" userName="Venkat Rao" userSub="Super Admin" />
      <div className="main-content">
        <Topbar title="Decision Support" subtitle="Evidence-based policy recommendations" />
        <main className="page-body">
          <div style={{ background: 'linear-gradient(135deg, #D4A017, #F57F17)', borderRadius: 20, padding: 24, color: 'white', marginBottom: 24 }}>
            <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>⚖️ Clinical Decision Support Engine</div>
            <div style={{ fontSize: 12, opacity: 0.85 }}>AI-powered policy and intervention recommendations for AP Vision Program</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
            {[
              { label: 'Critical Actions', v: recommendations.filter(r => r.priority === 'Critical').length.toString(), color: '#C62828' },
              { label: 'High Priority', v: recommendations.filter(r => r.priority === 'High').length.toString(), color: '#E65100' },
              { label: 'In Progress', v: recommendations.filter(r => r.status === 'In Progress').length.toString(), color: '#1A3A6B' },
              { label: 'Completed', v: '18', color: '#2E7D32' },
            ].map(s => (
              <div key={s.label} className="card animate-fade-up">
                <div className="card-body" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: s.color }}>{s.v}</div>
                  <div style={{ fontSize: 12, color: '#9E9E9E' }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          <SectionHeader title="Recommendations" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 12 }}>
            {recommendations.map((r, i) => (
              <div key={r.id} className={`card animate-fade-up d${i + 1}`}>
                <div className="card-body">
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: r.color + '15', color: r.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                      {r.priority === 'Critical' ? '🚨' : r.priority === 'High' ? '⚠️' : r.priority === 'Medium' ? '📊' : '📋'}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 15, fontWeight: 800 }}>{r.title}</span>
                        <span className="badge" style={{ background: r.color + '15', color: r.color }}>{r.priority}</span>
                      </div>
                      <div style={{ fontSize: 12, color: '#9E9E9E', marginBottom: 8 }}>📍 {r.district}</div>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <span style={{ fontSize: 11, color: '#757575' }}>Impact: {r.impact}</span>
                        <span style={{ fontSize: 11, color: '#757575' }}>•</span>
                        <span style={{ fontSize: 11, fontWeight: 600, color: r.status === 'Action Required' ? '#C62828' : r.status === 'In Progress' ? '#1A3A6B' : '#9E9E9E' }}>{r.status}</span>
                        <span style={{ fontSize: 11, color: '#757575' }}>•</span>
                        <span style={{ fontSize: 11, color: '#616161' }}>Assignee: <strong>{r.assignee}</strong></span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <button className="btn btn-sm btn-primary" onClick={() => handleOpenView(r)}>View Details</button>
                      <button className="btn btn-sm btn-outline" onClick={() => handleOpenAssign(r)}>Assign</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View Details Modal */}
          {selectedRec && (
            <Modal
              open={viewOpen}
              onClose={() => setViewOpen(false)}
              title={selectedRec.title}
              subtitle="Recommendation Details & Clinical Insights"
              actions={
                <button className="btn btn-primary" onClick={() => setViewOpen(false)}>Close</button>
              }
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <DetailRow label="Priority" value={selectedRec.priority} />
                <DetailRow label="Impact Level" value={selectedRec.impact} />
                <DetailRow label="Target Districts" value={selectedRec.district} />
                <DetailRow label="Current Status" value={selectedRec.status} />
                <DetailRow label="Assigned Personnel" value={selectedRec.assignee} />
                {selectedRec.notes && <DetailRow label="Implementation Notes" value={selectedRec.notes} />}
                <div style={{ marginTop: 14, padding: 12, borderRadius: 8, background: '#F5F7FA', fontSize: 12, color: '#424242', lineHeight: 1.5 }}>
                  <strong>Analysis & Action Plan:</strong> Based on clinical and demographic data analysis, {selectedRec.title.toLowerCase()} in {selectedRec.district} is highly recommended. The project scope encompasses mobilization of local screening camps, provisioning of standard clinical supplies, and coordination with nodal hospitals for advanced surgeries.
                </div>
              </div>
            </Modal>
          )}

          {/* Assign Modal */}
          {assigningRec && (
            <Modal
              open={assignOpen}
              onClose={() => setAssignOpen(false)}
              title="Assign Recommendation"
              subtitle={assigningRec.title}
              actions={
                <>
                  <button className="btn btn-outline" onClick={() => setAssignOpen(false)} disabled={showSuccess}>Cancel</button>
                  <button className="btn btn-primary" onClick={handleSaveAssign} disabled={showSuccess}>Save Assignment</button>
                </>
              }
            >
              {showSuccess ? (
                <SuccessBanner message="Assignment updated successfully!" />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: '#0D2347' }}>Select Officer / Doctor</label>
                    <select
                      value={assignee}
                      onChange={e => setAssignee(e.target.value)}
                      style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #E0E0E0', fontSize: 13, background: 'white' }}
                    >
                      <option value="Dr. K. Srinivas">Dr. K. Srinivas (State Eye Health Officer)</option>
                      <option value="Dr. M. Lakshmi">Dr. M. Lakshmi (Regional Director)</option>
                      <option value="Dr. P. Rajesh">Dr. P. Rajesh (District Coordinator)</option>
                      <option value="Dr. S. Anand">Dr. S. Anand (Lead Ophthalmologist)</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: '#0D2347' }}>Implementation Notes</label>
                    <textarea
                      placeholder="Add specific instructions or notes for this recommendation..."
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #E0E0E0', fontSize: 13, height: 80, resize: 'none' }}
                    />
                  </div>
                </div>
              )}
            </Modal>
          )}
        </main>
      </div>
    </div>
  );
}

