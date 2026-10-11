"use client";
// INFERRED LAYOUT: no reference screenshot for Step 5.
import { SETUP_METHODS } from "@/lib/admin/onboardingSteps";
import { useOnboarding } from "../OnboardingProvider";
import { Section, FieldError } from "./_parts";

export default function Step5Method() {
  const { values, errors, setValues } = useOnboarding();
  const choice = values.method.choice;

  return (
    <Section title="Setup Method" description="Choose how academic data will be loaded for this tenant. You can change this later.">
      <div role="radiogroup" aria-label="Setup method" className="space-y-3">
        {SETUP_METHODS.map((m) => {
          const on = choice === m.value;
          return (
            <button
              key={m.value}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => setValues("method", { choice: m.value })}
              className={`flex w-full items-start gap-3.5 rounded-xl border bg-white px-4 py-4 text-left ${on ? "border-[#071a33] ring-1 ring-[#071a33]" : "border-[#e5e8ee] hover:border-[#cfd5df]"}`}
            >
              <span className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border ${on ? "border-[#071a33]" : "border-[#8a93a3]"}`}>
                {on && <span className="h-2.5 w-2.5 rounded-full bg-[#071a33]" />}
              </span>
              <span>
                <span className="block text-[14px] font-semibold text-[#0b1a30]">{m.label}</span>
                <span className="mt-0.5 block text-[12.5px] text-[#6b7587]">{m.description}</span>
              </span>
            </button>
          );
        })}
      </div>
      <FieldError>{errors.choice}</FieldError>
    </Section>
  );
}