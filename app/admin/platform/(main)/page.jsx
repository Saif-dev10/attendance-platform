"use client";
import { useState } from "react";
import { PageBody } from "@/components/admin/shared/AdminTopbar";
import AdminButton from "@/components/admin/shared/AdminButton";
import KpiCard from "@/components/admin/shared/KpiCard";
import ErrorState from "@/components/admin/shared/ErrorState";
import { useToast } from "@/components/ui/Toast";
import useAsync from "@/lib/admin/useAsync";
import { buildCsv, downloadText } from "@/lib/admin/csv";
import { DATA_SOURCE_LABEL } from "@/lib/admin/config";
import { getPlatformOverview, acknowledgeAlert } from "@/lib/services/admin/metricsService";
import { listInstitutions } from "@/lib/services/admin/institutionsService";
import OverviewTopbar from "@/components/admin/platform/overview/OverviewTopbar";
import ActivityChart from "@/components/admin/platform/overview/ActivityChart";
import InstitutionsSnapshot from "@/components/admin/platform/overview/InstitutionsSnapshot";
import ResourceMonitor from "@/components/admin/platform/overview/ResourceMonitor";
import CriticalAlerts from "@/components/admin/platform/overview/CriticalAlerts";

function KpiSkeleton() {
  return (
    <div className="skul-card p-5" aria-hidden>
      <div className="h-10 w-10 animate-pulse rounded-xl bg-[#eceff4]" />
      <div className="mt-4 h-7 w-20 animate-pulse rounded bg-[#eceff4]" />
      <div className="mt-2 h-3.5 w-32 animate-pulse rounded bg-[#eceff4]" />
    </div>
  );
}

export default function PlatformOverviewPage() {
  const toast = useToast();
  const { data, loading, error, reload } = useAsync(() => getPlatformOverview(), []);
  const [reporting, setReporting] = useState(false);

  const generateReport = async () => {
    setReporting(true);
    try {
      const { items } = await listInstitutions({ pageSize: 1000 });
      const csv = buildCsv(
        ["institution", "code", "slug", "status", "region", "students", "lecturers", "progress_percent"],
        items.map((i) => [i.name, i.code, i.slug, i.status, i.region, i.students ?? "", i.lecturers ?? "", i.progress])
      );
      downloadText(`skul-system-report-${new Date().toISOString().slice(0, 10)}.csv`, csv);
      toast.push({ title: "Report downloaded", message: `${items.length} institutions exported as CSV (${DATA_SOURCE_LABEL.toLowerCase()}).` });
    } catch (err) {
      toast.push({ tone: "error", title: "Report failed", message: err.message });
    } finally {
      setReporting(false);
    }
  };

  const acknowledge = async (id) => {
    try {
      await acknowledgeAlert(id);
      toast.push({ title: "Alert acknowledged" });
      await reload();
    } catch (err) {
      toast.push({ tone: "error", title: "Could not acknowledge alert", message: err.message });
    }
  };

  return (
    <>
      <OverviewTopbar alerts={data?.alerts || []} />
      <PageBody>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[13px] text-[#6b7587]">Platform Administrator</p>
            <h1 className="skul-heading text-[30px] font-bold text-[#0b1a30]">Platform Overview</h1>
          </div>
          <AdminButton variant="accent" icon="file" loading={reporting} onClick={generateReport}>
            Generate System Report
          </AdminButton>
        </div>

        {error ? (
          <div className="skul-card"><ErrorState error={error} onRetry={reload} /></div>
        ) : (
          <div className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {loading && !data
                ? [0, 1, 2, 3].map((i) => <KpiSkeleton key={i} />)
                : data.kpis.map((k) => (
                    <KpiCard key={k.id} icon={k.icon} label={k.label} value={k.value} chip={k.chip} chipTone={k.chipTone} />
                  ))}
            </div>

            {data ? (
              <ActivityChart activity={data.activity} />
            ) : (
              <div className="skul-card h-[420px] animate-pulse" aria-hidden />
            )}

            <div className="grid gap-5 lg:grid-cols-2">
              <InstitutionsSnapshot />
              <div className="space-y-5">
                {data ? (
                  <>
                    <ResourceMonitor resources={data.resources} />
                    <CriticalAlerts alerts={data.alerts} onAcknowledge={acknowledge} />
                  </>
                ) : (
                  <>
                    <div className="skul-card h-[230px] animate-pulse" aria-hidden />
                    <div className="skul-card h-[200px] animate-pulse" aria-hidden />
                  </>
                )}
              </div>
            </div>

            {data?.source === "mock" && (
              <p className="pb-2 text-center text-[11.5px] text-[#8a93a3]">
                {DATA_SOURCE_LABEL}: figures on this page are illustrative and reset on reload.
              </p>
            )}
          </div>
        )}
      </PageBody>
    </>
  );
}