"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { AlertCircle, ArrowLeft, Download, FileText } from "lucide-react";
import AttendanceFilters from "../../components/shared/AttendanceFilters";
import AttendanceTable from "../../components/shared/AttendanceTable";
import AttentionIssues from "../../components/session-record/AttentionIssues";
import ManualCorrectionPanel from "../../components/session-record/ManualCorrectionPanel";
import SessionRecordTabs from "../../components/session-record/SessionRecordTabs";
import SessionStatistics from "../../components/session-record/SessionStatistics";
import useAttendanceRecords from "../../hooks/useAttendanceRecords";
import useSessionRecord from "../../hooks/useSessionRecord";
import { attendanceRoutes } from "@/lib/attendanceRoutes";
import { formatDate } from "@/lib/mock/attendanceUtils";
import Sidebar, { lecturerSections } from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

const secondaryButton =
  "inline-flex h-9 items-center gap-2 rounded-md border border-line bg-paper px-3 text-xs font-medium text-charcoal hover:bg-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze-deep";

export default function SessionRecordPage() {
  const { sessionId } = useParams();
  const record = useSessionRecord(sessionId);
  const table = useAttendanceRecords(record.records, { pageSize: 7 });
  const [tab, setTab] = useState("students");
  const [exceptionType, setExceptionType] = useState(null);

  // Placeholder: wire this to a real export endpoint once one exists.
  const handleExport = (format) =>
    window.alert(`Export as ${format} is not wired up yet.`);

  const getRowActions = (row) => [
    {
      label: "Correct record",
      onSelect: () => record.openCorrection(row.id),
    },
    {
      label: "View student profile",
      href: attendanceRoutes.student(row.studentId),
    },
  ];

  return (
    <div className="min-h-screen">
      <Topbar
        title="Session Record"
        subtitle="Review attendance, exceptions and session activity."
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
            <header className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h1 className="text-xl font-semibold text-charcoal">
                  Session Record
                </h1>

                {record.session && (
                  <p className="text-sm text-graphite-soft">
                    {record.session.courseCode} — {record.session.courseTitle} ·{" "}
                    {formatDate(record.session.date)} · {record.session.room}
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleExport("CSV")}
                  className={secondaryButton}
                >
                  <Download
                    aria-hidden="true"
                    className="h-3.5 w-3.5"
                  />
                  Export CSV
                </button>

                <button
                  type="button"
                  onClick={() => handleExport("PDF")}
                  className={secondaryButton}
                >
                  <FileText
                    aria-hidden="true"
                    className="h-3.5 w-3.5"
                  />
                  Export PDF
                </button>
              </div>
            </header>

            {record.error && (
              <div
                role="alert"
                className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-clay/30 bg-clay/10 px-3 py-2 text-sm text-clay"
              >
                <span className="flex items-center gap-2">
                  <AlertCircle
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0"
                  />
                  {record.error}
                </span>

                <button
                  type="button"
                  onClick={record.retry}
                  className="h-9 rounded-md border border-clay/40 px-3 font-medium hover:bg-clay/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-clay"
                >
                  Try again
                </button>
              </div>
            )}

            {!record.loading && !record.session && !record.error ? (
              <p className="rounded-md border border-line bg-paper px-4 py-10 text-center text-sm text-graphite-soft">
                This session could not be found.
              </p>
            ) : (
              <>
                <SessionStatistics
                  summary={record.summary}
                  loading={record.loading}
                />

                <div className="rounded-md border border-line bg-paper">
                  <SessionRecordTabs
                    active={tab}
                    onChange={setTab}
                    exceptionCount={record.exceptions.length}
                  />

                  {tab === "students" && (
                    <>
                      <div className="space-y-3 p-4">
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
                        loading={record.loading}
                        getRowActions={getRowActions}
                        selectedRowId={record.selectedRecord?.id}
                        pagination={table.pagination}
                        caption="All students in this session"
                      />
                    </>
                  )}

                  {tab === "exceptions" && (
                    <div className="p-4">
                      <AttentionIssues
                        exceptions={record.exceptions}
                        activeType={exceptionType}
                        onSelectType={setExceptionType}
                      />
                    </div>
                  )}

                  {tab === "details" && record.session && (
                    <dl className="grid grid-cols-2 gap-4 p-4 text-sm sm:grid-cols-3">
                      <div>
                        <dt className="text-xs text-graphite-soft">
                          Course
                        </dt>
                        <dd className="text-charcoal">
                          {record.session.courseCode} —{" "}
                          {record.session.courseTitle}
                        </dd>
                      </div>

                      <div>
                        <dt className="text-xs text-graphite-soft">
                          Room
                        </dt>
                        <dd className="text-charcoal">
                          {record.session.room}
                        </dd>
                      </div>

                      <div>
                        <dt className="text-xs text-graphite-soft">
                          Date
                        </dt>
                        <dd className="text-charcoal">
                          {formatDate(record.session.date)}
                        </dd>
                      </div>

                      <div>
                        <dt className="text-xs text-graphite-soft">
                          Time
                        </dt>
                        <dd className="text-charcoal">
                          {record.session.scheduledTime}
                        </dd>
                      </div>

                      <div>
                        <dt className="text-xs text-graphite-soft">
                          Level
                        </dt>
                        <dd className="text-charcoal">
                          {record.session.level} Level
                        </dd>
                      </div>

                      <div>
                        <dt className="text-xs text-graphite-soft">
                          Status
                        </dt>
                        <dd className="capitalize text-charcoal">
                          {record.session.status}
                        </dd>
                      </div>
                    </dl>
                  )}
                </div>
              </>
            )}

            {record.selectedRecord && (
              <ManualCorrectionPanel
                record={record.selectedRecord}
                auditEntries={record.auditEntries}
                loading={record.auditLoading}
                saving={record.saving}
                onSave={record.saveCorrection}
                onClose={record.closeCorrection}
              />
            )}
          </div>
        </div>
      </main>

      <MobileBottomNav />
    </div>
  );
}