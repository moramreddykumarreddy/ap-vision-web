"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui";
import Modal, { SuccessBanner, downloadFile } from "@/app/components/Modal";
import { cn } from "@/app/lib/cn";
import { MOBILE_SYMPTOMS } from "@/app/components/registration/constants";
import {
  AreaTypeSelector,
  CheckRow,
  Field,
  FormGroup,
  Grid2,
  SelectField,
  StepTitle,
  Textarea,
} from "@/app/components/registration/shared";

export type FormState = Record<string, string>;

type StepProps = {
  form: FormState;
  update: (k: string, v: string) => void;
};

export function BasicInfoStep({ form, update }: StepProps) {
  return (
    <>
      <StepTitle
        title="Basic Information"
        subtitle="Enter patient's personal details"
        emoji="👤"
      />
      <div className="mb-6 flex flex-col items-center">
        <div className="relative">
          <div className="flex size-[100px] items-center justify-center rounded-full border-2 border-primary/30 bg-primary/10 text-5xl text-primary/70">
            👤
          </div>
          <button
            type="button"
            className="absolute bottom-0 right-0 flex size-9 items-center justify-center rounded-full bg-primary text-white shadow-md"
            aria-label="Upload photo"
          >
            📷
          </button>
        </div>
        <p className="mt-2 text-xs text-grey-600">Tap to upload photo</p>
      </div>
      <Field
        label="Full Name (English)"
        id="nameEn"
        placeholder="Ravi Kumar Reddy"
        value={form.nameEn ?? ""}
        onChange={(v) => update("nameEn", v)}
        required
      />
      <Field
        label="Full Name (Telugu)"
        id="nameTe"
        placeholder="రవి కుమార్ రెడ్డి"
        value={form.nameTe ?? ""}
        onChange={(v) => update("nameTe", v)}
      />
      <Grid2>
        <Field
          label="Age"
          id="age"
          placeholder="45"
          value={form.age ?? ""}
          onChange={(v) => update("age", v)}
          type="number"
        />
        <SelectField
          label="Gender"
          id="gender"
          options={["Male", "Female", "Other"]}
          value={form.gender ?? ""}
          onChange={(v) => update("gender", v)}
        />
      </Grid2>
      <Field
        label="Mobile Number"
        id="mobile"
        placeholder="9876543210"
        value={form.mobile ?? ""}
        onChange={(v) => update("mobile", v.replace(/\D/g, "").slice(0, 10))}
        type="tel"
        required
      />
      <Field
        label="ABHA Number (Optional)"
        id="abha"
        placeholder="14-XXXX-XXXX-XXXX"
        value={form.abha ?? ""}
        onChange={(v) => update("abha", v)}
      />
      <Field
        label="Address"
        id="address"
        placeholder="H.No, Street, Area"
        value={form.address ?? ""}
        onChange={(v) => update("address", v)}
      />
      <Grid2>
        <SelectField
          label="District"
          id="district"
          options={[
            "Krishna",
            "Guntur",
            "East Godavari",
            "West Godavari",
            "Visakhapatnam",
            "Kurnool",
            "Anantapur",
            "Chittoor",
          ]}
          value={form.district ?? ""}
          onChange={(v) => update("district", v)}
        />
        <Field
          label="Mandal"
          id="mandal"
          placeholder="Vijayawada"
          value={form.mandal ?? ""}
          onChange={(v) => update("mandal", v)}
        />
      </Grid2>
      <Field
        label="Village / Habitation"
        id="village"
        placeholder="Village name"
        value={form.village ?? ""}
        onChange={(v) => update("village", v)}
      />
    </>
  );
}

