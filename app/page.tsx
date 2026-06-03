"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import LandingNav from "@/app/components/landing/LandingNav";
import { BrandLogo, Icon, type IconName } from "@/app/components/landing/Icon";
import { cn } from "@/app/lib/cn";

const HERO_STATS = [
  { num: "26", suffix: "+", label: "Districts Covered" },
  { num: "100", suffix: "%", label: "Digital Workflow" },
  { num: "4", suffix: "", label: "User Roles" },
];

const ABOUT_CARDS: {
  icon: IconName;
  bg: string;
  color: string;
  title: string;
  desc: string;
}[] = [
  {
    icon: "target",
    bg: "bg-teal-soft",
    color: "text-teal-d",
    title: "Universal Screening",
    desc: "Universal vision screening across villages, tribal areas, urban slums, schools, and industrial zones — detecting refractive errors and eye disease early.",
  },
  {
    icon: "stetho",
    bg: "bg-blue-soft",
    color: "text-blue",
    title: "End-to-End Care",
    desc: "From ABHA-based registration to tele-ophthalmology, referral management, and affordable high-quality spectacle delivery to every eligible beneficiary.",
  },
  {
    icon: "cpu",
    bg: "bg-amber-soft",
    color: "text-amber",
    title: "AI-Driven Insights",
    desc: "Actionable public health intelligence — disease hotspots, demand forecasting, and resource allocation — supporting evidence-based government decisions.",
  },
];

const PLATFORM_CARDS: {
  icon: IconName;
  bg: string;
  color: string;
  title: string;
  desc: string;
}[] = [
  {
    icon: "stetho",
    bg: "bg-teal-soft",
    color: "text-teal-d",
    title: "Community Screening",
    desc: "Mobile camps across the state.",
  },
  {
    icon: "file-plus",
    bg: "bg-blue-soft",
    color: "text-blue",
    title: "Digital Registration",
    desc: "ABHA, mobile & QR-based capture.",
  },
  {
    icon: "book",
    bg: "bg-amber-soft",
    color: "text-amber",
    title: "Electronic Medical Records",
    desc: "Paperless, timestamped records.",
  },
  {
    icon: "eye",
    bg: "bg-green-soft",
    color: "text-green",
    title: "Vision & Refraction",
    desc: "UCDVA / BCDVA assessment.",
  },
  {
    icon: "video",
    bg: "bg-blue-soft",
    color: "text-blue",
    title: "Tele-Ophthalmology",
    desc: "Remote specialist consultations.",
  },
  {
    icon: "route",
    bg: "bg-red-soft",
    color: "text-red",
    title: "Referral Management",
    desc: "Priority-based hospital referrals.",
  },
  {
    icon: "glasses",
    bg: "bg-teal-soft",
    color: "text-teal-d",
    title: "Spectacle Distribution",
    desc: "Order to last-mile delivery.",
  },
  {
    icon: "factory",
    bg: "bg-amber-soft",
    color: "text-amber",
    title: "Vendor Management",
    desc: "Onboarding & SLA monitoring.",
  },
  {
    icon: "grid",
    bg: "bg-blue-soft",
    color: "text-blue",
    title: "Monitoring Dashboards",
    desc: "Daily, district & mandal views.",
  },
  {
    icon: "cpu",
    bg: "bg-green-soft",
    color: "text-green",
    title: "AI & Predictive Engine",
    desc: "Risk prediction & forecasting.",
  },
  {
    icon: "file-text",
    bg: "bg-red-soft",
    color: "text-red",
    title: "Automated Reporting",
    desc: "Government-accessible reports.",
  },
  {
    icon: "id",
    bg: "bg-teal-soft",
    color: "text-teal-d",
    title: "ABHA Verification",
    desc: "Auto-fetch demographics.",
  },
];

