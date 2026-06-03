"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, fadeDelay } from "@/app/components/ui";
import { cn } from "@/app/lib/cn";

const roles = [
  {
    id: "admin",
    icon: "👑",
    title: "Super Admin",
    desc: "State-level administration",
    href: "/admin/dashboard",
    color: "#1A3A6B",
  },
  {
    id: "nodal",
    icon: "🏢",
    title: "Nodal Officer",
    desc: "District management",
    href: "/nodal/dashboard",
    color: "#1A3A6B",
  },
  {
    id: "screening",
    icon: "🔬",
    title: "Screening Team",
    desc: "Camp & patient screening",
    href: "/screening/dashboard",
    color: "#1A3A6B",
  },
  {
    id: "tele",
    icon: "👁️",
    title: "Tele-Ophthalmologist",
    desc: "Remote consultations",
    href: "/tele/dashboard",
    color: "#1A3A6B",
  },
  {
    id: "vendor",
    icon: "🏭",
    title: "Vendor",
    desc: "Spectacle supply & delivery",
    href: "/vendor/dashboard",
    color: "#1A3A6B",
  },
  {
    id: "patient",
    icon: "🧑‍⚕️",
    title: "Patient",
    desc: "My health records",
    href: "/patient/dashboard",
    color: "#1A3A6B",
  },
];

export default function RoleSelectionPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  const handleContinue = () => {
    const role = roles.find((r) => r.id === selected);
    if (role) router.push(role.href);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-0 bg-gradient-to-br from-primary-dark to-primary p-6">
      <div className="mb-8 text-center text-white">
        <img
          src="/apvision.png"
          alt="AP Vision Care"
          className="mx-auto mb-3 block size-16 rounded-[18px] bg-white/95 object-contain p-1.5 shadow-[0_8px_28px_rgba(0,0,0,0.25)]"
        />
        <h1 className="mb-1 text-[22px] font-black">Select Your Role</h1>
        <p className="text-[13px] opacity-65">
          Choose the role to continue to your dashboard
        </p>
      </div>

      <div className="w-full max-w-[540px] animate-fade-up rounded-[20px] bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          {roles.map((role, i) => (
            <div
              key={role.id}
              id={`role-${role.id}`}
              className={cn(
                "animate-fade-up cursor-pointer rounded-xl border-2 border-grey-200 p-5 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-md",
                fadeDelay(i + 1),
                selected === role.id && "border-primary bg-primary/5 shadow-md",
              )}
              onClick={() => setSelected(role.id)}
            >
              <div className="mb-2 text-[28px]">{role.icon}</div>
              <div className="text-sm font-extrabold text-primary">
                {role.title}
              </div>
              <div className="text-[11px] text-grey-500">{role.desc}</div>
            </div>
          ))}
        </div>

        <Button
          id="continue-btn"
          variant="primary"
          size="lg"
          full
          className="mt-5"
          disabled={!selected}
          onClick={handleContinue}
        >
          Continue as{" "}
          {selected ? roles.find((r) => r.id === selected)?.title : "..."} →
        </Button>
      </div>

      <Button
        variant="ghost"
        className="mt-4 text-xs text-white/60"
        onClick={() => router.push("/login")}
      >
        ← Back to Login
      </Button>
    </div>
  );
}
