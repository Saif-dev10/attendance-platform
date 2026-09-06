"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useCampusRide } from "@/lib/campus-ride/CampusRideContext";
import MyBookingsList from "../components/MyBookingsList";

export default function MyBookingsPage() {
  const { bookings } = useCampusRide();

  return (
    <div>
      <header className="px-5 sm:px-8 py-5 bg-white border-b border-line">
        <div className="flex items-center gap-4">
          <Link
            href="/campus-ride"
            aria-label="Back to Campus Ride"
            className="w-9 h-9 rounded-lg border border-line flex items-center justify-center hover:bg-paper shrink-0"
          >
            <ArrowLeft size={16} className="text-graphite-soft" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-charcoal">My Bookings</h1>
            <p className="text-sm text-graphite-soft">All your campus ride bookings in one place</p>
          </div>
        </div>
      </header>
      <div className="p-5 sm:p-8">
        <MyBookingsList bookings={bookings} />
      </div>
    </div>
  );
}