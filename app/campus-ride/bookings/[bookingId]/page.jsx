"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useCampusRide } from "@/lib/campus-ride/CampusRideContext";
import ActiveRideTracker from "../../components/ActiveRideTracker";
import RideStatusBadge from "../../components/RideStatusBadge";
import { BOOKING_STATUS } from "@/lib/campus-ride/rideStatus";

function Row({ label, value }) {
  return (
    <div className="flex justify-between text-sm border-b border-line pb-3 last:border-0 last:pb-0">
      <span className="text-graphite-soft">{label}</span>
      <span className="font-semibold text-charcoal">{value}</span>
    </div>
  );
}

export default function BookingDetailPage({ params }) {
  const { getBookingById } = useCampusRide();
  const { bookingId } = use(params);
  const booking = getBookingById(bookingId);

  if (!booking) {
    return (
      <div className="p-8">
        <p className="text-sm text-graphite-soft">This booking could not be found.</p>
        <Link href="/campus-ride/bookings" className="text-sm font-semibold text-bronze-deep mt-2 inline-block">
          Back to My Bookings
        </Link>
      </div>
    );
  }

  const isTrackable = booking.status === BOOKING_STATUS.UPCOMING || booking.status === BOOKING_STATUS.ACTIVE;

  return (
    <div>
      <header className="flex items-center gap-4 px-5 sm:px-8 py-5 bg-white border-b border-line">
        <Link
          href="/campus-ride/bookings"
          className="w-9 h-9 rounded-lg border border-line flex items-center justify-center hover:bg-paper shrink-0"
        >
          <ArrowLeft size={16} className="text-graphite-soft" />
        </Link>
        <div className="min-w-0 flex items-center gap-2">
          <h1 className="font-semibold text-charcoal truncate">{booking.routeName}</h1>
          <RideStatusBadge status={booking.status} />
        </div>
      </header>

      <div className="p-5 sm:p-8 max-w-xl">
        {isTrackable ? (
          <ActiveRideTracker booking={booking} />
        ) : (
          <div className="bg-white rounded-xl border border-line p-6 space-y-3">
            <Row label="Date" value={`${booking.date} · ${booking.departureTime}`} />
            <Row label="Pickup" value={booking.gate} />
            <Row label="Seat" value={booking.seat} />
            <Row label="Fare" value={`₦${booking.fare}`} />
          </div>
        )}
      </div>
    </div>
  );
}