const ROLES = [
  {
    id: "admin",
    href: "/admin/dashboard",
    icon: "shield" as IconName,
    bg: "bg-[rgba(17,181,168,0.16)]",
    color: "text-teal",
    title: "Super Admin",
    scope: "State Program Mgmt Unit",
    items: [
      "Statewide administration",
      "District & vendor onboarding",
      "AI model configuration",
      "Audit & compliance",
    ],
  },
  {
    id: "nodal",
    href: "/nodal/dashboard",
    icon: "medal" as IconName,
    bg: "bg-[rgba(59,111,224,0.18)]",
    color: "text-[#7DA0F0]",
    title: "Nodal Officer",
    scope: "State / District Level",
    items: [
      "Team creation & assignment",
      "Camp monitoring",
      "Prescription approval",
      "Referral verification",
    ],
  },
  {
    id: "team",
    href: "/screening/dashboard",
    icon: "stetho" as IconName,
    bg: "bg-[rgba(238,157,30,0.18)]",
    color: "text-[#F4B95A]",
    title: "Screening Team",
    scope: "Assigned Locations",
    items: [
      "Patient registration",
      "Vision screening",
      "Prescription generation",
      "Referral & teleconsult",
    ],
  },
  {
    id: "patient",
    href: "/patient/dashboard",
    icon: "user" as IconName,
    bg: "bg-[rgba(31,164,99,0.2)]",
    color: "text-[#5CCB8E]",
    title: "Patient / Citizen",
    scope: "Personal Records",
    items: [
      "View prescriptions",
      "Track spectacle status",
      "View referrals",
      "Teleconsultation",
    ],
  },
];

const WORKFLOW = [
  {
    icon: "tent" as IconName,
    title: "Community Outreach",
    desc: "Camps across villages, schools & tribal areas.",
  },
  {
    icon: "file-plus" as IconName,
    title: "Registration",
    desc: "ABHA / mobile / QR auto-fetches demographics.",
  },
  {
    icon: "eye" as IconName,
    title: "Clinical Assessment",
    desc: "Symptoms, history & vision exam in EMR.",
  },
  {
    icon: "sliders" as IconName,
    title: "Decision Engine",
    desc: "Spectacles, referral or teleconsult determined.",
  },
  {
    icon: "check-circle" as IconName,
    title: "Approval & Order",
    desc: "Nodal officer approves; vendor order generated.",
  },
  {
    icon: "truck" as IconName,
    title: "Delivery",
    desc: "OTP, photo & GPS-verified last-mile delivery.",
  },
];

const AI_FEATURES = [
  {
    icon: "cpu" as IconName,
    title: "Disease Prediction",
    sub: "Cataract, glaucoma, DR risk",
  },
  {
    icon: "pin" as IconName,
    title: "Hotspot Identification",
    sub: "High disease-burden zones",
  },
  {
    icon: "package" as IconName,
    title: "Demand Forecasting",
    sub: "Spectacle & vendor planning",
  },
  {
    icon: "route" as IconName,
    title: "Referral Prioritization",
    sub: "Critical / High / Routine",
  },
];

const HOTSPOTS = [
  { name: "Anantapur", pct: 88, color: "bg-red" },
  { name: "Kurnool", pct: 74, color: "bg-amber" },
  { name: "Chittoor", pct: 61, color: "bg-[#F4B95A]" },
  { name: "Guntur", pct: 45, color: "bg-teal" },
  { name: "Visakhapatnam", pct: 33, color: "bg-green" },
];

const JOURNEY_STEPS = [
  {
    icon: "clipboard" as IconName,
    bg: "bg-teal-soft",
    color: "text-teal-d",
    title: "Registered & Screened",
    sub: "Anantapur Camp · 09:14 AM",
    done: true,
  },
  {
    icon: "eye" as IconName,
    bg: "bg-blue-soft",
    color: "text-blue",
    title: "Vision Examined",
    sub: "Refractive error detected",
    done: true,
  },
  {
    icon: "check-circle" as IconName,
    bg: "bg-amber-soft",
    color: "text-amber",
    title: "Prescription Approved",
    sub: "Nodal Officer · 10:02 AM",
    done: true,
  },
  {
    icon: "truck" as IconName,
    bg: "bg-line-2",
    color: "text-muted",
    title: "Spectacles in Manufacturing",
    sub: "Vendor: ClearView Optics",
    done: false,
  },
];

