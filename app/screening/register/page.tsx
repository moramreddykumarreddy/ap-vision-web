'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/app/components/Sidebar';
import Topbar from '@/app/components/Topbar';

const steps = [
  'Basic Info',
  'Demographic',
  'Medical History',
  'Family History',
  'Symptoms',
  'Vision Exam',
  'Refraction',
  'Existing Specs',
  'Clinical Assessment',
  'Fundus Exam',
  'Decision Engine',
  'Prescription',
];

export default function RegistrationFlow() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Record<string, string>>({});

  const update = (k: string, v: string) => setForm(prev => ({ ...prev, [k]: v }));
  const next = () => { if (step < steps.length - 1) setStep(s => s + 1); else router.push('/screening/dashboard'); };
  const prev = () => { if (step > 0) setStep(s => s - 1); };

  return (
    <div className="app-layout">
      <Sidebar role="screening" userName="Dr. Srinivasa Rao" userSub="Team Lead" />
      <div className="main-content">
        <Topbar title="Patient Registration" subtitle={`Step ${step + 1} of ${steps.length}: ${steps[step]}`} />
        <main className="page-body">
          {/* Progress */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 24, flexWrap: 'wrap' }}>
            {steps.map((s, i) => (
              <div key={s} style={{
                flex: 1, minWidth: 24, height: 4, borderRadius: 4,
                background: i < step ? '#2E7D32' : i === step ? '#1A3A6B' : '#E0E0E0',
                transition: 'background .3s',
              }} />
            ))}
          </div>

          <div className="card animate-fade-up" style={{ maxWidth: 720 }}>
            <div className="card-header">
              <h3>{steps[step]}</h3>
              <span style={{ fontSize: 12, color: '#9E9E9E' }}>Step {step + 1} / {steps.length}</span>
            </div>
            <div className="card-body">
              {step === 0 && <BasicInfoStep form={form} update={update} />}
              {step === 1 && <DemographicStep form={form} update={update} />}
              {step === 2 && <MedicalHistoryStep form={form} update={update} />}
              {step === 3 && <FamilyHistoryStep form={form} update={update} />}
              {step === 4 && <SymptomsStep form={form} update={update} />}
              {step === 5 && <VisionExamStep form={form} update={update} />}
              {step === 6 && <RefractionStep form={form} update={update} />}
              {step === 7 && <ExistingSpecsStep form={form} update={update} />}
              {step === 8 && <ClinicalAssessmentStep form={form} update={update} />}
              {step === 9 && <FundusExamStep form={form} update={update} />}
              {step === 10 && <DecisionEngineStep form={form} />}
              {step === 11 && <PrescriptionStep form={form} />}

              <div className="flex gap-12 mt-24">
                {step > 0 && (
                  <button className="btn btn-outline" onClick={prev}>← Previous</button>
                )}
                <button className="btn btn-primary" style={{ marginLeft: 'auto' }} onClick={next}>
                  {step === steps.length - 1 ? '✅ Complete Registration' : 'Next →'}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ── Step Components ─────────────────────────────────────────── */
function Field({ label, id, placeholder, value, onChange, type = 'text', required }: {
  label: string; id: string; placeholder?: string;
  value: string; onChange: (v: string) => void; type?: string; required?: boolean;
}) {
  return (
    <div className="form-group">
      <label className="form-label">{label}{required && ' *'}</label>
      <input id={id} className="form-input" type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} />
    </div>
  );
}

