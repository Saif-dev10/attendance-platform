"use client";

import Link from "next/link";
import { useState } from "react";
import { CalendarDays, Clock, MapPin, QrCode } from "lucide-react";
import { attendanceRoutes } from "@/lib/attendanceRoutes";
import { formatDate } from "@/lib/mock/attendanceUtils";
import { ProgressBar } from "../shared/AttendanceProgress";

const primaryButton =
  "inline-flex h-10 items-center justify-center gap-2 rounded-md bg-bronze-deep px-3 text-sm font-medium text-white hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze-deep focus-visible:ring-offset-2";
const secondaryButton =
  "inline-flex h-10 items-center justify-center rounded-md border border-line bg-paper px-3 text-sm font-medium text-charcoal hover:bg-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze-deep disabled:cursor-not-allowed disabled:opacity-50";

export default function ActiveSessionCard({
  session,
  summary,
  loading = false,
  ending = false,
  error = "",
  onEnd,
}) {
  const [confirming, setConfirming] = useState(false);

  if (loading) {
    return (
      <div
        aria-busy="true"
        className="h-56 animate-pulse rounded-md border border-line bg-paper"
      />
    );
  }

  const isActive = session?.status === "active";

  // Ending is hard to undo, so ask once before calling the service.
  const handleConfirmEnd = async () => {
    await onEnd();
    setConfirming(false);
  };

  return (
    <section
      aria-labelledby="active-session-heading"
      className="rounded-md border border-line bg-paper p-4"
    >
      <div className="flex items-center gap-2">
        <h2 id="active-session-heading" className="text-sm font-semibold text-charcoal">
          Active Session
        </h2>
        {isActive && (
          <span className="inline-flex items-center gap-1 rounded-full bg-moss/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-moss">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-moss" />
            Live
          </span>
        )}
      </div>

      {!session && (
        <div className="mt-3 space-y-3">
          <p className="text-sm text-graphite-soft">No attendance session has been run for this course yet.</p>
          <Link href={attendanceRoutes.qr} className={primaryButton}>
            Start Attendance
          </Link>
        </div>
      )}

      {session && !isActive && (
        <div className="mt-3 space-y-3">
          <p className="text-sm text-graphite-soft">
            The latest session for {session.courseCode} has ended. Start a new one to take attendance.
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Link href={attendanceRoutes.qr} className={primaryButton}>
              Start Attendance
            </Link>
            <Link href={attendanceRoutes.session(session.id)} className={secondaryButton}>
              View Record
            </Link>
          </div>
        </div>
      )}

      {isActive && (
        <>
          <p className="mt-3 text-base font-semibold text-charcoal">
            {session.courseCode} — {session.courseTitle}
          </p>

          <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-graphite">
            <li className="flex items-center gap-1">
              <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
              <span className="sr-only">Room:</span>
              {session.room}
            </li>
            <li className="flex items-center gap-1">
              <Clock aria-hidden="true" className="h-3.5 w-3.5" />
              <span className="sr-only">Time:</span>
              {session.scheduledTime}
            </li>
            <li className="flex items-center gap-1">
              <CalendarDays aria-hidden="true" className="h-3.5 w-3.5" />
              <span className="sr-only">Date:</span>
              {formatDate(session.date)}
            </li>
          </ul>

          {summary && (
            <>
              <div className="mt-4 flex items-end gap-8">
                <div>
                  <p className="text-2xl font-semibold text-charcoal">
                    {summary.present}
                    <span className="text-base font-normal text-graphite-soft"> / {summary.total}</span>
                  </p>
                  <p className="text-xs text-graphite-soft">Present</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-charcoal">{Math.round(summary.rate)}%</p>
                  <p className="text-xs text-graphite-soft">Attendance Rate</p>
                </div>
              </div>
              <div className="mt-3">
                <ProgressBar value={summary.rate} label="Attendance rate for this session" />
              </div>
            </>
          )}

          {error && (
            <p role="alert" className="mt-3 text-xs text-clay">
              {error}
            </p>
          )}

          <div className="mt-4" aria-live="polite">
            {confirming ? (
              <div className="rounded-md border border-line bg-cream p-3">
                <p className="text-sm text-charcoal">
                  End attendance for this session? Students will no longer be able to check in.
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleConfirmEnd}
                    disabled={ending}
                    className="inline-flex h-10 items-center justify-center rounded-md bg-clay px-3 text-sm font-medium text-white hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2 disabled:opacity-60"
                  >
                    {ending ? "Ending…" : "Yes, end it"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirming(false)}
                    disabled={ending}
                    className={secondaryButton}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link href={attendanceRoutes.qr} className={primaryButton}>
                  <QrCode aria-hidden="true" className="h-4 w-4" />
                  Show QR Code
                </Link>
                <button type="button" onClick={() => setConfirming(true)} className={secondaryButton}>
                  End Attendance
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}