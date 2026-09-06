"use client";

import Link from "next/link";
import { MapPin, Calendar } from "lucide-react";
import RideStatusBadge from "./RideStatusBadge";
import { useCampusRide } from "@/lib/campus-ride/CampusRideContext";
import { BOOKING_STATUS } from "@/lib/campus-ride/rideStatus";

export default function BookingCard({ booking }) {
  const { cancelBooking } = useCampusRide();
  const canCancel = booking.status === BOOKING_STATUS.UPCOMING;

  return (
    <div className="bg-white rounded-xl border border-line p-5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <p className="font-semibold text-charcoal truncate">{booking.routeName}</p>
          <p className="text-xs text-graphite-soft flex items-center gap-1.5 mt-1">
            <Calendar size={12} /> {booking.date} · {booking.departureTime}
          </p>
        </div>
        <RideStatusBadge status={booking.status} />
      </div>

      <div className="flex items-center gap-4 text-xs text-graphite-soft mb-4">
        <span className="flex items-center gap-1">
          <MapPin size={12} /> {booking.gate}
        </span>
        <span>Seat {booking.seat}</span>
        <span>₦{booking.fare}</span>
      </div>

      <div className="flex gap-3">
        <Link
          href={`/campus-ride/bookings/${booking.id}`}
          className="flex-1 text-center border border-line text-graphite text-sm font-semibold py-2 rounded-lg hover:bg-paper"
        >
          View Booking
        </Link>
        {canCancel && (
          <button
            type="button"
            onClick={() => cancelBooking(booking.id)}
            className="flex-1 text-center border border-red-200 text-red-600 text-sm font-semibold py-2 rounded-lg hover:bg-red-50"
          >
            Cancel Ride
          </button>
        )}
      </div>
    </div>
  );
}