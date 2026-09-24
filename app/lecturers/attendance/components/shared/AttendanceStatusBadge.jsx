import { CheckCircle2, Clock, Hourglass, XCircle } from "lucide-react";
import { STATUS, STATUS_LABELS } from "@/lib/mock/attendanceUtils";

// Every badge has an icon and a text label, so status never depends on color alone.
const STATUS_STYLES = {
  [STATUS.PRESENT]: { icon: CheckCircle2, className: "bg-moss/10 text-moss" },
  [STATUS.LATE]: { icon: Clock, className: "bg-bronze-deep/10 text-bronze-deep" },
  [STATUS.ABSENT]: { icon: XCircle, className: "bg-clay/10 text-clay" },
  [STATUS.PENDING]: { icon: Hourglass, className: "bg-amber-100 text-amber-800" },
};

export default function AttendanceStatusBadge({ status }) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES[STATUS.PENDING];
  const Icon = style.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${style.className}`}
    >
      <Icon aria-hidden="true" className="h-3 w-3" />
      {STATUS_LABELS[status] ?? "Unknown"}
    </span>
  );
}