"use client";
// INFERRED LAYOUT: no reference screenshot for Step 4.
import Input from "@/components/ui/Input";
import Checkbox from "@/components/ui/Checkbox";
import { ADMIN_CONFIG } from "@/lib/admin/config";
import { useOnboarding } from "../OnboardingProvider";
import { Section, Grid2 } from "./_parts";

export default function Step4Admin() {
  const { values, errors, setValues } = useOnboarding();
  const a = values.admin;
  const set = (k) => (e) => setValues("admin", { [k]: e.target.value });

  return (
    <Section title="Initial Administrator" description="The first user who will manage this institution's dashboard.">
      <Grid2>
        <Input label="Full name" value={a.fullName} onChange={set("fullName")} placeholder="e.g. Prof. Ibrahim Sani" error={errors.fullName} autoFocus />
        <Input label="Job title" value={a.title} onChange={set("title")} placeholder="e.g. Registrar" error={errors.title} />
      </Grid2>
      <Input label="Email address" type="email" value={a.email} onChange={set("email")} placeholder={`name@${values.tenant.slug || "institution"}.edu.ng`} error={errors.email} hint="The invitation and password setup link are sent here on activation." />
      <Checkbox
        checked={a.sendInvite}
        onChange={(v) => setValues("admin", { sendInvite: v })}
        title="Send invitation on activation"
        description={ADMIN_CONFIG.useMock ? "Sample mode: no email is actually sent." : "The administrator will receive a secure sign-up link."}
      />
    </Section>
  );
}