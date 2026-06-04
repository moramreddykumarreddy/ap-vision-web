"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AUTH_ROLES } from "@/app/lib/auth-roles";
import { Button, FormGroup, Input } from "@/app/components/ui";
import { cn } from "@/app/lib/cn";

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [roleError, setRoleError] = useState("");
  const [mobileError, setMobileError] = useState("");

  const selected = AUTH_ROLES.find((r) => r.id === selectedRole);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRoleError("");
    setMobileError("");

    if (!selectedRole) {
      setRoleError("Please select your role to continue");
      return;
    }
    if (mobile.replace(/\D/g, "").length < 6) {
      setMobileError("Enter at least 6 digits (demo accepts any number)");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);

    const route = encodeURIComponent(selected?.href ?? "");
    router.push(`/otp?mobile=${mobile}&role=${selectedRole}&route=${route}`);
  };

  return (
    <div className="grid h-full min-h-0 grid-rows-[1fr_auto] lg:grid-cols-2 lg:grid-rows-1">
      {/* Left — role selection */}
      <section className="relative flex h-full min-h-0 flex-col overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-dark max-lg:overflow-y-auto">
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden
        >
          <div className="absolute -left-24 top-8 size-[280px] rounded-full bg-white/[0.04]" />
          <div className="absolute -right-12 bottom-0 size-[220px] rounded-full bg-accent/[0.12]" />
        </div>

        <div className="relative mx-auto flex h-full w-full max-w-[480px] min-h-0 flex-col justify-center px-5 py-4 sm:px-8 lg:px-10 lg:py-5">
          <header className="mb-4 flex shrink-0 items-center justify-between gap-3 lg:mb-5">
            <div className="flex min-w-0 items-center gap-2.5">
              <img
                src="/apvision.png"
                alt="AP Vision Care"
                className="size-10 shrink-0 rounded-lg bg-white object-contain p-0.5 shadow-md"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-extrabold leading-tight text-white">
                  AP Vision Care
                </p>
                <p className="text-[10px] text-white/65">
                  Government of Andhra Pradesh
                </p>
              </div>
            </div>
            <Link
              href="/"
              className="shrink-0 rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/20"
            >
              ← Home
            </Link>
          </header>

          <div className="mb-4 shrink-0 lg:mb-4">
            <h1 className="text-xl font-extrabold tracking-tight text-white lg:text-[1.6rem]">
              Select Your Role
            </h1>
            <p className="mt-1 text-xs text-white/70 lg:text-sm">
              Choose your role to access the right features
            </p>
          </div>

          <div className="grid shrink-0 grid-cols-2 gap-2 sm:gap-2.5">
            {AUTH_ROLES.map((role) => {
              const isActive = selectedRole === role.id;
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => {
                    setSelectedRole(role.id);
                    setRoleError("");
                  }}
                  className={cn(
                    "flex flex-col rounded-lg border-2 p-2.5 text-left transition-colors sm:rounded-xl sm:p-3",
                    isActive
                      ? "border-white bg-white shadow-md"
                      : "border-white/25 bg-white/[0.08] hover:border-white/40 hover:bg-white/[0.12]",
                  )}
                >
                  <span className="mb-1 text-lg leading-none sm:text-xl">
                    {role.icon}
                  </span>
                  <span
                    className={cn(
                      "text-xs font-bold leading-tight sm:text-[13px]",
                      isActive ? "text-primary" : "text-white",
                    )}
                  >
                    {role.title}
                  </span>
                  <span
                    className={cn(
                      "mt-0.5 hidden text-[10px] leading-snug sm:line-clamp-2 sm:block",
                      isActive ? "text-grey-600" : "text-white/55",
                    )}
                  >
                    {role.desc}
                  </span>
                </button>
              );
            })}
          </div>

          {roleError && (
            <p className="mt-2 shrink-0 rounded-lg bg-amber-500/20 px-3 py-1.5 text-center text-xs font-semibold text-amber-100">
              {roleError}
            </p>
          )}

          <div
            className={cn(
              "mt-3 flex shrink-0 items-center rounded-lg border px-3 py-2 text-xs sm:text-sm",
              selected
                ? "border-white/30 bg-white/15 text-white"
                : "border-white/10 bg-white/5 text-white/40",
            )}
          >
            {selected ? (
              <>
                <span className="mr-2">{selected.icon}</span>
                <span>
                  Signing in as <strong>{selected.title}</strong>
                </span>
              </>
            ) : (
              <span className="w-full text-center">No role selected yet</span>
            )}
          </div>
        </div>
      </section>

      {/* Right — sign in */}
      <section className="flex h-full min-h-0 flex-col overflow-hidden border-t border-grey-200 bg-bg-app max-lg:overflow-y-auto lg:border-t-0">
        <div className="mx-auto flex h-full w-full max-w-[420px] min-h-0 flex-col justify-center px-5 py-4 sm:px-8 lg:px-10 lg:py-5">
          <div className="w-full overflow-hidden rounded-2xl border border-grey-200 bg-white shadow-lg">
            <div className="border-b border-grey-100 px-6 py-5 sm:px-7">
              <h2 className="text-xl font-extrabold text-primary lg:text-2xl">
                Sign In
              </h2>
              <p className="mt-1 text-xs text-grey-600 sm:text-sm">
                Enter your mobile number to receive a one-time password
              </p>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-5 sm:px-7 sm:py-6">
              {selected ? (
                <div className="mb-4 flex items-center gap-3 rounded-xl border border-primary/15 bg-primary-container px-3.5 py-3">
                  <span className="text-xl">{selected.icon}</span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-grey-500">
                      Selected role
                    </p>
                    <p className="truncate text-sm font-bold text-primary">
                      {selected.title}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mb-4 rounded-xl border border-dashed border-grey-300 bg-grey-50 px-3.5 py-3 text-xs text-grey-500 sm:text-sm">
                  <span className="lg:hidden">
                    ← Select a role above to continue
                  </span>
                  <span className="hidden lg:inline">
                    ← Select a role on the left to continue
                  </span>
                </div>
              )}

              <FormGroup label="Mobile Number" className="mb-4">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-grey-600">
                    +91
                  </span>
                  <Input
                    id="mobile-input"
                    className="h-11 pl-[50px]"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="98765 43210"
                    value={mobile}
                    onChange={(e) => {
                      setMobile(e.target.value.replace(/\D/g, ""));
                      setMobileError("");
                    }}
                  />
                </div>
                {mobileError && (
                  <p className="mt-1 text-xs text-error">{mobileError}</p>
                )}
              </FormGroup>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                full
                disabled={loading || !selectedRole}
              >
                {loading ? "Sending OTP..." : "Send OTP →"}
              </Button>

              <p className="mt-3 text-center">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-grey-500 hover:text-primary"
                >
                  Forgot Session? Contact Admin
                </Button>
              </p>
            </form>
          </div>

          <p className="mt-4 shrink-0 text-center text-[10px] text-grey-400">
            Support: 1800-XXX-XXXX (Toll Free) ·{" "}
            <Link
              href="/register"
              className="font-semibold text-accent hover:underline"
            >
              New patient registration
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