function Select({ label, id, options, value, onChange }: { label: string; id: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <select id={id} className="form-input form-select" value={value} onChange={e => onChange(e.target.value)}>
        <option value="">Select...</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function CheckRow({ label, id, checked, onChange }: { label: string; id: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
      <input id={id} type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} style={{ width: 16, height: 16, accentColor: '#1A3A6B' }} />
      <label htmlFor={id} style={{ fontSize: 13, cursor: 'pointer' }}>{label}</label>
    </div>
  );
}

function Grid2({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>{children}</div>;
}

function BasicInfoStep({ form, update }: { form: Record<string, string>; update: (k: string, v: string) => void }) {
  return (
    <>
      <Grid2>
        <Field label="First Name" id="first-name" placeholder="Ramaiah" value={form.fname ?? ''} onChange={v => update('fname', v)} required />
        <Field label="Last Name" id="last-name" placeholder="Venkata" value={form.lname ?? ''} onChange={v => update('lname', v)} required />
      </Grid2>
      <Grid2>
        <Field label="Mobile Number" id="mobile" placeholder="9876543210" value={form.mobile ?? ''} onChange={v => update('mobile', v)} type="tel" />
        <Field label="Date of Birth" id="dob" value={form.dob ?? ''} onChange={v => update('dob', v)} type="date" />
      </Grid2>
      <Select label="Gender" id="gender" options={['Male', 'Female', 'Other']} value={form.gender ?? ''} onChange={v => update('gender', v)} />
    </>
  );
}

function DemographicStep({ form, update }: { form: Record<string, string>; update: (k: string, v: string) => void }) {
  return (
    <>
      <Select label="District" id="district" options={['Krishna', 'Guntur', 'Kurnool', 'Nellore', 'East Godavari', 'West Godavari', 'Visakhapatnam', 'Vizianagaram']} value={form.district ?? ''} onChange={v => update('district', v)} />
      <Grid2>
        <Field label="Mandal" id="mandal" placeholder="Vijayawada" value={form.mandal ?? ''} onChange={v => update('mandal', v)} />
        <Field label="Village / Ward" id="village" placeholder="Patamata" value={form.village ?? ''} onChange={v => update('village', v)} />
      </Grid2>
      <Field label="Habitation" id="habitation" placeholder="Main Colony" value={form.habitation ?? ''} onChange={v => update('habitation', v)} />
      <Select label="Category" id="category" options={['BPL', 'APL', 'PMAY', 'General']} value={form.category ?? ''} onChange={v => update('category', v)} />
      <Select label="Occupation" id="occupation" options={['Farmer', 'Student', 'Daily Laborer', 'Business', 'Govt. Employee', 'Housewife', 'Other']} value={form.occupation ?? ''} onChange={v => update('occupation', v)} />
    </>
  );
}

function MedicalHistoryStep({ form, update }: { form: Record<string, string>; update: (k: string, v: string) => void }) {
  const conditions = ['Diabetes Mellitus', 'Hypertension', 'Thyroid Disorder', 'Cardiac Disease', 'Asthma', 'Renal Disease', 'Neurological Disorder'];
  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <div className="form-label mb-8">Systemic Conditions</div>
        {conditions.map(c => (
          <CheckRow key={c} id={`cond-${c}`} label={c} checked={form[`cond-${c}`] === '1'} onChange={v => update(`cond-${c}`, v ? '1' : '0')} />
        ))}
      </div>
      <Select label="Previous Eye Surgery" id="eye-surgery" options={['None', 'Cataract Surgery', 'LASIK', 'Retinal Surgery', 'Glaucoma Surgery']} value={form.eyeSurgery ?? ''} onChange={v => update('eyeSurgery', v)} />
      <div className="form-group">
        <label className="form-label">Current Medications</label>
        <textarea id="medications" className="form-input" style={{ height: 80, resize: 'vertical' }} placeholder="List any ongoing medications..." value={form.medications ?? ''} onChange={e => update('medications', e.target.value)} />
      </div>
    </>
  );
}

function FamilyHistoryStep({ form, update }: { form: Record<string, string>; update: (k: string, v: string) => void }) {
  const conditions = ['Glaucoma', 'Cataract', 'Diabetic Retinopathy', 'Macular Degeneration', 'Retinitis Pigmentosa', 'Colour Blindness'];
  return (
    <>
      <div style={{ marginBottom: 8 }}>
        <div className="form-label mb-8">Family Eye Conditions</div>
        {conditions.map(c => (
          <CheckRow key={c} id={`fam-${c}`} label={c} checked={form[`fam-${c}`] === '1'} onChange={v => update(`fam-${c}`, v ? '1' : '0')} />
        ))}
      </div>
      <Select label="Family History of Diabetes" id="fam-diabetes" options={['None', 'Father', 'Mother', 'Both Parents', 'Siblings']} value={form.famDiabetes ?? ''} onChange={v => update('famDiabetes', v)} />
    </>
  );
}

function SymptomsStep({ form, update }: { form: Record<string, string>; update: (k: string, v: string) => void }) {
  const symptoms = ['Blurred Vision', 'Eye Pain', 'Headache', 'Double Vision', 'Flashes / Floaters', 'Night Blindness', 'Eye Redness', 'Watering', 'Itching'];
  return (
    <>
      <div>
        <div className="form-label mb-8">Current Symptoms</div>
        {symptoms.map(s => (
          <CheckRow key={s} id={`sym-${s}`} label={s} checked={form[`sym-${s}`] === '1'} onChange={v => update(`sym-${s}`, v ? '1' : '0')} />
        ))}
      </div>
      <Select label="Duration of Symptoms" id="sym-duration" options={['< 1 Week', '1–4 Weeks', '1–3 Months', '3–6 Months', '> 6 Months']} value={form.symDuration ?? ''} onChange={v => update('symDuration', v)} />
    </>
  );
}

function VisionExamStep({ form, update }: { form: Record<string, string>; update: (k: string, v: string) => void }) {
  const vaOptions = ['6/6', '6/9', '6/12', '6/18', '6/24', '6/36', '6/60', '<6/60', 'PL+', 'HMFC', 'CF'];
  return (
    <>
      <p style={{ fontSize: 12, color: '#757575', marginBottom: 16 }}>Visual Acuity (Snellen Chart)</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {[
          { label: 'Right Eye (OD) – Unaided', id: 'va-od-un' },
          { label: 'Left Eye (OS) – Unaided', id: 'va-os-un' },
          { label: 'Right Eye (OD) – Aided', id: 'va-od-ai' },
          { label: 'Left Eye (OS) – Aided', id: 'va-os-ai' },
        ].map(f => (
          <Select key={f.id} label={f.label} id={f.id} options={vaOptions} value={form[f.id] ?? ''} onChange={v => update(f.id, v)} />
        ))}
      </div>
      <Select label="Colour Vision" id="colour-vision" options={['Normal', 'Deuteranopia', 'Protanopia', 'Tritanopia', 'Achromatopsia']} value={form.colourVision ?? ''} onChange={v => update('colourVision', v)} />
    </>
  );
}

function RefractionStep({ form, update }: { form: Record<string, string>; update: (k: string, v: string) => void }) {
  return (
    <>
      <p style={{ fontSize: 12, color: '#757575', marginBottom: 16 }}>Subjective Refraction</p>
      {['Right Eye (OD)', 'Left Eye (OS)'].map(eye => (
        <div key={eye} style={{ marginBottom: 16 }}>
          <div className="form-label mb-8">{eye}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {['Sphere (D)', 'Cylinder (D)', 'Axis (°)', 'Add (D)'].map(f => (
              <Field key={f} label={f} id={`${eye}-${f}`} placeholder="0.00" value={form[`${eye}-${f}`] ?? ''} onChange={v => update(`${eye}-${f}`, v)} type="number" />
            ))}
          </div>
        </div>
      ))}
      <Select label="Binocular Vision" id="bino-vision" options={['Normal', 'Exophoria', 'Esophoria', 'Amblyopia']} value={form.binoVision ?? ''} onChange={v => update('binoVision', v)} />
    </>
  );
}

function ExistingSpecsStep({ form, update }: { form: Record<string, string>; update: (k: string, v: string) => void }) {
  return (
    <>
      <Select label="Does patient have existing spectacles?" id="has-specs" options={['Yes', 'No']} value={form.hasSpecs ?? ''} onChange={v => update('hasSpecs', v)} />
      {form.hasSpecs === 'Yes' && (
        <>
          <Select label="Type" id="specs-type" options={['Single Vision', 'Bifocal', 'Progressive', 'Tinted', 'Anti-reflection']} value={form.specsType ?? ''} onChange={v => update('specsType', v)} />
          <Grid2>
            <Field label="Purchased Year" id="specs-year" value={form.specsYear ?? ''} onChange={v => update('specsYear', v)} type="number" />
            <Select label="Condition" id="specs-condition" options={['Good', 'Fair', 'Poor', 'Broken']} value={form.specsCondition ?? ''} onChange={v => update('specsCondition', v)} />
          </Grid2>
        </>
      )}
    </>
  );
}

function ClinicalAssessmentStep({ form, update }: { form: Record<string, string>; update: (k: string, v: string) => void }) {
  return (
    <>
      {[
        { label: 'Anterior Segment (Slit Lamp)', id: 'anterior', options: ['Normal', 'Cataract', 'Corneal Opacity', 'Pterygium', 'Conjunctivitis'] },
        { label: 'Intraocular Pressure (IOP)', id: 'iop', options: ['Normal (10-21 mmHg)', 'Elevated (>21 mmHg)', 'Low (<10 mmHg)'] },
        { label: 'Pupil Reaction', id: 'pupil', options: ['Normal', 'RAPD Positive', 'Fixed Dilated', 'Sluggish'] },
        { label: 'Extraocular Movements', id: 'eom', options: ['Full', 'Restricted', 'Nystagmus', 'Strabismus'] },
      ].map(f => (
        <Select key={f.id} label={f.label} id={f.id} options={f.options} value={form[f.id] ?? ''} onChange={v => update(f.id, v)} />
      ))}
    </>
  );
}

function FundusExamStep({ form, update }: { form: Record<string, string>; update: (k: string, v: string) => void }) {
  const findings = ['Normal Fundus', 'Diabetic Retinopathy – NPDR', 'Diabetic Retinopathy – PDR', 'Hypertensive Retinopathy', 'Macular Degeneration', 'Optic Disc Pallor', 'Retinal Detachment', 'Cup:Disc Ratio >0.6'];
  return (
    <>
      <p style={{ fontSize: 12, color: '#757575', marginBottom: 12 }}>Fundus Examination (Direct/Indirect Ophthalmoscopy)</p>
      {findings.map(f => (
        <CheckRow key={f} id={`fundus-${f}`} label={f} checked={form[`fundus-${f}`] === '1'} onChange={v => update(`fundus-${f}`, v ? '1' : '0')} />
      ))}
      <div className="form-group mt-12">
        <label className="form-label">Additional Fundus Notes</label>
        <textarea className="form-input" id="fundus-notes" style={{ height: 80, resize: 'vertical' }} placeholder="Additional observations..." value={form.fundusNotes ?? ''} onChange={e => update('fundusNotes', e.target.value)} />
      </div>
    </>
  );
}

function DecisionEngineStep({ form }: { form: Record<string, string> }) {
  const conditions = [
    { label: 'Refractive Error', severity: 'low', action: 'Issue Spectacles', color: '#2E7D32' },
    { label: 'Presbyopia', severity: 'low', action: 'Issue Reading Glasses', color: '#2E7D32' },
  ];
  return (
    <>
      <div style={{ background: '#F3F8FF', borderRadius: 12, padding: 20, marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: '#1A3A6B', fontWeight: 700, marginBottom: 8 }}>🤖 AI Clinical Decision Engine</div>
        <div style={{ fontSize: 13, color: '#424242' }}>Based on examination data, the following conditions have been detected:</div>
      </div>
      {conditions.map(c => (
        <div key={c.label} style={{ border: `1.5px solid ${c.color}30`, borderRadius: 10, padding: 16, marginBottom: 10, background: c.color + '06' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{c.label}</div>
              <div style={{ fontSize: 12, color: c.color, marginTop: 2 }}>Recommended: {c.action}</div>
            </div>
            <span style={{ background: c.color + '15', color: c.color, padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700 }}>Low Risk</span>
          </div>
        </div>
      ))}
      <div style={{ background: '#E8F5E9', borderRadius: 10, padding: 14, fontSize: 13, color: '#2E7D32' }}>
        ✅ Patient can be managed at camp level. No referral required.
      </div>
    </>
  );
}

function PrescriptionStep({ form }: { form: Record<string, string> }) {
  return (
    <>
      <div style={{ background: '#F3F8FF', border: '1.5px solid #1A3A6B20', borderRadius: 12, padding: 20, marginBottom: 20 }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: '#1A3A6B', marginBottom: 4 }}>Prescription Summary</div>
        <div style={{ fontSize: 12, color: '#9E9E9E' }}>Camp: Vijayawada Urban Camp • Date: 02 Jun 2025</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        {['Right Eye (OD)', 'Left Eye (OS)'].map(eye => (
          <div key={eye} style={{ border: '1px solid #E0E0E0', borderRadius: 10, padding: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#1A3A6B', marginBottom: 10 }}>{eye}</div>
            {[['Sph', '+1.25'], ['Cyl', '-0.50'], ['Axis', '90°'], ['Add', '+2.00']].map(([l, v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                <span style={{ color: '#757575' }}>{l}</span>
                <span style={{ fontWeight: 700 }}>{v}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <button className="btn btn-primary btn-sm">🖨️ Print Prescription</button>
        <button className="btn btn-accent btn-sm">📱 Send via SMS</button>
        <button className="btn btn-outline btn-sm">💾 Save as PDF</button>
      </div>
    </>
  );
}
