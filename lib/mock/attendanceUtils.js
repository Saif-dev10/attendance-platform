// Shared constants and small helpers for the attendance screens.

// Students under this rate get flagged. Confirm the real policy with the backend/registry.
export const ATTENDANCE_THRESHOLD = 75;

export const STATUS = {
  PRESENT: "present",
  LATE: "late",
  ABSENT: "absent",
  PENDING: "pending",
};

export const STATUS_LABELS = {
  [STATUS.PRESENT]: "Present",
  [STATUS.LATE]: "Late",
  [STATUS.ABSENT]: "Absent",
  [STATUS.PENDING]: "Pending",
};

export const EXCEPTION_LABELS = {
  failed_scan: "Failed Scans",
  duplicate_scan: "Duplicate Scans",
  outside_geofence: "Outside Geofence",
  manual_change: "Manually Changed",
};

export const LEVEL_OPTIONS = [100, 200, 300, 400];
export const SEMESTER_OPTIONS = ["1st Semester", "2nd Semester"];

// Minutes on either side of the scheduled start when scans are accepted.
export const ATTENDANCE_WINDOW_OPTIONS = [
  { value: 5, label: "5 minutes before – 5 minutes after" },
  { value: 10, label: "10 minutes before – 10 minutes after" },
  { value: 15, label: "15 minutes before – 15 minutes after" },
];

export const GEOFENCE_RADIUS_OPTIONS = [50, 100, 200, 300];

export const ATTENDANCE_METHODS = [
  { value: "qr_location", label: "QR Code + Location", hint: "Recommended" },
  { value: "qr_only", label: "QR Code Only", hint: "" },
];

export function percentage(part, total, digits = 1) {
  if (!total) return 0;
  return Number(((part / total) * 100).toFixed(digits));
}

export function isBelowThreshold(rate) {
  return rate < ATTENDANCE_THRESHOLD;
}

export function countByStatus(records) {
  const counts = { present: 0, late: 0, absent: 0, pending: 0 };
  records.forEach((record) => {
    if (counts[record.status] !== undefined) counts[record.status] += 1;
  });
  return counts;
}

export function countByType(items) {
  return items.reduce((counts, item) => {
    counts[item.type] = (counts[item.type] ?? 0) + 1;
    return counts;
  }, {});
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Dates are split by hand on purpose: new Date("2026-09-20") is parsed as UTC
// and can show the previous day depending on the viewer's timezone.
export function formatDate(isoDate) {
  if (!isoDate) return "—";
  const [year, month, day] = isoDate.slice(0, 10).split("-").map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
}

export function formatTime(isoDateTime) {
  if (!isoDateTime) return "—";
  const [hours, minutes] = isoDateTime.slice(11, 16).split(":").map(Number);
  const suffix = hours >= 12 ? "PM" : "AM";
  const hour12 = String(hours % 12 || 12).padStart(2, "0");
  return `${hour12}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

export function formatDateTime(isoDateTime) {
  if (!isoDateTime) return "—";
  return `${formatDate(isoDateTime)}, ${formatTime(isoDateTime)}`;
}

export function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

export function formatCountdown(totalSeconds) {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const minutes = String(Math.floor(safe / 60)).padStart(2, "0");
  const seconds = String(safe % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}