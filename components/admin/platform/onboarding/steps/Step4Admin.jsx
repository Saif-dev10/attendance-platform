
"use client";

import Input from "@/components/ui/Input";
import Checkbox from "@/components/ui/Checkbox";
import { ADMIN_CONFIG } from "@/lib/admin/config";
import { useOnboarding } from "../OnboardingProvider";
import { Section, Grid2 } from "./_parts";

export default function Step4Admin() {
  const { values, errors, setValues } = useOnboarding();
  const a = values.admin;

  const set = (key) => (e) =>
    setValues("admin", { [key]: e.target.value });

  return (
    <Section
      title="Initial Administrator"
      description="Create the first user who will manage this institution's dashboard."
    >
      <Grid2>
        <Input
          label="Full name"
          value={a.fullName}
          onChange={set("fullName")}
          placeholder="e.g. Prof. Ibrahim Sani"
          error={errors.fullName}
          autoFocus
        />

        <Input
          label="Job title"
          value={a.title}
          onChange={set("title")}
          placeholder="e.g. Registrar"
          error={errors.title}
        />
      </Grid2>

      <Input
        label="Email address"
        type="email"
        value={a.email}
        onChange={set("email")}
        placeholder={`name@${values.tenant.slug || "institution"}.edu.ng`}
        error={errors.email}
        hint="The administrator's contact email address."
      />

      <Grid2>
        <Input
          label="Admin username"
          value={a.username || ""}
          onChange={set("username")}
          placeholder="e.g. registry.admin"
          error={errors.username}
        />

        <Input
          label="Initial password"
          type="password"
          value={a.password || ""}
          onChange={set("password")}
          placeholder="At least 8 characters"
          error={errors.password}
          hint="This password will be used to create the administrator account."
        />
      </Grid2>

      <Checkbox
        checked={a.sendInvite}
        onChange={(checked) =>
          setValues("admin", { sendInvite: checked })
        }
        title="Send invitation on activation"
        description={
          ADMIN_CONFIG.useMock
            ? "Sample mode: no email is actually sent."
            : "Email delivery must be configured on the backend."
        }
      />
    </Section>
  );
}
