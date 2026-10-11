"use client";
// INFERRED LAYOUT: no reference screenshot for Step 7.
import { useState } from "react";
import AdminButton from "@/components/admin/shared/AdminButton";
import Icon from "@/components/admin/shared/Icon";
import { useToast } from "@/components/ui/Toast";
import { runValidation } from "@/lib/services/admin/onboardingService";
import { formatDateTime } from "@/lib/admin/format";
import { useOnboarding } from "../OnboardingProvider";
import { Section, Notice, FieldError } from "./_parts";

function Stat({ label, value, tone }) {
  const cls = tone === "error" && value > 0 ? "text-[#dc2626]" : tone === "warning" && value > 0 ? "text-[#b45309]" : "text-[#0b1a30]";
  return (
    <div className="rounded-xl border border-[#e5e8ee] bg-white px-4 py-3.5">
      <p className="skul-eyebrow">{label}</p>
      <p className={`skul-heading mt-1 text-[24px] font-bold ${cls}`}>{value.toLocaleString()}</p>
    </div>
  );
}

export default function Step7Validation() {
  const { values, errors, setValues } = useOnboarding();
  const toast = useToast();
  const [running, setRunning] = useState(false);
  const r = values.validation;

  const run = async () => {
    setRunning(true);
    try {
      const { validation } = await runValidation(values);
      setValues("validation", validation);
    } catch (err) {
      toast.push({ tone: "error", title: "Validation could not run", message: err.message });
    } finally {
      setRunning(false);
    }
  };

  return (
    <Section title="Validation" description="Run pre-activation checks on the tenant configuration and attached files.">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#e5e8ee] bg-white p-4">
        <div>
          <p className="text-[14px] font-semibold text-[#0b1a30]">{r.ranAt ? "Validation complete" : "Not run yet"}</p>
          <p className="text-[12.5px] text-[#6b7587]">
            {r.ranAt ? `Last run ${formatDateTime(r.ranAt)}` : "Checks the slug, administrator details, branding and import files."}
          </p>
        </div>
        <AdminButton variant="primary" icon="shield" loading={running} onClick={run}>{r.ranAt ? "Run again" : "Run validation"}</AdminButton>
      </div>
      <FieldError>{errors.validation}</FieldError>

      {r.ranAt && (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <Stat label="Records checked" value={r.checked} />
            <Stat label="Blocking errors" value={r.errors.length} tone="error" />
            <Stat label="Warnings" value={r.warnings.length} tone="warning" />
          </div>
          {r.errors.length === 0 ? (
            <Notice tone="success" title="No blocking errors">You can continue to the readiness review.</Notice>
          ) : (
            <Notice tone="error" title="Resolve these before continuing">
              <ul className="mt-1 list-disc space-y-1 pl-5">{r.errors.map((e) => <li key={e.field + e.message}>{e.message}</li>)}</ul>
            </Notice>
          )}
          {r.warnings.length > 0 && (
            <Notice tone="warning" title="Warnings (non-blocking)">
              <ul className="mt-1 list-disc space-y-1 pl-5">{r.warnings.map((w) => <li key={w.field + w.message}>{w.message}</li>)}</ul>
            </Notice>
          )}
          <p className="flex items-center gap-1.5 text-[11.5px] text-[#8a93a3]">
            <Icon name="info" size={13} /> Sample mode: checks run against local data only.
          </p>
        </>
      )}
    </Section>
  );
}