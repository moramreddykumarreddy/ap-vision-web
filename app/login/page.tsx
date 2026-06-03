"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, FormGroup, Input } from "@/app/components/ui";

export default function LoginPage() {
  const router = useRouter();
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length !== 10) {
      setError("Enter a valid 10-digit mobile number");
      return;
    }
    setLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    router.push(`/otp?mobile=${mobile}`);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-dark to-primary p-6">
      <div className="pointer-events-none absolute left-[10%] top-[10%] size-[300px] rounded-full bg-white/[0.03]" />
      <div className="pointer-events-none absolute bottom-[15%] right-[8%] size-[200px] rounded-full bg-accent/[0.05]" />

      <div className="w-full max-w-[440px] animate-fade-up rounded-xl bg-white p-10 shadow-xl">
        <div className="mb-6 text-center">
          <img
            src="/apvision.png"
            alt="AP Vision Care"
            className="mx-auto mb-3 block size-20 rounded-[20px] bg-[#f0f4ff] object-contain p-1.5 shadow-[0_4px_20px_rgba(26,58,107,0.15)]"
          />
          <h1 className="text-xl font-black text-primary">AP Vision Program</h1>
          <p className="text-xs text-grey-500">Government of Andhra Pradesh</p>
        </div>

        <h2 className="mb-1 text-xl font-extrabold text-primary">Sign In</h2>
        <p className="mb-6 text-[13px] text-grey-400">
          Enter your mobile number to continue
        </p>

        <form onSubmit={handleSubmit}>
          <FormGroup label="Mobile Number">
            <div className="relative">
              <div className="absolute left-3 top-1/2 flex -translate-y-1/2 items-center gap-1.5 text-[13px] font-semibold text-grey-600">
                📱 +91
              </div>
              <Input
                id="mobile-input"
                className="pl-[70px]"
                type="tel"
                maxLength={10}
                placeholder="98765 43210"
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value.replace(/\D/g, ""));
                  setError("");
                }}
              />
            </div>
            {error && <p className="mt-1 text-[11px] text-error">{error}</p>}
          </FormGroup>

          <Button
            id="send-otp-btn"
            type="submit"
            variant="primary"
            size="lg"
            full
            disabled={loading}
          >
            {loading ? "⏳ Sending OTP..." : "Send OTP →"}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <Button variant="ghost" className="text-xs">
            Forgot Session? Contact Admin
          </Button>
        </div>

        <div className="mt-6 border-t border-grey-200 py-4 text-center">
          <p className="text-[11px] text-grey-300">
            For support, call: 1800-XXX-XXXX (Toll Free)
          </p>
        </div>

        <Button
          variant="ghost"
          full
          className="mt-2 text-xs"
          onClick={() => router.push("/")}
        >
          ← Back to Home
        </Button>
      </div>
    </div>
  );
}
