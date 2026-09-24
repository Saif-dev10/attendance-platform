"use client";

import { QRCodeSVG } from "qrcode.react";

// The only file that knows which QR library we use. `value` should be the token
// the backend issues; the frontend never decides whether a scan is valid.
export default function AttendanceQRCode({ value, size = 200, label = "Attendance QR code" }) {
  if (!value) {
    return (
      <div
        className="flex items-center justify-center rounded-md border border-dashed border-line bg-cream text-sm text-graphite-soft"
        style={{ width: size + 24, height: size + 24 }}
      >
        QR code unavailable
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={label}
      className="inline-block rounded-md border border-line bg-white p-3"
    >
      <QRCodeSVG value={value} size={size} level="M" />
    </div>
  );
}