export function DemographicStep({ form, update }: StepProps) {
  return (
    <>
      <StepTitle
        title="Demographic Information"
        subtitle="Socio-economic background details"
        emoji="📋"
      />
      <SelectField
        label="Education Level"
        id="education"
        options={[
          "Illiterate",
          "Primary School (1-5)",
          "Upper Primary (6-8)",
          "Secondary School (9-10)",
          "Higher Secondary (11-12)",
          "Graduate",
          "Post Graduate",
          "Professional Degree",
        ]}
        value={form.education ?? ""}
        onChange={(v) => update("education", v)}
      />
      <SelectField
        label="Occupation"
        id="occupation"
        options={[
          "Agriculture Labour",
          "Farmer (Own Land)",
          "Skilled Labour",
          "Unskilled Labour",
          "Government Employee",
          "Private Employee",
          "Business / Trade",
          "Homemaker",
          "Student",
          "Retired",
          "Unemployed",
          "Other",
        ]}
        value={form.occupation ?? ""}
        onChange={(v) => update("occupation", v)}
      />
      <SelectField
        label="Income Category"
        id="income"
        options={[
          "BPL (Below Poverty Line)",
          "APL - Low Income (< ₹2 Lakh/year)",
          "APL - Middle Income (₹2-5 Lakh/year)",
          "APL - Higher Income (> ₹5 Lakh/year)",
        ]}
        value={form.income ?? ""}
        onChange={(v) => update("income", v)}
      />
      <SelectField
        label="Social Category"
        id="socialCategory"
        options={[
          "SC (Scheduled Caste)",
          "ST (Scheduled Tribe)",
          "BC-A",
          "BC-B",
          "BC-C",
          "BC-D",
          "BC-E",
          "EWS",
          "OC (Open Category)",
        ]}
        value={form.socialCategory ?? ""}
        onChange={(v) => update("socialCategory", v)}
      />
      <FormGroup label="Area Type">
        <AreaTypeSelector
          value={form.areaType ?? "Urban"}
          onChange={(v) => update("areaType", v)}
        />
      </FormGroup>
      <SelectField
        label="Religion"
        id="religion"
        options={[
          "Hindu",
          "Muslim",
          "Christian",
          "Buddhist",
          "Jain",
          "Sikh",
          "Other",
        ]}
        value={form.religion ?? ""}
        onChange={(v) => update("religion", v)}
      />
      <Field
        label="Ration Card Number (Optional)"
        id="ration"
        placeholder="AP-XXXX-XXXX"
        value={form.ration ?? ""}
        onChange={(v) => update("ration", v)}
      />
    </>
  );
}

export function SymptomsStep({ form, update }: StepProps) {
  const selectedCount = MOBILE_SYMPTOMS.filter(
    (s) => form[`sym-${s}`] === "1",
  ).length;
  return (
    <>
      <StepTitle title="Symptoms" subtitle="Select all that apply" emoji="🩺" />
      <div
        className={cn(
          "mb-4 rounded-lg px-3 py-2 text-sm font-semibold",
          selectedCount === 0
            ? "bg-grey-100 text-grey-600"
            : "bg-primary/10 text-primary",
        )}
      >
        {selectedCount === 0
          ? "No symptoms selected"
          : `${selectedCount} symptom(s) selected`}
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {MOBILE_SYMPTOMS.map((s) => {
          const checked = form[`sym-${s}`] === "1";
          return (
            <button
              key={s}
              type="button"
              onClick={() => update(`sym-${s}`, checked ? "0" : "1")}
              className={cn(
                "rounded-xl border-[1.5px] px-3 py-3 text-left text-[13px] font-medium transition-all",
                checked
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-grey-200 bg-white text-grey-700 hover:border-primary/40",
              )}
            >
              {s}
            </button>
          );
        })}
      </div>
      <SelectField
        label="Duration of Symptoms"
        id="sym-duration"
        options={[
          "< 1 Week",
          "1–4 Weeks",
          "1–3 Months",
          "3–6 Months",
          "> 6 Months",
        ]}
        value={form.symDuration ?? ""}
        onChange={(v) => update("symDuration", v)}
      />
    </>
  );
}

export function MedicalHistoryStep({ form, update }: StepProps) {
  const conditions = [
    "Diabetes Mellitus",
    "Hypertension",
    "Thyroid Disorder",
    "Cardiac Disease",
    "Asthma",
    "Renal Disease",
    "Neurological Disorder",
  ];
  return (
    <>
      <StepTitle
        title="Medical History"
        subtitle="Systemic conditions & medications"
        emoji="💊"
      />
      <div className="mb-4">
        <div className="mb-2 text-xs font-bold text-grey-700">
          Systemic Conditions
        </div>
        {conditions.map((c) => (
          <CheckRow
            key={c}
            id={`cond-${c}`}
            label={c}
            checked={form[`cond-${c}`] === "1"}
            onChange={(v) => update(`cond-${c}`, v ? "1" : "0")}
          />
        ))}
      </div>
      <SelectField
        label="Previous Eye Surgery"
        id="eye-surgery"
        options={[
          "None",
          "Cataract Surgery",
          "LASIK",
          "Retinal Surgery",
          "Glaucoma Surgery",
        ]}
        value={form.eyeSurgery ?? ""}
        onChange={(v) => update("eyeSurgery", v)}
      />
      <FormGroup label="Current Medications">
        <Textarea
          id="medications"
          className="min-h-20 resize-y"
          placeholder="List any ongoing medications..."
          value={form.medications ?? ""}
          onChange={(e) => update("medications", e.target.value)}
        />
      </FormGroup>
    </>
  );
}

