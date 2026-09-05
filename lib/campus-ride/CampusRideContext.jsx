"use client";

import { createContext, useContext, useState, useCallback } from "react";
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