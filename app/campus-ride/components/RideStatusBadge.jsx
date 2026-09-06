import { getBookingStatusConfig } from "@/lib/campus-ride/rideStatus";

export default function RideStatusBadge({ status }) {
  const config = getBookingStatusConfig(status);
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${config.badgeClass}`}
    >
      {config.label}
    </span>
  );
}