export function FamilyHistoryStep({ form, update }: StepProps) {
  const conditions = [
    "Glaucoma",
    "Cataract",
    "Diabetic Retinopathy",
    "Macular Degeneration",
    "Retinitis Pigmentosa",
    "Colour Blindness",
  ];
  return (
    <>
      <StepTitle
        title="Family History"
        subtitle="Family eye health history"
        emoji="👨‍👩‍👧"
      />
      {conditions.map((c) => (
        <CheckRow
          key={c}
          id={`fam-${c}`}
          label={c}
          checked={form[`fam-${c}`] === "1"}
          onChange={(v) => update(`fam-${c}`, v ? "1" : "0")}
        />
      ))}
      <SelectField
        label="Family History of Diabetes"
        id="fam-diabetes"
        options={["None", "Father", "Mother", "Both Parents", "Siblings"]}
        value={form.famDiabetes ?? ""}
        onChange={(v) => update("famDiabetes", v)}
      />
    </>
  );
}

export function ExistingSpecsStep({ form, update }: StepProps) {
  return (
    <>
      <StepTitle
        title="Existing Spectacles"
        subtitle="Existing eyewear details"
        emoji="👓"
      />
      <SelectField
        label="Does patient have existing spectacles?"
        id="has-specs"
        options={["Yes", "No"]}
        value={form.hasSpecs ?? ""}
        onChange={(v) => update("hasSpecs", v)}
      />
      {form.hasSpecs === "Yes" && (
        <>
          <SelectField
            label="Type"
            id="specs-type"
            options={[
              "Single Vision",
              "Bifocal",
              "Progressive",
              "Tinted",
              "Anti-reflection",
            ]}
            value={form.specsType ?? ""}
            onChange={(v) => update("specsType", v)}
          />
          <Grid2>
            <Field
              label="Purchased Year"
              id="specs-year"
              value={form.specsYear ?? ""}
              onChange={(v) => update("specsYear", v)}
              type="number"
            />
            <SelectField
              label="Condition"
              id="specs-condition"
              options={["Good", "Fair", "Poor", "Broken"]}
              value={form.specsCondition ?? ""}
              onChange={(v) => update("specsCondition", v)}
            />
          </Grid2>
        </>
      )}
    </>
  );
}

export function VisionExamStep({ form, update }: StepProps) {
  const vaOptions = [
    "6/6",
    "6/9",
    "6/12",
    "6/18",
    "6/24",
    "6/36",
    "6/60",
    "<6/60",
    "PL+",
    "HMFC",
    "CF",
  ];
  return (
    <>
      <StepTitle
        title="Vision Examination"
        subtitle="Visual acuity assessment"
        emoji="👁️"
      />
      <p className="mb-4 text-xs text-grey-600">
        Visual Acuity (Snellen Chart)
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { label: "Right Eye (OD) – Unaided", id: "va-od-un" },
          { label: "Left Eye (OS) – Unaided", id: "va-os-un" },
          { label: "Right Eye (OD) – Aided", id: "va-od-ai" },
          { label: "Left Eye (OS) – Aided", id: "va-os-ai" },
        ].map((f) => (
          <SelectField
            key={f.id}
            label={f.label}
            id={f.id}
            options={vaOptions}
            value={form[f.id] ?? ""}
            onChange={(v) => update(f.id, v)}
          />
        ))}
      </div>
      <SelectField
        label="Colour Vision"
        id="colour-vision"
        options={[
          "Normal",
          "Deuteranopia",
          "Protanopia",
          "Tritanopia",
          "Achromatopsia",
        ]}
        value={form.colourVision ?? ""}
        onChange={(v) => update("colourVision", v)}
      />
    </>
  );
}

