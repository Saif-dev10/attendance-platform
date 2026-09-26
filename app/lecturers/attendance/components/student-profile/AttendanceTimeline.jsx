import { formatDateTime } from "@/lib/mock/attendanceUtils";
// import AttendanceStatusBadge from "../shared/AttendanceStatusBadge";

import AttendanceStatusBadge from "../shared/AttendanceStatusBadge";

export default function AttendanceTimeline({ events = [], loading = false }) {
  if (loading) {
    return <div aria-busy="true" className="h-40 animate-pulse rounded-md bg-cream" />;
  }

  if (events.length === 0) {
    return <p className="text-sm text-graphite-soft">No attendance events recorded yet.</p>;
  }

  return (
    <section aria-labelledby="attendance-timeline-heading" className="rounded-md border border-line bg-paper p-4">
      <h2 id="attendance-timeline-heading" className="text-sm font-semibold text-charcoal">
        Attendance Timeline
      </h2>

      <ul className="mt-3 divide-y divide-line">
        {events.map((event) => (
          <li key={event.id} className="flex items-center justify-between gap-3 py-2 text-sm">
            <div className="min-w-0">
              <p className="font-medium text-charcoal">{event.courseCode}</p>
              <p className="text-xs text-graphite-soft">{formatDateTime(event.at)}</p>
            </div>
            <AttendanceStatusBadge status={event.status} />
          </li>
        ))}
      </ul>
    </section>
  );
}