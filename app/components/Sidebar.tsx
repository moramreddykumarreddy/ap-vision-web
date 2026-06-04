"use client";
import { usePathname, useRouter } from "next/navigation";
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

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const nav = navConfig[role] ?? [];

  return (
    <aside className="fixed inset-y-0 left-0 z-[100] flex w-[230px] flex-col overflow-y-auto bg-primary-dark shadow-[2px_0_20px_rgba(0,0,0,0.2)] max-md:hidden">
      <div className="flex items-center gap-2.5 border-b border-white/10 px-3.5 py-3">
        <img
          src="/apvision.png"
          alt="AP Vision Care"
          className="size-8 shrink-0 rounded-lg bg-white object-contain p-0.5"
        />
        <div>
          <h2 className="text-xs font-extrabold leading-tight text-white">
            AP Vision Care
          </h2>
          <p className="text-[9px] text-white/50">Govt. of Andhra Pradesh</p>
        </div>
      </div>

      <div className="px-3.5 pb-1 pt-2 text-[9px] font-bold uppercase tracking-[1.5px] text-white/35">
        {roleLabels[role]}
      </div>

      <nav className="flex-1 px-2 py-1">
        {nav.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <div
              key={item.href}
              role="button"
              tabIndex={0}
              className={cn(
                "mb-px flex cursor-pointer items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-medium text-white/65 transition-all duration-150",
                active && "bg-white/12 font-semibold text-white",
                !active && "hover:bg-white/7 hover:text-white",
              )}
              onClick={() => router.push(item.href)}
              onKeyDown={(e) => e.key === "Enter" && router.push(item.href)}
            >
              <span className="w-[18px] text-center text-[15px]">
                {item.icon}
              </span>
              <span>{item.label}</span>
              {item.badge ? (
                <span className="ml-auto rounded-full bg-error px-1.5 py-0.5 text-[10px] font-bold text-white">
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
          className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-xs font-semibold text-white/75 transition-colors hover:bg-white/10 hover:text-white"
          onClick={() => router.push("/")}
        >
          <span className="w-[18px] text-center text-[15px]" aria-hidden>
            🚪
          </span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
