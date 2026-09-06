"use client";

import { CheckCircle2, AlertTriangle, Info, X } from "lucide-react";
import { useCampusRide } from "@/lib/campus-ride/CampusRideContext";

const ICONS = {
  success: CheckCircle2,
  warning: AlertTriangle,
  info: Info,
};

const TONE_CLASSES = {
  success: "border-green-200 bg-green-50 text-green-700",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
  info: "border-line bg-white text-charcoal",
};

export default function RideAlerts() {
  const { alerts, dismissAlert } = useCampusRide();

  if (alerts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[90] w-[calc(100%-2rem)] max-w-sm space-y-2 sm:w-full">
      {alerts.map((alert) => {
        const Icon = ICONS[alert.tone] || Info;
        return (
          <div
            key={alert.id}
            role="status"
            className={`flex items-start gap-3 rounded-xl border px-4 py-3 shadow-lg ${
              TONE_CLASSES[alert.tone] || TONE_CLASSES.info
            }`}
          >
            <Icon size={16} className="mt-0.5 shrink-0" />
            <p className="text-sm font-medium flex-1">{alert.message}</p>
            <button
              type="button"
              onClick={() => dismissAlert(alert.id)}
              aria-label="Dismiss notification"
              className="shrink-0 text-current opacity-60 hover:opacity-100"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}