function SectionHead({
  tag,
  title,
  sub,
  light,
}: {
  tag: string;
  title: ReactNode;
  sub?: string;
  light?: boolean;
}) {
  return (
    <div className="mb-[54px] text-center">
      <span
        className={cn(
          "mb-3.5 inline-block text-xs font-bold uppercase tracking-[0.12em]",
          light ? "text-teal" : "text-teal-d",
        )}
      >
        {tag}
      </span>
      <h2
        className={cn(
          "text-[clamp(28px,3.3vw,42px)] font-extrabold leading-[1.12]",
          light ? "text-white" : "text-navy",
        )}
      >
        {title}
      </h2>
      {sub && (
        <p
          className={cn(
            "mx-auto mt-4 max-w-[620px] text-[16.5px] leading-relaxed",
            light ? "text-white/60" : "text-muted",
          )}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

function CompCard({
  icon,
  bg,
  color,
  title,
  desc,
}: {
  icon: IconName;
  bg: string;
  color: string;
  title: string;
  desc: string;
}) {
  return (
    <article className="rounded-[18px] border border-line bg-surface p-[26px_22px] transition-all hover:-translate-y-[3px] hover:border-teal/30 hover:shadow-[0_6px_20px_rgba(16,40,70,0.07)]">
      <div
        className={cn(
          "mb-4 flex size-[50px] items-center justify-center rounded-[13px]",
          bg,
        )}
      >
        <Icon name={icon} className={color} size={23} />
      </div>
      <h4 className="mb-[7px] text-[15.5px] font-bold text-navy">{title}</h4>
      <p className="text-[13px] leading-[1.55] text-muted">{desc}</p>
    </article>
  );
}

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-bg-app font-sans text-ink">
      <LandingNav />

      {/* Hero */}
      <section
        className="relative overflow-hidden px-6 pb-[84px] pt-[138px] lg:px-[46px]"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 78% 5%, rgba(17,181,168,0.09), transparent 65%), radial-gradient(ellipse 45% 40% at 5% 95%, rgba(59,111,224,0.05), transparent 70%)",
        }}
      >
        <div className="mx-auto grid max-w-[1260px] items-center gap-14 lg:grid-cols-[1.04fr_0.96fr] lg:gap-14">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-teal/22 bg-teal-soft px-[15px] py-[7px] text-[12.5px] font-semibold text-teal-d">
              <span className="size-[7px] animate-pulse-soft rounded-full bg-teal" />
              Government of Andhra Pradesh · Public Health Initiative
            </div>
            <h1 className="mb-[22px] mt-6 text-[clamp(40px,4.8vw,62px)] font-extrabold leading-[1.05] text-navy">
              Universal eye care,{" "}
              <span className="text-teal">digitally tracked</span> from
              screening to delivery.
            </h1>
            <p className="mb-[34px] max-w-[540px] text-lg leading-[1.62] text-muted">
              A statewide platform integrating mobile screening teams, EMR,
              tele-ophthalmology, AI analytics, and last-mile spectacle delivery
              — ensuring every citizen has equitable access to quality vision
              care.
            </p>
            <div className="mb-[42px] flex flex-wrap gap-[13px]">
              <button
                type="button"
                onClick={() => router.push("/screening/register")}
                className="inline-flex items-center gap-2 rounded-[13px] bg-teal px-[22px] py-3 text-[14.5px] font-semibold text-white shadow-[0_4px_14px_rgba(17,181,168,0.28)] transition-all hover:-translate-y-px hover:bg-teal-d"
              >
                Register as Patient
                <Icon name="arrow-right" size={17} />
              </button>
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="inline-flex items-center gap-2 rounded-[13px] border-[1.5px] border-line bg-surface px-[22px] py-3 text-[14.5px] font-semibold text-ink transition-colors hover:border-teal hover:text-teal-d"
              >
                Staff / Admin Login
              </button>
            </div>
            <div className="flex flex-wrap gap-[38px]">
              {HERO_STATS.map((s) => (
                <div key={s.label}>
                  <div className="text-[30px] font-extrabold text-navy">
                    {s.num}
                    {s.suffix && <span className="text-teal">{s.suffix}</span>}
                  </div>
                  <div className="mt-0.5 text-[12.5px] text-muted">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-2 -top-[22px] z-[3] flex items-center gap-[11px] rounded-[13px] border border-line bg-surface px-[17px] py-[13px] shadow-[0_6px_20px_rgba(16,40,70,0.07)]">
              <div className="flex size-9 items-center justify-center rounded-[10px] bg-green-soft">
                <Icon name="trend" className="text-green" size={18} />
              </div>
              <div>
                <div className="text-base font-bold text-navy">12,480</div>
                <div className="text-[10.5px] text-muted">Screened today</div>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-7 z-[3] flex items-center gap-[11px] rounded-[13px] border border-line bg-surface px-[17px] py-[13px] shadow-[0_6px_20px_rgba(16,40,70,0.07)]">
              <div className="flex size-9 items-center justify-center rounded-[10px] bg-blue-soft">
                <Icon name="glasses" className="text-blue" size={18} />
              </div>
              <div>
                <div className="text-base font-bold text-navy">8,912</div>
                <div className="text-[10.5px] text-muted">
                  Spectacles delivered
                </div>
              </div>
            </div>
            <div className="relative z-[2] rounded-[24px] border border-line bg-surface p-[26px] shadow-[0_20px_50px_rgba(16,40,70,0.12)]">
              <div className="mb-5 flex items-center justify-between">
                <div className="text-[14.5px] font-bold text-navy">
                  Citizen Journey · Ramesh K.
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-green-soft px-2.5 py-1 text-[11px] font-bold text-green">
                  <span className="size-1.5 animate-pulse-soft rounded-full bg-green" />
                  LIVE
                </div>
              </div>
              {JOURNEY_STEPS.map((step) => (
                <div
                  key={step.title}
                  className="flex items-center gap-[13px] border-b border-line-2 py-[13px] last:border-b-0"
                >
                  <div
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-[11px]",
                      step.bg,
                    )}
                  >
                    <Icon name={step.icon} className={step.color} size={19} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13.5px] font-semibold text-navy">
                      {step.title}
                    </div>
                    <div className="mt-px text-xs text-muted">{step.sub}</div>
                  </div>
                  <div
                    className={cn(
                      "flex size-6 items-center justify-center rounded-full",
                      step.done
                        ? "bg-green text-white"
                        : "bg-line text-muted-2",
                    )}
                  >
                    {step.done && (
                      <Icon name="check" size={13} className="stroke-[2.4]" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-surface px-6 py-[92px] lg:px-[46px]">
        <div className="mx-auto max-w-[1200px]">
          <SectionHead
            tag="About the Program"
            title={
              <>
                Beyond spectacles — a public
                <br />
                health intelligence platform.
              </>
            }
            sub="The initiative aims to eliminate avoidable visual impairment, improve educational outcomes, enhance workforce productivity, and strengthen public health planning across Andhra Pradesh."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ABOUT_CARDS.map((c) => (
              <CompCard key={c.title} {...c} />
            ))}
          </div>
        </div>
      </section>

      {/* Platform components */}
      <section id="components" className="px-6 py-[92px] lg:px-[46px]">
        <div className="mx-auto max-w-[1200px]">
          <SectionHead
            tag="Solution Overview"
            title={
              <>
                Twelve integrated components,
                <br />
                one unified platform.
              </>
            }
            sub="All activities are digitally tracked from patient registration to spectacle delivery and referral closure."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PLATFORM_CARDS.map((c) => (
              <CompCard key={c.title} {...c} />
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section id="roles" className="bg-navy px-6 py-[92px] lg:px-[46px]">
        <div className="mx-auto max-w-[1200px]">
          <SectionHead
            tag="User Hierarchy & Governance"
            title="Four roles. Distinct workflows."
            sub="Each role logs in with OTP authentication and accesses a dashboard tailored to their responsibilities and access level. Click any role to preview its portal."
            light
          />
          <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
            {ROLES.map((role) => (
              <button
                key={role.id}
                type="button"
                onClick={() => router.push(role.href)}
                className="rounded-[18px] border border-white/9 bg-white/[0.04] p-[28px_24px] text-left transition-all hover:-translate-y-1 hover:border-teal/40 hover:bg-white/[0.07]"
              >
                <div
                  className={cn(
                    "mb-[18px] flex size-[54px] items-center justify-center rounded-[14px]",
                    role.bg,
                  )}
                >
                  <Icon name={role.icon} className={role.color} size={26} />
                </div>
                <h4 className="mb-[7px] text-lg font-bold text-white">
                  {role.title}
                </h4>
                <div className="mb-4 text-[11.5px] font-semibold uppercase tracking-wide text-teal">
                  {role.scope}
                </div>
                <ul className="flex flex-col gap-[9px]">
                  {role.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-[9px] text-[13px] text-white/62"
                    >
                      <Icon
                        name="check"
                        className="mt-px shrink-0 text-teal"
                        size={15}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <span className="mt-[18px] inline-flex items-center gap-1.5 text-[13px] font-semibold text-teal">
                  Open portal
                  <Icon name="arrow-right" size={15} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section id="workflow" className="bg-surface px-6 py-[92px] lg:px-[46px]">
        <div className="mx-auto max-w-[1200px]">
          <SectionHead
            tag="End-to-End Citizen Journey"
            title="From screening to spectacle delivery."
          />
          <div className="mx-auto flex max-w-[1140px] flex-wrap justify-center gap-8 lg:flex-nowrap lg:gap-0">
            {WORKFLOW.map((step, i) => (
              <div
                key={step.title}
                className="relative flex-1 px-[13px] text-center"
              >
                {i < WORKFLOW.length - 1 && (
                  <span className="absolute right-0 top-[27px] hidden h-0.5 w-4 bg-line lg:block" />
                )}
                <div className="mx-auto mb-[18px] flex size-14 items-center justify-center rounded-2xl border-[1.5px] border-line bg-surface text-teal-d shadow-[0_1px_3px_rgba(16,40,70,0.06)]">
                  <Icon name={step.icon} size={24} />
                </div>
                <h4 className="mb-2 text-[15px] font-bold text-navy">
                  {step.title}
                </h4>
                <p className="text-[12.5px] leading-normal text-muted">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI */}
      <section
        id="ai"
        className="bg-gradient-to-br from-[#08172a] to-navy px-6 py-[92px] lg:px-[46px]"
      >
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-2 lg:gap-12">
          <div>
            <span className="mb-3.5 inline-block text-xs font-bold uppercase tracking-[0.12em] text-teal">
              AI &amp; Advanced Analytics
            </span>
            <h2 className="mb-[18px] text-[clamp(28px,3.1vw,40px)] font-extrabold leading-[1.13] text-white">
              Turning eye health data into statewide public health intelligence.
            </h2>
            <p className="mb-7 text-base leading-[1.62] text-white/62">
              By combining eye health data with age, gender, occupation,
              location, diabetes, hypertension, and nutrition status, the
              platform becomes a strategic decision-support system for
              government.
            </p>
            <div className="grid gap-[15px] sm:grid-cols-2">
              {AI_FEATURES.map((f) => (
                <div key={f.title} className="flex gap-3">
                  <div className="flex size-[38px] shrink-0 items-center justify-center rounded-[11px] bg-teal/15">
                    <Icon name={f.icon} className="text-teal" size={19} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {f.title}
                    </div>
                    <div className="mt-0.5 text-xs text-white/52">{f.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[24px] border border-white/11 bg-white/5 p-7">
            <div className="mb-[22px] flex items-center justify-between">
              <h4 className="flex items-center gap-2 text-[15px] text-white">
                <Icon name="fire" className="text-amber" size={18} />
                District Disease-Burden Hotspots
              </h4>
              <span className="inline-flex rounded-full bg-blue-soft px-2.5 py-1 text-[11.5px] font-semibold text-blue">
                AI Generated
              </span>
            </div>
            {HOTSPOTS.map((h) => (
              <div key={h.name} className="mb-[15px] flex items-center gap-3.5">
                <div className="w-[108px] shrink-0 text-[13px] text-white/78">
                  {h.name}
                </div>
                <div className="h-[9px] flex-1 overflow-hidden rounded-full bg-white/10">
                  <div
                    className={cn("h-full rounded-full", h.color)}
                    style={{ width: `${h.pct}%` }}
                  />
                </div>
                <div className="w-8 shrink-0 text-right text-xs font-bold text-white">
                  {h.pct}
                </div>
              </div>
            ))}
            <div className="mt-[18px] flex gap-2 border-t border-white/10 pt-[18px] text-[12.5px] text-white/60">
              <Icon name="alert" className="shrink-0 text-amber" size={17} />
              <span>
                <strong className="text-white">Recommendation:</strong>{" "}
                Prioritize cataract camps &amp; diabetes screening in Anantapur
                and Kurnool districts.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-[90px] lg:px-[46px]">
        <div className="relative mx-auto max-w-[980px] overflow-hidden rounded-[24px] bg-gradient-to-br from-teal to-teal-d px-[54px] py-[62px] text-center text-white">
          <div className="pointer-events-none absolute -right-[8%] -top-1/2 size-[380px] rounded-full bg-white/8" />
          <h2 className="relative mb-3.5 text-[clamp(26px,3vw,38px)] font-extrabold">
            Every citizen&apos;s journey,
            <br />
            digitally tracked and transparent.
          </h2>
          <p className="relative mx-auto mb-[30px] max-w-[560px] text-[16.5px] text-white/88">
            Register as a patient to access your records, or log in as staff to
            manage screening, approvals, and statewide analytics.
          </p>
          <div className="relative flex flex-wrap justify-center gap-[13px]">
            <button
              type="button"
              onClick={() => router.push("/screening/register")}
              className="inline-flex items-center justify-center rounded-[13px] bg-white px-[22px] py-3 text-[14.5px] font-semibold text-navy shadow-[0_1px_3px_rgba(16,40,70,0.06)] transition-all hover:-translate-y-px"
            >
              Patient Registration
            </button>
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="inline-flex items-center justify-center rounded-[13px] bg-black/18 px-[22px] py-3 text-[14.5px] font-semibold text-white"
            >
              Staff Login
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#07111f] px-6 py-[50px] text-white/50 lg:px-[46px]">
        <div className="mx-auto grid max-w-[1200px] gap-10 border-b border-white/8 pb-[34px] md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <BrandLogo />
              <div className="text-[16.5px] font-extrabold text-white">
                AP Vision Care
              </div>
            </div>
            <p className="mt-4 max-w-[280px] text-[13px] leading-relaxed">
              Andhra Pradesh Statewide Digital Vision Care &amp; Public Health
              Intelligence Platform. A clearer future for every citizen.
            </p>
          </div>
          <div>
            <h5 className="mb-[15px] text-[13px] font-semibold text-white">
              Platform
            </h5>
            <a
              href="#components"
              className="mb-2.5 block text-[13px] hover:text-teal"
            >
              Components
            </a>
            <a
              href="#workflow"
              className="mb-2.5 block text-[13px] hover:text-teal"
            >
              Workflow
            </a>
            <a href="#ai" className="mb-2.5 block text-[13px] hover:text-teal">
              AI Analytics
            </a>
            <a href="#roles" className="block text-[13px] hover:text-teal">
              User Roles
            </a>
          </div>
          <div>
            <h5 className="mb-[15px] text-[13px] font-semibold text-white">
              Access
            </h5>
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="mb-2.5 block text-left text-[13px] hover:text-teal"
            >
              Staff Login
            </button>
            <button
              type="button"
              onClick={() => router.push("/screening/register")}
              className="mb-2.5 block text-left text-[13px] hover:text-teal"
            >
              Patient Registration
            </button>
            <button
              type="button"
              onClick={() => router.push("/patient/dashboard")}
              className="block text-left text-[13px] hover:text-teal"
            >
              Patient Portal
            </button>
          </div>
          <div>
            <h5 className="mb-[15px] text-[13px] font-semibold text-white">
              Departments
            </h5>
            {["Health", "Education", "Women & Child", "Social Welfare"].map(
              (d) => (
                <span key={d} className="mb-2.5 block text-[13px]">
                  {d}
                </span>
              ),
            )}
          </div>
        </div>
        <div className="mx-auto mt-[22px] flex max-w-[1200px] flex-col justify-between gap-2 text-[12.5px] sm:flex-row">
          <span>
            © {new Date().getFullYear()} Government of Andhra Pradesh · All
            rights reserved
          </span>
          <span>Privacy · Terms · ABHA Compliance</span>
        </div>
      </footer>
    </div>
  );
}
