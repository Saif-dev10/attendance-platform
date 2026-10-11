"use client";
// INFERRED LAYOUT: no reference screenshot for Step 8.
import Link from "next/link";
import Icon from "@/components/admin/shared/Icon";
import Checkbox from "@/components/ui/Checkbox";
import { computeReadiness } from "@/lib/admin/onboardingSteps";
import { useOnboarding } from "../OnboardingProvider";
import { Section, FieldError } from "./_parts";

const FIX_STEP = { identity: 1, tenant: 2, branding: 3, admin: 4, data: 6, validation: 7 };

export default function Step8Readiness() {
  const { values, errors, setValues } = useOnboarding();
  const items = computeReadiness(values);
  const done = items.filter((i) => i.ok).length;

  return (
    <Section title="Readiness Review" description={`${done} of ${items.length} checks passed. Everything must pass before activation.`}>
      <ul className="divide-y divide-[#eef0f4] rounded-xl border border-[#e5e8ee] bg-white">
        {items.map((i) => (
          <li key={i.key} className="flex items-center gap-3 px-4 py-3.5">
            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${i.ok ? "bg-[#ecfdf5] text-[#059669]" : "bg-[#fef2f2] text-[#dc2626]"}`}>
              <Icon name={i.ok ? "check" : "x"} size={15} title={i.ok ? "Passed" : "Not ready"} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-semibold text-[#0b1a30]">{i.label}</p>
              <p className="truncate text-[12.5px] text-[#6b7587]">{i.detail}</p>
            </div>
            {!i.ok && (
              <Link href={`/admin/platform/onboarding/${FIX_STEP[i.key]}`} className="text-[12.5px] font-semibold text-[#2563eb] hover:underline">Fix</Link>
            )}
          </li>
        ))}
      </ul>
      <FieldError>{errors.checklist}</FieldError>

      <Checkbox
        checked={values.readiness.acknowledged}
        onChange={(v) => setValues("readiness", { acknowledged: v })}
        title="I have reviewed this checklist"
        description="The configuration above is correct and ready to be activated."
      />
      <FieldError>{errors.acknowledged}</FieldError>
    </Section>
  );
}