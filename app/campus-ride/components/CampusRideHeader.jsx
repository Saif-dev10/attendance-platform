import Link from "next/link";

export default function CampusRideHeader() {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-5 sm:px-8 py-5 bg-white border-b border-line">
      <div>
        <h1 className="text-xl font-bold text-charcoal">Campus Mobility</h1>
        <p className="text-sm text-graphite-soft">Find, book, and track campus shuttles in real time</p>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/campus-ride/bookings"
          className="px-4 py-2 rounded-lg border border-line text-sm font-semibold text-charcoal hover:bg-paper text-center"
        >
          My Bookings
        </Link>
        <Link
          href="/campus-ride/wallet"
          className="px-4 py-2 rounded-lg bg-charcoal text-cream text-sm font-semibold hover:bg-charcoal/90 text-center"
        >
          Top up Wallet
        </Link>
      </div>
    </header>
  );
}