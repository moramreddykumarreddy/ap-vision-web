/**
 * AP Vision Care — official brand palette only
 * Blue #004990 · Red #e31b23 · Gray #6d6e71
 */
export const brand = {
  blue: "#004990",
  red: "#e31b23",
  gray: "#6d6e71",
} as const;

/** RGB tuples for rgba() in inline styles */
export const brandRgb = {
  blue: "0, 73, 144",
  red: "227, 27, 35",
  gray: "109, 110, 113",
} as const;

/** Grey scale — color-mix with white (matches globals.css) */
const grey = {
  50: "#f6f6f6",
  100: "#f0f0f0",
  200: "#e5e5e5",
  300: "#d6d6d6",
  400: "#b5b6b8",
  500: brand.gray,
  600: brand.gray,
  700: "#4a4b4d",
  800: "#333435",
  900: "#1f1f20",
} as const;

export const colors = {
  ...brand,
  primary: brand.blue,
  primaryDark: brand.blue,
  primaryLight: brand.blue,
  accent: brand.blue,
  accentDark: brand.blue,
  clinical: brand.blue,
  info: brand.blue,
  success: brand.blue,
  gold: brand.red,
  goldLight: brand.red,
  warning: brand.red,
  warningLight: brand.red,
  error: brand.red,
  errorLight: brand.red,
  grey50: grey[50],
  grey100: grey[100],
  grey200: grey[200],
  grey300: grey[300],
  grey400: grey[400],
  grey500: grey[500],
  grey600: grey[600],
  grey800: grey[800],
  surfaceClinical: "#f4f4f4",
  surfaceMuted: "#f0f0f0",
} as const;

/** Multi-series charts — rotate brand blue, red, gray only */
export const chartColors = [
  brand.blue,
  brand.red,
  brand.gray,
  brand.blue,
  brand.red,
  brand.gray,
] as const;

/** Analytics page hero */
export const pageHeroClass =
  "rounded-[20px] bg-gradient-to-br from-primary-dark to-primary p-6 text-white";

/** Landing page icon tiles */
export const landingIconVariants = [
  { bg: "bg-blue-soft", color: "text-blue" },
  { bg: "bg-red-soft", color: "text-red" },
  { bg: "bg-primary-container", color: "text-primary" },
  { bg: "bg-grey-100", color: "text-grey-600" },
] as const;

/** Landing navbar + footer */
export const landingNavClass =
  "fixed inset-x-0 top-0 z-[100] flex h-14 min-h-14 items-center justify-between gap-3 border-b border-white/10 bg-primary-dark/95 px-4 backdrop-blur-md sm:h-[70px] sm:min-h-[70px] sm:px-6 lg:px-[46px]";

/** Shared focus ring for primary (red) buttons */
export const buttonFocusClass =
  "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-error/30";

/** Stat cards & KPI accents */
export const stat = {
  primary: brand.blue,
  accent: brand.blue,
  success: brand.blue,
  warning: brand.red,
  error: brand.red,
  info: brand.blue,
  clinical: brand.blue,
  gold: brand.red,
  primaryLight: brand.blue,
} as const;

export const emrTypeColors: Record<string, string> = {
  Screening: brand.blue,
  Prescription: brand.gray,
  Teleconsultation: brand.gray,
  Referral: brand.red,
};

export const emrTypeIcons: Record<string, string> = {
  Screening: "🔬",
  Prescription: "💊",
  Teleconsultation: "📹",
  Referral: "🏥",
};

/** Hex with alpha suffix (e.g. 18 = ~9% opacity) for inline styles */
export function colorAlpha(hex: string, alphaHex: string) {
  return `${hex}${alphaHex}`;
}
