import { cn } from "@/app/lib/cn";

export const BRAND_LOGO_SRC = "/apvision.png";
export const BRAND_LOGO_ALT =
  "Andhra Pradesh Vision Care — Government of Andhra Pradesh";

type BrandLogoSize = "xs" | "sm" | "md" | "lg" | "xl";

const sizeClass: Record<BrandLogoSize, string> = {
  xs: "h-8 w-auto max-w-[110px]",
  sm: "h-10 w-auto max-w-[130px]",
  md: "h-[42px] w-auto max-w-[150px]",
  lg: "h-[72px] w-auto max-w-[220px]",
  xl: "h-20 w-auto max-w-[280px]",
};

export function BrandLogo({
  className,
  size = "md",
  onDark = false,
}: {
  className?: string;
  size?: BrandLogoSize;
  /** White backing so the logo reads on dark headers/sidebars */
  onDark?: boolean;
}) {
  return (
    <img
      src={BRAND_LOGO_SRC}
      alt={BRAND_LOGO_ALT}
      className={cn(
        "shrink-0 object-contain object-left",
        sizeClass[size],
        onDark && "rounded-lg bg-white p-0.5 shadow-md",
        className,
      )}
    />
  );
}
