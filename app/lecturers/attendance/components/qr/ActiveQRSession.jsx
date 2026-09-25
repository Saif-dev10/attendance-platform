import { Info, MapPin, RefreshCw, Users, XCircle } from "lucide-react";
import AttendanceQRCode from "../shared/AttendanceQRCode";
import { formatCountdown, formatDate, percentage } from "@/lib/mock/attendanceUtils";

export default function ActiveQRSession({
  session,
  secondsRemaining,
  refreshing,
  ending,
  onRefresh,
  onEnd,
}) {
  if (!session) {
    return (
      <section className="flex h-full min-h-[420px] items-center justify-center rounded-md border border-dashed border-line bg-paper p-6 text-center">
        <p className="max-w-xs text-sm text-graphite-soft">
          Fill in the session setup and start attendance to generate a QR code.
        </p>
      </section>
    );
  }

  const scannedPercentage = percentage(session.scannedCount, session.totalStudents);

  return (
    <section aria-labelledby="active-qr-heading" className="rounded-md border border-line bg-paper p-4">
      <div className="flex items-center justify-between gap-2">
        <h2 id="active-qr-heading" className="text-sm font-semibold text-charcoal">
          2. Active QR Session
        </h2>
        <span className="inline-flex items-center gap-1 rounded-full bg-moss/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-moss">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-moss" />
          Live
        </span>
      </div>

      <p className="mt-3 text-base font-semibold text-charcoal">
        {session.courseCode} — {session.courseTitle}
      </p>
      <p className="text-xs text-graphite-soft">
        {session.level} Level · {formatDate(session.date)} · {session.room} · {session.scheduledTime}
      </p>

      <div className="mt-4 flex justify-center">
        <AttendanceQRCode value={session.qrToken} size={180} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-center">
        <div>
          <p className="text-xl font-semibold tabular-nums text-charcoal">
            {formatCountdown(secondsRemaining)}
          </p>
          <p className="text-xs text-graphite-soft">remaining</p>
        </div>
        <div>
          <p className="text-xl font-semibold text-charcoal">{session.sessionCode}</p>
          <p className="text-xs text-graphite-soft">Session Code</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-3 text-sm">
        <div className="flex items-center gap-2">
          <MapPin aria-hidden="true" className="h-4 w-4 text-graphite-soft" />
          <div>
            <p className="text-charcoal">
              {session.geofence.enabled ? "Enabled" : "Off"}
            </p>
            <p className="text-xs text-graphite-soft">
              {session.geofence.enabled
                ? `Within ${session.geofence.radiusMeters}m radius`
                : "Location Verification"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Users aria-hidden="true" className="h-4 w-4 text-graphite-soft" />
          <div>
            <p className="text-charcoal">
              {session.scannedCount} / {session.totalStudents}
            </p>
            <p className="text-xs text-graphite-soft">Scanned · {scannedPercentage}%</p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={onRefresh}
          disabled={refreshing || ending}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-line bg-paper text-sm font-medium text-charcoal hover:bg-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze-deep disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw aria-hidden="true" className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          Refresh QR
        </button>
        <button
          type="button"
          onClick={onEnd}
          disabled={ending || refreshing}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-clay/40 bg-paper text-sm font-medium text-clay hover:bg-clay/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-clay disabled:cursor-not-allowed disabled:opacity-50"
        >
          <XCircle aria-hidden="true" className="h-4 w-4" />
          {ending ? "Ending…" : "End Session"}
        </button>
      </div>

      <p className="mt-4 flex items-start gap-2 text-xs text-graphite-soft">
        <Info aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        The QR code rotates periodically to prevent reuse.
      </p>
    </section>
  );
}