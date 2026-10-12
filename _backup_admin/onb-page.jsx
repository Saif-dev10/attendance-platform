"use client";
import { Suspense, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AdminButton from "@/components/admin/shared/AdminButton";
import ErrorState from "@/components/admin/shared/ErrorState";
import LoadingState from "@/components/admin/shared/LoadingState";
import { useOnboarding } from "@/components/admin/platform/onboarding/OnboardingProvider";

/** Entry: starts a new draft, or resumes one with ?institution=<id>, then redirects to the right step. */
function Entry() {
  const router = useRouter();
  const params = useSearchParams();
  const { start, phase, loadError } = useOnboarding();
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    (async () => {
      const d = await start(params.get("institution"));
      if (d) router.replace(`/admin/platform/onboarding/${d.currentStep}`);
    })();
  }, [start, params, router]);

  return (
    <div className="mx-auto w-full max-w-[560px] px-4 py-16">
      <div className="skul-card">
        {phase === "error" ? (
          <>
            <ErrorState error={loadError} />
            <div className="flex justify-center pb-8">
              <AdminButton variant="primary" href="/admin/platform/institutions">Back to institutions</AdminButton>
            </div>
          </>
        ) : (
          <>
            <p className="px-6 pt-6 text-[14px] font-semibold text-[#0b1a30]">Preparing onboarding…</p>
            <LoadingState rows={3} />
          </>
        )}
      </div>
    </div>
  );
}

export default function OnboardingEntryPage() {
  return (
    <Suspense fallback={null}>
      <Entry />
    </Suspense>
  );
}