import { ChevronDown } from "lucide-react";
import {
  ATTENDANCE_METHODS,
  ATTENDANCE_WINDOW_OPTIONS,
  GEOFENCE_RADIUS_OPTIONS,
  LEVEL_OPTIONS,
} from "@/lib/mock/attendanceUtils";

function Field({ id, label, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-xs text-graphite-soft">
        {label}
      </label>
      {children}
    </div>
  );
}

function Select({ id, value, onChange, children, disabled = false }) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        disabled={disabled}
        onChange={onChange}
        className="h-10 w-full appearance-none rounded-md border border-line bg-paper pl-3 pr-8 text-sm text-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze-deep disabled:opacity-60"
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-graphite-soft"
      />
    </div>
  );
}

// A pure form: it reports the setup object upward and never talks to the service itself.
// useQRSession owns the async "Start Attendance" call.
export default function QRSessionSetup({ courses, setup, onChange, onStart, starting, error }) {
  const update = (patch) => onChange({ ...setup, ...patch });
  const disabled = !setup.courseId || starting;

  return (
    <section aria-labelledby="session-setup-heading" className="rounded-md border border-line bg-paper p-4">
      <h2 id="session-setup-heading" className="text-sm font-semibold text-charcoal">
        1. Session Setup
      </h2>

      <form
        className="mt-4 space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          onStart();
        }}
      >
        <Field id="qr-course" label="Course">
          <Select id="qr-course" value={setup.courseId} onChange={(e) => update({ courseId: e.target.value })}>
            {courses.length === 0 && <option value="">No courses available</option>}
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.code} — {course.title}
              </option>
            ))}
          </Select>
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field id="qr-level" label="Level">
            <Select id="qr-level" value={setup.level} onChange={(e) => update({ level: Number(e.target.value) })}>
              {LEVEL_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option} Level
                </option>
              ))}
            </Select>
          </Field>

          <Field id="qr-date" label="Date">
            <input
              id="qr-date"
              type="date"
              value={setup.date}
              onChange={(e) => update({ date: e.target.value })}
              className="h-10 w-full rounded-md border border-line bg-paper px-3 text-sm text-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze-deep"
            />
          </Field>
        </div>

        <Field id="qr-room" label="Room">
          <input
            id="qr-room"
            type="text"
            value={setup.room}
            onChange={(e) => update({ room: e.target.value })}
            placeholder="e.g. LT 3"
            className="h-10 w-full rounded-md border border-line bg-paper px-3 text-sm text-charcoal placeholder:text-graphite-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze-deep"
          />
        </Field>

        <Field id="qr-time" label="Scheduled Time">
          <input
            id="qr-time"
            type="text"
            value={setup.scheduledTime}
            onChange={(e) => update({ scheduledTime: e.target.value })}
            placeholder="e.g. 10:00 AM – 12:00 PM"
            className="h-10 w-full rounded-md border border-line bg-paper px-3 text-sm text-charcoal placeholder:text-graphite-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze-deep"
          />
        </Field>

        <Field id="qr-window" label="Check-in Time">
          <Select
            id="qr-window"
            value={setup.attendanceWindow}
            onChange={(e) => update({ attendanceWindow: Number(e.target.value) })}
          >
            {ATTENDANCE_WINDOW_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Field>

        <div className="flex items-center justify-between">
          <label htmlFor="qr-geofence-toggle" className="text-xs text-graphite-soft">
            Campus Geofence (Optional)
          </label>

          <button
            id="qr-geofence-toggle"
            type="button"
            role="switch"
            aria-checked={setup.geofenceEnabled}
            onClick={() => update({ geofenceEnabled: !setup.geofenceEnabled })}
            className={`relative h-6 w-11 shrink-0 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze-deep focus-visible:ring-offset-2 ${
              setup.geofenceEnabled ? "bg-moss" : "bg-line"
            }`}
          >
            <span
              aria-hidden="true"
              className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                setup.geofenceEnabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {setup.geofenceEnabled && (
          <Field id="qr-radius" label="Radius">
            <Select
              id="qr-radius"
              value={setup.geofenceRadius}
              onChange={(e) => update({ geofenceRadius: Number(e.target.value) })}
            >
              {GEOFENCE_RADIUS_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option} meters
                </option>
              ))}
            </Select>
          </Field>
        )}

        <fieldset>
          <legend className="mb-1 text-xs text-graphite-soft">Attendance Method</legend>
          <div className="space-y-2">
            {ATTENDANCE_METHODS.map((method) => (
              <label
                key={method.value}
                className="flex cursor-pointer items-center gap-2 rounded-md border border-line px-3 py-2 text-sm text-charcoal has-[:checked]:border-bronze-deep has-[:checked]:bg-bronze-deep/5"
              >
                <input
                  type="radio"
                  name="attendance-method"
                  value={method.value}
                  checked={setup.method === method.value}
                  onChange={() => update({ method: method.value })}
                  className="h-4 w-4 accent-bronze-deep"
                />
                {method.label}
                {method.hint && (
                  <span className="ml-auto text-xs text-graphite-soft">{method.hint}</span>
                )}
              </label>
            ))}
          </div>
        </fieldset>

        {error && (
          <p role="alert" className="text-xs text-clay">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={disabled}
          className="h-11 w-full rounded-md bg-bronze-deep text-sm font-medium text-white hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze-deep focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {starting ? "Starting…" : "Start Attendance"}
        </button>
      </form>
    </section>
  );
}