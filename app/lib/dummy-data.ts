/** Central demo data for AP Vision web prototype */

export type DemoPatient = {
  id: string;
  name: string;
  age: number;
  gender: string;
  mobile: string;
  village: string;
  mandal: string;
  district: string;
  abha: string;
  occupation: string;
  category: string;
};

export const DEMO_PATIENTS: DemoPatient[] = [
  {
    id: "P001",
    name: "Ravi Kumar Reddy",
    age: 45,
    gender: "Male",
    mobile: "9876543210",
    village: "Krishnanagar",
    mandal: "Vijayawada Urban",
    district: "Krishna",
    abha: "14-3456-7890-1234",
    occupation: "Farmer",
    category: "BPL",
  },
  {
    id: "P004",
    name: "Padma Reddy",
    age: 16,
    gender: "Female",
    mobile: "9876543210",
    village: "Krishnanagar",
    mandal: "Vijayawada Urban",
    district: "Krishna",
    abha: "14-5678-9012-3456",
    occupation: "Student",
    category: "BPL",
  },
  {
    id: "P002",
    name: "Lakshmi Devi",
    age: 62,
    gender: "Female",
    mobile: "8765432109",
    village: "Srikakulam",
    mandal: "Palasa",
    district: "Srikakulam",
    abha: "14-2345-6789-0123",
    occupation: "Agriculture Labour",
    category: "BPL",
  },
  {
    id: "P003",
    name: "Suresh Babu",
    age: 38,
    gender: "Male",
    mobile: "7654321098",
    village: "Brodipet",
    mandal: "Guntur Urban",
    district: "Guntur",
    abha: "14-1234-5678-9012",
    occupation: "Government Employee",
    category: "APL",
  },
];

/** Demo mobiles that map to specific families */
export const DEMO_MOBILE_HINTS: Record<string, string> = {
  "9876543210": "Ravi Kumar family (2 profiles)",
  "8765432109": "Lakshmi Devi",
  "7654321098": "Suresh Babu",
  "1111111111": "Demo walkthrough — sample family",
  "9999999999": "Demo walkthrough — sample family",
};

export function normalizeMobile(mobile: string): string {
  return mobile.replace(/\D/g, "").slice(-10);
}

/** Patients for login — always show full demo roster (any mobile number) */
export function getPatientsForMobile(mobile: string): {
  patients: DemoPatient[];
  isDemoFallback: boolean;
} {
  const m = normalizeMobile(mobile);
  const exact = m ? DEMO_PATIENTS.filter((p) => p.mobile === m) : [];
  return {
    patients: DEMO_PATIENTS,
    isDemoFallback: m.length === 0 || exact.length === 0,
  };
}

/** Attach logged-in mobile to profile for display */
export function patientWithLoginMobile(
  patient: DemoPatient,
  loginMobile: string,
): DemoPatient {
  const m = normalizeMobile(loginMobile);
  return m ? { ...patient, mobile: m } : patient;
}

export function getPatientById(id: string): DemoPatient | undefined {
  return DEMO_PATIENTS.find((p) => p.id === id);
}

/** Default profile used when patient logs in on web (single profile, no picker) */
export const DEFAULT_WEB_PATIENT_ID = "P001";

export function persistDefaultPatientSession(loginMobile: string): DemoPatient {
  const base = getPatientById(DEFAULT_WEB_PATIENT_ID) ?? DEMO_PATIENTS[0]!;
  const stored = patientWithLoginMobile(base, loginMobile);
  if (typeof window !== "undefined") {
    sessionStorage.setItem(SESSION_PATIENT_KEY, JSON.stringify(stored));
    sessionStorage.setItem(
      SESSION_LOGIN_MOBILE_KEY,
      normalizeMobile(loginMobile) || "9876543210",
    );
  }
  return stored;
}

const PRESCRIPTIONS_BY_PATIENT: Record<
  string,
  {
    id: string;
    date: string;
    doctor: string;
    diagnosis: string;
    odSphere: string;
    odCyl: string;
    odAxis: string;
    osSphere: string;
    osCyl: string;
    osAxis: string;
    add: string;
    type: string;
    status: string;
  }[]
