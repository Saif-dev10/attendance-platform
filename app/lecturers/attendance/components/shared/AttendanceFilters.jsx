import { Search } from "lucide-react";
import { STATUS } from "@/lib/mock/attendanceUtils";

const CHIPS = [
  { value: "all", label: "All" },
  { value: STATUS.PRESENT, label: "Present" },
  { value: STATUS.LATE, label: "Late" },
  { value: STATUS.ABSENT, label: "Absent" },
];

// Search box plus status chips. It only reports what the user picked;
// the actual filtering lives in useAttendanceRecords.
export default function AttendanceFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  counts,
  searchId = "attendance-search",
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative sm:max-w-xs sm:flex-1">
        <label htmlFor={searchId} className="sr-only">
          Search by name or matric number
        </label>
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-graphite-soft"
        />
        <input
          id={searchId}
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by name or matric number..."
          className="h-10 w-full rounded-md border border-line bg-paper pl-9 pr-3 text-sm text-charcoal placeholder:text-graphite-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze-deep"
        />
      </div>

      <div role="group" aria-label="Filter by status" className="flex flex-wrap gap-1.5">
        {CHIPS.map((chip) => {
          const active = statusFilter === chip.value;
          const count = counts?.[chip.value];

          return (
            <button
              key={chip.value}
              type="button"
              aria-pressed={active}
              onClick={() => onStatusChange(chip.value)}
              className={`h-9 rounded-md border px-3 text-xs font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze-deep ${
                active
                  ? "border-bronze-deep bg-bronze-deep text-white"
                  : "border-line bg-paper text-graphite hover:bg-cream"
              }`}
            >
              {chip.label}
              {count !== undefined && ` (${count})`}
            </button>
          );
        })}
      </div>
    </div>
  );
}