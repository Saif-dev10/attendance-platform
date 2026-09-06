"use client";

import { createContext, useContext, useState, useCallback, useRef } from "react";
import {
  shuttles as initialShuttles,
  routes as initialRoutes,
  initialBookings,
  initialTransactions,
  initialWalletBalance,
  drivers,
} from "./data";
import { RIDE_STATUS, BOOKING_STATUS, getNextRideStatus, getRideStatusConfig } from "./rideStatus";

const CampusRideContext = createContext(null);

export function CampusRideProvider({ children }) {
  const [shuttles] = useState(initialShuttles);
  const [routes] = useState(initialRoutes);
  const [bookings, setBookings] = useState(initialBookings);
  const [walletBalance, setWalletBalance] = useState(initialWalletBalance);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [activeBookingPanel, setActiveBookingPanel] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState("idle");
  const [locationError, setLocationError] = useState(null);
  const [isTrackingLocation, setIsTrackingLocation] = useState(false);
  const locationWatcherRef = useRef(null);
  const deviceHeadingRef = useRef(null);
  const orientationListeningRef = useRef(false);

  const pushAlert = useCallback((message, tone = "info") => {
    const id = `alert-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setAlerts((prev) => [...prev, { id, message, tone }]);
    setTimeout(() => {
      setAlerts((prev) => prev.filter((a) => a.id !== id));
    }, 5000);
  }, []);

  const dismissAlert = useCallback((id) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const stopLocationTracking = useCallback(() => {
    if (locationWatcherRef.current !== null && typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.clearWatch(locationWatcherRef.current);
      locationWatcherRef.current = null;
    }
    if (orientationListeningRef.current && typeof window !== "undefined") {
      window.removeEventListener("deviceorientationabsolute", handleDeviceOrientation);
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
      orientationListeningRef.current = false;
    }
    setIsTrackingLocation(false);
  }, []);

  function handleDeviceOrientation(event) {
    const compassHeading = Number.isFinite(event.webkitCompassHeading)
      ? event.webkitCompassHeading
      : event.absolute && Number.isFinite(event.alpha)
        ? (360 - event.alpha) % 360
        : null;

    if (compassHeading === null) return;

    deviceHeadingRef.current = compassHeading;
    setUserLocation((previous) =>
      previous ? { ...previous, heading: compassHeading } : previous,
    );
  }

  const startOrientationTracking = useCallback(async () => {
    if (typeof window === "undefined" || orientationListeningRef.current) return;

    const orientationApi = window.DeviceOrientationEvent;
    if (typeof orientationApi?.requestPermission === "function") {
      try {
        const permission = await orientationApi.requestPermission();
        if (permission !== "granted") return;
      } catch {
        return;
      }
    }

    window.addEventListener("deviceorientationabsolute", handleDeviceOrientation);
    window.addEventListener("deviceorientation", handleDeviceOrientation);
    orientationListeningRef.current = true;
  }, []);

  const startLocationTracking = useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setLocationStatus("unsupported");
      setLocationError("Your browser does not support device location services.");
      setIsTrackingLocation(false);
      return;
    }

    if (locationWatcherRef.current !== null) return;

    setLocationStatus("loading");
    setLocationError(null);
    setIsTrackingLocation(true);
    startOrientationTracking();

    const handlePosition = ({ coords, timestamp }) => {
      setUserLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
        accuracy: coords.accuracy,
        heading: coords.heading ?? deviceHeadingRef.current,
        speed: coords.speed,
        timestamp,
      });
      setLocationStatus("granted");
      setLocationError(null);
    };

    const handleError = (error) => {
      if (locationWatcherRef.current !== null) {
        navigator.geolocation.clearWatch(locationWatcherRef.current);
        locationWatcherRef.current = null;
      }
      const messages = {
        1: "Location permission is required to show you on the ride map.",
        2: "Your device could not determine your current location.",
        3: "Finding your location timed out. You can try again.",
      };
      setLocationStatus(error.code === 1 ? "denied" : error.code === 3 ? "timeout" : "unavailable");
      setLocationError(messages[error.code] || "Your current location could not be determined.");
      setIsTrackingLocation(false);
    };

    locationWatcherRef.current = navigator.geolocation.watchPosition(handlePosition, handleError, {
      enableHighAccuracy: true,
      maximumAge: 5000,
      timeout: 15000,
    });
  }, [startOrientationTracking]);

  const openBookingPanel = useCallback((shuttle) => setActiveBookingPanel(shuttle), []);
  const closeBookingPanel = useCallback(() => setActiveBookingPanel(null), []);

  const confirmBooking = useCallback(
    (shuttle, details) => {
      const newBooking = {
        id: `bk-${Date.now()}`,
        routeId: shuttle.routeId,
        routeName: details.routeName,
        shuttleId: shuttle.id,
        shuttleName: shuttle.name,
        date: details.date,
        departureTime: details.departureTime,
        gate: details.gate,
        seat: details.seat,
        fare: details.fare,
        status: BOOKING_STATUS.UPCOMING,
        driverId: shuttle.driverId,
        rideStatus: RIDE_STATUS.APPROACHING,
        createdAt: new Date().toISOString(),
      };

      setBookings((prev) => [newBooking, ...prev]);
      setWalletBalance((prev) => prev - details.fare);
      setTransactions((prev) => [
        {
          id: `txn-${Date.now()}`,
          type: "fare",
          amount: -details.fare,
          date: "Today",
          description: `${details.routeName} ride`,
        },
        ...prev,
      ]);
      pushAlert(`Booking confirmed for ${details.routeName}`, "success");

      return newBooking;
    },
    [pushAlert]
  );

  const cancelBooking = useCallback(
    (bookingId) => {
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: BOOKING_STATUS.CANCELLED } : b))
      );
      pushAlert("Your ride has been cancelled", "warning");
    },
    [pushAlert]
  );

  const advanceRideStatus = useCallback(
    (bookingId) => {
      setBookings((prev) =>
        prev.map((b) => {
          if (b.id !== bookingId) return b;
          const next = getNextRideStatus(b.rideStatus);
          if (!next) return b;
          const isCompleted = next === RIDE_STATUS.COMPLETED;
          pushAlert(getRideStatusConfig(next).label, isCompleted ? "success" : "info");
          return { ...b, rideStatus: next, status: isCompleted ? BOOKING_STATUS.COMPLETED : b.status };
        })
      );
    },
    [pushAlert]
  );

  const topUpWallet = useCallback(
    (amount) => {
      setWalletBalance((prev) => prev + amount);
      setTransactions((prev) => [
        { id: `txn-${Date.now()}`, type: "topup", amount, date: "Today", description: "Wallet top-up" },
        ...prev,
      ]);
      pushAlert(`Wallet topped up with ₦${amount.toLocaleString("en-NG")}`, "success");
    },
    [pushAlert]
  );

  const getBookingById = useCallback((id) => bookings.find((b) => b.id === id), [bookings]);
  const getRouteById = useCallback((id) => routes.find((r) => r.id === id), [routes]);
  const getDriverById = useCallback((id) => drivers.find((d) => d.id === id), []);

  const value = {
    shuttles,
    routes,
    bookings,
    walletBalance,
    transactions,
    drivers,
    activeBookingPanel,
    openBookingPanel,
    closeBookingPanel,
    confirmBooking,
    cancelBooking,
    advanceRideStatus,
    topUpWallet,
    getBookingById,
    getRouteById,
    getDriverById,
    alerts,
    pushAlert,
    dismissAlert,
    userLocation,
    locationStatus,
    locationError,
    isTrackingLocation,
    startLocationTracking,
    stopLocationTracking,
    startOrientationTracking,
  };

  return <CampusRideContext.Provider value={value}>{children}</CampusRideContext.Provider>;
}

export function useCampusRide() {
  const ctx = useContext(CampusRideContext);
  if (!ctx) {
    throw new Error("useCampusRide must be used within a CampusRideProvider");
  }
  return ctx;
}