> = {
  P001: [
    {
      id: "RX-001",
      date: "02 Jun 2025",
      doctor: "Dr. Srinivasa Rao",
      diagnosis: "Myopia with Astigmatism",
      odSphere: "-2.50",
      odCyl: "-0.75",
      odAxis: "180",
      osSphere: "-2.25",
      osCyl: "-0.50",
      osAxis: "175",
      add: "N/A",
      type: "Single Vision",
      status: "Active",
    },
    {
      id: "RX-002",
      date: "10 Jan 2025",
      doctor: "Dr. Priya Devi",
      diagnosis: "Presbyopia",
      odSphere: "+1.25",
      odCyl: "-0.50",
      odAxis: "90",
      osSphere: "+1.00",
      osCyl: "-0.25",
      osAxis: "80",
      add: "+2.00",
      type: "Bifocal",
      status: "Old",
    },
  ],
  P004: [
    {
      id: "RX-004",
      date: "02 Jun 2025",
      doctor: "Dr. Srinivasa Rao",
      diagnosis: "Myopia",
      odSphere: "-1.50",
      odCyl: "-0.25",
      odAxis: "180",
      osSphere: "-1.25",
      osCyl: "0.00",
      osAxis: "0",
      add: "N/A",
      type: "Single Vision",
      status: "Active",
    },
  ],
  P002: [
    {
      id: "RX-003",
      date: "18 Mar 2024",
      doctor: "Dr. Priya Sharma",
      diagnosis: "Presbyopia + Cataract",
      odSphere: "+2.00",
      odCyl: "-1.00",
      odAxis: "90",
      osSphere: "+1.75",
      osCyl: "-0.75",
      osAxis: "85",
      add: "+2.50",
      type: "Bifocal",
      status: "Active",
    },
  ],
  P003: [
    {
      id: "RX-005",
      date: "20 Mar 2024",
      doctor: "Dr. Anand Kumar",
      diagnosis: "Hyperopia",
      odSphere: "+1.50",
      odCyl: "0.00",
      odAxis: "0",
      osSphere: "+1.25",
      osCyl: "-0.25",
      osAxis: "90",
      add: "N/A",
      type: "Single Vision",
      status: "Active",
    },
  ],
};

export function getPrescriptionsForPatient(patientId: string) {
  return (
    PRESCRIPTIONS_BY_PATIENT[patientId] ?? PRESCRIPTIONS_BY_PATIENT.P001 ?? []
  );
}

const SPECTACLES_BY_PATIENT: Record<
  string,
  {
    id: string;
    status: string;
    progress: number;
    location: string;
    ordered: string;
    expected: string;
  }[]
> = {
  P001: [
    {
      id: "ORD-001",
      status: "Delivered",
      progress: 100,
      location: "Collected at Vijayawada Camp — 19 Jan 2025",
      ordered: "15 Dec 2024",
      expected: "Delivered",
    },
  ],
  P004: [
    {
      id: "ORD-002",
      status: "Manufacturing",
      progress: 60,
      location: "Being manufactured at Vision Plus Ltd",
      ordered: "02 Jun 2025",
      expected: "15 Jun 2025",
    },
  ],
  P002: [
    {
      id: "ORD-003",
      status: "Dispatched",
      progress: 85,
      location: "Dispatched to Palasa distribution camp",
      ordered: "01 Jun 2025",
      expected: "08 Jun 2025",
    },
  ],
  P003: [
    {
      id: "ORD-004",
      status: "Quality Check",
      progress: 75,
      location: "Quality verification at vendor",
      ordered: "28 May 2025",
      expected: "05 Jun 2025",
    },
  ],
};

export function getSpectaclesForPatient(patientId: string) {
  return SPECTACLES_BY_PATIENT[patientId] ?? SPECTACLES_BY_PATIENT.P001 ?? [];
}

