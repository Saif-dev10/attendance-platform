"use client";

import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  Clock,
  TrendingDown,
  TrendingUp,
  UserCheck,
  UserX,
  Users,
} from "lucide-react";

import AttendanceFilters from "./components/shared/AttendanceFilters";
import { ProgressRing } from "./components/shared/AttendanceProgress";
import AttendanceStatCard from "./components/shared/AttendanceStatCard";
import AttendanceTable from "./components/shared/AttendanceTable";
import ActiveSessionCard from "./components/overview/ActiveSessionCard";
import AttendanceTrendLine from "./components/overview/AttendanceTrendLine";
import OverviewSelectors from "./components/overview/OverviewSelectors";
import TeachingSummary from "./components/overview/TeachingSummary";
import useAttendanceOverview from "./hooks/useAttendanceOverview";
import useAttendanceRecords from "./hooks/useAttendanceRecords";
import { attendanceRoutes } from "@/lib/attendanceRoutes";
import { percentage } from "@/lib/mock/attendanceUtils";
import Sidebar, { lecturerSections } from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

// These two pages aren't built yet, so the buttons that would use them stay inert.
// Put the real routes here when they exist.
const HISTORY_HREF = attendanceRoutes.history;
const BELOW_THRESHOLD_HREF = null;

export default function AttendanceOverviewPage() {
  const overview = useAttendanceOverview();
  const table = useAttendanceRecords(overview.records, { pageSize: 5 });

  const { summary, session, loading } = overview;
  const noCourses = !loading && !overview.error && !overview.courseId;
  const isActive = session?.status === "active";

  // Show a dash instead of zero when there is no session to count.
  const stat = (value) => (summary ? value : "—");
  const share = (value) =>
    summary ? `${percentage(value, summary.total)}%` : undefined;

  const getRowActions = (row) => [
    {
      label: "View student profile",
      href: attendanceRoutes.student(row.studentId),
    },
    {
      label: "Open session record",
      href: attendanceRoutes.session(session.id),
    },
  ];

  return (
    <div className="min-h-screen">
      <Topbar
        title="Attendance Management"
        subtitle="Track sessions, participation and student records."
        leading={
          <Link
            href="/lecturers"
            aria-label="Back to lecturer dashboard"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-paper text-graphite transition-colors hover:bg-cream hover:text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze-deep/40 sm:h-10 sm:w-10"
          >
            <ArrowLeft
              size={18}
              strokeWidth={2}
              aria-hidden="true"
            />
          </Link>
        }
      />

      <Sidebar
        sections={lecturerSections}
        dashboardHref="/lecturers"
        user={{
          name: "Dr. Ibrahim",
          role: "Lecturer",
          avatar: "/avatar-placeholder.svg",
        }}
      />

      <main className="ml-0 pt-20 pb-18 md:ml-[280px]">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <section
              aria-label="Attendance filters"
              className="rounded-xl border border-line bg-paper p-4 shadow-sm"
            >
              <div className="mb-3">
                <p className="text-sm font-semibold text-charcoal">
                  Attendance scope
                </p>

                <p className="mt-0.5 text-xs text-graphite-soft">
                  Select the course and academic period you want to review.
                </p>
              </div>

              <OverviewSelectors
                courses={overview.courses}
                courseId={overview.courseId}
                level={overview.level}
                semester={overview.semester}
                onCourseChange={overview.selectCourse}
                onLevelChange={overview.changeLevel}
                onSemesterChange={overview.changeSemester}
                historyHref={HISTORY_HREF}
              />
            </section>

            {overview.error && (
              <div
                role="alert"
                className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-clay/30 bg-clay/10 px-3 py-2 text-sm text-clay"
              >
                <span className="flex items-center gap-2">
                  <AlertCircle
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0"
                  />

                  {overview.error}
                </span>

                <button
                  type="button"
                  onClick={overview.retry}
                  className="h-9 rounded-md border border-clay/40 px-3 font-medium hover:bg-clay/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-clay"
                >
                  Try again
                </button>
              </div>
            )}

            {noCourses ? (
              <p className="rounded-md border border-line bg-paper px-4 py-10 text-center text-sm text-graphite-soft">
                No courses found for this level and semester.
              </p>
            ) : (
              <>
                <section
                  aria-label="Attendance summary"
                  className="grid grid-cols-2 gap-3 lg:grid-cols-5"
                >
                  <AttendanceStatCard
                    icon={Users}
                    label="Total Students"
                    value={stat(summary?.total)}
                    subtext="Enrolled"
                    loading={loading}
                  />

                  <AttendanceStatCard
                    icon={UserCheck}
                    label="Present"
                    value={stat(summary?.present)}
                    subtext={share(summary?.present)}
                    tone="present"
                    loading={loading}
                  />

                  <AttendanceStatCard
                    icon={Clock}
                    label="Late"
                    value={stat(summary?.late)}
                    subtext={share(summary?.late)}
                    tone="late"
                    loading={loading}
                  />

                  <AttendanceStatCard
                    icon={UserX}
                    label="Absent"
                    value={stat(summary?.absent)}
                    subtext={share(summary?.absent)}
                    tone="absent"
                    loading={loading}
                  />

                  <div className="col-span-2 lg:col-span-1">
                    <RateCard
                      summary={summary}
                      loading={loading}
                    />
                  </div>
                </section>

                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[1.25fr_1fr_0.8fr]">
                  <div className="md:col-span-2 xl:col-span-1">
                    <ActiveSessionCard
                      session={session}
                      summary={summary}
                      loading={loading}
                      ending={overview.ending}
                      error={overview.actionError}
                      onEnd={overview.endCurrentSession}
                    />
                  </div>

                  <AttendanceTrendLine
                    data={overview.trend}
                    loading={loading}
                  />

                  <TeachingSummary
                    teaching={overview.teaching}
                    loading={loading}
                    belowThresholdHref={BELOW_THRESHOLD_HREF}
                  />
                </div>

                <section
                  aria-labelledby="live-attendance-heading"
                  className="rounded-md border border-line bg-paper"
                >
                  <div className="space-y-3 p-4">
                    <h2
                      id="live-attendance-heading"
                      className="text-sm font-semibold text-charcoal"
                    >
                      {isActive
                        ? "Live Attendance"
                        : "Attendance Records"}
                    </h2>

                    <AttendanceFilters
                      search={table.search}
                      onSearchChange={table.setSearch}
                      statusFilter={table.statusFilter}
                      onStatusChange={table.setStatusFilter}
                      counts={table.counts}
                    />
                  </div>

                  <AttendanceTable
                    rows={table.rows}
                    loading={loading}
                    showIndex
                    startIndex={table.startIndex}
                    getRowActions={
                      session ? getRowActions : undefined
                    }
                    pagination={table.pagination}
                    caption="Students in the current session"
                    emptyMessage={
                      overview.records.length === 0
                        ? "No attendance records for this session yet."
                        : "No students match the current filters."
                    }
                  />
                </section>
              </>
            )}
          </div>
        </div>
      </main>

      <MobileBottomNav active="academic" />
    </div>
  );
}

