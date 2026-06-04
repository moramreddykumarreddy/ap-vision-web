/**
 * AP Vision Care — Andhra Pradesh state vision program
 * Medical & health palette (aligned with globals.css and Flutter AppColors)
 */
export const colors = {
  primary: "#1A3A6B",
  primaryDark: "#0D2347",
  primaryLight: "#2952A3",
  accent: "#00897B",
  accentDark: "#00695C",
  gold: "#D4A017",
  goldLight: "#FFD54F",
  success: "#2E7D32",
  warning: "#E65100",
  warningLight: "#FF9800",
  error: "#C62828",
  errorLight: "#F44336",
  info: "#01579B",
  /** Clinical / analytics blue — use instead of non-health purple tones */
  clinical: "#0277BD",
  grey50: "#FAFAFA",
  grey100: "#F5F5F5",
  grey200: "#EEEEEE",
  grey300: "#E0E0E0",
  grey500: "#9E9E9E",
  grey600: "#757575",
  grey800: "#424242",
  surfaceClinical: "#F5F7FA",
  surfaceMuted: "#ECEFF1",
} as const;

/** Multi-series charts — blues & teals only (medical theme) */
export const chartColors = [
  colors.primary,
  colors.accent,
  colors.clinical,
  colors.primaryLight,
  colors.info,
  colors.accentDark,
] as const;

/** Analytics page hero — use as Tailwind: bg-gradient-to-br from-primary-dark to-primary */
export const pageHeroClass =
  "rounded-[20px] bg-gradient-to-br from-primary-dark to-primary p-6 text-white";

/** Landing page icon tiles — rotate for variety within brand palette */
export const landingIconVariants = [
  { bg: "bg-blue-soft", color: "text-blue" },
  { bg: "bg-accent-soft", color: "text-accent-dark" },
  { bg: "bg-primary-container", color: "text-primary" },
  { bg: "bg-accent/10", color: "text-clinical" },
] as const;

/** Landing navbar + footer */
export const landingNavClass =
  "fixed inset-x-0 top-0 z-[100] flex h-[70px] items-center justify-between border-b border-white/10 bg-primary-dark/95 px-6 backdrop-blur-md lg:px-[46px]";

/** Shared focus ring for all buttons */
export const buttonFocusClass =
  "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent/30";

/** Stat cards & KPI accents */
export const stat = {
  primary: colors.primary,
  accent: colors.accent,
  success: colors.success,
  warning: colors.warning,
  error: colors.error,
  info: colors.info,
  clinical: colors.clinical,
  gold: colors.gold,
  primaryLight: colors.primaryLight,
} as const;

export const emrTypeColors: Record<string, string> = {
  Screening: colors.primary,
  Prescription: colors.accent,
  Teleconsultation: colors.gold,
  Referral: colors.error,
};

export const emrTypeIcons: Record<string, string> = {
  Screening: "🔬",
  Prescription: "💊",
  Teleconsultation: "📹",
  Referral: "🏥",
};

/** Hex with alpha suffix (e.g. 20 = ~12% opacity) for inline styles */
export function colorAlpha(hex: string, alphaHex: string) {
  return `${hex}${alphaHex}`;
}
