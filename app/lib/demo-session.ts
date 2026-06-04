import {
  normalizeMobile,
  SESSION_LOGIN_MOBILE_KEY,
} from "@/app/lib/dummy-data";

export const SESSION_DEMO_ROLE_KEY = "apvision_demo_role";

/** Persist demo login context for all roles (prototype — no real API) */
export function persistDemoLogin(role: string, mobile: string) {
  if (typeof window === "undefined") return;
  const m =
    normalizeMobile(mobile) ||
    mobile.replace(/\D/g, "").slice(-10) ||
    "9876543210";
  sessionStorage.setItem(SESSION_LOGIN_MOBILE_KEY, m);
  sessionStorage.setItem(SESSION_DEMO_ROLE_KEY, role);
}

export function getDemoLoginMobile(): string {
  if (typeof window === "undefined") return "9876543210";
  try {
    return sessionStorage.getItem(SESSION_LOGIN_MOBILE_KEY) || "9876543210";
  } catch {
    return "9876543210";
  }
}

export function getDemoRole(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return sessionStorage.getItem(SESSION_DEMO_ROLE_KEY);
  } catch {
    return null;
  }
}
