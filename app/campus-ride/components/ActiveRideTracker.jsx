"use client";

import { Phone, Star, MapPin } from "lucide-react";
import Image from "next/image";
import { RIDE_STATUS_STEPS, getRideStatusConfig, getRideStatusProgress, RIDE_STATUS } from "@/lib/campus-ride/rideStatus";
import { useCampusRide } from "@/lib/campus-ride/CampusRideContext";

export default function ActiveRideTracker({ booking }) {
  const { advanceRideStatus, cancelBooking, getDriverById } = useCampusRide();
  const driver = booking.driverId ? getDriverById(booking.driverId) : null;
  const config = getRideStatusConfig(booking.rideStatus);
  const progress = getRideStatusProgress(booking.rideStatus);
  const isCompleted = booking.rideStatus === RIDE_STATUS.COMPLETED;
  const currentStepIndex = RIDE_STATUS_STEPS.indexOf(booking.rideStatus);

  return (
    <div className="bg-white rounded-xl border border-line overflow-hidden">
      <div className="bg-charcoal px-6 py-5">
        <p className="text-[10px] font-bold tracking-wider text-cream/60 uppercase mb-1">Your Ride</p>
        <p className="text-lg font-bold text-cream">{booking.routeName}</p>
        <p className="text-sm text-cream/70 mt-1">{config.label}</p>
        <div className="mt-4 h-1.5 w-full rounded-full bg-cream/15 overflow-hidden">
          <div className="h-full bg-bronze-deep transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="p-6 space-y-5">
        <p className="text-sm text-graphite">{config.description}</p>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-cream p-3">
            <p className="text-[10px] font-bold text-graphite-soft uppercase tracking-wide">Pickup</p>
            <p className="text-sm font-semibold text-charcoal mt-0.5 flex items-center gap-1">
              <MapPin size={13} className="text-bronze-deep" /> {booking.gate}
            </p>
          </div>
          <div className="rounded-lg bg-cream p-3">
            <p className="text-[10px] font-bold text-graphite-soft uppercase tracking-wide">Seat</p>
            <p className="text-sm font-semibold text-charcoal mt-0.5">Seat {booking.seat}</p>
          </div>
        </div>

        {driver && (
          <div className="flex items-center justify-between rounded-lg border border-line p-4">
            <div className="flex items-center gap-3 min-w-0">
              <Image
                src={driver.avatar}
                alt={driver.name}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover shrink-0"
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-charcoal truncate">{driver.name}</p>
                <p className="text-xs text-graphite-soft flex items-center gap-1">
                  <Star size={11} className="text-bronze-deep" fill="currentColor" /> {driver.rating} ·{" "}
                  {driver.vehicleNumber}
                </p>
              </div>
            </div>
            <a
              href={`tel:${driver.phone}`}
              aria-label={`Call ${driver.name}`}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-cream text-bronze-deep hover:bg-line shrink-0"
            >
              <Phone size={15} />
            </a>
          </div>
        )}

        <ol className="flex items-center justify-between" aria-label="Ride progress">
          {RIDE_STATUS_STEPS.map((step, index) => (
            <li key={step} className="flex-1 flex flex-col items-center">
              <span className={`h-2 w-2 rounded-full ${index <= currentStepIndex ? "bg-bronze-deep" : "bg-line"}`} />
            </li>
          ))}
        </ol>

        <div className="flex gap-3">
          {!isCompleted && (
            <button
              type="button"
              onClick={() => cancelBooking(booking.id)}
              className="flex-1 border border-red-200 text-red-600 text-sm font-semibold py-2.5 rounded-lg hover:bg-red-50"
            >
              Cancel Ride
            </button>
          )}
          <button
            type="button"
            onClick={() => advanceRideStatus(booking.id)}
            disabled={isCompleted}
            className="flex-1 bg-charcoal hover:bg-charcoal/90 disabled:bg-line disabled:text-graphite-soft disabled:cursor-not-allowed text-cream text-sm font-semibold py-2.5 rounded-lg"
          >
            {isCompleted ? "Ride Completed" : "Track Shuttle"}
          </button>
        </div>
      </div>
    </div>
  );
}