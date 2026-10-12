"use client";
import { useEffect } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import LoadingState from "@/components/admin/shared/LoadingState";
import { getStep } from "@/lib/admin/onboardingSteps";
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

const STEPS = { 1: Step1Info, 2: Step2Tenant, 3: Step3Branding, 4: Step4Admin, 5: Step5Method, 6: Step6Import, 7: Step7Validation, 8: Step8Readiness, 9: Step9Activation };

export default function OnboardingStepPage() {
  const params = useParams();
  const router = useRouter();
  const n = Number(params.step);
  const meta = getStep(n);
  const { draft, phase } = useOnboarding();

  useEffect(() => {
    if (!meta) return;
    // No draft (e.g. page reload): go through the entry route to create one.
    if (phase === "idle") router.replace("/admin/platform/onboarding");
    // Can't skip ahead of the furthest step reached.
    else if (draft && n > draft.furthestStep) router.replace(`/admin/platform/onboarding/${draft.furthestStep}`);
  }, [meta, phase, draft, n, router]);

  if (!meta) notFound();
  if (phase !== "ready" || !draft || n > draft.furthestStep) {
    return (
      <div className="mx-auto w-full max-w-[560px] px-4 py-16"><div className="skul-card"><LoadingState rows={3} /></div></div>
    );
  }

  const Step = STEPS[n];
  return (
    <StepFrame n={n}>
      <Step />
    </StepFrame>
  );
}