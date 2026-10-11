"use client";
// REPRODUCED FROM REFERENCE: Global Configuration → Platform Policy.
import Input from "@/components/ui/Input";
import Checkbox from "@/components/ui/Checkbox";
import ConfigSection, { FieldGrid } from "./ConfigSection";
import MaintenanceCard from "./MaintenanceCard";
import { digits } from "./useSettingsForm";

export default function PolicyTab({ values, errors, onChange, maintenance, onToggleMaintenance, hasUnsaved }) {
  const num = (key) => (e) => onChange({ [key]: digits(e.target.value) });

  return (
    <div className="space-y-10">
      <ConfigSection title="Global Academic Defaults" description="These settings are applied to all new institutions unless overridden during onboarding.">
        <FieldGrid>
          <Input
            label="Default session length"
            inputMode="numeric"
            suffix="Weeks"
            value={values.sessionLengthWeeks}
            onChange={num("sessionLengthWeeks")}
            error={errors.sessionLengthWeeks}
            hint="Standard Nigerian university semester duration (excluding exams)."
          />
          <Input
            label="Default max course credit"
            inputMode="numeric"
            value={values.maxCourseCredit}
            onChange={num("maxCourseCredit")}
            error={errors.maxCourseCredit}
            hint="Maximum allowable credits per student per semester."
          />
        </FieldGrid>
      </ConfigSection>

      <ConfigSection divider title="Global Attendance Oversight" description="Define platform-wide rules for QR-based attendance tracking.">
        <Checkbox
          checked={values.geofencing}
          onChange={(v) => onChange({ geofencing: v })}
          title="Enforce Geo-fencing for QR Scans"
          description={`Students must be within ${values.geofenceRadiusMeters} meters of the classroom coordinates (if provided) to successfully scan an attendance QR code.`}
        />
        <Checkbox
          checked={values.lowAttendanceAlerts}
          onChange={(v) => onChange({ lowAttendanceAlerts: v })}
          title="Automatic Low-Attendance Alerts"
          description={`Automatically flag students whose attendance falls below the minimum threshold (default 70%) across all institutions.`}
        />
        {values.lowAttendanceAlerts && (
          <div className="max-w-xs rounded-xl border border-[#e5e8ee] bg-white px-4 py-4">
            <Input
              label="Alert threshold"
              inputMode="numeric"
              suffix="%"
              value={values.lowAttendanceThreshold}
              onChange={num("lowAttendanceThreshold")}
              error={errors.lowAttendanceThreshold}
              hint="Students below this attendance percentage are flagged."
            />
          </div>
        )}
      </ConfigSection>

      <ConfigSection divider title="Platform Maintenance Mode" description="Restrict access to the platform during major version upgrades or database migrations.">
        <MaintenanceCard maintenance={maintenance} onToggle={onToggleMaintenance} hasUnsaved={hasUnsaved} />
      </ConfigSection>
    </div>
  );
}