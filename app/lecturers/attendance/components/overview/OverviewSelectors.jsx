import Link from "next/link";
import { ChevronDown, History } from "lucide-react";
import { LEVEL_OPTIONS, SEMESTER_OPTIONS } from "@/lib/mock/attendanceUtils";

function SelectField({ id, label, value, onChange, disabled = false, className = "", children }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1 block text-xs text-graphite-soft">
        {label}
      </label>
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
    </div>
  );
}

const historyClass =
  "inline-flex h-10 items-center justify-center gap-2 rounded-md bg-bronze-deep px-4 text-sm font-medium text-white";

export default function OverviewSelectors({
  courses,
  courseId,
  level,
  semester,
  onCourseChange,
  onLevelChange,
  onSemesterChange,
  historyHref,
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 md:flex md:items-end">
      <SelectField
        id="attendance-course"
        label="Course"
        value={courseId}
        disabled={courses.length === 0}
        onChange={(event) => onCourseChange(event.target.value)}
        className="sm:col-span-2 md:w-72"
      >
        {courses.length === 0 && <option value="">No courses available</option>}
        {courses.map((course) => (
          <option key={course.id} value={course.id}>
            {course.code} — {course.title}
          </option>
        ))}
      </SelectField>

      <SelectField
        id="attendance-level"
        label="Level"
        value={level}
        onChange={(event) => onLevelChange(Number(event.target.value))}
        className="md:w-36"
      >
        {LEVEL_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option} Level
          </option>
        ))}
      </SelectField>

      <SelectField
        id="attendance-semester"
        label="Semester"
        value={semester}
        onChange={(event) => onSemesterChange(event.target.value)}
        className="md:w-40"
      >
        {SEMESTER_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </SelectField>

      <div className="sm:col-span-2 md:ml-auto">
        {historyHref ? (
          <Link
            href={historyHref}
            className={`${historyClass} w-full hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze-deep focus-visible:ring-offset-2`}
          >
            <History aria-hidden="true" className="h-4 w-4" />
            View History
          </Link>
        ) : (
          <button
            type="button"
            disabled
            title="Session history page is not built yet"
            className={`${historyClass} w-full cursor-not-allowed opacity-50`}
          >
            <History aria-hidden="true" className="h-4 w-4" />
            View History
          </button>
        )}
      </div>
    </div>
  );
}