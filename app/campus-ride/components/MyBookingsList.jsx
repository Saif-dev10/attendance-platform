"use client";

import { useMemo, useState } from "react";
import BookingCard from "./BookingCard";
import { BOOKING_STATUS } from "@/lib/campus-ride/rideStatus";

const TABS = [
  { key: "upcoming", label: "Upcoming", statuses: [BOOKING_STATUS.UPCOMING] },
  { key: "active", label: "Active", statuses: [BOOKING_STATUS.ACTIVE] },
  { key: "completed", label: "Completed", statuses: [BOOKING_STATUS.COMPLETED] },
  { key: "cancelled", label: "Cancelled", statuses: [BOOKING_STATUS.CANCELLED] },
];

export default function MyBookingsList({ bookings }) {
  const [activeTab, setActiveTab] = useState("upcoming");

  const filtered = useMemo(() => {
    const tab = TABS.find((t) => t.key === activeTab);
    return bookings.filter((b) => tab.statuses.includes(b.status));
  }, [bookings, activeTab]);

  return (
    <div>
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
              activeTab === tab.key
                ? "bg-charcoal text-cream"
                : "bg-white border border-line text-graphite-soft hover:bg-paper"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-graphite-soft text-center py-10">No {activeTab} rides yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
}