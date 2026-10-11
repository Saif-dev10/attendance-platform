"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminTopbar, { PageBody } from "@/components/admin/shared/AdminTopbar";
import AdminButton from "@/components/admin/shared/AdminButton";
import Icon from "@/components/admin/shared/Icon";
import { useToast } from "@/components/ui/Toast";
import { ONBOARDING_STEPS, TOTAL_STEPS, continueLabel, getStep } from "@/lib/admin/onboardingSteps";
import { useOnboarding } from "./OnboardingProvider";
import { useOnboardingMenu } from "./OnboardingShell";

/** Header + scrolling body + sticky footer shared by all nine steps. */
export default function StepFrame({ n, children }) {
  const router = useRouter();
  const toast = useToast();
  const { openMenu } = useOnboardingMenu();
  const { busy, errors, next, saveExit, activate, clearErrors } = useOnboarding();
  const meta = getStep(n);
  const last = n === TOTAL_STEPS;
  const errorCount = Object.keys(errors).length;

  useEffect(() => {
    clearErrors();
  }, [n, clearErrors]);

  const onContinue = async () => {
    try {
      if (last) {
        const inst = await activate();
        if (inst) {
          toast.push({ title: "Institution activated", message: `${inst.name} is now live (sample mode: nothing was sent to a server).` });
          router.push(`/admin/platform/institutions/${inst.id}`);
        }
        return;
      }
      const r = await next(n);
      if (r.ok) router.push(`/admin/platform/onboarding/${n + 1}`);
    } catch (err) {
      const detail = err.fields ? Object.values(err.fields)[0] : "";
      toast.push({ tone: "error", title: last ? "Activation failed" : "Could not save this step", message: [err.message, detail].filter(Boolean).join(" ") });
    }
  };

  const onSaveExit = async () => {
    try {
      const r = await saveExit(n);
      toast.push(
        r.saved
          ? { title: "Progress saved", message: "Resume any time from Institutions → Resume onboarding." }
          : { tone: "info", title: "Nothing to save yet", message: "Enter the institution name first." }
      );
      router.push("/admin/platform/institutions");
    } catch (err) {
      toast.push({ tone: "error", title: "Could not save progress", message: err.message });
    }
  };

  return (
    <>
      <AdminTopbar
        onMenu={openMenu}
        breadcrumb={[{ label: "Institutions", href: "/admin/platform/institutions" }, { label: "New Institution Onboarding" }]}
        title={meta.title}
        actions={<AdminButton variant="ghost" onClick={onSaveExit} disabled={busy}>Save &amp; Exit</AdminButton>}
      />
      <div className="flex-1">
        <PageBody narrow className="pb-10">
          {errorCount > 0 && (
            <div role="alert" className="mb-6 flex items-start gap-2.5 rounded-xl border border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-[13px] text-[#991b1b]">
              <Icon name="alert" size={17} className="mt-0.5 shrink-0" />
              <span>Fix {errorCount} issue{errorCount > 1 ? "s" : ""} below before continuing.</span>
            </div>
          )}
          {children}
        </PageBody>
      </div>
      <footer className="sticky bottom-0 z-10 flex flex-wrap items-center justify-between gap-3 border-t border-[#e5e8ee] bg-white px-4 py-4 sm:px-8">
        {n === 1 ? (
          <AdminButton href="/admin/platform/institutions">Cancel</AdminButton>
        ) : (
          <AdminButton icon="arrowLeft" href={`/admin/platform/onboarding/${n - 1}`}>Previous Step</AdminButton>
        )}
        <div className="flex items-center gap-4">
          <span className="hidden text-[12.5px] text-[#6b7587] sm:block">Step {n} of {TOTAL_STEPS}</span>
          <AdminButton variant="primary" iconRight={last ? "check" : "arrowRight"} loading={busy} onClick={onContinue} className="h-11">
            {continueLabel(n)}
          </AdminButton>
        </div>
      </footer>
    </>
  );
}

export { ONBOARDING_STEPS };