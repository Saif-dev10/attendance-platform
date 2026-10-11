"use client";
// REPRODUCED FROM REFERENCE: Step 2: Tenant Configuration.
import Icon from "@/components/admin/shared/Icon";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Checkbox from "@/components/ui/Checkbox";
import { SESSION_TYPES, STORAGE_REGIONS } from "@/lib/admin/onboardingSteps";
import { ADMIN_CONFIG } from "@/lib/admin/config";
import { useOnboarding } from "../OnboardingProvider";
import { Section, Grid2 } from "./_parts";

function SlugStatus({ status }) {
  if (status === "available")
    return (
      <span className="flex items-center gap-1 text-[12px] font-semibold text-[#059669]">
        <Icon name="checkCircle" size={13} /> available
      </span>
    );
  if (status === "checking") return <span className="text-[12px] text-[#8a93a3]">checking…</span>;
  if (status === "taken") return <span className="text-[12px] font-semibold text-[#dc2626]">already in use</span>;
  if (status === "reserved") return <span className="text-[12px] font-semibold text-[#dc2626]">reserved</span>;
  return null;
}

export default function Step2Tenant() {
  const { values, errors, setValues, slugStatus } = useOnboarding();
  const t = values.tenant;
  const set = (patch) => setValues("tenant", patch);

  return (
    <div className="space-y-10">
      <div className="flex items-start gap-4 rounded-2xl border border-[#bfdbfe] bg-[#eff6ff] p-5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#dbeafe] text-[#2563eb]">
          <Icon name="info" size={20} />
        </span>
        <div>
          <p className="text-[14px] font-semibold text-[#1e3a8a]">Tenant Isolation Strategy</p>
          <p className="mt-1 text-[12.5px] leading-relaxed text-[#1d4ed8]">
            SKUL utilizes a multi-tenant architecture. Each university requires a unique slug which will determine their primary domain and isolated database environment.
          </p>
        </div>
      </div>

      <Section title="Identity & URL" description="Configure how the institution will be accessed across the platform.">
        <Grid2>
          <Input label="Institution code" value={t.code} readOnly disabled mono placeholder="Generated when step 1 is saved" hint="System generated unique identifier." />
          <Input
            label="University slug"
            labelRight={<SlugStatus status={slugStatus} />}
            value={t.slug}
            onChange={(e) => set({ slug: e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "") })}
            placeholder="e.g. unibadan"
            maxLength={30}
            autoComplete="off"
            error={errors.slug}
            hint="Letters and numbers only. Used for API and routing."
            rightSlot={<Icon name="shield" size={17} className={slugStatus === "available" ? "text-[#059669]" : "text-[#b4bbc8]"} />}
          />
        </Grid2>

        <div className="rounded-2xl border border-[#eef0f4] bg-[#fbfbfd] px-6 py-8 text-center">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.28em] text-[#8a93a3]">Platform URL Preview</p>
          <p className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[22px] font-semibold text-[#0b1a30]" aria-live="polite">
            <span>https://</span>
            <span className={`rounded-lg px-3 py-0.5 font-bold ${t.slug ? "bg-[#fdf1c1] text-[#0b1a30]" : "bg-[#f3f5f9] text-[#a3abb9]"}`}>{t.slug || "yourslug"}</span>
            <span className="text-[#b4bbc8]">.{ADMIN_CONFIG.platformDomain}</span>
          </p>
          <p className="mx-auto mt-4 max-w-xs text-[12px] text-[#8a93a3]">This URL will be the primary entry point for all Students and Lecturers of this institution.</p>
        </div>
      </Section>

      <Section title="Technical Defaults" description="Select the baseline configuration for this tenant's academic environment.">
        <Grid2>
          <Select label="Default session type" options={SESSION_TYPES} value={t.sessionType} onChange={(e) => set({ sessionType: e.target.value })} />
          <Select label="Storage region" options={STORAGE_REGIONS} value={t.storageRegion} onChange={(e) => set({ storageRegion: e.target.value })} />
        </Grid2>
        <Checkbox
          checked={t.strictEnrolment}
          onChange={(v) => set({ strictEnrolment: v })}
          title="Enforce Strict Academic Enrolment"
          description="If enabled, students can only join course offerings that strictly match their registered programme and level."
        />
        <Checkbox
          checked={t.legacyImport}
          onChange={(v) => set({ legacyImport: v })}
          title="Legacy Import Compatibility Mode"
          description="Relax validation rules for historical matriculation numbers and staff IDs that don't match standard formats."
        />
      </Section>
    </div>
  );
}