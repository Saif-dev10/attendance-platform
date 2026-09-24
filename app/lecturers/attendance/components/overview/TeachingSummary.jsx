import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { ATTENDANCE_THRESHOLD } from "@/lib/mock/attendanceUtils";

export default function TeachingSummary({ teaching, loading = false, belowThresholdHref }) {
  if (loading || !teaching) {
    return (
      <div
        aria-busy={loading}
        className="h-56 animate-pulse rounded-md border border-line bg-paper"
      />
    );
  }

  const rows = [
    { label: "Today's Classes", value: `${teaching.classesToday} / ${teaching.classesScheduledToday}` },
    { label: "Total Students (All Classes)", value: teaching.totalStudents },
    { label: "Avg. Attendance Rate", value: `${teaching.averageRate}%` },
  ];

  return (
    <section
      aria-labelledby="teaching-summary-heading"
      className="rounded-md border border-line bg-paper p-4"
    >
      <h2 id="teaching-summary-heading" className="text-sm font-semibold text-charcoal">
        Teaching Summary
      </h2>

      <dl className="mt-3 space-y-3">
        {rows.map((row) => (
          <div key={row.label}>
            <dt className="text-xs text-graphite-soft">{row.label}</dt>
            <dd className="text-lg font-semibold leading-tight text-charcoal">{row.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 flex items-center justify-between gap-2 rounded-md border border-clay/30 bg-clay/10 px-3 py-2">
        <div className="flex items-center gap-2">
          <AlertTriangle aria-hidden="true" className="h-4 w-4 shrink-0 text-clay" />
          <div>
            <p className="text-xs text-graphite">Students Below {ATTENDANCE_THRESHOLD}%</p>
            <p className="text-base font-semibold text-clay">{teaching.belowThresholdCount}</p>
          </div>
        </div>
        {belowThresholdHref && (
          <Link
            href={belowThresholdHref}
            className="inline-flex items-center gap-1 text-xs font-medium text-charcoal hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze-deep"
          >
            View List
            <ArrowRight aria-hidden="true" className="h-3 w-3" />
          </Link>
        )}
      </div>
    </section>
  );
}