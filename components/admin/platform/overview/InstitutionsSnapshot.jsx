"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Select from "@/components/ui/Select";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import ErrorState from "@/components/admin/shared/ErrorState";
import LoadingState from "@/components/admin/shared/LoadingState";
import EmptyState from "@/components/admin/shared/EmptyState";
import useAsync from "@/lib/admin/useAsync";
import { listInstitutions, getInstitutionCounts } from "@/lib/services/admin/institutionsService";
import { REGIONS } from "@/lib/admin/onboardingSteps";
import { useState } from "react";

const REGION_OPTIONS = [{ value: "all", label: "All Regions" }, ...REGIONS.map((r) => ({ value: r, label: r }))];
const STATUS_OPTIONS = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "onboarding", label: "Onboarding" },
  { value: "suspended", label: "Suspended" },
];

export default function InstitutionsSnapshot() {
  const router = useRouter();
  const [region, setRegion] = useState("all");
  const [status, setStatus] = useState("all");
  const { data, loading, error, reload } = useAsync(
    () => Promise.all([listInstitutions({ region, status, pageSize: 5 }), getInstitutionCounts()]),
    [region, status]
  );
  const [list, counts] = data || [];

  const qs = new URLSearchParams();
  if (status !== "all") qs.set("status", status);
  if (region !== "all") qs.set("region", region);

  return (
    <section className="skul-card flex flex-col overflow-hidden" aria-labelledby="snap-title">
      <div className="flex flex-wrap items-start justify-between gap-3 p-6 pb-4">
        <div>
          <h2 id="snap-title" className="skul-heading text-[17px] font-semibold text-[#0b1a30]">Total Institutions</h2>
          <p className="mt-0.5 text-[13px] text-[#6b7587]">Active academic deployments</p>
        </div>
        <div className="flex gap-2">
          <Select compact aria-label="Filter by region" options={REGION_OPTIONS} value={region} onChange={(e) => setRegion(e.target.value)} />
          <Select compact aria-label="Filter by status" options={STATUS_OPTIONS} value={status} onChange={(e) => setStatus(e.target.value)} />
        </div>
      </div>

      {error ? (
        <ErrorState error={error} onRetry={reload} />
      ) : loading && !data ? (
        <LoadingState rows={5} />
      ) : list.items.length === 0 ? (
        <EmptyState title="No institutions match these filters" />
      ) : (
        <div className={`overflow-x-auto ${loading ? "opacity-60" : ""}`}>
          <table className="w-full min-w-[420px] text-left">
            <thead>
              <tr className="bg-[#f8f9fb]">
                <th className="skul-eyebrow px-6 py-3">Institution</th>
                <th className="skul-eyebrow px-3 py-3">Region</th>
                <th className="skul-eyebrow px-6 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {list.items.map((i) => (
                <tr key={i.id} onClick={() => router.push(`/admin/platform/institutions/${i.id}`)} className="cursor-pointer border-t border-[#eef0f4] hover:bg-[#f8f9fb]">
                  <td className="px-6 py-3.5 text-[13.5px] font-semibold text-[#0b1a30]">
                    <Link href={`/admin/platform/institutions/${i.id}`} className="hover:underline">{i.name}</Link>
                  </td>
                  <td className="px-3 py-3.5 text-[13px] text-[#6b7587]">{i.region}</td>
                  <td className="px-6 py-3.5 text-right"><StatusBadge status={i.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-auto border-t border-[#eef0f4] py-3.5 text-center">
        <Link href={`/admin/platform/institutions${qs.size ? `?${qs}` : ""}`} className="text-[12.5px] font-semibold text-[#0b1a30] hover:underline">
          View All {counts ? counts.all : ""} Institutions
        </Link>
      </div>
    </section>
  );
}