// Only used on this page, so it stays here instead of getting its own file.
function RateCard({ summary, loading }) {
  if (loading) {
    return (
      <div
        aria-busy="true"
        className="h-[76px] animate-pulse rounded-md border border-line bg-paper"
      />
    );
  }

  const rate = summary?.rate;
  const change = summary?.rateChange;

  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-line bg-paper p-3">
      <div className="min-w-0">
        <p className="text-xs text-graphite-soft">
          Attendance Rate
        </p>

        {change != null && (
          <p
            className={`mt-1 flex flex-wrap items-center gap-1 text-xs font-medium ${
              change >= 0 ? "text-moss" : "text-clay"
            }`}
          >
            {change >= 0 ? (
              <TrendingUp
                aria-hidden="true"
                className="h-3.5 w-3.5"
              />
            ) : (
              <TrendingDown
                aria-hidden="true"
                className="h-3.5 w-3.5"
              />
            )}

            {Math.abs(change)}%

            <span className="font-normal text-graphite-soft">
              vs last session
            </span>
          </p>
        )}
      </div>

      {rate != null ? (
        <ProgressRing
          value={rate}
          size={64}
          strokeWidth={6}
          label={`Attendance rate ${rate}%`}
        >
          {rate}%
        </ProgressRing>
      ) : (
        <span className="text-xl font-semibold text-charcoal">
          —
        </span>
      )}
    </div>
  );
}