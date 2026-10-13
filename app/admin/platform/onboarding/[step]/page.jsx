"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useOnboarding } from "@/components/admin/platform/onboarding/OnboardingProvider";
import StepFrame from "@/components/admin/platform/onboarding/StepFrame";
import Step1Info from "@/components/admin/platform/onboarding/steps/Step1Info";
import Step2Tenant from "@/components/admin/platform/onboarding/steps/Step2Tenant";
import Step3Branding from "@/components/admin/platform/onboarding/steps/Step3Branding";
import Step4Admin from "@/components/admin/platform/onboarding/steps/Step4Admin";
import Step5Method from "@/components/admin/platform/onboarding/steps/Step5Method";
import Step6Import from "@/components/admin/platform/onboarding/steps/Step6Import";
import Step7Validation from "@/components/admin/platform/onboarding/steps/Step7Validation";
import Step8Readiness from "@/components/admin/platform/onboarding/steps/Step8Readiness";
import Step9Activation from "@/components/admin/platform/onboarding/steps/Step9Activation";

const STEP_COMPONENTS = {
  1: Step1Info,
  2: Step2Tenant,
  3: Step3Branding,
  4: Step4Admin,
  5: Step5Method,
  6: Step6Import,
  7: Step7Validation,
  8: Step8Readiness,
  9: Step9Activation,
};

export default function OnboardingStepPage() {
  const params = useParams();
  const router = useRouter();
  const stepNumber = Number(params.step);
  const { phase, loadError, start } = useOnboarding();

  useEffect(() => {
    if (!Number.isInteger(stepNumber) || !STEP_COMPONENTS[stepNumber]) {
      router.replace("/admin/platform/onboarding/1");
      return;
    }

    if (phase === "idle") {
      start();
    }
  }, [stepNumber, phase, start, router]);

  if (!Number.isInteger(stepNumber) || !STEP_COMPONENTS[stepNumber]) {
    return null;
  }

  if (phase === "idle" || phase === "loading") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-[#6b7587]" role="status">
          Preparing institution onboarding…
        </p>
      </div>
    );
  }

  if (phase === "error") {
    return (
      <div className="mx-auto w-full max-w-2xl p-6">
        <div className="rounded-xl border border-[#e2ddd3] bg-[#fbf9f4] p-5">
          <h1 className="font-semibold text-[#242321]">
            Could not load onboarding
          </h1>
          <p className="mt-2 text-sm text-[#4a4843]">
            {loadError?.message || "An unexpected error occurred."}
          </p>
          <button
            type="button"
            onClick={() => start()}
            className="mt-4 rounded-lg bg-[#071a33] px-4 py-2 text-sm font-medium text-white"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  const StepComponent = STEP_COMPONENTS[stepNumber];

  return (
    <StepFrame n={stepNumber}>
      <StepComponent />
    </StepFrame>
  );
}
