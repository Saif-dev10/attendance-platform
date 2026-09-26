import { BookOpen, CalendarCheck, ShieldAlert, Trophy } from "lucide-react";
import { ProgressRing } from "../shared/AttendanceProgress";
import { isBelowThreshold } from "@/lib/mock/attendanceUtils";

function QuickStat({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2 rounded-md border border-line bg-paper p-3">
      <Icon aria-hidden="true" className="h-4 w-4 text-graphite-soft" />
      <div>
        <p className="text-xs text-graphite-soft">{label}</p>
        <p className="text-base font-semibold text-charcoal">{value}</p>
      </div>
    </div>
  );
}

export default function StudentAttendanceSummary({ overall, quickStats, loading = false }) {
  if (loading || !overall) {
    return (
      <div className="grid gap-3 md:grid-cols-2">
        <div aria-busy="true" className="h-40 animate-pulse rounded-md border border-line bg-paper" />
        <div className="grid grid-cols-2 gap-3">
          {[0, 1, 2, 3].map((key) => (
            <div key={key} aria-busy="true" className="h-[68px] animate-pulse rounded-md border border-line bg-paper" />
          ))}
        </div>
      </div>
    );
  }

  const below = isBelowThreshold(overall.rate);

  return (
    <div className="grid gap-3 md:grid-cols-2">
      <section aria-labelledby="overall-attendance-heading" className="rounded-md border border-line bg-paper p-4">
        <h2 id="overall-attendance-heading" className="text-sm font-semibold text-charcoal">
          Overall Attendance
        </h2>
        <div className="mt-3 flex items-center gap-4">
          <ProgressRing
            value={overall.rate}
            size={80}
            strokeWidth={8}
            tone={below ? "clay" : "moss"}
            label={`Overall attendance rate ${overall.rate}%`}
          >
            {overall.rate}%
          </ProgressRing>
          <dl className="grid grid-cols-1 gap-1.5 text-sm">
            <div className="flex items-center gap-2">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-moss" />
              <dt className="text-graphite-soft">Present</dt>
              <dd className="ml-auto font-medium text-charcoal">{overall.present}</dd>
            </div>
            <div className="flex items-center gap-2">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-bronze-deep" />
              <dt className="text-graphite-soft">Late</dt>
              <dd className="ml-auto font-medium text-charcoal">{overall.late}</dd>
            </div>
            <div className="flex items-center gap-2">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-clay" />
              <dt className="text-graphite-soft">Absent</dt>
              <dd className="ml-auto font-medium text-charcoal">{overall.absent}</dd>
            </div>
          </dl>
        </div>
        {below && (
          <p className="mt-3 flex items-center gap-1.5 rounded-md bg-clay/10 px-2.5 py-1.5 text-xs text-clay">
            <ShieldAlert aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
            Below 75% threshold
          </p>
        )}
      </section>

      <section aria-label="Quick stats" className="grid grid-cols-2 gap-3">
        <QuickStat icon={BookOpen} label="Total Courses" value={quickStats.totalCourses} />
        <QuickStat icon={CalendarCheck} label="Total Sessions" value={quickStats.totalSessions} />
        <QuickStat icon={Trophy} label="Courses Passed" value={quickStats.coursesPassed} />
        <QuickStat icon={ShieldAlert} label="Courses at Risk" value={quickStats.coursesAtRisk} />
      </section>
    </div>
  );
}