export function RefractionStep({ form, update }: StepProps) {
  return (
    <>
      <StepTitle
        title="Refraction"
        subtitle="Subjective refraction values"
        emoji="🔬"
      />
      {["Right Eye (OD)", "Left Eye (OS)"].map((eye) => (
        <div key={eye} className="mb-4">
          <div className="mb-2 text-xs font-bold text-grey-700">{eye}</div>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {["Sphere (D)", "Cylinder (D)", "Axis (°)", "Add (D)"].map((f) => (
              <Field
                key={f}
                label={f}
                id={`${eye}-${f}`}
                placeholder="0.00"
                value={form[`${eye}-${f}`] ?? ""}
                onChange={(v) => update(`${eye}-${f}`, v)}
                type="number"
              />
            ))}
          </div>
        </div>
      ))}
      <SelectField
        label="Binocular Vision"
        id="bino-vision"
        options={["Normal", "Exophoria", "Esophoria", "Amblyopia"]}
        value={form.binoVision ?? ""}
        onChange={(v) => update("binoVision", v)}
      />
    </>
  );
}

export function ClinicalAssessmentStep({ form, update }: StepProps) {
  return (
    <>
      <StepTitle
        title="Clinical Assessment"
        subtitle="Anterior segment & IOP"
        emoji="🏥"
      />
      {[
        {
          label: "Anterior Segment (Slit Lamp)",
          id: "anterior",
          options: [
            "Normal",
            "Cataract",
            "Corneal Opacity",
            "Pterygium",
            "Conjunctivitis",
          ],
        },
        {
          label: "Intraocular Pressure (IOP)",
          id: "iop",
          options: [
            "Normal (10-21 mmHg)",
            "Elevated (>21 mmHg)",
            "Low (<10 mmHg)",
          ],
        },
        {
          label: "Pupil Reaction",
          id: "pupil",
          options: ["Normal", "RAPD Positive", "Fixed Dilated", "Sluggish"],
        },
        {
          label: "Extraocular Movements",
          id: "eom",
          options: ["Full", "Restricted", "Nystagmus", "Strabismus"],
        },
      ].map((f) => (
        <SelectField
          key={f.id}
          label={f.label}
          id={f.id}
          options={f.options}
          value={form[f.id] ?? ""}
          onChange={(v) => update(f.id, v)}
        />
      ))}
    </>
  );
}

export function FundusExamStep({ form, update }: StepProps) {
  const findings = [
    "Normal Fundus",
    "Diabetic Retinopathy – NPDR",
    "Diabetic Retinopathy – PDR",
    "Hypertensive Retinopathy",
    "Macular Degeneration",
    "Optic Disc Pallor",
    "Retinal Detachment",
    "Cup:Disc Ratio >0.6",
  ];
  return (
    <>
      <StepTitle
        title="Fundus Examination"
        subtitle="Posterior segment examination"
        emoji="🔍"
      />
      {findings.map((f) => (
        <CheckRow
          key={f}
          id={`fundus-${f}`}
          label={f}
          checked={form[`fundus-${f}`] === "1"}
          onChange={(v) => update(`fundus-${f}`, v ? "1" : "0")}
        />
      ))}
      <FormGroup label="Additional Fundus Notes" className="mt-2">
        <Textarea
          id="fundus-notes"
          className="min-h-20 resize-y"
          placeholder="Additional observations..."
          value={form.fundusNotes ?? ""}
          onChange={(e) => update("fundusNotes", e.target.value)}
        />
      </FormGroup>
    </>
  );
}

export function DecisionEngineStep() {
  const conditions = [
    {
      label: "Refractive Error",
      action: "Issue Spectacles",
      color: "text-success",
    },
    {
      label: "Presbyopia",
      action: "Issue Reading Glasses",
      color: "text-success",
    },
  ];
  return (
    <>
      <StepTitle
        title="Decision Engine"
        subtitle="AI clinical decision engine"
        emoji="🤖"
      />
      <div className="mb-4 rounded-xl bg-primary-container p-5">
        <div className="mb-2 text-xs font-bold text-primary">
          AI Clinical Decision Engine
        </div>
        <p className="text-sm text-grey-700">
          Based on examination data, the following conditions have been
          detected:
        </p>
      </div>
      {conditions.map((c) => (
        <div
          key={c.label}
          className="mb-2.5 rounded-xl border border-success/30 bg-success/5 p-4"
        >
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="text-sm font-bold text-grey-900">{c.label}</div>
              <div className={cn("mt-0.5 text-xs font-medium", c.color)}>
                Recommended: {c.action}
              </div>
            </div>
            <span className="rounded-full bg-success/15 px-2.5 py-0.5 text-[11px] font-bold text-success">
              Low Risk
            </span>
          </div>
        </div>
      ))}
      <div className="rounded-xl bg-success/10 p-3.5 text-sm text-success">
        Patient can be managed at camp level. No referral required.
      </div>
    </>
  );
}

