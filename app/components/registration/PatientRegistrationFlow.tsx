"use client";

import { useCallback, useState } from "react";
import { REGISTRATION_STEPS } from "@/app/components/registration/constants";
import { renderRegistrationStep } from "@/app/components/registration/steps";
import { Button } from "@/app/components/ui";
import { cn } from "@/app/lib/cn";

type PatientRegistrationFlowProps = {
  onExit: () => void;
  onComplete: () => void;
};

export default function PatientRegistrationFlow({
  onExit,
  onComplete,
}: PatientRegistrationFlowProps) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Record<string, string>>({
    areaType: "Urban",
    decisionCase: "C",
  });

  const update = useCallback((k: string, v: string) => {
    setForm((prev) => ({ ...prev, [k]: v }));
  }, []);

  const total = REGISTRATION_STEPS.length;
  const current = REGISTRATION_STEPS[step];
  const isLast = step === total - 1;

  const handleNext = () => {
    if (step < total - 1) setStep((s) => s + 1);
    else onComplete();
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* Step progress — matches mobile _StepProgressHeader */}
      <div className="shrink-0 border-b border-grey-200 bg-white px-4 py-3 shadow-sm sm:px-5">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-3">
          <span className="text-xs font-bold text-primary">
            Step {step + 1} of {total}
          </span>
          <span className="truncate text-sm font-bold text-grey-900">
            {current.label}
          </span>
        </div>
        <div className="mx-auto mt-2.5 flex max-w-2xl gap-1">
          {REGISTRATION_STEPS.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1 flex-1 rounded-sm transition-colors",
                i <= step ? "bg-error" : "bg-grey-200",
              )}
            />
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl p-5 animate-fade-in sm:p-6">
          {renderRegistrationStep(step, form, update)}
        </div>
      </div>

      {/* Bottom navigation — matches mobile _StepNavigation */}
      <div className="shrink-0 border-t border-grey-200 bg-white px-4 py-3 pb-6 shadow-[0_-2px_8px_rgba(0,0,0,0.06)] sm:px-5">
        <div className="mx-auto flex max-w-2xl gap-3">
          {step > 0 && (
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={() => setStep((s) => s - 1)}
            >
              ← Previous
            </Button>
          )}
          <Button
            variant={isLast ? "primary" : "primary"}
            size="lg"
            className="flex-1"
            onClick={handleNext}
          >
            {isLast ? "✓ Submit for Approval" : "Next →"}
          </Button>
        </div>
      </div>
    </div>
  );
}
