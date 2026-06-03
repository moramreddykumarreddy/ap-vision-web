"use client";
import { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/app/components/ui";
import { cn } from "@/app/lib/cn";

function OtpContent() {
  const router = useRouter();
  const params = useSearchParams();
  const mobile = params.get("mobile") ?? "";
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const inputs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    const interval = setInterval(
      () => setTimer((t) => (t > 0 ? t - 1 : 0)),
      1000,
    );
    return () => clearInterval(interval);
  }, []);

  const handleKey = (i: number, val: string) => {
    const d = val.slice(-1);
    const next = [...otp];
    next[i] = d;
    setOtp(next);
    if (d && i < 5) inputs.current[i + 1]?.focus();
  };

  const handleBackspace = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[i] && i > 0)
      inputs.current[i - 1]?.focus();
  };

  const handleVerify = async () => {
    if (otp.join("").length < 6) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    router.push("/role-selection");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-dark to-primary p-6">
      <div className="w-full max-w-[400px] animate-fade-up rounded-xl bg-white p-10 shadow-xl">
        <div className="mb-6 text-center">
          <img
            src="/apvision.png"
            alt="AP Vision Care"
            className="mx-auto mb-3 block size-[72px] rounded-[18px] bg-[#f0f4ff] object-contain p-1.5 shadow-[0_4px_20px_rgba(26,58,107,0.15)]"
          />
          <h1 className="text-xl font-black text-primary">OTP Verification</h1>
          <p className="text-xs text-grey-500">Code sent to +91 {mobile}</p>
        </div>

        <p className="mb-7 text-center text-[13px] text-grey-600">
          Enter the 6-digit OTP sent to your mobile
        </p>

        <div className="mb-6 flex justify-center gap-2.5">
          {otp.map((v, i) => (
            <input
              key={i}
              ref={(el) => {
                if (el) inputs.current[i] = el;
              }}
              id={`otp-${i}`}
              className={cn(
                "size-12 w-12 rounded-md border-[1.5px] border-grey-300 bg-white p-0 text-center text-[22px] font-extrabold text-grey-900 transition-[border-color,box-shadow] focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/10",
              )}
              value={v}
              onChange={(e) => handleKey(i, e.target.value)}
              onKeyDown={(e) => handleBackspace(i, e)}
              maxLength={1}
              inputMode="numeric"
            />
          ))}
        </div>

        <div className="mb-4 rounded-lg bg-grey-50 px-3 py-2 text-center text-xs text-grey-600">
          💡 Demo: Enter any 6 digits to proceed
        </div>

        <Button
          id="verify-otp-btn"
          variant="primary"
          size="lg"
          full
          onClick={handleVerify}
          disabled={loading || otp.join("").length < 6}
        >
          {loading ? "⏳ Verifying..." : "✅ Verify OTP"}
        </Button>

        <div className="mt-4 text-center">
          {timer > 0 ? (
            <p className="text-xs text-grey-400">Resend OTP in {timer}s</p>
          ) : (
            <Button
              variant="ghost"
              className="text-xs"
              onClick={() => setTimer(30)}
            >
              🔄 Resend OTP
            </Button>
          )}
        </div>

        <Button
          variant="ghost"
          full
          className="mt-2 text-xs"
          onClick={() => router.push("/login")}
        >
          ← Change Number
        </Button>
      </div>
    </div>
  );
}

export default function OtpPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-dark to-primary p-6">
          <div className="w-full max-w-[440px] rounded-xl bg-white p-10 shadow-xl">
            Loading...
          </div>
        </div>
      }
    >
      <OtpContent />
    </Suspense>
  );
}
