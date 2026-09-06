"use client";

import CampusRideHeader from "./components/CampusRideHeader";
import NearbyShuttles from "./components/NearbyShuttles";
import ShuttleRoutes from "./components/ShuttleRoutes";
import CampusMap from "./components/CampusMap";
import RideWallet from "./components/RideWallet";
import { useCampusRide } from "@/lib/campus-ride/CampusRideContext";

export default function CampusRidePage() {
  const { shuttles, routes } = useCampusRide();

  return (
    <div>
      <CampusRideHeader />

      <div className="p-5 sm:p-8 grid grid-cols-1 gap-6 lg:grid-cols-[380px_1fr] lg:auto-rows-min">
        <div className="lg:col-start-1 lg:row-start-1">
          <NearbyShuttles shuttles={shuttles} />
        </div>

        <div className="lg:col-start-2 lg:row-start-1 lg:row-span-3">
          <CampusMap shuttles={shuttles} />
        </div>

        <div className="lg:col-start-1 lg:row-start-2">
          <ShuttleRoutes routes={routes} />
        </div>

        <div className="lg:col-start-1 lg:row-start-3">
          <RideWallet />
        </div>
      </div>
    </div>
  );
}