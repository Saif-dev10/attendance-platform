"use client";

import { Plus, Minus, Navigation, MapPin } from "lucide-react";
import { SHUTTLE_STATUS } from "@/lib/campus-ride/rideStatus";
import { studentLocation } from "@/lib/campus-ride/data";

const LEGEND = [
  { label: "Active", dotClass: "bg-green-500" },
  { label: "Scheduled", dotClass: "bg-blue-500" },
  { label: "Stationary", dotClass: "bg-graphite-soft" },
];

function shuttleDotClass(status) {
  switch (status) {
    case SHUTTLE_STATUS.ARRIVING:
      return "bg-green-500";
    case SHUTTLE_STATUS.AWAY:
    case SHUTTLE_STATUS.DELAYED:
      return "bg-blue-500";
    case SHUTTLE_STATUS.FULL:
      return "bg-amber-500";
    default:
      return "bg-graphite-soft";
  }
}

export default function CampusMap({ shuttles }) {
  return (
    <div className="relative h-[360px] lg:h-full min-h-[360px] w-full overflow-hidden rounded-xl border border-line bg-[#dfe3e8]">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(#c7cdd6 1px, transparent 1px), linear-gradient(90deg, #c7cdd6 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div
        className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
        style={{ top: studentLocation.top, left: studentLocation.left }}
      >
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 ring-4 ring-blue-200" />
      </div>

      {shuttles
        .filter((s) => s.status !== SHUTTLE_STATUS.OFFLINE)
        .map((shuttle) => (
          <div
            key={shuttle.id}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ top: shuttle.position.top, left: shuttle.position.left }}
            title={shuttle.name}
          >
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-white shadow-md ${shuttleDotClass(
                shuttle.status
              )}`}
            >
              <MapPin size={15} className="text-white" fill="white" />
            </span>
          </div>
        ))}

      <div className="absolute left-4 top-4 z-20 flex flex-col gap-2">
        <button
          type="button"
          aria-label="Zoom in"
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-charcoal shadow-sm hover:bg-paper"
        >
          <Plus size={16} />
        </button>
        <button
          type="button"
          aria-label="Zoom out"
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-charcoal shadow-sm hover:bg-paper"
        >
          <Minus size={16} />
        </button>
        <button
          type="button"
          aria-label="Recenter on my location"
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-bronze-deep shadow-sm hover:bg-paper"
        >
          <Navigation size={16} />
        </button>
      </div>

      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-4 rounded-full bg-white/95 px-4 py-2 shadow-sm">
        {LEGEND.map((item) => (
          <span
            key={item.label}
            className="flex items-center gap-1.5 text-[11px] font-bold text-graphite uppercase"
          >
            <span className={`h-2 w-2 rounded-full ${item.dotClass}`} />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}