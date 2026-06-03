/** Matches ap_vision_care RegistrationFlow step order */
export const REGISTRATION_STEPS = [
  {
    label: "Basic Info",
    subtitle: "Enter patient's personal details",
    emoji: "👤",
  },
  {
    label: "Demographics",
    subtitle: "Socio-economic background details",
    emoji: "📋",
  },
  { label: "Symptoms", subtitle: "Select all that apply", emoji: "🩺" },
  {
    label: "Medical Hx",
    subtitle: "Systemic conditions & medications",
    emoji: "💊",
  },
  { label: "Family Hx", subtitle: "Family eye health history", emoji: "👨‍👩‍👧" },
  { label: "Spectacles", subtitle: "Existing eyewear details", emoji: "👓" },
  { label: "Vision Exam", subtitle: "Visual acuity assessment", emoji: "👁️" },
  {
    label: "Refraction",
    subtitle: "Subjective refraction values",
    emoji: "🔬",
  },
  { label: "Clinical", subtitle: "Anterior segment & IOP", emoji: "🏥" },
  { label: "Fundus", subtitle: "Posterior segment examination", emoji: "🔍" },
  { label: "Decision", subtitle: "AI clinical decision engine", emoji: "🤖" },
  {
    label: "Prescription",
    subtitle: "Generate & share prescription",
    emoji: "📄",
  },
] as const;

export const MOBILE_SYMPTOMS = [
  "Diminished Vision",
  "Redness",
  "Pain in Eye",
  "Blurred Vision",
  "Photophobia (Light Sensitivity)",
  "Floaters",
  "Headache",
  "Watering of Eyes",
  "Reading Difficulty",
  "Double Vision",
  "Eye Discharge",
  "Itching",
];
