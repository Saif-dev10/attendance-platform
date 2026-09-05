"use client";

import { Bus, Clock } from "lucide-react";
import { getShuttleStatusConfig, SHUTTLE_STATUS } from "@/lib/campus-ride/rideStatus";
import { useCampusRide } from "@/lib/campus-ride/CampusRideContext";

export default function ShuttleCard({ shuttle }) {
  const { openBookingPanel } = useCampusRide();
  const config = getShuttleStatusConfig(shuttle.status);
  const isArriving = shuttle.status === SHUTTLE_STATUS.ARRIVING;

  const etaLabel =
    shuttle.status === SHUTTLE_STATUS.OFFLINE
      ? "Not currently operating"
      : shuttle.status === SHUTTLE_STATUS.FULL
      ? `Full • ${shuttle.etaMinutes} min away`
      : shuttle.status === SHUTTLE_STATUS.DELAYED
      ? `Delayed • ${shuttle.etaMinutes} min away`
      : isArriving
      ? `Arriving in ${shuttle.etaMinutes} min`
      : `${shuttle.etaMinutes} min away`;

  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-xl border p-4 transition-colors ${
        isArriving ? "border-green-200 bg-green-50/60" : "border-line bg-white"
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
            isArriving ? "bg-green-600" : "bg-charcoal"
          }`}
        >
          <Bus size={18} className="text-white" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-charcoal truncate">{shuttle.name}</p>
          <p className="text-xs font-semibold flex items-center gap-1 text-graphite-soft">
            <Clock size={12} />
            {etaLabel.toUpperCase()}
          </p>
        </div>
      </div>

      <button
        type="button"
        disabled={!config.bookable}
        onClick={() => openBookingPanel(shuttle)}
        className={`shrink-0 rounded-lg px-4 py-2 text-xs font-bold tracking-wide transition-colors ${
          config.bookable
            ? "bg-charcoal text-cream hover:bg-charcoal/90"
            : "bg-line text-graphite-soft cursor-not-allowed"
        }`}
      >
        {config.bookable ? "BOOK" : config.label.toUpperCase()}
      </button>
    </div>
  );
}