"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useCampusRide } from "@/lib/campus-ride/CampusRideContext";
import RouteDetail from "../../components/RouteDetail";

export default function RouteDetailPage({ params }) {
  const { getRouteById, shuttles, openBookingPanel } = useCampusRide();
  const { routeId } = use(params);
  const route = getRouteById(routeId);

  if (!route) {
    return (
      <div className="p-8">
        <p className="text-sm text-graphite-soft">This route could not be found.</p>
        <Link href="/campus-ride" className="text-sm font-semibold text-bronze-deep mt-2 inline-block">
          Back to Campus Ride
        </Link>
      </div>
    );
  }

  const routeShuttle = shuttles.find((s) => s.routeId === route.id);

  return (
    <div>
      <header className="flex items-center gap-4 px-5 sm:px-8 py-5 bg-white border-b border-line">
        <Link
          href="/campus-ride"
          className="w-9 h-9 rounded-lg border border-line flex items-center justify-center hover:bg-paper shrink-0"
        >
          <ArrowLeft size={16} className="text-graphite-soft" />
        </Link>
        <div className="min-w-0">
          <h1 className="font-semibold text-charcoal truncate">{route.name}</h1>
          <p className="text-xs text-graphite-soft italic">{route.stops.length} stops on this route</p>
        </div>
      </header>

      <div className="p-5 sm:p-8 max-w-2xl space-y-6">
        <RouteDetail route={route} />
        {routeShuttle && (
          <button
            type="button"
            onClick={() => openBookingPanel(routeShuttle)}
            className="w-full bg-charcoal hover:bg-charcoal/90 text-cream text-sm font-semibold py-3 rounded-lg"
          >
            Book a seat on this route
          </button>
        )}
      </div>
    </div>
  );
}