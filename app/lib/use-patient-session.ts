"use client";

import { useEffect, useState } from "react";
import {
  type DemoPatient,
  SESSION_PATIENT_KEY,
  getPatientById,
  getPrescriptionsForPatient,
  getSpectaclesForPatient,
  getReferralsForPatient,
  getTeleconsultationsForPatient,
  getActivityForPatient,
  patientWithLoginMobile,
} from "@/app/lib/dummy-data";
import { getDemoLoginMobile } from "@/app/lib/demo-session";

const DEFAULT_PATIENT: DemoPatient = {
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
};

export function usePatientSession() {
  const [patient, setPatient] = useState<DemoPatient>(DEFAULT_PATIENT);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_PATIENT_KEY);
      const loginMobile = getDemoLoginMobile();
      if (raw) {
        const parsed = JSON.parse(raw) as DemoPatient;
        const full = getPatientById(parsed.id) ?? parsed;
        setPatient(patientWithLoginMobile(full, loginMobile));
      } else {
        const full = getPatientById(DEFAULT_PATIENT.id) ?? DEFAULT_PATIENT;
        const withMobile = patientWithLoginMobile(full, loginMobile);
        setPatient(withMobile);
        sessionStorage.setItem(SESSION_PATIENT_KEY, JSON.stringify(withMobile));
      }
    } catch {
      setPatient(DEFAULT_PATIENT);
    }
    setReady(true);
  }, []);

  return {
    ready,
    patient,
    prescriptions: getPrescriptionsForPatient(patient.id),
    spectacles: getSpectaclesForPatient(patient.id),
    referrals: getReferralsForPatient(patient.id),
    teleconsultations: getTeleconsultationsForPatient(patient.id),
    activity: getActivityForPatient(patient.id),
    upcomingTele: getTeleconsultationsForPatient(patient.id).find(
      (t) => t.type === "upcoming",
    ),
  };
}
