"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui";
import Modal, { SuccessBanner, downloadFile } from "@/app/components/Modal";
import { cn } from "@/app/lib/cn";
import {
  MOBILE_SYMPTOMS,
  DECISION_OUTCOMES,
  OCULAR_HISTORY,
} from "@/app/components/registration/constants";
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
        label="Marital Status"
        id="maritalStatus"
        options={["Single", "Married", "Widowed", "Divorced", "Separated"]}
        value={form.maritalStatus ?? ""}
        onChange={(v) => update("maritalStatus", v)}
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
        label="Duration of Disease"
        id="diseaseDuration"
        options={[
          "Less than 1 year",
          "1-5 years",
          "More than 5 years",
          "Not Applicable",
        ]}
        value={form.diseaseDuration ?? ""}
        onChange={(v) => update("diseaseDuration", v)}
      />
      <SelectField
        label="Current Treatment"
        id="currentTreatment"
        options={[
          "Regular",
          "Irregular",
          "Not Taking Treatment",
          "Not Applicable",
        ]}
        value={form.currentTreatment ?? ""}
        onChange={(v) => update("currentTreatment", v)}
      />
      <div className="mb-4 mt-4">
        <div className="mb-2 text-xs font-bold text-grey-700">
          Ocular & Eye History
        </div>
        {OCULAR_HISTORY.map((c) => (
          <CheckRow
            key={c}
            id={`ocular-${c}`}
            label={c}
            checked={form[`ocular-${c}`] === "1"}
            onChange={(v) => update(`ocular-${c}`, v ? "1" : "0")}
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
    "Diabetes",
    "Hypertension",
    "Blindness",
    "Glaucoma",
    "Cataract",
    "Genetic Eye Disorders",
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

export function LifestyleStep({ form, update }: StepProps) {
  return (
    <>
      <StepTitle
        title="Lifestyle & Diet"
        subtitle="Dietary pattern and nutrition habits"
        emoji="🥗"
      />
      <SelectField
        label="Dietary Pattern"
        id="diet"
        options={["Vegetarian", "Non-Vegetarian", "Mixed Diet"]}
        value={form.diet ?? ""}
        onChange={(v) => update("diet", v)}
      />
      <SelectField
        label="Fruits Consumption"
        id="fruits"
        options={["Daily", "Weekly", "Rarely", "Never"]}
        value={form.fruits ?? ""}
        onChange={(v) => update("fruits", v)}
      />
      <SelectField
        label="Green Leafy Vegetables"
        id="vegetables"
        options={["Daily", "Weekly", "Rarely", "Never"]}
        value={form.vegetables ?? ""}
        onChange={(v) => update("vegetables", v)}
      />
      <SelectField
        label="Milk / Dairy Products"
        id="dairy"
        options={["Daily", "Weekly", "Rarely", "Never"]}
        value={form.dairy ?? ""}
        onChange={(v) => update("dairy", v)}
      />
      <SelectField
        label="Eggs"
        id="eggs"
        options={["Daily", "Weekly", "Rarely", "Never"]}
        value={form.eggs ?? ""}
        onChange={(v) => update("eggs", v)}
      />
      <SelectField
        label="Junk / Fast Food"
        id="junk"
        options={["Frequently", "Occasionally", "Rarely"]}
        value={form.junk ?? ""}
        onChange={(v) => update("junk", v)}
      />
      <SelectField
        label="Sugary Drinks"
        id="sugary"
        options={["Frequently", "Occasionally", "Rarely"]}
        value={form.sugary ?? ""}
        onChange={(v) => update("sugary", v)}
      />
      <SelectField
        label="Water Intake"
        id="water"
        options={[
          "Less than 2 litres/day",
          "2-4 litres/day",
          "More than 4 litres/day",
        ]}
        value={form.water ?? ""}
        onChange={(v) => update("water", v)}
      />
    </>
  );
}

export function RiskProfileStep({ form, update }: StepProps) {
  const exposures = [
    "Sunlight Exposure >6 hours/day",
    "Dust Exposure",
    "Chemical Exposure",
    "Welding Exposure",
    "Screen Exposure >6 hours/day",
  ];
  return (
    <>
      <StepTitle
        title="Risk Profile"
        subtitle="Occupational, digital device & addiction habits"
        emoji="⚠️"
      />
      <SelectField
        label="Occupation Category"
        id="occCategory"
        options={[
          "Farmer",
          "Fisherman",
          "Labourer",
          "Factory Worker",
          "Student",
          "Driver",
          "IT Employee",
          "Homemaker",
          "Government Employee",
          "Retired",
        ]}
        value={form.occCategory ?? ""}
        onChange={(v) => update("occCategory", v)}
      />
      <div className="mb-4">
        <div className="mb-2 text-xs font-bold text-grey-700">
          Occupational Exposure
        </div>
        {exposures.map((e) => (
          <CheckRow
            key={e}
            id={`exp-${e}`}
            label={e}
            checked={form[`exp-${e}`] === "1"}
            onChange={(v) => update(`exp-${e}`, v ? "1" : "0")}
          />
        ))}
      </div>
      <SelectField
        label="Daily Screen Time"
        id="screenTime"
        options={["<2 hours", "2-4 hours", "4-8 hours", "8+ hours"]}
        value={form.screenTime ?? ""}
        onChange={(v) => update("screenTime", v)}
      />
      <SelectField
        label="Tobacco"
        id="tobacco"
        options={["Never", "Current User", "Former User"]}
        value={form.tobacco ?? ""}
        onChange={(v) => update("tobacco", v)}
      />
      <SelectField
        label="Alcohol"
        id="alcohol"
        options={["Never", "Occasional", "Regular"]}
        value={form.alcohol ?? ""}
        onChange={(v) => update("alcohol", v)}
      />
      <SelectField
        label="Gutka / Pan Masala"
        id="gutka"
        options={["No", "Yes"]}
        value={form.gutka ?? ""}
        onChange={(v) => update("gutka", v)}
      />
    </>
  );
}

export function PopulationHealthStep({ form, update }: StepProps) {
  const qol = [
    "Difficulty Reading",
    "Difficulty Driving",
    "Difficulty Working",
    "Difficulty Recognizing Faces",
    "Difficulty Walking at Night",
  ];
  return (
    <>
      <StepTitle
        title="Population Health"
        subtitle="Women's, elderly, child, access & quality of life"
        emoji="🏥"
      />
      <SelectField
        label="Pregnancy Status"
        id="pregnancy"
        options={["Pregnant", "Not Pregnant", "Not Applicable"]}
        value={form.pregnancy ?? ""}
        onChange={(v) => update("pregnancy", v)}
      />
      <SelectField
        label="Lactating Mother"
        id="lactating"
        options={["Yes", "No", "Not Applicable"]}
        value={form.lactating ?? ""}
        onChange={(v) => update("lactating", v)}
      />
      <SelectField
        label="Anaemia History"
        id="anaemia"
        options={["Yes", "No", "Not Applicable"]}
        value={form.anaemia ?? ""}
        onChange={(v) => update("anaemia", v)}
      />
      <SelectField
        label="History of Falls (Age >60)"
        id="falls"
        options={["Yes", "No", "Not Applicable"]}
        value={form.falls ?? ""}
        onChange={(v) => update("falls", v)}
      />
      <SelectField
        label="Mobility Issues (Age >60)"
        id="mobility"
        options={["Yes", "No", "Not Applicable"]}
        value={form.mobility ?? ""}
        onChange={(v) => update("mobility", v)}
      />
      <Field
        label="School Name (Age <18)"
        id="schoolName"
        placeholder="ZP High School"
        value={form.schoolName ?? ""}
        onChange={(v) => update("schoolName", v)}
      />
      <SelectField
        label="Class"
        id="studentClass"
        options={["1-5", "6-8", "9-10", "11-12", "Not Applicable"]}
        value={form.studentClass ?? ""}
        onChange={(v) => update("studentClass", v)}
      />
      <SelectField
        label="Blackboard Visibility Issues"
        id="blackboard"
        options={["Yes", "No", "Not Applicable"]}
        value={form.blackboard ?? ""}
        onChange={(v) => update("blackboard", v)}
      />
      <SelectField
        label="Last Eye Checkup"
        id="lastCheckup"
        options={["Never", "Within 1 Year", "1-3 Years", "More than 3 Years"]}
        value={form.lastCheckup ?? ""}
        onChange={(v) => update("lastCheckup", v)}
      />
      <SelectField
        label="Distance to Nearest Hospital"
        id="hospitalDist"
        options={["<5 km", "5-10 km", ">10 km"]}
        value={form.hospitalDist ?? ""}
        onChange={(v) => update("hospitalDist", v)}
      />
      <SelectField
        label="Health Insurance"
        id="insurance"
        options={[
          "Ayushman Bharat",
          "State Scheme",
          "Private Insurance",
          "None",
        ]}
        value={form.insurance ?? ""}
        onChange={(v) => update("insurance", v)}
      />
      <div className="mb-4 mt-2">
        <div className="mb-2 text-xs font-bold text-grey-700">
          Quality of Life (due to vision issues)
        </div>
        {qol.map((q) => (
          <CheckRow
            key={q}
            id={`qol-${q}`}
            label={q}
            checked={form[`qol-${q}`] === "1"}
            onChange={(v) => update(`qol-${q}`, v ? "1" : "0")}
          />
        ))}
      </div>
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

export function DecisionEngineStep({ form, update }: StepProps) {
  const selected = form.decisionCase ?? "C";
  return (
    <>
      <StepTitle
        title="Decision Engine"
        subtitle="AI clinical decision engine (Cases A–E)"
        emoji="🤖"
      />
      <div className="mb-4 rounded-xl bg-primary-container p-5">
        <div className="mb-2 text-xs font-bold text-primary">
          Clinical Decision Engine
        </div>
        <p className="text-sm text-grey-700">
          Select the appropriate outcome based on examination.
        </p>
      </div>
      {DECISION_OUTCOMES.map((o) => (
        <button
          key={o.id}
          type="button"
          className={cn(
            "mb-2.5 w-full rounded-xl border p-4 text-left transition",
            selected === o.id
              ? "border-primary bg-primary/5 ring-2 ring-primary/20"
              : "border-grey-200 bg-white",
          )}
          onClick={() => update("decisionCase", o.id)}
        >
          <div className="text-sm font-bold text-grey-900">{o.title}</div>
          <div className="mt-0.5 text-xs text-grey-600">{o.desc}</div>
        </button>
      ))}
    </>
  );
}

export function PrescriptionStep({ form }: { form: FormState }) {
  const [smsOpen, setSmsOpen] = useState(false);
  const [smsSuccess, setSmsSuccess] = useState(false);
  const patientPhone = form.mobile || "9876543210";
  const patientName = form.nameEn || "Ravi Kumar Reddy";
  const decision = DECISION_OUTCOMES.find(
    (o) => o.id === (form.decisionCase ?? "C"),
  );

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
        {decision && (
          <div className="mt-3 rounded-lg bg-primary/5 px-3 py-2 text-xs font-semibold text-primary">
            {decision.title} — will be submitted to nodal officer for approval
          </div>
        )}
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
      return <LifestyleStep form={form} update={update} />;
    case 6:
      return <RiskProfileStep form={form} update={update} />;
    case 7:
      return <PopulationHealthStep form={form} update={update} />;
    case 8:
      return <ExistingSpecsStep form={form} update={update} />;
    case 9:
      return <VisionExamStep form={form} update={update} />;
    case 10:
      return <RefractionStep form={form} update={update} />;
    case 11:
      return <ClinicalAssessmentStep form={form} update={update} />;
    case 12:
      return <FundusExamStep form={form} update={update} />;
    case 13:
      return <DecisionEngineStep form={form} update={update} />;
    case 14:
      return <PrescriptionStep form={form} />;
    default:
      return null;
  }
}
