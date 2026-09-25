import { Clock, UserCheck, UserX } from "lucide-react";
import AttendanceStatCard from "../shared/AttendanceStatCard";
import { ProgressRing } from "../shared/AttendanceProgress";

export default function SessionStatistics({ summary, loading = false }) {
  return (
    <section aria-label="Session summary" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <AttendanceStatCard
        icon={UserCheck}
        label="Present"
        value={summary?.present ?? "—"}
        subtext={summary ? `${((summary.present / summary.total) * 100).toFixed(1)}%` : undefined}
        tone="present"
        loading={loading}
      />
      <AttendanceStatCard
        icon={Clock}
        label="Late"
        value={summary?.late ?? "—"}
        subtext={summary ? `${((summary.late / summary.total) * 100).toFixed(1)}%` : undefined}
        tone="late"
        loading={loading}
      />
      <AttendanceStatCard
        icon={UserX}
        label="Absent"
        value={summary?.absent ?? "—"}
        subtext={summary ? `${((summary.absent / summary.total) * 100).toFixed(1)}%` : undefined}
        tone="absent"
        loading={loading}
      />
      {loading ? (
        <div aria-busy="true" className="h-[76px] animate-pulse rounded-md border border-line bg-paper" />
      ) : (
        <div className="flex items-center justify-between gap-3 rounded-md border border-line bg-paper p-3">
          <p className="text-xs text-graphite-soft">Attendance Rate</p>
          {summary && (
            <ProgressRing value={summary.rate} size={56} strokeWidth={6} label={`Attendance rate ${summary.rate}%`}>
              {summary.rate}%
            </ProgressRing>
          )}
        </div>
      )}
    </section>
  );
}
