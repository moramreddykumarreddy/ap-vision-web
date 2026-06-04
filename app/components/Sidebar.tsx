"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppShell } from "@/app/components/app-shell-context";
import { cn } from "@/app/lib/cn";

interface NavItem {
  icon: string;
  label: string;
  href: string;
  badge?: number;
}

interface SidebarProps {
  role: "admin" | "screening" | "nodal" | "tele" | "patient";
  userName: string;
  userSub: string;
}

const navConfig: Record<string, NavItem[]> = {
  admin: [
    { icon: "📊", label: "Dashboard", href: "/admin/dashboard" },
    { icon: "🗺️", label: "State Analytics", href: "/admin/analytics/state" },
    { icon: "📍", label: "District View", href: "/admin/analytics/district" },
    { icon: "🏘️", label: "Mandal View", href: "/admin/analytics/mandal" },
    {
      icon: "👥",
      label: "Demographics",
      href: "/admin/analytics/demographics",
    },
    { icon: "🤖", label: "AI Risk Analytics", href: "/admin/analytics/ai" },
    { icon: "🥗", label: "Nutrition Risk", href: "/admin/analytics/nutrition" },
    { icon: "🏫", label: "School Vision", href: "/admin/analytics/school" },
    { icon: "👴", label: "Elderly Care", href: "/admin/analytics/elderly" },
    {
      icon: "⚖️",
      label: "Decision Support",
      href: "/admin/analytics/decision",
    },
    { icon: "📋", label: "EMR Timeline", href: "/admin/emr" },
    { icon: "📁", label: "Documents", href: "/admin/documents" },
    { icon: "🏥", label: "Referrals", href: "/admin/referrals" },
    { icon: "🗄️", label: "Master Data", href: "/admin/master-data" },
    { icon: "📜", label: "Audit Logs", href: "/admin/audit" },
    { icon: "🧠", label: "AI Config", href: "/admin/ai-config" },
    { icon: "📄", label: "Reports", href: "/admin/reports" },
  ],
  screening: [
    { icon: "🏠", label: "Dashboard", href: "/screening/dashboard" },
    { icon: "⛺", label: "Camp Management", href: "/screening/camps" },
    { icon: "🔍", label: "Patient Search", href: "/screening/search" },
    { icon: "👤", label: "Register Patient", href: "/screening/register" },
  ],
  nodal: [
    { icon: "🏠", label: "Dashboard", href: "/nodal/dashboard" },
    { icon: "👥", label: "Team Management", href: "/nodal/teams" },
    { icon: "✅", label: "Approvals", href: "/nodal/approvals", badge: 3 },
    { icon: "🏥", label: "Referral Verify", href: "/nodal/referrals" },
  ],
  tele: [
    { icon: "🏠", label: "Dashboard", href: "/tele/dashboard" },
    { icon: "📅", label: "Consultation List", href: "/tele/consultations" },
    { icon: "📹", label: "Video Consultation", href: "/tele/video" },
  ],
  patient: [
    { icon: "🏠", label: "Dashboard", href: "/patient/dashboard" },
    { icon: "👤", label: "My Profile", href: "/patient/profile" },
    { icon: "💊", label: "Prescriptions", href: "/patient/prescriptions" },
    { icon: "👓", label: "Spectacles", href: "/patient/spectacles" },
    { icon: "🏥", label: "Referrals", href: "/patient/referrals" },
    {
      icon: "📹",
      label: "Teleconsultation",
      href: "/patient/teleconsultation",
    },
  ],
};

const roleLabels: Record<string, string> = {
  admin: "Super Admin",
  screening: "Screening Team",
  nodal: "Nodal Officer",
  tele: "Tele-Ophthalmologist",
  patient: "Patient",
};

function SidebarPanel({
  role,
  onNavigate,
  onClose,
  showClose,
}: {
  role: SidebarProps["role"];
  onNavigate: (href: string) => void;
  onClose?: () => void;
  showClose?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const nav = navConfig[role] ?? [];

  const go = (href: string) => {
    onNavigate(href);
    onClose?.();
  };

  return (
    <>
      <div className="flex items-center gap-2.5 border-b border-white/10 px-3.5 py-3">
        <img
          src="/apvision.png"
          alt="AP Vision Care"
          className="size-8 shrink-0 rounded-lg bg-white object-contain p-0.5"
        />
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-xs font-extrabold leading-tight text-white">
            AP Vision Care
          </h2>
          <p className="text-[9px] text-white/50">Govt. of Andhra Pradesh</p>
        </div>
        {showClose && (
          <button
            type="button"
            className="flex size-8 shrink-0 items-center justify-center rounded-lg text-lg text-white/80 hover:bg-white/10"
            onClick={onClose}
            aria-label="Close menu"
          >
            ✕
          </button>
        )}
      </div>

      <div className="px-3.5 pb-1 pt-2 text-[9px] font-bold uppercase tracking-[1.5px] text-white/60">
        {roleLabels[role]}
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-1">
        {nav.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <div
              key={item.href}
              role="button"
              tabIndex={0}
              className={cn(
                "mb-px flex cursor-pointer items-center gap-2 rounded-md px-2.5 py-2 text-xs font-medium text-white/90 transition-all duration-150",
                active && "bg-white/15 font-semibold text-white",
                !active && "hover:bg-white/10 hover:text-white",
              )}
              onClick={() => go(item.href)}
              onKeyDown={(e) => e.key === "Enter" && go(item.href)}
            >
              <span className="w-[18px] shrink-0 text-center text-[15px]">
                {item.icon}
              </span>
              <span className="min-w-0 flex-1">{item.label}</span>
              {item.badge ? (
                <span className="ml-auto shrink-0 rounded-full bg-error px-1.5 py-0.5 text-[10px] font-bold text-white">
                  {item.badge}
                </span>
              ) : null}
            </div>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-2">
        <button
          type="button"
          className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-xs font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-white"
          onClick={() => {
            onClose?.();
            router.push("/");
          }}
        >
          <span className="w-[18px] text-center text-[15px]" aria-hidden>
            🚪
          </span>
          <span>Logout</span>
        </button>
      </div>
    </>
  );
}

export default function Sidebar({ role }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { mobileNavOpen, closeMobileNav } = useAppShell();

  useEffect(() => {
    closeMobileNav();
  }, [pathname, closeMobileNav]);

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-[100] hidden w-[230px] flex-col overflow-y-auto bg-primary-dark shadow-[2px_0_20px_rgba(0,0,0,0.2)] md:flex">
        <SidebarPanel role={role} onNavigate={(href) => router.push(href)} />
      </aside>

      {mobileNavOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[110] bg-primary-dark/60 backdrop-blur-[2px] md:hidden"
            aria-label="Close menu"
            onClick={closeMobileNav}
          />
          <aside
            className="fixed inset-y-0 left-0 z-[120] flex w-[min(280px,88vw)] flex-col overflow-hidden bg-primary-dark shadow-[4px_0_32px_rgba(0,0,0,0.35)] md:hidden animate-fade-in"
            aria-label="Navigation menu"
          >
            <SidebarPanel
              role={role}
              onNavigate={(href) => router.push(href)}
              onClose={closeMobileNav}
              showClose
            />
          </aside>
        </>
      )}
    </>
  );
}
