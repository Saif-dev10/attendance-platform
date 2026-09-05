export const RIDE_STATUS = {
  APPROACHING: "approaching",
  ARRIVED: "arrived",
  BOARDING: "boarding",
  EN_ROUTE: "en_route",
  NEAR_DESTINATION: "near_destination",
  COMPLETED: "completed",
};

export const RIDE_STATUS_STEPS = [
  RIDE_STATUS.APPROACHING,
  RIDE_STATUS.ARRIVED,
  RIDE_STATUS.BOARDING,
  RIDE_STATUS.EN_ROUTE,
  RIDE_STATUS.NEAR_DESTINATION,
  RIDE_STATUS.COMPLETED,
];

const RIDE_STATUS_CONFIG = {
  [RIDE_STATUS.APPROACHING]: {
    label: "Shuttle approaching",
    description: "Your shuttle is on its way to the pickup point.",
  },
  [RIDE_STATUS.ARRIVED]: {
    label: "Shuttle arrived",
    description: "Your shuttle has arrived at the pickup point.",
  },
  [RIDE_STATUS.BOARDING]: {
    label: "Boarding",
    description: "Boarding is in progress. Please have your seat ready.",
  },
  [RIDE_STATUS.EN_ROUTE]: {
    label: "On the way",
    description: "You're on your way to your destination.",
  },
  [RIDE_STATUS.NEAR_DESTINATION]: {
    label: "Near destination",
    description: "Almost there — get ready to alight.",
  },
  [RIDE_STATUS.COMPLETED]: {
    label: "Ride completed",
    description: "You've arrived at your destination.",
  },
};

export function getRideStatusConfig(status) {
  return RIDE_STATUS_CONFIG[status] || RIDE_STATUS_CONFIG[RIDE_STATUS.APPROACHING];
}

export function getNextRideStatus(status) {
  const index = RIDE_STATUS_STEPS.indexOf(status);
  if (index === -1 || index === RIDE_STATUS_STEPS.length - 1) return null;
  return RIDE_STATUS_STEPS[index + 1];
}

export function getRideStatusProgress(status) {
  const index = RIDE_STATUS_STEPS.indexOf(status);
  return index === -1 ? 0 : Math.round(((index + 1) / RIDE_STATUS_STEPS.length) * 100);
}

export const SHUTTLE_STATUS = {
  ARRIVING: "arriving",
  AWAY: "away",
  FULL: "full",
  DELAYED: "delayed",
  OFFLINE: "offline",
};

const SHUTTLE_STATUS_CONFIG = {
  [SHUTTLE_STATUS.ARRIVING]: { label: "Arriving now", bookable: true },
  [SHUTTLE_STATUS.AWAY]: { label: "On route", bookable: true },
  [SHUTTLE_STATUS.FULL]: { label: "Full", bookable: false },
  [SHUTTLE_STATUS.DELAYED]: { label: "Delayed", bookable: true },
  [SHUTTLE_STATUS.OFFLINE]: { label: "Not operating", bookable: false },
};

export function getShuttleStatusConfig(status) {
  return SHUTTLE_STATUS_CONFIG[status] || SHUTTLE_STATUS_CONFIG[SHUTTLE_STATUS.AWAY];
}

export const BOOKING_STATUS = {
  UPCOMING: "upcoming",
  ACTIVE: "active",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};

const BOOKING_STATUS_CONFIG = {
  [BOOKING_STATUS.UPCOMING]: { label: "Confirmed", badgeClass: "bg-blue-50 text-blue-700" },
  [BOOKING_STATUS.ACTIVE]: { label: "Active", badgeClass: "bg-green-50 text-green-700" },
  [BOOKING_STATUS.COMPLETED]: { label: "Completed", badgeClass: "bg-cream text-graphite" },
  [BOOKING_STATUS.CANCELLED]: { label: "Cancelled", badgeClass: "bg-red-50 text-red-600" },
};

export function getBookingStatusConfig(status) {
  return BOOKING_STATUS_CONFIG[status] || BOOKING_STATUS_CONFIG[BOOKING_STATUS.UPCOMING];
}