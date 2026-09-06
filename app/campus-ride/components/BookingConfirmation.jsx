import { CheckCircle2 } from "lucide-react";

function Row({ label, value }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-graphite-soft">{label}</span>
      <span className="font-semibold text-charcoal">{value}</span>
    </div>
  );
}

export default function BookingConfirmation({ booking, onViewBooking, onDone }) {
  return (
    <div className="p-6 text-center space-y-5">
      <div className="flex justify-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
          <CheckCircle2 size={28} className="text-green-600" />
        </span>
      </div>
      <div>
        <p className="font-bold text-charcoal text-lg">You&apos;re booked!</p>
        <p className="text-sm text-graphite-soft mt-1">{booking.routeName}</p>
      </div>

      <div className="rounded-lg bg-cream p-4 text-left space-y-2">
        <Row label="Departure" value={`${booking.date} · ${booking.departureTime}`} />
        <Row label="Pickup" value={booking.gate} />
        <Row label="Seat" value={booking.seat} />
        <Row label="Fare" value={`₦${booking.fare}`} />
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onDone}
          className="flex-1 border border-line text-graphite text-sm font-semibold py-2.5 rounded-lg hover:bg-paper"
        >
          Done
        </button>
        <button
          type="button"
          onClick={onViewBooking}
          className="flex-1 bg-charcoal hover:bg-charcoal/90 text-cream text-sm font-semibold py-2.5 rounded-lg"
        >
          View Booking
        </button>
      </div>
    </div>
  );
}