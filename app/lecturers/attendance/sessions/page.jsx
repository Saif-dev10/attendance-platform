"use client";

import Link from "next/link";
import { AlertCircle, ArrowLeft, ChevronDown, ChevronRight } from "lucide-react";
import useSessionHistory from "../hooks/useSessionHistory";
import { attendanceRoutes } from "@/lib/attendanceRoutes";
import { formatDate } from "@/lib/mock/attendanceUtils";

export default function SessionHistoryPage() {
  const history = useSessionHistory();

  return (
    <div className="space-y-4">
      <header className="flex items-start gap-3">
        <Link
          href={attendanceRoutes.overview}
          aria-label="Back to Attendance overview"
          className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-md text-graphite hover:bg-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze-deep"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-xl font-semibold text-charcoal">Session History</h1>
          <p className="text-sm text-graphite-soft">Past attendance sessions for this course.</p>
        </div>
      </header>

      {history.courses.length > 0 && (
        <div className="max-w-xs">
          <label htmlFor="history-course" className="mb-1 block text-xs text-graphite-soft">
            Course
          </label>
          <div className="relative">
            <select
              id="history-course"
              value={history.courseId}
              onChange={(event) => history.setCourseId(event.target.value)}
              className="h-10 w-full appearance-none rounded-md border border-line bg-paper pl-3 pr-8 text-sm text-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze-deep"
            >
              {history.courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.code} — {course.title}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-graphite-soft"
            />
          </div>
        </div>
      )}

      {history.error && (
        <div
          role="alert"
          className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-clay/30 bg-clay/10 px-3 py-2 text-sm text-clay"
        >
          <span className="flex items-center gap-2">
            <AlertCircle aria-hidden="true" className="h-4 w-4 shrink-0" />
            {history.error}
          </span>
          <button
            type="button"
            onClick={history.retry}
            className="h-9 rounded-md border border-clay/40 px-3 font-medium hover:bg-clay/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-clay"
          >
            Try again
          </button>
        </div>
      )}

      <section className="rounded-md border border-line bg-paper">
        {history.loading ? (
          <div aria-busy="true" className="space-y-2 p-3">
            {[0, 1, 2].map((key) => (
              <div key={key} className="h-14 animate-pulse rounded-md bg-cream" />
            ))}
          </div>
        ) : history.sessions.length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-graphite-soft">
            No sessions have been run for this course yet.
          </p>
        ) : (
          <ul className="divide-y divide-line">
            {history.sessions.map((session) => (
              <li key={session.id}>
                <Link
                  href={attendanceRoutes.session(session.id)}
                  className="flex items-center justify-between gap-3 p-4 hover:bg-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze-deep focus-visible:ring-inset"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-charcoal">
                      {formatDate(session.date)}
                      <span className="ml-2 text-xs font-normal text-graphite-soft">
                        {session.room} · {session.scheduledTime}
                      </span>
                    </p>
                    {session.summary && (
                      <p className="mt-0.5 text-xs text-graphite-soft">
                        {session.summary.present} present · {session.summary.late} late ·{" "}
                        {session.summary.absent} absent · {session.summary.rate}% rate
                      </p>
                    )}
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                      session.status === "active" ? "bg-moss/10 text-moss" : "bg-line text-graphite-soft"
                    }`}
                  >
                    {session.status}
                  </span>
                  <ChevronRight aria-hidden="true" className="h-4 w-4 shrink-0 text-graphite-soft" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