const REFERRALS_BY_PATIENT: Record<
  string,
  {
    id: string;
    hospital: string;
    condition: string;
    priority: string;
    status: string;
    date: string;
    doctor: string;
  }[]
> = {
  P001: [
    {
      id: "REF-001",
      hospital: "Government Eye Hospital, Vijayawada",
      condition: "Advanced Glaucoma — follow-up",
      priority: "High",
      status: "Approved",
      date: "20 Mar 2024",
      doctor: "Dr. Venkata Rao",
    },
  ],
  P002: [
    {
      id: "REF-002",
      hospital: "Aravind Eye Hospital, Tirupati",
      condition: "Mature Cataract — surgery evaluation",
      priority: "High",
      status: "Pending",
      date: "18 Mar 2024",
      doctor: "Dr. Priya Sharma",
    },
  ],
  P004: [
    {
      id: "REF-004",
      hospital: "Siddhartha Medical College, Vijayawada",
      condition: "Pediatric myopia — specialist review",
      priority: "Moderate",
      status: "Approved",
      date: "02 Jun 2025",
      doctor: "Dr. Srinivasa Rao",
    },
  ],
  P003: [
    {
      id: "REF-003",
      hospital: "LV Prasad Eye Institute",
      condition: "Diabetic Retinopathy screening",
      priority: "Moderate",
      status: "Completed",
      date: "19 Mar 2024",
      doctor: "Dr. Anand Kumar",
    },
  ],
};

export function getReferralsForPatient(patientId: string) {
  return REFERRALS_BY_PATIENT[patientId] ?? REFERRALS_BY_PATIENT.P001 ?? [];
}

const TELE_BY_PATIENT: Record<
  string,
  {
    id: string;
    doctor: string;
    date: string;
    time: string;
    status: string;
    condition: string;
    type: "upcoming" | "past";
  }[]
> = {
  P001: [
    {
      id: "TC-001",
      doctor: "Dr. Anita Rao",
      date: "10 Jun 2025",
      time: "10:00 AM",
      status: "Scheduled",
      condition: "Glaucoma follow-up",
      type: "upcoming",
    },
    {
      id: "TC-002",
      doctor: "Dr. Srinivasa Rao",
      date: "15 Jan 2025",
      time: "2:30 PM",
      status: "Completed",
      condition: "Routine review",
      type: "past",
    },
  ],
  P004: [
    {
      id: "TC-003",
      doctor: "Dr. Priya Devi",
      date: "12 Jun 2025",
      time: "11:30 AM",
      status: "Scheduled",
      condition: "School vision review",
      type: "upcoming",
    },
  ],
  P002: [],
  P003: [
    {
      id: "TC-004",
      doctor: "Dr. Venkata Rao",
      date: "05 May 2025",
      time: "3:00 PM",
      status: "Completed",
      condition: "Hyperopia management",
      type: "past",
    },
  ],
};

export function getTeleconsultationsForPatient(patientId: string) {
  return TELE_BY_PATIENT[patientId] ?? TELE_BY_PATIENT.P001 ?? [];
}

export function getActivityForPatient(patientId: string) {
  const p = getPatientById(patientId);
  return [
    {
      icon: "💊",
      label: "Prescription Generated",
      sub: `Camp screening • ${p?.district ?? "Krishna"}`,
      date: "02 Jun 2025",
      color: "#1A3A6B",
    },
    {
      icon: "👓",
      label: "Spectacles Ordered",
      sub: "Vision Plus Ltd • Krishna District",
      date: "01 Jun 2025",
      color: "#00897B",
    },
    {
      icon: "🔬",
      label: "Vision Screening Done",
      sub: "Vijayawada Urban Camp",
      date: "01 Jun 2025",
      color: "#D4A017",
    },
    {
      icon: "🏥",
      label: "Referral Updated",
      sub: "Specialist network",
      date: "28 May 2025",
      color: "#C62828",
    },
  ];
}

export const SESSION_PATIENT_KEY = "apvision_patient";
export const SESSION_LOGIN_MOBILE_KEY = "apvision_login_mobile";