export function PrescriptionStep({ form }: { form: FormState }) {
  const [smsOpen, setSmsOpen] = useState(false);
  const [smsSuccess, setSmsSuccess] = useState(false);
  const patientPhone = form.mobile || "9876543210";
  const patientName = form.nameEn || "Ravi Kumar Reddy";

  const getPrescriptionText = () =>
    `AP VISION CARE - PRESCRIPTION\nPatient: ${patientName}\nMobile: +91 ${patientPhone}\nDistrict: ${form.district || "Krishna"}\nGenerated: ${new Date().toLocaleDateString("en-IN")}`;

  return (
    <>
      <StepTitle
        title="Prescription"
        subtitle="Generate & share prescription"
        emoji="📄"
      />
      <div className="mb-5 rounded-xl border border-primary/15 bg-primary-container p-5">
        <div className="text-base font-extrabold text-primary">
          Prescription Summary
        </div>
        <div className="mt-1 text-xs text-grey-500">
          Camp: Vijayawada Urban Camp • {new Date().toLocaleDateString("en-IN")}
        </div>
      </div>
      <div className="mb-5 grid gap-4 sm:grid-cols-2">
        {["Right Eye (OD)", "Left Eye (OS)"].map((eye) => (
          <div key={eye} className="rounded-xl border border-grey-200 p-3.5">
            <div className="mb-2 text-xs font-bold text-primary">{eye}</div>
            {[
              ["Sph", form[`${eye}-Sphere (D)`] || "+1.25"],
              ["Cyl", form[`${eye}-Cylinder (D)`] || "-0.50"],
              [
                "Axis",
                form[`${eye}-Axis (°)`] ? `${form[`${eye}-Axis (°)`]}°` : "90°",
              ],
              ["Add", form[`${eye}-Add (D)`] || "+2.00"],
            ].map(([l, v]) => (
              <div key={l} className="flex justify-between text-xs">
                <span className="text-grey-600">{l}</span>
                <span className="font-bold">{v}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="primary"
          size="sm"
          onClick={() =>
            downloadFile(`Rx_${patientName}.txt`, getPrescriptionText())
          }
        >
          Print
        </Button>
        <Button variant="accent" size="sm" onClick={() => setSmsOpen(true)}>
          Send SMS
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            downloadFile(`Rx_${patientName}.pdf`, getPrescriptionText())
          }
        >
          Save PDF
        </Button>
      </div>
      <Modal
        open={smsOpen}
        onClose={() => setSmsOpen(false)}
        title="Send Prescription via SMS"
        subtitle={`To: ${patientName}`}
        actions={
          <>
            <Button
              variant="outline"
              onClick={() => setSmsOpen(false)}
              disabled={smsSuccess}
            >
              Cancel
            </Button>
            <Button
              variant="accent"
              onClick={() => {
                setSmsSuccess(true);
                setTimeout(() => {
                  setSmsOpen(false);
                  setSmsSuccess(false);
                }, 1500);
              }}
              disabled={smsSuccess}
            >
              Send SMS
            </Button>
          </>
        }
      >
        {smsSuccess ? (
          <SuccessBanner
            message={`Prescription SMS sent to +91 ${patientPhone}!`}
          />
        ) : (
          <p className="text-sm text-grey-700">
            Send the digital prescription and spectacle collection link to the
            patient?
          </p>
        )}
      </Modal>
    </>
  );
}

export function renderRegistrationStep(
  step: number,
  form: FormState,
  update: (k: string, v: string) => void,
) {
  switch (step) {
    case 0:
      return <BasicInfoStep form={form} update={update} />;
    case 1:
      return <DemographicStep form={form} update={update} />;
    case 2:
      return <SymptomsStep form={form} update={update} />;
    case 3:
      return <MedicalHistoryStep form={form} update={update} />;
    case 4:
      return <FamilyHistoryStep form={form} update={update} />;
    case 5:
      return <ExistingSpecsStep form={form} update={update} />;
    case 6:
      return <VisionExamStep form={form} update={update} />;
    case 7:
      return <RefractionStep form={form} update={update} />;
    case 8:
      return <ClinicalAssessmentStep form={form} update={update} />;
    case 9:
      return <FundusExamStep form={form} update={update} />;
    case 10:
      return <DecisionEngineStep />;
    case 11:
      return <PrescriptionStep form={form} />;
    default:
      return null;
  }
}
