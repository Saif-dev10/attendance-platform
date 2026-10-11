"use client";
// INFERRED LAYOUT: no reference screenshot for Security & Auth.
import Input from "@/components/ui/Input";
import Checkbox from "@/components/ui/Checkbox";
import ConfigSection, { FieldGrid } from "./ConfigSection";
import { digits } from "./useSettingsForm";

export default function SecurityTab({ values, errors, onChange }) {
  const num = (key) => (e) => onChange({ [key]: digits(e.target.value) });
  return (
    <div className="space-y-10">
      <ConfigSection title="Sign-in Policy" description="Platform-wide authentication rules. Individual institutions cannot weaken these.">
        <FieldGrid>
          <Input label="Minimum password length" inputMode="numeric" suffix="chars" value={values.minPasswordLength} onChange={num("minPasswordLength")} error={errors.minPasswordLength} hint="Between 8 and 64 characters." />
          <Input label="Session timeout" inputMode="numeric" suffix="Minutes" value={values.sessionTimeoutMinutes} onChange={num("sessionTimeoutMinutes")} error={errors.sessionTimeoutMinutes} hint="Idle time before a user is signed out." />
        </FieldGrid>
        <FieldGrid>
          <Input label="Failed login limit" inputMode="numeric" suffix="Attempts" value={values.maxFailedLogins} onChange={num("maxFailedLogins")} error={errors.maxFailedLogins} hint="Account is locked after this many consecutive failures." />
        </FieldGrid>
      </ConfigSection>

      <ConfigSection divider title="Administrator Protection">
        <Checkbox
          checked={values.requireAdminMfa}
          onChange={(v) => onChange({ requireAdminMfa: v })}
          title="Require multi-factor authentication for administrators"
          description="Applies to platform administrators and institution administrators."
        />
      </ConfigSection>
    </div>
  );
}