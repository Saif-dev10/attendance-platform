"use client";
// INFERRED LAYOUT: no reference screenshot for Step 9.
import Checkbox from "@/components/ui/Checkbox";
import { ADMIN_CONFIG, DATA_SOURCE_LABEL } from "@/lib/admin/config";
import { useOnboarding } from "../OnboardingProvider";
import { Section, Notice, FieldError } from "./_parts";

function Row({ label, children }) {
  return (
    <div className="flex flex-wrap justify-between gap-2 px-4 py-3">
      <dt className="text-[12.5px] text-[#6b7587]">{label}</dt>
      <dd className="text-[13.5px] font-medium text-[#0b1a30]">{children}</dd>
    </div>
  );
}

export default function Step9Activation() {
  const { values, errors, setValues } = useOnboarding();
  const { info, tenant, admin, method, imports } = values;

  return (
    <Section title="Activation" description="Review the summary, then go live.">
      <dl className="divide-y divide-[#eef0f4] rounded-xl border border-[#e5e8ee] bg-white">
        <Row label="Institution">{info.name}</Row>
        <Row label="Code"><span className="font-mono text-[12.5px]">{tenant.code}</span></Row>
        <Row label="URL">https://{tenant.slug}.{ADMIN_CONFIG.platformDomain}</Row>
        <Row label="Initial administrator">{admin.fullName} · {admin.email}</Row>
        <Row label="Academic data">{method.choice === "import" ? `${imports.files.length} file(s) attached` : "Loaded after activation"}</Row>
      </dl>

      <Notice tone="warning" title="What activation does">
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>Marks the institution Active and opens its tenant URL.</li>
          <li>{admin.sendInvite ? "Sends the invitation to the initial administrator." : "No invitation is sent (turned off in Step 4)."}</li>
        </ul>
        {ADMIN_CONFIG.useMock && <p className="mt-2 font-semibold">{DATA_SOURCE_LABEL}: nothing is provisioned or emailed; only the local list updates.</p>}
      </Notice>

      <Checkbox
        checked={values.activation.confirmed}
        onChange={(v) => setValues("activation", { confirmed: v })}
        title="Activate this institution"
        description="I confirm the details above are correct."
      />
      <FieldError>{errors.confirmed}</FieldError>
    </Section>
  );
}