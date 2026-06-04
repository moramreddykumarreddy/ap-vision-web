/** Matches ap_vision_care RegistrationFlow step order */
export const REGISTRATION_STEPS = [
  { label: "Basic Info", subtitle: "Enter patient's personal details", emoji: "👤" },
  { label: "Demographics", subtitle: "Socio-economic background details", emoji: "📋" },
  { label: "Symptoms", subtitle: "Select all that apply", emoji: "🩺" },
  { label: "Medical Hx", subtitle: "Systemic conditions & medications", emoji: "💊" },
  { label: "Family Hx", subtitle: "Family eye health history", emoji: "👨‍👩‍👧" },
  { label: "Lifestyle", subtitle: "Dietary pattern & nutrition habits", emoji: "🥗" },
  { label: "Risk Profile", subtitle: "Occupational & digital device usage", emoji: "⚠️" },
  { label: "Pop. Health", subtitle: "Women's, elderly, child & access", emoji: "🏥" },
  { label: "Spectacles", subtitle: "Existing eyewear details", emoji: "👓" },
  { label: "Vision Exam", subtitle: "Visual acuity assessment", emoji: "👁️" },
  { label: "Refraction", subtitle: "Subjective refraction values", emoji: "🔬" },
  { label: "Clinical", subtitle: "Anterior segment & IOP", emoji: "🏥" },
  { label: "Fundus", subtitle: "Posterior segment examination", emoji: "🔍" },
  { label: "Decision", subtitle: "AI clinical decision engine", emoji: "🤖" },
  { label: "Prescription", subtitle: "Generate & share prescription", emoji: "📄" },
] as const;

export const MOBILE_SYMPTOMS = [
  "Diminished Vision",
  "Redness",
  "Pain / Discomfort",
  "Blurred Vision",
  "Photophobia (Light Sensitivity)",
  "Floaters / Flashes",
  "Distortion / Metamorphopsia",
  "Diplopia (Double Vision)",
  "Headache",
  "Watering of Eyes",
  "Eye Pain / Eye Strain",
  "Reading Difficulty",
  "Eye Discharge",
  "Itching",
];

export const OCULAR_HISTORY = [
  "Refractive Error",
  "Cataract",
  "Glaucoma",
  "Ocular Trauma",
  "Eye Surgery",
  "Contact Lens Use",
  "Prosthesis / Conformer Use",
];

export const DECISION_OUTCOMES = [
  { id: "A", title: "Case A: Vision Normal", desc: "No spectacles required." },
  { id: "B", title: "Case B: Existing Glasses Adequate", desc: "Continue existing spectacles." },
  { id: "C", title: "Case C: New Spectacles Required", desc: "Generate order for spectacles." },
  { id: "D", title: "Case D: Clinical Issue Found", desc: "Referral required." },
  { id: "E", title: "Case E: Specialist Review Required", desc: "Teleconsultation required." },
] as const;

export const PATIENTS_BY_MOBILE: Record<string, { id: string; name: string; age: number; gender: string; village: string; district: string }[]> = {
  "9876543210": [
    { id: "P001", name: "Ravi Kumar Reddy", age: 45, gender: "Male", village: "Krishnanagar", district: "Krishna" },
    { id: "P004", name: "Padma Reddy", age: 16, gender: "Female", village: "Krishnanagar", district: "Krishna" },
  ],
  "8765432109": [
    { id: "P002", name: "Lakshmi Devi", age: 62, gender: "Female", village: "Srikakulam", district: "Srikakulam" },
  ],
};

export const LOCATION_REQUIRED_ROLES = new Set(["nodal", "screening"]);
