"use client";
// INFERRED LAYOUT: no reference screenshot for Step 1.
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { INSTITUTION_TYPES, REGIONS } from "@/lib/admin/onboardingSteps";
import { useOnboarding } from "../OnboardingProvider";
import { Section, Grid2 } from "./_parts";

const REGION_OPTIONS = [{ value: "", label: "Select region" }, ...REGIONS.map((r) => ({ value: r, label: r }))];

export default function Step1Info() {
  const { values, errors, setValues } = useOnboarding();
  const v = values.info;
  const set = (k) => (e) => setValues("info", { [k]: e.target.value });

  return (
    <Section title="Institution Details" description="Basic information used to identify the institution across the platform.">
      <Input label="Institution name" value={v.name} onChange={set("name")} placeholder="e.g. University of Ibadan" error={errors.name} autoFocus />
      <Grid2>
        <Select label="Institution type" options={INSTITUTION_TYPES} value={v.institutionType} onChange={set("institutionType")} />
        <Select label="Region" options={REGION_OPTIONS} value={v.region} onChange={set("region")} error={errors.region} />
      </Grid2>
      <Grid2>
        <Input label="State" value={v.state} onChange={set("state")} placeholder="e.g. Oyo" error={errors.state} />
        <Input label="Official email" type="email" value={v.officialEmail} onChange={set("officialEmail")} placeholder="registry@institution.edu.ng" error={errors.officialEmail} />
      </Grid2>
    </Section>
  );
}