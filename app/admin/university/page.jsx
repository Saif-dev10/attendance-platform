"use client";
import { useState } from "react";
import { PageBody } from "@/components/admin/shared/AdminTopbar";
import KpiCard from "@/components/admin/shared/KpiCard";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import ErrorState from "@/components/admin/shared/ErrorState";
import useAsync from "@/lib/admin/useAsync";
import { getUniversityOverview } from "@/lib/services/admin/metricsService";
import UniversityTopbar from "@/components/admin/university/UniversityTopbar";
import AttendanceChart from "@/components/admin/university/overview/AttendanceChart";
import QuickActions from "@/components/admin/university/overview/QuickActions";
import RecentActivity from "@/components/admin/university/overview/RecentActivity";
import StudentFormModal from "@/components/admin/university/students/StudentFormModal";
import StudentImportModal from "@/components/admin/university/students/StudentImportModal";

function KpiSkeleton() {
  return (
    <div className="skul-card p-5" aria-hidden>
      <div className="h-10 w-10 animate-pulse rounded-xl bg-[#eceff4]" />
      <div className="mt-4 h-7 w-24 animate-pulse rounded bg-[#eceff4]" />
      <div className="mt-2 h-3.5 w-32 animate-pulse rounded bg-[#eceff4]" />
    </div>
  );
}

export default function UniversityOverviewPage() {
  const { data, loading, error, reload } = useAsync(() => getUniversityOverview(), []);
  const [studentOpen, setStudentOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);

  return (
    <>
      <UniversityTopbar
        profile={data?.profile}
        recent={data?.recent || []}
        onAddStudent={() => setStudentOpen(true)}
        onBulkEnrollment={() => setImportOpen(true)}
      />
      <PageBody>
        <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="skul-heading text-[30px] font-bold text-[#0b1a30]">University Overview</h1>
            <p className="mt-1 text-[14px] text-[#6b7587]">
              Operational snapshot for {data?.profile.fullName || "your university"}.
            </p>
          </div>
          {data?.health === "healthy" && <StatusBadge status="healthy" />}
        </div>

        {error ? (
          <div className="skul-card"><ErrorState error={error} onRetry={reload} /></div>
        ) : (
          <div className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {loading && !data
                ? [0, 1, 2, 3].map((i) => <KpiSkeleton key={i} />)
                : data.kpis.map((k) => (
                    <KpiCard key={k.id} variant="detail" icon={k.icon} label={k.label} value={k.value} caption={k.caption} captionTone={k.captionTone} />
                  ))}
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <AttendanceChart />
              </div>
              <div className="space-y-5">
                <QuickActions onAddStudent={() => setStudentOpen(true)} onBulkEnrollment={() => setImportOpen(true)} />
                {data ? <RecentActivity items={data.recent} /> : <div className="skul-card h-[220px] animate-pulse" aria-hidden />}
              </div>
            </div>

            {data?.source === "mock" && (
              <p className="pb-2 text-center text-[11.5px] text-[#8a93a3]">Sample data: figures, health status and chart values are illustrative and reset on reload.</p>
            )}
          </div>
        )}
      </PageBody>

      {studentOpen && <StudentFormModal onClose={() => setStudentOpen(false)} onCreated={reload} />}
      {importOpen && <StudentImportModal onClose={() => setImportOpen(false)} onImported={reload} />}
    </>
  );
}