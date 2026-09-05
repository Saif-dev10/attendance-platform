"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useCampusRide } from "@/lib/campus-ride/CampusRideContext";
import BookingConfirmation from "./BookingConfirmation";

const TIME_SLOTS = ["4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM"];

export default function BookingPanel() {
  const router = useRouter();
  const { activeBookingPanel, closeBookingPanel, confirmBooking, getRouteById } = useCampusRide();

  if (!activeBookingPanel) return null;

  return (
    <BookingPanelContent
      key={activeBookingPanel.id}
      shuttle={activeBookingPanel}
      closeBookingPanel={closeBookingPanel}
      confirmBooking={confirmBooking}
      getRouteById={getRouteById}
      router={router}
    />
  );
}

function BookingPanelContent({ shuttle, closeBookingPanel, confirmBooking, getRouteById, router }) {
  const [departureTime, setDepartureTime] = useState(TIME_SLOTS[0]);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const route = getRouteById(shuttle.routeId);
  const routeName = route ? route.name : shuttle.name;
  const seat = String(Math.max(1, shuttle.totalSeats - shuttle.seatsAvailable + 1));

  function handleConfirm() {
    const booking = confirmBooking(shuttle, {
      routeName,
      date: "Today",
      departureTime,
      gate: shuttle.name.replace(" Shuttle", "").replace(" Route", ""),
      seat,
      fare: shuttle.fare,
    });
    setConfirmedBooking(booking);
  }

  function handleClose() {
    closeBookingPanel();
    setConfirmedBooking(null);
  }

  function handleViewBooking() {
    if (confirmedBooking) {
      router.push(`/campus-ride/bookings/${confirmedBooking.id}`);
    }
    handleClose();
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-[1px]" onClick={handleClose} aria-hidden="true" />

      <div className="relative z-10 w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl border border-line shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-line">
          <p className="font-semibold text-charcoal">
            {confirmedBooking ? "Booking Confirmed" : "Confirm Your Ride"}
          </p>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close booking panel"
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-paper"
          >
            <X size={16} className="text-graphite-soft" />
          </button>
        </div>

        {confirmedBooking ? (
          <BookingConfirmation booking={confirmedBooking} onViewBooking={handleViewBooking} onDone={handleClose} />
        ) : (
          <div className="p-6 space-y-5">
            <div>
              <p className="text-lg font-bold text-charcoal">{routeName}</p>
              <p className="text-sm text-graphite-soft">{shuttle.name}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-cream p-3">
                <p className="text-[10px] font-bold text-graphite-soft uppercase tracking-wide">Date</p>
                <p className="text-sm font-semibold text-charcoal mt-0.5">Today</p>
              </div>
              <div className="rounded-lg bg-cream p-3">
                <p className="text-[10px] font-bold text-graphite-soft uppercase tracking-wide">Seats Available</p>
                <p className="text-sm font-semibold text-charcoal mt-0.5">{shuttle.seatsAvailable} left</p>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold text-graphite-soft uppercase tracking-wide mb-2">
                Departure Time
              </p>
              <div className="grid grid-cols-4 gap-2">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setDepartureTime(slot)}
                    className={`text-xs font-semibold rounded-lg py-2 border transition-colors ${
                      departureTime === slot
                        ? "bg-charcoal text-cream border-charcoal"
                        : "border-line text-graphite hover:bg-paper"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-line p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-graphite-soft">Assigned Seat</span>
                <span className="font-semibold text-charcoal">Seat {seat}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-graphite-soft">Fare</span>
                <span className="font-semibold text-charcoal">₦{shuttle.fare}</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-line">
                <span className="font-semibold text-charcoal">Total</span>
                <span className="font-bold text-bronze-deep">₦{shuttle.fare}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleConfirm}
              disabled={shuttle.seatsAvailable === 0}
              className="w-full bg-charcoal hover:bg-charcoal/90 disabled:bg-line disabled:text-graphite-soft disabled:cursor-not-allowed text-cream text-sm font-semibold py-3 rounded-lg"
            >
              Confirm Booking
            </button>
          </div>
        )}
      </div>
    </div>
  );
}