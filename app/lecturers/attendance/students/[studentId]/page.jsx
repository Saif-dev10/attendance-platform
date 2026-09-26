"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  Download,
  FileEdit,
  ShieldAlert,
} from "lucide-react";
import StudentAvatar from "../../components/shared/StudentAvatar";
import AttendanceTimeline from "../../components/student-profile/AttendanceTimeline";
import CourseAttendanceTable from "../../components/student-profile/CourseAttendanceTable";
import StudentAttendanceSummary from "../../components/student-profile/StudentAttendanceSummary";
import StudentTrendBars from "../../components/student-profile/StudentTrendBars";
import useStudentAttendance from "../../hooks/useStudentAttendance";
import { attendanceRoutes } from "@/lib/attendanceRoutes";
import { isBelowThreshold } from "@/lib/mock/attendanceUtils";
import Sidebar, { lecturerSections } from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

// "View Full Record" and "Correct Record" don't have destinations in the approved
// structure yet, so they're disabled rather than pointing somewhere made up.
const actionButtonClass =
  "flex h-10 w-full items-center gap-2 rounded-md border border-line bg-paper px-3 text-sm font-medium text-charcoal hover:bg-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze-deep disabled:cursor-not-allowed disabled:opacity-50";

export default function StudentProfilePage() {
  const { studentId } = useParams();
  const profile = useStudentAttendance(studentId);
  const below = profile.overall
    ? isBelowThreshold(profile.overall.rate)
    : false;

  const handleExport = () =>
    window.alert("Export student record is not wired up yet.");

  return (
    <div className="min-h-screen">
      <Topbar
        title="Student Profile"
        subtitle="View attendance history and student records."
        leading={
          <Link
            href={attendanceRoutes.overview}
            aria-label="Back to Attendance Management"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-paper text-graphite transition-colors hover:bg-cream hover:text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze-deep/40 sm:h-10 sm:w-10"
          >
            <ArrowLeft size={18} strokeWidth={2} aria-hidden="true" />
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
            {profile.loading ? (
              <div
                aria-busy="true"
                className="h-12 flex-1 animate-pulse rounded-md bg-cream"
              />
            ) : profile.student ? (
              <div className="flex flex-1 flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <StudentAvatar
                    name={profile.student.name}
                    size="lg"
                  />

                  <div>
                    <h1 className="text-lg font-semibold text-charcoal">
                      {profile.student.name}
                    </h1>

                    <p className="text-xs text-graphite-soft">
                      {profile.student.matricNumber} ·{" "}
                      {profile.student.level} Level ·{" "}
                      {profile.student.programme}
                    </p>
                  </div>
                </div>

                {below && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-clay/10 px-2.5 py-1 text-xs font-medium text-clay">
                    <ShieldAlert
                      aria-hidden="true"
                      className="h-3.5 w-3.5"
                    />
                    Below 75% Threshold
                  </span>
                )}
              </div>
            ) : (
              <h1 className="text-lg font-semibold text-charcoal">
                Student Profile
              </h1>
            )}

            {profile.error && (
              <div
                role="alert"
                className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-clay/30 bg-clay/10 px-3 py-2 text-sm text-clay"
              >
                <span className="flex items-center gap-2">
                  <AlertCircle
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0"
                  />
                  {profile.error}
                </span>

                <button
                  type="button"
                  onClick={profile.retry}
                  className="h-9 rounded-md border border-clay/40 px-3 font-medium hover:bg-clay/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-clay"
                >
                  Try again
                </button>
              </div>
            )}

            {!profile.loading &&
            !profile.student &&
            !profile.error ? (
              <p className="rounded-md border border-line bg-paper px-4 py-10 text-center text-sm text-graphite-soft">
                This student could not be found.
              </p>
            ) : (
              <div className="grid gap-4 xl:grid-cols-[1fr_280px]">
                <div className="space-y-4">
                  <StudentAttendanceSummary
                    overall={profile.overall}
                    quickStats={profile.quickStats}
                    loading={profile.loading}
                  />

                  <CourseAttendanceTable
                    courses={profile.courses}
                    loading={profile.loading}
                  />

                  <div className="grid gap-4 lg:grid-cols-2">
                    <StudentTrendBars
                      data={profile.trend}
                      loading={profile.loading}
                    />

                    <AttendanceTimeline
                      events={profile.timeline}
                      loading={profile.loading}
                    />
                  </div>
                </div>

                <aside
                  aria-label="Actions"
                  className="space-y-2"
                >
                  <button
                    type="button"
                    disabled
                    title="Not built yet"
                    className={actionButtonClass}
                  >
                    <FileEdit
                      aria-hidden="true"
                      className="h-4 w-4"
                    />
                    View Full Record
                  </button>

                  <button
                    type="button"
                    disabled
                    title="Not built yet"
                    className={actionButtonClass}
                  >
                    <FileEdit
                      aria-hidden="true"
                      className="h-4 w-4"
                    />
                    Correct Record
                  </button>

                  <button
                    type="button"
                    onClick={handleExport}
                    className={actionButtonClass}
                  >
                    <Download
                      aria-hidden="true"
                      className="h-4 w-4"
                    />
                    Export Student Record
                  </button>

                  <p className="px-1 pt-1 text-xs text-graphite-soft">
                    All manual changes are logged and auditable.
                  </p>
                </aside>
              </div>
            )}
          </div>
        </div>
      </main>

      <MobileBottomNav />
    </div>
  );
}