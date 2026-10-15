"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import AdminTopbar, { PageBody } from "@/components/admin/shared/AdminTopbar";
import AdminButton from "@/components/admin/shared/AdminButton";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import ProgressBar from "@/components/admin/shared/ProgressBar";
import ErrorState from "@/components/admin/shared/ErrorState";
import LoadingState from "@/components/admin/shared/LoadingState";
import { useShell } from "@/components/admin/shared/AdminShell";
import useAsync from "@/lib/admin/useAsync";
import { formatNumber } from "@/lib/admin/format";
import { ADMIN_CONFIG } from "@/lib/admin/config";
import { INSTITUTION_TYPES, ONBOARDING_STEPS, TOTAL_STEPS } from "@/lib/admin/onboardingSteps";
import { getInstitution } from "@/lib/services/admin/institutionsService";
import InstitutionAvatar from "@/components/admin/platform/institutions/InstitutionAvatar";
import StatusChangeDialog from "@/components/admin/platform/institutions/StatusChangeDialog";

function Fact({ label, children }) {
  return (
    <div>
      <dt className="skul-eyebrow">{label}</dt>
      <dd className="mt-1 text-[14px] text-[#0b1a30]">{children}</dd>
    </div>
  );
}

export default function InstitutionDetailPage() {
  const { institutionId } = useParams();
  const { openMenu } = useShell();
  const { data, loading, error, reload } = useAsync(() => getInstitution(institutionId), [institutionId]);
  const [pending, setPending] = useState(null);
  const inst = data?.institution;

  const actions = inst && (
    <>
      {inst.status === "onboarding" && (
        <AdminButton variant="primary" icon="onboarding" href={`/admin/platform/onboarding?institution=${inst.id}`}>Resume onboarding</AdminButton>
      )}
      {inst.id === "inst_buk" && <AdminButton icon="building" href="/admin/university">Open dashboard</AdminButton>}
      {inst.status === "active" && <AdminButton variant="dangerSoft" onClick={() => setPending({ institution: inst, status: "suspended" })}>Suspend</AdminButton>}
      {inst.status === "suspended" && <AdminButton variant="primary" onClick={() => setPending({ institution: inst, status: "active" })}>Reactivate</AdminButton>}
    </>
  );

  return (
    <>
      <AdminTopbar
        onMenu={openMenu}
        breadcrumb={[
          { label: "Platform Admin", href: "/admin/platform" },
          { label: "Institutions", href: "/admin/platform/institutions" },
          { label: inst?.name || "Institution" },
        ]}
        title={inst?.name || "Institution details"}
        actions={actions}
      />
      <PageBody narrow>
        {error ? (
          <div className="skul-card"><ErrorState error={error} onRetry={reload} /></div>
        ) : loading && !inst ? (
          <div className="skul-card"><LoadingState rows={5} /></div>
        ) : (
          <div className="space-y-5">
            <section className="skul-card p-6">
              <div className="flex flex-wrap items-center gap-4">
                <InstitutionAvatar abbr={inst.abbr} status={inst.status} size="lg" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h2 className="skul-heading text-[20px] font-semibold text-[#0b1a30]">{inst.name}</h2>
                    <StatusBadge status={inst.status} />
                  </div>
                  <p className="mt-1 text-[13px] text-[#6b7587]">
                    {inst.slug ? `https://${inst.slug}.${ADMIN_CONFIG.platformDomain}` : "Slug not configured yet"}
                  </p>
                </div>
              </div>

              
              <dl className="mt-6 grid gap-x-6 gap-y-5 border-t border-[#E2DDD3] pt-6 sm:grid-cols-2 lg:grid-cols-3">
                <Fact label="Institution code">
                  <span className="font-mono text-[13px]">
                    {inst.code || "Not set"}
                  </span>
                </Fact>

                <Fact label="Email">
                  {inst.email || "Not provided"}
                </Fact>

                <Fact label="Phone">
                  {inst.phone || "Not provided"}
                </Fact>

                <Fact label="Address">
                  {inst.address || "Not provided"}
                </Fact>

                <Fact label="Students">
                  {inst.students == null ? "Not available" : formatNumber(inst.students)}
                </Fact>

                <Fact label="Lecturers">
                  {inst.lecturers == null ? "Not available" : formatNumber(inst.lecturers)}
                </Fact>
              </dl>

            </section>

            {inst.status === "onboarding" && (
              <section className="skul-card p-6">
                <h3 className="skul-heading text-[15px] font-semibold text-[#0b1a30]">Onboarding progress</h3>
                <p className="mt-1 text-[13px] text-[#6b7587]">
                  Currently on step {inst.onboardingStep || 1} of {TOTAL_STEPS}: {ONBOARDING_STEPS[(inst.onboardingStep || 1) - 1].label}
                </p>
                <ProgressBar className="mt-4" value={inst.progress} tone="blue" showValue label="Onboarding progress" height="h-2" />
              </section>
            )}
          </div>
        )}
      </PageBody>
      <StatusChangeDialog pending={pending} onClose={() => setPending(null)} onDone={reload} />
    </>
  );
}