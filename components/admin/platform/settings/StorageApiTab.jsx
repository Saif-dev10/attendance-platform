"use client";
// INFERRED LAYOUT: no reference screenshot for Storage & API.
import Input from "@/components/ui/Input";
import ConfigSection, { FieldGrid } from "./ConfigSection";
import { digits } from "./useSettingsForm";

export default function StorageApiTab({ values, errors, onChange }) {
  const num = (key) => (e) => onChange({ [key]: digits(e.target.value) });
  return (
    <div className="space-y-10">
      <ConfigSection title="File Storage" description="Limits applied to uploads and stored files across all institutions.">
        <FieldGrid>
          <Input label="Max upload size" inputMode="numeric" suffix="MB" value={values.maxUploadMb} onChange={num("maxUploadMb")} error={errors.maxUploadMb} hint="Between 1 and 100 MB per file." />
          <Input label="Retention period" inputMode="numeric" suffix="Days" value={values.retentionDays} onChange={num("retentionDays")} error={errors.retentionDays} hint="How long import files and exports are kept." />
        </FieldGrid>
      </ConfigSection>

      <ConfigSection divider title="API Limits" description="Protects the platform from runaway integrations.">
        <FieldGrid>
          <Input label="Rate limit" inputMode="numeric" suffix="Req / min" value={values.apiRateLimitPerMinute} onChange={num("apiRateLimitPerMinute")} error={errors.apiRateLimitPerMinute} hint="Per client. Between 60 and 5,000." />
        </FieldGrid>
      </ConfigSection>
    </div>
  );
}